package br.ufal.ic.arq.web.rest;

import br.ufal.ic.arq.ArqApplicationApp;

import br.ufal.ic.arq.domain.FeedBack;
import br.ufal.ic.arq.repository.FeedBackRepository;
import br.ufal.ic.arq.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static br.ufal.ic.arq.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FeedBackResource REST controller.
 *
 * @see FeedBackResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ArqApplicationApp.class)
public class FeedBackResourceIntTest {

    private static final Double DEFAULT_GRADE = 1D;
    private static final Double UPDATED_GRADE = 2D;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private FeedBackRepository feedBackRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restFeedBackMockMvc;

    private FeedBack feedBack;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FeedBackResource feedBackResource = new FeedBackResource(feedBackRepository);
        this.restFeedBackMockMvc = MockMvcBuilders.standaloneSetup(feedBackResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FeedBack createEntity(EntityManager em) {
        FeedBack feedBack = new FeedBack()
            .grade(DEFAULT_GRADE)
            .description(DEFAULT_DESCRIPTION);
        return feedBack;
    }

    @Before
    public void initTest() {
        feedBack = createEntity(em);
    }

    @Test
    @Transactional
    public void createFeedBack() throws Exception {
        int databaseSizeBeforeCreate = feedBackRepository.findAll().size();

        // Create the FeedBack
        restFeedBackMockMvc.perform(post("/api/feed-backs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(feedBack)))
            .andExpect(status().isCreated());

        // Validate the FeedBack in the database
        List<FeedBack> feedBackList = feedBackRepository.findAll();
        assertThat(feedBackList).hasSize(databaseSizeBeforeCreate + 1);
        FeedBack testFeedBack = feedBackList.get(feedBackList.size() - 1);
        assertThat(testFeedBack.getGrade()).isEqualTo(DEFAULT_GRADE);
        assertThat(testFeedBack.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createFeedBackWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = feedBackRepository.findAll().size();

        // Create the FeedBack with an existing ID
        feedBack.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFeedBackMockMvc.perform(post("/api/feed-backs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(feedBack)))
            .andExpect(status().isBadRequest());

        // Validate the FeedBack in the database
        List<FeedBack> feedBackList = feedBackRepository.findAll();
        assertThat(feedBackList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkGradeIsRequired() throws Exception {
        int databaseSizeBeforeTest = feedBackRepository.findAll().size();
        // set the field null
        feedBack.setGrade(null);

        // Create the FeedBack, which fails.

        restFeedBackMockMvc.perform(post("/api/feed-backs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(feedBack)))
            .andExpect(status().isBadRequest());

        List<FeedBack> feedBackList = feedBackRepository.findAll();
        assertThat(feedBackList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = feedBackRepository.findAll().size();
        // set the field null
        feedBack.setDescription(null);

        // Create the FeedBack, which fails.

        restFeedBackMockMvc.perform(post("/api/feed-backs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(feedBack)))
            .andExpect(status().isBadRequest());

        List<FeedBack> feedBackList = feedBackRepository.findAll();
        assertThat(feedBackList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFeedBacks() throws Exception {
        // Initialize the database
        feedBackRepository.saveAndFlush(feedBack);

        // Get all the feedBackList
        restFeedBackMockMvc.perform(get("/api/feed-backs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(feedBack.getId().intValue())))
            .andExpect(jsonPath("$.[*].grade").value(hasItem(DEFAULT_GRADE.doubleValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getFeedBack() throws Exception {
        // Initialize the database
        feedBackRepository.saveAndFlush(feedBack);

        // Get the feedBack
        restFeedBackMockMvc.perform(get("/api/feed-backs/{id}", feedBack.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(feedBack.getId().intValue()))
            .andExpect(jsonPath("$.grade").value(DEFAULT_GRADE.doubleValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFeedBack() throws Exception {
        // Get the feedBack
        restFeedBackMockMvc.perform(get("/api/feed-backs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFeedBack() throws Exception {
        // Initialize the database
        feedBackRepository.saveAndFlush(feedBack);

        int databaseSizeBeforeUpdate = feedBackRepository.findAll().size();

        // Update the feedBack
        FeedBack updatedFeedBack = feedBackRepository.findById(feedBack.getId()).get();
        // Disconnect from session so that the updates on updatedFeedBack are not directly saved in db
        em.detach(updatedFeedBack);
        updatedFeedBack
            .grade(UPDATED_GRADE)
            .description(UPDATED_DESCRIPTION);

        restFeedBackMockMvc.perform(put("/api/feed-backs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFeedBack)))
            .andExpect(status().isOk());

        // Validate the FeedBack in the database
        List<FeedBack> feedBackList = feedBackRepository.findAll();
        assertThat(feedBackList).hasSize(databaseSizeBeforeUpdate);
        FeedBack testFeedBack = feedBackList.get(feedBackList.size() - 1);
        assertThat(testFeedBack.getGrade()).isEqualTo(UPDATED_GRADE);
        assertThat(testFeedBack.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingFeedBack() throws Exception {
        int databaseSizeBeforeUpdate = feedBackRepository.findAll().size();

        // Create the FeedBack

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFeedBackMockMvc.perform(put("/api/feed-backs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(feedBack)))
            .andExpect(status().isBadRequest());

        // Validate the FeedBack in the database
        List<FeedBack> feedBackList = feedBackRepository.findAll();
        assertThat(feedBackList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFeedBack() throws Exception {
        // Initialize the database
        feedBackRepository.saveAndFlush(feedBack);

        int databaseSizeBeforeDelete = feedBackRepository.findAll().size();

        // Delete the feedBack
        restFeedBackMockMvc.perform(delete("/api/feed-backs/{id}", feedBack.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FeedBack> feedBackList = feedBackRepository.findAll();
        assertThat(feedBackList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FeedBack.class);
        FeedBack feedBack1 = new FeedBack();
        feedBack1.setId(1L);
        FeedBack feedBack2 = new FeedBack();
        feedBack2.setId(feedBack1.getId());
        assertThat(feedBack1).isEqualTo(feedBack2);
        feedBack2.setId(2L);
        assertThat(feedBack1).isNotEqualTo(feedBack2);
        feedBack1.setId(null);
        assertThat(feedBack1).isNotEqualTo(feedBack2);
    }
}

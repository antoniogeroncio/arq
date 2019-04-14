package br.ufal.ic.arq.web.rest;

import br.ufal.ic.arq.ArqApplicationApp;

import br.ufal.ic.arq.domain.Style;
import br.ufal.ic.arq.repository.StyleRepository;
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
 * Test class for the StyleResource REST controller.
 *
 * @see StyleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ArqApplicationApp.class)
public class StyleResourceIntTest {

    @Autowired
    private StyleRepository styleRepository;

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

    private MockMvc restStyleMockMvc;

    private Style style;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StyleResource styleResource = new StyleResource(styleRepository);
        this.restStyleMockMvc = MockMvcBuilders.standaloneSetup(styleResource)
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
    public static Style createEntity(EntityManager em) {
        Style style = new Style();
        return style;
    }

    @Before
    public void initTest() {
        style = createEntity(em);
    }

    @Test
    @Transactional
    public void createStyle() throws Exception {
        int databaseSizeBeforeCreate = styleRepository.findAll().size();

        // Create the Style
        restStyleMockMvc.perform(post("/api/styles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(style)))
            .andExpect(status().isCreated());

        // Validate the Style in the database
        List<Style> styleList = styleRepository.findAll();
        assertThat(styleList).hasSize(databaseSizeBeforeCreate + 1);
        Style testStyle = styleList.get(styleList.size() - 1);
    }

    @Test
    @Transactional
    public void createStyleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = styleRepository.findAll().size();

        // Create the Style with an existing ID
        style.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStyleMockMvc.perform(post("/api/styles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(style)))
            .andExpect(status().isBadRequest());

        // Validate the Style in the database
        List<Style> styleList = styleRepository.findAll();
        assertThat(styleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStyles() throws Exception {
        // Initialize the database
        styleRepository.saveAndFlush(style);

        // Get all the styleList
        restStyleMockMvc.perform(get("/api/styles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(style.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getStyle() throws Exception {
        // Initialize the database
        styleRepository.saveAndFlush(style);

        // Get the style
        restStyleMockMvc.perform(get("/api/styles/{id}", style.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(style.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingStyle() throws Exception {
        // Get the style
        restStyleMockMvc.perform(get("/api/styles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStyle() throws Exception {
        // Initialize the database
        styleRepository.saveAndFlush(style);

        int databaseSizeBeforeUpdate = styleRepository.findAll().size();

        // Update the style
        Style updatedStyle = styleRepository.findById(style.getId()).get();
        // Disconnect from session so that the updates on updatedStyle are not directly saved in db
        em.detach(updatedStyle);

        restStyleMockMvc.perform(put("/api/styles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStyle)))
            .andExpect(status().isOk());

        // Validate the Style in the database
        List<Style> styleList = styleRepository.findAll();
        assertThat(styleList).hasSize(databaseSizeBeforeUpdate);
        Style testStyle = styleList.get(styleList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingStyle() throws Exception {
        int databaseSizeBeforeUpdate = styleRepository.findAll().size();

        // Create the Style

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStyleMockMvc.perform(put("/api/styles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(style)))
            .andExpect(status().isBadRequest());

        // Validate the Style in the database
        List<Style> styleList = styleRepository.findAll();
        assertThat(styleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStyle() throws Exception {
        // Initialize the database
        styleRepository.saveAndFlush(style);

        int databaseSizeBeforeDelete = styleRepository.findAll().size();

        // Delete the style
        restStyleMockMvc.perform(delete("/api/styles/{id}", style.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Style> styleList = styleRepository.findAll();
        assertThat(styleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Style.class);
        Style style1 = new Style();
        style1.setId(1L);
        Style style2 = new Style();
        style2.setId(style1.getId());
        assertThat(style1).isEqualTo(style2);
        style2.setId(2L);
        assertThat(style1).isNotEqualTo(style2);
        style1.setId(null);
        assertThat(style1).isNotEqualTo(style2);
    }
}

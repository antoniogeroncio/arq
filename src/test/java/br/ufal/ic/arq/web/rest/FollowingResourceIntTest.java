package br.ufal.ic.arq.web.rest;

import br.ufal.ic.arq.ArqApplicationApp;

import br.ufal.ic.arq.domain.Following;
import br.ufal.ic.arq.repository.FollowingRepository;
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
 * Test class for the FollowingResource REST controller.
 *
 * @see FollowingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ArqApplicationApp.class)
public class FollowingResourceIntTest {

    @Autowired
    private FollowingRepository followingRepository;

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

    private MockMvc restFollowingMockMvc;

    private Following following;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FollowingResource followingResource = new FollowingResource(followingRepository);
        this.restFollowingMockMvc = MockMvcBuilders.standaloneSetup(followingResource)
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
    public static Following createEntity(EntityManager em) {
        Following following = new Following();
        return following;
    }

    @Before
    public void initTest() {
        following = createEntity(em);
    }

    @Test
    @Transactional
    public void createFollowing() throws Exception {
        int databaseSizeBeforeCreate = followingRepository.findAll().size();

        // Create the Following
        restFollowingMockMvc.perform(post("/api/followings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(following)))
            .andExpect(status().isCreated());

        // Validate the Following in the database
        List<Following> followingList = followingRepository.findAll();
        assertThat(followingList).hasSize(databaseSizeBeforeCreate + 1);
        Following testFollowing = followingList.get(followingList.size() - 1);
    }

    @Test
    @Transactional
    public void createFollowingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = followingRepository.findAll().size();

        // Create the Following with an existing ID
        following.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFollowingMockMvc.perform(post("/api/followings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(following)))
            .andExpect(status().isBadRequest());

        // Validate the Following in the database
        List<Following> followingList = followingRepository.findAll();
        assertThat(followingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFollowings() throws Exception {
        // Initialize the database
        followingRepository.saveAndFlush(following);

        // Get all the followingList
        restFollowingMockMvc.perform(get("/api/followings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(following.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getFollowing() throws Exception {
        // Initialize the database
        followingRepository.saveAndFlush(following);

        // Get the following
        restFollowingMockMvc.perform(get("/api/followings/{id}", following.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(following.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingFollowing() throws Exception {
        // Get the following
        restFollowingMockMvc.perform(get("/api/followings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFollowing() throws Exception {
        // Initialize the database
        followingRepository.saveAndFlush(following);

        int databaseSizeBeforeUpdate = followingRepository.findAll().size();

        // Update the following
        Following updatedFollowing = followingRepository.findById(following.getId()).get();
        // Disconnect from session so that the updates on updatedFollowing are not directly saved in db
        em.detach(updatedFollowing);

        restFollowingMockMvc.perform(put("/api/followings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFollowing)))
            .andExpect(status().isOk());

        // Validate the Following in the database
        List<Following> followingList = followingRepository.findAll();
        assertThat(followingList).hasSize(databaseSizeBeforeUpdate);
        Following testFollowing = followingList.get(followingList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingFollowing() throws Exception {
        int databaseSizeBeforeUpdate = followingRepository.findAll().size();

        // Create the Following

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFollowingMockMvc.perform(put("/api/followings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(following)))
            .andExpect(status().isBadRequest());

        // Validate the Following in the database
        List<Following> followingList = followingRepository.findAll();
        assertThat(followingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFollowing() throws Exception {
        // Initialize the database
        followingRepository.saveAndFlush(following);

        int databaseSizeBeforeDelete = followingRepository.findAll().size();

        // Delete the following
        restFollowingMockMvc.perform(delete("/api/followings/{id}", following.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Following> followingList = followingRepository.findAll();
        assertThat(followingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Following.class);
        Following following1 = new Following();
        following1.setId(1L);
        Following following2 = new Following();
        following2.setId(following1.getId());
        assertThat(following1).isEqualTo(following2);
        following2.setId(2L);
        assertThat(following1).isNotEqualTo(following2);
        following1.setId(null);
        assertThat(following1).isNotEqualTo(following2);
    }
}

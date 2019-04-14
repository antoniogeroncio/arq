package br.ufal.ic.arq.web.rest;

import br.ufal.ic.arq.ArqApplicationApp;

import br.ufal.ic.arq.domain.UserSocial;
import br.ufal.ic.arq.repository.UserSocialRepository;
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
 * Test class for the UserSocialResource REST controller.
 *
 * @see UserSocialResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ArqApplicationApp.class)
public class UserSocialResourceIntTest {

    @Autowired
    private UserSocialRepository userSocialRepository;

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

    private MockMvc restUserSocialMockMvc;

    private UserSocial userSocial;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserSocialResource userSocialResource = new UserSocialResource(userSocialRepository);
        this.restUserSocialMockMvc = MockMvcBuilders.standaloneSetup(userSocialResource)
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
    public static UserSocial createEntity(EntityManager em) {
        UserSocial userSocial = new UserSocial();
        return userSocial;
    }

    @Before
    public void initTest() {
        userSocial = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserSocial() throws Exception {
        int databaseSizeBeforeCreate = userSocialRepository.findAll().size();

        // Create the UserSocial
        restUserSocialMockMvc.perform(post("/api/user-socials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSocial)))
            .andExpect(status().isCreated());

        // Validate the UserSocial in the database
        List<UserSocial> userSocialList = userSocialRepository.findAll();
        assertThat(userSocialList).hasSize(databaseSizeBeforeCreate + 1);
        UserSocial testUserSocial = userSocialList.get(userSocialList.size() - 1);
    }

    @Test
    @Transactional
    public void createUserSocialWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userSocialRepository.findAll().size();

        // Create the UserSocial with an existing ID
        userSocial.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserSocialMockMvc.perform(post("/api/user-socials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSocial)))
            .andExpect(status().isBadRequest());

        // Validate the UserSocial in the database
        List<UserSocial> userSocialList = userSocialRepository.findAll();
        assertThat(userSocialList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserSocials() throws Exception {
        // Initialize the database
        userSocialRepository.saveAndFlush(userSocial);

        // Get all the userSocialList
        restUserSocialMockMvc.perform(get("/api/user-socials?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userSocial.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getUserSocial() throws Exception {
        // Initialize the database
        userSocialRepository.saveAndFlush(userSocial);

        // Get the userSocial
        restUserSocialMockMvc.perform(get("/api/user-socials/{id}", userSocial.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userSocial.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUserSocial() throws Exception {
        // Get the userSocial
        restUserSocialMockMvc.perform(get("/api/user-socials/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserSocial() throws Exception {
        // Initialize the database
        userSocialRepository.saveAndFlush(userSocial);

        int databaseSizeBeforeUpdate = userSocialRepository.findAll().size();

        // Update the userSocial
        UserSocial updatedUserSocial = userSocialRepository.findById(userSocial.getId()).get();
        // Disconnect from session so that the updates on updatedUserSocial are not directly saved in db
        em.detach(updatedUserSocial);

        restUserSocialMockMvc.perform(put("/api/user-socials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserSocial)))
            .andExpect(status().isOk());

        // Validate the UserSocial in the database
        List<UserSocial> userSocialList = userSocialRepository.findAll();
        assertThat(userSocialList).hasSize(databaseSizeBeforeUpdate);
        UserSocial testUserSocial = userSocialList.get(userSocialList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingUserSocial() throws Exception {
        int databaseSizeBeforeUpdate = userSocialRepository.findAll().size();

        // Create the UserSocial

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserSocialMockMvc.perform(put("/api/user-socials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSocial)))
            .andExpect(status().isBadRequest());

        // Validate the UserSocial in the database
        List<UserSocial> userSocialList = userSocialRepository.findAll();
        assertThat(userSocialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserSocial() throws Exception {
        // Initialize the database
        userSocialRepository.saveAndFlush(userSocial);

        int databaseSizeBeforeDelete = userSocialRepository.findAll().size();

        // Delete the userSocial
        restUserSocialMockMvc.perform(delete("/api/user-socials/{id}", userSocial.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserSocial> userSocialList = userSocialRepository.findAll();
        assertThat(userSocialList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserSocial.class);
        UserSocial userSocial1 = new UserSocial();
        userSocial1.setId(1L);
        UserSocial userSocial2 = new UserSocial();
        userSocial2.setId(userSocial1.getId());
        assertThat(userSocial1).isEqualTo(userSocial2);
        userSocial2.setId(2L);
        assertThat(userSocial1).isNotEqualTo(userSocial2);
        userSocial1.setId(null);
        assertThat(userSocial1).isNotEqualTo(userSocial2);
    }
}

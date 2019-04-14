package br.ufal.ic.arq.web.rest;

import br.ufal.ic.arq.ArqApplicationApp;

import br.ufal.ic.arq.domain.Requirements;
import br.ufal.ic.arq.repository.RequirementsRepository;
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

import br.ufal.ic.arq.domain.enumeration.RequirementsType;
/**
 * Test class for the RequirementsResource REST controller.
 *
 * @see RequirementsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ArqApplicationApp.class)
public class RequirementsResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final RequirementsType DEFAULT_TYPE = RequirementsType.QA;
    private static final RequirementsType UPDATED_TYPE = RequirementsType.FUNCTIONAL;

    @Autowired
    private RequirementsRepository requirementsRepository;

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

    private MockMvc restRequirementsMockMvc;

    private Requirements requirements;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RequirementsResource requirementsResource = new RequirementsResource(requirementsRepository);
        this.restRequirementsMockMvc = MockMvcBuilders.standaloneSetup(requirementsResource)
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
    public static Requirements createEntity(EntityManager em) {
        Requirements requirements = new Requirements()
            .description(DEFAULT_DESCRIPTION)
            .type(DEFAULT_TYPE);
        return requirements;
    }

    @Before
    public void initTest() {
        requirements = createEntity(em);
    }

    @Test
    @Transactional
    public void createRequirements() throws Exception {
        int databaseSizeBeforeCreate = requirementsRepository.findAll().size();

        // Create the Requirements
        restRequirementsMockMvc.perform(post("/api/requirements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(requirements)))
            .andExpect(status().isCreated());

        // Validate the Requirements in the database
        List<Requirements> requirementsList = requirementsRepository.findAll();
        assertThat(requirementsList).hasSize(databaseSizeBeforeCreate + 1);
        Requirements testRequirements = requirementsList.get(requirementsList.size() - 1);
        assertThat(testRequirements.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRequirements.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createRequirementsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = requirementsRepository.findAll().size();

        // Create the Requirements with an existing ID
        requirements.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRequirementsMockMvc.perform(post("/api/requirements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(requirements)))
            .andExpect(status().isBadRequest());

        // Validate the Requirements in the database
        List<Requirements> requirementsList = requirementsRepository.findAll();
        assertThat(requirementsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = requirementsRepository.findAll().size();
        // set the field null
        requirements.setDescription(null);

        // Create the Requirements, which fails.

        restRequirementsMockMvc.perform(post("/api/requirements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(requirements)))
            .andExpect(status().isBadRequest());

        List<Requirements> requirementsList = requirementsRepository.findAll();
        assertThat(requirementsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = requirementsRepository.findAll().size();
        // set the field null
        requirements.setType(null);

        // Create the Requirements, which fails.

        restRequirementsMockMvc.perform(post("/api/requirements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(requirements)))
            .andExpect(status().isBadRequest());

        List<Requirements> requirementsList = requirementsRepository.findAll();
        assertThat(requirementsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRequirements() throws Exception {
        // Initialize the database
        requirementsRepository.saveAndFlush(requirements);

        // Get all the requirementsList
        restRequirementsMockMvc.perform(get("/api/requirements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(requirements.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getRequirements() throws Exception {
        // Initialize the database
        requirementsRepository.saveAndFlush(requirements);

        // Get the requirements
        restRequirementsMockMvc.perform(get("/api/requirements/{id}", requirements.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(requirements.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRequirements() throws Exception {
        // Get the requirements
        restRequirementsMockMvc.perform(get("/api/requirements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRequirements() throws Exception {
        // Initialize the database
        requirementsRepository.saveAndFlush(requirements);

        int databaseSizeBeforeUpdate = requirementsRepository.findAll().size();

        // Update the requirements
        Requirements updatedRequirements = requirementsRepository.findById(requirements.getId()).get();
        // Disconnect from session so that the updates on updatedRequirements are not directly saved in db
        em.detach(updatedRequirements);
        updatedRequirements
            .description(UPDATED_DESCRIPTION)
            .type(UPDATED_TYPE);

        restRequirementsMockMvc.perform(put("/api/requirements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRequirements)))
            .andExpect(status().isOk());

        // Validate the Requirements in the database
        List<Requirements> requirementsList = requirementsRepository.findAll();
        assertThat(requirementsList).hasSize(databaseSizeBeforeUpdate);
        Requirements testRequirements = requirementsList.get(requirementsList.size() - 1);
        assertThat(testRequirements.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRequirements.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingRequirements() throws Exception {
        int databaseSizeBeforeUpdate = requirementsRepository.findAll().size();

        // Create the Requirements

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRequirementsMockMvc.perform(put("/api/requirements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(requirements)))
            .andExpect(status().isBadRequest());

        // Validate the Requirements in the database
        List<Requirements> requirementsList = requirementsRepository.findAll();
        assertThat(requirementsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRequirements() throws Exception {
        // Initialize the database
        requirementsRepository.saveAndFlush(requirements);

        int databaseSizeBeforeDelete = requirementsRepository.findAll().size();

        // Delete the requirements
        restRequirementsMockMvc.perform(delete("/api/requirements/{id}", requirements.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Requirements> requirementsList = requirementsRepository.findAll();
        assertThat(requirementsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Requirements.class);
        Requirements requirements1 = new Requirements();
        requirements1.setId(1L);
        Requirements requirements2 = new Requirements();
        requirements2.setId(requirements1.getId());
        assertThat(requirements1).isEqualTo(requirements2);
        requirements2.setId(2L);
        assertThat(requirements1).isNotEqualTo(requirements2);
        requirements1.setId(null);
        assertThat(requirements1).isNotEqualTo(requirements2);
    }
}

package br.ufal.ic.arq.web.rest;

import br.ufal.ic.arq.ArqApplicationApp;

import br.ufal.ic.arq.domain.Version;
import br.ufal.ic.arq.repository.VersionRepository;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static br.ufal.ic.arq.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the VersionResource REST controller.
 *
 * @see VersionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ArqApplicationApp.class)
public class VersionResourceIntTest {

    private static final String DEFAULT_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_VERSION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_CODE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_CODE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_CODE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_CODE_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_DATE = "AAAAAAAAAA";
    private static final String UPDATED_DATE = "BBBBBBBBBB";

    @Autowired
    private VersionRepository versionRepository;

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

    private MockMvc restVersionMockMvc;

    private Version version;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VersionResource versionResource = new VersionResource(versionRepository);
        this.restVersionMockMvc = MockMvcBuilders.standaloneSetup(versionResource)
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
    public static Version createEntity(EntityManager em) {
        Version version = new Version()
            .version(DEFAULT_VERSION)
            .code(DEFAULT_CODE)
            .codeContentType(DEFAULT_CODE_CONTENT_TYPE)
            .date(DEFAULT_DATE);
        return version;
    }

    @Before
    public void initTest() {
        version = createEntity(em);
    }

    @Test
    @Transactional
    public void createVersion() throws Exception {
        int databaseSizeBeforeCreate = versionRepository.findAll().size();

        // Create the Version
        restVersionMockMvc.perform(post("/api/versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(version)))
            .andExpect(status().isCreated());

        // Validate the Version in the database
        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeCreate + 1);
        Version testVersion = versionList.get(versionList.size() - 1);
        assertThat(testVersion.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testVersion.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testVersion.getCodeContentType()).isEqualTo(DEFAULT_CODE_CONTENT_TYPE);
        assertThat(testVersion.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createVersionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = versionRepository.findAll().size();

        // Create the Version with an existing ID
        version.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVersionMockMvc.perform(post("/api/versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(version)))
            .andExpect(status().isBadRequest());

        // Validate the Version in the database
        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkVersionIsRequired() throws Exception {
        int databaseSizeBeforeTest = versionRepository.findAll().size();
        // set the field null
        version.setVersion(null);

        // Create the Version, which fails.

        restVersionMockMvc.perform(post("/api/versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(version)))
            .andExpect(status().isBadRequest());

        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = versionRepository.findAll().size();
        // set the field null
        version.setDate(null);

        // Create the Version, which fails.

        restVersionMockMvc.perform(post("/api/versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(version)))
            .andExpect(status().isBadRequest());

        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVersions() throws Exception {
        // Initialize the database
        versionRepository.saveAndFlush(version);

        // Get all the versionList
        restVersionMockMvc.perform(get("/api/versions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(version.getId().intValue())))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION.toString())))
            .andExpect(jsonPath("$.[*].codeContentType").value(hasItem(DEFAULT_CODE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(Base64Utils.encodeToString(DEFAULT_CODE))))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getVersion() throws Exception {
        // Initialize the database
        versionRepository.saveAndFlush(version);

        // Get the version
        restVersionMockMvc.perform(get("/api/versions/{id}", version.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(version.getId().intValue()))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION.toString()))
            .andExpect(jsonPath("$.codeContentType").value(DEFAULT_CODE_CONTENT_TYPE))
            .andExpect(jsonPath("$.code").value(Base64Utils.encodeToString(DEFAULT_CODE)))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVersion() throws Exception {
        // Get the version
        restVersionMockMvc.perform(get("/api/versions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVersion() throws Exception {
        // Initialize the database
        versionRepository.saveAndFlush(version);

        int databaseSizeBeforeUpdate = versionRepository.findAll().size();

        // Update the version
        Version updatedVersion = versionRepository.findById(version.getId()).get();
        // Disconnect from session so that the updates on updatedVersion are not directly saved in db
        em.detach(updatedVersion);
        updatedVersion
            .version(UPDATED_VERSION)
            .code(UPDATED_CODE)
            .codeContentType(UPDATED_CODE_CONTENT_TYPE)
            .date(UPDATED_DATE);

        restVersionMockMvc.perform(put("/api/versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVersion)))
            .andExpect(status().isOk());

        // Validate the Version in the database
        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeUpdate);
        Version testVersion = versionList.get(versionList.size() - 1);
        assertThat(testVersion.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testVersion.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testVersion.getCodeContentType()).isEqualTo(UPDATED_CODE_CONTENT_TYPE);
        assertThat(testVersion.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingVersion() throws Exception {
        int databaseSizeBeforeUpdate = versionRepository.findAll().size();

        // Create the Version

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVersionMockMvc.perform(put("/api/versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(version)))
            .andExpect(status().isBadRequest());

        // Validate the Version in the database
        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVersion() throws Exception {
        // Initialize the database
        versionRepository.saveAndFlush(version);

        int databaseSizeBeforeDelete = versionRepository.findAll().size();

        // Delete the version
        restVersionMockMvc.perform(delete("/api/versions/{id}", version.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Version.class);
        Version version1 = new Version();
        version1.setId(1L);
        Version version2 = new Version();
        version2.setId(version1.getId());
        assertThat(version1).isEqualTo(version2);
        version2.setId(2L);
        assertThat(version1).isNotEqualTo(version2);
        version1.setId(null);
        assertThat(version1).isNotEqualTo(version2);
    }
}

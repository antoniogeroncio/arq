package br.ufal.ic.arq.web.rest;

import br.ufal.ic.arq.ArqApplicationApp;

import br.ufal.ic.arq.domain.Metric;
import br.ufal.ic.arq.repository.MetricRepository;
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
 * Test class for the MetricResource REST controller.
 *
 * @see MetricResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ArqApplicationApp.class)
public class MetricResourceIntTest {

    @Autowired
    private MetricRepository metricRepository;

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

    private MockMvc restMetricMockMvc;

    private Metric metric;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MetricResource metricResource = new MetricResource(metricRepository);
        this.restMetricMockMvc = MockMvcBuilders.standaloneSetup(metricResource)
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
    public static Metric createEntity(EntityManager em) {
        Metric metric = new Metric();
        return metric;
    }

    @Before
    public void initTest() {
        metric = createEntity(em);
    }

    @Test
    @Transactional
    public void createMetric() throws Exception {
        int databaseSizeBeforeCreate = metricRepository.findAll().size();

        // Create the Metric
        restMetricMockMvc.perform(post("/api/metrics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(metric)))
            .andExpect(status().isCreated());

        // Validate the Metric in the database
        List<Metric> metricList = metricRepository.findAll();
        assertThat(metricList).hasSize(databaseSizeBeforeCreate + 1);
        Metric testMetric = metricList.get(metricList.size() - 1);
    }

    @Test
    @Transactional
    public void createMetricWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = metricRepository.findAll().size();

        // Create the Metric with an existing ID
        metric.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMetricMockMvc.perform(post("/api/metrics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(metric)))
            .andExpect(status().isBadRequest());

        // Validate the Metric in the database
        List<Metric> metricList = metricRepository.findAll();
        assertThat(metricList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMetrics() throws Exception {
        // Initialize the database
        metricRepository.saveAndFlush(metric);

        // Get all the metricList
        restMetricMockMvc.perform(get("/api/metrics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(metric.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getMetric() throws Exception {
        // Initialize the database
        metricRepository.saveAndFlush(metric);

        // Get the metric
        restMetricMockMvc.perform(get("/api/metrics/{id}", metric.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(metric.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMetric() throws Exception {
        // Get the metric
        restMetricMockMvc.perform(get("/api/metrics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMetric() throws Exception {
        // Initialize the database
        metricRepository.saveAndFlush(metric);

        int databaseSizeBeforeUpdate = metricRepository.findAll().size();

        // Update the metric
        Metric updatedMetric = metricRepository.findById(metric.getId()).get();
        // Disconnect from session so that the updates on updatedMetric are not directly saved in db
        em.detach(updatedMetric);

        restMetricMockMvc.perform(put("/api/metrics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMetric)))
            .andExpect(status().isOk());

        // Validate the Metric in the database
        List<Metric> metricList = metricRepository.findAll();
        assertThat(metricList).hasSize(databaseSizeBeforeUpdate);
        Metric testMetric = metricList.get(metricList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingMetric() throws Exception {
        int databaseSizeBeforeUpdate = metricRepository.findAll().size();

        // Create the Metric

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMetricMockMvc.perform(put("/api/metrics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(metric)))
            .andExpect(status().isBadRequest());

        // Validate the Metric in the database
        List<Metric> metricList = metricRepository.findAll();
        assertThat(metricList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMetric() throws Exception {
        // Initialize the database
        metricRepository.saveAndFlush(metric);

        int databaseSizeBeforeDelete = metricRepository.findAll().size();

        // Delete the metric
        restMetricMockMvc.perform(delete("/api/metrics/{id}", metric.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Metric> metricList = metricRepository.findAll();
        assertThat(metricList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Metric.class);
        Metric metric1 = new Metric();
        metric1.setId(1L);
        Metric metric2 = new Metric();
        metric2.setId(metric1.getId());
        assertThat(metric1).isEqualTo(metric2);
        metric2.setId(2L);
        assertThat(metric1).isNotEqualTo(metric2);
        metric1.setId(null);
        assertThat(metric1).isNotEqualTo(metric2);
    }
}

package br.ufal.ic.arq.web.rest;
import br.ufal.ic.arq.domain.Requirements;
import br.ufal.ic.arq.repository.RequirementsRepository;
import br.ufal.ic.arq.web.rest.errors.BadRequestAlertException;
import br.ufal.ic.arq.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Requirements.
 */
@RestController
@RequestMapping("/api")
public class RequirementsResource {

    private final Logger log = LoggerFactory.getLogger(RequirementsResource.class);

    private static final String ENTITY_NAME = "requirements";

    private final RequirementsRepository requirementsRepository;

    public RequirementsResource(RequirementsRepository requirementsRepository) {
        this.requirementsRepository = requirementsRepository;
    }

    /**
     * POST  /requirements : Create a new requirements.
     *
     * @param requirements the requirements to create
     * @return the ResponseEntity with status 201 (Created) and with body the new requirements, or with status 400 (Bad Request) if the requirements has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/requirements")
    public ResponseEntity<Requirements> createRequirements(@Valid @RequestBody Requirements requirements) throws URISyntaxException {
        log.debug("REST request to save Requirements : {}", requirements);
        if (requirements.getId() != null) {
            throw new BadRequestAlertException("A new requirements cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Requirements result = requirementsRepository.save(requirements);
        return ResponseEntity.created(new URI("/api/requirements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /requirements : Updates an existing requirements.
     *
     * @param requirements the requirements to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated requirements,
     * or with status 400 (Bad Request) if the requirements is not valid,
     * or with status 500 (Internal Server Error) if the requirements couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/requirements")
    public ResponseEntity<Requirements> updateRequirements(@Valid @RequestBody Requirements requirements) throws URISyntaxException {
        log.debug("REST request to update Requirements : {}", requirements);
        if (requirements.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Requirements result = requirementsRepository.save(requirements);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, requirements.getId().toString()))
            .body(result);
    }

    /**
     * GET  /requirements : get all the requirements.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of requirements in body
     */
    @GetMapping("/requirements")
    public List<Requirements> getAllRequirements() {
        log.debug("REST request to get all Requirements");
        return requirementsRepository.findAll();
    }

    /**
     * GET  /requirements/:id : get the "id" requirements.
     *
     * @param id the id of the requirements to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the requirements, or with status 404 (Not Found)
     */
    @GetMapping("/requirements/{id}")
    public ResponseEntity<Requirements> getRequirements(@PathVariable Long id) {
        log.debug("REST request to get Requirements : {}", id);
        Optional<Requirements> requirements = requirementsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(requirements);
    }

    /**
     * DELETE  /requirements/:id : delete the "id" requirements.
     *
     * @param id the id of the requirements to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/requirements/{id}")
    public ResponseEntity<Void> deleteRequirements(@PathVariable Long id) {
        log.debug("REST request to delete Requirements : {}", id);
        requirementsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

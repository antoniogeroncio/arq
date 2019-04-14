package br.ufal.ic.arq.web.rest;
import br.ufal.ic.arq.domain.Version;
import br.ufal.ic.arq.repository.VersionRepository;
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
 * REST controller for managing Version.
 */
@RestController
@RequestMapping("/api")
public class VersionResource {

    private final Logger log = LoggerFactory.getLogger(VersionResource.class);

    private static final String ENTITY_NAME = "version";

    private final VersionRepository versionRepository;

    public VersionResource(VersionRepository versionRepository) {
        this.versionRepository = versionRepository;
    }

    /**
     * POST  /versions : Create a new version.
     *
     * @param version the version to create
     * @return the ResponseEntity with status 201 (Created) and with body the new version, or with status 400 (Bad Request) if the version has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/versions")
    public ResponseEntity<Version> createVersion(@Valid @RequestBody Version version) throws URISyntaxException {
        log.debug("REST request to save Version : {}", version);
        if (version.getId() != null) {
            throw new BadRequestAlertException("A new version cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Version result = versionRepository.save(version);
        return ResponseEntity.created(new URI("/api/versions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /versions : Updates an existing version.
     *
     * @param version the version to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated version,
     * or with status 400 (Bad Request) if the version is not valid,
     * or with status 500 (Internal Server Error) if the version couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/versions")
    public ResponseEntity<Version> updateVersion(@Valid @RequestBody Version version) throws URISyntaxException {
        log.debug("REST request to update Version : {}", version);
        if (version.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Version result = versionRepository.save(version);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, version.getId().toString()))
            .body(result);
    }

    /**
     * GET  /versions : get all the versions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of versions in body
     */
    @GetMapping("/versions")
    public List<Version> getAllVersions() {
        log.debug("REST request to get all Versions");
        return versionRepository.findAll();
    }

    /**
     * GET  /versions/:id : get the "id" version.
     *
     * @param id the id of the version to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the version, or with status 404 (Not Found)
     */
    @GetMapping("/versions/{id}")
    public ResponseEntity<Version> getVersion(@PathVariable Long id) {
        log.debug("REST request to get Version : {}", id);
        Optional<Version> version = versionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(version);
    }

    /**
     * DELETE  /versions/:id : delete the "id" version.
     *
     * @param id the id of the version to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/versions/{id}")
    public ResponseEntity<Void> deleteVersion(@PathVariable Long id) {
        log.debug("REST request to delete Version : {}", id);
        versionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

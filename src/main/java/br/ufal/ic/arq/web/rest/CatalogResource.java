package br.ufal.ic.arq.web.rest;
import br.ufal.ic.arq.domain.Catalog;
import br.ufal.ic.arq.repository.CatalogRepository;
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
 * REST controller for managing Catalog.
 */
@RestController
@RequestMapping("/api")
public class CatalogResource {

    private final Logger log = LoggerFactory.getLogger(CatalogResource.class);

    private static final String ENTITY_NAME = "catalog";

    private final CatalogRepository catalogRepository;

    public CatalogResource(CatalogRepository catalogRepository) {
        this.catalogRepository = catalogRepository;
    }

    /**
     * POST  /catalogs : Create a new catalog.
     *
     * @param catalog the catalog to create
     * @return the ResponseEntity with status 201 (Created) and with body the new catalog, or with status 400 (Bad Request) if the catalog has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/catalogs")
    public ResponseEntity<Catalog> createCatalog(@Valid @RequestBody Catalog catalog) throws URISyntaxException {
        log.debug("REST request to save Catalog : {}", catalog);
        if (catalog.getId() != null) {
            throw new BadRequestAlertException("A new catalog cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Catalog result = catalogRepository.save(catalog);
        return ResponseEntity.created(new URI("/api/catalogs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /catalogs : Updates an existing catalog.
     *
     * @param catalog the catalog to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated catalog,
     * or with status 400 (Bad Request) if the catalog is not valid,
     * or with status 500 (Internal Server Error) if the catalog couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/catalogs")
    public ResponseEntity<Catalog> updateCatalog(@Valid @RequestBody Catalog catalog) throws URISyntaxException {
        log.debug("REST request to update Catalog : {}", catalog);
        if (catalog.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Catalog result = catalogRepository.save(catalog);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, catalog.getId().toString()))
            .body(result);
    }

    /**
     * GET  /catalogs : get all the catalogs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of catalogs in body
     */
    @GetMapping("/catalogs")
    public List<Catalog> getAllCatalogs() {
        log.debug("REST request to get all Catalogs");
        return catalogRepository.findAll();
    }

    /**
     * GET  /catalogs/:id : get the "id" catalog.
     *
     * @param id the id of the catalog to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the catalog, or with status 404 (Not Found)
     */
    @GetMapping("/catalogs/{id}")
    public ResponseEntity<Catalog> getCatalog(@PathVariable Long id) {
        log.debug("REST request to get Catalog : {}", id);
        Optional<Catalog> catalog = catalogRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(catalog);
    }

    /**
     * DELETE  /catalogs/:id : delete the "id" catalog.
     *
     * @param id the id of the catalog to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/catalogs/{id}")
    public ResponseEntity<Void> deleteCatalog(@PathVariable Long id) {
        log.debug("REST request to delete Catalog : {}", id);
        catalogRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

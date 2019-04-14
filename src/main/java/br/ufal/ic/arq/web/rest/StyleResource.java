package br.ufal.ic.arq.web.rest;
import br.ufal.ic.arq.domain.Style;
import br.ufal.ic.arq.repository.StyleRepository;
import br.ufal.ic.arq.web.rest.errors.BadRequestAlertException;
import br.ufal.ic.arq.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Style.
 */
@RestController
@RequestMapping("/api")
public class StyleResource {

    private final Logger log = LoggerFactory.getLogger(StyleResource.class);

    private static final String ENTITY_NAME = "style";

    private final StyleRepository styleRepository;

    public StyleResource(StyleRepository styleRepository) {
        this.styleRepository = styleRepository;
    }

    /**
     * POST  /styles : Create a new style.
     *
     * @param style the style to create
     * @return the ResponseEntity with status 201 (Created) and with body the new style, or with status 400 (Bad Request) if the style has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/styles")
    public ResponseEntity<Style> createStyle(@RequestBody Style style) throws URISyntaxException {
        log.debug("REST request to save Style : {}", style);
        if (style.getId() != null) {
            throw new BadRequestAlertException("A new style cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Style result = styleRepository.save(style);
        return ResponseEntity.created(new URI("/api/styles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /styles : Updates an existing style.
     *
     * @param style the style to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated style,
     * or with status 400 (Bad Request) if the style is not valid,
     * or with status 500 (Internal Server Error) if the style couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/styles")
    public ResponseEntity<Style> updateStyle(@RequestBody Style style) throws URISyntaxException {
        log.debug("REST request to update Style : {}", style);
        if (style.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Style result = styleRepository.save(style);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, style.getId().toString()))
            .body(result);
    }

    /**
     * GET  /styles : get all the styles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of styles in body
     */
    @GetMapping("/styles")
    public List<Style> getAllStyles() {
        log.debug("REST request to get all Styles");
        return styleRepository.findAll();
    }

    /**
     * GET  /styles/:id : get the "id" style.
     *
     * @param id the id of the style to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the style, or with status 404 (Not Found)
     */
    @GetMapping("/styles/{id}")
    public ResponseEntity<Style> getStyle(@PathVariable Long id) {
        log.debug("REST request to get Style : {}", id);
        Optional<Style> style = styleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(style);
    }

    /**
     * DELETE  /styles/:id : delete the "id" style.
     *
     * @param id the id of the style to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/styles/{id}")
    public ResponseEntity<Void> deleteStyle(@PathVariable Long id) {
        log.debug("REST request to delete Style : {}", id);
        styleRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

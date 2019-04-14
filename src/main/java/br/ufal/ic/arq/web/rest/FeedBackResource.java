package br.ufal.ic.arq.web.rest;
import br.ufal.ic.arq.domain.FeedBack;
import br.ufal.ic.arq.repository.FeedBackRepository;
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
 * REST controller for managing FeedBack.
 */
@RestController
@RequestMapping("/api")
public class FeedBackResource {

    private final Logger log = LoggerFactory.getLogger(FeedBackResource.class);

    private static final String ENTITY_NAME = "feedBack";

    private final FeedBackRepository feedBackRepository;

    public FeedBackResource(FeedBackRepository feedBackRepository) {
        this.feedBackRepository = feedBackRepository;
    }

    /**
     * POST  /feed-backs : Create a new feedBack.
     *
     * @param feedBack the feedBack to create
     * @return the ResponseEntity with status 201 (Created) and with body the new feedBack, or with status 400 (Bad Request) if the feedBack has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/feed-backs")
    public ResponseEntity<FeedBack> createFeedBack(@Valid @RequestBody FeedBack feedBack) throws URISyntaxException {
        log.debug("REST request to save FeedBack : {}", feedBack);
        if (feedBack.getId() != null) {
            throw new BadRequestAlertException("A new feedBack cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FeedBack result = feedBackRepository.save(feedBack);
        return ResponseEntity.created(new URI("/api/feed-backs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /feed-backs : Updates an existing feedBack.
     *
     * @param feedBack the feedBack to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated feedBack,
     * or with status 400 (Bad Request) if the feedBack is not valid,
     * or with status 500 (Internal Server Error) if the feedBack couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/feed-backs")
    public ResponseEntity<FeedBack> updateFeedBack(@Valid @RequestBody FeedBack feedBack) throws URISyntaxException {
        log.debug("REST request to update FeedBack : {}", feedBack);
        if (feedBack.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FeedBack result = feedBackRepository.save(feedBack);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, feedBack.getId().toString()))
            .body(result);
    }

    /**
     * GET  /feed-backs : get all the feedBacks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of feedBacks in body
     */
    @GetMapping("/feed-backs")
    public List<FeedBack> getAllFeedBacks() {
        log.debug("REST request to get all FeedBacks");
        return feedBackRepository.findAll();
    }

    /**
     * GET  /feed-backs/:id : get the "id" feedBack.
     *
     * @param id the id of the feedBack to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the feedBack, or with status 404 (Not Found)
     */
    @GetMapping("/feed-backs/{id}")
    public ResponseEntity<FeedBack> getFeedBack(@PathVariable Long id) {
        log.debug("REST request to get FeedBack : {}", id);
        Optional<FeedBack> feedBack = feedBackRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(feedBack);
    }

    /**
     * DELETE  /feed-backs/:id : delete the "id" feedBack.
     *
     * @param id the id of the feedBack to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/feed-backs/{id}")
    public ResponseEntity<Void> deleteFeedBack(@PathVariable Long id) {
        log.debug("REST request to delete FeedBack : {}", id);
        feedBackRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

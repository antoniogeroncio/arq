package br.ufal.ic.arq.web.rest;
import br.ufal.ic.arq.domain.UserSocial;
import br.ufal.ic.arq.repository.UserSocialRepository;
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
 * REST controller for managing UserSocial.
 */
@RestController
@RequestMapping("/api")
public class UserSocialResource {

    private final Logger log = LoggerFactory.getLogger(UserSocialResource.class);

    private static final String ENTITY_NAME = "userSocial";

    private final UserSocialRepository userSocialRepository;

    public UserSocialResource(UserSocialRepository userSocialRepository) {
        this.userSocialRepository = userSocialRepository;
    }

    /**
     * POST  /user-socials : Create a new userSocial.
     *
     * @param userSocial the userSocial to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userSocial, or with status 400 (Bad Request) if the userSocial has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-socials")
    public ResponseEntity<UserSocial> createUserSocial(@RequestBody UserSocial userSocial) throws URISyntaxException {
        log.debug("REST request to save UserSocial : {}", userSocial);
        if (userSocial.getId() != null) {
            throw new BadRequestAlertException("A new userSocial cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserSocial result = userSocialRepository.save(userSocial);
        return ResponseEntity.created(new URI("/api/user-socials/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-socials : Updates an existing userSocial.
     *
     * @param userSocial the userSocial to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userSocial,
     * or with status 400 (Bad Request) if the userSocial is not valid,
     * or with status 500 (Internal Server Error) if the userSocial couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-socials")
    public ResponseEntity<UserSocial> updateUserSocial(@RequestBody UserSocial userSocial) throws URISyntaxException {
        log.debug("REST request to update UserSocial : {}", userSocial);
        if (userSocial.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserSocial result = userSocialRepository.save(userSocial);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userSocial.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-socials : get all the userSocials.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userSocials in body
     */
    @GetMapping("/user-socials")
    public List<UserSocial> getAllUserSocials() {
        log.debug("REST request to get all UserSocials");
        return userSocialRepository.findAll();
    }

    /**
     * GET  /user-socials/:id : get the "id" userSocial.
     *
     * @param id the id of the userSocial to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userSocial, or with status 404 (Not Found)
     */
    @GetMapping("/user-socials/{id}")
    public ResponseEntity<UserSocial> getUserSocial(@PathVariable Long id) {
        log.debug("REST request to get UserSocial : {}", id);
        Optional<UserSocial> userSocial = userSocialRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userSocial);
    }

    /**
     * DELETE  /user-socials/:id : delete the "id" userSocial.
     *
     * @param id the id of the userSocial to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-socials/{id}")
    public ResponseEntity<Void> deleteUserSocial(@PathVariable Long id) {
        log.debug("REST request to delete UserSocial : {}", id);
        userSocialRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

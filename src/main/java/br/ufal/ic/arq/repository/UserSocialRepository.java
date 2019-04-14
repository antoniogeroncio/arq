package br.ufal.ic.arq.repository;

import br.ufal.ic.arq.domain.UserSocial;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserSocial entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserSocialRepository extends JpaRepository<UserSocial, Long> {

}

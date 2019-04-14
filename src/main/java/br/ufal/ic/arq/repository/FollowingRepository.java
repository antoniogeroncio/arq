package br.ufal.ic.arq.repository;

import br.ufal.ic.arq.domain.Following;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Following entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FollowingRepository extends JpaRepository<Following, Long> {

}

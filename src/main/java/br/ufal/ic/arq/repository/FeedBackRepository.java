package br.ufal.ic.arq.repository;

import br.ufal.ic.arq.domain.FeedBack;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FeedBack entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FeedBackRepository extends JpaRepository<FeedBack, Long> {

}

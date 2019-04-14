package br.ufal.ic.arq.repository;

import br.ufal.ic.arq.domain.Requirements;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Requirements entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RequirementsRepository extends JpaRepository<Requirements, Long> {

}

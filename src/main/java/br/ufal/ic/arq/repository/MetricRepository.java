package br.ufal.ic.arq.repository;

import br.ufal.ic.arq.domain.Metric;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Metric entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MetricRepository extends JpaRepository<Metric, Long> {

}

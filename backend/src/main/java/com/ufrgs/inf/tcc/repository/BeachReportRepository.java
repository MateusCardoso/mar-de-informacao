package com.ufrgs.inf.tcc.repository;

import com.ufrgs.inf.tcc.model.BeachReport;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BeachReportRepository extends CrudRepository<BeachReport, Long>{
    
}

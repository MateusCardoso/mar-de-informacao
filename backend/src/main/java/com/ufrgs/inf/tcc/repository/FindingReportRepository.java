package com.ufrgs.inf.tcc.repository;

import com.ufrgs.inf.tcc.model.FindingReport;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FindingReportRepository extends CrudRepository<FindingReport, Long>{
    
}

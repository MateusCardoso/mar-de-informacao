package com.ufrgs.inf.tcc.repository;

import com.ufrgs.inf.tcc.model.WindStatus;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WindStatusRepository extends CrudRepository<WindStatus, Long>{
    
}

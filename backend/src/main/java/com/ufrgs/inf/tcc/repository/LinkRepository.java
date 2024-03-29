package com.ufrgs.inf.tcc.repository;

import com.ufrgs.inf.tcc.model.Link;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LinkRepository extends CrudRepository<Link, Long>{
    
}

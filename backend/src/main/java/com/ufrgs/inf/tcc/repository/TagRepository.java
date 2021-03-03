package com.ufrgs.inf.tcc.repository;

import com.ufrgs.inf.tcc.model.Tag;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends CrudRepository<Tag, Long>{
    
}


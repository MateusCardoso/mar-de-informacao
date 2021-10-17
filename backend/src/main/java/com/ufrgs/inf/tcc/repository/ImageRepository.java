package com.ufrgs.inf.tcc.repository;

import com.ufrgs.inf.tcc.model.Image;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends CrudRepository<Image, Long>{
    
}

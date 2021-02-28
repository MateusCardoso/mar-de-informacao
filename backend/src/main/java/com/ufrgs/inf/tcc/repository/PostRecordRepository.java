package com.ufrgs.inf.tcc.repository;

import com.ufrgs.inf.tcc.model.PostRecord;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRecordRepository extends CrudRepository<PostRecord, Long> {

}
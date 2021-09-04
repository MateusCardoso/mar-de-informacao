package com.ufrgs.inf.tcc.repository;

import java.util.List;

import com.ufrgs.inf.tcc.model.PostRecord;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRecordRepository extends CrudRepository<PostRecord, Long> {

    @Query("SELECT DISTINCT post FROM PostRecord post INNER JOIN post.tags tag WHERE tag.id IN :tagIds")
    List<PostRecord> findAllWithTags( 
        @Param("tagIds") Iterable<Long> tagIds );
}
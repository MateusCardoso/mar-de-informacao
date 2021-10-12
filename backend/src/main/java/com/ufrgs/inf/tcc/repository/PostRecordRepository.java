package com.ufrgs.inf.tcc.repository;

import java.util.List;

import com.ufrgs.inf.tcc.model.Link;
import com.ufrgs.inf.tcc.model.PostRecord;
import com.ufrgs.inf.tcc.model.Tag;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRecordRepository extends PagingAndSortingRepository<PostRecord, Long> {

    @Query("SELECT post FROM PostRecord post INNER JOIN FETCH post.beachReport beachReport INNER JOIN FETCH beachReport.windStatus windStatus")
    List<PostRecord> findAllWithJoin(Sort sort);

    @Query("SELECT DISTINCT post FROM PostRecord post INNER JOIN post.tags tag WHERE tag.id IN :tagIds")
    List<PostRecord> findAllWithTags(
        @Param("tagIds") Iterable<Long> tagIds 
    );

    @Query("SELECT DISTINCT post FROM PostRecord post INNER JOIN FETCH post.beachReport beachReport INNER JOIN FETCH beachReport.windStatus windStatus INNER JOIN FETCH post.tags tag WHERE tag.id IN :tagIds")
    List<PostRecord> findAllWithTags(
        Sort sort, 
        @Param("tagIds") Iterable<Long> tagIds 
    );
    
    @Query("SELECT tag FROM Tag tag INNER JOIN tag.postRecords post WHERE post.id = :postId")
    List<Tag> findTagsFromPost(
        @Param("postId") Long postId
    );

    @Query("SELECT link FROM Link link INNER JOIN link.postRecord post WHERE post.id = :postId")
    List<Link> findLinksFromPost(
        @Param("postId") Long postId
    );
}
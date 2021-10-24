package com.ufrgs.inf.tcc.repository;

import java.util.List;

import com.ufrgs.inf.tcc.model.Image;
import com.ufrgs.inf.tcc.model.Link;
import com.ufrgs.inf.tcc.model.PostRecord;
import com.ufrgs.inf.tcc.model.Tag;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRecordRepository extends PagingAndSortingRepository<PostRecord, Long>, 
        JpaSpecificationExecutor<PostRecord> {
   
    @Query("SELECT tag FROM Tag tag INNER JOIN tag.postRecords post WHERE post.id = :postId")
    List<Tag> findTagsFromPost(
        @Param("postId") Long postId
    );

    @Query("SELECT link FROM Link link INNER JOIN link.postRecord post WHERE post.id = :postId")
    List<Link> findLinksFromPost(
        @Param("postId") Long postId
    );

    @Query("SELECT image FROM Image image INNER JOIN image.postRecord post WHERE post.id = :postId")
    List<Image> findImagesFromPost(
        @Param("postId") Long postId
    );
}
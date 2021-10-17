package com.ufrgs.inf.tcc.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties(value={"postRecord"})
public class Image {
    
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Long imageId;
    
    private String name;
    private Character category; 
    
    @Lob
    private byte[] content;
    
    @ManyToOne
    @JoinColumn(name = "postId")
    private PostRecord postRecord;
    
    public Image() {
    
    }
    
    public Long getId() {
        return imageId;
    }

    public void setId(Long imageId) {
        this.imageId = imageId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public Character getCategory() {
        return category;
    }

    public void setCategory(Character category) {
        this.category = category;
    }

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public PostRecord getPostRecord() {
        return postRecord;
    }

    public void setPostRecord(PostRecord postRecord) {
        this.postRecord = postRecord;
    }

}

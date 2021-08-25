package com.ufrgs.inf.tcc.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;
import java.util.Objects;

@Entity
@JsonIgnoreProperties(value={"postRecords"})
public class Tag {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long tagId;
	private String tagName;

    @ManyToMany(mappedBy = "tags", fetch = FetchType.EAGER)
	private List<PostRecord> postRecords;

	public Tag() {

	}

	public Tag(Long tagId, String tagName) {
		this();
		this.tagId = tagId;
		this.tagName = tagName;
	}

	public Long getId() {
		return tagId;
	}

	public void setId(Long tagId) {
		this.tagId = tagId;
	}

    public String getTagName() {
		return tagName;
	}

    public void setTagName(String tagName){
        this.tagName = tagName;
    }

	public List<PostRecord> getPostRecords() {
		return postRecords;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
		  return true;
		}
		if (o == null || getClass() != o.getClass()) {
		  return false;
		}
		Tag that = (Tag) o;
		return Objects.equals(tagId, that.tagId) &&
			    Objects.equals(tagName, that.tagName);
	}

	@Override
	public int hashCode() {
		return Objects.hash(tagId, tagName);
	}

	@Override
	public String toString() {
		return "Tag{" +
				"tagId=" + tagId +
				", tagName='" + tagName + '\'' +
				'}';
	}   
    
}

package com.ufrgs.inf.tcc.model;

import javax.persistence.*;

import java.util.List;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties(value = {"links","tags"})
public class PostRecord {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long postId;
	private String description;

	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name = "reportId")
	private BeachReport beachReport;

	@OneToMany(mappedBy = "postRecord")
	private List<Link> links;

	@ManyToMany
	@JoinTable(name 		= "Post_Tag",
		joinColumns 		= @JoinColumn(name = "postId ", referencedColumnName = "postId"),
		inverseJoinColumns 	= @JoinColumn(name = "tagId", referencedColumnName = "tagId")
	)
	private List<Tag> tags;

	public PostRecord() {

	}

	public PostRecord(Long postId, String description) {
		this();
		this.postId = postId;
		this.description = description;
	}

	public Long getId() {
		return postId;
	}

	public void setId(Long postId) {
		this.postId = postId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BeachReport getBeachReport(){
		return beachReport;
	}

	public void setBeachReport(BeachReport beachReport){
		this.beachReport = beachReport;
	}

	public List<Link> getLinks(){
		return links;
	}

	public List<Tag> getTags(){
		return tags;
	}

	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
		  return true;
		}
		if (o == null || getClass() != o.getClass()) {
		  return false;
		}
		PostRecord that = (PostRecord) o;
		return Objects.equals(postId, that.postId) &&
			    Objects.equals(description, that.description);
	}

	@Override
	public int hashCode() {
		return Objects.hash(postId, description);
	}

	@Override
	public String toString() {
		return "PostRecord{" +
				"postId=" + postId +
				", description='" + description + '\'' +
				'}';
	}
}

package com.ufrgs.inf.tcc.model;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties(value = {"links","tags"})
public class PostRecord {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long postId;
	private String title;
	@Column(length = 2048)
	private String description;
	private Character status;
	private LocalDateTime creationDateTime;
	private LocalDateTime publicationDateTime;

	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name = "reportId")
	private BeachReport beachReport;

	@OneToMany(mappedBy = "postRecord")
	private List<Link> links;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name 		= "Post_Tag",
		joinColumns 		= @JoinColumn(name = "postId ", referencedColumnName = "postId"),
		inverseJoinColumns 	= @JoinColumn(name = "tagId", referencedColumnName = "tagId")
	)
	private List<Tag> tags;

	public PostRecord() {

	}

	public PostRecord(Long postId, String description, String title) {
		this();
		this.postId = postId;
		this.title = title;
		this.description = description;
	}

	public Long getId() {
		return postId;
	}

	public void setId(Long postId) {
		this.postId = postId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Character getStatus() {
		return status;
	}

	public void setStatus(Character status) {
		this.status = status;
	}

	public LocalDateTime getCreationDateTime() {
		return creationDateTime;
	}

	public void setCreationDatetime(LocalDateTime creationDateTime) {
		this.creationDateTime = creationDateTime;
	}
	
	public LocalDateTime getPublicationDateTime() {
		return publicationDateTime;
	}

	public void setPublicationDatetime(LocalDateTime publicationDateTime) {
		this.publicationDateTime = publicationDateTime;
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

	public void setLinks(List<Link> links){
		this.links = links;
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
				Objects.equals(title, that.title) &&
			    Objects.equals(description, that.description);
	}

	@Override
	public int hashCode() {
		return Objects.hash(postId, title, description, status, creationDateTime, publicationDateTime);
	}

	@Override
	public String toString() {
		return "PostRecord{" +
				"postId=" + postId +
				", title='" + title + '\'' +
				", description='" + description + '\'' +
				", status='" + status + '\'' +
				", creationDateTime='" + creationDateTime + '\'' +
				", publicationDateTime='" + publicationDateTime + '\'' +
				'}';
	}
}

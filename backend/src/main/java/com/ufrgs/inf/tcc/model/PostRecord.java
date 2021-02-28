package com.ufrgs.inf.tcc.model;

import javax.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
public class PostRecord {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long postId;
	private String description;

	@OneToMany(mappedBy = "postRecord")
	private List<BeachReport> reports;

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

	public List<BeachReport> getReports(){
		return reports;
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

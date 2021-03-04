package com.ufrgs.inf.tcc.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Objects;

@Entity
@JsonIgnoreProperties(value={"postRecord"})
public class Link {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long linkId;
	private String linkName;
    private String url;

    @ManyToOne
    @JoinColumn(name = "postId")
    private PostRecord postRecord;

	public Link() {

	}

	public Link(Long linkId, String linkName, String url) {
		this();
		this.linkId = linkId;
		this.linkName = linkName;
        this.url = url;
	}

	public Long getId() {
		return linkId;
	}

	public void setId(Long linkId) {
		this.linkId = linkId;
	}

    public String getLinkName() {
		return linkName;
	}

    public void setLinkName(String linkName){
        this.linkName = linkName;
    }

	public String getUrl() {
		return url;
	}

    public void setUrl(String url) {
		this.url = url;
	}

	public PostRecord getPostRecord() {
		return postRecord;
	}

	public void setPostRecord(PostRecord postRecord) {
		this.postRecord = postRecord;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
		  return true;
		}
		if (o == null || getClass() != o.getClass()) {
		  return false;
		}
		Link that = (Link) o;
		return Objects.equals(linkId, that.linkId) &&
			    Objects.equals(linkName, that.linkName) &&
                Objects.equals(url, that.url);
	}

	@Override
	public int hashCode() {
		return Objects.hash(linkId, linkName, url);
	}

	@Override
	public String toString() {
		return "Link{" +
				"linkId=" + linkId +
				", linkName='" + linkName + '\'' +
                ", url='" + url + '\'' +
				'}';
	}   
}

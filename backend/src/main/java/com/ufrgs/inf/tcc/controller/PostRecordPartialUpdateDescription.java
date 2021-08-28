package com.ufrgs.inf.tcc.controller;

public class PostRecordPartialUpdateDescription {
    
    private Long postId;
	private String description;

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
}

package com.ufrgs.inf.tcc.controller;

public class BeachReportPartialUpdate {
    
	private Long reportId;
    private Double temperature;
	private String waterQuality;
    private Integer fishingConditions;

    public Long getId() {
		return reportId;
	}

	public void setId(Long reportId) {
		this.reportId = reportId;
	}

	public Double getTemperature() {
		return temperature;
	}

	public void setTemperature(Double temperature) {
		this.temperature = temperature;
	}

    public String getWaterQuality() {
		return waterQuality;
	}

	public void setWaterQuality(String waterQuality) {
		this.waterQuality = waterQuality;
	}

    public Integer getFishingConditions() {
		return fishingConditions;
	}

	public void setFishingConditions(Integer fishingConditions) {
		this.fishingConditions = fishingConditions;
	}
}

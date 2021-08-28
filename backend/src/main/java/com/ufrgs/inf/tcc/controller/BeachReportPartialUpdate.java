package com.ufrgs.inf.tcc.controller;

public class BeachReportPartialUpdate {
    
	private Long reportId;
    private Double temperature;
	private String waterQuality;

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
	
}

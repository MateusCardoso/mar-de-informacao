package com.ufrgs.inf.tcc.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Objects;

@Entity
@JsonIgnoreProperties(value = {"postRecord"})
public class BeachReport {


	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long reportId;
    private Double temperature;
	private String waterQuality;
    private Integer fishingConditions;

	@OneToOne(mappedBy = "beachReport")
    private PostRecord postRecord;

	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name = "windId")
	private WindStatus windStatus; 

	public BeachReport() {

	}

	public BeachReport(Long reportId, Double temperature, String waterQuality, Integer fishingConditions) {
		this();
		this.reportId = reportId;
		this.temperature = temperature;
        this.waterQuality = waterQuality;
        this.fishingConditions = fishingConditions;
	}

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

	public WindStatus getWindStatus(){
		return windStatus;
	}

	public void setWindStatus(WindStatus windStatus){
		this.windStatus = windStatus;
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
		BeachReport that = (BeachReport) o;
		return Objects.equals(reportId, that.reportId) &&
			    Objects.equals(temperature, that.temperature) &&
                Objects.equals(waterQuality, that.waterQuality) &&
                Objects.equals(fishingConditions, that.fishingConditions);
	}

	@Override
	public int hashCode() {
		return Objects.hash(reportId, temperature, waterQuality, fishingConditions);
	}

	@Override
	public String toString() {
		return "BeachReport{" +
				"reportId=" + reportId +
				", temperature='" + temperature + '\'' +
                ", waterQuality='" + waterQuality + '\'' +
                ", fishingConditions='" + fishingConditions + '\'' +
				'}';
	}
    
}

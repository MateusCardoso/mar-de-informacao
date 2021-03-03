package com.ufrgs.inf.tcc.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Objects;

@Entity
@JsonIgnoreProperties(value = {"beachReport"})
public class WindStatus {
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long windId;
	private String windDirection;
    private Double windVelocity;

    @OneToOne
    @JoinColumn(name = "reportId")
    private BeachReport beachReport;

	public WindStatus() {

	}

	public WindStatus(Long windId, String windDirection, Double windVelocity) {
		this();
		this.windId = windId;
		this.windDirection = windDirection;
        this.windVelocity = windVelocity;
	}

	public Long getId() {
		return windId;
	}

	public void setId(Long windId) {
		this.windId = windId;
	}

	public String getWindDirection() {
		return windDirection;
	}

	public void setWindDirection(String windDirection) {
		this.windDirection = windDirection;
	}

    public Double getWindVelocity() {
		return windVelocity;
	}

	public void setWindVelocity(Double windVelocity) {
		this.windVelocity = windVelocity;
	}

	public BeachReport getBeachReport() {
		return beachReport;
	}

	public void setBeachReport(BeachReport beachReport) {
		this.beachReport = beachReport;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
		  return true;
		}
		if (o == null || getClass() != o.getClass()) {
		  return false;
		}
		WindStatus that = (WindStatus) o;
		return Objects.equals(windId, that.windId) &&
			    Objects.equals(windDirection, that.windDirection) &&
                Objects.equals(windVelocity, that.windVelocity) &&
				Objects.equals(beachReport, that.beachReport);
	}

	@Override
	public int hashCode() {
		return Objects.hash(windId, windDirection, windVelocity);
	}

	@Override
	public String toString() {
		return "WindStatus{" +
				"windId=" + windId +
				", windDirection='" + windDirection + '\'' +
                ", windVelocity='" + windVelocity + '\'' +
				'}';
	}

}

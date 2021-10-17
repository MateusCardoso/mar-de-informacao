package com.ufrgs.inf.tcc.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Objects;

@Entity
@JsonIgnoreProperties(value = {"postRecord"})
public class FindingReport {
    
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long findingId;
	private String animalName;
	private String animalSpecies;
	private String garbageOrigin;
	private Double garbageQuantity;
    
	
	@OneToOne(mappedBy = "findingReport")
    private PostRecord postRecord;
	
	public FindingReport() {
		
	}

	public FindingReport(Long findingId, String animalName, String animalSpecies, String garbageOrigin, Double garbageQuantity) {
		this.findingId = findingId;
		this.animalName = animalName;
		this.animalSpecies = animalSpecies;
		this.garbageOrigin = garbageOrigin;
		this.garbageQuantity = garbageQuantity;
	}

	public Long getFindingId() {
		return findingId;
	}

	public void setFindingId(Long findingId) {
		this.findingId = findingId;
	}

	public String getAnimalName() {
		return animalName;
	}

	public void setAnimalName(String animalName) {
		this.animalName = animalName;
	}

	public String getAnimalSpecies() {
		return animalSpecies;
	}

	public void setAnimalSpecies(String animalSpecies) {
		this.animalSpecies = animalSpecies;
	}

	public String getGarbageOrigin() {
		return garbageOrigin;
	}	

	public void setGarbageOrigin(String garbageOrigin) {
		this.garbageOrigin = garbageOrigin;
	}	
	
	public Double getGarbageQuantity() {
		return garbageQuantity;
	}

	public void setGarbageQuantity(Double garbageQuantity) {
		this.garbageQuantity = garbageQuantity;
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
		FindingReport that = (FindingReport) o;
		return Objects.equals(findingId, that.findingId) &&
			    Objects.equals(animalName, that.animalName) &&
                Objects.equals(animalSpecies, that.animalSpecies) &&
                Objects.equals(garbageOrigin, that.garbageOrigin) &&
                Objects.equals(garbageQuantity, that.garbageQuantity);
	}

	@Override
	public int hashCode() {
		return Objects.hash(findingId, animalName, animalSpecies, garbageOrigin, garbageQuantity);
	}

	@Override
	public String toString() {
		return "FindingReport{" +
				"findingId=" + findingId +
				", animalName='" + animalName + '\'' +
                ", animalSpecies='" + animalSpecies + '\'' +
                ", garbageOrigin='" + garbageOrigin + '\'' +
                ", garbageQuantity='" + garbageQuantity + '\'' +
				'}';
	}

}

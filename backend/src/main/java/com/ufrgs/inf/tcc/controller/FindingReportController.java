package com.ufrgs.inf.tcc.controller;

import com.ufrgs.inf.tcc.model.FindingReport;
import com.ufrgs.inf.tcc.repository.FindingReportRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/findings")
@Api(tags = { "findings" })
public class FindingReportController {

    private FindingReportRepository findingReportRepository;

	public FindingReportController(FindingReportRepository findingReportRepository) {
		this.findingReportRepository = findingReportRepository;
	}

	@GetMapping
	@ApiOperation(value = "Find all Findings", nickname = "findAll")
	public Iterable<FindingReport> findAll() {
		return findingReportRepository.findAll();
	}

	@GetMapping("/{id}")
	@ApiOperation(value = "Find Findings by id", nickname = "findById")
	public FindingReport findById(@PathVariable("id") Long id) throws ObjectNotFoundException {
		Optional<FindingReport> findingReport = findingReportRepository.findById(id);
		if (!findingReport.isPresent()) {
			throw new ObjectNotFoundException(FindingReport.class, id);
		}
		return findingReport.get();
	}

	@PostMapping
	@ApiOperation(value = "Create Finding", nickname = "create")
	public ResponseEntity<FindingReport> create(@RequestBody FindingReport findingReport) {
		findingReport = findingReportRepository.save(findingReport);
		return ResponseEntity
				.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/" + findingReport.getId()).build().toUri())
				.body(findingReport);
	}

	@PatchMapping("/{id}")
	@ApiOperation(value = "Update Finding", nickname = "update")
	public FindingReport update(@RequestBody FindingReport findingReport, @PathVariable("id") Long id) throws ObjectNotFoundException, RequestInconsistentException {
		if (!id.equals(findingReport.getId())) {
			throw new RequestInconsistentException(String.format("Inconsistent IDs in url and body: url id: %d; body id: %d", findingReport.getId(), id));
		}
		if (!findingReportRepository.existsById(id)) {
			throw new ObjectNotFoundException(FindingReport.class, id);
		}
		Optional<FindingReport> dbFindingReport = findingReportRepository.findById(id);
		FindingReport oldFindingReport = dbFindingReport.get();
		oldFindingReport.setAnimalName(findingReport.getAnimalName());
		oldFindingReport.setAnimalSpecies(findingReport.getAnimalSpecies());
		oldFindingReport.setGarbageOrigin(findingReport.getGarbageOrigin());
		oldFindingReport.setGarbageQuantity(findingReport.getGarbageQuantity());
		return findingReportRepository.save(oldFindingReport);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete Finding", nickname = "delete")
	public void delete(@PathVariable("id") Long id) throws ObjectNotFoundException {
		if (!findingReportRepository.existsById(id)) {
			throw new ObjectNotFoundException(FindingReport.class, id);
		}
		findingReportRepository.deleteById(id);
	}

	@DeleteMapping
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete all Findings", nickname = "deleteAll")
	public void deleteAll() {
		findingReportRepository.deleteAll();
	}

    
}

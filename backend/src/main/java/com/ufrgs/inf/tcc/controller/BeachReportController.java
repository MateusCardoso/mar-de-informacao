package com.ufrgs.inf.tcc.controller;

import com.ufrgs.inf.tcc.model.BeachReport;
import com.ufrgs.inf.tcc.repository.BeachReportRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/reports")
@Api(tags = { "reports" })
public class BeachReportController {

    private BeachReportRepository BeachReportRepository;

	public BeachReportController(BeachReportRepository BeachReportRepository) {
		this.BeachReportRepository = BeachReportRepository;
	}

	@GetMapping
	@ApiOperation(value = "Find all Reports", nickname = "findAll")
	public Iterable<BeachReport> findAll() {
		return BeachReportRepository.findAll();
	}

	@GetMapping("/{id}")
	@ApiOperation(value = "Find Reports by id", nickname = "findById")
	public BeachReport findById(@PathVariable("id") Long id) throws ObjectNotFoundException {
		Optional<BeachReport> BeachReport = BeachReportRepository.findById(id);
		if (!BeachReport.isPresent()) {
			throw new ObjectNotFoundException(BeachReport.class, id);
		}
		return BeachReport.get();
	}

	@PostMapping
	@ApiOperation(value = "Create Report", nickname = "create")
	public ResponseEntity<BeachReport> create(@RequestBody BeachReport BeachReport) {
		BeachReport = BeachReportRepository.save(BeachReport);
		return ResponseEntity
				.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/" + BeachReport.getId()).build().toUri())
				.body(BeachReport);
	}

	@PutMapping("/{id}")
	@ApiOperation(value = "Update Report", nickname = "update")
	public BeachReport update(@RequestBody BeachReport BeachReport, @PathVariable("id") Long id) throws ObjectNotFoundException, RequestInconsistentException {
		if (!id.equals(BeachReport.getId())) {
			throw new RequestInconsistentException(String.format("Inconsistent IDs in url and body: url id: %d; body id: %d", BeachReport.getId(), id));
		}
		if (!BeachReportRepository.existsById(id)) {
			throw new ObjectNotFoundException(BeachReport.class, id);
		}
		return BeachReportRepository.save(BeachReport);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete Report", nickname = "delete")
	public void delete(@PathVariable("id") Long id) throws ObjectNotFoundException {
		if (!BeachReportRepository.existsById(id)) {
			throw new ObjectNotFoundException(BeachReport.class, id);
		}
		BeachReportRepository.deleteById(id);
	}

	@DeleteMapping
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete all Reports", nickname = "deleteAll")
	public void deleteAll() {
		BeachReportRepository.deleteAll();
	}

}

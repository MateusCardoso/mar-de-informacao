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

    private BeachReportRepository beachReportRepository;

	public BeachReportController(BeachReportRepository beachReportRepository) {
		this.beachReportRepository = beachReportRepository;
	}

	@GetMapping
	@ApiOperation(value = "Find all Reports", nickname = "findAll")
	public Iterable<BeachReport> findAll() {
		return beachReportRepository.findAll();
	}

	@GetMapping("/{id}")
	@ApiOperation(value = "Find Reports by id", nickname = "findById")
	public BeachReport findById(@PathVariable("id") Long id) throws ObjectNotFoundException {
		Optional<BeachReport> beachReport = beachReportRepository.findById(id);
		if (!beachReport.isPresent()) {
			throw new ObjectNotFoundException(BeachReport.class, id);
		}
		return beachReport.get();
	}

	@PostMapping
	@ApiOperation(value = "Create Report", nickname = "create")
	public ResponseEntity<BeachReport> create(@RequestBody BeachReport beachReport) {
		beachReport = beachReportRepository.save(beachReport);
		return ResponseEntity
				.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/" + beachReport.getId()).build().toUri())
				.body(beachReport);
	}

	@PatchMapping("/{id}")
	@ApiOperation(value = "Update Report", nickname = "update")
	public BeachReport update(@RequestBody BeachReport beachReport, @PathVariable("id") Long id) throws ObjectNotFoundException, RequestInconsistentException {
		if (!id.equals(beachReport.getId())) {
			throw new RequestInconsistentException(String.format("Inconsistent IDs in url and body: url id: %d; body id: %d", beachReport.getId(), id));
		}
		if (!beachReportRepository.existsById(id)) {
			throw new ObjectNotFoundException(BeachReport.class, id);
		}
		Optional<BeachReport> dbBeachReport = beachReportRepository.findById(id);
		BeachReport oldBeachReport = dbBeachReport.get();
		oldBeachReport.setTemperature(beachReport.getTemperature());
		oldBeachReport.setWaterQuality(beachReport.getWaterQuality());
		oldBeachReport.setRainVolume(beachReport.getRainVolume());
		oldBeachReport.setFishCatched(beachReport.getFishCatched());
		oldBeachReport.setFishQuantity(beachReport.getFishQuantity());
		return beachReportRepository.save(oldBeachReport);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete Report", nickname = "delete")
	public void delete(@PathVariable("id") Long id) throws ObjectNotFoundException {
		if (!beachReportRepository.existsById(id)) {
			throw new ObjectNotFoundException(BeachReport.class, id);
		}
		beachReportRepository.deleteById(id);
	}

	@DeleteMapping
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete all Reports", nickname = "deleteAll")
	public void deleteAll() {
		beachReportRepository.deleteAll();
	}

}

package com.ufrgs.inf.tcc.controller;

import com.ufrgs.inf.tcc.model.BeachReport;
import com.ufrgs.inf.tcc.model.PostRecord;
import com.ufrgs.inf.tcc.repository.PostRecordRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/posts")
@Api(tags = { "posts" })
public class PostRecordController {

    private PostRecordRepository postRecordRepository;

	public PostRecordController(PostRecordRepository postRecordRepository) {
		this.postRecordRepository = postRecordRepository;
	}

	@GetMapping
	@ApiOperation(value = "Find all Posts", nickname = "findAll")
	public Iterable<PostRecord> findAll() {
		return postRecordRepository.findAll();
	}

	@GetMapping("/{id}")
	@ApiOperation(value = "Find Posts by id", nickname = "findById")
	public PostRecord findById(@PathVariable("id") Long id) throws ObjectNotFoundException {
		Optional<PostRecord> postRecord = postRecordRepository.findById(id);
		if (!postRecord.isPresent()) {
			throw new ObjectNotFoundException(PostRecord.class, id);
		}
		return postRecord.get();
	}

	@PostMapping
	@ApiOperation(value = "Create Post", nickname = "create")
	public ResponseEntity<PostRecord> create(@RequestBody PostRecord postRecord) {
		postRecord = postRecordRepository.save(postRecord);
		return ResponseEntity
				.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/" + postRecord.getId()).build().toUri())
				.body(postRecord);
	}

	@PatchMapping("/{id}")
	@ApiOperation(value = "Update Post", nickname = "update")
	public PostRecord update(@RequestBody PostRecordPartialUpdateDescription postRecord, @PathVariable("id") Long id) throws ObjectNotFoundException, RequestInconsistentException {
		if (!id.equals(postRecord.getId())) {
			throw new RequestInconsistentException(String.format("Inconsistent IDs in url and body: url id: %d; body id: %d", postRecord.getId(), id));
		}
		if (!postRecordRepository.existsById(id)) {
			throw new ObjectNotFoundException(PostRecord.class, id);
		}
		Optional<PostRecord> dbPostRecord = postRecordRepository.findById(id);
		PostRecord oldPostRecord = dbPostRecord.get();
		oldPostRecord.setDescription(postRecord.getDescription());
		return postRecordRepository.save(oldPostRecord);
	}

	@PatchMapping("/{id}/beachReport")
	@ApiOperation(value = "Update Post", nickname = "update")
	public PostRecord update(@RequestBody PostRecord postRecord, @PathVariable("id") Long id) throws ObjectNotFoundException, RequestInconsistentException {
		if (!id.equals(postRecord.getId())) {
			throw new RequestInconsistentException(String.format("Inconsistent IDs in url and body: url id: %d; body id: %d", postRecord.getId(), id));
		}
		if (!postRecordRepository.existsById(id)) {
			throw new ObjectNotFoundException(PostRecord.class, id);
		}
		Optional<PostRecord> dbPostRecord = postRecordRepository.findById(id);
		PostRecord oldPostRecord = dbPostRecord.get();
		BeachReport beachReport = postRecord.getBeachReport();
		BeachReport oldBeachReport = oldPostRecord.getBeachReport();
		oldBeachReport.setFishingConditions(beachReport.getFishingConditions());
		oldBeachReport.setTemperature(beachReport.getTemperature());
		oldBeachReport.setWaterQuality(beachReport.getWaterQuality());
		return postRecordRepository.save(oldPostRecord);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete Post", nickname = "delete")
	public void delete(@PathVariable("id") Long id) throws ObjectNotFoundException {
		if (!postRecordRepository.existsById(id)) {
			throw new ObjectNotFoundException(PostRecord.class, id);
		}
		postRecordRepository.deleteById(id);
	}

	@DeleteMapping
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete all Posts", nickname = "deleteAll")
	public void deleteAll() {
		postRecordRepository.deleteAll();
	}
    
}

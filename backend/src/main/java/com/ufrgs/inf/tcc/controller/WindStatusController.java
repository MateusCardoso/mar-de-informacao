package com.ufrgs.inf.tcc.controller;

import com.ufrgs.inf.tcc.model.WindStatus;
import com.ufrgs.inf.tcc.repository.WindStatusRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/windStatus")
@Api(tags = { "windStatus" })
public class WindStatusController {

    private WindStatusRepository windStatusRepository;

	public WindStatusController(WindStatusRepository windStatusRepository) {
		this.windStatusRepository = windStatusRepository;
	}

	@GetMapping
	@ApiOperation(value = "Find all Wind Status", nickname = "findAll")
	public Iterable<WindStatus> findAll() {
		return windStatusRepository.findAll();
	}

	@GetMapping("/{id}")
	@ApiOperation(value = "Find Wind Status by id", nickname = "findById")
	public WindStatus findById(@PathVariable("id") Long id) throws ObjectNotFoundException {
		Optional<WindStatus> windStatus = windStatusRepository.findById(id);
		if (!windStatus.isPresent()) {
			throw new ObjectNotFoundException(WindStatus.class, id);
		}
		return windStatus.get();
	}

	@PostMapping
	@ApiOperation(value = "Create Wind Status", nickname = "create")
	public ResponseEntity<WindStatus> create(@RequestBody WindStatus windStatus) {
		windStatus = windStatusRepository.save(windStatus);
		return ResponseEntity
				.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/" + windStatus.getId()).build().toUri())
				.body(windStatus);
	}

	@PutMapping("/{id}")
	@ApiOperation(value = "Update Wind Status", nickname = "update")
	public WindStatus update(@RequestBody WindStatus windStatus, @PathVariable("id") Long id) throws ObjectNotFoundException, RequestInconsistentException {
		if (!id.equals(windStatus.getId())) {
			throw new RequestInconsistentException(String.format("Inconsistent IDs in url and body: url id: %d; body id: %d", windStatus.getId(), id));
		}
		if (!windStatusRepository.existsById(id)) {
			throw new ObjectNotFoundException(WindStatus.class, id);
		}
		return windStatusRepository.save(windStatus);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete Wind Status", nickname = "delete")
	public void delete(@PathVariable("id") Long id) throws ObjectNotFoundException {
		if (!windStatusRepository.existsById(id)) {
			throw new ObjectNotFoundException(WindStatus.class, id);
		}
		windStatusRepository.deleteById(id);
	}

	@DeleteMapping
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete all Wind Status", nickname = "deleteAll")
	public void deleteAll() {
		windStatusRepository.deleteAll();
	}

}

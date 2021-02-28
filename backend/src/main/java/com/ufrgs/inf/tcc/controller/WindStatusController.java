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

    private WindStatusRepository WindStatusRepository;

	public WindStatusController(WindStatusRepository WindStatusRepository) {
		this.WindStatusRepository = WindStatusRepository;
	}

	@GetMapping
	@ApiOperation(value = "Find all Wind Status", nickname = "findAll")
	public Iterable<WindStatus> findAll() {
		return WindStatusRepository.findAll();
	}

	@GetMapping("/{id}")
	@ApiOperation(value = "Find Wind Status by id", nickname = "findById")
	public WindStatus findById(@PathVariable("id") Long id) throws ObjectNotFoundException {
		Optional<WindStatus> WindStatus = WindStatusRepository.findById(id);
		if (!WindStatus.isPresent()) {
			throw new ObjectNotFoundException(WindStatus.class, id);
		}
		return WindStatus.get();
	}

	@PostMapping
	@ApiOperation(value = "Create Wind Status", nickname = "create")
	public ResponseEntity<WindStatus> create(@RequestBody WindStatus WindStatus) {
		WindStatus = WindStatusRepository.save(WindStatus);
		return ResponseEntity
				.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/" + WindStatus.getId()).build().toUri())
				.body(WindStatus);
	}

	@PutMapping("/{id}")
	@ApiOperation(value = "Update Wind Status", nickname = "update")
	public WindStatus update(@RequestBody WindStatus WindStatus, @PathVariable("id") Long id) throws ObjectNotFoundException, RequestInconsistentException {
		if (!id.equals(WindStatus.getId())) {
			throw new RequestInconsistentException(String.format("Inconsistent IDs in url and body: url id: %d; body id: %d", WindStatus.getId(), id));
		}
		if (!WindStatusRepository.existsById(id)) {
			throw new ObjectNotFoundException(WindStatus.class, id);
		}
		return WindStatusRepository.save(WindStatus);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete Wind Status", nickname = "delete")
	public void delete(@PathVariable("id") Long id) throws ObjectNotFoundException {
		if (!WindStatusRepository.existsById(id)) {
			throw new ObjectNotFoundException(WindStatus.class, id);
		}
		WindStatusRepository.deleteById(id);
	}

	@DeleteMapping
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete all Wind Status", nickname = "deleteAll")
	public void deleteAll() {
		WindStatusRepository.deleteAll();
	}

}

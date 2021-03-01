package com.ufrgs.inf.tcc.controller;

import com.ufrgs.inf.tcc.model.Link;
import com.ufrgs.inf.tcc.repository.LinkRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/links")
@Api(tags = { "links" })
public class LinkController {
    
    private LinkRepository LinkRepository;

	public LinkController(LinkRepository LinkRepository) {
		this.LinkRepository = LinkRepository;
	}

	@GetMapping
	@ApiOperation(value = "Find all Links", nickname = "findAll")
	public Iterable<Link> findAll() {
		return LinkRepository.findAll();
	}

	@GetMapping("/{id}")
	@ApiOperation(value = "Find Links by id", nickname = "findById")
	public Link findById(@PathVariable("id") Long id) throws ObjectNotFoundException {
		Optional<Link> Link = LinkRepository.findById(id);
		if (!Link.isPresent()) {
			throw new ObjectNotFoundException(Link.class, id);
		}
		return Link.get();
	}

	@PostMapping
	@ApiOperation(value = "Create Link", nickname = "create")
	public ResponseEntity<Link> create(@RequestBody Link Link) {
		Link = LinkRepository.save(Link);
		return ResponseEntity
				.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/" + Link.getId()).build().toUri())
				.body(Link);
	}

	@PutMapping("/{id}")
	@ApiOperation(value = "Update Link", nickname = "update")
	public Link update(@RequestBody Link Link, @PathVariable("id") Long id) throws ObjectNotFoundException, RequestInconsistentException {
		if (!id.equals(Link.getId())) {
			throw new RequestInconsistentException(String.format("Inconsistent IDs in url and body: url id: %d; body id: %d", Link.getId(), id));
		}
		if (!LinkRepository.existsById(id)) {
			throw new ObjectNotFoundException(Link.class, id);
		}
		return LinkRepository.save(Link);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete Link", nickname = "delete")
	public void delete(@PathVariable("id") Long id) throws ObjectNotFoundException {
		if (!LinkRepository.existsById(id)) {
			throw new ObjectNotFoundException(Link.class, id);
		}
		LinkRepository.deleteById(id);
	}

	@DeleteMapping
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete all Links", nickname = "deleteAll")
	public void deleteAll() {
		LinkRepository.deleteAll();
	}

}

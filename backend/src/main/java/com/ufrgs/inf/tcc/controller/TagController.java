package com.ufrgs.inf.tcc.controller;

import com.ufrgs.inf.tcc.model.Tag;
import com.ufrgs.inf.tcc.repository.TagRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/tags")
@Api(tags = { "tags" })
public class TagController {
        
    private TagRepository tagRepository;

	public TagController(TagRepository tagRepository) {
		this.tagRepository = tagRepository;
	}

	@GetMapping
	@ApiOperation(value = "Find all Tags", nickname = "findAll")
	public Iterable<Tag> findAll() {
		return tagRepository.findAll();
	}

	@GetMapping("/{id}")
	@ApiOperation(value = "Find Tags by id", nickname = "findById")
	public Tag findById(@PathVariable("id") Long id) throws ObjectNotFoundException {
		Optional<Tag> tag = tagRepository.findById(id);
		if (!tag.isPresent()) {
			throw new ObjectNotFoundException(Tag.class, id);
		}
		return tag.get();
	}

	@PostMapping
	@ApiOperation(value = "Create Tag", nickname = "create")
	public ResponseEntity<Tag> create(@RequestBody Tag tag) {
		tag = tagRepository.save(tag);
		return ResponseEntity
				.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/" + tag.getId()).build().toUri())
				.body(tag);
	}

	@PutMapping("/{id}")
	@ApiOperation(value = "Update Tag", nickname = "update")
	public Tag update(@RequestBody Tag tag, @PathVariable("id") Long id) throws ObjectNotFoundException, RequestInconsistentException {
		if (!id.equals(tag.getId())) {
			throw new RequestInconsistentException(String.format("Inconsistent IDs in url and body: url id: %d; body id: %d", tag.getId(), id));
		}
		if (!tagRepository.existsById(id)) {
			throw new ObjectNotFoundException(Tag.class, id);
		}
		return tagRepository.save(tag);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete Tag", nickname = "delete")
	public void delete(@PathVariable("id") Long id) throws ObjectNotFoundException {
		if (!tagRepository.existsById(id)) {
			throw new ObjectNotFoundException(Tag.class, id);
		}
		tagRepository.deleteById(id);
	}

	@DeleteMapping
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete all Tags", nickname = "deleteAll")
	public void deleteAll() {
		tagRepository.deleteAll();
	}

}

package com.ufrgs.inf.tcc.controller;

import com.ufrgs.inf.tcc.model.Link;
import com.ufrgs.inf.tcc.model.PostRecord;
import com.ufrgs.inf.tcc.repository.LinkRepository;
import com.ufrgs.inf.tcc.repository.PostRecordRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/links")
@Api(tags = { "links" })
public class LinkController {
    
    private LinkRepository linkRepository;
	private PostRecordRepository postRecordRepository;

	public LinkController(LinkRepository linkRepository, PostRecordRepository postRecordRepository) {
		this.linkRepository = linkRepository;
		this.postRecordRepository = postRecordRepository;
	}

	@GetMapping
	@ApiOperation(value = "Find all Links", nickname = "findAll")
	public Iterable<Link> findAll() {
		return linkRepository.findAll();
	}

	@GetMapping("/{id}")
	@ApiOperation(value = "Find Links by id", nickname = "findById")
	public Link findById(@PathVariable("id") Long id) throws ObjectNotFoundException {
		Optional<Link> link = linkRepository.findById(id);
		if (!link.isPresent()) {
			throw new ObjectNotFoundException(Link.class, id);
		}
		return link.get();
	}

	@PostMapping
	@ApiOperation(value = "Create Link", nickname = "create")
	public ResponseEntity<Link> create(@RequestBody Link link) {
		link = linkRepository.save(link);
		return ResponseEntity
				.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/" + link.getId()).build().toUri())
				.body(link);
	}

	@PostMapping("/postId={postId}")
	@ApiOperation(value = "Create Link under Post", nickname = "createOnPost")
	public ResponseEntity<Link> createOnPost(@PathVariable("postId") Long postId, @RequestBody Link link) {
		link = linkRepository.save(link);
		PostRecord postRecord = postRecordRepository.findById(postId).get();
		List<Link> currentLinks = postRecordRepository.findLinksFromPost(postId);
		currentLinks.add(link);
		postRecord.setLinks(currentLinks);
		link.setPostRecord(postRecord);
		
		link = linkRepository.save(link);
		postRecordRepository.save(postRecord);
		return ResponseEntity
				.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/" + link.getId()).build().toUri())
				.body(link);
	}

	@PatchMapping("/{id}")
	@ApiOperation(value = "Update Link", nickname = "update")
	public Link update(@RequestBody Link link, @PathVariable("id") Long id) throws ObjectNotFoundException, RequestInconsistentException {
		if (!id.equals(link.getId())) {
			throw new RequestInconsistentException(String.format("Inconsistent IDs in url and body: url id: %d; body id: %d", link.getId(), id));
		}
		if (!linkRepository.existsById(id)) {
			throw new ObjectNotFoundException(Link.class, id);
		}
		Link currentLink = linkRepository.findById(id).get();
		link.setPostRecord(currentLink.getPostRecord());
		return linkRepository.save(link);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete Link", nickname = "delete")
	public void delete(@PathVariable("id") Long id) throws ObjectNotFoundException {
		if (!linkRepository.existsById(id)) {
			throw new ObjectNotFoundException(Link.class, id);
		}
		linkRepository.deleteById(id);
	}

	@DeleteMapping
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete all Links", nickname = "deleteAll")
	public void deleteAll() {
		linkRepository.deleteAll();
	}

}

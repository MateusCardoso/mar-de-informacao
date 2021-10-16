package com.ufrgs.inf.tcc.controller;

import com.ufrgs.inf.tcc.model.Link;
import com.ufrgs.inf.tcc.model.PostRecord;
import com.ufrgs.inf.tcc.repository.PostRecordRepository;
import com.ufrgs.inf.tcc.model.Tag;
import com.ufrgs.inf.tcc.repository.TagRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Optional;
import java.util.List;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/posts")
@Api(tags = { "posts" })
public class PostRecordController {

    private PostRecordRepository postRecordRepository;
	private TagRepository tagRepository;

	public PostRecordController(PostRecordRepository postRecordRepository, TagRepository tagRepository) {
		this.postRecordRepository = postRecordRepository;
		this.tagRepository = tagRepository;
	}

	@GetMapping
	@ApiOperation(value = "Find all Posts", nickname = "findAll")
	public Iterable<PostRecord> findAll() {
		return postRecordRepository.findAll();
	}

	@GetMapping("/orderedBy")
	@ApiOperation(value = "Get Ordered Posts", nickname = "findAllOrderedBy")
	public Iterable<PostRecord> findAllOrderedBy(@RequestParam(required = false) String entityName, @RequestParam("field") String field, @RequestParam("order") String order) {
		return postRecordRepository.findAll(Sort.by(Sort.Direction.fromString(order), getOrderByFieldName(entityName, field)));
	}

	@GetMapping("/filteredBy")
	@ApiOperation(value = "Get Filtered Posts", nickname = "getAllFilteredBy")
	public Iterable<PostRecord> getAllFilteredBy(@RequestParam(required = false) List<Long> tagIds, @RequestParam(required = false) @DateTimeFormat(iso = ISO.DATE_TIME) List<LocalDate> dateRange,
		@RequestParam(required = false) String entityName, @RequestParam(required = false) String field, @RequestParam(required = false) String order){		
		PostRecordCombineSpecification specificationBuilder = new PostRecordCombineSpecification();
		
		if(tagIds != null){
			for (long tagId : tagIds){
				specificationBuilder.with("tagId", "EQ", tagId);
			}
		}
		
		if(dateRange != null){
			if(dateRange.size() == 1){
				specificationBuilder.with("publicationDate", "EQ", Date.valueOf(dateRange.get(0)));
			}else if(dateRange.size() == 2){
				specificationBuilder.with("publicationDate", "GE", Date.valueOf(dateRange.get(0)));
				specificationBuilder.with("publicationDate", "LE", Date.valueOf(dateRange.get(1)));
			}
		}
		Specification<PostRecord> combinedSpecification = specificationBuilder.combine();
		
		if(field != null){
			return postRecordRepository.findAll(combinedSpecification, Sort.by(Sort.Direction.fromString(order), getOrderByFieldName(entityName, field)));
		} else{
			return postRecordRepository.findAll(combinedSpecification);
		}
	}

	private String getOrderByFieldName(String entityName, String field){
		if(entityName != null){
			return entityName+"."+field;
		}else{
			return field;
		}
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

	@GetMapping("/{id}/links")
	@ApiOperation(value = "Get Links from Post", nickname = "linkFromPost")
	public Iterable<Link> linkFromPost(@PathVariable("id") Long id) throws ObjectNotFoundException {
		Optional<PostRecord> postRecord = postRecordRepository.findById(id);
		if (!postRecord.isPresent()) {
			throw new ObjectNotFoundException(PostRecord.class, id);
		}
		return postRecordRepository.findLinksFromPost(id);
	}

	@GetMapping("/{id}/tags")
	@ApiOperation(value = "Get Post Tags", nickname = "get tags")
	public Iterable<Tag> getTagsFromPost(@PathVariable("id") Long id){		
		return postRecordRepository.findTagsFromPost(id);
	}

	@PostMapping
	@ApiOperation(value = "Create Post", nickname = "create")
	public ResponseEntity<PostRecord> create(@RequestBody PostRecord postRecord) {
		postRecord.setStatus('D');
		postRecord.setCreationDate(Date.valueOf(LocalDate.now()));
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
		oldPostRecord.setTitle(postRecord.getTitle());
		return postRecordRepository.save(oldPostRecord);
	}

	@PatchMapping("/publish/{id}")
	@ApiOperation(value = "Publish Post", nickname = "publish")
	public PostRecord publish(@PathVariable("id") Long id) throws ObjectNotFoundException, RequestInconsistentException {
		if (!postRecordRepository.existsById(id)) {
			throw new ObjectNotFoundException(PostRecord.class, id);
		}
		PostRecord postRecord = postRecordRepository.findById(id).get();
		postRecord.setStatus('P');
		postRecord.setPublicationDate(Date.valueOf(LocalDate.now()));
		return postRecordRepository.save(postRecord);
	}

	@PatchMapping("/{id}/tags")
	@ApiOperation(value = "Update Tag Relations", nickname = "update relation")
	public PostRecord addTagToPost(@PathVariable("id") Long id, @RequestParam("tagIds") List<Long> tagIds) throws ObjectNotFoundException, RequestInconsistentException {
		if (!postRecordRepository.existsById(id)) {
			throw new ObjectNotFoundException(Tag.class, id);
		}
		
		Optional<PostRecord> postRecordPromise = postRecordRepository.findById(id);
		PostRecord postRecord = postRecordPromise.get();
		
		List<Tag> currentTags = postRecord.getTags();
		List<Tag> newTags = new ArrayList<Tag>();
		List<Tag> tagsToRemoveRelation = new ArrayList<Tag>();;

		for (long tagId : tagIds){
			Optional<Tag> tagPromise = tagRepository.findById(tagId);
			Tag tag = tagPromise.get();
			newTags.add(tag);
			if (!currentTags.contains(tag)){
				List<PostRecord> relatedPosts = tag.getPostRecords();
				relatedPosts.add(postRecord);
				currentTags.add(tag);
			}
		}
		tagRepository.saveAll(newTags);

		for (Tag tag : currentTags){
			if (!newTags.contains(tag)){
				List<PostRecord> relatedPosts = tag.getPostRecords();
				relatedPosts.remove(postRecord);
				tagsToRemoveRelation.add(tag);
			}
		}
		currentTags.removeAll(tagsToRemoveRelation);
		tagRepository.saveAll(tagsToRemoveRelation);
				
		return postRecordRepository.save(postRecord);
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

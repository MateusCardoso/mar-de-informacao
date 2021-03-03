package com.ufrgs.inf.tcc.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ufrgs.inf.tcc.model.PostRecord;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.ResultMatcher;

import java.io.IOException;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
public class PostRecordControllerTest {
	private static final String CONTROLLER_BASE_PATH = "/api/v1/posts";

	@Autowired
	private MockMvc mockMvc;

	@After
	public void tearDown() throws Exception {
		deleteAll();
	}

	@Test
	public void findAllShouldInitiallyReturnAnEmptyArray() throws Exception {
		findAll()
				.andExpect(status().isOk())
				.andExpect(jsonArrayLength(0));
	}

	@Test
	public void findAllShouldReturnAllCreatedPostRecords() throws Exception {
		create(postRecord("A"));
		create(postRecord("B"));
		create(postRecord("C"));
		findAll()
				.andExpect(status().isOk())
				.andExpect(jsonArrayLength(3));
	}

	@Test
	public void findByIdReturnsNotFoundForAnInvalidId() throws Exception {
		findById(5180l)
				.andExpect(status().isNotFound());
	}

	public void findByIdReturnsThePostRecordWithTheSpecifiedId() throws Exception {
		create(postRecord("A"));
		PostRecord postRecordUT = createAndReturn(postRecord("B"));
		create(postRecord("C"));

		findById(postRecordUT.getId())
				.andExpect(status().isOk())
				.andExpect(jsonTitle(postRecordUT.getDescription()));

	}

	@Test
	public void createShouldSaveThePostRecordAndAssignAnId() throws Exception {
		create(postRecord("Hello World"))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.id").isNumber())
				.andExpect(jsonTitle("Hello World"));
	}

	@Test
	public void updateShouldReturnNotFoundForAnInvalidId() throws Exception {
		update(postRecord("Hello World", 5180l))
				.andExpect(status().isNotFound());
	}

	@Test
	public void updateShouldReturnBadRequestForInconsistentIds() throws Exception {
		update(postRecord("Hello World", 5180l), 123l)
				.andExpect(status().isBadRequest());
	}

	@Test
	public void updateShouldReturnBadRequestIfIdInBodyIsNull() throws Exception {
		update(postRecord("Hello World", null), 5180l)
				.andExpect(status().isBadRequest());
	}

	@Test
	public void updateShouldUpdateThePostRecord() throws Exception {
		create(postRecord("A"));
		PostRecord postRecordUT = createAndReturn(postRecord("B"));
		create(postRecord("C"));

		postRecordUT.setDescription("Hello World");
		update(postRecordUT)
				.andExpect(status().isOk())
				.andExpect(jsonTitle(postRecordUT.getDescription()));

		findById(postRecordUT.getId())
				.andExpect(jsonTitle(postRecordUT.getDescription()));

	}

	@Test
	public void deleteShouldDeleteTheSpecifiedPostRecord() throws Exception {
		create(postRecord("A"));
		PostRecord postRecordUT = createAndReturn(postRecord("B"));
		create(postRecord("C"));

		deleteById(postRecordUT.getId());
		findAll()
				.andExpect(status().isOk())
				.andExpect(jsonArrayLength(2));
	}

	@Test
	public void deleteShouldReturnNotFoundForAnInvalidId() throws Exception {
		deleteById(5180L)
				.andExpect(status().isNotFound());
	}

	@Test
	public void deleteAllShouldDeleteAllPostRecords() throws Exception {
		create(postRecord("A"));
		create(postRecord("B"));
		deleteAll()
				.andExpect(status().isNoContent());
		findAll()
				.andExpect(jsonArrayLength(0));
	}

	private ResultActions create(PostRecord postRecord) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		return mockMvc.perform(post(CONTROLLER_BASE_PATH).content(objectMapper.writeValueAsString(postRecord)).contentType(MediaType.APPLICATION_JSON));
	}

	private PostRecord createAndReturn(PostRecord postRecord) throws Exception {
		MockHttpServletResponse mockHttpServletResponse = create(postRecord("B"))
				.andReturn().getResponse();
		return postRecord(mockHttpServletResponse);
	}

	private ResultActions update(PostRecord postRecord) throws Exception {
		return update(postRecord, postRecord.getId());
	}

	private ResultActions update(PostRecord postRecord, Long id) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		return mockMvc.perform(put(controllerBasePathWithId(id)).content(objectMapper.writeValueAsString(postRecord)).contentType(MediaType.APPLICATION_JSON));
	}

	private ResultActions findAll() throws Exception {
		return mockMvc.perform(get(CONTROLLER_BASE_PATH));
	}

	private ResultActions findById(Long id) throws Exception {
		return mockMvc.perform(get(controllerBasePathWithId(id)));
	}

	private ResultActions deleteById(Long id) throws Exception {
		return mockMvc.perform(delete(controllerBasePathWithId(id)));
	}

	private ResultActions deleteAll() throws Exception {
		return mockMvc.perform(delete(CONTROLLER_BASE_PATH));
	}

	private String controllerBasePathWithId(Long id) {
		return CONTROLLER_BASE_PATH + "/" + (id == null ? "" : id);
	}

	private PostRecord postRecord(String description) {
		PostRecord postRecord = new PostRecord();
		postRecord.setDescription(description);
		return postRecord;
	}

	private PostRecord postRecord(String description, Long id) {
		PostRecord postRecord = postRecord(description);
		postRecord.setId(id);
		return postRecord;
	}

	private PostRecord postRecord(MockHttpServletResponse mockHttpServletResponse) throws IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.readValue(mockHttpServletResponse.getContentAsString(), PostRecord.class);
	}

	private static ResultMatcher jsonArrayLength(int length) {
		return jsonPath("$.length()").value(length);
	}

	private static ResultMatcher jsonTitle(String description) {
		return jsonPath("$.description").value(description);
	} 
}

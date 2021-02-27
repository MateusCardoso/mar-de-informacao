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
		create(PostRecord("A"));
		create(PostRecord("B"));
		create(PostRecord("C"));
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
		create(PostRecord("A"));
		PostRecord PostRecordUT = createAndReturn(PostRecord("B"));
		create(PostRecord("C"));

		findById(PostRecordUT.getId())
				.andExpect(status().isOk())
				.andExpect(jsonTitle(PostRecordUT.getDescription()));

	}

	@Test
	public void createShouldSaveThePostRecordAndAssignAnId() throws Exception {
		create(PostRecord("Hello World"))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.id").isNumber())
				.andExpect(jsonTitle("Hello World"));
	}

	@Test
	public void updateShouldReturnNotFoundForAnInvalidId() throws Exception {
		update(PostRecord("Hello World", 5180l))
				.andExpect(status().isNotFound());
	}

	@Test
	public void updateShouldReturnBadRequestForInconsistentIds() throws Exception {
		update(PostRecord("Hello World", 5180l), 123l)
				.andExpect(status().isBadRequest());
	}

	@Test
	public void updateShouldReturnBadRequestIfIdInBodyIsNull() throws Exception {
		update(PostRecord("Hello World", null), 5180l)
				.andExpect(status().isBadRequest());
	}

	@Test
	public void updateShouldUpdateThePostRecord() throws Exception {
		create(PostRecord("A"));
		PostRecord PostRecordUT = createAndReturn(PostRecord("B"));
		create(PostRecord("C"));

		PostRecordUT.setDescription("Hello World");
		update(PostRecordUT)
				.andExpect(status().isOk())
				.andExpect(jsonTitle(PostRecordUT.getDescription()));

		findById(PostRecordUT.getId())
				.andExpect(jsonTitle(PostRecordUT.getDescription()));

	}

	@Test
	public void deleteShouldDeleteTheSpecifiedPostRecord() throws Exception {
		create(PostRecord("A"));
		PostRecord PostRecordUT = createAndReturn(PostRecord("B"));
		create(PostRecord("C"));

		deleteById(PostRecordUT.getId());
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
		create(PostRecord("A"));
		create(PostRecord("B"));
		deleteAll()
				.andExpect(status().isNoContent());
		findAll()
				.andExpect(jsonArrayLength(0));
	}

	private ResultActions create(PostRecord PostRecord) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		return mockMvc.perform(post(CONTROLLER_BASE_PATH).content(objectMapper.writeValueAsString(PostRecord)).contentType(MediaType.APPLICATION_JSON));
	}

	private PostRecord createAndReturn(PostRecord PostRecord) throws Exception {
		MockHttpServletResponse mockHttpServletResponse = create(PostRecord("B"))
				.andReturn().getResponse();
		return PostRecord(mockHttpServletResponse);
	}

	private ResultActions update(PostRecord PostRecord) throws Exception {
		return update(PostRecord, PostRecord.getId());
	}

	private ResultActions update(PostRecord PostRecord, Long id) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		return mockMvc.perform(put(controllerBasePathWithId(id)).content(objectMapper.writeValueAsString(PostRecord)).contentType(MediaType.APPLICATION_JSON));
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

	private PostRecord PostRecord(String description) {
		PostRecord PostRecord = new PostRecord();
		PostRecord.setDescription(description);
		return PostRecord;
	}

	private PostRecord PostRecord(String description, Long id) {
		PostRecord PostRecord = PostRecord(description);
		PostRecord.setId(id);
		return PostRecord;
	}

	private PostRecord PostRecord(MockHttpServletResponse mockHttpServletResponse) throws IOException {
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

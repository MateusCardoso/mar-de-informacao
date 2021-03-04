package com.ufrgs.inf.tcc.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ufrgs.inf.tcc.model.Tag;
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
public class TagControllerTest {

    private static final String CONTROLLER_BASE_PATH = "/api/v1/tags";

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
	public void findAllShouldReturnAllCreatedTags() throws Exception {
		create(tag("A"));
		create(tag("B"));
		create(tag("C"));
		findAll()
				.andExpect(status().isOk())
				.andExpect(jsonArrayLength(3));
	}

	@Test
	public void findByIdReturnsNotFoundForAnInvalidId() throws Exception {
		findById(5180l)
				.andExpect(status().isNotFound());
	}

	public void findByIdReturnsTheTagWithTheSpecifiedId() throws Exception {
		create(tag("A"));
		Tag TagUT = createAndReturn(tag("B"));
		create(tag("C"));

		findById(TagUT.getId())
				.andExpect(status().isOk())
				.andExpect(jsonTitle(TagUT.getTagName()));

	}

	@Test
	public void createShouldSaveTheTagAndAssignAnId() throws Exception {
		create(tag("Pescaria"))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.id").isNumber())
				.andExpect(jsonTitle("Pescaria"));
	}

	@Test
	public void updateShouldReturnNotFoundForAnInvalidId() throws Exception {
		update(tag("Pescaria", 5180l))
				.andExpect(status().isNotFound());
	}

	@Test
	public void updateShouldReturnBadRequestForInconsistentIds() throws Exception {
		update(tag("Pescaria", 5180l), 123l)
				.andExpect(status().isBadRequest());
	}

	@Test
	public void updateShouldReturnBadRequestIfIdInBodyIsNull() throws Exception {
		update(tag("Pescaria", null), 5180l)
				.andExpect(status().isBadRequest());
	}

	@Test
	public void updateShouldUpdateTheTag() throws Exception {
		create(tag("A"));
		Tag TagUT = createAndReturn(tag("B"));
		create(tag("C"));

		TagUT.setTagName("Pescaria");
		update(TagUT)
				.andExpect(status().isOk())
				.andExpect(jsonTitle(TagUT.getTagName()));

		findById(TagUT.getId())
				.andExpect(jsonTitle(TagUT.getTagName()));

	}

	@Test
	public void deleteShouldDeleteTheSpecifiedTag() throws Exception {
		create(tag("A"));
		Tag tagUT = createAndReturn(tag("B"));
		create(tag("C"));

		deleteById(tagUT.getId());
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
	public void deleteAllShouldDeleteAllTags() throws Exception {
		create(tag("A"));
		create(tag("B"));
		deleteAll()
				.andExpect(status().isNoContent());
		findAll()
				.andExpect(jsonArrayLength(0));
	}

	private ResultActions create(Tag tag) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		return mockMvc.perform(post(CONTROLLER_BASE_PATH).content(objectMapper.writeValueAsString(tag)).contentType(MediaType.APPLICATION_JSON));
	}

	private Tag createAndReturn(Tag tag) throws Exception {
		MockHttpServletResponse mockHttpServletResponse = create(tag("B"))
				.andReturn().getResponse();
		return tag(mockHttpServletResponse);
	}

	private ResultActions update(Tag tag) throws Exception {
		return update(tag, tag.getId());
	}

	private ResultActions update(Tag tag, Long id) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		return mockMvc.perform(put(controllerBasePathWithId(id)).content(objectMapper.writeValueAsString(tag)).contentType(MediaType.APPLICATION_JSON));
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

	private Tag tag(String tagName) {
		Tag tag = new Tag();
		tag.setTagName(tagName);
		return tag;
	}

	private Tag tag(String tagName, Long id) {
		Tag tag = tag(tagName);
		tag.setId(id);
		return tag;
	}

	private Tag tag(MockHttpServletResponse mockHttpServletResponse) throws IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.readValue(mockHttpServletResponse.getContentAsString(), Tag.class);
	}

	private static ResultMatcher jsonArrayLength(int length) {
		return jsonPath("$.length()").value(length);
	}

	private static ResultMatcher jsonTitle(String tagName) {
		return jsonPath("$.tagName").value(tagName);
	} 

}

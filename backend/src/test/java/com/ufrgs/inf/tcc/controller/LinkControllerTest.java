package com.ufrgs.inf.tcc.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ufrgs.inf.tcc.model.Link;
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
public class LinkControllerTest {
    private static final String CONTROLLER_BASE_PATH = "/api/v1/links";

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
	public void findAllShouldReturnAllCreatedLinks() throws Exception {
		create(Link("A"));
		create(Link("B"));
		create(Link("C"));
		findAll()
				.andExpect(status().isOk())
				.andExpect(jsonArrayLength(3));
	}

	@Test
	public void findByIdReturnsNotFoundForAnInvalidId() throws Exception {
		findById(5180l)
				.andExpect(status().isNotFound());
	}

	public void findByIdReturnsTheLinkWithTheSpecifiedId() throws Exception {
		create(Link("A"));
		Link LinkUT = createAndReturn(Link("B"));
		create(Link("C"));

		findById(LinkUT.getId())
				.andExpect(status().isOk())
				.andExpect(jsonTitle(LinkUT.getLinkName()));

	}

	@Test
	public void createShouldSaveTheLinkAndAssignAnId() throws Exception {
		create(Link("Artigo"))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.id").isNumber())
				.andExpect(jsonTitle("Artigo"));
	}

	@Test
	public void updateShouldReturnNotFoundForAnInvalidId() throws Exception {
		update(Link("Artigo", 5180l))
				.andExpect(status().isNotFound());
	}

	@Test
	public void updateShouldReturnBadRequestForInconsistentIds() throws Exception {
		update(Link("Artigo", 5180l), 123l)
				.andExpect(status().isBadRequest());
	}

	@Test
	public void updateShouldReturnBadRequestIfIdInBodyIsNull() throws Exception {
		update(Link("Artigo", null), 5180l)
				.andExpect(status().isBadRequest());
	}

	@Test
	public void updateShouldUpdateTheLink() throws Exception {
		create(Link("A"));
		Link LinkUT = createAndReturn(Link("B"));
		create(Link("C"));

		LinkUT.setLinkName("Artigo");
		update(LinkUT)
				.andExpect(status().isOk())
				.andExpect(jsonTitle(LinkUT.getLinkName()));

		findById(LinkUT.getId())
				.andExpect(jsonTitle(LinkUT.getLinkName()));

	}

	@Test
	public void deleteShouldDeleteTheSpecifiedLink() throws Exception {
		create(Link("A"));
		Link LinkUT = createAndReturn(Link("B"));
		create(Link("C"));

		deleteById(LinkUT.getId());
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
	public void deleteAllShouldDeleteAllLinks() throws Exception {
		create(Link("A"));
		create(Link("B"));
		deleteAll()
				.andExpect(status().isNoContent());
		findAll()
				.andExpect(jsonArrayLength(0));
	}

	private ResultActions create(Link Link) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		return mockMvc.perform(post(CONTROLLER_BASE_PATH).content(objectMapper.writeValueAsString(Link)).contentType(MediaType.APPLICATION_JSON));
	}

	private Link createAndReturn(Link Link) throws Exception {
		MockHttpServletResponse mockHttpServletResponse = create(Link("B"))
				.andReturn().getResponse();
		return Link(mockHttpServletResponse);
	}

	private ResultActions update(Link Link) throws Exception {
		return update(Link, Link.getId());
	}

	private ResultActions update(Link Link, Long id) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		return mockMvc.perform(put(controllerBasePathWithId(id)).content(objectMapper.writeValueAsString(Link)).contentType(MediaType.APPLICATION_JSON));
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

	private Link Link(String linkName) {
		Link Link = new Link();
		Link.setLinkName(linkName);
		return Link;
	}

	private Link Link(String linkName, Long id) {
		Link Link = Link(linkName);
		Link.setId(id);
		return Link;
	}

	private Link Link(MockHttpServletResponse mockHttpServletResponse) throws IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.readValue(mockHttpServletResponse.getContentAsString(), Link.class);
	}

	private static ResultMatcher jsonArrayLength(int length) {
		return jsonPath("$.length()").value(length);
	}

	private static ResultMatcher jsonTitle(String linkName) {
		return jsonPath("$.linkName").value(linkName);
	} 

}

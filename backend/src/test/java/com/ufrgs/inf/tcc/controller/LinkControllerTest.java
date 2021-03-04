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
		create(link("A"));
		create(link("B"));
		create(link("C"));
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
		create(link("A"));
		Link linkUT = createAndReturn(link("B"));
		create(link("C"));

		findById(linkUT.getId())
				.andExpect(status().isOk())
				.andExpect(jsonTitle(linkUT.getLinkName()));

	}

	@Test
	public void createShouldSaveTheLinkAndAssignAnId() throws Exception {
		create(link("Artigo"))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.id").isNumber())
				.andExpect(jsonTitle("Artigo"));
	}

	@Test
	public void updateShouldReturnNotFoundForAnInvalidId() throws Exception {
		update(link("Artigo", 5180l))
				.andExpect(status().isNotFound());
	}

	@Test
	public void updateShouldReturnBadRequestForInconsistentIds() throws Exception {
		update(link("Artigo", 5180l), 123l)
				.andExpect(status().isBadRequest());
	}

	@Test
	public void updateShouldReturnBadRequestIfIdInBodyIsNull() throws Exception {
		update(link("Artigo", null), 5180l)
				.andExpect(status().isBadRequest());
	}

	@Test
	public void updateShouldUpdateTheLink() throws Exception {
		create(link("A"));
		Link linkUT = createAndReturn(link("B"));
		create(link("C"));

		linkUT.setLinkName("Artigo");
		update(linkUT)
				.andExpect(status().isOk())
				.andExpect(jsonTitle(linkUT.getLinkName()));

		findById(linkUT.getId())
				.andExpect(jsonTitle(linkUT.getLinkName()));

	}

	@Test
	public void deleteShouldDeleteTheSpecifiedLink() throws Exception {
		create(link("A"));
		Link linkUT = createAndReturn(link("B"));
		create(link("C"));

		deleteById(linkUT.getId());
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
		create(link("A"));
		create(link("B"));
		deleteAll()
				.andExpect(status().isNoContent());
		findAll()
				.andExpect(jsonArrayLength(0));
	}

	private ResultActions create(Link link) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		return mockMvc.perform(post(CONTROLLER_BASE_PATH).content(objectMapper.writeValueAsString(link)).contentType(MediaType.APPLICATION_JSON));
	}

	private Link createAndReturn(Link link) throws Exception {
		MockHttpServletResponse mockHttpServletResponse = create(link("B"))
				.andReturn().getResponse();
		return Link(mockHttpServletResponse);
	}

	private ResultActions update(Link link) throws Exception {
		return update(link, link.getId());
	}

	private ResultActions update(Link link, Long id) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		return mockMvc.perform(put(controllerBasePathWithId(id)).content(objectMapper.writeValueAsString(link)).contentType(MediaType.APPLICATION_JSON));
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

	private Link link(String linkName) {
		Link link = new Link();
		link.setLinkName(linkName);
		return link;
	}

	private Link link(String linkName, Long id) {
		Link link = link(linkName);
		link.setId(id);
		return link;
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

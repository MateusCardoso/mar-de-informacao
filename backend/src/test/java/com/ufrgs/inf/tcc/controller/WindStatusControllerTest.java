package com.ufrgs.inf.tcc.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ufrgs.inf.tcc.model.WindStatus;
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
public class WindStatusControllerTest {
 
    private static final String CONTROLLER_BASE_PATH = "/api/v1/windStatus";

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
	public void findAllShouldReturnAllCreatedWindStatus() throws Exception {
		create(windStatus("A"));
		create(windStatus("B"));
		create(windStatus("C"));
		findAll()
				.andExpect(status().isOk())
				.andExpect(jsonArrayLength(3));
	}

	@Test
	public void findByIdReturnsNotFoundForAnInvalidId() throws Exception {
		findById(5180l)
				.andExpect(status().isNotFound());
	}

	public void findByIdReturnsTheWindStatusWithTheSpecifiedId() throws Exception {
		create(windStatus("A"));
		WindStatus windStatusUT = createAndReturn(windStatus("B"));
		create(windStatus("C"));

		findById(windStatusUT.getId())
				.andExpect(status().isOk())
				.andExpect(jsonTitle(windStatusUT.getWindDirection()));

	}

	@Test
	public void createShouldSaveTheWindStatusAndAssignAnId() throws Exception {
		create(windStatus("NE"))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.id").isNumber())
				.andExpect(jsonTitle("NE"));
	}

	@Test
	public void updateShouldReturnNotFoundForAnInvalidId() throws Exception {
		update(windStatus("NE", 5180l))
				.andExpect(status().isNotFound());
	}

	@Test
	public void updateShouldReturnBadRequestForInconsistentIds() throws Exception {
		update(windStatus("NE", 5180l), 123l)
				.andExpect(status().isBadRequest());
	}

	@Test
	public void updateShouldReturnBadRequestIfIdInBodyIsNull() throws Exception {
		update(windStatus("NE", null), 5180l)
				.andExpect(status().isBadRequest());
	}

	@Test
	public void updateShouldUpdateTheWindStatus() throws Exception {
		create(windStatus("A"));
		WindStatus windStatusUT = createAndReturn(windStatus("B"));
		create(windStatus("C"));

		windStatusUT.setWindDirection("NE");
		update(windStatusUT)
				.andExpect(status().isOk())
				.andExpect(jsonTitle(windStatusUT.getWindDirection()));

		findById(windStatusUT.getId())
				.andExpect(jsonTitle(windStatusUT.getWindDirection()));

	}

	@Test
	public void deleteShouldDeleteTheSpecifiedWindStatus() throws Exception {
		create(windStatus("A"));
		WindStatus windStatusUT = createAndReturn(windStatus("B"));
		create(windStatus("C"));

		deleteById(windStatusUT.getId());
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
	public void deleteAllShouldDeleteAllWindStatus() throws Exception {
		create(windStatus("A"));
		create(windStatus("B"));
		deleteAll()
				.andExpect(status().isNoContent());
		findAll()
				.andExpect(jsonArrayLength(0));
	}

	private ResultActions create(WindStatus WindStatus) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		return mockMvc.perform(post(CONTROLLER_BASE_PATH).content(objectMapper.writeValueAsString(WindStatus)).contentType(MediaType.APPLICATION_JSON));
	}

	private WindStatus createAndReturn(WindStatus WindStatus) throws Exception {
		MockHttpServletResponse mockHttpServletResponse = create(windStatus("B"))
				.andReturn().getResponse();
		return WindStatus(mockHttpServletResponse);
	}

	private ResultActions update(WindStatus WindStatus) throws Exception {
		return update(WindStatus, WindStatus.getId());
	}

	private ResultActions update(WindStatus WindStatus, Long id) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		return mockMvc.perform(put(controllerBasePathWithId(id)).content(objectMapper.writeValueAsString(WindStatus)).contentType(MediaType.APPLICATION_JSON));
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

	private WindStatus windStatus(String windDirection) {
		WindStatus WindStatus = new WindStatus();
		WindStatus.setWindDirection(windDirection);
		return WindStatus;
	}

	private WindStatus windStatus(String windDirection, Long id) {
		WindStatus WindStatus = windStatus(windDirection);
		WindStatus.setId(id);
		return WindStatus;
	}

	private WindStatus WindStatus(MockHttpServletResponse mockHttpServletResponse) throws IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.readValue(mockHttpServletResponse.getContentAsString(), WindStatus.class);
	}

	private static ResultMatcher jsonArrayLength(int length) {
		return jsonPath("$.length()").value(length);
	}

	private static ResultMatcher jsonTitle(String windDirection) {
		return jsonPath("$.windDirection").value(windDirection);
	} 

   
}

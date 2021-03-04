package com.ufrgs.inf.tcc.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ufrgs.inf.tcc.model.BeachReport;
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
public class BeachReportControllerTest {
 
    private static final String CONTROLLER_BASE_PATH = "/api/v1/reports";

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
	public void findAllShouldReturnAllCreatedBeachReports() throws Exception {
		create(beachReport("A"));
		create(beachReport("B"));
		create(beachReport("C"));
		findAll()
				.andExpect(status().isOk())
				.andExpect(jsonArrayLength(3));
	}

	@Test
	public void findByIdReturnsNotFoundForAnInvalidId() throws Exception {
		findById(5180l)
				.andExpect(status().isNotFound());
	}

	public void findByIdReturnsTheBeachReportWithTheSpecifiedId() throws Exception {
		create(beachReport("A"));
		BeachReport beachReportUT = createAndReturn(beachReport("B"));
		create(beachReport("C"));

		findById(beachReportUT.getId())
				.andExpect(status().isOk())
				.andExpect(jsonTitle(beachReportUT.getWaterQuality()));

	}

	@Test
	public void createShouldSaveTheBeachReportAndAssignAnId() throws Exception {
		create(beachReport("BOA!"))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.id").isNumber())
				.andExpect(jsonTitle("BOA!"));
	}

	@Test
	public void updateShouldReturnNotFoundForAnInvalidId() throws Exception {
		update(beachReport("BOA!", 5180l))
				.andExpect(status().isNotFound());
	}

	@Test
	public void updateShouldReturnBadRequestForInconsistentIds() throws Exception {
		update(beachReport("BOA!", 5180l), 123l)
				.andExpect(status().isBadRequest());
	}

	@Test
	public void updateShouldReturnBadRequestIfIdInBodyIsNull() throws Exception {
		update(beachReport("BOA!", null), 5180l)
				.andExpect(status().isBadRequest());
	}

	@Test
	public void updateShouldUpdateTheBeachReport() throws Exception {
		create(beachReport("A"));
		BeachReport beachReportUT = createAndReturn(beachReport("B"));
		create(beachReport("C"));

		beachReportUT.setWaterQuality("BOA!");
		update(beachReportUT)
				.andExpect(status().isOk())
				.andExpect(jsonTitle(beachReportUT.getWaterQuality()));

		findById(beachReportUT.getId())
				.andExpect(jsonTitle(beachReportUT.getWaterQuality()));

	}

	@Test
	public void deleteShouldDeleteTheSpecifiedBeachReport() throws Exception {
		create(beachReport("A"));
		BeachReport beachReportUT = createAndReturn(beachReport("B"));
		create(beachReport("C"));

		deleteById(beachReportUT.getId());
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
	public void deleteAllShouldDeleteAllBeachReports() throws Exception {
		create(beachReport("A"));
		create(beachReport("B"));
		deleteAll()
				.andExpect(status().isNoContent());
		findAll()
				.andExpect(jsonArrayLength(0));
	}

	private ResultActions create(BeachReport beachReport) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		return mockMvc.perform(post(CONTROLLER_BASE_PATH).content(objectMapper.writeValueAsString(beachReport)).contentType(MediaType.APPLICATION_JSON));
	}

	private BeachReport createAndReturn(BeachReport BeachReport) throws Exception {
		MockHttpServletResponse mockHttpServletResponse = create(beachReport("B"))
				.andReturn().getResponse();
		return BeachReport(mockHttpServletResponse);
	}

	private ResultActions update(BeachReport BeachReport) throws Exception {
		return update(BeachReport, BeachReport.getId());
	}

	private ResultActions update(BeachReport BeachReport, Long id) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		return mockMvc.perform(put(controllerBasePathWithId(id)).content(objectMapper.writeValueAsString(BeachReport)).contentType(MediaType.APPLICATION_JSON));
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

	private BeachReport beachReport(String waterQuality) {
		BeachReport BeachReport = new BeachReport();
		BeachReport.setWaterQuality(waterQuality);
		return BeachReport;
	}

	private BeachReport beachReport(String waterQuality, Long id) {
		BeachReport BeachReport = beachReport(waterQuality);
		BeachReport.setId(id);
		return BeachReport;
	}

	private BeachReport BeachReport(MockHttpServletResponse mockHttpServletResponse) throws IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.readValue(mockHttpServletResponse.getContentAsString(), BeachReport.class);
	}

	private static ResultMatcher jsonArrayLength(int length) {
		return jsonPath("$.length()").value(length);
	}

	private static ResultMatcher jsonTitle(String waterQuality) {
		return jsonPath("$.waterQuality").value(waterQuality);
	} 

}

package com.ufrgs.inf.tcc.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
public class BeachReportTest {
 
    @Test
	public void equalsShouldReturnTrueForTheSameObjects() {
		BeachReport left = new BeachReport(3L, 28.5, "Boa", 8);
		assertTrue(left.equals(left));
	}

	@Test
	public void equalsShouldReturnTrueForEqualObjects() {
		BeachReport left = new BeachReport(3L, 28.5, "Boa", 8);
		BeachReport right = new BeachReport(3L, 28.5, "Boa", 8);
		assertTrue(left.equals(right));
	}

	@Test
	public void equalsShouldReturnFalseForNonEqualObjects() {
		BeachReport left = new BeachReport(3L, 28.5, "Boa", 8);
		BeachReport right = new BeachReport(2L, 18.5, "Suja", 5);
		assertFalse(left.equals(right));
	}

	@Test
	public void equalsShouldReturnFalseForNull() {
		BeachReport left = new BeachReport(3L, 28.5, "Boa", 8);
		assertFalse(left.equals(null));
	}

	@Test
	public void hashCodeShouldReturnTheSameHashCodeForEqualObjects() {
		BeachReport left = new BeachReport(3L, 28.5, "Boa", 8);
		BeachReport right = new BeachReport(3L, 28.5, "Boa", 8);
		assertEquals(left.hashCode(), right.hashCode());
	}

	@Test
	public void toStringShouldReturnAStringThatContainsIdAndAttributes() {
		BeachReport report = new BeachReport(373L, 28.5, "Boa", 8);
		String toString = report.toString();
		assertTrue(toString.indexOf("373") > -1);
		assertTrue(toString.indexOf("28.5") > -1);
        assertTrue(toString.indexOf("Boa") > -1);
        assertTrue(toString.indexOf("8") > -1);
	}


}

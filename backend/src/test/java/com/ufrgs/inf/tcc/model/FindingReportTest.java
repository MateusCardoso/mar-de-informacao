package com.ufrgs.inf.tcc.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
public class FindingReportTest {

    @Test
	public void equalsShouldReturnTrueForTheSameObjects() {
		FindingReport left = new FindingReport(3L, "Pinguim", "Algo em Latim", "Europa", 15.0);
		assertTrue(left.equals(left));
	}

	@Test
	public void equalsShouldReturnTrueForEqualObjects() {
		FindingReport left = new FindingReport(3L, "Pinguim", "Algo em Latim", "Europa", 15.0);
		FindingReport right = new FindingReport(3L, "Pinguim", "Algo em Latim", "Europa", 15.0);
		assertTrue(left.equals(right));
	}

	@Test
	public void equalsShouldReturnFalseForNonEqualObjects() {
		FindingReport left = new FindingReport(3L, "Pinguim", "Algo em Latim", "Europa", 15.0);
		FindingReport right = new FindingReport(2L, "Leao Marinho", "Outro em Latim", "USA", 1000.0);
		assertFalse(left.equals(right));
	}

	@Test
	public void equalsShouldReturnFalseForNull() {
		FindingReport left = new FindingReport(3L, "Pinguim", "Algo em Latim", "Europa", 15.0);
		assertFalse(left.equals(null));
	}

	@Test
	public void hashCodeShouldReturnTheSameHashCodeForEqualObjects() {
		FindingReport left = new FindingReport(3L, "Pinguim", "Algo em Latim", "Europa", 15.0);
		FindingReport right = new FindingReport(3L, "Pinguim", "Algo em Latim", "Europa", 15.0);
		assertEquals(left.hashCode(), right.hashCode());
	}

	@Test
	public void toStringShouldReturnAStringThatContainsAttributes() {
		FindingReport report = new FindingReport(373L, "Pinguim", "Algo em Latim", "Europa", 15.0);
		String toString = report.toString();
		assertTrue(toString.indexOf("373") > -1);
		assertTrue(toString.indexOf("Pinguim") > -1);
        assertTrue(toString.indexOf("Algo em Latim") > -1);
        assertTrue(toString.indexOf("Europa") > -1);
        assertTrue(toString.indexOf("15.0") > -1);
	}
    
}

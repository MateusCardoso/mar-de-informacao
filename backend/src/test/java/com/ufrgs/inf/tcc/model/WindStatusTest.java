package com.ufrgs.inf.tcc.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
public class WindStatusTest {
    
    @Test
	public void equalsShouldReturnTrueForTheSameObjects() {
		WindStatus left = new WindStatus(3L, "NE", 40.8);
		assertTrue(left.equals(left));
	}

	@Test
	public void equalsShouldReturnTrueForEqualObjects() {
		WindStatus left = new WindStatus(3L, "NE", 40.8);
		WindStatus right = new WindStatus(3L, "NE", 40.8);
		assertTrue(left.equals(right));
	}

	@Test
	public void equalsShouldReturnFalseForNonEqualObjects() {
		WindStatus left = new WindStatus(3L, "NE", 40.8);
		WindStatus right = new WindStatus(2L, "NNE", 20.5);
		assertFalse(left.equals(right));
	}

	@Test
	public void equalsShouldReturnFalseForNull() {
		WindStatus left = new WindStatus(3L, "NE", 40.8);
		assertFalse(left.equals(null));
	}

	@Test
	public void hashCodeShouldReturnTheSameHashCodeForEqualObjects() {
		WindStatus left = new WindStatus(3L, "NE", 40.8);
		WindStatus right = new WindStatus(3L, "NE", 40.8);
		assertEquals(left.hashCode(), right.hashCode());
	}

	@Test
	public void toStringShouldReturnAStringThatContainsIdAndTitle() {
		WindStatus wind = new WindStatus(373L, "NE", 40.8);
		String toString = wind.toString();
		assertTrue(toString.indexOf("373") > -1);
		assertTrue(toString.indexOf("NE") > -1);
        assertTrue(toString.indexOf("40.8") > -1);
	}

}

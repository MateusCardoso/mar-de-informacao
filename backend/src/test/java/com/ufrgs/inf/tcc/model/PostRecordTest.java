package com.ufrgs.inf.tcc.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
public class PostRecordTest {
    
    @Test
	public void equalsShouldReturnTrueForTheSameObjects() {
		PostRecord left = new PostRecord(3L, "Hello World");
		assertTrue(left.equals(left));
	}

	@Test
	public void equalsShouldReturnTrueForEqualObjects() {
		PostRecord left = new PostRecord(3L, "Hello World");
		PostRecord right = new PostRecord(3L, "Hello World");
		assertTrue(left.equals(right));
	}

	@Test
	public void equalsShouldReturnFalseForNonEqualObjects() {
		PostRecord left = new PostRecord(3L, "Hello World");
		PostRecord right = new PostRecord(4L, "Hello You");
		assertFalse(left.equals(right));
	}

	@Test
	public void equalsShouldReturnFalseForNull() {
		PostRecord left = new PostRecord(3L, "Hello World");
		assertFalse(left.equals(null));
	}

	@Test
	public void hashCodeShouldReturnTheSameHashCodeForEqualObjects() {
		PostRecord left = new PostRecord(3L, "Hello World");
		PostRecord right = new PostRecord(3L, "Hello World");
		assertEquals(left.hashCode(), right.hashCode());
	}

	@Test
	public void toStringShouldReturnAStringThatContainsIdAndTitle() {
		PostRecord ad = new PostRecord(373L, "Hello World");
		String toString = ad.toString();
		assertTrue(toString.indexOf("373") > -1);
		assertTrue(toString.indexOf("Hello World") > -1);
	}

}

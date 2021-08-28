package com.ufrgs.inf.tcc.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
public class LinkTest {
    
    @Test
	public void equalsShouldReturnTrueForTheSameObjects() {
		Link left = new Link(3L, "LinkName", "URL", 1);
		assertTrue(left.equals(left));
	}

	@Test
	public void equalsShouldReturnTrueForEqualObjects() {
		Link left = new Link(3L, "LinkName", "URL", 1);
		Link right = new Link(3L, "LinkName", "URL", 1);
		assertTrue(left.equals(right));
	}

	@Test
	public void equalsShouldReturnFalseForNonEqualObjects() {
		Link left = new Link(3L, "LinkName", "URL", 1);
		Link right = new Link(2L, "OtherLink", "LRU", 2);
		assertFalse(left.equals(right));
	}

	@Test
	public void equalsShouldReturnFalseForNull() {
		Link left = new Link(3L, "LinkName", "URL", 1);
		assertFalse(left.equals(null));
	}

	@Test
	public void hashCodeShouldReturnTheSameHashCodeForEqualObjects() {
		Link left = new Link(3L, "LinkName", "URL", 1);
		Link right = new Link(3L, "LinkName", "URL", 1);
		assertEquals(left.hashCode(), right.hashCode());
	}

	@Test
	public void toStringShouldReturnAStringThatContainsAttributes() {
		Link link = new Link(373L, "LinkName", "URL", 1);
		String toString = link.toString();
		assertTrue(toString.indexOf("373") > -1);
		assertTrue(toString.indexOf("LinkName") > -1);
        assertTrue(toString.indexOf("URL") > -1);
		assertTrue(toString.indexOf("1") > -1);
	}

}

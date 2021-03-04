package com.ufrgs.inf.tcc.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
public class TagTest {
        
    @Test
	public void equalsShouldReturnTrueForTheSameObjects() {
		Tag left = new Tag(3L, "TagName");
		assertTrue(left.equals(left));
	}

	@Test
	public void equalsShouldReturnTrueForEqualObjects() {
		Tag left = new Tag(3L, "TagName");
		Tag right = new Tag(3L, "TagName");
		assertTrue(left.equals(right));
	}

	@Test
	public void equalsShouldReturnFalseForNonEqualObjects() {
		Tag left = new Tag(3L, "TagName");
		Tag right = new Tag(2L, "OtherTag");
		assertFalse(left.equals(right));
	}

	@Test
	public void equalsShouldReturnFalseForNull() {
		Tag left = new Tag(3L, "TagName");
		assertFalse(left.equals(null));
	}

	@Test
	public void hashCodeShouldReturnTheSameHashCodeForEqualObjects() {
		Tag left = new Tag(3L, "TagName");
		Tag right = new Tag(3L, "TagName");
		assertEquals(left.hashCode(), right.hashCode());
	}

	@Test
	public void toStringShouldReturnAStringThatContainsAttributes() {
		Tag tag = new Tag(373L, "TagName");
		String toString = tag.toString();
		assertTrue(toString.indexOf("373") > -1);
		assertTrue(toString.indexOf("TagName") > -1);
	}

}

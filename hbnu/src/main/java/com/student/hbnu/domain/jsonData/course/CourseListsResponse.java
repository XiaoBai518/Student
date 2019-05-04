package com.student.hbnu.domain.jsonData.course;

import java.util.List;

import com.student.hbnu.domain.Entity.course.Course;
import com.student.hbnu.domain.jsonData.JsonData;

public class CourseListsResponse extends JsonData {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3979341912337860395L;
	
	  private List<Course> lists;

	public List<Course> getLists() {
		return lists;
	}

	public void setLists(List<Course> lists) {
		this.lists = lists;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	  
	  

}

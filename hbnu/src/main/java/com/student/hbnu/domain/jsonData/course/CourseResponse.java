package com.student.hbnu.domain.jsonData.course;

import com.student.hbnu.domain.Entity.course.Course;
import com.student.hbnu.domain.jsonData.JsonData;

public class CourseResponse extends JsonData {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2930544588619108215L;
	private Course course;
	public Course getCourse() {
		return course;
	}
	public void setCourse(Course course) {
		this.course = course;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}

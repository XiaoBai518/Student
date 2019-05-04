package com.student.hbnu.domain.jsonData.course;

import com.student.hbnu.domain.Entity.course.Course;
import com.student.hbnu.domain.jsonData.JsonData;

public class JoinCourseResponse extends JsonData {

	 /**
	 * 
	 */
	private static final long serialVersionUID = -7125102977887348635L;
	private Course data;
	public Course getData() {
		return data;
	}
	public void setData(Course data) {
		this.data = data;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	
	 
	 
}

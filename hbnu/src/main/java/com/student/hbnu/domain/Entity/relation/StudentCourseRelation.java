package com.student.hbnu.domain.Entity.relation;

import javax.persistence.Entity;

import com.student.hbnu.domain.Entity.BaseEntity;

@Entity
public class StudentCourseRelation extends BaseEntity {

	private int studentId;
	private int courseId;
	public StudentCourseRelation() {}
	public StudentCourseRelation(int studentId, int courseId) {
		super();
		this.studentId = studentId;
		this.courseId = courseId;
	}
	public int getStudentId() {
		return studentId;
	}
	public void setStudentId(int studentId) {
		this.studentId = studentId;
	}
	public int getCourseId() {
		return courseId;
	}
	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}
	
	
	
	
}

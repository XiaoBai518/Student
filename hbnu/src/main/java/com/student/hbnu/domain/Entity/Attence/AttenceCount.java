package com.student.hbnu.domain.Entity.Attence;

import javax.persistence.Entity;

import com.student.hbnu.domain.Entity.BaseEntity;
@Entity
public class AttenceCount extends BaseEntity {

	
	private int courseId;//课程ID
	private int studentId;//学生ID
	private int count;//考勤次数
	public AttenceCount() {
		this.count =0;
	}
	
	public AttenceCount(int courseId, int studentId, int count) {
		super();
		this.courseId = courseId;
		this.studentId = studentId;
		this.count = count;
	}

	public int getCourseId() {
		return courseId;
	}
	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}
	public int getStudentId() {
		return studentId;
	}
	public void setStudentId(int studentId) {
		this.studentId = studentId;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	
	
	
	public void countAddOne() {
		this.count++;
	}
}

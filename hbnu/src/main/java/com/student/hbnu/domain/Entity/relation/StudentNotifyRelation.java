package com.student.hbnu.domain.Entity.relation;

import javax.persistence.Entity;

import com.student.hbnu.domain.Entity.BaseEntity;

@Entity
public class StudentNotifyRelation extends BaseEntity {

	private int studentId;
	private int notifyId;
	public StudentNotifyRelation() {}
	public StudentNotifyRelation(int studentId, int notifyId) {
		super();
		this.studentId = studentId;
		this.notifyId = notifyId;
	}
	public int getStudentId() {
		return studentId;
	}
	public void setStudentId(int studentId) {
		this.studentId = studentId;
	}
	public int getNotifyId() {
		return notifyId;
	}
	public void setNotifyId(int notifyId) {
		this.notifyId = notifyId;
	}
	
	
}

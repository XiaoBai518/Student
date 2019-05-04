package com.student.hbnu.domain.Entity.notify;

import javax.persistence.Entity;

import com.student.hbnu.domain.Entity.BaseEntity;

@Entity
public class Notify extends BaseEntity {

	
	private int courseId;
	private String title;
	private String content;
	private int teacherId;
	private int readCount;
	private String userName;
	

	public void readCountAdd() {
		this.readCount+=1;
	}
	
	public Notify() {
		this.readCount = 0;
	}

	public int getReadCount() {
		return readCount;
	}

	public void setReadCount(int readCount) {
		this.readCount = readCount;
	}

	public int getCourseId() {
		return courseId;
	}

	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(int teacherId) {
		this.teacherId = teacherId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	
	
	
}

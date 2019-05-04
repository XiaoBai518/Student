package com.student.hbnu.domain.Entity.Attence;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Transient;

import com.student.hbnu.domain.Entity.BaseEntity;
import com.student.hbnu.domain.Entity.user.User;

@Entity
public class AttenceStudent extends BaseEntity {

	private int uid;//学生ID
	private int state;//考勤状态
	private int attenceId;//考勤记录表Id
	private String ip;//Ip地址
	
	
	
	@Transient
	private User user;
	
	public AttenceStudent() {}
	
	
	public AttenceStudent(int uid, int state, int attenceId, String ip) {
		super();
		this.uid = uid;
		this.state = state;
		this.attenceId = attenceId;
		this.ip = ip;
	}
	public AttenceStudent(int uid, int state, int attenceId, String ip,Date createTime,User user) {
		super();
		this.uid = uid;
		this.state = state;
		this.attenceId = attenceId;
		this.ip = ip;
		this.setCreateTime(createTime);
		this.user = user;
	}


	public int getAttenceId() {
		return attenceId;
	}
	public void setAttenceId(int attenceId) {
		this.attenceId = attenceId;
	}
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	

}

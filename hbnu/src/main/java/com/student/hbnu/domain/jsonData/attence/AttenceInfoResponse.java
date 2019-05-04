package com.student.hbnu.domain.jsonData.attence;

import com.student.hbnu.domain.jsonData.JsonData;

public class AttenceInfoResponse extends JsonData {

	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1701336593141766496L;
	private int attenceCount;
	private int ratenum;
	private int studentCount;
	
	public int getStudentCount() {
		return studentCount;
	}
	public void setStudentCount(int studentCount) {
		this.studentCount = studentCount;
	}
	public int getAttenceCount() {
		return attenceCount;
	}
	public void setAttenceCount(int attenceCount) {
		this.attenceCount = attenceCount;
	}
	public int getRatenum() {
		return ratenum;
	}
	public void setRatenum(int ratenum) {
		this.ratenum = ratenum;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}

package com.student.hbnu.domain.jsonData.attence;

import com.student.hbnu.domain.jsonData.JsonData;

public class GetSignInResponse extends JsonData {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2525677519056407856L;
	private int signInCount;
	private int studentCount;
	public int getSignInCount() {
		return signInCount;
	}
	public void setSignInCount(int signInCount) {
		this.signInCount = signInCount;
	}
	public int getStudentCount() {
		return studentCount;
	}
	public void setStudentCount(int studentCount) {
		this.studentCount = studentCount;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}

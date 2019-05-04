package com.student.hbnu.domain.jsonData.attence;

import com.student.hbnu.domain.jsonData.JsonData;

public class OverAttenceResponse extends JsonData {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 6580375890547479243L;
	private int attenceId;
	public int getAttenceId() {
		return attenceId;
	}
	public void setAttenceId(int attenceId) {
		this.attenceId = attenceId;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}

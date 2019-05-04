package com.student.hbnu.domain.jsonData.attence;

import com.student.hbnu.domain.jsonData.JsonData;

public class GetDigitAttenceResponse extends JsonData {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4506987121262173880L;
	private int code;
	private int over;
	private int studentCount;
	private int finishCount;
	
	public GetDigitAttenceResponse() {
		over = 0;
		finishCount=0;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public int getOver() {
		return over;
	}
	public void setOver(int over) {
		this.over = over;
	}
	public int getStudentCount() {
		return studentCount;
	}
	public void setStudentCount(int studentCount) {
		this.studentCount = studentCount;
	}
	public int getFinishCount() {
		return finishCount;
	}
	public void setFinishCount(int finishCount) {
		this.finishCount = finishCount;
	}
	
	
}

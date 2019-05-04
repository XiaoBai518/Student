package com.student.hbnu.domain.jsonData.attence;

import java.io.Serializable;
import java.util.List;

public class ExcelData implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3961740238726255435L;
	private String username;
	private String stno;
	private int attenceCount;
	private int absenceCount;
	private List<String> state;
	
	public String getStno() {
		return stno;
	}
	public void setStno(String stno) {
		this.stno = stno;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public List<String> getState() {
		return state;
	}
	public void setState(List<String> state) {
		this.state = state;
	}
	public int getAttenceCount() {
		return attenceCount;
	}
	public void setAttenceCount(int attenceCount) {
		this.attenceCount = attenceCount;
	}
	public int getAbsenceCount() {
		return absenceCount;
	}
	public void setAbsenceCount(int absenceCount) {
		this.absenceCount = absenceCount;
	}
	
	
}

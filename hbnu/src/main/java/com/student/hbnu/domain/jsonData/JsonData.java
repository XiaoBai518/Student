package com.student.hbnu.domain.jsonData;

import java.io.Serializable;

public class JsonData implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7988845884590716447L;
	protected int status;
	protected String info;
	
	public JsonData() {}
	public JsonData(int status, String info) {
		super();
		this.status = status;
		this.info = info;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
	
	
}

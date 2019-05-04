package com.student.hbnu.domain.jsonData.user;

import com.student.hbnu.domain.jsonData.JsonData;

public class RegisterLoginResponse extends JsonData {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4092228301042802565L;
	
	private String url;
	private String uid;
	private String uemail;
	public String getUemail() {
		return uemail;
	}
	public void setUemail(String uemail) {
		this.uemail = uemail;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	
	

}

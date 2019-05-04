package com.student.hbnu.domain.jsonData.user;

import com.student.hbnu.domain.jsonData.JsonData;

public class GetUserRoleResponse extends JsonData {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7193260508607624649L;

	private int role;

	public int getRole() {
		return role;
	}

	public void setRole(int role) {
		this.role = role;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}

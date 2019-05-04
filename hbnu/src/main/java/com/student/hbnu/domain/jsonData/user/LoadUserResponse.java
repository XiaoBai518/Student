package com.student.hbnu.domain.jsonData.user;

import com.student.hbnu.domain.Entity.user.User;
import com.student.hbnu.domain.jsonData.JsonData;

public class LoadUserResponse extends JsonData {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3263692311104133341L;

	
	private User user;


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}
	
	
	
	
}

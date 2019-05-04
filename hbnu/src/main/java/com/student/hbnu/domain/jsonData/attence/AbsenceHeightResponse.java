package com.student.hbnu.domain.jsonData.attence;

import java.util.List;

import com.student.hbnu.domain.Entity.user.User;
import com.student.hbnu.domain.jsonData.JsonData;

public class AbsenceHeightResponse extends JsonData {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2002409893862083677L;
	private List<User> lists;

	public List<User> getLists() {
		return lists;
	}

	public void setLists(List<User> lists) {
		this.lists = lists;
	}
	
}

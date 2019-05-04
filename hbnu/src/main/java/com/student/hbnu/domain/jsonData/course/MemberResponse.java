package com.student.hbnu.domain.jsonData.course;

import java.util.List;

import com.student.hbnu.domain.Entity.user.User;
import com.student.hbnu.domain.jsonData.JsonData;

public class MemberResponse extends JsonData {

	/**
	 * 
	 */
	private static final long serialVersionUID = -609830393516111502L;
	private List<User> lists;
	private int total;
	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public List<User> getLists() {
		return lists;
	}

	public void setLists(List<User> lists) {
		this.lists = lists;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}

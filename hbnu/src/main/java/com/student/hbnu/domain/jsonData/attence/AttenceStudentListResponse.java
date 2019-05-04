package com.student.hbnu.domain.jsonData.attence;

import java.util.List;

import com.student.hbnu.domain.Entity.Attence.AttenceStudent;
import com.student.hbnu.domain.jsonData.JsonData;

public class AttenceStudentListResponse extends JsonData {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7968053076383217373L;
	private List<AttenceStudent> lists;
	public List<AttenceStudent> getLists() {
		return lists;
	}
	public void setLists(List<AttenceStudent> lists) {
		this.lists = lists;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}

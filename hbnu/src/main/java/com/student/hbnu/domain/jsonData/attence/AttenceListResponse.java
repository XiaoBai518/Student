package com.student.hbnu.domain.jsonData.attence;

import java.util.List;

import com.student.hbnu.domain.Entity.Attence.Attence;
import com.student.hbnu.domain.jsonData.JsonData;

public class AttenceListResponse extends JsonData {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7453533908422169331L;
	private List<Attence> lists;
	public List<Attence> getLists() {
		return lists;
	}
	public void setLists(List<Attence> lists) {
		this.lists = lists;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}

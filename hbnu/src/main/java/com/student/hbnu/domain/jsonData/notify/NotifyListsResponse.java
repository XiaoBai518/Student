package com.student.hbnu.domain.jsonData.notify;

import java.util.List;

import com.student.hbnu.domain.Entity.notify.Notify;
import com.student.hbnu.domain.jsonData.JsonData;

public class NotifyListsResponse extends JsonData {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5931229229545860137L;
	
	private List<Notify> lists;

	public List<Notify> getLists() {
		return lists;
	}

	public void setLists(List<Notify> lists) {
		this.lists = lists;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	

}

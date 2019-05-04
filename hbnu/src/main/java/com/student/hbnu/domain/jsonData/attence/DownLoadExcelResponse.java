package com.student.hbnu.domain.jsonData.attence;

import java.util.List;

import com.student.hbnu.domain.jsonData.JsonData;

public class DownLoadExcelResponse extends JsonData {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8962722418314346943L;

	private List<ExcelData> data;
	private List<String> title;
	public List<ExcelData> getData() {
		return data;
	}
	public void setData(List<ExcelData> data) {
		this.data = data;
	}
	public List<String> getTitle() {
		return title;
	}
	public void setTitle(List<String> title) {
		this.title = title;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
	

}

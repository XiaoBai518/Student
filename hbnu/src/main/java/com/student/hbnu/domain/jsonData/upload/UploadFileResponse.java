package com.student.hbnu.domain.jsonData.upload;

import com.student.hbnu.domain.jsonData.JsonData;

public class UploadFileResponse extends JsonData{

	private static final long serialVersionUID = 2278202985716906915L;
	public int status = 1;
	public String info = "success";
	public UploadFileData data;
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	public UploadFileData getData() {
		return data;
	}
	public void setData(UploadFileData data) {
		this.data = data;
	}

	
	
}

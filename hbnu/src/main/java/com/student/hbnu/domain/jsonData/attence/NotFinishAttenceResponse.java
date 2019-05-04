package com.student.hbnu.domain.jsonData.attence;

import com.student.hbnu.domain.Entity.Attence.Attence;
import com.student.hbnu.domain.jsonData.JsonData;

public class NotFinishAttenceResponse extends JsonData {

	
	 /**
	 * 
	 */
	private static final long serialVersionUID = 2080162871192111015L;
	private Attence attence;
	
	public Attence getAttence() {
		return attence;
	}

	public void setAttence(Attence attence) {
		this.attence = attence;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	 
	 
}

package com.student.hbnu.domain.Entity.Attence;


import java.util.Date;

import javax.persistence.Entity;


import com.student.hbnu.domain.Entity.BaseEntity;

@Entity
public class Attence extends BaseEntity {
	private int courseId;//课程ID
	private String title;//考勤标题
	private int type;//课程类型
	private int code;//数字考勤的  校验码
	private int totalCount;//总人数
	
	private Date FinishTime;//结束时间（标志  此次考勤的结束）
	
	
	private int attenceCount;//出勤人数
	private int attenceRate;//出勤率
	private int absenceRate;//旷课率
	private int absenceCount;//未出勤人数
	

	
	
	public Attence() {
//		Date d = super.getCreateTime();
//		if(d!=null) {
//			Calendar c = Calendar.getInstance();
//
//			c.setTime(d);
//			 SimpleDateFormat s=new SimpleDateFormat("yyyy.MM.dd");
//
//			 this.title = s.format(c.getTime());  
//		
//		}
	}
	
	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public int getAttenceRate() {
		return attenceRate;
	}
	public void setAttenceRate(int attenceRate) {
		this.attenceRate = attenceRate*100;
	}
	public int getAbsenceRate() {
		return absenceRate;
	}
	public void setAbsenceRate(int absenceRate) {
		this.absenceRate = absenceRate*100;
	}
	public int getAttenceCount() {
		return attenceCount;
	}
	public void setAttenceCount(int attenceCount) {
		this.attenceCount = attenceCount;
	}
	public int getAbsenceCount() {
		return absenceCount;
	}
	public void setAbsenceCount(int absenceCount) {
		this.absenceCount = absenceCount;
	}
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}


	public int getCourseId() {
		return courseId;
	}

	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}

	public Date getFinishTime() {
		return FinishTime;
	}

	public void setFinishTime(Date finishTime) {
		FinishTime = finishTime;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	public void studentCheckIn() {
		
	}
	public void OverAttence(int attencecount) {
		this.FinishTime = new Date();
		//考勤人数
		this.attenceCount = attencecount;
		
		//考勤率
		this.attenceRate = this.attenceCount/this.totalCount*100;
		
		//缺勤人数
		this.absenceCount = this.totalCount - this.attenceCount;
		//缺勤率
		this.absenceRate = this.absenceCount/this.totalCount*100;
	}
}

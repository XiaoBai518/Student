package com.student.hbnu.domain.Entity.course;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Transient;

import com.student.hbnu.constant.Constant;
import com.student.hbnu.domain.Entity.BaseEntity;
import com.student.hbnu.domain.Entity.notify.Notify;

@Entity
public class Course extends BaseEntity {
	
	    private String issys;//是否是示例课程   标志 0不现实 1显示
	    private String coursename;//课程名 
	    private String code;// 加入课堂的需要输入的ID
	    
	    private String teacherId;
	    
		private String minpic;//小背景图

	    private int total;//成员人数
	    private int homeworkcount;
	    private int coursewarecount;
	    private int notifycount;
	    
	    private String username; //课程创建者名字
	    @Transient
	    private String avatar; //学生头像
	    @Transient
	    private List<Notify> hlist;//作业列表
	    @Transient
	    private int role;
	    public Course() {
	    	issys= "0";
	    	minpic = Constant.COURSE_IMAGE_DEFAULTPATH;
	    	total= 0;
	    	homeworkcount = 0;
	    	coursewarecount = 0;
	    	notifycount = 0;
	    }
	
	    


		public String getTeacherId() {
			return teacherId;
		}
		public void setTeacherId(String teacherId) {
			this.teacherId = teacherId;
		}

		public String getIssys() {
			return issys;
		}
		public void setIssys(String issys) {
			this.issys = issys;
		}
		public String getCoursename() {
			return coursename;
		}
		public void setCoursename(String coursename) {
			this.coursename = coursename;
		}
		public String getCode() {
			return code;
		}
		public void setCode(String code) {
			this.code = code;
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getMinpic() {
			return minpic;
		}
		public void setMinpic(String minpic) {
			this.minpic = minpic;
		}
		
		public int getTotal() {
			return total;
		}
		public void setTotal(int total) {
			this.total = total;
		}
		public int getHomeworkcount() {
			return homeworkcount;
		}
		public void setHomeworkcount(int homeworkcount) {
			this.homeworkcount = homeworkcount;
		}
		public int getCoursewarecount() {
			return coursewarecount;
		}public void setCoursewarecount(int coursewarecount) {
			this.coursewarecount = coursewarecount;
		}public int getNotifycount() {
			return notifycount;
		}
		public void setNotifycount(int notifycount) {
			this.notifycount = notifycount;
		}
		public String getAvatar() {
			return avatar;
		}
		public void setAvatar(String avatar) {
			this.avatar = avatar;
		}
		public List<Notify> getHlist() {
			return hlist;
		}
		public void setHlist(List<Notify> hlist) {
			this.hlist = hlist;
		}
		public int getRole() {
			return role;
		}
		public void setRole(int role) {
			this.role = role;
		}
	    
	    
}

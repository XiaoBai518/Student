package com.student.hbnu.domain.Entity.user;

import javax.persistence.Entity;
import javax.persistence.Transient;

import com.student.hbnu.constant.Constant;
import com.student.hbnu.domain.Entity.BaseEntity;

@Entity
public class User extends BaseEntity {

	//必填写
	private int role;	//角色
	private String email;
	private String password;
	private String school;
	private String username;
	private String iconPath;
	
	//面部信息
	private int FaceData = Constant.FACEDATA_OFF;//面部信息标志， 0为 未上传， 1为已上传
	
	//学生填写
	private String stno;//学号
	
	
	//老师填写
	
	
	//非字段
	@Transient
	private String loginInfo;
	@Transient
	private Integer count;//旷课次数
	
	public Integer getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	//构造
	public User() {
		iconPath = Constant.USER_IMAGE_DEFAULTPATH;
	}
	public User(String erro) {
		this.loginInfo = erro;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getRole() {
		return role;
	}
	public void setRole(int role) {
		this.role = role;
	}
	public String getSchool() {
		return school;
	}
	public void setSchool(String school) {
		this.school = school;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getIconPath() {
		return iconPath;
	}
	public void setIconPath(String iconPath) {
		this.iconPath = iconPath;
	}
	public String getStno() {
		return stno;
	}
	public void setStno(String stno) {
		this.stno = stno;
	}
	public String getLoginInfo() {
		return loginInfo;
	}
	public void setLoginInfo(String loginInfo) {
		this.loginInfo = loginInfo;
	}
	
	
	
	public int getFaceData() {
		return FaceData;
	}
	public void setFaceData(int faceData) {
		FaceData = faceData;
	}
	public void setBaseInfo(String username,String stno,String school) {
		this.username = username;
		this.stno = stno;
		this.school = school;
	}
	
}

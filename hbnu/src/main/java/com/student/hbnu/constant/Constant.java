package com.student.hbnu.constant;

import java.util.concurrent.CopyOnWriteArraySet;

import com.student.hbnu.controller.TeacherSocket;

public class Constant {
	
//	public static final String FACE_CASCADE_FILE = "d:/lbpcascade_frontalface.xml";

	public static String faceNum = "";
	public static String faceName = "";
	public static String faceCount = "";
	
	/**********************错误信息********************/
	 public static final String 
	 							ERROINFO_PASSWORDERRO = "passworderro",
	 							ERROINFO_NOUSER = "没有查询到用户",
	 						    ERROINFO_SQLERRO = "查询错误";
	 public static final  int
	 							ERROCODE_NOUSER = 2,//没有查询到用户
	 							ERROCODE_SQLERRO = 3;//数据库错误
	
	/**********************验证码********************/
	  public static final  int 
	  							VERIFY_IMG_WIDTH = 80,//图片宽
	  							VERIFY_IMG_HEIGTH = 23,//图片高
	  							VERIFY_IMG_LINESIZE = 40,//干扰线数量
	    						VERIFY_IMG_STRINGNUM = 4;//随机产生字符数量
	  public static final String RANDOMCODEKEY = "verifyCode";//放到session中的key
	/**********************网址********************/
	  public static final String 
	  							URL_RESPONSE_REGISTER_STUDENT = "http://localhost:9090/html/MainIndexStudent.html",//学生注册成功后跳转路径
	  							URL_RESPONSE_REGISTER_TEACHER = "http://localhost:9090/html/MainIndexTeacher.html",//老师注册成功后跳转路径
	  							URL_WEBSOCKET = "ws://localhost:8080/websocket";
	  /**********************用户********************/
	  public static final String 
	  							USER_IMAGE_DEFAULTPATH = "/userIcon/defaultUserIcon.jpg";
	  public static final int   
	  							USER_ROLE_STUDENT = 0,//学生
	  							USER_ROLE_TEACHER = 1;//老师
	/**********************课程********************/
	  public static final String 
	  							COURSE_IMAGE_DEFAULTPATH = "/courseImg/default.jpg";
	/**********************WebSocket********************/
	  public static final CopyOnWriteArraySet<TeacherSocket> webSocketSet = new CopyOnWriteArraySet<TeacherSocket>();
	  public static final String
	  							WEBSOCKET_CLOSE = "关闭";	
	/**********************考勤********************/
	  public static final int 
	  						  ATTENCE_TYPE_NUMBER = 1,//数字考勤
	  						  ATTENCE_TYPE_FACE = 2;//人脸考勤
	  public static final int 
		  					ATTENCE_STATE_OK = 0,//正常考勤
		  					ATTENCE_STATE_OFF = 1,//旷课
		  					ATTENCE_STATE_LATE = 2;//迟到
	/**********************人脸识别********************/
	  
	  /**************人脸识别_状态码************/
	  public static final int 
		   					FACEDATA_OFF = 0,//没有上传人脸数据
		   					FACEDATA_OK = 1;//已经上传人脸数据
	  /**************人脸识别_提示信息************/
	  public static final String 
							FACEINFO_NOPEOPLE = "0",//没有人脸数据
							FACEINFO_MULTIPLEPEOPLE = "1";//多人入镜
	  /**************人脸识别_参数************/
	  public static final String
	  			 			FACE_IMAGE_PATH = "f:/faceCollection",//人脸信息存储位置
	  			 			FACE_MODEL_PATH = "d:/lbphfaces.xml";//人脸信息训练结果存放位置
	  public static final int 
	  						FACE_LOOPNUM = 5;//检测次数
								
}

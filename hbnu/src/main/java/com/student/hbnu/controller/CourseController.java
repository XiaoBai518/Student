package com.student.hbnu.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.student.hbnu.constant.Constant;
import com.student.hbnu.domain.Entity.course.Course;
import com.student.hbnu.domain.Entity.user.User;
import com.student.hbnu.domain.jsonData.JsonData;
import com.student.hbnu.domain.jsonData.course.CourseListsResponse;
import com.student.hbnu.domain.jsonData.course.CourseResponse;
import com.student.hbnu.domain.jsonData.course.CreateCourseResponse;
import com.student.hbnu.domain.jsonData.course.DeleteCourseResponse;
import com.student.hbnu.domain.jsonData.course.JoinCourseResponse;
import com.student.hbnu.domain.jsonData.course.MemberResponse;
import com.student.hbnu.service.impl.course.CourseServiceImpl;
import com.student.hbnu.service.impl.course.StudentCourseRelationServiceImpl;
import com.student.hbnu.service.impl.user.UserServiceImpl;
import com.student.hbnu.util.Gson.GsonUtil;

@RestController
@RequestMapping("/CourseApi")
public class CourseController {
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	@Resource
	private CourseServiceImpl courseServiceImpl;
	@Resource
	private UserServiceImpl userServiceImpl;
	@Resource
	private StudentCourseRelationServiceImpl studentCourseRelationServiceImpl;
	
	/**
	 * 根据用户Id  获取加入/创建的课程
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/lists",method=RequestMethod.GET)
	public String getList(@RequestParam("id")int id) {
		
			CourseListsResponse clr = new CourseListsResponse();
			List<Course> cl;
		//判断用户身份  （老师/学生）
		switch (this.userServiceImpl.getRoleById(id)) {
		case Constant.USER_ROLE_STUDENT:{
			//是学生
			 cl = this.courseServiceImpl.getListByStudentId(id);
			clr.setInfo("success");
			clr.setLists(cl);
			clr.setStatus(1);
			logger.info("是学生啊");
			break;
		}
		case Constant.USER_ROLE_TEACHER:{
			//是老师
			 cl = this.courseServiceImpl.getListByTeacherId(id);
			 clr.setInfo("success");
			 clr.setLists(cl);
			 clr.setStatus(1);
			 logger.info("是老师啊");
			break;
		}
		case Constant.ERROCODE_NOUSER:{
			clr.setStatus(0);
			clr.setLists(null);
			clr.setInfo(Constant.ERROINFO_NOUSER);
			break;
		}
		case Constant.ERROCODE_SQLERRO:{
			clr.setStatus(0);
			clr.setLists(null);
			clr.setInfo(Constant.ERROINFO_SQLERRO);
			break;
		}
		}
		
		
		return GsonUtil.GsonString(clr);
		
	}
	/**
	 * 根据课程Id 获取课程
	 * @param courseid
	 * @return
	 */
	@RequestMapping(value="/getCourse",method=RequestMethod.GET)
	public String getById(@RequestParam("courseid")int courseid) {
		Course c= this.courseServiceImpl.getById(courseid);
		
		CourseResponse cr = new CourseResponse();
		if(c!=null) {
			cr.setCourse(c);
			cr.setStatus(1);
		}
		
		return GsonUtil.GsonString(cr);
		
	}
	/**
	 * 教师 创建课程
	 * @param course
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/createCourse",method=RequestMethod.POST)
	public String createCourse(Course course) throws Exception {
		this.courseServiceImpl.createCourse(course);
		
		CreateCourseResponse ccr = new CreateCourseResponse();
		
		ccr.setStatus(1);
		ccr.setInfo("success");
		course.setRole(1);
		ccr.setData(course);
		return GsonUtil.GsonString(ccr);
	}
	/**
	 * 教师删除课程
	 * @param id
	 * @param password
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/delCourse",method=RequestMethod.POST)
	public String delCourse(@RequestParam("courseid")int id,@RequestParam("password")String password,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
	
		if(((User)session.getAttribute("user")).getPassword().equals(password)) {
			//密码正确
			this.courseServiceImpl.delCourse(id);
		}
		
		
		DeleteCourseResponse dcr = new DeleteCourseResponse();
		
		dcr.setStatus(1);
		dcr.setInfo("success");
		
		return GsonUtil.GsonString(dcr);
		
	}
	/**
	 * 学生退课
	 * @param id
	 * @param password
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/delCourseStudent",method=RequestMethod.POST)
	public String delCourseStudent(@RequestParam("courseid")int id,@RequestParam("password")String password,HttpSession session) {
		if(((User)session.getAttribute("user")).getPassword().equals(password)) {
			//密码正确
			
			//退课
			this.courseServiceImpl.delCourseStudent(id);
		}
		
		DeleteCourseResponse dcr = new DeleteCourseResponse();
		
		dcr.setStatus(1);
		dcr.setInfo("success");
		
		return GsonUtil.GsonString(dcr);
		
	}
	/**
	 * 学生通过邀请码加入课堂
	 * @param code
	 * @return
	 */
	@RequestMapping(value="/joinCourseByCode",method=RequestMethod.POST)
	public String joinCourseByCode(@RequestParam("code")String code,HttpServletRequest request) {
		HttpSession session = request.getSession();
		
		Course c = this.courseServiceImpl.joinCourseByCode(code, ((User)session.getAttribute("user")).getId());
		
		JoinCourseResponse jcr = new JoinCourseResponse();
		
		jcr.setStatus(1);
		if(c!=null) {
			c.setRole(1);
			jcr.setData(c);
		}
		
	
		jcr.setInfo("success");
		
		return GsonUtil.GsonString(jcr);
	}
	/**
	 * 根据课程Id 获取 学生列表
	 * @param courseId
	 * @return
	 */
	@RequestMapping(value="/getMember",method=RequestMethod.GET)
	public String getMember(@RequestParam("courseid")int courseId) {
		//通过课程Id  获取加入的课程的学生Id列表
		List<Integer> idL = this.studentCourseRelationServiceImpl.getStudentIdListByCourseId(courseId);
		MemberResponse mr = new MemberResponse();
		//通过学生Id列表 获取学生列表
		List<User> ul = this.userServiceImpl.getListByIdList(idL);

		if(ul!=null) {
			mr.setStatus(1);
			mr.setLists(ul);
			mr.setTotal(ul.size());
		}
		return GsonUtil.GsonString(mr);
	}
	/**
	 * 根据课程Id 批量删除课程成员
	 * @return
	 */
	@RequestMapping(value="/deleteStudentBat",method=RequestMethod.POST)
	public String deleteStudentRelation(@RequestParam("courseid")int id,@RequestParam("studentidlist")List<Integer> idL) {
		this.studentCourseRelationServiceImpl.deleteRelationByStudentIdList(id,idL);
		
		return GsonUtil.GsonString(new JsonData(1,"success"));
	}
}

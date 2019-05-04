package com.student.hbnu.controller;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.student.hbnu.constant.Constant;
import com.student.hbnu.domain.Entity.user.User;
import com.student.hbnu.domain.jsonData.JsonData;
import com.student.hbnu.domain.jsonData.user.GetUserRoleResponse;
import com.student.hbnu.domain.jsonData.user.LoadUserResponse;
import com.student.hbnu.domain.jsonData.user.RegisterLoginResponse;
import com.student.hbnu.domain.jsonData.verify.VerifyResponse;
import com.student.hbnu.service.impl.course.StudentCourseRelationServiceImpl;
import com.student.hbnu.service.impl.user.UserServiceImpl;
import com.student.hbnu.util.Gson.GsonUtil;

@RestController
@RequestMapping("/UserApi")
public class UserController {
	//日志
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	//用户业务层
	@Resource
	public UserServiceImpl userServiceImpl;
	@Resource
	public StudentCourseRelationServiceImpl studentCourseRelationServiceImpl;

	/**
	  * 学生注册
	 * @param user
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/registerStudent",method=RequestMethod.POST)
	public String registerStudent(User user,HttpSession session) throws Exception {
		logger.info("学生开始注册");
		
		//设置用户身份
		user.setRole(Constant.USER_ROLE_STUDENT);
		
		int status = userServiceImpl.register(user);
		//设置返回数据
		 RegisterLoginResponse rr = new RegisterLoginResponse();
		if(status==0) {
			rr.setStatus(status);
			rr.setInfo("账号已注册");
			logger.info("账号已注册");
		}else {
			 rr.setStatus(status);
			 rr.setUid(Integer.toString(user.getId()));
			 rr.setUrl(Constant.URL_RESPONSE_REGISTER_STUDENT);
			 session.setAttribute("user", user);
			 logger.info("成功注册一名学生");
		}
		return GsonUtil.GsonString(rr);
	}
	/**
	  * 老师注册
	 * @param user
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/registerTeacher",method=RequestMethod.POST)
	public String registerTeacher(User user,HttpSession session) throws Exception {
		logger.info("教师开始注册");
		
		//设置用户身份
		user.setRole(Constant.USER_ROLE_TEACHER);
		
		int status = userServiceImpl.register(user);
		//设置返回数据
		 RegisterLoginResponse rr = new RegisterLoginResponse();
		 if(status==0) {
			 rr.setStatus(status);
			 rr.setInfo("账号已注册");
		 }else {
			 rr.setStatus(status);
			 rr.setUid(Integer.toString(user.getId()));
			 rr.setUrl(Constant.URL_RESPONSE_REGISTER_TEACHER);
			 
			 session.setAttribute("user", user);
			 logger.info("教师成功注册");
		 }
		
		return GsonUtil.GsonString(rr);
	}
	/**
	  * 登陆
	 * @param user
	 * @return
	 */
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public String login(User user,HttpServletRequest request) {
		HttpSession session = request.getSession();
		logger.info("登陆中。。。");
		Cookie[] cl = request.getCookies();
		if(cl!=null) {
			for(Cookie c:cl) {
				System.out.println(c.getName()+"  "+c.getValue());
			}
		}else System.out.println("Cookie为空");
	
		User u = this.userServiceImpl.login(user);
		RegisterLoginResponse rlr = new RegisterLoginResponse();
			if(u==null) {
				
				rlr.setStatus(0);
				rlr.setInfo("该邮箱未注册");
				
			}else if(u.getLoginInfo()!=null&&u.getLoginInfo().equals(Constant.ERROINFO_PASSWORDERRO)){
				rlr.setStatus(0);
				rlr.setInfo("密码错误");
				
			}else {
				rlr.setStatus(1);
				rlr.setUid(Integer.toString(u.getId()));
				session.setAttribute("user", u);
				switch (u.getRole()) {
				case  Constant.USER_ROLE_STUDENT:
						rlr.setUrl(Constant.URL_RESPONSE_REGISTER_STUDENT);
						break;
				case  Constant.USER_ROLE_TEACHER:
						rlr.setUrl(Constant.URL_RESPONSE_REGISTER_TEACHER);
						break;
				}
			}
		return GsonUtil.GsonString(rlr);
	}
	/**
	 * 自动登录
	 * @param id
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/autoLogin",method=RequestMethod.POST)
	public String AutoLogin(@RequestParam("id")int id,HttpSession session) {
		
		User u = this.userServiceImpl.getById(id);
		JsonData jd = new JsonData();
		if(u!=null) {
			session.setAttribute("user", u);
			jd.setStatus(1);
		}else {
			jd.setStatus(0);
		}
		
		return GsonUtil.GsonString(jd);
	}
	/**
	 * 注销账号
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/logout",method=RequestMethod.GET)
	public String logout(HttpSession session) {
		
		 session.removeAttribute("user");
		
		JsonData jd = new JsonData();
		 jd.setStatus(1);
		 jd.setInfo("success");
		
		return GsonUtil.GsonString(jd);
	}
	/**
	  * 更新用户基本信息
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/updateInfo",method=RequestMethod.POST)
	public String updateUser(User user) {
		
		 User u = this.userServiceImpl.getById(user.getId());
		 u.setBaseInfo(user.getUsername(),user.getStno(), user.getSchool());
		 this.userServiceImpl.update(u);
		 JsonData jd = new JsonData();
		 jd.setStatus(1);
		 return GsonUtil.GsonString(jd);
	}
	/**
	  * 更新用户角色
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/changeRole",method=RequestMethod.POST)
	public String changeRole(User user) {
		
		 User u = this.userServiceImpl.getById(user.getId());
		 u.setRole(user.getRole());
		 this.userServiceImpl.update(u);
		 JsonData jd = new JsonData();
		 jd.setStatus(1);
		 return GsonUtil.GsonString(jd);
	}
	/**
	  * 更新用户邮箱
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/updateEmail",method=RequestMethod.POST)
	public String updateEmail(User user) {
		
		 User u = this.userServiceImpl.getById(user.getId());
		 JsonData jd = new JsonData();
		 
		 if(u.getPassword().equals(user.getPassword())) {
			 u.setEmail(user.getEmail());
			 this.userServiceImpl.update(u);
			 
			 jd.setStatus(1);
		 }else {
			 jd.setInfo("密码错误");
			 jd.setStatus(0);
		 }
		
		
		 return GsonUtil.GsonString(jd);
	}
	/**
	  * 更新用户密码
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/updatePassword",method=RequestMethod.POST)
	public String updatePassword(User user) {
		
		 User u = this.userServiceImpl.getById(user.getId());
		 JsonData jd = new JsonData();
		 
		u.setPassword(user.getPassword());
		 this.userServiceImpl.update(u);
		 jd.setStatus(1);
		 return GsonUtil.GsonString(jd);
	}
	/**
	  * 通过userId 获取用户信息
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/getUser",method=RequestMethod.POST)
	public String AjaxGetUserIcon(@RequestParam("id") int id) {
		
		 User u = this.userServiceImpl.getById(id);
		 LoadUserResponse lur = new LoadUserResponse();
		 if(u!=null) {
			 lur.setStatus(1);
			 lur.setUser(u);
			 return GsonUtil.GsonString(lur);
		 }
		 lur.setStatus(0);
		 return GsonUtil.GsonString(lur);
	}
	/**
	 * 根据用户Id  获得用户身份
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/getRole",method=RequestMethod.GET)
	public String getRole(@RequestParam("id")int id) {
		
		GetUserRoleResponse grr = new GetUserRoleResponse();
		
		grr.setRole(this.userServiceImpl.getRoleById(id));
		grr.setStatus(1);
		grr.setInfo("success");
		return GsonUtil.GsonString(grr);
			
	}
	/**
	 * 根据课程Id  获得学生人数
	 * @param id
	 * @return
	 */
//	@RequestMapping(value="/getStudentCount",method=RequestMethod.GET)
//	public String getStudentCount(@RequestParam("courseid")int courseid) {
//		
////		List<Integer> idL = this.studentCourseRelationServiceImpl.getStudentIdListByCourseId(courseid);
////		
////		
////		GetUserRoleResponse grr = new GetUserRoleResponse();
////		
////		grr.setRole(this.userServiceImpl.getRoleById(id));
////		grr.setStatus(1);
////		grr.setInfo("success");
//		return GsonUtil.GsonString(null);
//			
//	}
	/**
	  * 校验验证码
	 * @param verify
	 * @param request
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/sendRegisterCode",method=RequestMethod.GET)
	public String sendRegisterCode(@RequestParam("verify") String verify,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Cookie[] cl = request.getCookies();
		for(Cookie c :cl) {
			if(c.getName().equals("JSESSIONID")) {
				System.out.println("JSESSIONID"+c.getValue());
			}
		}
		VerifyResponse vr = new VerifyResponse();
		if(session.getAttribute(Constant.RANDOMCODEKEY).equals(verify)) {
			vr.setStatus(1);
			vr.setInfo("验证码正确");
		}else {
			vr.setStatus(0);
			vr.setInfo("验证码错误");
		}
		logger.info("验证码验证结束");
		return GsonUtil.GsonString(vr);
	}

}

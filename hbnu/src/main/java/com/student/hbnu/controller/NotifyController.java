package com.student.hbnu.controller;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.student.hbnu.domain.Entity.notify.Notify;
import com.student.hbnu.domain.Entity.user.User;
import com.student.hbnu.domain.jsonData.JsonData;
import com.student.hbnu.domain.jsonData.notify.NotifyListsResponse;
import com.student.hbnu.service.impl.notify.NotifyServiceImpl;
import com.student.hbnu.service.impl.user.UserServiceImpl;
import com.student.hbnu.util.Gson.GsonUtil;


@RestController
@RequestMapping("/NotifyApi")
public class NotifyController {
	@SuppressWarnings("unused")
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Resource
	private NotifyServiceImpl notifyServiceImpl;
	@Resource
	private UserServiceImpl userServiceImpl;
	
	/**
	 * 获取 指定班级  的公告列表
	 * @param n
	 * @return
	 */
	@RequestMapping(value="/lists",method=RequestMethod.GET)
	private String getLists(Notify n) {
		
		List<Notify> nl = this.notifyServiceImpl.getListsByCourseId(n.getCourseId());
		
		NotifyListsResponse nlr = new NotifyListsResponse();
		
		nlr.setStatus(1);
		nlr.setLists(nl);
		
		return GsonUtil.GsonString(nlr);
	}
	/**
	 * 添加公告
	 * @param n
	 * @return
	 */
	@RequestMapping(value="/addNotify",method=RequestMethod.POST)
	private String addNotify(Notify n) {
		User teacher = this.userServiceImpl.getById(n.getTeacherId());
		n.setUserName(teacher.getUsername());
		this.notifyServiceImpl.addNotify(n);
		JsonData jd = new JsonData();
		jd.setStatus(1);
		return GsonUtil.GsonString(jd);
	}
	/**
	 * 阅读公告
	 * @param n
	 * @return
	 */
	@RequestMapping(value="/readNotify",method=RequestMethod.GET)
	private String readNotify(Notify n) {
		this.notifyServiceImpl.readNotify(n);
		
		JsonData jd = new JsonData();
		jd.setStatus(1);
		return GsonUtil.GsonString(jd);
	}
	
}

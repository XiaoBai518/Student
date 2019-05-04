package com.student.hbnu.service.impl.notify;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.student.hbnu.domain.Entity.notify.Notify;
import com.student.hbnu.repository.dao.impl.notify.NotifyDaoImpl;

@Service
@Transactional(readOnly=false)
public class NotifyServiceImpl {
	@SuppressWarnings("unused")
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Resource
	private NotifyDaoImpl notifyDaoImpl;
	
	/**
	 * 学生阅读公告 （增加阅读量）
	 * @param n
	 * @return
	 */
	public void readNotify(Notify n) {
		try {
			n = this.notifyDaoImpl.get(n.getId());
			
			n.readCountAdd();
			this.notifyDaoImpl.update(n);
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
		
		
	}
	/**
	 * 根据课程Id获取全部公告
	 * @param courseId
	 * @return
	 */
	public List<Notify> getListsByCourseId(int courseId) {
		try {
			return this.notifyDaoImpl.getListsByCourseId(courseId);
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
			return new ArrayList<Notify>();
		}
		
	}
	/**
	 * 添加公告
	 * @param n
	 * @return
	 */
	public void addNotify(Notify n) {
		this.notifyDaoImpl.save(n);
		
		
	}
	
}

package com.student.hbnu.repository.dao.impl.notify;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.student.hbnu.domain.Entity.notify.Notify;
import com.student.hbnu.repository.dao.impl.BaseDaoImpl;

@Repository
public class NotifyDaoImpl extends BaseDaoImpl<Notify> {

	/**
	 * 根据课程Id获取全部公告
	 * @param courseId
	 * @return
	 * @throws Exception
	 */
	public List<Notify> getListsByCourseId(Integer courseId) throws Exception {
		String hql = "from Notify where courseId = ?";
		
		return super.findByProperty(hql, new Integer[] {courseId});
	}
}

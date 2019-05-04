package com.student.hbnu.repository.dao.impl.Attence;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.student.hbnu.domain.Entity.Attence.Attence;
import com.student.hbnu.repository.dao.impl.BaseDaoImpl;

@Repository
public class AttenceDaoImpl extends BaseDaoImpl<Attence> {

	@SuppressWarnings("unused")
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	/**
	 * 获取没有完成的考勤
	 * @param courseId
	 * @return
	 * @throws Exception
	 */
	public Attence getNotFinishAttence(int courseId) throws Exception {
		String hql = "from Attence where courseId= ? and FinishTime is null";
		return super.findOne(hql, new Integer[] {courseId});
		
	}
//	/**
//	 * 结束考勤
//	 * @param attence
//	 * @throws Exception 
//	 */
//	public void overAttence(int id,Date finishTime) throws Exception {
//		String hql = "update Attence set FinishTime=? where id = ?";
//		 super.updateByProperty(hql, new Object[] {finishTime,id});
//	}
	/**
	 * 根据课程ID 获取 考勤列表
	 * @param courseId
	 * @return
	 * @throws Exception
	 */
	public List<Attence> getAttenceList(int courseId) throws Exception {
		String hql = "from Attence where courseId= ? and FinishTime is not null";
		return super.findByProperty(hql, new Integer[] {courseId});
	}
	/**
	 * 根据课程ID 获取 考勤数量
	 * @param courseId
	 * @return
	 * @throws Exception
	 */
	public Long getAttenceCount(int courseId) throws Exception {
		String hql = "select COUNT(*) from Attence where courseId= ? ";
		return super.findCount4PageByProperty(hql, new Integer[] {courseId});
	}
	
}

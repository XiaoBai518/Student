package com.student.hbnu.repository.dao.impl.Attence;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.student.hbnu.domain.Entity.Attence.AttenceStudent;
import com.student.hbnu.repository.dao.impl.BaseDaoImpl;

@Repository
public class AttenceStudentDaoImpl extends BaseDaoImpl<AttenceStudent> {

	/**
	 * 获取 参与考勤人数
	 * @param attenceId
	 * @return
	 * @throws Exception
	 */
	public long getCount(int attenceId) throws Exception {
		String hql = "select COUNT(*) from AttenceStudent where attenceId = ?";
		return super.findCount4PageByProperty(hql, new Integer[] {attenceId});
	}
	/**
	 * 根据ID 获取列表
	 * @param attenceId
	 * @return
	 * @throws Exception
	 */
	public List<AttenceStudent> getList(int attenceId) throws Exception {
		String hql = " from AttenceStudent where attenceId = ?";
		return super.findByProperty(hql, new Integer[] {attenceId});
	}
	
	/**
	 * 根据学生Id与考勤记录表Id查找
	 * @param attenceId
	 * @return
	 * @throws Exception
	 */
	public AttenceStudent getAttenceStudentByStudentIdAttenceId(int studentId,int attenceId) throws Exception {
		String hql = "from AttenceStudent where uid = ? and attenceId = ?";
		return super.findOne(hql, new Integer[] {studentId,attenceId});
	}
	
	
}

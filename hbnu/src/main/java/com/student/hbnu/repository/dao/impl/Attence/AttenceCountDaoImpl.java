package com.student.hbnu.repository.dao.impl.Attence;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.student.hbnu.domain.Entity.Attence.AttenceCount;
import com.student.hbnu.repository.dao.impl.BaseDaoImpl;

@Repository
public class AttenceCountDaoImpl extends BaseDaoImpl<AttenceCount> {

	/**
	 * 获取指定课程Id 的学生ID列表（按考勤次数升序）
	 * @param courseId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<AttenceCount> getAbsenceHeightStudentIdLists(int courseId) {
		String hql = " from AttenceCount a where a.courseId = :courseId order by a.count";
		Query query = super.getSession().createQuery(hql);
		query.setParameter("courseId", courseId);
		return query.list();
	}
	/**
	 * 获取指定课程Id 的实体列表
	 * @param courseId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<AttenceCount> getListsByCourseId(int courseId) {
		String hql = " from AttenceCount  where courseId = :courseId";
		Query query = super.getSession().createQuery(hql);
		query.setParameter("courseId", courseId);
		return query.list();
	}
	public AttenceCount getByStudentIdCoursetId(int studentid,int courseid) throws Exception {
		String hql = "from AttenceCount where studentId =? and courseId = ?";
		return super.findOne(hql, new Integer[] {studentid,courseid});
	}
}

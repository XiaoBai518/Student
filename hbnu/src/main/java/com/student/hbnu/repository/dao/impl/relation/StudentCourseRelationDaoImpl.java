package com.student.hbnu.repository.dao.impl.relation;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.student.hbnu.domain.Entity.relation.StudentCourseRelation;
import com.student.hbnu.repository.dao.impl.BaseDaoImpl;

@Repository
public class StudentCourseRelationDaoImpl extends BaseDaoImpl<StudentCourseRelation> {

	/**
	 * 通过学生Id 获取 学生所参加的课程ID 列表
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public List<StudentCourseRelation> getListByStudentId(Integer studentid) throws Exception {
		String hql = "from StudentCourseRelation where studentId=?";
		return this.findByProperty(hql, new Integer[] {studentid});
	}
	/**
	 * 通过学生Id 与课程ID 获取 实体
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public StudentCourseRelation getByStudentIdCourseId(Integer studentid,Integer courseid) throws Exception {
		String hql = "from StudentCourseRelation where studentId=? and courseId = ?";
		return this.findOne(hql, new Integer[] {studentid,courseid});
	}
	/**
	 * 根据课程Id 获取列表
	 * @param courseid
	 * @return
	 * @throws Exception
	 */
	public List<StudentCourseRelation> getListByCourseId(int courseid) throws Exception {
		String hql = "from StudentCourseRelation where courseId=?";
		return this.findByProperty(hql, new Integer[] {courseid});
	}
	/**
	 * 根据课程Id 获取学生人数
	 * @param courseid
	 * @return
	 * @throws Exception
	 */
	public long getStudentCount(int courseid) throws Exception {
		String hql = "select COUNT(*) from StudentCourseRelation where courseId=?";
		return this.findCount4PageByProperty(hql, new Integer[] {courseid});
	}
	/**
	 * 根据课程Id 删除相应 关系
	 * @param courseId
	 * @throws Exception
	 */
	public void deleteByCourseId(String courseId) throws Exception {
		String hql = "delete StudentCourseRelation  where courseId=?";
		
		this.updateByProperty(hql, new String[] {courseId});
	}
	/**
	 * 根据学生Id列表 删除相应 关系
	 * @param sIdL
	 */
	public void deleteByStudentIdList(Integer courseId,List<Integer> sIdL) {
		String hql = "delete StudentCourseRelation  where studentId in (:idList) and courseId = :courseId";
		Query query = super.getSession().createQuery(hql);
		query.setParameterList("idList", sIdL);
		query.setParameter("courseId", courseId);
		query.executeUpdate();
	}
	
}

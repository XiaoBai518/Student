package com.student.hbnu.repository.dao.impl.course;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.student.hbnu.domain.Entity.course.Course;
import com.student.hbnu.repository.dao.impl.BaseDaoImpl;

@Repository
public class CourseDaoImpl extends BaseDaoImpl<Course> {


	/**
	 * 根据课程Id列表  获得课程列表
	 * @param idL
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Course> getListByIdList(Integer [] idL) throws Exception {
		String hql = "from Course where id in (:courseId) ";
		Query query=super.getSessionFactory().getCurrentSession().createQuery(hql);
		query.setParameterList("courseId", idL);
		return query.list();
	}
	/**
	 * 根据老师Id 获得课程列表
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public List<Course> getListByTeacherId(String teacherid) throws Exception {
		String hql = "from Course where teacherId =?";
		
		return this.findByProperty(hql, new String[] {teacherid});
	}
	/**
	 * 通过邀请码  查找课程
	 * @param code
	 * @return
	 * @throws Exception
	 */
	public Course getCourseByCode(String code) throws Exception {
		String hql = "from Course where code = ?";
		return this.findOne(hql, new String[] {code});
	}
	/**
	 * 使 成员人数加1
	 * @param courseid
	 * @throws Exception
	 */
	public void totalAddOne(Integer courseid) throws Exception {
		String sql = "update course set total = (total + 1) where id = ?;";
		super.excuteBySql(sql,new Integer[] {courseid});
	}
	/**
	 * 使 成员人数减1
	 * @param courseid
	 * @throws Exception
	 */
	public void totalMinusOne(Integer courseid) throws Exception {
		String sql = "update course set total = (total - 1) where id = ?;";
		super.excuteBySql(sql,new Integer[] {courseid});
	}
	
}

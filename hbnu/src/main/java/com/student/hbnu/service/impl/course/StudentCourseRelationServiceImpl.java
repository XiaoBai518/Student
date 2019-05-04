package com.student.hbnu.service.impl.course;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.student.hbnu.domain.Entity.relation.StudentCourseRelation;
import com.student.hbnu.domain.Entity.user.User;
import com.student.hbnu.repository.dao.impl.relation.StudentCourseRelationDaoImpl;
import com.student.hbnu.repository.dao.impl.user.UserDaoImpl;

@Service
@Transactional(readOnly=false)
public class StudentCourseRelationServiceImpl {
	//日志
		private Logger logger = LoggerFactory.getLogger(this.getClass());
	@Resource
	private StudentCourseRelationDaoImpl studentCourseRelationDaoImpl;
	@Resource
	private UserDaoImpl userDaoImpl;
	
	/**
	 * 根据课程Id 获取学生Id 列表
	 * @param courseId
	 * @return
	 */
	public List<Integer> getStudentIdListByCourseId(int courseId) {
		try {
			List<StudentCourseRelation> scrL = this.studentCourseRelationDaoImpl.getListByCourseId(courseId);
			
			List<Integer> studentIdL = new ArrayList<Integer>();
			if(scrL!=null) {
				scrL.forEach(scr->studentIdL.add(scr.getStudentId()));
			}
			
			return studentIdL;
			
		} catch (Exception e) {
			logger.error(e.getMessage());
			return null;
		}
		
	}
	/**
	 * 根据课程Id 获取学生 列表
	 * @param courseId
	 * @return
	 */
	public List<User> getStudentListByCourseId(int courseId) {
		try {
			List<StudentCourseRelation> scrL = this.studentCourseRelationDaoImpl.getListByCourseId(courseId);
			
			//学生ID 列表
			List<Integer> idL = new ArrayList<Integer>();
			if(scrL!=null) {
				scrL.forEach(scr->idL.add(scr.getStudentId()));
			}
			
			//学生列表
			 List<User> uL = this.userDaoImpl.getListByIdList(idL);
			if(uL==null) {
				return new ArrayList<User>();
			}else return uL;
			
		} catch (Exception e) {
			logger.error(e.getMessage());
			return null;
		}
		
	}
	/**
	 * 根据 学生Id列表 删除关联
	 * @param idList
	 */
	public void deleteRelationByStudentIdList(Integer courseid,List<Integer> idList) {
		this.studentCourseRelationDaoImpl.deleteByStudentIdList(courseid,idList);
	}
}

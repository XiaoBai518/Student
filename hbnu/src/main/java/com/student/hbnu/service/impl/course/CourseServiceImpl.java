package com.student.hbnu.service.impl.course;


import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.student.hbnu.constant.Constant;
import com.student.hbnu.domain.Entity.course.Course;
import com.student.hbnu.domain.Entity.notify.Notify;
import com.student.hbnu.domain.Entity.relation.StudentCourseRelation;
import com.student.hbnu.repository.dao.impl.course.CourseDaoImpl;
import com.student.hbnu.repository.dao.impl.relation.StudentCourseRelationDaoImpl;
import com.student.hbnu.service.impl.notify.NotifyServiceImpl;
import com.student.hbnu.util.InvitationCode;

@Service
@Transactional(readOnly=false)
public class CourseServiceImpl {
	//日志
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	@Resource
	private CourseDaoImpl courseDaoImpl;
	@Resource
	private StudentCourseRelationDaoImpl studentCourseRelationDaoImpl;
	@Resource
	private NotifyServiceImpl notifyServiceImpl;
	
	/**
	  * 创建课程
	 * @param course
	 */
	public void createCourse(Course course) {
		
		course.setCode(InvitationCode.toSerialCode(Integer.parseInt(course.getTeacherId())));
		this.courseDaoImpl.save(course);

	}
	/**
	 * 删除课程
	 * @param courseid
	 * @return
	 */
	public void delCourse(int courseid) {
		
		this.courseDaoImpl.delete(courseid);
		
		try {
			this.studentCourseRelationDaoImpl.deleteByCourseId(Integer.toString(courseid));
		} catch (Exception e) {
		
			logger.error(e.getMessage());
		}
	}
	/**
	 * 通过课程id 获取课程实体
	 * @param courseId
	 * @return
	 */
	public Course getById(int courseId) {
		try {
			return this.courseDaoImpl.get(courseId);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	/**
	 * 通过课程id 获取学生人数
	 * @param courseId
	 * @return
	 */
	public int getStudentCount(int courseId) {
		try {
			return (int)this.studentCourseRelationDaoImpl.getStudentCount(courseId);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	/**
	 * 学生退课   删除学生与课程的联系
	 * @param courseid
	 */
	public void delCourseStudent(int courseid) {
		
		try {
			//删除学生与课程的联系
			this.studentCourseRelationDaoImpl.deleteByCourseId(Integer.toString(courseid));
			//使成员人数减一1
			this.courseDaoImpl.totalMinusOne(courseid);
		} catch (Exception e) {
		
			logger.error(e.getMessage());
		}
	}
	
	
	/**
	 * 根据学生Id 获得课程列表
	 * @param id
	 * @return
	 */
	public List<Course> getListByStudentId(int id) {
		try {
			List<StudentCourseRelation> scrL = this.studentCourseRelationDaoImpl.getListByStudentId(id);
			List<Integer> idL = new ArrayList<Integer>(); 
			
			
			for(StudentCourseRelation scr:scrL) {
				idL.add(scr.getCourseId());
			}
			List<Course> cL =  this.courseDaoImpl.getListByIdList(idL.toArray(new Integer[idL.size()]));
			
			if(cL==null) return new ArrayList<Course>();
			else {
				cL.forEach(c->{
					List<Notify> n ;
					n = this.notifyServiceImpl.getListsByCourseId(c.getId());
					c.setHlist(n);
				});
				return cL;
			}
			
		} catch (Exception e) {

			logger.error(e.getMessage());
			return new ArrayList<Course>();
		}
	}
	/**
	 * 根据老师Id	   获取课程列表
	 * @param id
	 * @return
	 */
	public List<Course> getListByTeacherId(int id) {
		try {
			List<Course> cl = this.courseDaoImpl.getListByTeacherId(Integer.toString(id));
			
			if(cl==null) return new ArrayList<Course>();
			else {
				cl.forEach(c->{
					List<Notify> temp = this.notifyServiceImpl.getListsByCourseId(c.getId());
					if(temp.size()>0) {
						List<Notify> n = new ArrayList<Notify>();
						n.add(this.notifyServiceImpl.getListsByCourseId(c.getId()).get(0));
						
						c.setHlist(n);
					}
					
				});
				return cl;
			} 
		} catch (Exception e) {
			logger.error(e.getMessage());
			return new ArrayList<Course>();
		}
	}
	/**
	 * 加入课程
	 * @param code
	 * @param StudentId
	 * @return
	 */
	public Course joinCourseByCode(String code,int StudentId) {
		try {
			Course c = this.courseDaoImpl.getCourseByCode(code);
				
			if(c!=null) {
				//查看该学生是否已加入课程
				StudentCourseRelation scr = this.studentCourseRelationDaoImpl.getByStudentIdCourseId(StudentId, c.getId());
				if(scr==null) {
				this.studentCourseRelationDaoImpl.save(new StudentCourseRelation(StudentId, c.getId()));
				//使成员人数加1
				this.courseDaoImpl.totalAddOne(c.getId());
				return c;
			  }
			}
			
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
			
		}
		return null;
	}
}

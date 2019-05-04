package com.student.hbnu.service.impl.Attence;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.student.hbnu.constant.Constant;
import com.student.hbnu.domain.Entity.Attence.Attence;
import com.student.hbnu.domain.Entity.Attence.AttenceCount;
import com.student.hbnu.domain.Entity.Attence.AttenceStudent;
import com.student.hbnu.domain.Entity.user.User;
import com.student.hbnu.domain.jsonData.attence.ExcelData;
import com.student.hbnu.repository.dao.impl.Attence.AttenceCountDaoImpl;
import com.student.hbnu.repository.dao.impl.Attence.AttenceDaoImpl;
import com.student.hbnu.repository.dao.impl.Attence.AttenceStudentDaoImpl;
import com.student.hbnu.repository.dao.impl.user.UserDaoImpl;
import com.student.hbnu.service.impl.course.CourseServiceImpl;
import com.student.hbnu.service.impl.course.StudentCourseRelationServiceImpl;

@Service
@Transactional(readOnly=false)
public class AttenceServiceImpl{

	@SuppressWarnings("unused")
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	//DAO 
	@Resource
	private AttenceDaoImpl attenceDaoImpl;
	@Resource
	private AttenceCountDaoImpl attenceCountDaoImpl;
	@Resource
	private UserDaoImpl userDaoImpl ;
	@Resource
	private AttenceStudentDaoImpl attenceStudentDaoImpl;
	
	//Service
	@Resource
	private StudentCourseRelationServiceImpl studentCourseRelationServiceImpl;
	@Resource
	private CourseServiceImpl courseServiceImpl;
	
	
	/**
	 * 通过Id获取考勤 实体
	 * @param attence
	 */
	public Attence getById(int attenceId) {
		try {
			return this.attenceDaoImpl.get(attenceId);
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 新增数字考勤
	 * @param attence
	 */
	public void addDigitAttence(Attence attence) {
		attence.setType(Constant.ATTENCE_TYPE_NUMBER);
		attence.setCode((int)((Math.random()*9+1)*1000));
		attence.setTotalCount(this.courseServiceImpl.getStudentCount(attence.getCourseId()));
		this.attenceDaoImpl.save(attence);
	}
	/**
	 * 新增智能人脸考勤考勤
	 * @param attence
	 */
	public void addFaceAttence(Attence attence) {
		System.out.println("课程ID"+attence.getCourseId());
		attence.setType(Constant.ATTENCE_TYPE_FACE);
		attence.setTotalCount(this.courseServiceImpl.getStudentCount(attence.getCourseId()));
		this.attenceDaoImpl.save(attence);
	}
	/**
	 * 删除考勤
	 * @param attence
	 */
	public void deleteAttence(Attence attence) {
		this.attenceDaoImpl.update(attence);
		this.attenceDaoImpl.delete(attence);
	}
	/**
	 * 结束考勤
	 * @param attence
	 */
	public void overAttence(Attence attence) {
		try {
			//获得考勤记录表实体
			attence = this.attenceDaoImpl.get(attence.getId());
			//获取此次  参与考勤的人数
			int count = (int)this.attenceStudentDaoImpl.getCount(attence.getId());
			attence.OverAttence(count);
			
			this.attenceDaoImpl.update(attence);
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
	}
	/**
	 * 学生进行数字考勤签到
	 * @param attence
	 */
	public void checkin(Attence attence,int studentid,String ip) {
		
		try {
			attence = this.attenceDaoImpl.get(attence.getId());
			//学生签到数据插入
			System.out.println("studentid"+studentid);
			System.out.println("attenceid"+attence.getId());
			System.out.println("ip"+ip);
			AttenceStudent as = new AttenceStudent(studentid, Constant.ATTENCE_STATE_OK, attence.getId() , ip);
			
			this.attenceStudentDaoImpl.save(as);
			
			//学生考勤次数更新/插入
			AttenceCount ac = this.attenceCountDaoImpl.getByStudentIdCoursetId(studentid, attence.getCourseId());
			if(ac==null) {
				ac = new AttenceCount(attence.getCourseId(), studentid, 1);
			}else {
				ac.countAddOne();
			}
			this.attenceCountDaoImpl.save(ac);
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
		
		
		
	}
	/**
	 * 获取 未结束的考勤
	 * @param courseId
	 * @return
	 */
	public Attence getNotFinishAttence(int courseId) {
		try {
			return this.attenceDaoImpl.getNotFinishAttence(courseId);
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 获取 未结束的考勤   学生查询接口
	 * @param courseId
	 * @return
	 */
	public Attence getNotFinishAttenceStudent(int courseId,int studentid) {
		try {
			Attence attence = this.attenceDaoImpl.getNotFinishAttence(courseId);
			if(attence!=null) {//有未结束的考勤
				//该学生是否参与过此次考勤
				AttenceStudent as = this.attenceStudentDaoImpl.getAttenceStudentByStudentIdAttenceId(studentid,attence.getId());
				return (as==null?attence:null);
			}
			return  null;
					
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 通过Id 获取考勤人数  (针对已结束的考勤)
	 * @param attence
	 */
	public int getOverAttenceCount(int attenceId) {
		try {
			return this.attenceDaoImpl.get(attenceId).getAttenceCount();
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
		return 0;
	}
	/**
	 * 通过Id 获取已经参与考勤的人数  (针对未结束的考勤)
	 * @param attence
	 */
	public int getAttenceCount(int attenceId) {
		try {
			
			
			return (int)this.attenceStudentDaoImpl.getCount(attenceId);
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
		return 0;
	}
	/**
	 * 获取考勤列表，包含了考勤的出勤率等信息
	 * @param courseId
	 * @return
	 */
	public List<Attence> getAttenceList(int courseId) {
		try {
			return this.attenceDaoImpl.getAttenceList(courseId);
			
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 根据考勤id 获取 此次考勤涉及到的所有学生  的考勤信息
	 * @param attence   包含课程ID 和  考勤id
	 * @return
	 */
	public List<AttenceStudent> getAttenceStudentLists(Attence attence) {
		try {
			//获取参与此次考勤的  学生考勤记录列表
			List<AttenceStudent> asL = this.attenceStudentDaoImpl.getList(attence.getId());
			
			//参与考勤的学生Id列表
			List<Integer> aIdL = new ArrayList<Integer>();
			 asL.forEach(as->{
				 aIdL.add(as.getUid());
			 });
			 
			//该课程学生 列表
			 List<User> uuL = this.studentCourseRelationServiceImpl.getStudentListByCourseId(attence.getCourseId());;
			 //该课程学生Id列表
			 List<Integer> uuIdL = new ArrayList<Integer>();
			 	uuL.forEach(u->uuIdL.add(u.getId()));
			 	
			 //检验是否有  没有参加过考勤的
			 uuIdL.forEach(id->{
				 	if(aIdL.indexOf(id)<0) {
				 		asL.add(new AttenceStudent(id, Constant.ATTENCE_STATE_OFF, attence.getId(), "",null,uuL.get(uuIdL.indexOf(id))));
				 	}else {
				 		asL.get(aIdL.indexOf(id)).setUser(uuL.get(aIdL.indexOf(id)));
				 	}
			 });
				
		        return asL;
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 更新考勤状态
	 * @param as
	 */
	public void updateState(AttenceStudent as,String ip) {
		int state = as.getState();
		AttenceStudent oldAs;
		AttenceStudent newAs;
		switch(state) {
			case Constant.ATTENCE_STATE_OK: {
				//更改为正常考勤
			 newAs = new AttenceStudent();
			 newAs.setAttenceId(as.getAttenceId());
			 newAs.setUid(as.getUid());
			 newAs.setState(state);
			 newAs.setIp(ip);
			this.attenceStudentDaoImpl.save(newAs);
			break;
			}
			case Constant.ATTENCE_STATE_OFF:{
				//更改为 旷课考勤
				try {
					oldAs = this.attenceStudentDaoImpl.getAttenceStudentByStudentIdAttenceId(as.getUid(),as.getAttenceId());
					if(oldAs!=null) {
						this.attenceStudentDaoImpl.delete(oldAs);
					}else {
							newAs = new AttenceStudent();
						 newAs.setAttenceId(as.getAttenceId());
						 newAs.setUid(as.getUid());
						 newAs.setState(state);
						 newAs.setIp(ip);
						this.attenceStudentDaoImpl.save(newAs);
					}
					
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			case Constant.ATTENCE_STATE_LATE:{
				//更改为 迟到考勤
				try {
					oldAs = this.attenceStudentDaoImpl.getAttenceStudentByStudentIdAttenceId(as.getUid(),as.getAttenceId());
					if(oldAs!=null) {
						oldAs.setState(state);
						this.attenceStudentDaoImpl.update(oldAs);
					}else {
						newAs = new AttenceStudent();
						 newAs.setAttenceId(as.getAttenceId());
						 newAs.setUid(as.getUid());
						 newAs.setState(state);
						 newAs.setIp(ip);
						this.attenceStudentDaoImpl.save(newAs);
					}
					
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		
		
	}
	/**
	 * 获取某个班级，前10个旷课次数最多的学生列表
	 * @param courseId
	 * @return
	 */
	public List<User> getAbsenceHeightStudentLists(int courseId) {
		try {
			List<AttenceCount> acL = this.attenceCountDaoImpl.getAbsenceHeightStudentIdLists(courseId);
			
			//参与考勤的学生Id列表
			List<Integer> aIdL = new ArrayList<Integer>();
			 acL.forEach(ac-> aIdL.add(ac.getStudentId()));
			 
			//该课程学生 列表
			 List<User> uuL = this.studentCourseRelationServiceImpl.getStudentListByCourseId(courseId);;
			 //该课程学生Id列表
			 List<Integer> uuIdL = new ArrayList<Integer>();
			 	uuL.forEach(u->uuIdL.add(u.getId()));
			 	
			 //检验是否有  没有参加过考勤的
			 uuIdL.forEach(uuId->{
				 	if(aIdL.indexOf(uuId)<0) {
				 		aIdL.add(0, uuId);
				 		acL.add(0,new AttenceCount(courseId,uuId,0));
				 	}
			 });
				//学生Id与考勤次数Map
				Map<Integer, Integer> idCount = new HashMap<Integer, Integer>();
				 acL.forEach(ac->idCount.put(ac.getStudentId(), ac.getCount()));
			 			
			 //获取课程考勤次数
			 Long aCount = this.attenceDaoImpl.getAttenceCount(courseId);
			 //设置旷课次数
			 	
			 	Iterator<User> it=uuL.iterator();
		        while(it.hasNext()){
		            User u=it.next();
		            int  temp = (int)(aCount-idCount.get(u.getId()));
		            if (temp==0) {
		                it.remove();
		            }else u.setCount(temp);
		            
		        }		 
			 //排序规则
		        Collections.sort(uuL, new Comparator<User>() {
		            public int compare(User arg0, User arg1) {
		                return arg0.getCount().compareTo(arg1.getCount());
		            }
		        });
		        Collections.reverse(uuL);
		        if(uuL.size()>10) {
		        	 return uuL.subList(0, 10);
		        }
		        return uuL;
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 根据课程ID 获取学生与考勤次数Map
	 * @param courseId
	 * @return
	 */
	public Map<Integer, Integer> getStudentCountMap(int courseId){
		
		//该课程下 参与考勤的学生  考勤次数
		List<AttenceCount> acL = this.attenceCountDaoImpl.getListsByCourseId(courseId);
		
		//参与考勤的学生Id列表
		List<Integer> aIdL = new ArrayList<Integer>();
		 acL.forEach(ac-> aIdL.add(ac.getStudentId()));
		 
		//该课程学生 列表
		 List<User> uuL = this.studentCourseRelationServiceImpl.getStudentListByCourseId(courseId);;
		 //该课程学生Id列表
		 List<Integer> uuIdL = new ArrayList<Integer>();
		 	uuL.forEach(u->uuIdL.add(u.getId()));
		 	
		 //检验是否有  没有参加过考勤的
		 uuIdL.forEach(uuId->{
			 	if(aIdL.indexOf(uuId)<0) {
			 		aIdL.add(0, uuId);
			 		acL.add(0,new AttenceCount(courseId,uuId,0));
			 	}
		 });
			//学生Id与考勤次数Map
			Map<Integer, Integer> idCount = new HashMap<Integer, Integer>();
			 acL.forEach(ac->idCount.put(ac.getStudentId(), ac.getCount()));
		return idCount;			 
	}
	
	/**
	 * 下载Excel报表
	 * @param courseId
	 * @return
	 * @throws Exception 
	 */
	public void formatData(List<ExcelData> edL, List<String> titles,int courseId) throws Exception {
		List<Attence> al = this.getAttenceList(courseId);
		if(al==null) return;
		else {
			//设置 titles
			al.forEach(a->{
				titles.add(a.getTitle());
			});
			
			//该课程下的学生列表
			List<User> ul = this.studentCourseRelationServiceImpl.getStudentListByCourseId(courseId);
			
			//学生考勤次数Map
			Map<Integer,Integer> countMap = this.getStudentCountMap(courseId);
			
			 //获取课程考勤次数
			 Long aCount = this.attenceDaoImpl.getAttenceCount(courseId);
			
			//考勤和学生实体 列表
			List<AttenceStudent> asL = this.attenceStudentDaoImpl.findAll();
			 
			if(ul==null) return;
			else {
				ul.forEach(u->{
					ExcelData ed = new ExcelData();
					//设置学生姓名和学号
					ed.setUsername(u.getUsername());
					ed.setStno(u.getStno());
					
					//设置 考勤状况
					List<String> state = new ArrayList<String>();
					
					
					for(Attence a:al) {
						int len = state.size();
						for(AttenceStudent as: asL) {
							if(as.getAttenceId()==a.getId()&& as.getUid()==u.getId()) {
								state.add("出勤");
								break;
							}
						}
						if(state.size()==len) state.add("缺勤");
					}
					ed.setState(state);
					
					
					//设置 出勤次数
					
					ed.setAttenceCount(countMap.get(u.getId()));
					//设置 缺勤次数
					ed.setAbsenceCount((int)(aCount - countMap.get(u.getId())));
					
					edL.add(ed);
				});
			}
		}
		
	}
	
}

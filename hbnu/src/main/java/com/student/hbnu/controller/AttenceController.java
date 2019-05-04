package com.student.hbnu.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.student.hbnu.domain.Entity.Attence.Attence;
import com.student.hbnu.domain.Entity.Attence.AttenceStudent;
import com.student.hbnu.domain.Entity.user.User;
import com.student.hbnu.domain.jsonData.JsonData;
import com.student.hbnu.domain.jsonData.attence.AbsenceHeightResponse;
import com.student.hbnu.domain.jsonData.attence.AddAttenceResponse;
import com.student.hbnu.domain.jsonData.attence.AttenceInfoResponse;
import com.student.hbnu.domain.jsonData.attence.AttenceListResponse;
import com.student.hbnu.domain.jsonData.attence.AttenceStateResponse;
import com.student.hbnu.domain.jsonData.attence.AttenceStudentListResponse;
import com.student.hbnu.domain.jsonData.attence.DownLoadExcelResponse;
import com.student.hbnu.domain.jsonData.attence.ExcelData;
import com.student.hbnu.domain.jsonData.attence.GetDigitAttenceResponse;
import com.student.hbnu.domain.jsonData.attence.GetSignInResponse;
import com.student.hbnu.domain.jsonData.attence.NotFinishAttenceResponse;
import com.student.hbnu.domain.jsonData.attence.OverAttenceResponse;
import com.student.hbnu.service.impl.Attence.AttenceServiceImpl;
import com.student.hbnu.service.impl.course.CourseServiceImpl;
import com.student.hbnu.util.IpAddress;
import com.student.hbnu.util.Gson.GsonUtil;

@RestController
@RequestMapping("/AttenceApi")
public class AttenceController {
	@SuppressWarnings("unused")
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Resource
	private AttenceServiceImpl attenceServiceImpl;
	@Resource
	private CourseServiceImpl courseServiceImpl;
	
	/**
	 * 新增数字考勤
	 * @param attence 课程Id 标题
	 * @return
	 */
	@RequestMapping(value="/addDigitAttence",method=RequestMethod.POST)
	public String addDigitAttence(Attence attence) {
		
		
		this.attenceServiceImpl.addDigitAttence(attence);
		
		AddAttenceResponse aar = new AddAttenceResponse();
		aar.setStatus(1);
		aar.setAttenceid(attence.getId());
		
		return GsonUtil.GsonString(aar);
	}
	/**
	 * 新增智能人脸考勤
	 * @param attence 课程Id 标题
	 * @return
	 */
	@RequestMapping(value="/addFaceAttence",method=RequestMethod.POST)
	public String addFacetAttence(Attence attence) {
		
		
		this.attenceServiceImpl.addFaceAttence(attence);
		
		AddAttenceResponse aar = new AddAttenceResponse();
		aar.setStatus(1);
		aar.setAttenceid(attence.getId());
		
		return GsonUtil.GsonString(aar);
	}
	/**
	 * 结束考勤
	 * @param attence
	 * @return
	 */
	@RequestMapping(value="/overAttence",method=RequestMethod.POST)
	public String overAttence(Attence attence) {
		
		 this.attenceServiceImpl.overAttence(attence);
		
		OverAttenceResponse oar = new OverAttenceResponse();
		
		oar.setStatus(1);
		oar.setAttenceId(attence.getId());
		return GsonUtil.GsonString(oar);
	}
	/**
	 * 删除考勤
	 * @param attence
	 * @return
	 */
	@RequestMapping(value="/delAttence",method=RequestMethod.POST)
	public String delAttence(Attence attence) {
		
		this.attenceServiceImpl.deleteAttence(attence);
		
		JsonData jd = new JsonData();
		
		jd.setStatus(1);
		return GsonUtil.GsonString(jd);
	}
	/**
	 * 学生进行考勤签到
	 * @param attence
	 * @return
	 */
	@RequestMapping(value="/checkin",method=RequestMethod.POST)
	public String checkin(Attence attence,@RequestParam("studentid")int studentid,HttpServletRequest request) {
		
		this.attenceServiceImpl.checkin(attence,studentid,IpAddress.getIpAddress(request));
		
		JsonData jd = new JsonData();
		
		jd.setStatus(1);
		return GsonUtil.GsonString(jd);
	}

	/**
	 * 获取某个数字化考勤的考勤码
	 * @param attence
	 * @return
	 */
	@RequestMapping(value="/getDigitAttence",method=RequestMethod.GET)
	public String getDigitAttence(Attence attence) {
		attence = this.attenceServiceImpl.getById(attence.getId());
		GetDigitAttenceResponse gdar = new GetDigitAttenceResponse();
	
		gdar.setStatus(1);
		gdar.setCode(attence.getCode());
		gdar.setStudentCount(attence.getTotalCount());
		gdar.setFinishCount(this.attenceServiceImpl.getAttenceCount(attence.getId()));
		return GsonUtil.GsonString(gdar);
	}
	/**获取到勤人数
	 * @param attence
	 * @return
	 */
	@RequestMapping(value="/getDigitSignIn",method=RequestMethod.GET)
	public String getDigitSignIn(Attence attence) {
		attence = this.attenceServiceImpl.getById(attence.getId());
		GetSignInResponse gsir = new GetSignInResponse();
	
		gsir.setStatus(1);
		gsir.setSignInCount(this.attenceServiceImpl.getAttenceCount(attence.getId()));
		gsir.setStudentCount(this.courseServiceImpl.getStudentCount(attence.getCourseId()));
		
		return GsonUtil.GsonString(gsir);
	}
	/**
	 * 获取某个考勤状态
	 * @param attence
	 * @return
	 */
	@RequestMapping(value="/getAttenceState",method=RequestMethod.GET)
	public String getAttenceState(Attence attence) {
		System.out.println(attence.getId());
		attence = this.attenceServiceImpl.getById(attence.getId());
		AttenceStateResponse asr = new AttenceStateResponse();
	
		asr.setStatus(1);
		asr.setAttence(attence);
		
		
		return GsonUtil.GsonString(asr);
	}
	/**
	 * 获取 该课程未结束的考勤
	 * @param courseid
	 * @return
	 */
	@RequestMapping(value="/getNotFinishAttence",method=RequestMethod.GET)
	public String getNotFinishAttence(@RequestParam("courseid")int courseId) {
		
		Attence attence = this.attenceServiceImpl.getNotFinishAttence(courseId);
		
		NotFinishAttenceResponse nfar = new NotFinishAttenceResponse();
		nfar.setStatus(1);
		if(attence!=null) {
			nfar.setAttence(attence);
		}else {
			nfar.setAttence(null);
		}
		
		return GsonUtil.GsonString(nfar);
		
	}
	/**
	 * 获取  未结束的考勤  学生接口
	 * @param courseid
	 * @return
	 */
	@RequestMapping(value="/getNotFinishAttenceStudent",method=RequestMethod.GET)
	public String getNotFinishAttenceStudent(@RequestParam("courseid")int courseId,
											 @RequestParam("studentid")int studentid) {
		
		Attence attence = this.attenceServiceImpl.getNotFinishAttenceStudent(courseId,studentid);
		
		NotFinishAttenceResponse nfar = new NotFinishAttenceResponse();
		nfar.setStatus(1);
		nfar.setAttence(attence);

		return GsonUtil.GsonString(nfar);
		
	}
	/**
	 * 获取考勤列表，包含了考勤的出勤率等信息
	 * @param courseId
	 * @return
	 */
	@RequestMapping(value="/getAttenceList",method=RequestMethod.GET)
	public String getAttenceList(@RequestParam("courseid")int courseId) {
		
		List<Attence> aL = this.attenceServiceImpl.getAttenceList(courseId);
		AttenceListResponse alr = new AttenceListResponse();
		alr.setStatus(1);

			alr.setLists(aL);
		return GsonUtil.GsonString(alr);
		
	}
	/**
	 * 根据考勤id 获取 此次考勤涉及到的所有学生  的考勤信息
	 * @param courseId
	 * @return
	 */
	@RequestMapping(value="/getAttenceStudentLists",method=RequestMethod.GET)
	public String getAttenceStudentLists(Attence attence) {

		List<AttenceStudent> asL = this.attenceServiceImpl.getAttenceStudentLists(attence);
		
		AttenceStudentListResponse aslr = new AttenceStudentListResponse();
		aslr.setStatus(1);
		aslr.setLists(asL);
		return GsonUtil.GsonString(aslr);
		
	}
	/**
	 * 更新考勤状态
	 * @param as
	 * @return
	 */
	@RequestMapping(value="/updateState",method=RequestMethod.GET)
	public String updateState(AttenceStudent as,HttpServletRequest request) {
		String ip = IpAddress.getIpAddress(request);
		this.attenceServiceImpl.updateState(as,ip);
		
		JsonData jd = new JsonData();
		jd.setStatus(1);
		return GsonUtil.GsonString(jd);
	}
	/**
	 * 获取指定课程   考勤总信息 包括 考勤总次数   平均出勤率 班级人数
	 * @param courseId
	 * @return
	 */
	@RequestMapping(value="/getAttenceInfo",method=RequestMethod.GET)
	public String getAttenceInfo(@RequestParam("courseid")int courseId) {
		
		List<Attence> aL = this.attenceServiceImpl.getAttenceList(courseId);
		int studentCount = this.courseServiceImpl.getStudentCount(courseId);
		
		AttenceInfoResponse air = new AttenceInfoResponse();
		air.setStatus(1);
		air.setStudentCount(studentCount);
		
		int count = 0;
		int ratenum = 0;
		if(aL!=null) {
			for(Attence a:aL) {
				count++;
				ratenum+=a.getAttenceRate();;
			}
		}
		
			air.setAttenceCount(count);
			air.setRatenum(count==0?0:(ratenum/count));
		return GsonUtil.GsonString(air);
		
	}
	/**
	 * 获取某个班级，前10个旷课次数的最多的学生列表
	 * @param courseId
	 * @return
	 */
	@RequestMapping(value="/getAbsenceHeightStudentLists",method=RequestMethod.GET)
	public String getAbsenceHeightStudentLists(@RequestParam("courseid")int courseId) {
		
		 List<User> uL = this.attenceServiceImpl.getAbsenceHeightStudentLists(courseId);
		
		AbsenceHeightResponse ahr = new AbsenceHeightResponse();
		ahr.setStatus(1);
		if(uL!=null) {
			ahr.setLists(uL);
		}
		
		return GsonUtil.GsonString(ahr);
		
	}
	
	/**
	 * 下载excel报表
	 * @param courseId
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/downloadExcel",method=RequestMethod.GET)
	public String downloadExcel(Attence attence) throws Exception {
		
		List<ExcelData> ed  = new ArrayList<ExcelData>();
		List<String> titles = new ArrayList<String>();
		this.attenceServiceImpl.formatData(ed,titles,attence.getCourseId());
		
		DownLoadExcelResponse der = new DownLoadExcelResponse();
		
		der.setData(ed);
		der.setTitle(titles);
		
		return GsonUtil.GsonString(der);
		
	}


}

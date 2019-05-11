/**
 * 数据api接口，所有的数据请求的api大集合，这里只要是可复用的
 */
define(function(require,exports,module){
    window.$=window.jQuery=$=require('jquery');
    var plugin = require('plugin');
    var config = require('config');
    exports.APIURL = "http://localhost:8080";
    exports.UPLOADERURL = config.UPLOADERURL;
    /********************课程接口********************************/
    //启用某个班级的邀请码
    exports.courseApi_startCourseCode = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseApi/startCourseCode",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //停用某个班级的邀请码
    exports.courseApi_stopCourseCode = function(courseid,callback){
    	var data = {courseid:courseid};
    	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseApi/stopCourseCode",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
              
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //重置某个班级的邀请码
    exports.courseApi_resetCourseCode = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseApi/resetCourseCode",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取主题列表
    exports.courseApi_themeList = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseApi/themeList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更新某个课程的主题
    exports.courseApi_updateTheme = function(courseid,themeid,callback){
    	var data = {courseid:courseid,themeid:themeid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseApi/updateTheme",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //通过邀请码加入某个课程
    exports.courseApi_joinCourseByCode = function(code,callback){
    	var data = {code:code};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseApi/joinCourseByCode",
   	 		xhrFields:{
    			withCredentials:true
			},
			crossDomain: true,
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   					callback(data);	
   	 			}
   	 		}
   	 	});
    };
    //重命名课程
    exports.courseApi_renameCourse = function(courseid,coursename,coid,departid,callback){
    	var data = {courseid:courseid,coursename:coursename,coid:coid,departid:departid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseApi/renameCourse",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个课程的信息
    exports.courseApi_getCourse = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseApi/getCourse",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除课程，学生则退课
    exports.courseApi_delCourse = function(courseid,password,callback){
    	var data = {courseid:courseid,password:password};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseApi/delCourse",
   	 		xhrFields:{
    			withCredentials:true
			},
			crossDomain: true,
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
     //学生退课
    exports.courseApi_delCourse_student = function(courseid,password,callback){
    	var data = {courseid:courseid,password:password};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseApi/delCourseStudent",
   	 		xhrFields:{
    			withCredentials:true
			},
			crossDomain: true,
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更新某个课程的排序位置
    exports.courseApi_updateCourseSort = function(courseid,index,callback){
    	var data = {courseid:courseid,index:index};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseApi/updateCourseSort",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //批量更新课程的排序
    exports.courseApi_updateCourseSortBat = function(courseidlist,callback){
    	var data = {courseidlist:courseidlist};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseApi/updateCourseSortBat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取所有课程的排序列表
    exports.courseApi_sortList = function(callback){
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseApi/sortList",
   	 		data: {},
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //创建课程
    //如果不属于任何院系，则coid值为0，departid值为0
    exports.courseApi_createCourse = function(coursename,coid,departid,callback){
    	var data = {coursename:coursename,coid:coid,departid:departid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseApi/createCourse",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   					callback(data);
   	 			}
   	 		}
   	 	});
    };
    //复制课程
    exports.courseApi_copyCourse = function(coursename,srcCourseid,copymember,copyteacher,copycourseware,callback){
    	var data = {coursename:coursename,srcCourseid:srcCourseid,copymember:copymember,copyteacher:copyteacher,copycourseware:copycourseware};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseApi/copyCourse",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   					callback(data);	
   	 			}
   	 		}
   	 	});
    };
    //获取所有未被归档的课程
    exports.courseApi_lists = function(id,callback){
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseApi/lists",
   	 		data: {id:id},
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //创建默认课程
    exports.courseApi_createDefaultCourse = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseApi/createDefaultCourse",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取可以导入学生名单的课程名称列表
    exports.courseApi_getImportList = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseApi/getImportList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //选中某个课程，列出某个课程的所有学生
    //tocourseid 是目标课程
    exports.courseApi_getStudentList = function(courseid,tocourseid,callback){
    	var data = {courseid:courseid,tocourseid:tocourseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseApi/getStudentList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //向某个课程导入某些学生
    //studentidlist 多个学生id值以|符号进行分割开来
    //fromcourseid 来源课程id值  tocourseid 目标课程id值
    exports.courseApi_importStudents = function(fromcourseid,tocourseid,studentidlist,callback){
    	var data = {fromcourseid:fromcourseid,tocourseid:tocourseid,studentidlist:studentidlist};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseApi/importStudents",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //设置班级的人数设置
    exports.courseApi_setLimitNum = function(courseid,num,callback){
    	var data = {courseid:courseid,num:num};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseApi/setLimitNum",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
   /************************归档接口******************************/
    //获取归档列表
    exports.archiveApi_lists = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ArchiveApi/lists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增归档
    exports.archiveApi_addArchive = function(courseid,type,callback){
    	var data = {courseid:courseid,type:type};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ArchiveApi/addArchive",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //取消某个归档
    exports.archiveApi_cancleArchive = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ArchiveApi/cancleArchive",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取归档的数量
    exports.archiveApi_getArchiveCount = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ArchiveApi/getArchiveCount",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
   /************************助教接口******************************/
    //添加助教
    exports.assistantApi_addAssistant = function(courseid,email,callback){
    	var data = {courseid:courseid,email:email};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/AssistantApi/addAssistant",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //删除助教
    exports.assistantApi_delAssistant = function(assistantid,callback){
    	var data = {assistantid:assistantid};
    	$.ajax({
    		type: "POST",
    		url: exports.APIURL+"/AssistantApi/delAssistant",
    		data: data,
    		dataType: "json",
    		success: function(data){
    			if(data.status == 1){
    				if(callback){
    					callback(data);
    				}
    			}else{
    				plugin.openMsg(data.info,1);
    			}
    		}
    	});
    };
    //助教确认接口
    exports.assistantApi_comfirmAssistant = function(id,password,callback){
    	var data = {id:id,password:password};
    	$.ajax({
    		type: "POST",
    		url: exports.APIURL+"/AssistantApi/comfirmAssistant",
    		data: data,
    		dataType: "json",
    		success: function(data){
    			if(callback){
    				callback(data);
    			}
    		}
    	});
    };
    //注册并成为助教
    exports.assistantApi_registerAssistant = function(id,password,username,school,callback){
    	var data = {id:id,password:password,username:username,school:school};
    	$.ajax({
    		type: "POST",
    		url: exports.APIURL+"/AssistantApi/registerAssistant",
    		data: data,
    		dataType: "json",
    		success: function(data){
    			if(callback){
    				callback(data);
    			}
    		}
    	});
    };
    //获取教师团队
    exports.assistantApi_getTeacherTeam = function(courseid,callback){
    	var data = {courseid:courseid};
    	$.ajax({
    		type: "GET",
    		url: exports.APIURL+"/AssistantApi/getTeacherTeam",
    		data: data,
    		dataType: "json",
    		success: function(data){
    			if(callback){
    				callback(data);
    			}
    		}
    	});
    };
    /************************成员接口******************************/
    //获取某个课程的学生总数
    exports.studentsApi_getStudentCount = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/StudentsApi/getStudentCount",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //剔除成员
    exports.studentsApi_delStudents = function(courseid,studentidlist,callback){
    	var data = {courseid:courseid,studentidlist:studentidlist};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/StudentsApi/delStudents",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //成员，学生搜索
    exports.studentsApi_search = function(courseid,txt,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseApi/getMember",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取学生汇总的情况
    exports.studentsApi_summaryTpl = function(courseid,studentid,callback){
    	var data = {courseid:courseid,studentid:studentid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/StudentsApi/summaryTpl",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    exports.studentsApi_getStudentBaseInfo = function(courseid,studentid,callback){
    	var data = {courseid:courseid,studentid:studentid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/StudentsApi/getStudentBaseInfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //获取学生的变动情况的名单
    //type 0表示 加课，1表示退课
    exports.studentsApi_studentsChange = function(courseid,type,callback){
    	var data = {courseid:courseid,type:type};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/StudentsApi/studentsChange",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    /**********************成绩集合接口**********************/
    //获取成绩设置
    exports.gradeApi_getSetting = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/GradeApi/getSetting",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取所有作业列表的权重
    exports.gradeApi_getHomeworkListWeight = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/GradeApi/getHomeworkListWeight",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取所有测试列表的权重
    exports.gradeApi_getTestpaperListWeight = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/GradeApi/getTestpaperListWeight",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取所有考勤列表的权重
    exports.gradeApi_getAttenceListWeight = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/GradeApi/getAttenceListWeight",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取所有平时成绩列表的权重
    exports.gradeApi_getRegularListWeight = function(courseid,type,callback){
    	var data = {courseid:courseid,type:type};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/GradeApi/getRegularListWeight",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更改某次作业的权重值
    exports.gradeApi_updateHomeworkWeight = function(homeworkids,weights,callback){
    	var data = {homeworkids:homeworkids,weights:weights};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/GradeApi/updateHomeworkWeight",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更改某次权重值
    exports.gradeApi_updateRegularWeight = function(gradeids,weights,callback){
    	var data = {gradeids:gradeids,weights:weights};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/GradeApi/updateRegularWeight",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //修改某次作业的满分值和未交的分数
    exports.gradeApi_updateHomeworkParameter = function(homeworkid,fullScore,nohandupScore,callback){
    	var data = {homeworkid:homeworkid,fullScore:fullScore,nohandupScore:nohandupScore};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/GradeApi/updateHomeworkParameter",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更改某次课程的【作业成绩】所占的权重比例
    exports.gradeApi_updateHomeworkScoreWeight = function(courseid,weight,callback){
    	var data = {courseid:courseid,weight:weight};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/GradeApi/updateHomeworkScoreWeight",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更改某次测试的权重值
    exports.gradeApi_updateTestpaperWeight = function(testpaperids,weights,callback){
    	var data = {testpaperids:testpaperids,weights:weights};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/GradeApi/updateTestpaperWeight",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //修改某次测试未交的得分
    exports.gradeApi_updateTestpaperParameter = function(testpaperid,nohandupScore,callback){
    	var data = {testpaperid:testpaperid,nohandupScore:nohandupScore};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/GradeApi/updateTestpaperParameter",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更改某次课程的【测试成绩】所占的权重比例
    exports.gradeApi_updateTestpaperScoreWeight = function(courseid,weight,callback){
    	var data = {courseid:courseid,weight:weight};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/GradeApi/updateTestpaperScoreWeight",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更改某次课程的【考勤成绩】所占的权重比例
    exports.gradeApi_updateAttenceScoreWeight = function(courseid,weight,callback){
    	var data = {courseid:courseid,weight:weight};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/GradeApi/updateAttenceScoreWeight",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更改某次课程的考勤的设置
    //absence 缺勤扣除的分数  late 迟到扣除的分数  totalAbsence 总缺勤数
    exports.gradeApi_updateAttenceSetting = function(courseid,absence,late,please,privatep,sickp,statutoryp,leaveearly,callback){
    	var data = {courseid:courseid,absence:absence,late:late,please:please,privatep:privatep,sickp:sickp,statutoryp:statutoryp,leaveearly:leaveearly};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/GradeApi/updateAttenceSetting",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更新考勤的权重
    exports.gradeApi_updateAttenceWeight = function(attenceids,weights,callback){
    	var data = {attenceids:attenceids,weights:weights};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GradeApi/updateAttenceWeight",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更改某次课程的【表现成绩】所占的权重比例
    exports.gradeApi_updatePerformScoreWeight = function(courseid,weight,callback){
    	var data = {courseid:courseid,weight:weight};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/GradeApi/updatePerformScoreWeight",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更新表现的权重
    exports.gradeApi_updatePerformWeight = function(performids,weights,callback){
    	var data = {performids:performids,weights:weights};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GradeApi/updatePerformWeight",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更改某次课程的【平时成绩】所占的权重比例
    exports.gradeApi_updateRegularScoreWeight = function(courseid,weight,type,callback){
    	var data = {courseid:courseid,weight:weight,type:type};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/GradeApi/updateRegularScoreWeight",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更改某次课程的【平时成绩】某次成绩的满分值
    exports.gradeApi_updateRegularParameter = function(gradeid,fullScore,nohandupScore,callback){
    	var data = {gradeid:gradeid,fullScore:fullScore,nohandupScore:nohandupScore};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/GradeApi/updateRegularParameter",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更改某次课程的表现的设置
    //score表示每个颗星的分值
    exports.gradeApi_updatePerformSetting = function(courseid,score,callback){
    	var data = {courseid:courseid,score:score};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/GradeApi/updatePerformSetting",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取表现的权重列表
    exports.gradeApi_getPerformWeight = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/GradeApi/getPerformWeight",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //生成总成绩
    exports.gradeApi_generateGrade = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/GradeApi/generateGrade",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个课程的总成绩
    //txt表示搜索的内容 groupid 表示小组的id值  默认这两个都是为空
    exports.gradeApi_getWeightGradeList = function(courseid,txt,groupid,callback){
    	var data = {courseid:courseid,txt:txt,groupid:groupid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/GradeApi/getWeightGradeList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取总成绩的表头的各项的权重
    exports.gradeApi_getTableHeader = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/GradeApi/getTableHeader",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取总成绩区间统计
    exports.gradeApi_getScoreStat = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/GradeApi/getScoreStat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //修改某个课程某个学生的最终得分
    exports.gradeApi_modifyLastScore = function(courseid,studentid,lastscore,callback){
    	var data = {courseid:courseid,studentid:studentid,lastscore:lastscore};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/GradeApi/modifyLastScore",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //给某个学生成绩
    exports.gradeApi_giveScore = function(homeworkid,studentid,score,callback){
    	var data = {homeworkid:homeworkid,studentid:studentid,score:score};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GradeApi/giveScore",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //成绩页面，搜索某个学生的
    exports.gradeApi_search = function(courseid, txt, groupid, callback){
    	var data = {courseid:courseid,txt:txt,groupid:groupid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/GradeApi/search",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    //成绩页面，获取所有的作业列表
    exports.gradeApi_getHomeworkList = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/GradeApi/getHomeworkList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //成绩页面，获取所有的试卷列表
    exports.gradeApi_getTestpaperList = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/GradeApi/getTestpaperList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //成绩页面，测试搜索某个学生的（获取全部学生时，txt值为空即可）
    exports.gradeApi_testpaperGrades = function(courseid, txt, groupid, callback){
    	var data = {courseid:courseid,txt:txt,groupid:groupid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/GradeApi/testpaperGrades",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    //发布总成绩给学生
    /*
     * state 1表示发布，0表示撤回
     * gradetype 0表示数值成绩 1表示等级成绩
     */
    exports.gradeApi_publishTotalGrade = function(courseid,state,gradetype,callback){
    	var data = {courseid:courseid,state:state,gradetype:gradetype};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GradeApi/publishTotalGrade",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    //撤销发布总成绩给学生
    exports.gradeApi_canclePublishTotalGrade = function(courseid, state, callback){
    	var data = {courseid:courseid,state:state};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GradeApi/canclePublishTotalGrade",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    /********************考勤*****************************/
    //获取查重的剩余次数
    exports.attenceApi_getGPSVipCount = function(attenceid,callback){
    	var data = {attenceid:attenceid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/attenceApi/getGPSVipCount",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //使用查重，将会扣除次数,这里记录那次作业了查重这个功能
    exports.attenceApi_useGPS = function(attenceid,callback){
    	var data = {attenceid:attenceid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/attenceApi/useGPS",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取一个班级的人数
    exports.attenceApi_getStudentCount = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/getStudentCount",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //变更考勤状态
    exports.attenceApi_updateState = function(studentid,attenceid,state,callback){
    	var data = {uid:studentid,attenceId:attenceid,state:state};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/updateState",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更新考勤的标题
    exports.attenceApi_renameAttence = function(attenceid,title,callback){
    	var data = {attenceid:attenceid,title:title};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/AttenceApi/renameAttence",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增考勤
    exports.attenceApi_addAttence = function(courseid,title,callback){
    	var data = {courseid:courseid,title:title};
    	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/AttenceApi/addAttence",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增数字化考勤
    exports.attenceApi_addDigitAttence = function(courseid,title,callback){
    	var data = {courseId:courseid,title:title};
    	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/AttenceApi/addDigitAttence",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
     //新增智能人脸考勤
    exports.attenceApi_addFaceAttence = function(courseid,title,callback){
      var data = {courseId:courseid,title:title};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/AttenceApi/addFaceAttence",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback){
              callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //新增GPS考勤
    exports.attenceApi_addGPSAttence = function(courseid,title,callback){
    	var data = {courseid:courseid,title:title};
    	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/AttenceApi/addGPSAttence",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增现场考勤
    exports.attenceApi_addNowsAttance = function(courseid,title,callback){
    	var data = {courseid:courseid,title:title};
    	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/AttenceApi/addNowsAttance",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个数字化考勤的考勤码
    exports.attenceApi_getDigitAttence = function(id,callback){
    	var data = {id:id};
    	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/getDigitAttence",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更新考勤码
    exports.attenceApi_updateDigitAttenceCode = function(id,callback){
    	var data = {id:id};
    	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/AttenceApi/updateDigitAttenceCode",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取到勤人数
    exports.attenceApi_getDigitSignIn = function(id,callback){
    	var data = {id:id};
    	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/getDigitSignIn",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //结束考勤
    exports.attenceApi_overAttence = function(id,callback){
    	var data = {id:id};
    	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/AttenceApi/overAttence",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //学生进行签到
    exports.attenceApi_checkin = function(id,code,studentid,callback){
    	var data = {id:id,code:code,studentid:studentid};
    	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/AttenceApi/checkin",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
    			if(callback){
    				callback(data);
    			}
   	 		}
   	 	});
    };
    exports.attenceApi_Facecheckin = function(id,studentid,callback){
      var data = {id:id,studentid:studentid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/AttenceApi/checkin",
        data: data,
        dataType: "json",
        success: function(data){
          if(callback){
            callback(data);
          }
        }
      });
    };
    //获取所有未结束的考勤列表
    exports.attenceApi_getNotFinishAttenceList = function(callback){
    	var data = {};
    	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/getNotFinishAttenceList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.attenceApi_getNotFinishAttence = function(courseid,callback){
    	var data = {courseid:courseid};
    	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/getNotFinishAttence",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取现场考勤的二维码
    exports.attenceApi_getQrCode = function(attenceid,callback){
    	var data = {attenceid:attenceid};
    	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/getQrCode",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //学生获取自己某个课程的还未签到的考勤
    exports.attenceApi_getNotFinishAttenceStudent = function(courseid,studentid,callback){
    	var data = {courseid:courseid,studentid:studentid};
    	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/getNotFinishAttenceStudent",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除考勤
    exports.attenceApi_delAttence = function(attenceid,callback){
    	var data = {id:attenceid};
    	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/AttenceApi/delAttence",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //考勤搜索学生数据
    exports.attenceApi_search = function(courseid,txt,groupid,callback){
    	var data = {courseid:courseid,txt:txt,groupid:groupid};
    	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/search",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个课程所有的考勤列表
    exports.attenceApi_getAttenceList = function(courseid,callback){
    	var data = {courseid:courseid}; 
    	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/getAttenceList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个考勤状态
    exports.attenceApi_getAttenceState = function(id,callback){
      	var data = {id:id};
    	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/getAttenceState",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
    			if(callback){
   	 				callback(data);
    			}
   	 		}
   	 	});
    };
    //获取某个学生的某个课程的考勤统计
    exports.attenceApi_getStudentStat = function(courseid,studentid,callback){
      	var data = {courseid:courseid,studentid:studentid};
    	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/getStudentStat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
    			if(callback){
   	 				callback(data);
    			}
   	 		}
   	 	});
    };
    //考勤聚类
    exports.attenceApi_getCluster = function(attenceid,callback){
      	var data = {attenceid:attenceid};
    	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/getCluster",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
    			if(callback){
   	 				callback(data);
    			}
   	 		}
   	 	});
    };
    //考勤总览
    //state 0表示到勤，1表示缺勤，2表示迟到 3表示请假
    exports.attenceApi_getAttenceDetail = function(attenceid,state,callback){
    	var data = {attenceid:attenceid,state:state};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/getAttenceDetail",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个考勤的统计
    exports.attenceApi_getAttenceStat = function(attenceid,callback){
    	var data = {attenceid:attenceid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/getAttenceStat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取考勤学生的地理位置的数据列表
    exports.attenceApi_getLocation = function(attenceid,callback){
    	var data = {attenceid:attenceid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/getLocation",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*****************考勤接口2.0******************/
    //获取考勤列表，包含了考勤的出勤率等信息
    exports.AttenceV2Api_getAttenceList = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/getAttenceList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个班级，前10个旷课次数的最多的学生列表
    exports.AttenceV2Api_getAbsenceHeightStudentLists = function(courseid,top,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/getAbsenceHeightStudentLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //根据考勤id获取到此次考勤的所有学生（或者某个小组的学生）：头像，id，学生姓名，学号，考勤状态0-5，签到时间，ip地址，gps状态（较远，正常，未开启），考勤状态变更次数，签到是否可疑
    exports.AttenceV2Api_getAttenceStudentLists = function(attenceid,courseid,callback){
    	var data = {id:attenceid,courseId:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/getAttenceStudentLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个学生基本信息及在某个班级的所有考勤：学生姓名，头像，学院【{考勤名称，考勤创建时间，考勤类型，考勤状态0-5，学生ip，gps状态（较远，正常，未开启），考勤状态变更次数}】
    exports.AttenceV2Api_getStudentAttenceLists = function(studentid,courseid,callback){
    	var data = {studentid:studentid,courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceV2Api/getStudentAttenceLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //查看学生在某次考勤，的考勤状态变更记录，修改老师名称，变更时间，变更后状态0-5
    exports.AttenceV2Api_getStudentAttenceChangeLog = function(studentid,attenceid,callback){
    	var data = {studentid:studentid,attenceid:attenceid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceV2Api/getStudentAttenceChangeLog",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取班级学生的出勤率统计
    exports.AttenceV2Api_getCourseAttenceRate = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceV2Api/getCourseAttenceRate",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //变更某个学生的考勤地理位置
    exports.AttenceV2Api_changeStudentLocation = function(attenceid,studentid,latitude,longitude,callback){
    	var data = {attenceid:attenceid,studentid:studentid,latitude:latitude,longitude:longitude};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/AttenceV2Api/changeStudentLocation",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /****************表现********************/
    //更新表现的星星数
    exports.performanceApi_updateStar = function(studentid,performanceid,stars,callback){
    	var data = {studentid:studentid,performanceid:performanceid,stars:stars};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PerformanceApi/updateStar",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更新表现的标题
    exports.performanceApi_renamePerformance = function(performanceid,title,callback){
    	var data = {performanceid:performanceid,title:title};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/PerformanceApi/renamePerformance",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新建表现
    exports.performanceApi_addPerformance = function(courseid,title,callback){
    	var data = {courseid:courseid,title:title};
    	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/PerformanceApi/addPerformance",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除表现
    exports.performanceApi_delPerformance = function(performanceid,callback){
    	var data = {performanceid:performanceid};
    	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/PerformanceApi/delPerformance",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //表现的学生信息搜索
    exports.performanceApi_search = function(courseid,txt,groupid,callback){
    	var data = {courseid:courseid,txt:txt,groupid:groupid};
    	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PerformanceApi/search",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取表现的列表
    exports.performanceApi_getPerformanceList = function(courseid, callback){
    	var data = {courseid:courseid};
    	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PerformanceApi/getPerformanceList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个学生的某个课程的表现统计
    exports.performanceApi_getStudentStat = function(courseid,studentid,callback){
        var data = {courseid:courseid,studentid:studentid};
        $.ajax({
        	type: "GET",
        	url: exports.APIURL+"/PerformanceApi/getStudentStat",
        	data: data,
        	dataType: "json",
        	success: function(data){
    	  		if(callback){
    	  			callback(data);
    	  		}
        	}
        });
    };
    //通过课堂的提问，给学生进行星星奖励
    exports.performanceApi_giveRewardToAsk = function(courseid,studentid,stars,callback){
        var data = {courseid:courseid,studentid:studentid,stars:stars};
        $.ajax({
        	type: "GET",
        	url: exports.APIURL+"/PerformanceApi/giveRewardToAsk",
        	data: data,
        	dataType: "json",
        	success: function(data){
    	  		if(callback){
    	  			callback(data);
    	  		}
        	}
        });
    };
    //通过课堂的抢答，给学生进行星星奖励
    exports.performanceApi_giveRewardToRace = function(courseid,studentid,stars,callback){
        var data = {courseid:courseid,studentid:studentid,stars:stars};
        $.ajax({
        	type: "GET",
        	url: exports.APIURL+"/PerformanceApi/giveRewardToRace",
        	data: data,
        	dataType: "json",
        	success: function(data){
    	  		if(callback){
    	  			callback(data);
    	  		}
        	}
        });
    };
    /**********************私信接口************************/
    //获取所有的朋友列表
    exports.letterApi_getFriendLists = function(courseid,role,callback){
    	var data = {courseid:courseid,role:role}; 
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/LetterApi/getFriendLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //列出所有课程
    exports.letterApi_getCourseList = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/LetterApi/getCourseList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //私信搜索
    exports.letterApi_search = function(txt,callback){
    	var data = {txt:txt};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/LetterApi/search",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //私信历史记录
    exports.letterApi_getHistory = function(friendid,callback){
    	var data = {friendid:friendid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/LetterApi/getHistory",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //最近的联系人
    exports.letterApi_getRecently = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/LetterApi/getRecently",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /***************全局搜索接口***************************/
    exports.searchApi_searchAll = function(txt,filter,simple,callback){
    	var data = {txt:txt,filter:filter,simple:simple};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/SearchApi/searchAll",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*******************消息接口*******************************/
    //列出所有消息
    exports.messageApi_lists = function(offset,length,callback){
    	var data = {offset:offset,length:length};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/MessageApi/lists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取所有的系统消息
    exports.messageApi_getSysList = function(offset,length,callback){
    	var data = {offset:offset,length:length};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/MessageApi/getSysList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将所有的消息都标记为已读
    exports.messageApi_readAll = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/MessageApi/readAll",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}
   	 		}
   	 	});
    };
    //将某条消息变成已读
    exports.messageApi_readIt = function(id, callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/MessageApi/readIt",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}
   	 		}
   	 	});
    };
    //获取需要弹窗的消息
    exports.messageApi_getPopMsg = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/MessageApi/getPopMsg",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}
   	 		}
   	 	});
    };
    //获取机构的名称，校微和未读的消息数
    exports.messageApi_getAgencyList = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/MessageApi/getAgencyList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}
   	 		}
   	 	});
    };
    //获取自己在某个机构的所有消息
    exports.messageApi_getAgencyMsgList= function(coid,callback){
    	var data = {coid:coid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/MessageApi/getAgencyMsgList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}
   	 		}
   	 	});
    };
    //将某个机构的消息都变成已读
    exports.messageApi_readAgency= function(coid,callback){
    	var data = {coid:coid};
    	$.ajax({
    		type: "GET",
    		url: exports.APIURL+"/MessageApi/readAgency",
    		data: data,
    		dataType: "json",
    		success: function(data){
    			if(data.status == 1){
    				if(callback != null){
    					callback(data); 
    				}
    			}
    		}	
    	});
    };
    //将所有系统消息都变成已读
    exports.messageApi_readAllSysMsg= function(callback){
      var data = {};
      $.ajax({
        type: "GET",
        url: exports.APIURL+"/MessageApi/readAllSysMsg",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
              callback(data); 
            }
          }
        } 
      });
    };
    //获取某个校级通知的内容
    exports.messageApi_getAgencyMsg= function(id,coid,callback){
    	var data = {id:id,coid:coid};
    	$.ajax({
    		type: "GET",
    		url: exports.APIURL+"/MessageApi/getAgencyMsg",
    		data: data,
    		dataType: "json",
    		success: function(data){
    			if(data.status == 1){
    				if(callback != null){
    					callback(data); 
    				}
    			}
    		}
    	});
    };
    /****************查重接口**********************/
    //查重2.0版本
    exports.checkrepeatV2Api_checkInfo = function(homeworkid, studentid, fileid1, fileid2,callback){
    	var data = {homeworkid:homeworkid,studentid:studentid,fileid1:fileid1,fileid2:fileid2};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CheckrepeatV2Api/checkInfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	   	 			callback(data);	
   	 			}
   	 		}
   	 	});
    };
    exports.checkrepeatV2Api_getNextStudentCompareCheck = function(homeworkid, studentid, fileid1,callback){
    	var data = {homeworkid:homeworkid,studentid:studentid,fileid1:fileid1};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CheckrepeatV2Api/getNextStudentCompareCheck",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	   	 			callback(data);	
   	 			}
   	 		}
   	 	});
    };
    /***************批改接口*********************/
    //获取查重的剩余次数
    exports.reviewApi_getCheckRepeatCount = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/ReviewApi/getCheckRepeatCount",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //使用查重，将会扣除次数,这里记录那次作业了查重这个功能
    exports.reviewApi_useCheckRepeat = function(homeworkid,callback){
    	var data = {homeworkid:homeworkid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewApi/useCheckRepeat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //老师打回学生作业
    exports.reviewApi_rebackHomework = function(homeworkid,studentid,reason,callback){
    	var data = {homeworkid:homeworkid,studentid:studentid,reason:reason};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewApi/rebackHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //批量打回学生的作业
    exports.reviewApi_rebackHomeworkBat = function(homeworkid,students,reason,callback){
    	var data = {homeworkid:homeworkid,students:students,reason:reason};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewApi/rebackHomeworkBat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //批改页面的搜索
    exports.reviewApi_search = function(homeworkid,txt,callback){
    	var data = {homeworkid:homeworkid,txt:txt};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/ReviewApi/search",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //设置作业的成绩是否显示给学生
    exports.setScoreDisplay = function(homeworkid,display,callback){
    	var data = {homeworkid:homeworkid,display:display};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewApi/setScoreDisplay",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取所有学生的作业情况
    exports.reviewApi_lists = function(homeworkid, grade, sim, state, words, rcount, groupid, share,callback){
    	var data = {homeworkid:homeworkid,grade:grade,sim:sim,state:state,words:words,rcount:rcount,groupid:groupid,share:share};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewApi/lists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个学生的成绩，评语等内容
    exports.reviewApi_getStudentHomework = function(homeworkid, uid,callback){
    	var data = {homeworkid:homeworkid,uid:uid}; 
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewApi/getStudentHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取学生的作业附件信息
    exports.reviewApi_getHomework = function(homeworkid, uid,callback){
    	var data = {homeworkid:homeworkid,uid:uid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewApi/getHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //批改给学生成绩(批量接口)
    exports.reviewApi_giveScoreBat = function(homeworkid,students, score,callback){
    	var data = {homeworkid:homeworkid,students:students,score:score};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewApi/giveScoreBat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //按照区间给分
    exports.reviewApi_giveScoreBatByRand = function(homeworkid,students,num1,num2,callback){
    	var data = {homeworkid:homeworkid,students:students,num1:num1,num2:num2};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewApi/giveScoreBatByRand",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //给学生的某个作业留言
    exports.reviewApi_giveComment = function(homeworkid,studentid, comment,callback){
    	var data = {homeworkid:homeworkid,studentid:studentid,comment:comment};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewApi/giveComment",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取最热的评语
    exports.reviewApi_getHotCommentHistory = function(top,callback){
    	var data = {top:top};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewApi/getHotCommentHistory",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.reviewApi_getLastCommentHistory = function(top,callback){
    	var data = {top:top};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewApi/getLastCommentHistory",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //作业批量下载
    exports.package_downloadStudents = function(students, homeworkid, uid,callback){
    	var data = {students:students,homeworkid:homeworkid,uid:uid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: "http://package.ketangpai.com/Package/downloadStudents",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //催交作业所有未交的学生
    exports.reviewApi_expeditorHomeworkAll = function(homeworkid,callback){
    	var data = {homeworkid:homeworkid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewApi/expeditorHomeworkAll",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //催交作业,对某个学生的作业进行催交
    exports.reviewApi_expeditorHomework = function(homeworkid,studentid,callback){
    	var data = {homeworkid:homeworkid,studentid:studentid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewApi/expeditorHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将某个学生的作业，从未交修改为已交
    exports.reviewApi_changeHandupState = function(homeworkid,studentid,callback){
    	var data = {homeworkid:homeworkid,studentid:studentid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewApi/changeHandupState",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
   /********************用户接口********************/
    //修改用户信息
    exports.userApi_updateInfo = function(id,username,school,stno,callback){
    	var data = {id:id,username:username,school:school,stno:stno};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/updateInfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //修改手机号码
    exports.userApi_updateMobile = function(mobile,code,callback){
    	var data = {mobile:mobile,code:code};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/updateMobile",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //检验手机是否被绑定
    exports.userApi_checkMobile = function(mobile,callback){
    	var data = {mobile:mobile};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/checkMobile",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //修改邮箱
    exports.userApi_updateEmail = function(id,password,email,callback){
    	var data = {id:id,password:password,email:email};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/updateEmail",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
			}
   	 	});
    };
    //更改密码
    exports.userApi_updatePassword = function(id,newpassword,callback){
    	var data = {id:id,password:newpassword};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/updatePassword",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //变更加课通知
    exports.userApi_setAddClassEmailNotify = function(flage,callback){
    	var data = {flage:flage};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/setAddClassEmailNotify",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //作业过期通知
    exports.userApi_setHomeworkEmailNotify = function(flage,callback){
    	var data = {flage:flage};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/setHomeworkEmailNotify",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //私信通知提醒
    exports.userApi_switchLetterNotify = function(flage,callback){
    	var data = {flage:flage};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/switchLetterNotify",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //用户登陆
    exports.userApi_login = function(email,password,remember,callback){
    	var data = {email:email,password:password,remember:remember};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/login",
   	 		xhrFields:{
    			withCredentials:true
			},
			crossDomain: true,
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);	
   	 			}
   	 		}
   	 	});
    };
    //忘记密码
    exports.userApi_forgetPassword = function(email,callback){
    	var data = {email:email};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/forgetPassword",
   	 		data: data,
   	 		dataType: "json",
			success:  function(data){
				if(callback != null){
					callback(data);
				}
			}
   	 	});
    };
    //学生注册,这里的code是手机验证码，如果是邮件注册，则code值为空即可
    exports.userApi_registerStudent = function(email,password,school,stno,username,callback){
    	var data = {email:email,password:password,school:school,stno:stno,username:username};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/registerStudent",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	   	 			callback(data);
   	 			}
   	 		}
   	 	});
    };
    //老师注册，,这里的code是手机验证码，如果是邮件注册，则code值为空即可
    exports.userApi_registerTeacher = function(email,password,school,username,callback){
    	var data = {email:email,password:password,school:school,username:username};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/registerTeacher",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //重置密码
    exports.userApi_resetPassword = function(uid,password,expires,sign,callback){
    	var data = {uid:uid,password:password,expires:expires,sign:sign};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/resetPassword",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //发送邮箱激活
    exports.userApi_sendActiveEmail = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/sendActiveEmail",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //老师修改学生的名片
    exports.userApi_modifyNikeName = function(courseid,studentid,username,stno,callback){
    	var data = {courseid:courseid,studentid:studentid,username:username,stno:stno};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/modifyNikeName",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //解除微信绑定
    exports.userApi_unbindWechat = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/unbindWechat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //是否绑定了微信
    exports.userApi_isBindWechat = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/UserApi/isBindWechat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	   	 			callback(data);
   	 			}
   	 		}
   	 	});
    };
    //变更角色
    exports.userApi_changeRole = function(id,role,callback){
    	var data = {id:id,role:role};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/changeRole",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	   	 			callback(data);
   	 			}
   	 		}
   	 	});
    };
    //短信登录和忘记密码，发送验证码,调用此接口
    exports.userApi_sendCode = function(mobile,verify,callback){
    	var data = {mobile:mobile,verify:verify};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/sendCode",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	   	 			callback(data);
   	 			}
   	 		}
   	 	});
    };
    //注册账号，发送验证码,调用此接口
     exports.userApi_sendRegisterCode = function(verify,callback){
    	var data = {verify:verify};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/UserApi/sendRegisterCode",
   	 		xhrFields: {
           		withCredentials: true
       		},
       		crossDomain: true,
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	   	 			callback(data);
   	 			}
   	 		}
   	 	});
    };
    // exports.userApi_sendRegisterCode = function(mobile,verify,callback){
    // 	var data = {mobile:mobile,verify:verify};
   	//  	$.ajax({
   	//  		type: "POST",
   	//  		url: exports.APIURL+"/UserApi/sendRegisterCode",
   	//  		data: data,
   	//  		dataType: "json",
   	//  		success: function(data){
   	//  			if(callback != null){
   	//    	 			callback(data);
   	//  			}
   	//  		}
   	//  	});
    // };
    //短信登录接口
    exports.userApi_loginByMobile = function(mobile,code,remember,callback){
    	var data = {mobile:mobile,code:code,remember:remember};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/loginByMobile",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	   	 			callback(data);
   	 			}
   	 		}
   	 	});
    };
    //短信，忘记密码，完成验证时候需要调用的接口
    exports.userApi_forgetPasswordByMobile = function(mobile,code,callback){
    	var data = {mobile:mobile,code:code};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/forgetPasswordByMobile",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	   	 			callback(data);
   	 			}
   	 		}
   	 	});
    };
    //解绑时，发送验证码
    exports.userApi_unbindSendCode = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/unbindSendCode",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	   	 			callback(data);
   	 			}
   	 		}
   	 	});
    };
    //解绑手机号码
    exports.userApi_unbindPhone = function(code,callback){
    	var data = {code:code};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/unbindPhone",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	   	 			callback(data);
   	 			}
   	 		}
   	 	});
    };
   //解绑邮箱
    exports.userApi_unbindEmail = function(password,callback){
    	var data = {password:password};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/unbindEmail",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	   	 			callback(data);
   	 			}
   	 		}
   	 	});
    };
    exports.userApi_getWechatThirdPardLoginConf = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/UserApi/getWechatThirdPardLoginConf",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	   	 			callback(data);
   	 			}
   	 		}
   	 	});
    };
    /**********************班级公告接口****************************/
    //列出所有的通告
    exports.notifyApi_lists = function(courseid,callback){
    	var data = {courseId:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/NotifyApi/lists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除公告
    exports.notifyApi_delNotify = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/NotifyApi/delNotify",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更新公告
    exports.notifyApi_updateNotify = function(id,title,content,attachment,callback){
    	var data = {id:id,title:title,content:content,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/NotifyApi/updateNotify",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //学生阅读
    exports.notifyApi_readNotify = function(id,callback){
      var data = {id:id};
      $.ajax({
        type: "GET",
        url: exports.APIURL+"/NotifyApi/readNotify",
        data: data,
        dataType: "json",
        success: function(data){
        if(callback != null){
          callback(data);
        }
        }
      });
    };
    //添加公告
    exports.notifyApi_addNotify = function(courseid,teacherid,title,content,callback){
    	var data = {courseId:courseid,teacherId:teacherid,title:title,content:content};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/NotifyApi/addNotify",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);	
	 			}
   	 		}
   	 	});
    };
    //获取可以导入的课程列表
    exports.notifyApi_importList = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/NotifyApi/importList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个某个通告的具体信息
    exports.notifyApi_getNotify = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/NotifyApi/getNotify",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个课程的简单的公告信息
    exports.notifyApi_getNotifyList = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/NotifyApi/getNotifyList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //置顶设置
    exports.notifyApi_setTop = function(id,state,callback){
    	var data = {id:id,state:state};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/NotifyApi/setTop",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*********************话题讨论*********************/
    //列出所有的话题
    exports.TopicDiscussApi_lists = function(courseid,page,filter,callback){
    	var data = {courseid:courseid,page:page,filter:filter};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TopicDiscussApi/lists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除话题
    exports.TopicDiscussApi_delTopic = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TopicDiscussApi/delTopic",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更新话题
    exports.TopicDiscussApi_updateTopic = function(id,title,content,attachment,callback){
    	var data = {id:id,title:title,content:content,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TopicDiscussApi/updateTopic",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
	   	 			callback(data);	
	   	 		}
   	 		}
   	 	});
    };
    //添加话题
    exports.TopicDiscussApi_addTopic = function(courseid,title,content,attachment,callback){
    	var data = {courseid:courseid,title:title,content:content,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TopicDiscussApi/addTopic",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
	   	 			callback(data);	
	 			}
   	 		}
   	 	});
    };
    //添加话题
    exports.TopicDiscussApi_addTopicByAnonymous = function(courseid,title,content,attachment,anonymous,callback){
    	var data = {courseid:courseid,title:title,content:content,attachment:attachment,anonymous:anonymous};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TopicDiscussApi/addTopic",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
	   	 			callback(data);	
	 			}
   	 		}
   	 	});
    };
    //获取某个某个话题的具体信息
    exports.TopicDiscussApi_getTopic = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TopicDiscussApi/getTopic",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取话题讨论的信息
    exports.TopicDiscussApi_getTopicAndDiscuss = function(topicid,callback){
    	var data = {topicid:topicid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/TopicDiscussApi/getTopicAndDiscuss",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };

    //获取话题讨论的信息
    exports.TopicDiscussApi_getTopicDiscussLists = function(topicid,callback){
    	var data = {topicid:topicid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/TopicDiscussApi/getTopicDiscussLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    
    exports.TopicDiscussApi_getTopicSimpleDiscussList = function(topicid,callback){
    	var data = {topicid:topicid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/TopicDiscussApi/getTopicSimpleDiscussList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };

    exports.TopicDiscussApi_getTopicDiscussNewLists = function(topicid,lasttime,callback){
    	var data = {topicid:topicid,lasttime:lasttime};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/TopicDiscussApi/getTopicDiscussLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };


    //关注某个话题 
    exports.TopicDiscussApi_TopicFollow = function(topicid,callback){
      var data = {topicid:topicid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/TopicDiscussApi/TopicFollow",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data); 
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };

      exports.TopicDiscussApi_TopicCancelFollow = function(topicid,callback){
      var data = {topicid:topicid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/TopicDiscussApi/TopicCancelFollow",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data); 
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //添加讨论
    exports.TopicDiscussApi_addDiscuss = function(topicid,content,attachment,replyid,callback){
    	var data = {topicid:topicid,content:content,attachment:attachment,replyid:replyid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TopicDiscussApi/addDiscuss",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.TopicDiscussApi_addDiscussByAnonymous = function(topicid,content,attachment,replyid,anonymous,callback){
    	var data = {topicid:topicid,content:content,attachment:attachment,replyid:replyid,anonymous:anonymous};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TopicDiscussApi/addDiscuss",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除某个讨论
    exports.TopicDiscussApi_delDiscuss = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TopicDiscussApi/delDiscuss",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //精华设置
    exports.TopicDiscussApi_setSessence = function(id,state,callback){
    	var data = {id:id,state:state};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TopicDiscussApi/setSessence",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //置顶设置
    exports.TopicDiscussApi_setTop = function(id,state,callback){
    	var data = {id:id,state:state};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TopicDiscussApi/setTop",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };

    //获取导入列表
    exports.TopicDiscussApi_importList = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/TopicDiscussApi/importList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取这个课程，自己发布过的话题
    exports.TopicDiscussApi_getMyPublishLists = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/TopicDiscussApi/getMyPublishLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个话题讨论的词云
    exports.TopicDiscussApi_getWordsCloud = function(topicid,callback){
    	var data = {topicid:topicid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/TopicDiscussApi/getWordsCloud",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);	
	 			}
   	 		}
   	 	});
    };
    //获取话题的统计情况
    exports.TopicDiscussApi_getStatInfo = function(courseid,callback){
    	var data={courseid:courseid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/TopicDiscussApi/getStatInfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);	
	 			}
   	 		}
   	 	});
    };
    //获取某个话题的统计情况
    exports.TopicDiscussApi_getTopicStatInfo = function(topicid,callback){
    	var data={topicid:topicid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/TopicDiscussApi/getTopicStatInfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);	
	 			}
   	 		}
   	 	});
    };
    //生成班级的话题的平时成绩
    exports.TopicDiscussApi_generateCourseRegularGrade = function(courseid,fullscore,fullscorenum,sortscore,essencescore,callback){
    	var data={courseid:courseid,fullscore:fullscore,fullscorenum:fullscorenum,sortscore:sortscore,essencescore:essencescore};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TopicDiscussApi/generateCourseRegularGrade",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);	
	 			}
   	 		}
   	 	});
    };
    //生成单次话题的平时成绩
    exports.TopicDiscussApi_generateTopicRegularGrade = function(topicid,fullscore,fullscorenum,callback){
    	var data={topicid:topicid,fullscore:fullscore,fullscorenum:fullscorenum};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TopicDiscussApi/generateTopicRegularGrade",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);	
	 			}
   	 		}
   	 	});
    };
    //文章的总点数
    exports.TopicDiscussApi_getUpVoteCount = function(discussid){
      var data={discussid:discussid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/TopicDiscussApi/getUpVoteCount",
        data: data,
        dataType: "json",
        success: function(data){
        if(callback != null){
          callback(data); 
        }
        }
      });
    };

    //给话题点赞
    exports.TopicDiscussApi_addTopicUpVote = function(topicid,callback){
      var data={topicid:topicid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/TopicDiscussApi/addTopicUpVote",
        data: data,
        dataType: "json",
        success: function(data){
        if(callback != null){
          callback(data); 
        }
        }
      });
    };

    //取消话题点赞
    exports.TopicDiscussApi_cancleTopicUpVote = function(topicid,callback){
      var data={topicid:topicid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/TopicDiscussApi/cancleTopicUpVote",
        data: data,
        dataType: "json",
        success: function(data){
        if(callback != null){
          callback(data); 
        }
        }
      });
    };
    //点赞
    exports.TopicDiscussApi_addUpVote = function(discussid,topicid,callback){
    	var data={discussid:discussid,topicid:topicid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TopicDiscussApi/addUpVote",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);	
	 			}
   	 		}
   	 	});
    };
    //取消点赞
    exports.TopicDiscussApi_cancleUpVote = function(discussid,callback){
    	var data={discussid:discussid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TopicDiscussApi/cancleUpVote",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);	
	 			}
   	 		}
   	 	});
    };
    //获取弹幕的设置情况
    exports.TopicDiscussApi_getBarrageMqttConfig = function(callback){
    	var data={};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TopicDiscussApi/getBarrageMqttConfig",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);	
	 			}
   	 		}
   	 	});
    };
    /*********************作业讨论**********************/
    //列出某次作业的所有讨论
    exports.discussApi_getDiscussList = function(homeworkid,offset,length,callback){
    	var data = {homeworkid:homeworkid,offset:offset,length:length};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/DiscussApi/getDiscussList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加讨论
    exports.discussApi_addDiscuss = function(homeworkid,content,attachment,replyid,callback){
    	var data = {homeworkid:homeworkid,content:content,attachment:attachment,replyid:replyid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/DiscussApi/addDiscuss",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.discussApi_addDiscussByAnonymous = function(homeworkid,content,attachment,replyid,anonymous,callback){
    	var data = {homeworkid:homeworkid,content:content,attachment:attachment,replyid:replyid,anonymous:anonymous};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/DiscussApi/addDiscuss",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除某个讨论
    exports.discussApi_delDiscuss = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/DiscussApi/delDiscuss",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取作业讨论的信息
    exports.discussApi_getHomeworkAndDiscuss = function(homeworkid,callback){
    	var data = {homeworkid:homeworkid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/DiscussApi/getHomeworkAndDiscuss",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取作业讨论的词云
    exports.discussApi_getWordsCloud = function(homeworkid,callback){
    	var data = {homeworkid:homeworkid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/DiscussApi/getWordsCloud",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
	   	 			callback(data);	
	   	 		}
   	 		}
   	 	});
    };
    /********************公告评论********************/
    //列出某次公告的所有讨论
    exports.NotifyDiscussApi_getDiscussList = function(notifyid,offset,length,callback){
    	var data = {notifyid:notifyid,offset:offset,length:length};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/NotifyDiscussApi/getDiscussList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加讨论
    exports.NotifyDiscussApi_addDiscuss = function(notifyid,content,attachment,replyid,callback){
    	var data = {notifyid:notifyid,content:content,attachment:attachment,replyid:replyid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/NotifyDiscussApi/addDiscuss",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除某个讨论
    exports.NotifyDiscussApi_delDiscuss = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/NotifyDiscussApi/delDiscuss",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取公告的讨论
    exports.NotifyDiscussApi_getNotifyAndDiscuss = function(notifyid,callback){
    	var data = {notifyid:notifyid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/NotifyDiscussApi/getNotifyAndDiscuss",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取公告的词云
    exports.NotifyDiscussApi_getWordsCloud = function(notifyid,callback){
    	var data = {notifyid:notifyid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/NotifyDiscussApi/getWordsCloud",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);	
	 			}
   	 		}
   	 	});
    };
    /********************课件评论********************/
    //列出某次作业的所有讨论
    exports.CoursewareDiscussApi_getDiscussList = function(coursewareid,offset,length,callback){
    	var data = {coursewareid:coursewareid,offset:offset,length:length};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CoursewareDiscussApi/getDiscussList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加讨论
    exports.CoursewareDiscussApi_addDiscuss = function(coursewareid,content,attachment,replyid,callback){
    	var data = {coursewareid:coursewareid,content:content,attachment:attachment,replyid:replyid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CoursewareDiscussApi/addDiscuss",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.CoursewareDiscussApi_addDiscussByAnonymous = function(coursewareid,content,attachment,replyid,anonymous,callback){
      	var data = {coursewareid:coursewareid,content:content,attachment:attachment,replyid:replyid,anonymous:anonymous};
     	 	$.ajax({
     	 		type: "POST",
     	 		url: exports.APIURL+"/CoursewareDiscussApi/addDiscuss",
     	 		data: data,
     	 		dataType: "json",
     	 		success: function(data){
     	 			if(data.status == 1){
     	 				if(callback != null){
     	   	 				callback(data);	
     	 				}
     	 			}else{
     	 				plugin.openMsg(data.info,1);
     	 			}
     	 		}
     	 	});
     };
    //删除某个讨论
    exports.CoursewareDiscussApi_delDiscuss = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CoursewareDiscussApi/delDiscuss",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //读了某次课件的评论
    exports.CoursewareDiscussApi_readIt = function(coursewareid,callback){
    	var data = {coursewareid:coursewareid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CoursewareDiscussApi/readIt",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*****************资料课件接口****************/
    //列出某个课程的1级目录的所有文件
    exports.coursewareApi_listAll = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CoursewareApi/listAll",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //列出某个目录下的所有文件
    exports.coursewareApi_folder = function(folderid,callback){
    	var data = {folderid:folderid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CoursewareApi/folder",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增目录
    exports.coursewareApi_addFoloder = function(courseid,foldername,callback){
    	var data = {courseid:courseid,foldername:foldername};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CoursewareApi/addFoloder",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //移动文件到某个目录
    exports.coursewareApi_moveFile = function(id,folderid,callback){
    	var data = {id:id,folderid:folderid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CoursewareApi/moveFile",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //移出到顶级目录
    exports.coursewareApi_moveFileOut = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CoursewareApi/moveFileOut",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除某个文件
    exports.coursewareApi_delCourseware = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CoursewareApi/delCourseware",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //列出1级目录下的所有目录
    exports.coursewareApi_listFolders = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CoursewareApi/listFolders",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //打包下载
    exports.coursewareApi_packdownload = function(url,callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+url,
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	   	 			callback(data);
   	 			}
   	 		}
   	 	});
    };
    //课件导入
    exports.coursewareApi_getImportList= function(isfolder,callback){
    	var data = {isfolder:isfolder};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CoursewareApi/getImportList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //某个课程的课件可以导入的课件列表
    exports.coursewareApi_getCousewareList= function(courseid,isfolder,callback){
    	var data = {courseid:courseid,isfolder:isfolder};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CoursewareApi/getCousewareList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.coursewareApi_getCousewarePPTAndPdfLists= function(courseid,isfolder,callback){
    	var data = {courseid:courseid,isfolder:isfolder,type:'pptpdf'};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CoursewareApi/getCousewareList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.coursewareApi_getCousewareListFilterType= function(courseid,isfolder,type,callback){
    	var data = {courseid:courseid,isfolder:isfolder,type:type};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CoursewareApi/getCousewareList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //导入课件
    exports.coursewareApi_importFiles= function(courseid,folderid,filelist,callback){
    	var data = {courseid:courseid,folderid:folderid,filelist:filelist};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CoursewareApi/importFiles",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //重命名文件夹
    exports.coursewareApi_renameFolder= function(folderid,foldername,callback){
    	var data = {folderid:folderid,foldername:foldername};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CoursewareApi/renameFolder",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //课件排序
    //多个文件id值以|符号进行分割
    exports.coursewareApi_sortBat= function(fileidlist,callback){
    	var data = {fileidlist:fileidlist};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CoursewareApi/sortBat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //修改某个可见的名称
    exports.coursewareApi_renameFileName= function(id,filename,callback){
    	var data = {id:id,filename:filename};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CoursewareApi/renameFileName",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //从课件里的mooc资源
    exports.coursewareApi_getMoocLists= function(courseid,order,callback){
    	var data = {courseid:courseid,order:order};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CoursewareApi/getMoocLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.coursewareApi_addMoocResource= function(courseid,moocid,chapterid,subchapterid,lessonid,callback){
    	var data = {courseid:courseid,moocid:moocid,chapterid:chapterid,
    				subchapterid:subchapterid,lessonid:lessonid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CoursewareApi/addMoocResource",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.coursewareApi_delCouresewareMooc= function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CoursewareApi/delCouresewareMooc",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.coursewareApi_getCoursewareUseStat= function(coursewareid,callback){
    	var data = {coursewareid:coursewareid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CoursewareApi/getCoursewareUseStat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.coursewareApi_getCoursewareInfo= function(coursewareid,callback){
    	var data = {coursewareid:coursewareid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CoursewareApi/getCoursewareInfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.coursewareApi_setDownloadAuth= function(coursewareid,state,callback){
    	var data = {coursewareid:coursewareid,state:state};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CoursewareApi/setDownloadAuth",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.coursewareApi_putAgencyWenkuToCourse= function(docid,courseid,folderid,callback){
    	var data = {docid:docid,courseid:courseid,folderid:folderid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CoursewareApi/putAgencyWenkuToCourse",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };

    /***************作业接口******************/
    exports.homeworkApi_listsHomework = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/HomeworkApi/listsHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加作业
    //type 0表示个人作业，1表示小组作业
    exports.homeworkApi_addHomework = function(courseid,title,description,attachment,endtime,type,fullscore,callback){
   	 	var data = {courseid:courseid,title:title,description:description,attachment:attachment,endtime:endtime,type:type,fullscore:fullscore};
    	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/HomeworkApi/addHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
    			if(callback){
    				callback(data);	
    			}
   	 		}
   	 	});
    };
    //更新作业
    exports.homeworkApi_updateHomework = function(homeworkid,title,description,attachment,endtime,fullscore,callback){
    	var data = {homeworkid:homeworkid,title:title,description:description,attachment:attachment,endtime:endtime,fullscore:fullscore};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/HomeworkApi/updateHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加 纸质作业
    exports.homeworkApi_addPaperHomework = function(courseid,title,fullscore,display,gradelists,callback){
   	 	var data = {courseid:courseid,title:title,fullscore:fullscore,display:display,gradelists:gradelists};
    	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/HomeworkApi/addPaperHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
    			if(callback){
    				callback(data);	
    			}
   	 		}
   	 	});
    };
    //更新纸质张作业的信息
    exports.homeworkApi_updatePaperHomework = function(homeworkid,title,fullscore,display,gradelists,callback){
    	var data = {homeworkid:homeworkid,title:title,fullscore:fullscore,display:display,gradelists:gradelists};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/HomeworkApi/updatePaperHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除作业
    exports.homeworkApi_delHomework = function(homeworkid,callback){
    	var data = {homeworkid:homeworkid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/HomeworkApi/delHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    
    //提交作业
    exports.homeworkApi_submitHomework = function(homeworkid,attachment,comment,callback){
    	var data = {homeworkid:homeworkid,attachment:attachment,comment:comment};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/HomeworkApi/submitHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 				callback(-1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个作业的基本信息
    exports.homeworkApi_getHomework = function(homeworkid,callback){
    	var data = {homeworkid:homeworkid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/HomeworkApi/getHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取作业导入的信息
    exports.homeworkApi_importList = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/HomeworkApi/importList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个课程的所有的作业的基本信息
    exports.homeworkApi_getHomeworkList = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/HomeworkApi/getHomeworkList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取自己提交的作业的情况
    exports.homeworkApi_getHandupHomework = function(homeworkid,callback){
    	var data = {homeworkid:homeworkid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/HomeworkApi/getHandupHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /***************私信接口******************/
    exports.letterApi_dialogTpl = function(friendid,courseid,callback){
    	var data = {friendid:friendid,courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/LetterApi/dialogTpl",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //私信群发弹窗
    exports.letterApi_dialogAllTpl = function(friends,courseid,callback){
    	var data = {friends:friends,courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/LetterApi/dialogAllTpl",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取与某个人的对话列表
    exports.letterApi_getMsgList = function(friendid,callback){
    	var data = {friendid:friendid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/LetterApi/getMsgList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //发送私信
    exports.letterApi_sendLetter = function(friendid,content,attachment,courseid,callback){
    	var data = {friendid:friendid,content:content,attachment:attachment,courseid:courseid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/LetterApi/sendLetter",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		},
        error:function(data){
          if(data.readyState==0){
            plugin.openMsg('请检查网络',1);
          }
          if(callback != null){
              callback(-1);
          }
        }
   	 	});
    };
    //发送私信，群发事件
    exports.letterApi_sendLetterBat = function(friendidlist,content,attachment,courseid,callback){
    	var data = {friendidlist:friendidlist,content:content,attachment:attachment,courseid:courseid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/LetterApi/sendLetterBat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将在某个班级中与某个人的聊天都比较成已读
    exports.letterApi_readIt = function(friendid,courseid,callback){
    	var data = {friendid:friendid,courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/LetterApi/readIt",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将与某个人的聊天都变成已读
    exports.letterApi_readUser = function(friendid,callback){
      var data = {friendid:friendid};
      $.ajax({
        type: "GET",
        url: exports.APIURL+"/LetterApi/readUser",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    /*****************即时通讯接口**********************/
    //获取通信配置
    exports.IMApi_getConfig = function(type,callback){
      var data = {type:type};
      $.ajax({
        type: "GET",
        url: exports.APIURL+"/IMApi/getConfig",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //获取弹幕的实时消息配置
    exports.IMApi_getMqttConfig = function(groupId,callback){
    	var httptype = plugin.isHttps();
        var data = {groupId:groupId,httptype:httptype};
        $.ajax({
          type: "GET",
          url: exports.APIURL+"/IMApi/getMqttConfig",
          data: data,
          dataType: "json",
          success: function(data){
            if(data.status == 1){
              if(callback != null){
                  callback(data);
              }
            }else{
              plugin.openMsg(data.info,1);
            }
          }
        });
     };
    /**********获取某个文件的内容*****************/
    exports.readerApi_getFile = function(fileid,callback){
    	var data = {fileid:fileid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReaderApi/getFile",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*****************作业分享接口*********************/
    exports.homeworkshareApi_lists = function(homeworkid,callback){
    	var data = {homeworkid:homeworkid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/HomeworkshareApi/lists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增作业分享
    exports.homeworkshareApi_addHomeworkshare = function(homeworkid,studentid,content,isreview,isanony,callback){
    	var data = {homeworkid:homeworkid,studentid:studentid,content:content,isreview:isreview,isanony:isanony};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/HomeworkshareApi/addHomeworkshare",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //取消作业分享
    exports.homeworkshareApi_delHomeworkshare = function(homeworkid,studentid,callback){
    	var data = {homeworkid:homeworkid,studentid:studentid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/HomeworkshareApi/delHomeworkshare",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*****************帮助中心的api***************************/
    exports.helpApi_sendFeedback = function(type,email,content,callback){
    	var data = {type:type,email:email,content:content};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/HelpApi/sendFeedback",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.helpApi_sendCampus = function(username,school,mobile,qq,callback){
    	var data = {username:username,school:school,school:content,qq:qq};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/HelpApi/sendCampus",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*************申请A+计划******************/
    exports.userApi_applyAplus = function(username,school,email,mobile,code,callback){
    	var data = {username:username,school:school,email:email,mobile:mobile,code:code};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UserApi/applyAplus",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
   /***************工具类API********************/
    exports.utilApi_sendPhoneCode = function(phonenum,verify,callback){
    	var data = {phonenum:phonenum,verify:verify};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/UtilApi/sendPhoneCode",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
				}
   	 		}
   	 	});
    };
    /************合作API********************/
    //绑定信息
    exports.hezuoApi_bind = function(token,email,password,callback){
    	var data = {token:token,email:email,password:password};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/HezuoApi/bind",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //合作的 注册信息
    exports.hezuoApi_register = function(token,email,password,callback){
    	var data = {token:token,email:email,password:password};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/HezuoApi/register",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    /******************tour api*********************/
    exports.tourApi_reviewTour = function(homeworkid,callback){
    	var data = {homeworkid:homeworkid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TourApi/reviewTour",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //
    exports.tourApi_finishReviewTour = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TourApi/finishReviewTour",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    /****************测试api*********************/
    exports.testpaperApi_getTestpaperList = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TestpaperApi/getTestpaperList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //删除试卷
    exports.testpaperApi_delTestpaper = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/TestpaperApi/delTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更新试卷
    exports.testpaperApi_updateTestpaper = function(testpaperid,title,description,callback){
    	var data = {testpaperid:testpaperid,title:title,description:description};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/TestpaperApi/updateTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加试卷
    exports.testpaperApi_addTestpaper = function(courseid,title,description,callback){
    	var data = {courseid:courseid,title:title,description:description};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/TestpaperApi/addTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取导入的所有试卷列表
    exports.testpaperApi_importlist = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/TestpaperApi/importlist",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //选中某个试卷进行导入
    exports.testpaperApi_getList = function(courseid, callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/TestpaperApi/getList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个试卷
    exports.testpaperApi_getTestpaper = function(testpaperid, callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/TestpaperApi/getTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //复制试卷
    exports.testpaperApi_copyTestpaper = function(courseid,testpaperid,title,description,callback){
    	var data = {courseid:courseid,testpaperid:testpaperid,title:title,description:description};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/copyTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //重新自动批改某个试卷的客观题
    exports.testpaperApi_reviewTestpaperAgain = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/reviewTestpaperAgain",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
	   	 			callback(data);
	 			}
   	 		}
   	 	});
    };
    //获取某张试卷的试题
    exports.testpaperApi_getSubjectList = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TestpaperApi/getSubjectList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某张试卷的试题,可以支持互动的试题
    exports.testpaperApi_getInteractSubjectList = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TestpaperApi/getInteractSubjectList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某张试卷的试题总数
    exports.testpaperApi_getSubjectTotalCount = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TestpaperApi/getSubjectTotalCount",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某张试卷的试题的标题
    exports.testpaperApi_getSubjectTitleLists = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TestpaperApi/getSubjectTitleLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //复制某个试题到某个班级里的某个试卷去
    exports.testpaperApi_copyCourseSubjectsToCourse = function(idlists,testpaperid,callback){
    	var data = {testpaperid:testpaperid,idlists:idlists};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/copyCourseSubjectsToCourse",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
	   	 			callback(data);
	 			}
   	 		}
   	 	});
    };
    //复制班级里的某个试题到某个备课区的某个试卷去
    exports.testpaperApi_copyCourseSubjectsToResource = function(idlists,testpaperid,callback){
    	var data = {testpaperid:testpaperid,idlists:idlists};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/copyCourseSubjectsToResource",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
	   	 			callback(data);
	 			}
   	 		}
   	 	});
    };
    //复制班级里的某个试题到某个班级里的互动的某个互动课件的某一页
    exports.testpaperApi_copyCourseSubjectsToCourseInteractPPT = function(interactid,pageindex,idlists,callback){
    	var data = {interactid:interactid,pageindex:pageindex,idlists:idlists};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/copyCourseSubjectsToCourseInteractPPT",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
	   	 			callback(data);
	 			}
   	 		}
   	 	});
    };
    //复制班级里的某个试题到某个班级里的互动的某个环节里去
    exports.testpaperApi_copyCourseSubjectsToCourseInteractStep = function(stepid,idlists,callback){
    	var data = {stepid:stepid,idlists:idlists};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/copyCourseSubjectsToCourseInteractStep",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
	   	 			callback(data);
	 			}
   	 		}
   	 	});
    };
    //学生对某张试卷进行答题
    exports.testpaperApi_doSubjectList = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TestpaperApi/doSubjectList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //获取某个学生的某张试卷的状态
    exports.testpaperApi_getHandupState = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TestpaperApi/getHandupState",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //保存答案
    exports.testpaperApi_saveAnswer = function(testpaperid, subjectid, answer,callback){
    	var data = {testpaperid:testpaperid,subjectid:subjectid,answer:answer};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/saveAnswer",
   	 		async: false,
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		},
	        error:function(data){
	          callback(-1);
	        }
   	 	});
    };
    //保存文件的答案
    exports.testpaperApi_saveFileAnswer = function(testpaperid, subjectid, attachment,callback){
    	var data = {testpaperid:testpaperid,subjectid:subjectid,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/saveFileAnswer",
   	 		async: false,
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		},
	        error:function(data){
	          callback(-1);
	        }
   	 	});
    };
    //获取单个试题
    exports.testpaperApi_getSubject = function(subjectid, callback){
    	var data = {subjectid:subjectid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TestpaperApi/getSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除题目
    exports.testpaperApi_delSubject = function(subjectid, callback){
    	var data = {subjectid:subjectid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/delSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //批量删除试题
    exports.testpaperApi_delSubjectBat = function(subjectids, callback){
    	var data = {subjectids:subjectids};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/delSubjectBat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加判断题和选择题
    exports.testpaperApi_addTFSubject = function(testpaperid,type,title,score,answer,options,sort,explanation,callback){
    	var data = {testpaperid:testpaperid,type:type,title:title,score:score,answer:answer,options:options,sort:sort,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,  
   	 		url: exports.APIURL+"/TestpaperApi/addTFSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑判断题和选择题
    exports.testpaperApi_editTFSubject = function(subjectid, title, score, optionsIDs, options,answer,sort,explanation,callback){
    	var data = {subjectid:subjectid,title:title,score:score,optionsIDs:optionsIDs,options:options,answer:answer,sort:sort,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/editTFSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增多选题
    exports.testpaperApi_addMulSelectSubject = function(testpaperid,title,score,answer,options,sort,explanation,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,answer:answer,options:options,sort:sort,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/addMulSelectSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑多选题
    exports.testpaperApi_editMulSelectSubject = function(subjectid, title, score, optionsIDs, options,answer,sort,explanation,callback){
    	var data = {subjectid:subjectid,title:title,score:score,answer:answer,options:options,optionsIDs:optionsIDs,sort:sort,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/editMulSelectSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增不定项选择题
    exports.testpaperApi_addUnfinedTermSubject = function(testpaperid,title,score,answer,options,sort,explanation,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,answer:answer,options:options,sort:sort,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/addUnfinedTermSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑不定项选择题
    exports.testpaperApi_editUnfinedTermSubject = function(subjectid, title, score, optionsIDs, options,answer,sort,explanation,callback){
    	var data = {subjectid:subjectid,title:title,score:score,answer:answer,options:options,optionsIDs:optionsIDs,sort:sort,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/editUnfinedTermSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加主观题
    exports.testpaperApi_addSubjective = function(testpaperid,title,score,sort,answer,explanation,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,sort:sort,answer:answer,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/addSubjective",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑主观题
    exports.testpaperApi_editSubjective = function(subjectid,title,score,sort,answer,explanation,callback){
    	var data = {subjectid:subjectid,title:title,score:score,sort:sort,answer:answer,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/editSubjective",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加填空题
    exports.testpaperApi_addFill = function(testpaperid,title,score,sort,answer,explanation,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,sort:sort,answer:answer,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/addFill",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑填空题
    exports.testpaperApi_editFill = function(subjectid,title,score,sort,answer,explanation,callback){
    	var data = {subjectid:subjectid,title:title,score:score,sort:sort,answer:answer,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/editFill",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加文件题
    exports.testpaperApi_addFileSubject = function(testpaperid,title,score,sort,answer,explanation,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,sort:sort,answer:answer,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/addFileSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑文件题
    exports.testpaperApi_editFileSubject = function(subjectid,title,score,sort,answer,explanation,callback){
    	var data = {subjectid:subjectid,title:title,score:score,sort:sort,answer:answer,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/editFileSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加段落说明
    exports.testpaperApi_addCut = function(testpaperid,title,sort,callback){
    	var data = {testpaperid:testpaperid,title:title,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/addCut",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑段落说明
    exports.testpaperApi_editCut = function(subjectid,title,sort,callback){
    	var data = {subjectid:subjectid,title:title,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/editCut",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //排序更新
    exports.testpaperApi_updateSortBat = function(subjectids,callback){
    	var data = {subjectids:subjectids};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/updateSortBat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //结束测试
    exports.testpaperApi_endTestpaper = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/endTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //重新发布
    exports.testpaperApi_republishTestpaper = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/republishTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.testpaperApi_republishTestpaperType = function(testpaperid,receivertype,callback){
    	var data = {testpaperid:testpaperid,receivertype:receivertype};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/republishTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //改变答案
    exports.testpaperApi_displayAnswer = function(testpaperid,display,callback){
    	var data = {testpaperid:testpaperid,display:display};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/displayAnswer",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //是否将题目进行随机
    exports.testpaperApi_setTestpaperRand = function(testpaperid,isrand,callback){
    	var data = {testpaperid:testpaperid,isrand:isrand};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/setTestpaperRand",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //是否将题目选项进行随机
    exports.testpaperApi_setOptionRand = function(testpaperid,isrand,callback){
    	var data = {testpaperid:testpaperid,isrand:isrand};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/setOptionRand",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //设置试卷的多选题的判分方式
    exports.testpaperApi_setMulScoreType = function(testpaperid,type,callback){
    	var data = {testpaperid:testpaperid,type:type};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/setMulScoreType",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //设置试卷的填空题的判分方式
    exports.testpaperApi_setFillScoreType = function(testpaperid,type,callback){
    	var data = {testpaperid:testpaperid,type:type};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/setFillScoreType",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //填空题是否大小写敏感
    exports.testpaperApi_setCaseSensitive = function(testpaperid,type,callback){
    	var data = {testpaperid:testpaperid,type:type};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/setCaseSensitive",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //设置学生交卷之后，是否可以查看试卷
    exports.testpaperApi_setHandupViewTestpaper = function(testpaperid,type,callback){
    	var data = {testpaperid:testpaperid,type:type};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/setHandupViewTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.testpaperApi_setAllowCopy = function(testpaperid,type,callback){
    	var data = {testpaperid:testpaperid,type:type};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/setAllowCopy",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.testpaperApi_setAllowPaster = function(testpaperid,type,callback){
    	var data = {testpaperid:testpaperid,type:type};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/setAllowPaster",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //生成试卷分享链接
    exports.testpaperApi_generateShare = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/generateShare",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.testpaperApi_cancleShare = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/cancleShare",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //学生提交试卷
    exports.testpaperApi_handup = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/handup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		},
        error:function(data){
          callback(-1);
        }
   	 	});
    };
    //测试是否结束
    exports.testpaperApi_isOver = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/isOver",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //获取某个题目，某个选项的 学生的作答情况
    exports.testpaperApi_getSubjectOptionAnalyze = function(subjectid,optionid,callback){
    	var data = {subjectid:subjectid,optionid:optionid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TestpaperApi/getSubjectOptionAnalyze",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //获取某个题目学生的作答情况
    exports.testpaperApi_getSubjectAnalyze = function(subjectid,callback){
    	var data = {subjectid:subjectid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TestpaperApi/getSubjectAnalyze",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //根据题目的序号，获取题目
    exports.testpaperApi_getSubjectAnalyzeByIndex = function(testpaperid,index,callback){
    	var data = {testpaperid:testpaperid,index:index};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TestpaperApi/getSubjectAnalyzeByIndex",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
	//获取某张试卷的第一题
	exports.testpaperApi_getFisrtSubjectAnalyze = function(testpaperid,callback){
		var data = {testpaperid:testpaperid};
	 	$.ajax({
	 		type: "GET",
	 		url: exports.APIURL+"/TestpaperApi/getFisrtSubjectAnalyze",
	 		data: data,
	 		dataType: "json",
	 		success: function(data){
	 			if(callback != null){
	 				callback(data);
	 			}
	 		}
	 	});
	};
	//随机提问
	exports.testpaperApi_randAsk = function(subjectid,callback){
		var data = {subjectid:subjectid};
	 	$.ajax({
	 		type: "POST",
	 		url: exports.APIURL+"/TestpaperApi/randAsk",
	 		data: data,
	 		dataType: "json",
	 		success: function(data){
	 			if(callback != null){
	 				callback(data);
	 			}
	 		}
	 	});
	};
	//打回某个学生的测试
	exports.testpaperApi_rebackTestpaper = function(testpaperid,studentid,callback){
		var data = {testpaperid:testpaperid,studentid:studentid};
	 	$.ajax({
	 		type: "POST",
	 		url: exports.APIURL+"/TestpaperApi/rebackTestpaper",
	 		data: data,
	 		dataType: "json",
	 		success: function(data){
	 			if(callback != null){
	 				callback(data);
	 			}
	 		}
	 	});
	};
	//获取试卷的题目和分数的统计
	exports.testpaperApi_getTestpaperInfoStat = function(testpaperid,callback){
		var data = {testpaperid:testpaperid};
	 	$.ajax({
	 		type: "GET",
	 		url: exports.APIURL+"/TestpaperApi/getTestpaperInfoStat",
	 		data: data,
	 		dataType: "json",
	 		success: function(data){
	 			if(callback != null){
	 				callback(data);
	 			}
	 		}
	 	});
	};
    /****************试卷批改api*****************/
    exports.reviewTestpaperApi_lists = function(testpaperid,grade,callback){
    	var data = {testpaperid:testpaperid,grade:grade};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewTestpaperApi/lists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //是否将成绩显示给学生
    exports.reviewTestpaperApi_setScoreDisplay = function(testpaperid,display,callback){
    	var data = {testpaperid:testpaperid,display:display};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewTestpaperApi/setScoreDisplay",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //搜索
    exports.reviewTestpaperApi_search = function(testpaperid,txt,callback){
    	var data = {testpaperid:testpaperid,txt:txt};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewTestpaperApi/search",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个学生的某张试卷情况
    exports.reviewTestpaperApi_getStudentTestpaper = function(testpaperid,studentid,callback){
    	var data = {testpaperid:testpaperid,studentid:studentid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewTestpaperApi/getStudentTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //给分
    exports.reviewTestpaperApi_giveSubjectScore = function(subjectid,studentid,score,callback){
    	var data = {subjectid:subjectid,studentid:studentid,score:score};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewTestpaperApi/giveSubjectScore",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //给试卷分数
    exports.reviewTestpaperApi_giveTestpaperScore = function(testpaperid,studentid,testscore,lastscore,callback){
    	var data = {testpaperid:testpaperid,studentid:studentid,testscore:testscore,lastscore:lastscore};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewTestpaperApi/giveTestpaperScore",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //收取未交的试卷
    exports.reviewTestpaperApi_collectTestpaper = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewTestpaperApi/collectTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	   	 			callback(data);
   	 			}
   	 		}
   	 	});
    };
    //收取某个学生的试卷
    exports.reviewTestpaperApi_collectStudentTestpaper = function(testpaperid,studentid,callback){
    	var data = {testpaperid:testpaperid,studentid:studentid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewTestpaperApi/collectStudentTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	   	 			callback(data);
   	 			}
   	 		}
   	 	});
    };
    //将某次的测试生成考勤
    exports.reviewTestpaperApi_createAttence = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewTestpaperApi/createAttence",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	   	 			callback(data);
   	 			}
   	 		}
   	 	});
    };
    //生成期末考成绩
    exports.reviewTestpaperApi_generateFinalGrade = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewTestpaperApi/generateFinalGrade",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	   	 			callback(data);
   	 			}
   	 		}
   	 	});
    };
    //修改某个学生的某次测试的成绩
    exports.reviewTestpaperApi_modifyStudentTestpaperScore = function(testpaperid,studentid,score,reason,callback){
    	var data = {testpaperid:testpaperid,studentid:studentid,score:score,reason:reason};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewTestpaperApi/modifyStudentTestpaperScore",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	   	 			callback(data);
   	 			}
   	 		}
   	 	});
    };
    /************************学生作业，测试汇总，考勤，表现汇总*****************************/
    //作业汇总
    exports.summaryApi_homework = function(courseid,callback){
   	 	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/SummaryApi/homework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //测试汇总
    exports.summaryApi_testpaper = function(courseid,callback){
   	 	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/SummaryApi/testpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //考勤汇总
    exports.summaryApi_attence = function(courseid,callback){
   	 	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+ "/SummaryApi/attence",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //表现汇总
    exports.summaryApi_perform = function(courseid,callback){
   	 	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/SummaryApi/perform",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //平时成绩，期末考成绩
    exports.summaryApi_regular = function(courseid,type,callback){
   	 	var data = {courseid:courseid,type:type};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/SummaryApi/regular",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取总成绩
    exports.summaryApi_totalGrade = function(courseid,callback){
   	 	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/SummaryApi/totalGrade",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /******************获取更新动态*****************************/
    exports.helpApi_getUpdates = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/HelpApi/getUpdates",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取更新内容
    exports.helpApi_getUpdateContent = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/HelpApi/getUpdateContent",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /********************获取自己加入的机构情况***********************/
    exports.agencyApi_getLists = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AgencyApi/getLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个机构的院系情况
    exports.agencyApi_getDepartment = function(coid,callback){
    	var data = {coid:coid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AgencyApi/getDepartment",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*************小组API接口********************/
    //新建小组
    exports.GroupApi_addGroup = function(courseid,groupname,callback){
    	var data = {courseid:courseid,groupname:groupname};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GroupApi/addGroup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更新小组名称
    exports.GroupApi_updateGroup = function(groupid,groupname,callback){
    	var data = {groupid:groupid,groupname:groupname};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GroupApi/updateGroup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除某个小组
    exports.GroupApi_delGroup = function(groupid,callback){
    	var data = {groupid:groupid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GroupApi/delGroup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //设置某个学生为小组组长
    exports.GroupApi_setGroupLeader = function(groupid,studentid,callback){
    	var data = {groupid:groupid,studentid:studentid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GroupApi/setGroupLeader",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //取消某个学生为组长
    exports.GroupApi_cancelGroupLeader = function(groupid,studentid,callback){
    	var data = {groupid:groupid,studentid:studentid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GroupApi/cancelGroupLeader",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个课程的所有小组名称
    exports.GroupApi_listGroups = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/GroupApi/listGroups",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个分组的学生信息
    exports.GroupApi_getGroupStudents = function(groupid,callback){
    	var data = {groupid:groupid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/GroupApi/getGroupStudents",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //学生自己主动加入某个小组
    exports.GroupApi_joinGroup = function(groupid,callback){
    	var data = {groupid:groupid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GroupApi/joinGroup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //老师，将某些学生拉入某个小组
    //studentids 表示多个学生的id值，如果有多个学生的话，就是学生id值 +“|”分割开来
    exports.GroupApi_joinGroupByTeacher = function(groupid,studentids,callback){
    	var data = {groupid:groupid,studentids:studentids};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GroupApi/joinGroupByTeacher",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //老师，将某个小组里的成员，从某个小组里面移除
    exports.GroupApi_removeStudent = function(groupid,studentids,callback){
    	var data = {groupid:groupid,studentids:studentids};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GroupApi/removeStudent",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //学生自己退组
    exports.GroupApi_quitGroup = function(groupid,callback){
    	var data = {groupid:groupid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GroupApi/quitGroup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //学生判断自己在某个课程是否加入组了
    exports.GroupApi_isJoinGroup = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/GroupApi/isJoinGroup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //打开/关闭小组加入 type 0表示关闭  1表示打开
    exports.GroupApi_setJoinGroup = function(courseid,type,callback){
    	var data = {courseid:courseid,type:type};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GroupApi/setJoinGroup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个班级，所有除了加入了改组，而未加入其他小组的学生信息
    //txt为搜索条件
    exports.GroupApi_getStudents = function(groupid,txt,callback){
    	var data = {groupid:groupid,txt:txt};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/GroupApi/getStudents",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /************小组批改接口******************/
    //列出所有的小组提交情况
    exports.ReviewGroupApi_lists = function(homeworkid,txt,grade,callback){
    	var data = {homeworkid:homeworkid,txt:txt,grade:grade};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewGroupApi/lists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个小组的提交作业
    exports.ReviewGroupApi_getGroupHomework = function(homeworkid,groupid,callback){
    	var data = {homeworkid:homeworkid,groupid:groupid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewGroupApi/getGroupHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //给某个学生成绩
    exports.ReviewGroupApi_giveScore = function(homeworkid,groupid,studentid,score,callback){
    	var data = {homeworkid:homeworkid,groupid:groupid,studentid:studentid,score:score};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewGroupApi/giveScore",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个小组作业的日志信息
    exports.ReviewGroupApi_getHomeworkLog = function(homeworkid,callback){
    	var data = {homeworkid:homeworkid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewGroupApi/getHomeworkLog",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //给某个小组作业进行评语
    exports.ReviewGroupApi_giveComment = function(homeworkid,groupid,comment,callback){
    	var data = {homeworkid:homeworkid,groupid:groupid,comment:comment};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewGroupApi/giveComment",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //打回某个小组的作业
    exports.ReviewGroupApi_rebackHomework = function(homeworkid,groupid,reason,callback){
    	var data = {homeworkid:homeworkid,groupid:groupid,reason:reason};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewGroupApi/rebackHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //分享某个小组作业
    exports.HomeworkshareApi_addGroupHomeworkshare = function(homeworkid,groupid,content,isreview,isanony,callback){
    	var data = {homeworkid:homeworkid,groupid:groupid,content:content,isreview:isreview,isanony:isanony};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/HomeworkshareApi/addGroupHomeworkshare",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //取消某个小组分享作业
    exports.HomeworkshareApi_delGroupHomeworkshare = function(homeworkid,groupid,callback){
    	var data = {homeworkid:homeworkid,groupid:groupid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/HomeworkshareApi/delGroupHomeworkshare",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取小组的作业的老师评语
    exports.ReviewGroupApi_getTeacherComment = function(homeworkid,groupid,callback){
    	var data = {homeworkid:homeworkid,groupid:groupid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewGroupApi/getTeacherComment",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.ReviewGroupApi_changeGroupHandupState = function(homeworkid,groupid,callback){
    	var data = {homeworkid:homeworkid,groupid:groupid};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/ReviewGroupApi/changeGroupHandupState",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.ReviewGroupApi_getSingleGroupHomework = function(homeworkid,groupid,callback){
    	var data = {homeworkid:homeworkid,groupid:groupid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewGroupApi/getSingleGroupHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*********************************************/
	//试卷分析
	exports.TestpaperApi_analyze = function(testpaperid,type,callback){
		var data = {testpaperid:testpaperid,type:type};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/TestpaperApi/analyze",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取某个试卷的提交的总人数
	exports.TestpaperApi_getHandUpCount = function(testpaperid,callback){
		var data = {testpaperid:testpaperid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/TestpaperApi/getHandUpCount",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取某个试卷的提交的总人数
	exports.TestpaperApi_getHandUpCountna = function(testpaperid,callback){
		var data = {testpaperid:testpaperid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/TestpaperApi/getHandUpCount",
			data: data,
			async: false,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//分析图
	exports.TestpaperApi_getScoreStat = function(testpaperid,callback){
		var data = {testpaperid:testpaperid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/TestpaperApi/getScoreStat",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取题型
	exports.TestpaperApi_getTypeLists = function(testpaperid,callback){
		var data = {testpaperid:testpaperid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/TestpaperApi/getTypeLists",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//批量更新试卷从某个题号到某个题号的分值
	exports.TestpaperApi_updateScoreBat = function(testpaperid,beginNo,endNo,subjectScore,callback){
		var data = {testpaperid:testpaperid,beginNo:beginNo,endNo:endNo,subjectScore:subjectScore};
		$.ajax({
			type: "POST",
			url: exports.APIURL+"/TestpaperApi/updateScoreBat",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback != null){
					callback(data);
				}
			}
		});
	};
	/**********************课堂互动API集合***********************/
	//检查某个文件是否已经被转为图片
	exports.InteractApi_checkPPTTransCode = function(fileid,callback){
		var data = {fileid:fileid};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/InteractApi/checkPPTTransCode",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback){
					callback(data);	
				}
			}
		});
	};
	//发送到互动ppt的转码系统去
	exports.InteractApi_sendPPTTOTransCode = function(fileid,callback){
		var data = {fileid:fileid};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/InteractApi/sendPPTTOTransCode",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback){
					callback(data);	
				}
			}
		});
	};
	exports.InteractApi_addPPTInteract = function(courseid,fileid,callback){
		var data = {courseid:courseid,fileid:fileid};
		$.ajax({
			type: "POST",
			url: exports.APIURL+"/InteractApi/addPPTInteract",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback){
					callback(data);	
				}
			}
		});
	};
	//变更互动课件的文件
	exports.InteractApi_updatePPTInteractFile = function(interactid,fileid,callback){
		var data = {interactid:interactid,fileid:fileid};
		$.ajax({
			type: "POST",
			url: exports.APIURL+"/InteractApi/updatePPTInteractFile",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback){
					callback(data);	
				}
			}
		});
	};
	//检查互动转码是否成功了
	exports.InteractApi_checkCreateInteract = function(courseid,fileid,callback){
		var data = {courseid:courseid,fileid:fileid};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/InteractApi/checkCreateInteract",
			data: data,
			dataType: "json",
			success: function(data){
				callback(data);
			}
		});
	};
	//检查更换ppt互动的转码是否成功了
	exports.InteractApi_checkChangePPTInteract = function(interactid,fileid,callback){
		var data = {interactid:interactid,fileid:fileid};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/InteractApi/checkChangePPTInteract",
			data: data,
			dataType: "json",
			success: function(data){
				callback(data);
			}
		});
	};
	//新增课堂互动
	exports.InteractApi_addInteract = function(courseid,title,callback){
		var data = {courseid:courseid,title:title};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/InteractApi/addInteract",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback){
					callback(data);
				}
			}
		});
	};
	//删除某个互动
	exports.InteractApi_delInteract = function(interactid,callback){
		var data = {interactid:interactid};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/InteractApi/delInteract",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//更新互动的标题
	exports.InteractApi_updateInteractTitle = function(interactid,title,callback){
		var data = {interactid:interactid,title:title};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/InteractApi/updateInteractTitle",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//列出某个课程的所有的互动
	//(老师端和学生端通用，学生端会列出互动环节的历史数据)
	exports.InteractApi_getInteractLists = function(courseid,callback){
		var data = {courseid:courseid};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/InteractApi/getInteractLists",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//添加互动环节
	exports.InteractApi_addInteractStep = function(interactid,title,callback){
		var data = {interactid:interactid,title:title};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/InteractApi/addInteractStep",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//删除某个环节
	exports.InteractApi_delStep = function(stepid,callback){
		var data = {stepid:stepid};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/InteractApi/delStep",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//更新某个环节的标题
	exports.InteractApi_updateStepTitle = function(stepid,title,callback){
		var data = {stepid:stepid,title:title};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/InteractApi/updateStepTitle",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取某个互动的所有环节
	exports.InteractApi_getStepList = function(interactid,callback){
		var data = {interactid:interactid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/InteractApi/getStepList",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
    //变更某个题目的排序
    exports.InteractApi_sortStepLists = function(stepids,callback){
    	var data = {stepids:stepids};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/InteractApi/sortStepLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
	//获取某个环节的学生答题情况(多少个学生参与，参与都有哪些学生的名单)
	exports.InteractApi_getStepAnswerInfo = function(stepid,callback){
		var data = {stepid:stepid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/InteractApi/getStepAnswerInfo",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取某个环节未答题的学生名单情况
	exports.InteractApi_getStepNohandupList = function(stepid,callback){
		var data = {stepid:stepid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/InteractApi/getStepNohandupList",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//清除某个环节的所有学生答题
	exports.InteractApi_clearStepData = function(stepid,callback){
		var data = {stepid:stepid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/InteractApi/clearStepData",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取某个环节的所有试题
	exports.InteractApi_getSubjectLists = function(stepid,callback){
		var data = {stepid:stepid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/InteractApi/getSubjectLists",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取某个环节的所有试题标题
	exports.InteractApi_getSubjectTitleLists = function(stepid,callback){
		var data = {stepid:stepid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/InteractApi/getSubjectTitleLists",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	exports.InteractApi_getStandardSubjectTitleLists = function(stepid,callback){
		var data = {stepid:stepid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/InteractApi/getStandardSubjectTitleLists",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	exports.InteractApi_getStandardSubjectLists = function(stepid,callback){
		var data = {stepid:stepid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/InteractApi/getStandardSubjectLists",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取某个试题的具体内容
	exports.InteractApi_getSubject = function(subjectid,callback){
		var data = {subjectid:subjectid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/InteractApi/getSubject",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	// 添加判断题 和 单选题，这两个的逻辑是一致的
	//type 1表示判断题 2表示选择题  这里的逻辑与测试一样
	exports.InteractApi_addTFSubject = function(stepid,type,title,answer,options,sort,callback){
		var data = {stepid:stepid,type:type,title:title,answer:answer,options:options,sort:sort};
		$.ajax({
			type: "POST",
	   	 	async: false, 
			url: exports.APIURL+"/InteractApi/addTFSubject",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//编辑判断题和选择题
    exports.InteractApi_editTFSubject = function(subjectid, title, optionsIDs, options,answer,sort,callback){
    	var data = {subjectid:subjectid,title:title,optionsIDs:optionsIDs,options:options,answer:answer,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/InteractApi/editTFSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增多选题
    exports.InteractApi_addMulSelectSubject = function(stepid,title,answer,options,sort,callback){
    	var data = {stepid:stepid,title:title,answer:answer,options:options,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/InteractApi/addMulSelectSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑多选题
    exports.InteractApi_editMulSelectSubject = function(subjectid, title, optionsIDs, options,answer,sort,callback){
    	var data = {subjectid:subjectid,title:title,answer:answer,options:options,optionsIDs:optionsIDs,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/InteractApi/editMulSelectSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加主观题(讨论题)
    exports.InteractApi_addSubjective = function(stepid,title,sort,answer,callback){
    	var data = {stepid:stepid,title:title,sort:sort,answer:answer};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/InteractApi/addSubjective",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑主观题（讨论题）
    exports.InteractApi_editSubjective = function(subjectid,title,sort,answer,callback){
    	var data = {subjectid:subjectid,title:title,sort:sort,answer:answer};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/InteractApi/editSubjective",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增单选题  投票类型 不需要答案
	exports.InteractApi_addTFVetoSubject = function(stepid,type,title,options,sort,callback){
		var data = {stepid:stepid,type:type,title:title,options:options,sort:sort};
		$.ajax({
			type: "POST",
			async: false,
			url: exports.APIURL+"/InteractApi/addTFVetoSubject",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//编辑选择题 投票类型  不需要答案
    exports.InteractApi_editTFVetoSubject = function(subjectid, title, optionsIDs, options,sort,callback){
    	var data = {subjectid:subjectid,title:title,optionsIDs:optionsIDs,options:options,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/InteractApi/editTFVetoSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增多选题 投票类型  不需要答案
    exports.InteractApi_addMulSelectVetoSubject = function(stepid,title,options,sort,callback){
    	var data = {stepid:stepid,title:title,options:options,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/InteractApi/addMulSelectVetoSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑多选题  投票类型  不需要答案
    exports.InteractApi_editMulSelectVetoSubject = function(subjectid, title, optionsIDs, options,sort,callback){
    	var data = {subjectid:subjectid,title:title,options:options,optionsIDs:optionsIDs,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/InteractApi/editMulSelectVetoSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增数字评价题
    exports.InteractApi_addDigitMark = function(stepid, title, options,scores,sort,callback){
    	var data = {stepid:stepid,title:title,options:options,scores:scores,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/InteractApi/addDigitMark",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑数值评价题
    exports.InteractApi_editDigitMark = function(subjectid, title, optionsIDs, options, scores, sort,callback){
    	var data = {subjectid:subjectid,title:title,options:options,optionsIDs:optionsIDs,scores:scores,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/InteractApi/editDigitMark",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加匿名开放题
    exports.InteractApi_addAnnoyOpen = function(stepid,title,sort,answer,callback){
    	var data = {stepid:stepid,title:title,sort:sort,answer:answer};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/InteractApi/addAnnoyOpen",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加拍照题
    exports.InteractApi_addPhotoSubject = function(stepid,title,sort,answer,callback){
    	var data = {stepid:stepid,title:title,sort:sort,answer:answer};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/InteractApi/addPhotoSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除题目
    exports.InteractApi_delSubject = function(subjectid, callback){
    	var data = {subjectid:subjectid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InteractApi/delSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //分析某个题目的答题情况 （会给出上一题和下一题的id值）
    exports.InteractApi_getSubjectAnalyze = function(subjectid, callback){
    	var data = {subjectid:subjectid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/InteractApi/getSubjectAnalyze",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获某次分类下的小组列表
    exports.InteractApi_getGroupList = function(subjectid,groupLogId,callback){
        var data = {subjectid:subjectid,groupLogId:groupLogId};
        $.ajax({
            type: "get",
            url: exports.APIURL+"/InteractApi/getSubjectAnalyze",
            data: data,
            dataType: "json",
            success: function(data){
                if(data.status == 1){
                    if(callback != null){
                        callback(data);
                    }
                }else{
                    plugin.openMsg(data.info,1);
                }
            }
        });
    };
    //获取某个环节的第一道题目的 答题分析情况 （会给出上一题和下一题的id值）
    exports.InteractApi_getFisrtSubjectAnalyze = function(stepid,callback){
    	var data = {stepid:stepid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/InteractApi/getFisrtSubjectAnalyze",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个题目的简单分析情况
    exports.InteractApi_getSimpleSubjectStat = function(subjectid,callback){
    	var data = {subjectid:subjectid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/InteractApi/getSimpleSubjectStat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个环节有多少个学生参与答题
    exports.InteractApi_getJoinStepCount = function(stepid, callback){
    	var data = {stepid:stepid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/InteractApi/getJoinStepCount",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //老师 结束答题
    exports.InteractApi_finishStep = function(stepid, callback){
    	var data = {stepid:stepid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InteractApi/finishStep",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //判断某个课程是否存在可以互动的环节
    exports.InteractApi_isExistJoinInteract = function(courseid, callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/InteractApi/isExistJoinInteract",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //学生部分 学生进入互动环节(会获取是否存在可以互动的环节，如果存在的话，则会返回进入环节的id值)
    exports.InteractApi_joinInteract = function(courseid, callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/InteractApi/joinInteract",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //学生进入了某个环节进行答题，会列出自己作答的答案
    exports.InteractApi_doStepSubjectList = function(stepid, callback){
    	var data = {stepid:stepid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/InteractApi/doStepSubjectList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //学生答题保存答案
    exports.InteractApi_saveAnswer = function(subjectid, answer, callback){
    	var data = {subjectid:subjectid,answer:answer};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/InteractApi/saveAnswer",
   	 		async: false,
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		},
	        error:function(data){
		          if(data.readyState==0){
		            plugin.openMsg('请检测网络',1);
		          }
		          if(callback != null){
		              callback(-1);
		          }
	        }
   	 	});
    };
    //保存互动的照片的数据
    exports.InteractApi_savePhotoAnswer = function(subjectid, answer, attachment,callback){
    	var data = {subjectid:subjectid,answer:answer,attachment:attachment};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/InteractApi/saveAnswer",
   	 		async: false,
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		},
	        error:function(data){
	          if(data.readyState==0){
	            plugin.openMsg('请检测网络',1);
	          }
	          if(callback != null){
	              callback(-1);
	          }
	        }
   	 	});
    };
    //学生提交环节测试
    exports.InteractApi_handup = function(stepid,callback){
    	var data = {stepid:stepid};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/InteractApi/handup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		},
	        error:function(data){
	          if(data.readyState==0){
	            plugin.openMsg('请检测网络',1);
	          }
	          if(callback != null){
	              callback(-1);
	          }
	        }
   	 	});
    };
    //获取要导入的课程的所有互动的情况
    exports.InteractApi_importList = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/InteractApi/importList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //复制并添加某个互动
    exports.InteractApi_copyInteract = function(interactid,courseid,title,callback){
    	var data = {interactid:interactid,courseid:courseid,title:title};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/InteractApi/copyInteract",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //老师随机提问某个题目，从这个班级里面随机出一个学生出来
    exports.InteractApi_randAsk = function(subjectid,callback){
    	var data = {subjectid:subjectid};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/InteractApi/randAsk",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //变更某个题目的排序
    exports.InteractApi_sortSubject = function(subjectid,sort,callback){
    	var data = {subjectid:subjectid,sort:sort};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/InteractApi/sortSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //批量对试题进行排序
    exports.InteractApi_sortSubject = function(subjectids,callback){
    	var data = {subjectids:subjectids};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/InteractApi/sortSubjectBat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //开始答题
    exports.InteractApi_beginStep = function(stepid,callback){
    	var data = {stepid:stepid};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/InteractApi/beginStep",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //获取某个环节的基本信息
    exports.InteractApi_getStepInfo = function(stepid,callback){
    	var data = {stepid:stepid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/InteractApi/getStepInfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		},
   	 		error:function(data){
   	 			if(data.readyState==0){
   	 				plugin.openMsg('请检测网络',1);
   	 			}
   	 			if(callback != null){
   	 				callback(-1);
   	 			}
   	 		}
   	 	});
    };
    //学生获取评讲模式
    exports.InteractApi_getListenMode = function(stepid,callback){
    	var data = {stepid:stepid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/InteractApi/getListenMode",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //获取某个题目，某个选项的学生的作答情况
    exports.InteractApi_getSubjectOptionAnalyze = function(subjectid,optionid,callback){
    	var data = {subjectid:subjectid,optionid:optionid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/InteractApi/getSubjectOptionAnalyze",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //获取某个题目，某个选项的学生的作答情况
    exports.InteractApi_getSubjectOptionRealAnalyze = function(subjectid,optionid,callback){
    	var data = {subjectid:subjectid,optionid:optionid,real:1};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/InteractApi/getSubjectOptionAnalyze",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //互动生成考勤
    exports.InteractApi_createAttence = function(interactid,ids, callback){
    	var data = {interactid:interactid, ids:ids};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InteractApi/createAttence",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //互动生成平时成绩
    exports.InteractApi_createRegularGrade = function(interactid,ids,takeinscore,takeinObjectiveScore,objectivescore,callback){
    	var data = {interactid:interactid,ids:ids,takeinscore:takeinscore,takeinObjectiveScore:takeinObjectiveScore,objectivescore:objectivescore};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InteractApi/createRegularGrade",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //互动生成测试的试卷
    exports.InteractApi_createTestpaper = function(interactid,ids,callback){
    	var data = {interactid:interactid,ids:ids};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InteractApi/createTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //打开随机题目
    exports.InteractApi_setTitleRand = function(stepid,isrand,callback){
    	var data = {stepid:stepid,isrand:isrand};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InteractApi/setTitleRand",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //选项随机
    exports.InteractApi_setOptionRand = function(stepid,isrand,callback){
    	var data = {stepid:stepid,isrand:isrand};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InteractApi/setOptionRand",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //复制某个试题到某个环节里去(班级到班级)
    exports.InteractApi_copySubjects = function(idlists,stepid,callback){
    	var data = {idlists:idlists,stepid:stepid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InteractApi/copySubjects",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //复制某个试题到某个环节里去（班级到备课区）
    exports.InteractApi_copySubjectsToResource = function(idlists,stepid,callback){
    	var data = {idlists:idlists,stepid:stepid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InteractApi/copySubjectsToResource",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //生成试卷分享链接
    exports.InteractApi_generateShare = function(interactid,callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InteractApi/generateShare",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.InteractApi_cancleShare = function(interactid,callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InteractApi/cancleShare",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取互动的简答题和匿名开放题的词云
    exports.InteractApi_getWordsCloud = function(subjectid,callback){
    	var data = {subjectid:subjectid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InteractApi/getWordsCloud",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //分组获取互动的简答题和匿名开放题的词云
    exports.InteractApi_getGroupWordsCloud = function(subjectid,activityGroupId,callback){
        var data = {subjectid:subjectid,activityGroupId:activityGroupId};
        $.ajax({
            type: "POST",
            url: exports.APIURL+"/InteractApi/getWordsCloud",
            data: data,
            dataType: "json",
            success: function(data){
                if(data.status == 1){
                    if(callback != null){
                        callback(data);
                    }
                }else{
                    plugin.openMsg(data.info,1);
                }
            }
        });
    };
    //复制班级里面的互动试题到某个班级里面的试卷里面去
    exports.InteractApi_copyCourseSubjectsToCourseTestpaper = function(testpaperid,idlists,callback){
    	var data = {testpaperid:testpaperid,idlists:idlists};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InteractApi/copyCourseSubjectsToCourseTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //复制班级里面的互动试题到某个备课区里面的试卷里面去
    exports.InteractApi_copyCourseSubjectsToResourceTestpaper = function(testpaperid,idlists,callback){
    	var data = {testpaperid:testpaperid,idlists:idlists};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InteractApi/copyCourseSubjectsToResourceTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    exports.InteractApi_cancleAnswerTop = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InteractApi/cancleAnswerTop",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    exports.InteractApi_setAnswerTop = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InteractApi/setAnswerTop",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    /***********************备课区***********************************/
    //新增备课区
    exports.ResourceApi_addResource = function(title,callback){
    	var data = {title:title};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/ResourceApi/addResource",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //修改备课区名称
    exports.ResourceApi_updateResource = function(id,title,callback){
    	var data = {id:id,title:title};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/ResourceApi/updateResource",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除某个备课区
    exports.ResourceApi_delResource = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/ResourceApi/delResource",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取所有备课区列表
    exports.ResourceApi_getResourceList = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/ResourceApi/getResourceList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取班级列表
    exports.ResourceApi_getCourseList= function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/ResourceApi/getCourseList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取某个文件夹下的文件夹列表 
     * rid        备课区id
     * folderid   文件夹id
     * type 类型  0 作业 1 资料 2 互动 3 测试 4话题
     */
    exports.ResourceApi_getResourceFolderList = function(rid,folderid,type,callback){
        var data = {rid:rid,folderid:folderid,type:type};
        $.ajax({
          type: "GET",
          url: exports.APIURL+"/ResourceApi/getResourceFolderList",
          data: data,
          dataType: "json",
          success: function(data){
            if(callback != null){
              callback(data);
            }
          }
        });
    };
    //向备课区添加新的文件夹 个人备课区-新建文件夹
    exports.ResourceApi_addResourceFolderList = function(rid,folderid,type,text,callback){
      var data = {rid:rid,folderid:folderid,type:type,text:text};
      $.ajax({
        type:"POST",
        url:exports.APIURL+"/ResourceApi/addResourceFolderList",
        data:data,
        dataType:"json",
        success:function(data){
            if(callback != null){
                callback(data);
            }
        }
      });
    };
    /**
     * 备课区删除  个人备课区-删除文件
     * @param    rid        备课区id
     * @param    type       0 作业 1 资料 2 互动 3 测试 4话题
     * @param    folderids       文件夹id  array
     * @param    fileids       文件id    array
     */
    exports.ResourceApi_delResourceList = function(rid,type,folderids,fileids,callback){
      var data = {rid:rid,type:type,folderids:folderids,fileids:fileids};
      $.ajax({
        type:"POST",
        url:exports.APIURL+"/ResourceApi/delResourceList",
        data:data,
        dataType:"json",
        success:function(data){
            if(callback != null){
                callback(data);
            }
        }
      });
    };
    /**
     * 备课区回收站  个人备课区-回收站
     * @param    rid        备课区id
     * @param    type       0 作业 1 资料 2 互动 3 测试 4话题
     * @param    allFileId       文件夹id  array
     * @param    allWorkId       文件id    array
     */
    exports.ResourceApi_getResourceRecyclebin = function(callback){
      var data = {};
      $.ajax({
        type:"GET",
        url:exports.APIURL+"/ResourceApi/getResourceRecyclebin",
        data:data,
        dataType:"json",
        success:function(data){
            if(callback != null){
                callback(data);
            }
        }
      });
    };
    /**
     * 备课区回收站  个人备课区-回收站-还原内容
     * @param    rid        备课区id
     * @param    typeList   0 作业 1 互动 2 测试 3 话题 4备课区 5 文件夹
     * @param    idList     id    array
     */
    exports.ResourceApi_ResourceRecyclebinlistReduction = function(idList,typeList,isFoledList,callback){
      var data = {idList:idList,typeList:typeList,isFoledList:isFoledList};
      $.ajax({
        type:"POST",
        url:exports.APIURL+"/ResourceApi/ResourceRecyclebinlistReduction",
        data:data,
        dataType:"json",
        success:function(data){
          
          if(callback != null){
              callback(data);
          }
        }
      });
    };
    /**
      * 备课区回收站  个人备课区-回收站-永久删除
     * @param    rid        备课区id
     * @param    typeList   0 作业 1 互动 2 测试 3 话题 4备课区 5 文件夹
     * @param    idList     id    array
     */
    exports.ResourceApi_delResourceRecyclebin = function(idList,typeList,isFoledList,callback){
        var data = {idList:idList,typeList:typeList,isfolderlist:isFoledList};
        $.ajax({
          type:"POST",
          url:exports.APIURL+"/ResourceApi/delResourceRecyclebin",
          data:data,
          dataType:"json",
          success:function(data){
              if(callback != null){
                  callback(data);
              }
          }
        });
    };
    /**
     * 向备课区添加新的文件夹  复制到...功能
     * @param    rid        备课区id
     * @param    fileids    文件ids
     * @param    folderids  目录ids值
     * @param    targetrid   目标备课区id
     * @param    targetfolderid  目标目录的id值
     * @param    type       0 作业 1 资料 2 互动 3测试 4 话题
     */
    exports.ResourceApi_copyResourceFolderList = function(rid,fileids,folderids,type,targetrid,targetfolderid,callback){
        var data = {rid:rid,fileids:fileids,folderids:folderids,type:type,targetrid:targetrid,targetfolderid:targetfolderid};
        $.ajax({
          type:"POST",
          url:exports.APIURL+"/ResourceApi/copyResourceFolderList",
          data:data,
          dataType:"json",
          success:function(data){
              if(callback != null){
                  callback(data);
              }
          }
        });
    };
    /**
     * 向备课区添加新的文件夹  移动到...功能
     * @param    rid        备课区id
     * @param    fileids    文件ids
     * @param    folderids  目录ids值
     * @param    targetrid   目标备课区id
     * @param    targetfolderid  目标目录的id值
     * @param    type       0 作业 1 资料 2 互动 3测试 4 话题
     */
    exports.ResourceApi_moveResourceFolderList = function(rid,fileids,folderids,type,targetrid,targetfolderid,callback){
        var data = {rid:rid,fileids:fileids,folderids:folderids,type:type,targetrid:targetrid,targetfolderid:targetfolderid};
        $.ajax({
          type:"POST",
          url:exports.APIURL+"/ResourceApi/moveResourceFolderList",
          data:data,
          dataType:"json",
          success:function(data){
              if(callback != null){
                  callback(data);
              }
          }
        });
    };
    /**
     * 向备课区的重命名  重命名功能
     * folderids目录数组
     * fileids 文件数组（不是目录，统称为文件）
     * [0作业 1资源 2互动 3测试 4话题 5文件夹 6备课区]
     */
    exports.ResourceApi_updateResourceRename = function(rid,type,folderids,fileids,text,callback){
      var data = {rid:rid,type:type,folderids:folderids,fileids:fileids,text:text};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceApi/updateResourceRename",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //生成备课区的分享链接
    exports.ResourceApi_generateResourceShare = function(rid,resourceid,endtime,callback){
      var data = {rid:rid,resourceid:resourceid,endtime:endtime};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceApi/generateResourceShare",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //生成备课区的取消分享链接
    exports.ResourceApi_cancleResourceShare = function(rid,resourceid,callback){
      var data = {rid:rid,resourceid:resourceid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceApi/cancleResourceShare",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    /**********************备课区 作业************************/
    //新增备课区的作业
    exports.ResourceHomeworkApi_addHomework = function(rid,title,description,attachment,folderid,callback){
    	var data = {rid:rid,title:title,description:description,attachment:attachment,folderid:folderid};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/ResourceHomeworkApi/addHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //从资源区 导入了 作业到 课程中去,并且可以修改 title和description和截止时间等
    exports.ResourceHomeworkApi_copyHomework = function(homeworkid,title,description,attachment,endtime,type,callback){
    	var data = {homeworkid:homeworkid,title:title,description:description,attachment:attachment,endtime:endtime,type:type};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/ResourceHomeworkApi/copyHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某次的作业
    exports.ResourceHomeworkApi_getHomework = function(homeworkid,callback){
    	var data = {homeworkid:homeworkid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/ResourceHomeworkApi/getHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑作业
    exports.ResourceHomeworkApi_updateHomework = function(id,title,description,attachment,callback){
    	var data = {id:id,title:title,description:description,attachment:attachment};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/ResourceHomeworkApi/updateHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除作业
    exports.ResourceHomeworkApi_delHomework = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/ResourceHomeworkApi/delHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个备课区的作业列表
    exports.ResourceHomeworkApi_getHomeworkList = function(rid,callback){
    	var data = {rid:rid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/ResourceHomeworkApi/getHomeworkList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将某个作业移动到某个备课区id 表示作业id值，rid表示备课区id值
    exports.ResourceHomeworkApi_moveHomework = function(id,rid,callback){
    	var data = {id:id,rid:rid};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/ResourceHomeworkApi/moveHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将某个作业发布到某个班级
    //homeworkid 表示作业id值，courseid表示目标课程id值
    exports.ResourceHomeworkApi_publishHomework = function(homeworkid,courseid,type,endtime,fullscore,callback){
    	var data = {homeworkid:homeworkid,courseid:courseid,type:type,endtime:endtime,fullscore:fullscore};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/ResourceHomeworkApi/publishHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将某个课程的某个作业，放到备课区某个资源区里面
    exports.ResourceHomeworkApi_putHomeworkToResource = function(homeworkid,rid,callback){
    	var data = {homeworkid:homeworkid,rid:rid};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/ResourceHomeworkApi/putHomeworkToResource",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个备课区的删除的全部的作业列表 - 回收站删除
    exports.ResourceHomeworkApi_delHomeworkToResourceId = function(id,callback){
      var data = {id:id};
      $.ajax({
        type: "get",
        url: exports.APIURL+"/ResourceHomeworkApi/delHomeworkToResourceId",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //获取某个备课区的作业文件夹列表
    exports.ResourceHomeworkApi_getHomeworkToResourceFolderList = function(rid,callback){
      var data = {rid:rid};
      $.ajax({
        type:"GET",
        url:exports.APIURL+"/ResourceHomeworkApi/getHomeworkToResourceFolderList",
        data:data,
        dataType:"json",
        success:function(data){
            if(callback != null){
                callback(data);
            }
        }
      });
    };
    /**
     * 查询出作业文件夹下面的文件列表
     * @param     rid       [备课区id]
     * @param     nextType  [类型]
     * @param     folderid  [文件夹id]
     */
    exports.ResourceHomeworkApi_getResourceHomeworkFolderList = function(rid,folderid,callback){
      var data = {rid:rid,folderid:folderid};
      $.ajax({
        type:"GET",
        url:exports.APIURL+"/ResourceHomeworkApi/getResourceHomeworkFolderList",
        data:data,
        dataType:"json",
        success:function(data){
            if(callback != null){
                callback(data);
            }
        }
      });
    };
    //生成测试试卷的分享链接
    exports.ResourceHomeworkApi_generateHomeworkShare = function(rid,homeworkid,endtime,callback){
      var data = {rid:rid,homeworkid:homeworkid,endtime:endtime};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceHomeworkApi/generateHomeworkShare",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //生成测试试卷的取消分享链接
    exports.ResourceHomeworkApi_cancleHomeworkShare = function(homeworkid,callback){
      var data = {homeworkid:homeworkid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceHomeworkApi/cancleHomeworkShare",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //生成作业文件夹的分享链接
    exports.ResourceHomeworkApi_generateHomeworkShareFolder = function(rid,homeworkid,endtime,callback){
      var data = {rid:rid,homeworkid:homeworkid,endtime:endtime};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceHomeworkApi/generateHomeworkShareFolder",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //生成作业文件夹的的取消分享链接
    exports.ResourceHomeworkApi_cancleHomeworkShareFolder = function(rid,homeworkid,callback){
      var data = {rid:rid,homeworkid:homeworkid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceHomeworkApi/cancleHomeworkShareFolder",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    
    //将备课区的某个作业保存到某个备课区
    exports.ResourceHomeworkApi_putResourceHomeworkToResourceByShare = function(rid,homeworkid,shareid,callback){
      var data = {rid:rid,homeworkid:homeworkid,shareid:shareid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceHomeworkApi/putResourceHomeworkToResourceByShare",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };

    /*******************备课区 课件***************************/
    //列出某个备课区的1级目录的所有文件
    exports.ResourceCoursewareApi_listAllCourseware = function(rid,callback){
    	var data = {rid:rid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ResourceCoursewareApi/listAllCourseware",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.ResourceCoursewareApi_listAllCoursewarePPTAndPDF = function(rid,callback){
    	var data = {rid:rid,type:'pptpdf'};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ResourceCoursewareApi/listAllCourseware",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.ResourceCoursewareApi_listAllCoursewareFilterType = function(rid,type,callback){
    	var data = {rid:rid,type:type};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ResourceCoursewareApi/listAllCourseware",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //列出某个目录下的所有文件
    exports.ResourceCoursewareApi_folder = function(folderid,callback){
    	var data = {folderid:folderid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ResourceCoursewareApi/folder",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增目录
    exports.ResourceCoursewareApi_addFoloder = function(rid,foldername,callback){
    	var data = {rid:rid,foldername:foldername};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceCoursewareApi/addFoloder",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑目录
    exports.ResourceCoursewareApi_editFolder = function(id,foldername,callback){
    	var data = {id:id,foldername:foldername};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceCoursewareApi/editFolder",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //移动文件到某个备课区的某个目录目录   id表示文件id值，folderid表示目标目录id值，rid表示备课区id值
    exports.ResourceCoursewareApi_moveFile = function(id,folderid,rid,callback){
    	var data = {id:id,folderid:folderid,rid:rid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceCoursewareApi/moveFile",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //移出到顶级目录
    exports.ResourceCoursewareApi_moveFileOut = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceCoursewareApi/moveFileOut",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除某个文件
    exports.ResourceCoursewareApi_delCourseware = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceCoursewareApi/delCourseware",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //列出1级目录下的所有目录
    exports.ResourceCoursewareApi_listFolders = function(rid,callback){
    	var data = {rid:rid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ResourceCoursewareApi/listFolders",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将某个(或者多个)课件（或者目录）发布到指定班级中
    //filelist 表示文件id值的列表  courseid表示目标班级值
    exports.ResourceCoursewareApi_publishCourseware = function(filelist,courseid,callback){
    	var data = {filelist:filelist,courseid:courseid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceCoursewareApi/publishCourseware",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将某个(或者多个)课件（或者目录）发布到指定班级中的某个目录
    exports.ResourceCoursewareApi_putResourceCoursewareToCourse = function(filelist,courseid,folderid,callback){
    	var data = {filelist:filelist,courseid:courseid,folderid:folderid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceCoursewareApi/putResourceCoursewareToCourse",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将某个课程下的某个课件，放到某个备课区中去
    exports.ResourceCoursewareApi_putCoursewareToResource = function(id,rid,folderid,callback){
    	var data = {id:id,rid:rid,folderid:folderid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceCoursewareApi/putCoursewareToResource",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.ResourceCoursewareApi_putAgencyWenkuToResource = function(docid,rid,folderid,callback){
    	var data = {docid:docid,rid:rid,folderid:folderid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceCoursewareApi/putAgencyWenkuToResource",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);	
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //备课区资料上传-添加文件
    exports.ResourceCoursewareApi_addWorkToResourceCourseware = function(rid,fileid,folderid,callback){
      var data = {rid:rid,fileid:fileid,folderid:folderid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceCoursewareApi/addWorkToResourceCourseware",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data); 
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //生成资源的分享链接
    exports.ResourceCoursewareApi_generateCoursewareShare = function(rid,coursewareid,endtime,callback){
      var data = {rid:rid,coursewareid:coursewareid,endtime:endtime};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceCoursewareApi/generateCoursewareShare",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //生成资料的取消分享链接
    exports.ResourceCoursewareApi_cancleCoursewareShare = function(rid,coursewareid,callback){
      var data = {rid:rid,coursewareid:coursewareid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceCoursewareApi/cancleCoursewareShare",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //将备课区的某个资料保存到某个备课区
    exports.ResourceCoursewareApi_putResourceCoursewareToResourceByShare = function(rid,coursewareid,shareid,callback){
      var data = {rid:rid,coursewareid:coursewareid,shareid:shareid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceCoursewareApi/putResourceCoursewareToResourceByShare",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };

    /******************备课区 课中互动,试题互动************************/
    //将多个互动移动到某个备课区
    //多个互动，将id值用"|"分割开来即可
	exports.ResourceInteractApi_moveInteract = function(id,rid,callback){
		var data = {id:id,rid:rid};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/ResourceInteractApi/moveInteract",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback){
					callback(data);
				}
			}
		});
	};
	//将已经某个课程的互动，放到备课区某个资源区里面
	exports.ResourceInteractApi_putInteractToResource = function(interactid,rid,callback){
		var data = {interactid:interactid,rid:rid};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/ResourceInteractApi/putInteractToResource",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback){
					callback(data);
				}
			}
		});
	};
	//将已经某个课程的互动，放到备课区某个资源区里面，通过分享的方式
	exports.ResourceInteractApi_putInteractToResourceByShare = function(interactid,rid,callback){
		var data = {interactid:interactid,rid:rid};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/ResourceInteractApi/putInteractToResourceByShare",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback){
					callback(data);
				}
			}
		});
	};
	//将已经备课区的某个互动，放到备课区某个资源区里面，通过分享的方式
	exports.ResourceInteractApi_putResourceInteractToResourceByShare = function(rid,interactid,shareid,callback){
		var data = {rid:rid,interactid:interactid,shareid:shareid};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/ResourceInteractApi/putResourceInteractToResourceByShare",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback){
					callback(data);
				}
			}
		});
	};
	//新增试题互动
	exports.ResourceInteractApi_addInteract = function(rid,title,folderid,callback){
		var data = {rid:rid,title:title,folderid:folderid};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/ResourceInteractApi/addInteract",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback){
					callback(data);
				}
			}
		});
	};
	//删除某个互动
	exports.ResourceInteractApi_delInteract = function(interactid,callback){
		var data = {interactid:interactid};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/ResourceInteractApi/delInteract",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//更新互动的标题
	exports.ResourceInteractApi_updateInteractTitle = function(interactid,title,callback){
		var data = {interactid:interactid,title:title};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/ResourceInteractApi/updateInteractTitle",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//列出某个课程的所有的互动
	exports.ResourceInteractApi_getInteractLists = function(rid,callback){
		var data = {rid:rid};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/ResourceInteractApi/getInteractLists",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//列出某个课程的所有的互动(按类别获取)
	exports.ResourceInteractApi_getIneractListsByType = function(rid,type,callback){
		var data = {rid:rid,type:type};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/ResourceInteractApi/getIneractListsByType",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//添加互动环节
	exports.ResourceInteractApi_addInteractStep = function(interactid,title,callback){
		var data = {interactid:interactid,title:title};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/ResourceInteractApi/addInteractStep",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//删除某个环节
	exports.ResourceInteractApi_delStep = function(stepid,callback){
		var data = {stepid:stepid};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/ResourceInteractApi/delStep",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//更新某个环节的标题
	exports.ResourceInteractApi_updateStepTitle = function(stepid,title,callback){
		var data = {stepid:stepid,title:title};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/ResourceInteractApi/updateStepTitle",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取某个互动的所有环节
	exports.ResourceInteractApi_getStepList = function(interactid,callback){
		var data = {interactid:interactid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/ResourceInteractApi/getStepList",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取某个环节的所有试题
	exports.ResourceInteractApi_getSubjectLists = function(stepid,callback){
		var data = {stepid:stepid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/ResourceInteractApi/getSubjectLists",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	exports.ResourceInteractApi_getSubjectTitleLists = function(stepid,callback){
		var data = {stepid:stepid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/ResourceInteractApi/getSubjectTitleLists",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	exports.ResourceInteractApi_getStandardSubjectTitleLists = function(stepid,callback){
		var data = {stepid:stepid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/ResourceInteractApi/getStandardSubjectTitleLists",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	exports.ResourceInteractApi_getStandardSubjectLists = function(stepid,callback){
		var data = {stepid:stepid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/ResourceInteractApi/getStandardSubjectLists",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
    //变更某个题目的排序
    exports.ResourceInteractApi_sortSubject = function(subjectid,sort,callback){
    	var data = {subjectid:subjectid,sort:sort};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/ResourceInteractApi/sortSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //批量对试题进行排序
    exports.ResourceInteractApi_sortSubject = function(subjectids,callback){
    	var data = {subjectids:subjectids};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/ResourceInteractApi/updateSortBat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
	//获取某个试题的具体内容
	exports.ResourceInteractApi_getSubject = function(subjectid,callback){
		var data = {subjectid:subjectid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/ResourceInteractApi/getSubject",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	// 添加判断题 和 单选题，这两个的逻辑是一致的
	//type 1表示判断题 2表示选择题  这里的逻辑与测试一样
	exports.ResourceInteractApi_addTFSubject = function(stepid,type,title,answer,options,sort,callback){
		var data = {stepid:stepid,type:type,title:title,answer:answer,options:options,sort:sort};
		$.ajax({
			type: "POST",
			async: false,  
			url: exports.APIURL+"/ResourceInteractApi/addTFSubject",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//编辑判断题和选择题
    exports.ResourceInteractApi_editTFSubject = function(subjectid, title, optionsIDs, options,answer,sort,callback){
    	var data = {subjectid:subjectid,title:title,optionsIDs:optionsIDs,options:options,answer:answer,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,  
   	 		url: exports.APIURL+"/ResourceInteractApi/editTFSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增多选题
    exports.ResourceInteractApi_addMulSelectSubject = function(stepid,title,answer,options,sort,callback){
    	var data = {stepid:stepid,title:title,answer:answer,options:options,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceInteractApi/addMulSelectSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑多选题
    exports.ResourceInteractApi_editMulSelectSubject = function(subjectid, title, optionsIDs, options,answer,sort,callback){
    	var data = {subjectid:subjectid,title:title,answer:answer,options:options,optionsIDs:optionsIDs,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceInteractApi/editMulSelectSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加主观题(讨论题)
    exports.ResourceInteractApi_addSubjective = function(stepid,title,sort,answer,callback){
    	var data = {stepid:stepid,title:title,sort:sort,answer:answer};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceInteractApi/addSubjective",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑主观题（讨论题）
    exports.ResourceInteractApi_editSubjective = function(subjectid,title,sort,answer,callback){
    	var data = {subjectid:subjectid,title:title,sort:sort,answer:answer};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceInteractApi/editSubjective",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增单选题  投票类型 不需要答案
	exports.ResourceInteractApi_addTFVetoSubject = function(stepid,type,title,options,sort,callback){
		var data = {stepid:stepid,type:type,title:title,options:options,sort:sort};
		$.ajax({
			type: "POST",
			async: false,
			url: exports.APIURL+"/ResourceInteractApi/addTFVetoSubject",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//编辑选择题 投票类型  不需要答案
    exports.ResourceInteractApi_editTFVetoSubject = function(subjectid, title, optionsIDs, options,sort,callback){
    	var data = {subjectid:subjectid,title:title,optionsIDs:optionsIDs,options:options,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceInteractApi/editTFVetoSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增多选题 投票类型  不需要答案
    exports.ResourceInteractApi_addMulSelectVetoSubject = function(stepid,title,options,sort,callback){
    	var data = {stepid:stepid,title:title,options:options,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceInteractApi/addMulSelectVetoSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑多选题  投票类型  不需要答案
    exports.ResourceInteractApi_editMulSelectVetoSubject = function(subjectid, title, optionsIDs, options,sort,callback){
    	var data = {subjectid:subjectid,title:title,options:options,optionsIDs:optionsIDs,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceInteractApi/editMulSelectVetoSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增数字评价题
    exports.ResourceInteractApi_addDigitMark = function(stepid, title, options,scores,sort,callback){
    	var data = {stepid:stepid,title:title,options:options,scores:scores,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceInteractApi/addDigitMark",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑数值评价题
    exports.ResourceInteractApi_editDigitMark = function(subjectid, title, optionsIDs, options, scores, sort,callback){
    	var data = {subjectid:subjectid,title:title,options:options,optionsIDs:optionsIDs,scores:scores,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceInteractApi/editDigitMark",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加匿名开放题
    exports.ResourceInteractApi_addAnnoyOpen = function(stepid,title,sort,answer,callback){
    	var data = {stepid:stepid,title:title,sort:sort,answer:answer};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceInteractApi/addAnnoyOpen",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加拍照题
    exports.ResourceInteractApi_addPhotoSubject = function(stepid,title,sort,answer,callback){
    	var data = {stepid:stepid,title:title,sort:sort,answer:answer};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceInteractApi/addPhotoSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除题目
    exports.ResourceInteractApi_delSubject = function(subjectid, callback){
    	var data = {subjectid:subjectid};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceInteractApi/delSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将某个互动发布到某个班级
    exports.ResourceInteractApi_publishInteract = function(interactid, courseid, callback){
    	var data = {interactid:interactid,courseid:courseid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceInteractApi/publishInteract",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //从资料那边导入了到课程中去，可以修改title
    exports.ResourceInteractApi_copyInteract = function(interactid, courseid, title, callback){
    	var data = {interactid:interactid,courseid:courseid,title:title};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceInteractApi/copyInteract",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //复制某个试题到某个环节里去(备课区复制课程去)
    exports.ResourceInteractApi_copySubjects = function(idlists,stepid,callback){
    	var data = {idlists:idlists,stepid:stepid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceInteractApi/copySubjects",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //复制某个试题到某个环节里去(备课区到备课区)
    exports.ResourceInteractApi_copySubjectsToResource = function(idlists,stepid,callback){
    	var data = {idlists:idlists,stepid:stepid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceInteractApi/copySubjectsToResource",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //生成互动的分享链接
    exports.ResourceInteractApi_generateShare = function(interactid,callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceInteractApi/generateShare",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.ResourceInteractApi_cancleShare = function(interactid,callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceInteractApi/cancleShare",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将备课区的互动试题复制到某个班级里面的试题里面去
    exports.ResourceInteractApi_copyResourceSubjectsToCourseTestpaper = function(testpaperid,idlists,callback){
    	var data = {testpaperid:testpaperid,idlists:idlists};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceInteractApi/copyResourceSubjectsToCourseTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将备课区的互动试题复制到某个备课区里面的试题里面去
    exports.ResourceInteractApi_copyResourceSubjectsToResourceTestpaper = function(testpaperid,idlists,callback){
    	var data = {testpaperid:testpaperid,idlists:idlists};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceInteractApi/copyResourceSubjectsToResourceTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取备课区的互动的文件夹列表
    exports.ResourceInteractApi_getInteractToResourceFolderList = function(rid,callback){
      var data = {rid:rid};
      $.ajax({
        type: "post",
        url: exports.APIURL+"/ResourceInteractApi/getInteractToResourceFolderList",
        data: data,
        dataType: "json",
        success: function(data){
        if(callback != null){
          callback(data);
        }
        }
      });
    };

    //生成互动试卷的分享链接
    exports.ResourceInteractApi_generateInteractShare = function(rid,interactid,endtime,callback){
      var data = {rid:rid,interactid:interactid,endtime:endtime};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceInteractApi/generateInteractShare",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //生成测试试卷的取消分享链接
    exports.ResourceInteractApi_cancleInteractShare = function(interactid,callback){
      var data = {interactid:interactid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceInteractApi/cancleInteractShare",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //生成互动文件夹的分享链接
    exports.ResourceInteractApi_generateInteractShareFolder = function(rid,interactid,endtime,callback){
      var data = {rid:rid,interactid:interactid,endtime:endtime};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceInteractApi/generateInteractShareFolder",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //生成互动文件夹的取消分享链接
    exports.ResourceInteractApi_cancleInteractShareFolder = function(rid,interactid,callback){
      var data = {rid:rid,interactid:interactid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceInteractApi/cancleInteractShareFolder",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    /**
     * 查询出互动文件夹下面的文件列表
     * @param     rid       [备课区id]
     * @param     nextType  [类型]
     * @param     folderid  [文件夹id]
     */
    exports.ResourceInteractApi_getInteractWordLists = function(rid,folderId,callback){
      var data = {rid:rid,folderId:folderId};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceInteractApi/getInteractWordLists",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    /******************备课区 ppt互动******************/
	//复制某个题目到某页幻灯片里面去，从备课区复制到课程里面去
	exports.ResourceInteractPPTApi_copyResourceSubjectsToCourse = function(interactid,pageindex,idlists,callback){
		var data = {interactid:interactid,pageindex:pageindex,idlists:idlists};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/ResourceInteractPPTApi/copyResourceSubjectsToCourse",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback != null){
					callback(data);
				}
			}
		});
	};
	//从备课区复制到备课区
	exports.ResourceInteractPPTApi_copyResourceSubjectsToResource = function(interactid,pageindex,idlists,callback){
		var data = {interactid:interactid,pageindex:pageindex,idlists:idlists};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/ResourceInteractPPTApi/copyResourceSubjectsToResource",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback != null){
					callback(data);
				}
			}
		});
	};
	//检查备课区的互动PPT是否已经成功生成
	exports.ResourceInteractPPTApi_checkCreateInteract = function(rid, fileid, callback){
		var data = {rid:rid,fileid:fileid};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/ResourceInteractPPTApi/checkCreateInteract",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//检查备课区的互动PPT是否更换完毕
	exports.ResourceInteractPPTApi_checkChangePPTInteract = function(interactid, fileid, callback){
		var data = {interactid:interactid,fileid:fileid};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/ResourceInteractPPTApi/checkChangePPTInteract",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//
	exports.ResourceInteractPPTApi_addPPTInteract = function(rid, fileid, folderid, callback){
		var data = {rid:rid,fileid:fileid,folderid:folderid};
		$.ajax({
			type: "POST",
			url: exports.APIURL+"/ResourceInteractPPTApi/addPPTInteract",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	exports.ResourceInteractPPTApi_updatePPTInteractFile = function(interactid, fileid, callback){
		var data = {interactid:interactid,fileid:fileid};
		$.ajax({
			type: "POST",
			url: exports.APIURL+"/ResourceInteractPPTApi/updatePPTInteractFile",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取整个ppt转码的之后的图片
	exports.ResourceInteractPPTApi_listSlides = function(interactid,callback){
		var data = {interactid:interactid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/ResourceInteractPPTApi/listSlides",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
    //获取某个互动的某页ppt的试题列表
    exports.ResourceInteractPPTApi_getSubjectLists = function(interactid,pageindex, callback){
    	var data = {interactid:interactid, pageindex:pageindex};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ResourceInteractPPTApi/getSubjectLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //判断某个互动某页ppt是否可以移动
    exports.ResourceInteractPPTApi_isCanMove = function(interactid,pageindex, callback){
    	var data = {interactid:interactid, pageindex:pageindex};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ResourceInteractPPTApi/isCanMove",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将某页的互动PPT移动到某一页里去
    exports.ResourceInteractPPTApi_moveStep = function(interactid,pageindex,distIndex,callback){
    	var data = {interactid:interactid, pageindex:pageindex, distIndex:distIndex};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ResourceInteractPPTApi/moveStep",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
	   	 			callback(data);
	   	 		}
   	 		}
   	 	});
    };
    //下载ppt文件
    exports.ResourceInteractPPTApi_downloadppt = function(interactid,callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ResourceInteractPPTApi/downloadppt",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增了判断题和单选题
	exports.ResourceInteractPPTApi_addTFSubject = function(interactid,pageindex,type,title,answer,options,sort,callback){
		var data = {interactid:interactid,pageindex:pageindex,type:type,title:title,answer:answer,options:options,sort:sort};
		$.ajax({
			type: "POST",
			async: false,
			url: exports.APIURL+"/ResourceInteractPPTApi/addTFSubject",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
    //新增多选题
    exports.ResourceInteractPPTApi_addMulSelectSubject = function(interactid,pageindex,title,answer,options,sort,callback){
    	var data = {interactid:interactid,pageindex:pageindex,title:title,answer:answer,options:options,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceInteractPPTApi/addMulSelectSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加主观题(讨论题)
    exports.ResourceInteractPPTApi_addSubjective = function(interactid,pageindex,title,sort,answer,callback){
    	var data = {interactid:interactid,pageindex:pageindex,title:title,sort:sort,answer:answer};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceInteractPPTApi/addSubjective",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增单选题  投票类型 不需要答案
	exports.ResourceInteractPPTApi_addTFVetoSubject = function(interactid,pageindex,type,title,options,sort,callback){
		var data = {interactid:interactid,pageindex:pageindex,type:type,title:title,options:options,sort:sort};
		$.ajax({
			type: "POST",
			async: false,
			url: exports.APIURL+"/ResourceInteractPPTApi/addTFVetoSubject",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
    //新增多选题 投票类型  不需要答案
    exports.ResourceInteractPPTApi_addMulSelectVetoSubject = function(interactid,pageindex,title,options,sort,callback){
    	var data = {interactid:interactid,pageindex:pageindex,title:title,options:options,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceInteractPPTApi/addMulSelectVetoSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增数字评价题
    exports.ResourceInteractPPTApi_addDigitMark = function(interactid,pageindex, title, options,scores,sort,callback){
    	var data = {interactid:interactid,pageindex:pageindex,title:title,options:options,scores:scores,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceInteractPPTApi/addDigitMark",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加匿名开放题
    exports.ResourceInteractPPTApi_addAnnoyOpen = function(interactid,pageindex,title,sort,answer,callback){
    	var data = {interactid:interactid,pageindex:pageindex,title:title,sort:sort,answer:answer};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceInteractPPTApi/addAnnoyOpen",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加拍照题
    exports.ResourceInteractPPTApi_addPhotoSubject = function(interactid,pageindex,title,sort,answer,callback){
    	var data = {interactid:interactid,pageindex:pageindex,title:title,sort:sort,answer:answer};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceInteractPPTApi/addPhotoSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //从资料那边导入了到课程中去，可以修改title
    exports.ResourceInteractPPTApi_copyInteract = function(interactid, courseid, callback){
    	var data = {interactid:interactid,courseid:courseid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceInteractPPTApi/copyInteract",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个互动的ppt的预览地址
    exports.ResourceInteractPPTApi_getPPTReviewUrl = function(interactid, callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ResourceInteractPPTApi/getPPTReviewUrl",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    
    /******************备课区 试卷*********************/
    //将多个互动移动到某个备课区
    //多个互动，将id值用"|"分割开来即可
	exports.ResourceTestpaperApi_moveTestpaper = function(id,rid,callback){
		var data = {id:id,rid:rid};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/ResourceTestpaperApi/moveTestpaper",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback){
					callback(data);
				}
			}
		});
	};
    //获取某个备课区的所有试卷列表
    exports.ResourceTestpaperApi_getTestpaperList = function(rid,callback){
    	var data = {rid:rid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/getTestpaperList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	 					callback(data);
   	 				}	
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除试卷
    exports.ResourceTestpaperApi_delTestpaper = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/delTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更新试卷
    exports.ResourceTestpaperApi_updateTestpaper = function(testpaperid,title,description,callback){
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/updateTestpaper",
   	 		data: {testpaperid:testpaperid,title:title,description:description},
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加试卷
    exports.ResourceTestpaperApi_addTestpaper = function(rid,title,description,type,folderid,callback){
   	 	var data = {rid:rid,title:title,description:description,type:type,folderid:folderid};
    	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/addTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个试卷
    exports.ResourceTestpaperApi_getTestpaper = function(testpaperid, callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/getTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某张试卷的试题
    exports.ResourceTestpaperApi_getSubjectList = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/getSubjectList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某张试卷的试题
    exports.ResourceTestpaperApi_getInteractSubjectList = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/getInteractSubjectList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取单个试题
    exports.ResourceTestpaperApi_getSubject = function(subjectid, callback){
    	var data = {subjectid:subjectid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/getSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除题目
    exports.ResourceTestpaperApi_delSubject = function(subjectid, callback){
    	var data = {subjectid:subjectid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/delSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //批量删除题目
    exports.ResourceTestpaperApi_delSubjectBat = function(subjectids, callback){
    	var data = {subjectids:subjectids};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/delSubjectBat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加判断题和选择题
    exports.ResourceTestpaperApi_addTFSubject = function(testpaperid,type,title,score,answer,options,sort,explanation,callback){
    	var data = {testpaperid:testpaperid,type:type,title:title,score:score,answer:answer,options:options,sort:sort,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST", 
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/addTFSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑判断题和选择题
    exports.ResourceTestpaperApi_editTFSubject = function(subjectid, title, score, optionsIDs, options,answer,sort,explanation,callback){
    	var data = {subjectid:subjectid,title:title,score:score,optionsIDs:optionsIDs,options:options,answer:answer,sort:sort,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/editTFSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增多选题
    exports.ResourceTestpaperApi_addMulSelectSubject = function(testpaperid,title,score,answer,options,sort,explanation,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,answer:answer,options:options,sort:sort,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/addMulSelectSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑多选题
    exports.ResourceTestpaperApi_editMulSelectSubject = function(subjectid, title, score, optionsIDs, options,answer,sort,explanation,callback){
    	var data = {subjectid:subjectid,title:title,score:score,answer:answer,options:options,optionsIDs:optionsIDs,sort:sort,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/editMulSelectSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加主观题
    exports.ResourceTestpaperApi_addSubjective = function(testpaperid,title,score,sort,answer,explanation,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,sort:sort,answer:answer,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/addSubjective",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增不定项选择题
    exports.ResourceTestpaperApi_addUnfinedTermSubject = function(testpaperid,title,score,answer,options,sort,explanation,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,answer:answer,options:options,sort:sort,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/addUnfinedTermSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑不定项选择题
    exports.ResourceTestpaperApi_editUnfinedTermSubject = function(subjectid, title, score, optionsIDs, options,answer,sort,explanation,callback){
    	var data = {subjectid:subjectid,title:title,score:score,answer:answer,options:options,optionsIDs:optionsIDs,sort:sort,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/editUnfinedTermSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加文件题
    exports.ResourceTestpaperApi_addFileSubject = function(testpaperid,title,score,sort,answer,explanation,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,sort:sort,answer:answer,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/addFileSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑文件题
    exports.ResourceTestpaperApi_editFileSubject = function(subjectid,title,score,sort,answer,explanation,callback){
    	var data = {subjectid:subjectid,title:title,score:score,sort:sort,answer:answer,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/editFileSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑主观题
    exports.ResourceTestpaperApi_editSubjective = function(subjectid,title,score,sort,answer,explanation,callback){
    	var data = {subjectid:subjectid,title:title,score:score,sort:sort,answer:answer,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/editSubjective",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加填空题
    exports.ResourceTestpaperApi_addFill = function(testpaperid,title,score,sort,answer,explanation,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,sort:sort,answer:answer,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/addFill",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑填空题
    exports.ResourceTestpaperApi_editFill = function(subjectid,title,score,sort,answer,explanation,callback){
    	var data = {subjectid:subjectid,title:title,score:score,sort:sort,answer:answer,explanation:explanation};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/editFill",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加段落说明
    exports.ResourceTestpaperApi_addCut = function(testpaperid,title,sort,callback){
    	var data = {testpaperid:testpaperid,title:title,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/addCut",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑段落题
    exports.ResourceTestpaperApi_editCut = function(subjectid,title,sort,callback){
    	var data = {subjectid:subjectid,title:title,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/editCut",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //排序更新
    exports.ResourceTestpaperApi_updateSortBat = function(subjectids,callback){
    	var data = {subjectids:subjectids};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/updateSortBat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将备课区里的某个试卷发布到 某个班级
    exports.ResourceTestpaperApi_publishTestpaper = function(testpaperid,courseid,callback){
    	var data = {testpaperid:testpaperid,courseid:courseid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/publishTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //从资料处，导入了课程中去，并且可以修改title,description
    exports.ResourceTestpaperApi_copyTestpaper = function(testpaperid,courseid,title,description,callback){
    	var data = {testpaperid:testpaperid,courseid:courseid,title:title,description:description};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/copyTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将某个课程的某张试卷，放到备课区某个资源区里面
    exports.ResourceTestpaperApi_putTestpaperToResource = function(testpaperid,rid,callback){
    	var data = {testpaperid:testpaperid,rid:rid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/putTestpaperToResource",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将某个课程的某张试卷，放到备课区某个资源区里面，试卷分享的方式进行
    exports.ResourceTestpaperApi_putTestpaperToResourceByShare = function(testpaperid,rid,callback){
    	var data = {testpaperid:testpaperid,rid:rid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/putTestpaperToResourceByShare",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //将某个课程的某张试卷，放到备课区某个资源区里面，试卷分享的方式进行
    exports.ResourceTestpaperApi_putResourceTestpaperToResourceByShare = function(rid,testpaperid,shareid,callback){
    	var data = {rid:rid,testpaperid:testpaperid,shareid:shareid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/putResourceTestpaperToResourceByShare",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
	   	 			callback(data);
	   	 		}
   	 		}
   	 	});
    };
    //复制备课区的试题到某个课程的试卷里去
    exports.ResourceTestpaperApi_copyResourceSubjectsToCourse = function(idlists,testpaperid,callback){
    	var data = {idlists:idlists,testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/copyResourceSubjectsToCourse",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
	   	 			callback(data);
	 			}
   	 		}
   	 	});
    };
    //复制备课区的试题到某个备课区的试卷里去
    exports.ResourceTestpaperApi_copyResourceSubjectsToResource = function(idlists,testpaperid,callback){
    	var data = {idlists:idlists,testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/copyResourceSubjectsToResource",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
	   	 			callback(data);
	 			}
   	 		}
   	 	});
    };
    //将某个备课区里面的试题，复制到 某个班级里面的某个互动ppt的某一页去
    exports.ResourceTestpaperApi_copyResourceSubjectsToCourseInteractPPT = function(interactid,pageindex,idlists,callback){
    	var data = {interactid:interactid,pageindex:pageindex,idlists:idlists};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/copyResourceSubjectsToCourseInteractPPT",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
	   	 			callback(data);
	 			}
   	 		}
   	 	});
    };
    //将某个备课区里面的试题，复制到 某个班级里面的某个互动的某个环节去
    exports.ResourceTestpaperApi_copyResourceSubjectsToCourseInteractStep = function(stepid,idlists,callback){
    	var data = {stepid:stepid,idlists:idlists};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/copyResourceSubjectsToCourseInteractStep",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
	   	 			callback(data);
	 			}
   	 		}
   	 	});
    };
    //获取备课区里的某张试卷的题目标题列表
    exports.ResourceTestpaperApi_getSubjectTitleLists = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/getSubjectTitleLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个试卷的试题总数
    exports.ResourceTestpaperApi_getSubjectCount = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/getSubjectCount",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //随机生成新的试卷
    exports.ResourceTestpaperApi_newRandTestpaper = function(testpaperid,title,randArray,callback){
    	var data = {testpaperid:testpaperid,title:title,randArray:randArray};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/newRandTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //获取试卷的统计信息
    exports.ResourceTestpaperApi_getTestpaperInfoStat = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/getTestpaperInfoStat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //生成试卷的分享链接
    exports.ResourceTestpaperApi_generateShare = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/generateShare",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //取消分享链接
    exports.ResourceTestpaperApi_cancleShare = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTestpaperApi/cancleShare",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //批量更新试卷从某个题号到某个题号的分值
	exports.ResourceTestpaperApi_updateScoreBat = function(testpaperid,beginNo,endNo,subjectScore,callback){
		var data = {testpaperid:testpaperid,beginNo:beginNo,endNo:endNo,subjectScore:subjectScore};
		$.ajax({
			type: "POST",
			url: exports.APIURL+"/ResourceTestpaperApi/updateScoreBat",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback != null){
					callback(data);
				}
			}
		});
	};
	exports.ResourceTestpaperApi_extractSubject = function(targeid,testpaperids,subjectType,subjectNums,callback){
		var data = {targeid:targeid,testpaperids:testpaperids,subjectType:subjectType,subjectNums:subjectNums};
		$.ajax({
			type: "POST",
			url: exports.APIURL+"/ResourceTestpaperApi/extractSubject",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback != null){
					callback(data);
				}
			}
		});
	};
	exports.ResourceTestpaperApi_clearSubjectByType = function(testpaperid,subjectType,callback){
		var data = {testpaperid:testpaperid,subjectType:subjectType};
		$.ajax({
			type: "POST",
			url: exports.APIURL+"/ResourceTestpaperApi/clearSubjectByType",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback != null){
					callback(data);
				}
			}
		});
	};

  //获取备课区的测试的文件夹列表
    exports.ResourceTestpaperApi_getTestpaperToResourceFolderList = function(rid,callback){
      var data = {rid:rid};
      $.ajax({
        type: "post",
        url: exports.APIURL+"/ResourceTestpaperApi/getTestpaperToResourceFolderList",
        data: data,
        dataType: "json",
        success: function(data){
        if(callback != null){
          callback(data);
        }
        }
      });
    };
    //生成测试试卷的分享链接
    exports.ResourceTestpaperApi_generateTestpaperShare = function(rid,testpaperid,endtime,callback){
      var data = {rid:rid,testpaperid:testpaperid,endtime:endtime};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceTestpaperApi/generateTestpaperShare",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //生成测试试卷的取消分享链接
    exports.ResourceTestpaperApi_cancleTestpaperShare = function(testpaperid,callback){
      var data = {testpaperid:testpaperid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceTestpaperApi/cancleTestpaperShare",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //生成测试试卷的分享链接
    exports.ResourceTestpaperApi_generateTestpaperShareFolder = function(rid,testpaperid,endtime,callback){
      var data = {rid:rid,testpaperid:testpaperid,endtime:endtime};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceTestpaperApi/generateTestpaperShareFolder",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //生成测试试卷的取消分享链接
    exports.ResourceTestpaperApi_cancleTestpaperShareFolder = function(rid,testpaperid,callback){
      var data = {rid:rid,testpaperid:testpaperid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceTestpaperApi/cancleTestpaperShareFolder",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    /**
     * 查询出试卷文件夹下面的文件列表
     * @param     rid       [备课区id]
     * @param     nextType  [类型]
     * @param     folderid  [文件夹id]
     */
    exports.ResourceTestpaperApi_getTestpaperWorkList = function(rid,folderid,callback){
      var data = {rid:rid,folderid:folderid};
      $.ajax({
        type: "GET",
        url: exports.APIURL+"/ResourceTestpaperApi/getTestpaperWorkList",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    /**************备课区话题模块*************************/
    //获取话题列表
    exports.ResourceTopicApi_lists = function(rid,callback){
    	var data = {rid:rid};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/ResourceTopicApi/lists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
						callback(data);
	 				}	
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加话题
    exports.ResourceTopicApi_addTopic = function(rid,title,content,attachment,folderid,callback){
    	var data = {rid:rid,title:title,content:content,attachment:attachment,folderid:folderid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTopicApi/addTopic",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //获取某个话题信息
    exports.ResourceTopicApi_getTopic = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/ResourceTopicApi/getTopic",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //更新话题
    exports.ResourceTopicApi_updateTopic = function(id,title,content,attachment,callback){
    	var data = {id:id,title:title,content:content,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTopicApi/updateTopic",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //移动话题到某个备课区
    exports.ResourceTopicApi_moveTopic = function(id,rid,callback){
    	var data = {id:id,rid:rid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTopicApi/moveTopic",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //删除话题
    exports.ResourceTopicApi_delTopic = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTopicApi/delTopic",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //发布到指定班级
    exports.ResourceTopicApi_publishTopicToCourse = function(topicid,courseid,callback){
    	var data = {topicid:topicid,courseid:courseid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTopicApi/publishTopicToCourse",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //班级的话题保存到备课区
    exports.ResourceTopicApi_putTopicToResource = function(topicid,rid,callback){
    	var data = {topicid:topicid,rid:rid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceTopicApi/putTopicToResource",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //获取备课区的话题的文件夹列表
    exports.ResourceTopicApi_getTopicToResourceFolderList = function(rid,callback){
      var data = {rid:rid};
      $.ajax({
        type: "post",
        url: exports.APIURL+"/ResourceTopicApi/getTopicToResourceFolderList",
        data: data,
        dataType: "json",
        success: function(data){
        if(callback != null){
          callback(data);
        }
        }
      });
    };
     //生成话题的分享链接
    exports.ResourceTopicApi_generateTopicShare = function(rid,topicid,endtime,callback){
      var data = {rid:rid,topicid:topicid,endtime:endtime};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceTopicApi/generateTopicShare",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //生成测试试卷的取消分享链接
    exports.ResourceTopicApi_cancleTopicShare = function(topicid,callback){
      var data = {topicid:topicid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceTopicApi/cancleTopicShare",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };

    //生成话题的分享链接
    exports.ResourceTopicApi_generateTopicShareFolder = function(rid,topicid,endtime,callback){
      var data = {rid:rid,topicid:topicid,endtime:endtime};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceTopicApi/generateTopicShareFolder",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //生成测试试卷的取消分享链接
    exports.ResourceTopicApi_cancleTopicShareFolder = function(rid,topicid,callback){
      var data = {rid:rid,topicid:topicid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceTopicApi/cancleTopicShareFolder",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    /**
     * 查询出作业文件夹下面的文件列表
     * @param     rid       [备课区id]
     * @param     nextType  [类型]
     * @param     folderid  [文件夹id]
     */
    exports.ResourceTopicApi_getTopicWorkList = function(rid,folderId,callback){
      var data = {rid:rid,folderid:folderId};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceTopicApi/getTopicWorkList",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //将备课区的某个话题保存到某个备课区
    exports.ResourceTopicApi_putResourceTopicToResourceByShare = function(rid,topicid,shareid,callback){
      var data = {rid:rid,topicid:topicid,shareid:shareid};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceTopicApi/putResourceTopicToResourceByShare",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    /*******************备课区分享模块**********************/
    //获取个人备课区我的有效分享
    exports.ResourceShareApi_getResourceMyEffectiveShareList = function(rid,callback){
      var data = {};
      $.ajax({
        type: "GET",
        url: exports.APIURL+"/ResourceShareApi/getResourceMyEffectiveShareList",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //获取个人备课区我的失效分享
    exports.ResourceShareApi_getResourceMyInvalidShareList = function(rid,callback){
      var data = {rid:rid};
      $.ajax({
        type: "GET",
        url: exports.APIURL+"/ResourceShareApi/getResourceMyInvalidShareList",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //获取小组备课区我的有效分享
    exports.ResourceShareApi_getGroupResourceMyEffectiveShareList = function(groupid,callback){
      var data = {groupid:groupid};
      $.ajax({
        type: "GET",
        url: exports.APIURL+"/ResourceShareApi/getGroupResourceMyEffectiveShareList",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //获取小组备课区我的失效分享
    exports.ResourceShareApi_getGroupResourceMyInvalidShareList = function(groupid,callback){
      var data = {groupid:groupid};
      $.ajax({
        type: "GET",
        url: exports.APIURL+"/ResourceShareApi/getGroupResourceMyInvalidShareList",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //将分享取消
    exports.ResourceShareApi_cancleMyShare = function(rid,idList,callback){
      var data = {rid:rid,idList:idList};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceShareApi/cancleMyShare",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    //获取备课区我的分享删除失效分享
    exports.ResourceShareApi_delResourceCancleMyShare = function(rid,idList,callback){
      var data = {rid:rid,idList:idList};
      $.ajax({
        type: "POST",
        url: exports.APIURL+"/ResourceShareApi/delResourceCancleMyShare",
        data: data,
        dataType: "json",
        success: function(data){
          if(data.status == 1){
            if(callback != null){
                callback(data);
            }
          }else{
            plugin.openMsg(data.info,1);
          }
        }
      });
    };
    /******************VIP接口*************************/
    //判断当前用户是否为VIP用户
    exports.VipApi_isVip = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/VipApi/isVip",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //判断是不是课程vip
    exports.VipApi_isCourseVip = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/VipApi/isCourseVip",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    /****************邀请接口*********************/
    //向某些邮件发送邀请，多个邮箱用,分割开来
    exports.InviteApi_sendEmail = function(email,content,callback){
    	var data = {email:email,content:content};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InviteApi/sendEmail",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //获取已经邀请注册的老师的名单
    //state 1表示 未完成  2表示未通过审核  3表示已获取
    exports.InviteApi_getLists = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/InviteApi/getLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    /**************2016 VIP活动接口********************/
    //活动弹窗是否已经被关闭过
    exports.vipActivityApi_isRead = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/VipActivityApi/isRead",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将活动弹窗标记为已读
    exports.vipActivityApi_readIt = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/VipActivityApi/readIt",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //vip用户中心的接口
    exports.userApi_getUserVipSetting = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/UserApi/getUserVipSetting",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取vip领取的状态
    exports.vipActivityApi_getVipActivityState = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/VipActivityApi/getVipActivityState",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //领取vip
    exports.vipActivityApi_getVip = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/VipActivityApi/getVip",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**************VIP活动 2017接口********************/
    exports.vipActivity2017Api_getVipActivityState = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/VipActivity2017Api/getVipActivityState",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //领取vip
    exports.vipActivity2017Api_getVip = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/VipActivity2017Api/getVip",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /****************vip产品以及支付**********************/
    //获取vip产品列表
    exports.vipApi_getProductLists = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/VipApi/getProductLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取终生VIP产品列表
    exports.vipApi_getLifeLongProductLists = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/VipApi/getLifeLongProductLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取交易记录
    exports.vipApi_getTradingRecord = function(page,callback){
    	var data = {page:page};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/VipApi/getTradingRecord",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个vip产品的微信支付链接
    exports.PayApi_getWechatPayUrl = function(productid,callback){
    	var data = {productid:productid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PayApi/getWechatPayUrl",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个vip产品的支付宝支付链接
    exports.PayApi_aliPay = function(productid,callback){
    	var data = {productid:productid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PayApi/aliPay",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //判断某个订单是否被支付成功
    exports.PayApi_queryWxOrder = function(orderNo,callback){
    	var data = {orderNo:orderNo};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PayApi/queryWxOrder",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个成功订单的信息（支付成功之后调用）
    exports.PayApi_getOrderNoSuccess = function(orderNo,callback){
    	var data = {orderNo:orderNo};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PayApi/getOrderNoSuccess",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /******************账号申诉*****************/
    //学生申诉
    //account 表示账号，mobile表示手机号码，username表示用户名 stno表示学号，picid表示证件附件id值，code表示手机验证码
    exports.AppealApi_studentAppeal = function(account,mobile,username,stno,picid,code,callback){
    	var data = {account:account,mobile:mobile,username:username,stno:stno,picid:picid,code:code};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/AppealApi/studentAppeal",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
				}
   	 		}
   	 	});
    };
    //老师申诉
    //account 表示账号，mobile表示手机号码，username表示用户名 school表示学校，picid表示证件附件id值，code表示手机验证码
    exports.AppealApi_teacherAppeal = function(account,mobile,coursename,username,school,picid,code,callback){
    	var data = {account:account,mobile:mobile,username:username,coursename:coursename,school:school,picid:picid,code:code};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/AppealApi/teacherAppeal",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
				}
   	 		}
   	 	});
    };
    /******************引导*****************/
    //将某个引导设置为完成
    exports.TourApi_setTourFinish = function(type,callback){
    	var data = {type:type};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TourApi/setTourFinish",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
				}
   	 		}
   	 	});
    };
    //获取某个引导是否完成
    exports.TourApi_isTour = function(courseid,type,callback){
    	var data = {courseid:courseid,type:type};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TourApi/isTour",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
				}
   	 		}
   	 	});
    };
    /****************互动ppt的接口********************/
    //获取某个互动的ppt的幻灯片列表(所有幻灯片)
	exports.InteractPPTApi_listSlides = function(interactid,callback){
		var data = {interactid:interactid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/InteractPPTApi/listSlides",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//列出有"有互动"的幻灯片列表
	exports.InteractPPTApi_listInteractSlides = function(interactid,callback){
		var data = {interactid:interactid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/InteractPPTApi/listInteractSlides",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//列出有"有互动"并且参与的学生的人数不等于0 的  幻灯片列表（可以用于生成考勤）
	exports.InteractPPTApi_listParticipateSlides = function(interactid,callback){
		var data = {interactid:interactid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/InteractPPTApi/listParticipateSlides",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
    // 添加判断题 和 单选题，这两个的逻辑是一致的
	//type 1表示判断题 2表示选择题  这里的逻辑与普通互动一样
	exports.InteractPPTApi_addTFSubject = function(interactid,pageindex,type,title,answer,options,sort,callback){
		var data = {interactid:interactid,pageindex:pageindex,type:type,title:title,answer:answer,options:options,sort:sort};
		$.ajax({
			type: "POST",
			async: false,
			url: exports.APIURL+"/InteractPPTApi/addTFSubject",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
    //新增多选题
    exports.InteractPPTApi_addMulSelectSubject = function(interactid,pageindex,title,answer,options,sort,callback){
    	var data = {interactid:interactid,pageindex:pageindex,title:title,answer:answer,options:options,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/InteractPPTApi/addMulSelectSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加主观题(讨论题)
    exports.InteractPPTApi_addSubjective = function(interactid,pageindex,title,sort,answer,callback){
    	var data = {interactid:interactid,pageindex:pageindex,title:title,sort:sort,answer:answer};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/InteractPPTApi/addSubjective",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增单选题  投票类型 不需要答案
	exports.InteractPPTApi_addTFVetoSubject = function(interactid,pageindex,type,title,options,sort,callback){
		var data = {interactid:interactid,pageindex:pageindex,type:type,title:title,options:options,sort:sort};
		$.ajax({
			type: "POST",
			async: false,
			url: exports.APIURL+"/InteractPPTApi/addTFVetoSubject",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
    //新增多选题 投票类型  不需要答案
    exports.InteractPPTApi_addMulSelectVetoSubject = function(interactid,pageindex,title,options,sort,callback){
    	var data = {interactid:interactid,pageindex:pageindex,title:title,options:options,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/InteractPPTApi/addMulSelectVetoSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增数字评价题
    exports.InteractPPTApi_addDigitMark = function(interactid,pageindex, title, options,scores,sort,callback){
    	var data = {interactid:interactid,pageindex:pageindex,title:title,options:options,scores:scores,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/InteractPPTApi/addDigitMark",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑数值评价题
    exports.InteractPPTApi_editDigitMark = function(subjectid, title, optionsIDs, options, scores, sort,callback){
    	var data = {subjectid:subjectid,title:title,options:options,optionsIDs:optionsIDs,scores:scores,sort:sort};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/InteractPPTApi/editDigitMark",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加匿名开放题
    exports.InteractPPTApi_addAnnoyOpen = function(interactid,pageindex,title,sort,answer,callback){
    	var data = {interactid:interactid,pageindex:pageindex,title:title,sort:sort,answer:answer};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/InteractPPTApi/addAnnoyOpen",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加拍照题
    exports.InteractPPTApi_addPhotoSubject = function(interactid,pageindex,title,sort,answer,callback){
    	var data = {interactid:interactid,pageindex:pageindex,title:title,sort:sort,answer:answer};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/InteractPPTApi/addPhotoSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //选择指定的互动，生成考勤
    //pageindexs指是ppt的页，多页，以'|'分割开来
    exports.InteractPPTApi_createAttence = function(interactid,pageindexs, callback){
    	var data = {interactid:interactid, pageindexs:pageindexs};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InteractPPTApi/createAttence",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个互动的某页ppt的试题列表
    exports.InteractPPTApi_getSubjectLists = function(interactid,pageindex, callback){
    	var data = {interactid:interactid, pageindex:pageindex};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/InteractPPTApi/getSubjectLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //判断某个互动某页ppt是否可以移动
    exports.InteractPPTApi_isCanMove = function(interactid,pageindex, callback){
    	var data = {interactid:interactid, pageindex:pageindex};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/InteractPPTApi/isCanMove",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将某页的互动PPT移动到某一页里去
    exports.InteractPPTApi_moveStep = function(interactid,pageindex,distIndex,callback){
    	var data = {interactid:interactid, pageindex:pageindex, distIndex:distIndex};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/InteractPPTApi/moveStep",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
	   	 			callback(data);
	   	 		}
   	 		}
   	 	});
    };
    //下载ppt文件
    exports.InteractPPTApi_downloadppt = function(interactid,callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/InteractPPTApi/downloadppt",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个互动的ppt的预览地址
    exports.InteractPPTApi_getPPTReviewUrl = function(interactid, callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/InteractPPTApi/getPPTReviewUrl",
   	 		data: data,
   	 		dataType: "json",
			async:false,
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //复制并添加某个互动
    //interactid 复制源，courseid是目标课程id值
    exports.InteractPPTApi_copyInteract = function(interactid,courseid,callback){
    	var data = {interactid:interactid,courseid:courseid};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/InteractPPTApi/copyInteract",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	 				callback(data);
   	 			}
   	 		}
   	 	});
    };
    //获取要导入的课程的所有互动的情况
    exports.InteractPPTApi_importList = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "get",
   	 		url: exports.APIURL+"/InteractPPTApi/importList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
	//获取某页ppt的互动环节信息
	exports.InteractPPTApi_getSlideInfo = function(interactid,pageindex,callback){
		var data = {interactid:interactid,pageindex:pageindex};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/InteractPPTApi/getSlideInfo",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback != null){
					callback(data);
				}
			}
		});
	};
	//复制某个题目到某页幻灯片里面去
	exports.InteractPPTApi_copySubjects = function(interactid,pageindex,idlists,callback){
		var data = {interactid:interactid,pageindex:pageindex,idlists:idlists};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/InteractPPTApi/copySubjects",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback != null){
					callback(data);
				}
			}
		});
	};
	//复制某个题目到某页幻灯片里面去
	exports.InteractPPTApi_copySubjectsToResource = function(interactid,pageindex,idlists,callback){
		var data = {interactid:interactid,pageindex:pageindex,idlists:idlists};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/InteractPPTApi/copySubjectsToResource",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback != null){
					callback(data);
				}
			}
		});
	};
	//点击的时候，获取某个互动的列表(试题互动和PPT互动都适用)
    //type 0表示试题互动 1表示PPT互动
	exports.InteractApi_getInteractListsByType = function(courseid,type,callback){
		var data = {courseid:courseid,type:type};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/InteractApi/getInteractListsByType",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//授课时间的收集
	exports.InteractPPTApi_teachTimeLog = function(id,pageindex,callback){
		var data = {id:id,pageindex:pageindex};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/InteractPPTApi/teachTimeLog",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback != null){
					callback(data);
				}
			}
		});
	};
	//获取加课二维码
	exports.InteractPPTApi_getQrCode = function(courseid,callback){
		var data = {courseid:courseid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/InteractPPTApi/getQrCode",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback != null){
					callback(data);
				}
			}
		});
	};
	//获取档幕的topic和groupid的配置情况
	exports.InteractPPTApi_getBarrageMqttConfig = function(callback){
		var data = {};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/InteractPPTApi/getBarrageMqttConfig",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback != null){
					callback(data);
				}
			}
		});
	};
	//获取弹幕的设置情况
	exports.InteractPPTApi_getBarrageSetting = function(interactid,callback){
		var data = {interactid:interactid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/InteractPPTApi/getBarrageSetting",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback != null){
					callback(data);
				}
			}
		});
	};
	//获取师生同屏的设置
	exports.InteractPPTApi_getWidthTheScreenSetting = function(interactid,callback){
		var data = {interactid:interactid};
		$.ajax({
			type: "GET",
			url: exports.APIURL+"/InteractPPTApi/getWidthTheScreenSetting",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback != null){
					callback(data);
				}
			}
		});
	};
	exports.InteractPPTApi_setWidthTheScreenState = function(interactid,state,callback){
		var data = {interactid:interactid,state:state};
		$.ajax({
			type: "POST",
			url: exports.APIURL+"/InteractPPTApi/setWidthTheScreenState",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback != null){
					callback(data);
				}
			}
		});
	};
	//设置某个互动的弹幕状态
	exports.InteractPPTApi_setBarrageState = function(interactid,state,callback){
		var data = {interactid:interactid,state:state};
		$.ajax({
			type: "POST",
			url: exports.APIURL+"/InteractPPTApi/setBarrageState",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//更新弹幕设置的透明度
	exports.InteractPPTApi_updateBarrageTransparencySetting = function(interactid,transparency,callback){
		var data = {interactid:interactid,transparency:transparency};
		$.ajax({
			type: "POST",
			url: exports.APIURL+"/InteractPPTApi/updateBarrageTransparencySetting",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//设置颜色
	exports.InteractPPTApi_updateBarrageColorSetting = function(interactid,color,callback){
		var data = {interactid:interactid,color:color};
		$.ajax({
			type: "POST",
			url: exports.APIURL+"/InteractPPTApi/updateBarrageColorSetting",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//设置弹幕防挡住
	exports.InteractPPTApi_updateBarrageBlockSetting = function(interactid,block,callback){
		var data = {interactid:interactid,block:block};
		$.ajax({
			type: "POST",
			url: exports.APIURL+"/InteractPPTApi/updateBarrageBlockSetting",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//删除某个弹幕记录
	exports.InteractPPTApi_delBarrageHistory = function(id,callback){
		var data = {id:id};
		$.ajax({
			type: "POST",
			url: exports.APIURL+"/InteractPPTApi/delBarrageHistory",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取弹幕记录
	exports.InteractPPTApi_getBarrageHistoryAll= function(interactid,callback){
		var data = {interactid:interactid};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/InteractPPTApi/getBarrageHistoryAll",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	/************************文库****************************/
	//获取某一级的专业目录，默认parentid值为0，表示顶级目录
	exports.WenkuApi_getCategory = function(parentid,callback){
		var data = {parentid:parentid};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/Wenku/WenkuApi/getCategory",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取专业类别的树状结果
	exports.WenkuApi_getCategoryTree = function(callback){
		var data = {};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/Wenku/WenkuApi/getCategoryTree",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取资料类别列表
	exports.WenkuApi_getDocumentTypeLists = function(callback){
		var data = {};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/Wenku/WenkuApi/getDocumentTypeLists",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取某个文档的信息
	exports.WenkuApi_getDocumentInfo = function(id,callback){
		var data = {id:id};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/Wenku/WenkuApi/getDocumentInfo",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取某个文档的第几页
	exports.WenkuApi_getDocumentPageIndex = function(id,page,callback){
		var data = {id:id,page:page};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/Wenku/WenkuApi/getDocumentPageIndex",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//搜索，核心部分
	//cid为专业id值，默认为空，typeid为资源类别id值，默认为空
	//hot是热度，默认为空，1表示降序 2表示升序
	//time表示时间，默认为空，1表示降序，2表示升序
	exports.WenkuApi_search = function(txt,cid,typeid,hot,time,page,callback){
		var data = {txt:txt,cid:cid,typeid:typeid,hot:hot,time:time,page:page};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/Wenku/WenkuApi/search",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//用户点击查看文档的时候，调用此接口一次，用于记录阅读次数
	exports.WenkuApi_addview = function(id,callback){
		var data = {id:id};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/Wenku/WenkuApi/addview",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取下载之前弹窗的信息，会返回state 0表示不是vip，1表示这个月的下载次数超过了30次
	exports.WenkuApi_prepareDownload = function(id,callback){
		var data = {id:id};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/Wenku/WenkuApi/prepareDownload",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	
	//获取下载记录,获取第几页的下载记录，默认page=1
	exports.WenkuApi_getDownloadList = function(page,callback){
		var data = {page:page};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/Wenku/WenkuApi/getDownloadList",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	
	//猜您喜欢
	exports.WenkuApi_suggest = function(callback){
		var data = {};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/Wenku/WenkuApi/suggest",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	
	//搜索日志
	exports.WenkuApi_searchhistory = function(callback){
		var data = {};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/Wenku/WenkuApi/searchhistory",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//相关文档推荐
	exports.WenkuApi_suggestDocument = function(docid,page,callback){
		var data = {docid:docid,page:page};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/Wenku/WenkuApi/suggestDocument",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//新增用户上传的文档
	exports.WenkuApi_addUserDocument = function(fileid,title,desc,cid,typeid,schoolid,callback){
		var data = {fileid:fileid,title:title,desc:desc,cid:cid,typeid:typeid,schoolid:schoolid};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/Wenku/WenkuApi/addUserDocument",
			data: data,
			dataType: "json",
			success: function(data){
				if(callback != null){
					callback(data);
				}
			}
		});
	};
	//获取某个用户的上传的文件的列表
	exports.WenkuApi_listsUserDocument = function(page,callback){
		var data = {page:page};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/Wenku/WenkuApi/listsUserDocument",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取其他用户的上传的文件的列表
	exports.WenkuApi_listsOtherUserDocument = function(uid,page,callback){
		var data = {uid:uid,page:page};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/Wenku/WenkuApi/listsOtherUserDocument",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取学校列表
	exports.WenkuApi_getCollegeLists = function(callback){
		var data = {};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/Wenku/WenkuApi/getCollegeLists",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//收藏某个文档
	exports.WenkuApi_addFavorite = function(docid,callback){
		var data = {docid:docid};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/Wenku/WenkuApi/addFavorite",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//取消收藏某个文档
	exports.WenkuApi_cancleFavorite = function(docid,callback){
		var data = {docid:docid};
		$.ajax({
			type: "post",
			url: exports.APIURL+"/Wenku/WenkuApi/cancleFavorite",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	
	//列出所有的收藏列表
	exports.WenkuApi_getFavoriteLists = function(pageIndex,callback){
		var data = {pageIndex:pageIndex};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/Wenku/WenkuApi/getFavoriteLists",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
	//获取积分流水
	exports.UserScoreApi_getScoreFlow = function(callback){
		var data = {};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/UserScoreApi/getScoreFlow",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
    /****************互动环节批改api*****************/
    exports.ReviewInteractApi_lists = function(stepid,grade,callback){
    	var data = {stepid:stepid,grade:grade};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewInteractApi/lists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //搜索
    exports.ReviewInteractApi_search = function(stepid,txt,callback){
    	var data = {stepid:stepid,txt:txt};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewInteractApi/search",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //重阅客观题
    exports.ReviewInteractApi_reviewStepAgain = function(stepid,callback){
    	var data = {stepid:stepid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewInteractApi/reviewStepAgain",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个学生的某张试卷情况
    exports.ReviewInteractApi_getStudentStep = function(stepid,studentid,callback){
    	var data = {stepid:stepid,studentid:studentid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewInteractApi/getStudentStep",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //给分
    exports.ReviewInteractApi_giveSubjectScore = function(subjectid,studentid,score,callback){
    	var data = {subjectid:subjectid,studentid:studentid,score:score};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewInteractApi/giveSubjectScore",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取到本地的处理
    exports.ReviewInteractApi_analyze = function(stepid,type,callback){
    	var data = {stepid:stepid,type:type};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewInteractApi/analyze",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取到本地的处理
    exports.ReviewInteractApi_getTypeLists = function(stepid,callback){
    	var data = {stepid:stepid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewInteractApi/getTypeLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*******************学生VIP特权**********************/
    //获取作业查重率
    exports.HomeworkApi_getHomeworkCheckRepeatInfo = function(homeworkid,callback){
    	var data = {homeworkid:homeworkid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/HomeworkApi/getHomeworkCheckRepeatInfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	   	 		}
   	 		}
   	 	});
    };
    //查看谁提交了
    exports.HomeworkApi_getHandupListsVip = function(homeworkid,callback){
    	var data = {homeworkid:homeworkid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/HomeworkApi/getHandupListsVip",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	   	 		}
   	 		}
   	 	});
    };
    /**************平时成绩管理接口*********************/
    //获取某个课程所有平时成绩的列表
    exports.RegularGradeApi_getLists = function(courseid,type,callback){
    	var data = {courseid:courseid,type:type};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/RegularGradeApi/getLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	   	 		}
   	 		}
   	 	});
    };
    //添加平时成绩
    exports.RegularGradeApi_addRegularGrade = function(courseid,title,fullscore,display,gradelists,type,callback){
   	 	var data = {courseid:courseid,title:title,fullscore:fullscore,display:display,gradelists:gradelists,type:type};
    	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/RegularGradeApi/addRegularGrade",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
    			if(callback){
    				callback(data);
    			}
   	 		}
   	 	});
    };
    //更新平时成绩
    exports.RegularGradeApi_updateRegularGrade = function(gradeid,title,fullscore,display,gradelists,callback){
    	var data = {gradeid:gradeid,title:title,fullscore:fullscore,display:display,gradelists:gradelists};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/RegularGradeApi/updateRegularGrade",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //平时成绩，搜索某个学生的数据
    exports.RegularGradeApi_search = function(courseid, txt, groupid,type,callback){
    	var data = {courseid:courseid,txt:txt,groupid:groupid,type:type};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/RegularGradeApi/search",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    //删除掉某次平时成绩
    exports.RegularGradeApi_delRegularGrade = function(gradeid, callback){
    	var data = {gradeid:gradeid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/RegularGradeApi/delRegularGrade",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    //给成绩
    exports.RegularGradeApi_giveScore = function(gradeid,studentid,score,callback){
    	var data = {gradeid:gradeid,studentid:studentid,score:score};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/RegularGradeApi/giveScore",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    /*********************预习任务管理************************/
    //发布某个预习
    exports.PrestudyTaskManageApi_publishPreStudyTask = function(interactid,callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrestudyTaskManageApi/publishPreStudyTask",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    //列出互动课件的图片和预习的情况
    exports.PrestudyTaskManageApi_listSlides = function(interactid,callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrestudyTaskManageApi/listSlides",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    //获取疑问列表
    exports.PrestudyTaskManageApi_getDoubtStudentLists = function(interactid,pageindex,callback){
    	var data = {interactid:interactid,pageindex:pageindex};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrestudyTaskManageApi/getDoubtStudentLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    //获取评论的列表
    exports.PrestudyTaskManageApi_getCommentStudentLists = function(interactid,pageindex,callback){
    	var data = {interactid:interactid,pageindex:pageindex};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrestudyTaskManageApi/getCommentStudentLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    //获取统计信息
    exports.PrestudyTaskManageApi_getStatinfo = function(interactid,groupid,txt,filter,callback){
    	var data = {interactid:interactid,groupid:groupid,txt:txt,filter:filter};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrestudyTaskManageApi/getStatinfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //获取某页ppt的疑问数和评论数
    exports.PrestudyTaskManageApi_getDoubtCommentStat = function(interactid,pageindex,callback){
    	var data = {interactid:interactid,pageindex:pageindex};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrestudyTaskManageApi/getDoubtCommentStat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //生成平时成绩
    exports.PrestudyTaskManageApi_generateRegularGrade = function(interactid,finishscore,nofinishscore,nodotaskscore,callback){
    	var data = {interactid:interactid,finishscore:finishscore,nofinishscore:nofinishscore,nodotaskscore:nodotaskscore};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/PrestudyTaskManageApi/generateRegularGrade",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    /************************微课管理*********************/
    exports.WeCourseApi_listSlides = function(interactid,callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/WeCourseApi/listSlides",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //添加新的页面
    exports.WeCourseApi_addPage = function(interactid,pageindex,type,mediaid,remark,callback){
    	var data = {interactid:interactid,pageindex:pageindex,type:type,mediaid:mediaid,remark:remark};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/WeCourseApi/addPage",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //编辑页面
    exports.WeCourseApi_editPage = function(interactid,pageindex,type,mediaid,callback){
    	var data = {interactid:interactid,pageindex:pageindex,type:type,mediaid:mediaid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/WeCourseApi/editPage",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //添加链接页面
    exports.WeCourseApi_addUrlPage = function(interactid,pageindex,type,url,callback){
    	var data = {interactid:interactid,pageindex:pageindex,type:type,url:url};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/WeCourseApi/addUrlPage",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //编辑链接页面
    exports.WeCourseApi_editUrlPage = function(interactid,pageindex,url,callback){
    	var data = {interactid:interactid,pageindex:pageindex,url:url};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/WeCourseApi/editUrlPage",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //添加互动试题的页面
    exports.WeCourseApi_addSubjectPage = function(interactid,pageindex,type,callback){
    	var data = {interactid:interactid,pageindex:pageindex,type:type};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/WeCourseApi/addSubjectPage",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //添加图文信息页面
    exports.WeCourseApi_addImgTextPage = function(interactid,pageindex,type,content,callback){
    	var data = {interactid:interactid,pageindex:pageindex,type:type,content:content};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/WeCourseApi/addImgTextPage",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //添加音频文件
    exports.WeCourseApi_addAudioPage = function(interactid,pageindex,type,mediaid,callback){
    	var data = {interactid:interactid,pageindex:pageindex,type:type,mediaid:mediaid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/WeCourseApi/addAudioPage",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.WeCourseApi_editAudioPage = function(interactid,pageindex,mediaid,callback){
    	var data = {interactid:interactid,pageindex:pageindex,mediaid:mediaid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/WeCourseApi/editAudioPage",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //编辑图文信息
    exports.WeCourseApi_editImgTextPage = function(interactid,pageindex,content,callback){
    	var data = {interactid:interactid,pageindex:pageindex,content:content};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/WeCourseApi/editImgTextPage",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //获取某页的信息
    exports.WeCourseApi_getPageInfo = function(interactid,pageindex,callback){
    	var data = {interactid:interactid,pageindex:pageindex};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/WeCourseApi/getPageInfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //标记上传的音频
    exports.WeCourseApi_updateAudio = function(interactid,pageindex,audioid,callback){
    	var data = {interactid:interactid,pageindex:pageindex,audioid:audioid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/WeCourseApi/updateAudio",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //清除音频
    exports.WeCourseApi_clearAudio = function(interactid,pageindex,callback){
    	var data = {interactid:interactid,pageindex:pageindex};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/WeCourseApi/clearAudio",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //删除页面
    exports.WeCourseApi_delPage = function(interactid,pageindex,callback){
    	var data = {interactid:interactid,pageindex:pageindex};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/WeCourseApi/delPage",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //排序
    exports.WeCourseApi_sortBat = function(idlists,callback){
    	var data = {idlists:idlists};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/WeCourseApi/sortBat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //检查ppt是否转码完成
    exports.WeCourseApi_checkPPTTransCode = function(fileid,callback){
    	var data = {fileid:fileid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/WeCourseApi/checkPPTTransCode",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //加入ppt转码中去
    exports.WeCourseApi_sendPPTTOTransCode = function(fileid,callback){
    	var data = {fileid:fileid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/WeCourseApi/sendPPTTOTransCode",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //做微课里的互动试题
    exports.WeCourseApi_doInteractSubject = function(stepid,interactid,pageindex,callback){
    	var data = {stepid:stepid,interactid:interactid,pageindex:pageindex};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/WeCourseApi/doInteractSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    /*********************MOOC**************************/
	exports.MoocApi_getCategoryTree = function(callback){
		var data = {};
		$.ajax({
			type: "get",
			url: exports.APIURL+"/Mooc/MoocApi/getCategoryTree",
			data: data,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					if(callback != null){
						callback(data);
					}
				}else{
					plugin.openMsg(data.info,1);
				}
			}
		});
	};
    exports.MoocApi_newCourse = function(title,categoryid,description,postid,sketch,callback){
    	var data = {title:title,categoryid:categoryid,
    				description:description,
    				postid:postid,sketch:sketch};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocApi/newCourse",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //删除课程
    exports.MoocApi_delCourse = function(moocid,callback){
    	var data = {moocid:moocid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocApi/delCourse",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   					if(callback){
   						callback(data);
   		 			}	
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    //发布课程
    exports.MoocApi_publishCourse = function(moocid,callback){
    	var data = {moocid:moocid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocApi/publishCourse",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   					if(callback){
   						callback(data);
   		 			}	
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    
    exports.MoocApi_getCourseInfo = function(moocid,callback){
    	var data = {moocid:moocid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocApi/getCourseInfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocApi_getCourseSketch = function(moocid,callback){
    	var data = {moocid:moocid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocApi/getCourseSketch",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocApi_updateCourseInfo = function(moocid,title,categoryid,description,postid,sketch,callback){
    	var data = {moocid:moocid,title:title,categoryid:categoryid,
    				description:description,postid:postid,sketch:sketch};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocApi/updateCourseInfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocApi_getMyMoocLists = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocApi/getMyMoocLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocApi_getMyPublishMoocLists = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocApi/getMyPublishMoocLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocApi_getLastestAnnounce = function(moocid,callback){
    	var data = {moocid:moocid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocApi/getLastestAnnounce",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocApi_publishAnnounce = function(moocid,content,callback){
    	var data = {moocid:moocid,content:content};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocApi/publishAnnounce",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocApi_tagCourseLearnState = function(moocid,state,callback){
    	var data = {moocid:moocid,state:state};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocApi/tagCourseLearnState",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocApi_getCourseLists = function(categoryid,page,ishot,callback){
    	var data = {categoryid:categoryid,page:page,ishot:ishot};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocApi/getCourseLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocApi_getRecommendLists = function(categoryid,callback){
    	var data = {categoryid:categoryid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocApi/getRecommendLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocApi_search = function(txt,page,callback){
    	var data = {txt:txt,page:page};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocApi/search",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocApi_getHotTags = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocApi/getHotTags",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocApi_getTeacherTeam = function(moocid,callback){
    	var data = {moocid:moocid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocApi/getTeacherTeam",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocApi_addAssistantTeacher = function(moocid,account,callback){
    	var data = {moocid:moocid,account:account};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocApi/addAssistantTeacher",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocApi_delAssistantTeacher = function(moocid,uid,callback){
    	var data = {moocid:moocid,uid:uid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocApi/delAssistantTeacher",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocApi_getLogLists = function(moocid,page,callback){
    	var data = {moocid:moocid,page:page};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocApi/getLogLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    /*********************MOOC章节**************************/
    exports.MoocChapterApi_addChapter = function(moocid,title,type,parentid,seq,callback){
    	var data = {moocid:moocid,title:title,type:type,parentid:parentid,seq:seq};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocChapterApi/addChapter",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocChapterApi_getChapterLists = function(moocid,callback){
    	var data = {moocid:moocid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocChapterApi/getChapterLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocChapterApi_updateChapterTitle = function(chapterid,title,callback){
    	var data = {chapterid:chapterid,title:title};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocChapterApi/updateChapterTitle",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocChapterApi_delChapter = function(chapterid,callback){
    	var data = {chapterid:chapterid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocChapterApi/delChapter",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocChapterApi_addChapterLesson = function(moocid,chapterid,fileid,remark,seq,callback){
    	var data = {moocid:moocid,chapterid:chapterid,fileid:fileid,remark:remark,seq:seq};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocChapterApi/addChapterLesson",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocChapterApi_sortLessonBat = function(lessonids,callback){
    	var data = {lessonids:lessonids};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocChapterApi/sortLessonBat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocChapterApi_sortChapterBat = function(chapterids,callback){
    	var data = {chapterids:chapterids};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocChapterApi/sortChapterBat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocChapterApi_updateLessonTitle = function(lessonid,title,callback){
    	var data = {lessonid:lessonid,title:title};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocChapterApi/updateLessonTitle",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocChapterApi_delLesson = function(lessonid,callback){
    	var data = {lessonid:lessonid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocChapterApi/delLesson",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocChapterApi_publishLesson = function(lessonid,state,callback){
    	var data = {lessonid:lessonid,state:state};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocChapterApi/publishLesson",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocChapterApi_publishChapter = function(chapterid,callback){
    	var data = {chapterid:chapterid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocChapterApi/publishChapter",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    /*********************MOOC学习**************************/
    exports.MoocLearnApi_joinMooc = function(moocid,callback){
    	var data = {moocid:moocid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocLearnApi/joinMooc",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   					if(callback){
   						callback(data);
   		 			}	
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    exports.MoocLearnApi_quitMooc = function(moocid,callback){
    	var data = {moocid:moocid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocLearnApi/quitMooc",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocLearnApi_getMyLearnChapterLists = function(moocid,callback){
    	var data = {moocid:moocid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocLearnApi/getMyLearnChapterLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocLearnApi_getPublishChapterLists = function(moocid,callback){
    	var data = {moocid:moocid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocLearnApi/getPublishChapterLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocLearnApi_addCourseEvaluate = function(moocid,star,comment,callback){
    	var data = {moocid:moocid,star:star,comment:comment};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocLearnApi/addCourseEvaluate",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocLearnApi_getCourseEvaluateLists = function(moocid,callback){
    	var data = {moocid:moocid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocLearnApi/getCourseEvaluateLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocLearnApi_getMyLearnMoocs = function(islearned,callback){
    	var data = {islearned:islearned};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocLearnApi/getMyLearnMoocs",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocLearnApi_getMyFavoriteMoocs = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocLearnApi/getMyFavoriteMoocs",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocLearnApi_getContinueLearnLesson = function(moocid,callback){
    	var data = {moocid:moocid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocLearnApi/getContinueLearnLesson",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    /*********************MOOC问答**************************/
    exports.MoocAskApi_getAskListsByLessonId = function(lessonid,isessence,callback){
    	var data = {lessonid:lessonid,isessence:isessence};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocAskApi/getAskListsByLessonId",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocAskApi_getAskListsByMoocId = function(moocid,isessence,callback){
    	var data = {moocid:moocid,isessence:isessence};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocAskApi/getAskListsByMoocId",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocAskApi_addAsk = function(moocid,lessonid,title,content,callback){
    	var data = {moocid:moocid,lessonid:lessonid,title:title,content:content};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocAskApi/addAsk",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocAskApi_getMyAskLists = function(type,callback){
    	var data = {type:type};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocAskApi/getMyAskLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocAskApi_getPostLists = function(askid,callback){
    	var data = {askid:askid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocAskApi/getPostLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocAskApi_addPost = function(askid,content,postid,callback){
    	var data = {askid:askid,content:content,postid:postid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocAskApi/addPost",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocAskApi_setEssence = function(askid,state,callback){
    	var data = {askid:askid,state:state};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocAskApi/setEssence",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.MoocAskApi_delAsk = function(askid,callback){
    	var data = {askid:askid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocAskApi/delAsk",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*********************MOOC评论**************************/
    exports.MoocCommentApi_getCommentListsByLessonId = function(lessonid,callback){
    	var data = {lessonid:lessonid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocCommentApi/getCommentListsByLessonId",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocCommentApi_getCommentListsByMoocId = function(moocid,isessence,page,callback){
    	var data = {moocid:moocid,isessence:isessence,page:page};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocCommentApi/getCommentListsByMoocId",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocCommentApi_addComment = function(moocid,lessonid,content,replyid,callback){
    	var data = {moocid:moocid,lessonid:lessonid,content:content,replyid:replyid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocCommentApi/addComment",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocCommentApi_delComment = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocCommentApi/delComment",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    /*********************MOOC收藏**************************/
    exports.MoocCourseFavoriteApi_addFavorite = function(moocid,callback){
    	var data = {moocid:moocid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocCourseFavoriteApi/addFavorite",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocCourseFavoriteApi_delFavorite = function(moocid,callback){
    	var data = {moocid:moocid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocCourseFavoriteApi/delFavorite",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    /*********************MOOC 课时学习记录**************************/
    exports.MoocLessonLearnApi_getLearnStatus = function(moocid,lessonid,callback){
    	var data = {moocid:moocid,lessonid:lessonid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocLessonLearnApi/getLearnStatus",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocLessonLearnApi_startLearnStatus = function(moocid,lessonid,callback){
    	var data = {moocid:moocid,lessonid:lessonid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocLessonLearnApi/startLearnStatus",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocLessonLearnApi_finishLearn = function(moocid,lessonid,callback){
    	var data = {moocid:moocid,lessonid:lessonid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/Mooc/MoocLessonLearnApi/finishLearn",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.MoocLessonLearnApi_getLesson = function(lessonid,callback){
    	var data = {lessonid:lessonid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Mooc/MoocLessonLearnApi/getLesson",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    /*********************预习任务管理************************/
    //判断某个预习任务是否发布了
    exports.PrestudyTaskApi_isPublishTask = function(interactid,callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrestudyTaskApi/isPublishTask",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    //获取列表
    exports.PrestudyTaskApi_getTaskLists = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrestudyTaskApi/getTaskLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    //发布某个预习
    exports.PrestudyTaskApi_publishPreStudyTask = function(interactid,callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrestudyTaskApi/publishPreStudyTask",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    //列出互动课件的图片和预习的情况
    exports.PrestudyTaskApi_listSlides = function(interactid,callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrestudyTaskApi/listSlides",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //列出互动课件的图片和预习的情况
    exports.PrestudyTaskApi_listSlidesByTaskid = function(taskid,callback){
    	var data = {taskid:taskid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrestudyTaskApi/listSlidesByTaskid",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    //获取疑问列表
    exports.PrestudyTaskApi_getDoubtStudentLists = function(interactid,pageindex,callback){
    	var data = {interactid:interactid,pageindex:pageindex};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrestudyTaskApi/getDoubtStudentLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    //获取评论的列表
    exports.PrestudyTaskApi_getCommentStudentLists = function(interactid,pageindex,callback){
    	var data = {interactid:interactid,pageindex:pageindex};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrestudyTaskApi/getCommentStudentLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});	
    };
    //获取统计信息
    exports.PrestudyTaskApi_getStatinfo = function(interactid,groupid,txt,callback){
    	var data = {interactid:interactid,groupid:groupid,txt:txt};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrestudyTaskApi/getStatinfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //获取某页ppt的疑问数和评论数
    exports.PrestudyTaskApi_getDoubtCommentStat = function(interactid,pageindex,callback){
    	var data = {interactid:interactid,pageindex:pageindex};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrestudyTaskApi/getDoubtCommentStat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //设置是否为有疑问
    exports.PrestudyTaskApi_setDoubtState = function(interactid,pageindex,state,callback){
    	var data = {interactid:interactid,pageindex:pageindex,state:state};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrestudyTaskApi/setDoubtState",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //开始预习某一个页面
    exports.PrestudyTaskApi_beginVisitPageIndex = function(interactid,pageindex,callback){
    	var data = {interactid:interactid,pageindex:pageindex};
   	 	$.ajax({
   	 		type: "GET",
   	 		async: true,
   	 		url: exports.APIURL+"/PrestudyTaskApi/beginVisitPageIndex",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //结束预习某个页面
    exports.PrestudyTaskApi_endVisitPageIndex = function(visitid,callback){
    	var data = {visitid:visitid};
   	 	$.ajax({
   	 		type: "GET",
   	 		async: true,
   	 		url: exports.APIURL+"/PrestudyTaskApi/endVisitPageIndex",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //获取预习的进度
    exports.PrestudyTaskApi_getVisitPostionCount = function(interactid,callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "GET",
   	 		async: true,
   	 		url: exports.APIURL+"/PrestudyTaskApi/getVisitPostionCount",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //获取已经预习的页面
    exports.PrestudyTaskApi_getVisitPostionLists = function(interactid,callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "GET",
   	 		async: true,
   	 		url: exports.APIURL+"/PrestudyTaskApi/getVisitPostionLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //判断是否开始预习了
    exports.PrestudyTaskApi_isStartStudyTask = function(interactid,callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "GET",
   	 		async: true,
   	 		url: exports.APIURL+"/PrestudyTaskApi/isStartStudyTask",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //开始预习
    exports.PrestudyTaskApi_startStudyTask = function(interactid,callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "GET",
   	 		async: true,
   	 		url: exports.APIURL+"/PrestudyTaskApi/startStudyTask",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //是否结束了预习
    exports.PrestudyTaskApi_isFinishStudyTask = function(interactid,callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "GET",
   	 		async: true,
   	 		url: exports.APIURL+"/PrestudyTaskApi/isFinishStudyTask",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //结束预习
    exports.PrestudyTaskApi_finishStudyTask = function(interactid,callback){
    	var data = {interactid:interactid};
   	 	$.ajax({
   	 		type: "GET",
   	 		async: true,
   	 		url: exports.APIURL+"/PrestudyTaskApi/finishStudyTask",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    //删除掉某条评论
    exports.PrestudyTaskApi_delComment = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "GET",
   	 		async: true,
   	 		url: exports.APIURL+"/PrestudyTaskApi/delComment",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //添加某条评论
    exports.PrestudyTaskApi_addComment = function(interactid,pageindex,comment,replyid,callback){
    	var data = {interactid:interactid,pageindex:pageindex,comment:comment,replyid:replyid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/PrestudyTaskApi/addComment",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    exports.PrestudyTaskApi_addCommentByAnonymous = function(interactid,pageindex,comment,replyid,anonymous,callback){
    	var data = {interactid:interactid,pageindex:pageindex,comment:comment,replyid:replyid,anonymous:anonymous};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/PrestudyTaskApi/addComment",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    /*********************抢答接口*******************/
    exports.AnswerRaceApi_getMqttConfig = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AnswerRaceApi/getMqttConfig",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //创建抢答任务
    exports.AnswerRaceApi_createRaceTask = function(courseid,limitnums,type,callback){
    	var data = {courseid:courseid,limitnums:limitnums,type:type};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/AnswerRaceApi/createRaceTask",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //结束抢答任务
    exports.AnswerRaceApi_endRace = function(raceid,callback){
    	var data = {raceid:raceid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/AnswerRaceApi/endRace",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    exports.AnswerRaceApi_getRaceTask = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AnswerRaceApi/getRaceTask",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    exports.AnswerRaceApi_getCurrentRaceTask = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AnswerRaceApi/getCurrentRaceTask",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    exports.AnswerRaceApi_getRaceStudentLists = function(raceid,callback){
    	var data = {raceid:raceid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AnswerRaceApi/getRaceStudentLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    exports.AnswerRaceApi_rushing = function(raceid,content,callback){
    	var data = {raceid:raceid,content:content};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/AnswerRaceApi/rushing",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    /**************提问接口**************/
    exports.InteractAskLogApi_addLog = function(courseid,type,uid,callback){
    	var data = {courseid:courseid,type:type,uid:uid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InteractAskLogApi/addLog",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    /****************机构文库版******************/
    exports.AgencyWenkuCategoryApi_lists = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Agencywenku/AgencyWenkuCategoryApi/lists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);	
   	 			}
   	 		}
   	 	});
    };
    exports.AgencyWenkuApi_getLastDocuments= function(top,callback){
    	var data = {top:top};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Agencywenku/AgencyWenkuApi/getLastDocuments",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);	
   	 			}
   	 		}
   	 	});
    };
    exports.AgencyWenkuApi_getRecommendDocs= function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Agencywenku/AgencyWenkuApi/getRecommendDocs",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);	
   	 			}
   	 		}
   	 	});
    };
    exports.AgencyWenkuApi_getDocument= function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Agencywenku/AgencyWenkuApi/getDocument",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);	
   	 			}
   	 		}
   	 	});
    };
    exports.AgencyWenkuApi_getDocumentFileInfo= function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Agencywenku/AgencyWenkuApi/getDocumentFileInfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);	
   	 			}
   	 		}
   	 	});
    };
    //获取搜索的推荐的下拉列表
    exports.AgencyWenkuApi_getSearchSuggest= function(query,callback){
    	var data = {query:query};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Agencywenku/AgencyWenkuApi/getSearchSuggest",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);	
   	 			}
   	 		}
   	 	});
    };
    exports.AgencyWenkuApi_search= function(txt,exttype,tags,hot,time,callback){
    	var data = {txt:txt,exttype:exttype,tags:tags,hot:hot,time:time};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Agencywenku/AgencyWenkuApi/search",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);	
   	 			}
   	 		}
   	 	});
    };
    exports.AgencyWenkuApi_favoriteDoc= function(docid,callback){
    	var data = {docid:docid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Agencywenku/AgencyWenkuApi/favoriteDoc",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);	
   	 			}
   	 		}
   	 	});
    };
    exports.AgencyWenkuApi_cancleFavoriteDoc= function(docid,callback){
    	var data = {docid:docid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Agencywenku/AgencyWenkuApi/cancleFavoriteDoc",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);	
   	 			}
   	 		}
   	 	});
    };
    exports.AgencyWenkuApi_addViewItCount= function(docid,callback){
    	var data = {docid:docid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/Agencywenku/AgencyWenkuApi/addViewItCount",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback != null){
   	 				callback(data);	
   	 			}
   	 		}
   	 	});
    };
    /*********************用户申请发票部分******************/
    /**
     * 查询用户是否存在发票信息
     */
    exports.VipActivityApi_isInvoiceInfo= function(callback){
      var data = {};
      $.ajax({
	        type: "GET",
	        url: exports.APIURL+"/VipActivityApi/isInvoiceInfo",
	        data: data,
	        dataType: "json",
	        success: function(data){
	          if(callback != null){
	            callback(data); 
	          }
	        }
      });
    };

    /**
     * 获取用户发票信息
     */
    exports.VipActivityApi_getUserInvoiceInfo= function(callback){
      var data = {};
      $.ajax({
	        type: "POST",
	        url: exports.APIURL+"/VipActivityApi/getUserInvoiceInfo",
	        data: data,
	        dataType: "json",
	        success: function(data){
		          if(callback != null){
		            callback(data); 
		          }
	        }
      });
    };

    /**
     * 添加用户发票信息
     */
    exports.VipActivityApi_addUserInvoiceInfo= function(data ,callback){
     var data = {data:data};
      $.ajax({
	        type: "POST",
	        url: exports.APIURL+"/VipActivityApi/addUserInvoiceInfo",
	        data: data,
	        dataType: "json",
	        success: function(data){
	          if(callback != null){
	            callback(data); 
	          }
	        }
      });
    };

    /**
     * 添加发票申请记录
     */
    exports.VipActivityApi_addInvoiceApply = function ( orderno, data ,callback){
        var data = {orderno:orderno, data:data};
        $.ajax({
            type: "POST",
            url: exports.APIURL+"/VipActivityApi/addInvoiceApply",
            data: data,
            dataType: "json",
            success: function(data){
              if(callback != null){
                callback(data); 
            }
        }
      });
    };


    /**
     * 获取发票申请记录
     */
    exports.VipActivityApi_getInvoiceApply = function( orderNo ,callback){
     var data = {orderNo:orderNo};
      $.ajax({
	        type: "POST",
	        url: exports.APIURL+"/VipActivityApi/getInvoiceApply",
	        data: data,
	        dataType: "json",
	        success: function(data){
	          if(callback != null){
	            callback(data); 
	          }
	        }
      });
    };

    /**
     * 获取发票申请的状态
     */
    exports.VipActivityApi_getInvoiceStatus = function( orderNo ,callback){
     var data = {orderNo:orderNo};
      $.ajax({
	        type: "POST",
	        url: exports.APIURL+"/VipActivityApi/getInvoiceStatus",
	        data: data,
	        dataType: "json",
	        success: function(data){
	          if(callback != null){
	            callback(data); 
	          }
	        }
      });
    };

    /**
     * 查询发票申请的类型
     */
    exports.VipActivityApi_getInvoiceType = function( orderNo ,callback){
     var data = {orderNo:orderNo};
      $.ajax({
	        type: "POST",
	        url: exports.APIURL+"/VipActivityApi/getInvoiceType",
	        data: data,
	        dataType: "json",
	        success: function(data){
	          if(callback != null){
	            callback(data); 
	          }
	        }
      });
    };

    /**
     * 查看发票快递信息
     */
    exports.VipActivityApi_getInvoiceCourier = function( orderNo ,callback){
     var data = {orderNo:orderNo};
      $.ajax({
	        type: "POST",
	        url: exports.APIURL+"/VipActivityApi/getInvoiceCourier",
	        data: data,
	        dataType: "json",
	        success: function(data){
	          if(callback != null){
	            callback(data); 
	          }
	        }
      });
    };
    /**************长url参数的存储日志*******************/
    exports.LongUrlLogApi_addLog = function(url,ids,callback){
        var data = {url:url,ids:ids};
         $.ajax({
	           type: "POST",
	           url: exports.APIURL+"/LongUrlLogApi/addLog",
	           data: data,
	           dataType: "json",
	           success: function(data){
		             if(callback != null){
		               callback(data); 
		             }
	           }
         });
    };
    /***********获取某个学生的地理位置*******************/
    exports.attenceApi_getStudentLocationInfo = function(attenceid,studentid,callback){
    	var data = {attenceid:attenceid,studentid:studentid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/AttenceApi/getStudentLocationInfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*******************成绩等级的接口*************************/
    //保存成绩等级的设置
    /* type 1表示总成绩，2表示测试类成绩，3表示作业类成绩
     * setting的json格式如下：
     * {
	  	"setting":[
		    {"group":1,"dengji":"A", "downrange":90,"uprange":100},
		    {"group":2,"dengji":"B", "downrange":80,"uprange":89 },
		    {"group":3,"dengji":"C", "downrange":70,"uprange":79 },
		    {"group":4,"dengji":"D", "downrange":60,"uprange":69 },
		    {"group":5,"dengji":"E", "downrange":0,"uprange":59 }
	  	]
	  }
     */
    exports.GradeApi_saveGradeLevelSetting = function(courseid,type,setting,callback){
    	var data = {courseid:courseid,type:type,setting:setting};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GradeApi/saveGradeLevelSetting",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取成绩的等级设置
    exports.GradeApi_getGradeLevelSetting = function(courseid,type,callback){
    	var data = {courseid:courseid,type:type};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/GradeApi/getGradeLevelSetting",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //总成绩的柱状图显示，根据等级而来的柱状图
    exports.GradeApi_getScoreLevelStat = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/GradeApi/getScoreLevelStat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //设置成绩的等级的显示方式
    //type 1表示总成绩，2表示测试类成绩，3表示作业类成绩
    exports.GradeApi_setGradeLevelDisplay = function(courseid,type,display,callback){
    	var data = {courseid:courseid,type:type,display:display};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GradeApi/setGradeLevelDisplay",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取成绩的显示方式
    exports.GradeApi_getGradeLevelDisplay = function(courseid,type,callback){
    	var data = {courseid:courseid,type:type};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/GradeApi/getGradeLevelDisplay",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /********************批量删除学生***************************/
    /*
     * 批量删除的某个班级的学生
     * courseid 课程id值
     * studentidlist 多个学生id值以|符号进行分割开来
     */
    exports.courseApi_deleteStudentBat = function(courseid,studentidlist,callback){
    	var data = {courseid:courseid,studentidlist:studentidlist};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseApi/deleteStudentBat",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*******************定时测试的接口**************************/
    /**
     * limittype 0表示不限时，1表示限时
     * timelength 表示限时的时长，单位是秒，在limittype为1的时候，timelength的值必须大于0
     * begintime 表示开始时间 没有的时候，给0
     * endtime 表示结束时间，没有的时候，给0
     */
    exports.TestpaperApi_setTestpaperPublishTime = function(testpaperid,limittype,timelength,begintime,endtime,callback){
    	var data = {testpaperid:testpaperid,limittype:limittype,timelength:timelength,begintime:begintime,endtime:endtime};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/setTestpaperPublishTime",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取试卷的发布的时间设置
    exports.TestpaperApi_getTestpaperPublishTime = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TestpaperApi/getTestpaperPublishTime",
   	 		data: data,
			async:false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
	};
    //获取服务器现在的时间戳
    exports.TestpaperApi_getSyncTime = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TestpaperApi/getSyncTime",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 答题的时的心跳接口，每隔10s同步一次
     * 后端会去减掉用户的10s的时间
     */
    exports.TestpaperApi_syncTimes = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/syncTimes",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 开始答题，调用此接口，保存学生的首次答题时间
     */
    exports.TestpaperApi_beginToDoTestpaper = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/beginToDoTestpaper",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*****************外部资源链接接口******************/
    /**
     * 添加资源链接
     * courseid 课程id值
     * linkname 链接名称
     * link  链接的url地址
     */
    exports.CoursewareApi_addWebPageLink = function(courseid,linkname,link,callback){
    	var data = {courseid:courseid,linkname:linkname,link:link};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CoursewareApi/addWebPageLink",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 更新链接的信息
     */
    exports.CoursewareApi_updateWebLink = function(id,linkname,link,callback){
    	var data = {id:id,linkname:linkname,link:link};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CoursewareApi/updateWebLink",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取某个课程的外部链接的列表
     */
    exports.CoursewareApi_getWebLinkLists = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CoursewareApi/getWebLinkLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 删除掉某个外部链接资源
     */
    exports.CoursewareApi_deleteWebLink = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CoursewareApi/deleteWebLink",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*****************评教接口******************/
    /**
     * 检查某个课程是否需要进行评教
     */
    exports.EvaluationTeacherApi_checkCourse = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/EvaluationTeacherApi/checkCourse",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取某次评教的试题列表
     */
    exports.EvaluationTeacherApi_getSubjectList = function(evalid,callback){
    	var data = {evalid:evalid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/EvaluationTeacherApi/getSubjectList",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 保存答案
     */
    exports.EvaluationTeacherApi_saveAnswer = function(evalid,courseid,subjectid,answer,callback){
    	var data = {evalid:evalid,courseid:courseid,subjectid:subjectid,answer:answer};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/EvaluationTeacherApi/saveAnswer",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 提交评教
     */
    exports.EvaluationTeacherApi_handup = function(evalid,courseid,callback){
    	var data = {evalid:evalid,courseid:courseid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/EvaluationTeacherApi/handup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**************小组作业催交***********************/
    exports.ReviewApi_expeditorGroupHomework = function(homeworkid,groupids,callback){
    	var data = {homeworkid:homeworkid,groupids:groupids};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ReviewApi/expeditorGroupHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /******************个人备课区接口********************/
    //获取备课区下的目录树
    //type 类型  0 作业  1 资料   2 互动    3 测试   4话题
    exports.ResourceApi_getResourceFolderTree = function(rid,type,callback){
    	var data = {rid:rid,type:type};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ResourceApi/getResourceFolderTree",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /******************小组备课区接口********************/
    //获取小组备课区里面
    exports.PrepareLessonsGroupApi_getMyGroupLists = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/getMyGroupLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback){
   	 					callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新建小组备课区
    exports.PrepareLessonsGroupApi_addGroup = function(title,description,callback){
    	var data = {title:title,description:description};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/addGroup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑小组备课区
    exports.PrepareLessonsGroupApi_editGroup = function(groupid,title,description,callback){
    	var data = {groupid:groupid,title:title,description:description};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/editGroup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取小组的备课区列表
    exports.PrepareLessonsGroupApi_getResourceLists = function(groupid,callback){
    	var data = {groupid:groupid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/getResourceLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //创建小组里的 备课区
    exports.PrepareLessonsGroupApi_addGroupResource = function(groupid,title,callback){
    	var data = {groupid:groupid,title:title};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/addGroupResource",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //解散掉某个小组
    exports.PrepareLessonsGroupApi_dismissGroup = function(groupid,callback){
    	var data = {groupid:groupid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/dismissGroup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //从某个小组里退出
    exports.PrepareLessonsGroupApi_quitGroup = function(groupid,callback){
    	var data = {groupid:groupid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/quitGroup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //转让小组
    exports.PrepareLessonsGroupApi_attornGroup = function(groupid,uid,callback){
    	var data = {groupid:groupid,uid:uid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/attornGroup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增小组成员
    exports.PrepareLessonsGroupApi_addGroupMember = function(groupid,account,callback){
    	var data = {groupid:groupid,account:account};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/addGroupMember",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /***
     * 更新某个小组成员的权限设置
     * auth 用 json的格式来组织
     * {
         "joingroup":true,
         "shareauth":0,
         "editauth":true,
	   }
     */
    exports.PrepareLessonsGroupApi_updateGroupMemberAuth = function(groupid,uid,auth,callback){
    	var data = {groupid:groupid,uid:uid,auth:auth};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/updateGroupMemberAuth",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取某个小组的某个成员的权限
     */
    exports.PrepareLessonsGroupApi_getGroupMemberAuth = function(groupid,uid,callback){
    	var data = {groupid:groupid,uid:uid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/getGroupMemberAuth",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取自己在某个小组备课区的权限
    exports.PrepareLessonsGroupApi_getMyGroupAuth = function(groupid,callback){
    	var data = {groupid:groupid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/getMyGroupAuth",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取小组的成员列表
    exports.PrepareLessonsGroupApi_getMemberLists = function(groupid,callback){
    	var data = {groupid:groupid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/getMemberLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除小组成员
    exports.PrepareLessonsGroupApi_delGroupMember = function(groupid,uid,callback){
    	var data = {groupid:groupid,uid:uid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/delGroupMember",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 变更某个组员的权限
     * role 0 表示 组员，1表示管理员
     */
    exports.PrepareLessonsGroupApi_changeRole = function(groupid,uid,role,callback){
    	var data = {groupid:groupid,uid:uid,role:role};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/changeRole",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取小组的操作动态日志
    //type 0表示全部，1表示文件编辑，2表示成员变动相关
    exports.PrepareLessonsGroupApi_getGroupLog = function(groupid,type,offset,callback){
    	var data = {groupid:groupid,type:type,offset:offset};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/getGroupLog",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /***
     * 更新小组的权限设置
     * auth 用 json的格式来组织
     * {
         "joingroup":true,
         "shareauth":0,
         "editauth":true,
	   }
     */
    exports.PrepareLessonsGroupApi_updateGroupAuth = function(groupid,auth,callback){
    	var data = {groupid:groupid,auth:auth};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/updateGroupAuth",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取某个小组的某个成员的权限
     */
    exports.PrepareLessonsGroupApi_getGroupAuth = function(groupid,callback){
    	var data = {groupid:groupid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/getGroupAuth",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取备课区的回收站的内容
     */
    exports.PrepareLessonsGroupApi_getResourceRecyclebin = function(groupid,callback){
    	var data = {groupid:groupid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/getResourceRecyclebin",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 备课区回收站  个人备课区-回收站-还原内容
     * @param    rid        备课区id
     * @param    typeList   0 作业 1 互动 2 测试 3 话题 4备课区 5 文件夹
     * @param    idList     id    array
     */
    exports.PrepareLessonsGroupApi_ResourceRecyclebinlistReduction = function(groupid,idList,typeList,isFoledList,callback){
      var data = {groupid:groupid,idList:idList,typeList:typeList,isFoledList:isFoledList}
      $.ajax({
        type:"POST",
        url:exports.APIURL+"/PrepareLessonsGroupApi/ResourceRecyclebinlistReduction",
        data:data,
        dataType:"json",
        success:function(data){
          
          if(callback != null){
              callback(data);
          }
        }
      });
    };
    /**
      * 备课区回收站  个人备课区-回收站-永久删除
     * @param    rid        备课区id
     * @param    typeList   0 作业 1 互动 2 测试 3 话题 4备课区 5 文件夹
     * @param    idList     id    array
     */
    exports.PrepareLessonsGroupApi_delResourceRecyclebin = function(groupid,idList,typeList,isFoledList,callback){
        var data = {groupid:groupid,idList:idList,typeList:typeList,isfolderlist:isFoledList}
        $.ajax({
          type:"POST",
          url:exports.APIURL+"/PrepareLessonsGroupApi/delResourceRecyclebin",
          data:data,
          dataType:"json",
          success:function(data){
              if(callback != null){
                  callback(data);
              }
          }
        });
    };
    /**
     * 获取小组备课区的基础信息
     */
    exports.PrepareLessonsGroupApi_getGroupInfo = function(groupid,callback){
    	var data = {groupid:groupid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/getGroupInfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取小组备课区的目录树
     */
    exports.PrepareLessonsGroupApi_getGroupResourceFolerTree = function(groupid,type,callback){
    	var data = {groupid:groupid,type:type};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/PrepareLessonsGroupApi/getGroupResourceFolerTree",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取某个备课区的，某种类型的文件，第一级的内容，除了文件夹之外
     * type 0 作业 1 资料 2 互动 3测试 4话题 5外部资源链接
     */
    exports.ResourceApi_getResourceFirstLevelFiles = function(rid,type,callback){
    	var data = {rid:rid,type:type};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ResourceApi/getResourceFirstLevelFiles",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取个人备课区的目录树
     */
    exports.ResourceApi_getMyResourceFolerTree = function(type,callback){
    	var data = {type:type};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ResourceApi/getMyResourceFolerTree",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /******************************************/
    //获取某个课程的弹幕状态
    exports.InteractPPTApi_getBarrageState = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/InteractPPTApi/getBarrageState",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //发送弹幕
    //除了mqtt要发送之外，也需要往服务器的发送，用于存储
    exports.InteractPPTApi_sendBarrage = function(interactid,content,callback){
    	var data = {interactid:interactid,content:content};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/InteractPPTApi/sendBarrage",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取同屏状态
    exports.InteractPPTApi_getWithScreenState = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/InteractPPTApi/getWithScreenState",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取同屏的课件的图片列表
    exports.InteractWithScreenApi_listSlides = function(courseid,interactid,callback){
    	var data = {courseid:courseid,interactid:interactid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/InteractWithScreenApi/listSlides",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /****************获取某次课件互动的某次互动的榜单*******************/
    exports.InteractPPTApi_getStudentAnswerRanking = function(interactid,pageindex,callback){
    	var data = {interactid:interactid,pageindex:pageindex};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/InteractPPTApi/getStudentAnswerRanking",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /******************访问某个公告时，调用此接口*******************/
    exports.NotifyApi_readit = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/NotifyApi/readit",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.NotifyApi_getReadLists = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/NotifyApi/getReadLists",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*************互动试题的答对的名单*****************************/
    exports.InteractApi_getSubjectRightAnswerStudentLists = function(subjectid,callback){
    	var data = {subjectid:subjectid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/InteractApi/getSubjectRightAnswerStudentLists",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //答错的名单
    exports.InteractApi_getSubjectErrorAnswerStudentLists = function(subjectid,callback){
    	var data = {subjectid:subjectid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/InteractApi/getSubjectErrorAnswerStudentLists",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /******************是否阅读了某个话题***************************/
    exports.TopicDiscussApi_readIt = function(topicid,callback){
    	var data = {topicid:topicid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TopicDiscussApi/readIt",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.TopicDiscussApi_getReadLists = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TopicDiscussApi/getReadLists",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*****************随机抽题的接口****************************/
    //获取随机抽取试题的设置
    exports.TestpaperApi_getRandSubjectSetting = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TestpaperApi/getRandSubjectSetting",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 设置是否开启随机抽取试题
     * state 0表示关闭随机抽取试题  1表示开启随机抽取试题
     */
    exports.TestpaperApi_setRandSubjectExtra = function(testpaperid,state,callback){
    	var data = {testpaperid:testpaperid,state:state};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/setRandSubjectExtra",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 保存随机抽取的试题
     * type 1 判断题  2 单选题  3多选题  4简答题  5 填空题  6 不定项 7文件题
     * num 表示数量
     */
    exports.TestpaperApi_saveRandSubjectSetting = function(testpaperid,type,num,callback){
    	var data = {testpaperid:testpaperid,type:type,num:num};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/saveRandSubjectSetting",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /****************终生VIP的活动***************************/
    //获取剩余的领取人数
    exports.LifeLongVipActivity2018Api_getRemainCount = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/LifeLongVipActivity2018Api/getRemainCount",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //开始领取，添加快递的信息
    exports.LifeLongVipActivity2018Api_addReceiveAddress = function(address,receiver,telphone,orderno,callback){
    	var data = {address:address,receiver:receiver,telphone:telphone,orderno:orderno};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/LifeLongVipActivity2018Api/addReceiveAddress",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //判断是否允许弹窗
    exports.LifeLongVipActivity2018Api_isAllowPopDialog = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/LifeLongVipActivity2018Api/isAllowPopDialog",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //记录弹窗，如果弹出过了，就调用此接口
    exports.LifeLongVipActivity2018Api_readIt = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/LifeLongVipActivity2018Api/readIt",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*****************试卷新增练习题模式*************************/
    exports.TestpaperApi_setTestpaperType = function(testpaperid,type,callback){
    	var data = {testpaperid:testpaperid,type:type};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TestpaperApi/setTestpaperType",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /***************获取测试的学霸排名***********************/
    exports.ReviewTestpaperApi_getXueBaRank = function(testpaperid,callback){
    	var data = {testpaperid:testpaperid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ReviewTestpaperApi/getXueBaRank",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /********************新闻的接口API**************************/
    exports.NewsApi_getXueBaRank = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/NewsApi/lists",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /************************保存临时的快递信息*****************************/
    exports.LifeLongVipActivity2018Api_saveTempAddress = function(address,receiver,telphone,callback){
    	var data = {address:address,receiver:receiver,telphone:telphone};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/LifeLongVipActivity2018Api/saveTempAddress",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**********************课程整体数据的分析*********************************/
    /**
     * 获取课程的基础数据
     * begintime 和 endtime 为空时，表示从创建课程到现在的时间
     */
    exports.CourseBigDataApi_getCourseBaseData = function(courseid,begintime,endtime,callback){
    	var data = {courseid:courseid,begintime:begintime,endtime:endtime};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseBigDataApi/getCourseBaseData",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取互动的三条曲线统计
     * begintime 和 endtime 为空时，表示从创建课程到现在的时间
     */
    exports.CourseBigDataApi_getInteractTableStat = function(courseid,begintime,endtime,callback){
    	var data = {courseid:courseid,begintime:begintime,endtime:endtime};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseBigDataApi/getInteractTableStat",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取互动的平均正确率和平均参与率
     * begintime 和 endtime 为空时，表示从创建课程到现在的时间
     */
    exports.CourseBigDataApi_getInteractRate = function(courseid,begintime,endtime,callback){
    	var data = {courseid:courseid,begintime:begintime,endtime:endtime};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseBigDataApi/getInteractRate",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取发布抢答的统计情况
     * begintime 和 endtime 为空时，表示从创建课程到现在的时间
     */
    exports.CourseBigDataApi_getCourseRaceTop = function(courseid,begintime,endtime,callback){
    	var data = {courseid:courseid,begintime:begintime,endtime:endtime};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseBigDataApi/getCourseRaceTop",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取表现统计
     * begintime 和 endtime 为空时，表示从创建课程到现在的时间
     */
    exports.CourseBigDataApi_getPerformTop = function(courseid,begintime,endtime,callback){
    	var data = {courseid:courseid,begintime:begintime,endtime:endtime};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseBigDataApi/getPerformTop",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取互动试题榜单
     * begintime 和 endtime 为空时，表示从创建课程到现在的时间
     */
    exports.CourseBigDataApi_getInteractTop = function(courseid,begintime,endtime,callback){
    	var data = {courseid:courseid,begintime:begintime,endtime:endtime};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseBigDataApi/getInteractTop",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取作业的统计信息
     * begintime 和 endtime 为空时，表示从创建课程到现在的时间
     */
    exports.CourseBigDataApi_getHomeworkStat = function(courseid,begintime,endtime,callback){
    	var data = {courseid:courseid,begintime:begintime,endtime:endtime};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseBigDataApi/getHomeworkStat",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取话题的统计数据
     * begintime 和 endtime 为空时，表示从创建课程到现在的时间
     */
    exports.CourseBigDataApi_getTopicStat = function(courseid,begintime,endtime,callback){
    	var data = {courseid:courseid,begintime:begintime,endtime:endtime};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseBigDataApi/getTopicStat",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /******************学生数据面板********************************/
    /**
     * 获取课程的基本信息
     */
    exports.CourseStudentBigDataApi_getCourseBaseData = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseStudentBigDataApi/getCourseBaseData",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个学生的基础信息
    exports.CourseStudentBigDataApi_getStudentInfo = function(courseid,uid,callback){
    	var data = {courseid:courseid,uid:uid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseStudentBigDataApi/getStudentInfo",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取学生的统计的列表
     */
    exports.CourseStudentBigDataApi_getStudentStatLists = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseStudentBigDataApi/getStudentStatLists",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取某个学生的数据分析，有考勤，作业，互动参与情况
     */
    exports.CourseStudentBigDataApi_getStudentDataStat = function(courseid,uid,callback){
    	var data = {courseid:courseid,uid:uid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseStudentBigDataApi/getStudentDataStat",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取某个学生的话题参与情况的分析
     */
    exports.CourseStudentBigDataApi_getStudentTopicStat = function(courseid,uid,callback){
    	var data = {courseid:courseid,uid:uid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseStudentBigDataApi/getStudentTopicStat",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**
     * 获取某个学生的雷达图的数据
     */
    exports.CourseStudentBigDataApi_getStudentRadarData = function(courseid,uid,callback){
    	var data = {courseid:courseid,uid:uid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseStudentBigDataApi/getStudentRadarData",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /****************备课区的外部资源接口****************************/
    //添加链接
    exports.ResourceCoursewareWeblinkApi_addWebPageLink = function(rid,linkname,link,folderid,callback){
    	var data = {rid:rid,linkname:linkname,link:link,folderid:folderid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceCoursewareWeblinkApi/addWebPageLink",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //更新链接
    exports.ResourceCoursewareWeblinkApi_updateWebLink = function(id,linkname,link,callback){
    	var data = {id:id,linkname:linkname,link:link};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceCoursewareWeblinkApi/updateWebLink",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //删除链接
    exports.ResourceCoursewareWeblinkApi_deleteWebLink = function(id,callback){
    	var data = {id:id};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceCoursewareWeblinkApi/deleteWebLink",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //获取链接列表
    exports.ResourceCoursewareWeblinkApi_getWebLinkLists = function(rid,folderid,callback){
    	var data = {rid:rid,folderid:folderid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/ResourceCoursewareWeblinkApi/getWebLinkLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    //发布到某个班级
    exports.ResourceCoursewareWeblinkApi_publishToCourse = function(id,courseid,callback){
    	var data = {id:id,courseid:courseid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/ResourceCoursewareWeblinkApi/publishToCourse",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback != null){
					callback(data);
	 			}
   	 		}
   	 	});
    };
    /****************2018国庆VIP的活动***************************/
    //开始领取，添加快递的信息
    exports.GuoqingVipActivity2018Api_addReceiveAddress = function(address,receiver,telphone,orderno,otheraccount,callback){
    	var data = {address:address,receiver:receiver,telphone:telphone,orderno:orderno,otheraccount:otheraccount};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GuoqingVipActivity2018Api/addReceiveAddress",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //判断是否允许弹窗
    exports.GuoqingVipActivity2018Api_isAllowPopDialog = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/GuoqingVipActivity2018Api/isAllowPopDialog",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //记录弹窗，如果弹出过了，就调用此接口
    exports.GuoqingVipActivity2018Api_readIt = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GuoqingVipActivity2018Api/readIt",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //保存临时的地址信息
    exports.GuoqingVipActivity2018Api_saveTempAddress = function(address,receiver,telphone,otheraccount,callback){
    	var data = {address:address,receiver:receiver,telphone:telphone,otheraccount:otheraccount};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/GuoqingVipActivity2018Api/saveTempAddress",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取国庆的VIP产品列表
    exports.vipApi_getGuoqingProductLists = function(type,callback){
    	var data = {type:type};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/VipApi/getGuoqingProductLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*****************验证图形验证码**********************/
    exports.UserApi_checkVerify = function(verify,callback){
    	var data = {verify:verify};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/UserApi/checkVerify",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
					if(callback != null){
						callback(data);
					}
   	 				// plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /***********************任务分组的接口***************************/
    //新建任务分组
    exports.CourseGroupActivityApi_addGroupActivity = function(courseid,activityname,callback){
    	var data = {courseid:courseid,activityname:activityname};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseGroupActivityApi/addGroupActivity",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
					if(callback != null){
						callback(data);
					}
   	 			}
   	 		}
   	 	});
    };
    //新建任务分组
    exports.CourseGroupActivityApi_addGroupActivityMore = function(courseid,activityname,groupstudentlimit,isallowcreate,groupnumslimit,callback){
    	var data = {courseid:courseid,activityname:activityname,groupstudentlimit:groupstudentlimit,isallowcreate:isallowcreate,groupnumslimit:groupnumslimit};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseGroupActivityApi/addGroupActivity",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
					if(callback != null){
						callback(data);
					}
   	 			}
   	 		}
   	 	});
    };
    //新建任务分组
    exports.CourseGroupActivityApi_addGroupActivityAutoMore = function(courseid,activityname,groupstudentlimit,isallowcreate,groupnumslimit,isautoassign,callback){
    	var data = {courseid:courseid,activityname:activityname,groupstudentlimit:groupstudentlimit,isallowcreate:isallowcreate,groupnumslimit:groupnumslimit,isautoassign:isautoassign};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseGroupActivityApi/addGroupActivity",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
					if(callback != null){
						callback(data);
					}
   	 			}
   	 		}
   	 	});
    };
    /**
     * 编辑分组
     * groupstudentlimit 每组人数上限，0表示不限
     * isallowcreate 是否允许创建，1表示允许
     * groupnumslimit 组数上线，0表示不限制
     */
    exports.CourseGroupActivityApi_editGroupActivity = function(activityid,activityname,groupstudentlimit,isallowcreate,groupnumslimit,callback){
    	var data = {activityid:activityid,activityname:activityname,groupstudentlimit:groupstudentlimit,isallowcreate:isallowcreate,groupnumslimit:groupnumslimit};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseGroupActivityApi/editGroupActivity",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
					if(callback != null){
						callback(data);
					}
   	 			}
   	 		}
   	 	});
    };
    //获取活动分组的列表
    exports.CourseGroupActivityApi_getLists = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseGroupActivityApi/getLists",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
					if(callback != null){
						callback(data);
					}
   	 			}
   	 		}
   	 	});
	};
	//获取活动分组的列表
    exports.CourseGroupActivityApi_getListsNA = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseGroupActivityApi/getLists",
			data: data,
			async:false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
					if(callback != null){
						callback(data);
					}
   	 			}
   	 		}
   	 	});
    };
    //获取某次活动的基础信息
    exports.CourseGroupActivityApi_getActivityInfo = function(activityid,callback){
    	var data = {activityid:activityid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseGroupActivityApi/getActivityInfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
					if(callback != null){
						callback(data);
					}
   	 			}
   	 		}
   	 	});
    };
    //获取某次活动的基础信息
    exports.CourseGroupActivityApi_delGroupActivity = function(activityid,callback){
    	var data = {activityid:activityid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseGroupActivityApi/delGroupActivity",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
					if(callback != null){
						callback(data);
					}
   	 			}
   	 		}
   	 	});
    };
    /***************小组接口V2************************************/
    //新建小组
    exports.CourseGroupApi_addGroup = function(activityid,groupname,callback){
    	var data = {activityid:activityid,groupname:groupname};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseGroupApi/addGroup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更新小组名称
    exports.CourseGroupApi_updateGroup = function(groupid,groupname,studentnums,callback){
    	var data = {groupid:groupid,groupname:groupname,studentnums:studentnums};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseGroupApi/updateGroup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //删除某个小组
    exports.CourseGroupApi_delGroup = function(groupid,callback){
    	var data = {groupid:groupid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseGroupApi/delGroup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //设置某个学生为小组组长
    exports.CourseGroupApi_setGroupLeader = function(groupid,studentid,callback){
    	var data = {groupid:groupid,studentid:studentid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseGroupApi/setGroupLeader",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //取消某个学生为组长
    exports.CourseGroupApi_cancelGroupLeader = function(groupid,studentid,callback){
    	var data = {groupid:groupid,studentid:studentid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseGroupApi/cancelGroupLeader",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个课程的所有小组名称
    exports.CourseGroupApi_listGroups = function(activityid,callback){
    	var data = {activityid:activityid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseGroupApi/listGroups",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个分组的学生信息
    exports.CourseGroupApi_getGroupStudents = function(groupid,callback){
    	var data = {groupid:groupid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseGroupApi/getGroupStudents",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //学生自己主动加入某个小组
    exports.CourseGroupApi_joinGroup = function(groupid,callback){
    	var data = {groupid:groupid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseGroupApi/joinGroup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //老师，将某些学生拉入某个小组
    //studentids 表示多个学生的id值，如果有多个学生的话，就是学生id值 +“|”分割开来
    exports.CourseGroupApi_joinGroupByTeacher = function(groupid,studentids,callback){
    	var data = {groupid:groupid,studentids:studentids};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseGroupApi/joinGroupByTeacher",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //老师，将某个小组里的成员，从某个小组里面移除
    exports.CourseGroupApi_removeStudent = function(groupid,studentids,callback){
    	var data = {groupid:groupid,studentids:studentids};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseGroupApi/removeStudent",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //学生自己退组
    exports.CourseGroupApi_quitGroup = function(groupid,callback){
    	var data = {groupid:groupid};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseGroupApi/quitGroup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //学生判断自己在某次活动是否加入组了
    exports.CourseGroupApi_isJoinGroup = function(activityid,callback){
    	var data = {activityid:activityid};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseGroupApi/isJoinGroup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //打开/关闭小组加入 type 0表示关闭  1表示打开
    exports.CourseGroupApi_setJoinGroup = function(activityid,type,callback){
    	var data = {activityid:activityid,type:type};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/CourseGroupApi/setJoinGroup",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //获取某个班级，所有除了加入了改组，而未加入其他小组的学生信息
    //txt为搜索条件
    exports.CourseGroupApi_getStudents = function(groupid,txt,callback){
    	var data = {groupid:groupid,txt:txt};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/CourseGroupApi/getStudents",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /****************2018年双11活动***************************/
    //开始领取，添加快递的信息
    exports.TwoelevenVipActivity2018Api_addReceiveAddress = function(address,receiver,telphone,orderno,callback){
    	var data = {address:address,receiver:receiver,telphone:telphone,orderno:orderno};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TwoelevenVipActivity2018Api/addReceiveAddress",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //判断是否允许弹窗
    exports.TwoelevenVipActivity2018Api_isAllowPopDialog = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/TwoelevenVipActivity2018Api/isAllowPopDialog",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //记录弹窗，如果弹出过了，就调用此接口
    exports.TwoelevenVipActivity2018Api_readIt = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TwoelevenVipActivity2018Api/readIt",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    exports.TwoelevenVipActivity2018Api_saveTempAddress = function(address,receiver,telphone,callback){
    	var data = {address:address,receiver:receiver,telphone:telphone};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/TwoelevenVipActivity2018Api/saveTempAddress",
			data: data,
			async: false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*********************作业分组的接口***************************/
    //添加小组作业
    exports.HomeworkApi_addGroupHomework = function(courseid,title,description,attachment,endtime,fullscore,activityId,callback){
   	 	var data = {courseid:courseid,title:title,description:description,attachment:attachment,endtime:endtime,type:1,fullscore:fullscore,activityId:activityId};
    	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/HomeworkApi/addHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
    			if(callback){
    				callback(data);	
    			}
   	 		}
   	 	});
    };
    //更新作业
    exports.HomeworkApi_updateHomeworkV2 = function(homeworkid,title,description,attachment,endtime,fullscore,activityId,callback){
    	var data = {homeworkid:homeworkid,title:title,description:description,attachment:attachment,endtime:endtime,fullscore:fullscore,activityId:activityId};
   	 	$.ajax({
   	 		type: "POST",
   	 		url: exports.APIURL+"/HomeworkApi/updateHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //从备课区发布小组作业到班级
    exports.ResourceHomeworkApi_publishGroupHomework = function(homeworkid,courseid,activityId,endtime,fullscore,callback){
    	var data = {homeworkid:homeworkid,courseid:courseid,type:1,endtime:endtime,fullscore:fullscore,activityId:activityId};
   	 	$.ajax({
   	 		type: "post",
   	 		url: exports.APIURL+"/ResourceHomeworkApi/publishHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /**********************班级里的测试V2.0接口*************************/
    //添加判断题和选择题
    exports.TestpaperApi_addTFSubject_V2 = function(testpaperid,type,title,score,answer,options,sort,explanation,attachment,callback){
    	var data = {testpaperid:testpaperid,type:type,title:title,score:score,answer:answer,options:options,sort:sort,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,  
   	 		url: exports.APIURL+"/TestpaperApi/addTFSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑判断题和选择题
    exports.TestpaperApi_editTFSubject_V2 = function(subjectid, title, score, optionsIDs, options,answer,sort,explanation,attachment,callback){
    	var data = {subjectid:subjectid,title:title,score:score,optionsIDs:optionsIDs,options:options,answer:answer,sort:sort,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/editTFSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增多选题
    exports.TestpaperApi_addMulSelectSubject_V2 = function(testpaperid,title,score,answer,options,sort,explanation,attachment,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,answer:answer,options:options,sort:sort,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/addMulSelectSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑多选题
    exports.TestpaperApi_editMulSelectSubject_V2 = function(subjectid, title, score, optionsIDs, options,answer,sort,explanation,attachment,callback){
    	var data = {subjectid:subjectid,title:title,score:score,answer:answer,options:options,optionsIDs:optionsIDs,sort:sort,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/editMulSelectSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增不定项选择题
    exports.TestpaperApi_addUnfinedTermSubject_V2 = function(testpaperid,title,score,answer,options,sort,explanation,attachment,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,answer:answer,options:options,sort:sort,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/addUnfinedTermSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑不定项选择题
    exports.TestpaperApi_editUnfinedTermSubject_V2 = function(subjectid, title, score, optionsIDs, options,answer,sort,explanation,attachment,callback){
    	var data = {subjectid:subjectid,title:title,score:score,answer:answer,options:options,optionsIDs:optionsIDs,sort:sort,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/editUnfinedTermSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加主观题
    exports.TestpaperApi_addSubjective_V2 = function(testpaperid,title,score,sort,answer,explanation,attachment,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,sort:sort,answer:answer,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/addSubjective",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑主观题
    exports.TestpaperApi_editSubjective_V2 = function(subjectid,title,score,sort,answer,explanation,attachment,callback){
    	var data = {subjectid:subjectid,title:title,score:score,sort:sort,answer:answer,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/editSubjective",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加填空题
    exports.TestpaperApi_addFill_V2 = function(testpaperid,title,score,sort,answer,explanation,attachment,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,sort:sort,answer:answer,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/addFill",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑填空题
    exports.TestpaperApi_editFill_V2 = function(subjectid,title,score,sort,answer,explanation,attachment,callback){
    	var data = {subjectid:subjectid,title:title,score:score,sort:sort,answer:answer,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/editFill",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加文件题
    exports.TestpaperApi_addFileSubject_V2 = function(testpaperid,title,score,sort,answer,explanation,attachment,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,sort:sort,answer:answer,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/addFileSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑文件题
    exports.TestpaperApi_editFileSubject_V2 = function(subjectid,title,score,sort,answer,explanation,attachment,callback){
    	var data = {subjectid:subjectid,title:title,score:score,sort:sort,answer:answer,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/editFileSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加段落说明
    exports.TestpaperApi_addCut_V2 = function(testpaperid,title,sort,attachment,callback){
    	var data = {testpaperid:testpaperid,title:title,sort:sort,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/addCut",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑段落说明
    exports.TestpaperApi_editCut_V2 = function(subjectid,title,sort,attachment,callback){
    	var data = {subjectid:subjectid,title:title,sort:sort,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/TestpaperApi/editCut",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /****************************备课区里的测试V2.0*************************/
    //添加判断题和选择题
    exports.ResourceTestpaperApi_addTFSubject_V2 = function(testpaperid,type,title,score,answer,options,sort,explanation,attachment,callback){
    	var data = {testpaperid:testpaperid,type:type,title:title,score:score,answer:answer,options:options,sort:sort,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST", 
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/addTFSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑判断题和选择题
    exports.ResourceTestpaperApi_editTFSubject_V2 = function(subjectid, title, score, optionsIDs, options,answer,sort,explanation,attachment,callback){
    	var data = {subjectid:subjectid,title:title,score:score,optionsIDs:optionsIDs,options:options,answer:answer,sort:sort,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/editTFSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增多选题
    exports.ResourceTestpaperApi_addMulSelectSubject_V2 = function(testpaperid,title,score,answer,options,sort,explanation,attachment,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,answer:answer,options:options,sort:sort,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/addMulSelectSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑多选题
    exports.ResourceTestpaperApi_editMulSelectSubject_V2 = function(subjectid, title, score, optionsIDs, options,answer,sort,explanation,attachment,callback){
    	var data = {subjectid:subjectid,title:title,score:score,answer:answer,options:options,optionsIDs:optionsIDs,sort:sort,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/editMulSelectSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加简答题
    exports.ResourceTestpaperApi_addSubjective_V2 = function(testpaperid,title,score,sort,answer,explanation,attachment,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,sort:sort,answer:answer,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/addSubjective",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑简答题
    exports.ResourceTestpaperApi_editSubjective_V2 = function(subjectid,title,score,sort,answer,explanation,attachment,callback){
    	var data = {subjectid:subjectid,title:title,score:score,sort:sort,answer:answer,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/editSubjective",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //新增不定项选择题
    exports.ResourceTestpaperApi_addUnfinedTermSubject_V2 = function(testpaperid,title,score,answer,options,sort,explanation,attachment,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,answer:answer,options:options,sort:sort,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/addUnfinedTermSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑不定项选择题
    exports.ResourceTestpaperApi_editUnfinedTermSubject_V2 = function(subjectid, title, score, optionsIDs, options,answer,sort,explanation,attachment,callback){
    	var data = {subjectid:subjectid,title:title,score:score,answer:answer,options:options,optionsIDs:optionsIDs,sort:sort,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/editUnfinedTermSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加填空题
    exports.ResourceTestpaperApi_addFill_V2 = function(testpaperid,title,score,sort,answer,explanation,attachment,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,sort:sort,answer:answer,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/addFill",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑填空题
    exports.ResourceTestpaperApi_editFill_V2 = function(subjectid,title,score,sort,answer,explanation,attachment,callback){
    	var data = {subjectid:subjectid,title:title,score:score,sort:sort,answer:answer,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/editFill",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加文件题
    exports.ResourceTestpaperApi_addFileSubject_V2 = function(testpaperid,title,score,sort,answer,explanation,attachment,callback){
    	var data = {testpaperid:testpaperid,title:title,score:score,sort:sort,answer:answer,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/addFileSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑文件题
    exports.ResourceTestpaperApi_editFileSubject_V2 = function(subjectid,title,score,sort,answer,explanation,attachment,callback){
    	var data = {subjectid:subjectid,title:title,score:score,sort:sort,answer:answer,explanation:explanation,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/editFileSubject",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //添加段落说明
    exports.ResourceTestpaperApi_addCut_V2 = function(testpaperid,title,sort,attachment,callback){
    	var data = {testpaperid:testpaperid,title:title,sort:sort,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/addCut",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //编辑段落题
    exports.ResourceTestpaperApi_editCut_V2 = function(subjectid,title,sort,attachment,callback){
    	var data = {subjectid:subjectid,title:title,sort:sort,attachment:attachment};
   	 	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		async: false,
   	 		url: exports.APIURL+"/ResourceTestpaperApi/editCut",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /***********************************************/
    //更新小组名称
    exports.CourseGroupApi_updateGroupName = function(groupid,groupname,callback){
    	var data = {groupid:groupid,groupname:groupname};
   	 	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+"/CourseGroupApi/updateGroupName",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*****************添加作业V2.0*********************/
    exports.HomeworkApi_addHomework_V2 = function(courseid,title,description,attachment,endtime,type,fullscore,isallowdelay,callback){
   	 	var data = {courseid:courseid,title:title,description:description,attachment:attachment,endtime:endtime,type:type,fullscore:fullscore,isallowdelay:isallowdelay};
    	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+"/HomeworkApi/addHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
    			if(callback){
    				callback(data);	
    			}
   	 		}
   	 	});
    };
    //添加小组作业
    exports.HomeworkApi_addGroupHomework_V2 = function(courseid,title,description,attachment,endtime,fullscore,activityId,isallowdelay,callback){
   	 	var data = {courseid:courseid,title:title,description:description,attachment:attachment,endtime:endtime,type:1,fullscore:fullscore,activityId:activityId,isallowdelay:isallowdelay};
    	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+"/HomeworkApi/addHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
    			if(callback){
    				callback(data);	
    			}
   	 		}
   	 	});
    };
    //更新小组作业
    exports.HomeworkApi_updateGroupHomework_V2 = function(homeworkid,title,description,attachment,endtime,fullscore,activityId,isallowdelay,callback){
    	var data = {homeworkid:homeworkid,title:title,description:description,attachment:attachment,endtime:endtime,fullscore:fullscore,activityId:activityId,isallowdelay:isallowdelay};
   	 	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+"/HomeworkApi/updateHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更新个人作业
    exports.HomeworkApi_updateHomework_V2 = function(homeworkid,title,description,attachment,endtime,fullscore,isallowdelay,callback){
    	var data = {homeworkid:homeworkid,title:title,description:description,attachment:attachment,endtime:endtime,fullscore:fullscore,isallowdelay:isallowdelay};
   	 	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+"/HomeworkApi/updateHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //设置是否允许退课
    exports.CourseApi_setCourseAllowQuit = function(courseid,isallowquit,callback){
    	var data = {courseid:courseid,isallowquit:isallowquit};
   	 	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+"/CourseApi/setCourseAllowQuit",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //将某个作业发布到某个班级
    //homeworkid 表示作业id值，courseid表示目标课程id值
    exports.ResourceHomeworkApi_publishHomework_V2 = function(homeworkid,courseid,type,endtime,fullscore,isallowdelay,callback){
    	var data = {homeworkid:homeworkid,courseid:courseid,type:type,endtime:endtime,fullscore:fullscore,isallowdelay:isallowdelay};
   	 	$.ajax({
   	 		type: "post",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+"/ResourceHomeworkApi/publishHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
	};
	//从备课区发布小组作业到班级
    exports.ResourceHomeworkApi_publishGroupHomework_V2 = function(homeworkid,courseid,activityId,endtime,fullscore,isallowdelay,callback){
    	var data = {homeworkid:homeworkid,courseid:courseid,type:1,endtime:endtime,fullscore:fullscore,activityId:activityId,isallowdelay:isallowdelay};
   	 	$.ajax({
   	 		type: "post",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+"/ResourceHomeworkApi/publishHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /********************添加作业接口V3*************************/
    exports.HomeworkApi_addHomework_V3 = function(courseid,title,description,attachment,endtime,type,fullscore,isallowdelay,checkrepeat,autorebackrate,warmingcheckrate,callback){
   	 	var data = {courseid:courseid,title:title,description:description,
   	 				attachment:attachment,endtime:endtime,type:type,
   	 				fullscore:fullscore,isallowdelay:isallowdelay,
   	 				checkrepeat:checkrepeat,autorebackrate:autorebackrate,
   	 				warmingcheckrate:warmingcheckrate};
    	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+"/HomeworkApi/addHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
    			if(callback){
    				callback(data);	
    			}
   	 		}
   	 	});
    };
    exports.HomeworkApi_updateHomework_V3 = function(homeworkid,title,description,attachment,endtime,fullscore,isallowdelay,checkrepeat,autorebackrate,warmingcheckrate,callback){
    	var data = {homeworkid:homeworkid,title:title,description:description,
    			    attachment:attachment,endtime:endtime,fullscore:fullscore,
    			    isallowdelay:isallowdelay,checkrepeat:checkrepeat,
    			    autorebackrate:autorebackrate,
	 				warmingcheckrate:warmingcheckrate};
   	 	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+"/HomeworkApi/updateHomework",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    //更新查重率
    exports.HomeworkApi_updateCheckRepeatSetting = function(homeworkid,checkrepeat,autorebackrate,warmingcheckrate,callback){
    	var data = {homeworkid:homeworkid,checkrepeat:checkrepeat,
    			    autorebackrate:autorebackrate,
	 				warmingcheckrate:warmingcheckrate};
   	 	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+"/HomeworkApi/updateCheckRepeatSetting",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /********************获取课程的是否允许退课*************************/
    exports.CourseApi_getCourseAllowQuit = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+"/CourseApi/getCourseAllowQuit",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /*******************将某次作业生成期末考成绩***************************/
    exports.ReviewApi_generateFinalGrade = function(homeworkid,callback){
    	var data = {homeworkid:homeworkid};
   	 	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+"/ReviewApi/generateFinalGrade",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
   	 				plugin.openMsg(data.info,1);
   	 			}
   	 		}
   	 	});
    };
    /***********************创建一个新的课程****************************/
    /**
     * 创建课程的时候，需要填写额外的信息
     * needspecialty 是否开启专业 1表示开启 0表示关闭
     * neednatureclass 是否开启自然班级 1表示开启 0表示关闭
     * needgrade 是否需要年级 1表示开启 0表示关闭
     * needentrance 是否需要入学年月 1表示开启 0表示关闭
     */
    exports.courseApi_createCourseV2 = function(coursename,coid,departid,needspecialty,neednatureclass,needgrade,needentrance,callback){
    	var data = {coursename:coursename,
    			    coid:coid,departid:departid,
    			    needspecialty:needspecialty,neednatureclass:neednatureclass,
    			    needgrade:needgrade,needentrance:needentrance};
   	 	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+ "/CourseApi/createCourse",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	   	 			callback(data);	
   	 			}
   	 		},
   	 		error:function(data){
	 	 		if(data.readyState == 0){
	 	 			plugin.openMsg('糟糕，网络出错了，请稍后重试',1,5000);
				}
   	 		}
   	 	});
	};
	exports.courseApi_createCourseV3 = function(coursename,teacherid,callback){
    	var data = {coursename:coursename,
    				teacherId:teacherid};
    				console.log(teacherid);
   	 	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+ "/CourseApi/createCourse",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	   	 			callback(data);	
   	 			}
   	 		},
   	 		error:function(data){
	 	 		if(data.readyState == 0){
	 	 			plugin.openMsg('糟糕，网络出错了，请稍后重试',1,5000);
				}
   	 		}
   	 	});
    };
    /************检查自己在某个课程的信息是否填写完毕********/
    exports.CourseApi_checkMyInfo = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+"/CourseApi/checkMyInfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    /*******************学生在某个课程里填写老师所要求的数据项**********/
    /**
     * indata 是一个字典，只要需要更新的部分，才需要填写
     * indata['major'] 专业的内容
     * indata['classno'] 自然班级
     * indata['grade'] 年级
     * indata['enrolltime'] 入学年月
     */
    exports.StudentAddtionInfoApi_updateMyCourseInfo = function(courseid,indata,callback){
    	var data = {data:indata,courseid:courseid};
   	 	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+"/StudentAddtionInfoApi/updateMyCourseInfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
				if(callback){
					callback(data);
	 			}
   	 		}
   	 	});	
    };
    /**
     * 更新课程的信息
     * setting 是一个字典，只要需要更新的部分，才需要填写
     * setting['major'] 专业的内容
     * setting['classno'] 自然班级
     * setting['grade'] 年级
     * setting['enrolltime'] 入学年月
     * 
     * 如果该课程属于任何机构，则coid，departid 填写0即可
     */
    exports.CourseApi_renameCourseV2 = function(courseid,coursename,coid,departid,setting,callback){
    	var data = {courseid:courseid,coursename:coursename,coid:coid,departid:departid,setting:setting};
   	 	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+ "/CourseApi/renameCourse",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	   	 			callback(data);	
   	 			}
   	 		},
   	 		error:function(data){
	 	 		if(data.readyState == 0){
	 	 			plugin.openMsg('糟糕，网络出错了，请稍后重试',1,5000);
				}
   	 		}
   	 	});
	};
	exports.CourseApi_renameCourseV3 = function(courseid,coursename,coid,coursenumber,setting,callback){
    	var data = {courseid:courseid,coursename:coursename,coursenumber:coursenumber,setting:setting,coid:coid};
   	 	$.ajax({
   	 		type: "POST",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+ "/CourseApi/renameCourse",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	   	 			callback(data);	
   	 			}
   	 		},
   	 		error:function(data){
	 	 		if(data.readyState == 0){
	 	 			plugin.openMsg('糟糕，网络出错了，请稍后重试',1,5000);
				}
   	 		}
   	 	});
    };
    /*******************企业微信登陆****************************/
    exports.UserApi_getQiyeWechatLoginConf = function(callback){
    	var data = {};
   	 	$.ajax({
   	 		type: "GET",
   	 		url: exports.APIURL+"/UserApi/getQiyeWechatLoginConf",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(data.status == 1){
   	 				if(callback != null){
   	   	 				callback(data);
   	 				}
   	 			}else{
					if(callback != null){
						callback(data);
					}
   	 			}
   	 		}
   	 	});
	};
	exports.CourseApi_getRelationInfo = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+ "/CourseApi/getRelationInfo",
   	 		data: data,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	   	 			callback(data);	
   	 			}
   	 		},
   	 		error:function(data){
	 	 		if(data.readyState == 0){
	 	 			plugin.openMsg('糟糕，网络出错了，请稍后重试',1,5000);
				}
   	 		}
   	 	});
	};
	exports.CourseApi_confirmUserToCourse = function(courseid,callback){
    	var data = {courseid:courseid};
   	 	$.ajax({
   	 		type: "GET",
   	 		xhrFields:{
                withCredentials:true
            },
   	 		url: exports.APIURL+ "/CourseApi/confirmUserToCourse",
			data: data,
			async:false,
   	 		dataType: "json",
   	 		success: function(data){
   	 			if(callback){
   	   	 			callback(data);	
   	 			}
   	 		},
   	 		error:function(data){
	 	 		if(data.readyState == 0){
	 	 			plugin.openMsg('糟糕，网络出错了，请稍后重试',1,5000);
				}
   	 		}
   	 	});
    };
});
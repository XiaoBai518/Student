window.onload=function()
{
	var id = localStorage["uid"];
	if(id == "" || id == null || id == undefined||!id.length){
		location.href="/html/login.html"
	}else {
      var course;
		var APIURL = "http://localhost:8080";
		var data = {id:id};
   		$.ajax({
   	 			type: "POST",
   	 			url: APIURL+"/UserApi/getUser",
   	 			data: data,
   	 			dataType: "json",
   	 			success: function(data){
   	 			 	var user = $("#user").children("img.avatar");
   	 			 	user.attr("alt",data.user.username);
   	 			 	user.attr("title",data.user.username);
   	 			 	user.attr("src",data.user.iconPath);

                  if($(".setting-page").attr("class")!=undefined) {
                     $("#user-avatar").attr("src",data.user.iconPath);
                     $("#uc-name").html(data.user.username);
                     $("#edit-name").html(data.user.username);
                     $("#edit-stno").html(data.user.stno);
                     $("#edit-school").html(data.user.school);
                     if(data.user.role==0)  $("#edit-role").html("学生");
                     else if(data.user.role==1)$("#edit-role").html("老师");
                     $("#edit-email").html(data.user.email);
                     $("#view_photo").attr("src",data.user.iconPath);
                     if(data.user.FaceData==0)  {
                        $("#edit-face").html("还没上传人脸数据");
                         $(".options .FaceData").find("a").html("添加信息");
                     }
                     else if(data.user.role==1) $("#edit-face").html("已经上传人脸数据");
                     
                     
                  }
                  if($(".data-page").attr("class")!=undefined) {
                     var courseId =  localStorage['cid'];
                     var data = {courseid:courseId};
                     var APIURL = "http://localhost:8080";
                     $.ajax({
                        type: "GET",
                        url: APIURL+"/CourseApi/getCourse",
                        data: data,
                        dataType: "json",
                        success: function(data){
                           if(data.status == 1){
                              course = data.course;
                              $("#courseName").html(data.course.coursename);
                              $("#courseCode").html(data.course.code);
                           }
                        }
                     });

                  }


                  if($("#MYAttence")!=undefined&&document.getElementById("MYAttence")!=undefined) {
                     var courseId =  localStorage['cid'];
                     var data = {courseid:courseId};
                     var APIURL = "http://localhost:8080";
                     $.ajax({
                        type: "GET",
                        url: APIURL+"/AttenceApi/getAttenceInfo",
                        data: data,
                        dataType: "json",
                        success: function(data){
                           if(data.status == 1){
                              $(".attend_ratenum").html(data.ratenum);
                              $("#attence_count").html(data.attenceCount+"次");

                               $(".attend_stunum").html("班级人数："+data.studentCount);
                              $("#mycoursename").html(course.coursename);
                           }
                        }
                     });
                  }
   	 			 }   
   	 		});
		}
}

function logout() {
   localStorage.clear();
   var APIURL = "http://localhost:8080";
         $.ajax({
               type: "GET",
               url: APIURL+"/UserApi/logout",
               xhrFields:{
                  withCredentials:true
               },
               crossDomain: true,
               dataType: "json",
               success: function(data){
                 location.href="/html/index.html"
               }
            });
}
function toMainIndex() {
   var id = localStorage["uid"];
      var APIURL = "http://localhost:8080";
      var data = {id:id};
         $.ajax({
               type: "GET",
               url: APIURL+"/UserApi/getRole",
               data: data,
               dataType: "json",
               success: function(data){
                  if(data.status==1) {
                     if(data.role==0){
                        location.href="/html/MainIndexStudent.html";
                     }else if(data.role==1) {
                        location.href="/html/MainIndexTeacher.html";
                     }
                  }
               }
            });
}
function toCourse(courseId) {
    localStorage['cid'] = courseId;
   location.href="/html/courseVideo.html"
}
function toCourseStudent(courseId) {
    localStorage['cid'] = courseId;
   location.href="/html/courseVideoStudent.html"
}
function toAttence(attenceId) {
    localStorage['attenceid'] = attenceId;
   location.href="/html/courseAttenceDetails.html"
}
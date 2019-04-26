window.onload=function()
{
	var id = localStorage["uid"];
	if(id == "" || id == null || id == undefined||!id.length){
	  $(".log-reg").removeClass("hide");
      $(".jr-ktp").addClass("hide");
	}else {
		
		var APIURL = "http://localhost:8080";
		var data = {id:id};
   		$.ajax({
   	 			type: "POST",
   	 			url: APIURL+"/UserApi/autoLogin",
   	 			xhrFields:{
    			withCredentials:true
			  	},
			  	crossDomain: true,
   	 			data: data,
   	 			dataType: "json",
   	 			success: function(data){
   	 			}
   	 		});
       $(".log-reg").addClass("hide");
      $(".jr-ktp").removeClass("hide");
   }
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
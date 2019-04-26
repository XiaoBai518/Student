define(function(require,exports,module){
	window.$ = window.jQuery = $ = require('jquery');
	exports.active=function() {
		var subnav = $("#third-nav");
		if(subnav == null || subnav == undefined ||subnav.length == 0){
			return;
		}
	    url = window.location.pathname + window.location.search;
	    url = url.replace(/(\/(p)\/\d+)|(&p=\d+)|(\/(id)\/\d+)|(&id=\d+)|(\/(group)\/\d+)|(&group=\d+)/, "");	    
	    subnav.find("a").each(function(index,element){
	    	var tmp_url = $(this).attr('href');
	    	if(tmp_url.toLowerCase().indexOf(url.toLowerCase())!=-1
	    		||url.toLowerCase().indexOf(tmp_url.toLowerCase())!=-1){
	    		$(this).addClass("active");
	    		return;
	    	}
	    });
	};
	//首页的头部
	exports.headerActive = function(){
		var subnav = $(".header");
		if(subnav == null || subnav == undefined ||subnav.length == 0){
			return;
		}
		url = window.location.pathname + window.location.search;
		url = url.replace(/(\/(p)\/\d+)|(&p=\d+)|(\/(id)\/\d+)|(&id=\d+)|(\/(group)\/\d+)|(&group=\d+)/, "");	    
		subnav.find("a").each(function(index,element){
			var tmp_url  = $(this).attr('href');
			if(tmp_url != null && tmp_url != ''){
				if(url.toLowerCase() == tmp_url.toLowerCase()){
					$(this).addClass("active");
					return;
				}
			}
		});
		// $('#solutiontop').on('click',function(){
		// 	if($(this).next().css('display') == 'none'){
		// 		$(this).next().show();
		// 	}else{
		// 		$(this).next().hide();
		// 	}
		// })
	};
	//主页面的active
	exports.mainHeaderActive = function(){
		
		var subnav = $(".nav-menu-left");
		if(subnav == null || subnav == undefined ||subnav.length == 0){
			return;
		}
		url = window.location.pathname + window.location.search;
		url = url.replace(/(\/(p)\/\d+)|(&p=\d+)|(\/(id)\/\d+)|(&id=\d+)|(\/(group)\/\d+)|(&group=\d+)/, "");	    
		subnav.find("a").each(function(index,element){
	    	var tmp_url = $(this).attr('href');		    	
	    	if(tmp_url.toLowerCase().indexOf(url.toLowerCase())!=-1
	    		||url.toLowerCase().indexOf(tmp_url.toLowerCase())!=-1){
		    	$(this).addClass("active");
		    	return;
		    }
		});
	};
	//feedback
	exports.feedback = function(){
		$(document).on('click','.help-dips .help-icon-ques',function(){
			var _this = this;
			require.async('/html/Public/Home/js/feedback.js',function(){
				$(_this).next('.help-dips-box').show();
			});
		});
	};
});
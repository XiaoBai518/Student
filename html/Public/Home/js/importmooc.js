define(function(require,exports,module){
	window.$=window.jQuery=$=require('jquery');
	var layer=require('layer');
	var plugin=require('plugin');
	var template = require('art-template');
	template = plugin.templateConfig(template);
	var API = require('API');
	var scrollBar=require('scrollBar');
	var cou = {};
	exports.getSearchLists = function(txt,page){
		 plugin.loading();
		 API.MoocApi_search(txt,page,function(tData){
			 tData.txt = txt;
			 tData.own = false;
			 var tpl = template("tpl-resource-dailog-mooc-lists",tData);
			 $(".dialog-mooc-lists").html(tpl);
			 scrollBar.scrollBar($(".pop-cont .dialog-mooc-lists"),$(".pop-cont .dialog-mooc-lists .list-course"));
			 plugin.closeLoading();
			 if(tData.pages>1){
				 layui.use(['laypage', 'layer'], function(){
					 var laypage = layui.laypage,layer = layui.layer;
					  laypage({
						 cont: 'search-page'
						 ,pages: tData.pages
						 ,skin: '#1E9FFF'
						 ,jump: function(obj, first){
						  	if(!first){
						  		API.MoocApi_search(txt,obj.curr,function(tData){
						  			tData.own = false;
						  			tpl = template("tpl-resource-dailog-mooc-lists",tData);
						  			$(".dialog-mooc-lists").html(tpl);
						  		});
						  	}
					  	 }
					  });
				 });
			 }else{
				 $("#search-page").html("");
			 }
		 });
	}
	exports.searchContrl = function(){
		var tpl = template("tpl-resource-dialog-mooc-content",[]);
		$(".pop-cont .class-cont").html(tpl);
		API.MoocApi_getMyPublishMoocLists(function(tData){
			tData.own = true;
			var tplm = template("tpl-resource-dailog-mooc-lists",tData);
			$(".dialog-mooc-lists").html(tplm);
			scrollBar.scrollBar($(".pop-cont .dialog-mooc-lists"),$(".pop-cont .dialog-mooc-lists .list-course"));
		});
		if(cou.searchContrlCache){
			return;
		}else{
			cou.searchContrlCache = true;
		}
		$(document).on("click",".search-btn",function(){
			 txt = $(".inputArea").val();
			 if(txt == ""){
				 $(".inputArea").focus();
				 return;
			 }
			 exports.getSearchLists(txt,1);
		});
		$(document).on("keydown",".inputArea",function(e){
			 if(e.keyCode==13){
				 txt = $(".inputArea").val();
				 if(txt == ""){
					 $(".inputArea").focus();
					 return;
				 }
				 exports.getSearchLists(txt,1);
			 }			 
		});
		$(document).on("click",".list-course ul li",function(){
			var dataid = $(this).attr("data-id");
			plugin.mloading();
			API.MoocLearnApi_getPublishChapterLists(dataid,function(tData){
				var tpl = template("tpl-resource-dailog-chapter-lists",tData);
				$(".class-cont").html(tpl);
				plugin.closeLoading();
				$(".goback-header").attr("moocid",dataid);
				scrollBar.scrollBar($(".pop-cont .chapter-body"),$(".pop-cont .chapter-body .chapter"));
			});
		});
		$(document).on("click",".goback-header .goback,.goback-header .search-title",function(){
			$(".btns .sure").removeClass("active");
			exports.searchContrl();
		});
		$(document).on("click",".chapter-body i.checkbox",function(){
			var parent = $(this).parent();
			if(parent.next() != null){
				var ul = parent.next();
				if($(this).hasClass("active")){
					ul.find(".checkbox").removeClass("active");
					$(this).removeClass("active");
				}else{
					ul.find(".checkbox").addClass("active");
					$(this).addClass("active");
				}
			}else{
				if($(this).hasClass("active")){
					$(this).removeClass("active");
				}else{
					$(this).addClass("active");
				}	
			}
			//这边判断是否显示导入可用
			if($(".chapter-body i.checkbox").hasClass("active")){
				$(".btns .sure").addClass("active");
			}else{
				$(".btns .sure").removeClass("active");
			}
			return false;
		});
		$(document).on("click",".chapter-body .li-title",function(){
			var prev = $(this).prev();
			if(prev.hasClass("checkbox")){
				prev.click();
			}
			return false;
		});
		$(document).on("click",".chapter-body .treedown",function(){			
			var ul = $(this).parent().next();
			if(ul == null || ul == undefined) return false;
			if(ul.is(":hidden")){
				ul.show(200);
			}else{
				ul.hide(200);
			}
			return false;
		});
	}
	//共同的操作部分
	exports.commonContrl = function(content) {
		$(content).find('.sure').removeClass('active');
		$(content).find('.dr-pop .cancel').on('click', function() {
			layer.closeAll();
		});
		$(content).find('.dr-pop .close').on('click', function() {
			layer.closeAll();
		});
		$(content).find('.dr-pop-link .cancel').on('click', function() {
			layer.closeAll();
		});
		$(content).find('.dr-pop-link .close').on('click', function() {
			layer.closeAll();
		});
		$(content).find('.dr-from .import1').on('click', function() {
			exports.searchContrl();
		});
	};
	
	/*
	 * singleCheck 多选或者单选 defaultUploader 是否使用默认是上传器 canSelectFolder
	 * 目录是否可以选择, intCallBack 初始化的回调 finishCallback 上传完成或者点击确定之后进行回调
	 */
	exports.openResourceDialog = function(intCallBack,dataCallback,finishCallback) {
		var tpl = template('tpl-mooc-resource-dialog', []);
		var layerIndex = layer.open( {
			type : 1,
			title : false,
			closeBtn : false,
			area : [ '830px', '585px' ],
			success : function(content) {
				exports.commonContrl(content);
				var activeIndex = $(content).find('.dr-from a.active').index();
				if (activeIndex == 0) {
					exports.searchContrl();
				}
				$(content).find('.sure').on('click', function() {
					if (!$(this).hasClass('active')) return false;
					var _this = this;
					$(_this).removeClass('active');
					$(_this).html('导入...');
					var idArray = new Array();
					var moocid = $(".goback-header").attr("moocid");
					$(content).find('.chapter-body .chapter .chapter-li').each(function() {
						 var leavelFirstLi =  $(this);
						 var checkbox = leavelFirstLi.find(".chapter-title .checkbox");
						 var chapterid = 0;
						 var subchapterid = 0;
						 var lessonid = 0;
						 chapterid = leavelFirstLi.attr("data-id");
						 leavelFirstLi.find('.subchapter .subchapter-li').each(function(){
							 var leavelSecondLi = $(this);
							 checkbox = leavelSecondLi.find(".sub-chapter-title .checkbox");
							 subchapterid = leavelSecondLi.attr("data-id");
							 leavelSecondLi.find('.filelists .lesson-li').each(function(){
								 var leavelThirdLi = $(this);
								 checkbox = leavelThirdLi.find(".third-chapter-title .checkbox");
								 if(checkbox.hasClass("active")){
									 lessonid = leavelThirdLi.attr("data-id");
									 if(dataCallback) {
										 dataCallback(moocid,chapterid,subchapterid,lessonid);
									 }
								 }
							 });
						 });
					});
					if(finishCallback){
						finishCallback();
					}
					layer.closeAll();
				});
				if (intCallBack) {
					intCallBack($(content));
				}
			},
			content : tpl,
			shift : 7,
			moveType : 1
		});
		return layerIndex;
	}
});
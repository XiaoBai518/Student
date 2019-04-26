define(function(require,exports,module){
	 window.$=window.jQuery=$=require('jquery');
	 var layer=require('layer');
	 require('layuiV3');
	 var plugin=require('plugin');
	 var template = require('art-template');
	 var API = require('API');
	 var scrollBar=require('scrollBar');
     template.helper('time_format', function (unixTime) {
     	return plugin.time_format_month_day(unixTime);
     });
     template.helper('substr38',function(a){
        return plugin.subStringLen(a,38);
	 })
     function setColumn(){
     	var box = $('.ktcon2');
     	var item = box.find('dl');
     	var boxWidth = box.outerWidth(),
     		itemWidth = item.eq(0).outerWidth(),x,y;
     	var f = Math.floor(boxWidth/itemWidth),
     		g = boxWidth%itemWidth;
     	if(g<20*(f-1)){
     		f = f-1;
     		g = boxWidth - itemWidth * f;
     	}
     	item.each(function(i){
     		$(this).css({'margin-right':g/(f-1)+'px'})
     		if((i+1)%f===0){
     			$(this).css({'margin-right':0})
     		}
     	})
     }
     /*$(window).on('resize',function(){
     	setColumn();
     })*/
     //空白部分
	 function showBlank(){
		 $(".empty-box").show();
		 $("#viewer-container-lists").hide();
         $('.ktcon1r .ktli1').hide();
         $('.guidangpaixutop .ktli1').hide();
	};
	 function hideBlank(){
		 $(".empty-box").hide();
		 $("#viewer-container-lists").show();
         $('.ktcon1r .ktli1').show();
         $('.guidangpaixutop .ktli1').show();
	 };
	 //生成默认的课程
	 function createDefaultCourse(){
		 $("#create-Default-course").show();
		 API.courseApi_createDefaultCourse(function(data){
			 location.reload();
		 });
	 };
	 //列出所有未被归档的课程
	 function lists(){
	 	console.log("haah");
		 $("#viewer-container-lists").html("");
		 API.courseApi_lists(localStorage["uid"],function(data){
			 if(data.lists == null || data.lists.length == 0){
				 showBlank();
			 }else{
				 hideBlank();
			 }
			 var html = template('tpl-course',data);
			 var html2 = template('tpl-leftlists',data);
			 $("#viewer-container-lists").append(html);
			 $("#left_lists").append(html2);
			 
			 //introstart();
		 });
	 };

	function introstart(){
		if($('.ktcon2 dl').length==1){
			var courseid=$('.ktcon2 dl').eq(0).attr('data-id')
		}
		var introtype=1
		API.TourApi_isTour(courseid,introtype,function(data){
			if(data.isTour==0){
				require.async(['intro','/Public/Common/js/lib/intro/introjs.css'],function(){
					var intros=introJs().setOptions({'prevLabel':'〈 上一步','nextLabel':'下一步 〉','skipLabel':'跳过','doneLabel':'完成'}).start();
					intros.oncomplete(function() {
						API.TourApi_setTourFinish(introtype,function(){});
					});
				});
			}
		})
	}

	 //新消息弹窗
    var drLayer;
    var totalcount = $("#notice span").text()||0;
    function setPopMsg(data){
    	var html = template('tpl-notice-pop',data);
        $("#notice-pop").html(html);
        plugin.previewImg($('.fileext[data-ispic=1]'));
		function loadImage(url, callback) {
			var img = new Image();
			img.src = url;
			if (img.complete) {
				callback.call(img);
				return;
			}
			img.onload = function() {
				callback.call(img);
			};
		};
		var imgs = $("#notice-pop .notifyV2-item .notifyV2-right img");
		if(imgs.size()>0){
			imgs.each(function(i){
				loadImage($(this).attr('src'),function(){
					if(i==0){
						setTimeout(function(){
							$("#notice-pop .notifyV2-item .notifyV2-right").each(function(){
					        	if($(this).get(0).scrollHeight<=155){
					        		$(this).find('.toggle').hide();
					        	}else{
					        		$(this).find('.toggle').show();
					        	}
					        })
						},0)
					}
				})
			})
		}else{
			$("#notice-pop .notifyV2-item .notifyV2-right").each(function(){
	        	if($(this).get(0).scrollHeight<=155){
	        		$(this).find('.toggle').hide();
	        	}else{
	        		$(this).find('.toggle').show();
	        	}
	        })
		}
    }
    //展开收起
    $(document).on('click','#notice-pop .notifyV2-mid .toggle',function(){
    	var h = $(this).text();
    	var obj = $(this).parents('.notifyV2-right');
    	if(h=='收起'){
    		obj.animate({'height':'155px'},function(){
    			$(this).removeClass('toggleDown');
    		});
    		$(this).text('展开');
    	}else if(h=='展开'){
			obj.animate({'height':obj.get(0).scrollHeight});
    		$(this).text('收起');
    	}
    	setTimeout(function(){
    		// $('#notice-pop .class-cont').css('height', $('#notice-pop .class-cont').outerHeight())
	    	scrollBar.scrollBar($('#notice-pop .class-cont'), $('#notice-pop .class-cont .cont-box'));
    	},400)
    })
    $(document).on("click",".layui-layer-shade",function(){
    	$(".layui-layer.layui-layer-page").removeClass("shadowing");
    	setTimeout(function(){
    		$(".layui-layer.layui-layer-page").addClass("shadowing");
    	},100)
    })
    //忽略
    $(document).on('click','#notice-pop .notifyV2-item .readedit',function(){
    	var id = $(this).parents('.notifyV2-item').attr('data-id');
    	var self = this;
    	API.messageApi_readIt(id,function(data){
    		$(self).parents('.notifyV2-item').addClass('readed');
    		$(self).fadeOut();
    		plugin.ignoreOneMsgDomChange(id);
    	})
    })
    //关闭弹窗然后不再显示，除非消息有变化  网站其他部分操作消息也得随之改变
    $(document).on("click",'#notice-pop .close',function(event){
    	var messagestr = '';
    	$('#notice-pop .notifyV2-item').each(function(i){
    		if(!$(this).hasClass('readed')){
    			messagestr+=$(this).attr('data-id');
    		}
    	})
    	localStorage.message = messagestr;
		var _this=this;
		require.async('fly',function(){
			$(".layui-layer-shade").hide();
			$('.layui-layer-content').css("overflow","hidden");
			$(_this).parents(".layui-layer.layui-layer-page").css("overflow","hidden").animate({
				"opacity":"0"
			},200,function(){
				var offset = $("#notice").offset();
				var elem = $("#notice-pop .close").offset();
				var flyer = $('<img class="msgicon" src="/Public/Home/img/msgicon.jpg">');
				flyer.fly({
					start: {
						left: elem.left, //抛物体起点横坐标
						top: elem.top,////抛物体起点纵坐标
						opacity:"1"
					},
					vertex_Rtop: 0,
					speed:1.5,
					end: {
						left: offset.left-20, //抛物体终点横坐标
						top: offset.top-5 , //抛物体终点纵坐标
						opacity:"0.3"
					},
					onEnd: function() {
						flyer.fadeOut(600);
						layer.close(drLayer);
						this.destory();//销毁抛物体
						$("#notice-pop").remove();
					}
				});
			});
		})

    	
    })
    //计算导入弹窗高度
    $(window).on('resize',function(){
        var drPopHeight=parseInt($(window).height()*0.9)-60-85;
        if(drPopHeight>435)drPopHeight=435;
        $('.dr-pop .pop-cont').css('height',drPopHeight);
        $('.dr-pop .class-cont').css('height',drPopHeight);
        layer.style(drLayer, {
            height:'auto'
        });
        $('.layui-layer-content').css('height','auto');
		scrollBar.scrollBar($('#notice-pop .class-cont'), $('#notice-pop .class-cont .cont-box'));
    });
	 var guidang = {};
	 //老师和学生公共的部分
	 exports.common = function(){
	 	console.log("开始");
	 	//获取课程
	 		lists();
	 		console.log("结束");
		 //获取公告通知
		 API.messageApi_getPopMsg(function(data){
		 	var messagestr = '';
	    	data.data&&data.data.reverse().map(function(item,index,arr){
	    		item.createtime = plugin.time_format_year_month_day(item.createtime);
	    		messagestr += item.id;
	    	})
	    	if(!localStorage.message||localStorage.message!=messagestr){
	    		setPopMsg(data);
		        var drPopHeight=parseInt($(window).height()*0.9)-60-85;
		        if(drPopHeight>435)drPopHeight=435;
		        $('.dr-pop .pop-cont').css('height',drPopHeight);
		        $('.dr-pop .class-cont').css('height',drPopHeight);
		        drLayer=layer.open({
		            type: 1,
		            title: false,
		            closeBtn: false,
		            /*shade: [0],*/
		            area: ['810px'],
		            success: function () {
		                $('.layui-layer-content').css('height','auto');
					},
					end:function(){
						console.info(2);
						console.info($('#notice-pop'));
						$('#notice-pop').html('');
					},
					cancel:function(){
						console.info(1);
						console.info($('#notice-pop'));
						$('#notice-pop').html('');
					},
		            content: $('#notice-pop'),
		            zIndex:10,
		            shift: 7,
		            moveType: 1
		        });
				 scrollBar.scrollBar($('#notice-pop .class-cont'), $('#notice-pop .class-cont .cont-box'));
	    	}
	        
	    })
		 //点击空白消失
		 $(".bgx").click(function () {
			 $(".bgx").hide();
			 $(".kdcgd").hide();
			 $(".kdcgdx").hide();
			 $(".kdmore").removeClass("on");
			 $(".kdmorex").removeClass("on");
		 });
		 //更多
		 $(document).on('click', ".ktcon2 .kdmore", function () {
             $('.ktcon2 .kdmore').removeClass('on')
             $('.ktcon2 .kdcgd').hide();
			 $(this).parent().find(".kdcgd").show();
			 $(this).addClass("on");
             return false
		 });
         $(document).click(function(){
             $('.ktcon2 .kdmore').removeClass('on')
             $('.ktcon2 .kdcgd').hide();
             $('.kdcgdx').hide();
             $('.kdmorex').removeClass('on');
             if($('.options').is(':visible')){
             	$('.options').hide();
             }
             
         });
         //复制课程
         $(".ktcon2").on("click", ".kdcgd li.kdli5", function () {
        	 var id = $(this).parents('dl').attr('data-id');
        	 var data = [];
        	 data['courseid'] = id;
        	 var html=template('tpl-copyClass',data);
			 $('body').append(html);
			 $(".bg").show();
			 $('#copy-class input:first').focus();
         });
		 //开始复制
		 var bCopy = true;
		 $(document).on('click','#copy-class .sure',function(){
			 var coursename=$('#copy-class input').val();
			 var courseid = $("#copy-class").attr('data-id');
			 if(coursename==''){
				 plugin.openMsg('请输入班级名称', 1);
				 return;
			 }
			 var copymember = 0;
			 if($('#copy-class .copymember').is(':checked')) {
				 copymember = 1;
			 }
			 var copyteacher = 0;
			 if($('#copy-class .copyteacher').is(':checked')) {
				 copyteacher = 1;
			 }
			 var copycourseware = 0;
			 if($('#copy-class .copycourseware').is(':checked')) {
				 copycourseware = 1;
			 }
			 var obj = $(this);
			 if(bCopy){
				 bCopy=false;
				 obj.html("正在复制...");
				 API.courseApi_copyCourse(coursename,courseid,copymember,copyteacher,copycourseware,function(data){
					if(data.status == 1){
						 $('#copy-class').remove();
						 $('.bg').hide();
						 var html = template('tpl-course',{lists:[data.data],newtype:true});
						 $('.ktcon2').prepend(html);
						 plugin.openMsg('班级复制成功',0);
						 hideBlank();
					}else{
						if(data.state == 1){
							var maxCourseCount = $("#viewer-container-lists").attr('data-course-count');
							var title="您不是VIP用户，最多只能创建"+maxCourseCount+"个班级<span style='font-size:12px;'>（包含已经被删除和归档）</span>";
			            	plugin.checkVipDilog("",{title:title,tips:'VIP用户班级数不受限制',index:5},function(data){	
			            	});
						}else{
							plugin.openMsg(data.info,1); 
						}
					}
					obj.html("开始复制");
					bCopy=true;
				 });
			 }
		});
		 
		 //归档
		 $(".ktcon2").on("click", ".kdcgd li.kdli2", function () {
			 $(this).parent().hide();
			 if($(this).parent().find('.kdli1').length == 0){
				$('.guidang .guidangcon p').eq(1).hide();
				$('.guidang .guidangcon p').eq(2).hide();
				$('.guidang .guidangbot .gdli3').hide();
			 }else{
				$('.guidang .guidangcon p').eq(1).show();
				$('.guidang .guidangcon p').eq(2).show();
				$('.guidang .guidangbot .gdli3').show();
			 }
			 $(".bgx").hide();
			 $(".guidang").show();
			 $(".bg").show();
			 $(".kdmore").removeClass("on");
			 guidang.id = $(this).parents('.ktdl1').attr('data-id');
			 guidang.$ele = $(this).parents('.ktdl1');
		 });
		 //归档取消
		 $(".guidangbot ul li.gdli1").click(function () {
			 $(".guidang").hide();
			 $(".bg").hide();
		 });
		 //归档确定（仅仅归档自己）
		 $(".guidangbot ul li.gdli2").click(function () {
			 $(".guidang").hide();
			 $(".bg").hide();
			 API.archiveApi_addArchive(guidang.id,0,function(data){
				 guidang.$ele.remove();
				 plugin.openMsg('归档成功,您可以在“归档管理”进行查看',0);
				 if($("#viewer-container-lists dl").length==0){
					 showBlank();
				 }
                 $('.ktcon1r .ktli2').show();
                 $('.guidangpaixutop .ktli2').show()
			 });
		 });
		 //归档全班，老师可以归档全班
		 $(".guidangbot ul li.gdli3").click(function () {
			 $(".guidang").hide();
			 plugin.cursorconfirm({
				 title:'确定要归档全班？',
		         info:'归档后，全班学生的 该课程 将被移到“归档管理”里，学生也可以自行取消归档',
		         canel:'取消',
		         sure:'确定',
		         sureCallback:function(){
				 	$(".bg").hide();
				 	API.archiveApi_addArchive(guidang.id,1,function(data){
				 		guidang.$ele.remove();
				 		plugin.openMsg('归档成功,您可以在“归档管理”进行查看',0);
				 		if($("#viewer-container-lists dl").length==0){
				 			showBlank();
				 		}
				 		$('.ktcon1r .ktli2').show();
				 		$('.guidangpaixutop .ktli2').show()
				 	});
			 	},
			 	canelCallback:function(){
			 		$(".guidang").show();
			 	}
			 });
		 });
		 //外部新增删除
		 $(".ktcon2").on("click", ".kdcgd li.kdli3", function () {
		 	var type = $(this).text();
			 $(".deletekt").show();
			 $(".bg").show();
			 $(".deletekt input").val('').focus();
			 $(".kdmorex").removeClass("on");
			 guidang.id = $(this).parents('dl').attr('data-id');
			 guidang.$ele = $(this).parents('dl');
			 var title = $(this).parents('dl').find('dt strong a').text();
			 $(".deletekt .deletetop").html('确定要'+type+'“<span>'+title+'</span>”么？');//find('span').text(title);
			 $(".deletekt .deletebot").find('.dli2 .btn').text(type);
		 });
		 //课堂排序 归档管理选择条
		 $(".guidangpaixutop ul li").click(function () {
			 $(".guidangpaixutop ul li").removeClass("on");
			 $(this).addClass("on");
			 var x1 = $(this).index();
			 $(".guidangpaixucon").hide();
			 $(".guidangpaixucon").eq(x1).show();
		 });
		 
		 //获取课堂排序 
		 var getCourses = function() {
			 var elements = [];
			 $('.ktcon2').find('.ktdl1').each(function(i, ele) {
				 var $tempEle = $("<li><i style='background-color:#1da3c5'></i><span></span></li>");
				 $tempEle.attr('data-id',$(ele).attr('data-id'));
				 $tempEle.find('span').html($(ele).find('strong').text());
				 $tempEle.find('i').css('background-color',$(ele).attr('data-color'));
				 elements.push($tempEle[0]);
			 })
			 return elements;
		 }
		 //课程排序
		 $(".ktcon1r ul li.ktli1, .guidangpaixutop .ktli1").click(function () {
			 require.async('jquery-ui',function(){
				 $(".guidangpaixu").show();
				 $(".guidangpaixutop ul li").removeClass("on");
				 $(".guidangpaixutop ul li").eq(0).addClass("on");
				 $(".guidangpaixucon").hide();
				 $(".guidangpaixucon").eq(0).show();
				 $(".bg").show();
				 $(".guidangpaixucon .gxul").html(getCourses());
				 scrollBar.scrollBar($('.guidangpaixucon.gd1'),$('.guidangpaixucon.gd1 ul'));

				 $(".guidangpaixucon .gxul").sortable({
					 axis: 'y',
					 update: function (event, ui) {
						 var arr=[];
						 $(this).children().each(function(i, ele) {
							 var id = $(ele).attr('data-id');
							 var index = i;
							 arr.push($(this).attr('data-id'));
							 $('.ktcon2').find('.ktdl1').each(function(i, ele) {
								 if($(ele).attr('data-id') == id) {
									 $(ele).appendTo($('.ktcon2'));
								 }
							 })
						 });
						 var ids=arr.join('|');
						 API.courseApi_updateCourseSortBat(ids,function(data){});
					 }
				 });
			 })
		 });

         //课程排序移入样式
         $(document).on('mouseover','.guidangpaixucon.gd1 ul li',function(){
            $(this).css({'border':'1px solid #4d90fe','z-index':'999'})
         });
         $(document).on('mouseleave','.guidangpaixucon.gd1 ul li',function(){
             $(this).css({'border':'1px solid #ececec','z-index':'0'})
         });

         //归档排序滚动条
         ;(function(){
             var drPopHeight=parseInt($(window).height()*0.9)-60;
             var drTop=-parseInt($(window).height()*0.9/2)
             if(drPopHeight>520){
                 drPopHeight=520;
                 drTop=-290;
             }
             $('.guidangpaixucon').css('height',drPopHeight);
             $('.guidangpaixu').css('margin-top',drTop);
			 scrollBar.scrollBar($('.guidangpaixucon.gd1'), $('.guidangpaixucon.gd1 ul'));
			 scrollBar.scrollBar($('.guidangpaixucon.gd2'), $('.guidangpaixucon.gd2 .bb-div'));
             $(window).bind('resize',function(){
                 drPopHeight=parseInt($(window).height()*0.9)-60;
                 drTop=-parseInt($(window).height()*0.9/2)
                 if(drPopHeight>520){
                     drPopHeight=520;
                     drTop=-290
                 }
                 $('.guidangpaixucon').css('height',drPopHeight);
                 $('.guidangpaixu').css('margin-top',drTop);
				 scrollBar.scrollBar($('.guidangpaixucon.gd1'), $('.guidangpaixucon.gd1 ul'));
				 scrollBar.scrollBar($('.guidangpaixucon.gd2'), $('.guidangpaixucon.gd2 .bb-div'));
             })
         })();

		 
		 //归档管理(列出所有的归档)
		 $(".ktcon1r ul li.ktli2, .guidangpaixutop .ktli2").click(function () {
			 $(".guidangpaixu").show();
			 $(".guidangpaixutop ul li").removeClass("on");
			 $(".guidangpaixutop ul li").eq(1).addClass("on");
			 $(".guidangpaixucon").hide();
			 $(".guidangpaixucon").eq(1).show();
			 $(".bg").show();
			 $("#viewer-container-archiverlist .bb-div").html("");
			 API.archiveApi_lists(function(data){
				 if(data.lists.length > 0){
					 for(var i=0;i<data.lists.length;i++){
						 var archive = new Array();
						 archive['a'] = data.lists[i];
						 var html = template('tpl-archive',archive);
						 $("#viewer-container-archiverlist .bb-div").append(html);
						 scrollBar.scrollBar($('.guidangpaixucon.gd2'), $('.guidangpaixucon.gd2 .bb-div'));
					 } 
				 }else{
					 var tplRender = '<div style="text-align:center;font-size:15px;margin-top: 40px;">暂无班级被归档</div>';
					 $("#viewer-container-archiverlist .bb-div").append(tplRender);
				 }
			 });
		 });
		 //课堂排序 归档管理关闭
		 $(".guidangpaixu .guidangpaixutop .gdpcmore").click(function () {
			 $(".guidangpaixu").hide();
			 $(".guidangpaixutop ul li").removeClass("on");
			 $(".guidangpaixutop ul li").eq(0).addClass("on");
			 $(".guidangpaixucon").hide();
			 $(".guidangpaixucon").eq(0).show();
			 $(".bg").hide();
		 });
		 
		 //归档管理更多
		 $(".gd2").on('click', ".kdmorex", function () {
             $('.kdcgdx').hide()
             $('.kdmorex').removeClass('on')
			 $(this).parent().find(".kdcgdx").show();
			 $(this).addClass("on");
             return false
		 });
		 //归档管理的恢复
		 $(".gd2").on('click', ".gdhf", function () {
			 $('.guidangpaixu').hide();
			 $(".huifukt").show();
			 $(".kdmorex").removeClass("on");
			 guidang.id = $(this).parents('.gpdl1').attr('data-id');
		 });

		 //归档恢复取消
		 $(".huifuktbot ul li.hfli1").click(function () {
			 $(".huifukt").hide();
			 $(".bg").hide();
		 });
		 
		 //归档恢复  确定
		 $(document).on('click',".huifuktbot ul li.hfli2",function () {
			 API.archiveApi_cancleArchive(guidang.id,function(data){
				 var html = template('tpl-course',{lists:[data.data]});
                 $('.guidangpaixucon dl').each(function(){
                     if($(this).attr('data-id')==guidang.id){
                         $(this).remove();
                     }
                 });
				 $('.ktcon2').append(html);
				 $(".huifukt").hide();
				 $(".bg").hide();
				 hideBlank();
			 });
		 });
		 
		 //归档管理  删除课程弹窗
		 $(".gd2").on('click', ".gdsc", function () {
		 	var type = $(this).text();
			 $(this).parents('.guidangpaixu').hide();
			 $(".deletekt").show();
             $(".deletekt input").val('').focus();
			 $(".kdmorex").removeClass("on");
			 guidang.id = $(this).parents('.gpdl1').attr('data-id');
			 guidang.$ele = $(this).parents('.gpdl1');
			 var title = $(this).parents('.gpdl1').find('strong a').text();
			 $(".deletekt .deletetop").html('确定要'+type+'“<span>'+title+'</span>”么？');//find('span').text(title);
			 $(".deletekt .deletebot").find('.dli2 .btn').text(type);
		 });

		 //归档管理的删除弹窗的 取消
		 $(".deletebot ul .dli1").click(function () {
			 $(".deletekt").hide();
			 $(".bg").hide();
		 });

         $(".deletekccon input").keyup(function(){
             if($(this).val()!=''){
                 $('.deletebot  ul li.dli2 a').addClass('btn-positive').removeClass('disable');
             }else{
                 $('.deletebot  ul li.dli2 a').removeClass('btn-positive').addClass('disable');
             }
         });


		 
         //发送激活邮件
         $(document).on('click',"#sendEmail",function(){
        	 API.userApi_sendActiveEmail(function(data){
        		 plugin.openMsg('激活邮件已经发送，请查收',0);
        	 });
         });
		 
         //关闭未验证
         $(document).on('click','.wyz-bar .close',function(){
             $('.wyz-bar').hide();
         });


         //创建课堂取消
		 $(".chuangjiankcbot ul .cjli1").click(function () {
			 $(".chuangjiankc").hide();
			 $(".bg").hide();
		 });
		 //创建课堂输入
		 $('.chuangjiankccon input').keyup(function(){
			 if($(this).val()!=''){
				 $('.chuangjiankcbot ul li.cjli2 a').addClass('btn-positive').removeClass('disable');
			 }else{
				 $('.chuangjiankcbot ul li.cjli2 a').removeClass('btn-positive').addClass('disable');
			 }
		 });
         //加入课程的确认部分
		 var bAdd=true;
		 $(document).on('click',".chuangjiankcbot ul .cjli2 a", function () {
			 var code = $('.chuangjiankccon input').val();
			 if(code == ''){
				 bAdd=true;
				 return false;
			 }else if(code.length < 6){
				 bAdd=true;
				 plugin.openMsg('加课验证码必须是6位字符',1);
				 return false;
			 }else{
				 $(this).html('正在加入').removeClass('btn-positive').addClass('disable')
				 if(bAdd){
					 bAdd=false;
					 API.courseApi_joinCourseByCode(code,function(data){
						 if(data.status == 1){
							 var html = template('tpl-course',{lists:[data.data],newtype:true});
							 $('.ktcon2').prepend(html);
							 $(".chuangjiankc").hide();
							 $(".bg").hide();
							 plugin.openMsg('加入课堂成功',0);
							 hideBlank();
							 bAdd=true;
						 }else{
							 plugin.openMsg(data.info,1);
							 bAdd=true;
						 }
						 $('.chuangjiankcbot ul .cjli2 a').html('确定').addClass('btn-positive').removeClass('disable');

					 });
				 }

			 }
		 });
	 };
	 
	 //学生部分
	 exports.student = function(){
		 exports.common();//公共部分
		 //学生退课部分 确认部分
		//  API.TwoelevenVipActivity2018Api_isAllowPopDialog(function(data){
		// 	if(data.allow == 1){
		// 		$('.ad').show();
		// 	}
		//  })
		//  $(document).on('click','.closead',function(){
		// 	API.TwoelevenVipActivity2018Api_readIt(function(data){});
		// 	$('.ad').remove();
		//  });
		 $(".deletebot ul").delegate(".btn-positive", "click", function () {
			 var password = $(".deletekccon input").val();
			 API.courseApi_delCourse_student(guidang.id,password,function(data){
				 $(".deletekt").hide();
				 $(".bg").hide();
				 guidang.$ele.remove();
				 plugin.openMsg('课程退课成功',0);
				 if($('#viewer-container-lists dl').length==0){
				 	showBlank();
				 }
			 });
		 });

		 $(document).on('click','.jumptoclass',function(e){
			e.preventDefault();
			var cid = $(this).data('id');
			var cname = $(this).text();
			var _this = this;
			API.CourseApi_confirmUserToCourse(cid,function(data){
				if(data.status != 1){
					plugin.openMsg(data.info,1);
					return false;
				}else{
					API.CourseApi_checkMyInfo(cid,function(data){
						if(data.state == 1){
							location.href = $(_this).attr('href');
						}else{
							data.cname = cname;
							var l = layer.open({
								type: 1,
								title: '补充个人信息',
								closeBtn: true,
								area:['400px'],
								content: template('tpl-extra-info',data),
								shift: 7,
								moveType: 1,
								success:function(d){
									layui.laydate.render({
										elem: '#needentrance',
										max: 0,
										done: function(value, date, endDate){
											   
										}
									});
									d.find('.sureinfo').on('click',function(){
										var spro = $('#needspecialty').val();
										var sclass = $('#neednatureclass').val();
										var sgrade = $('#needgrade').val();
										var sdate = $('#needentrance').val();
										var user = {}
										if(data.setting.classno==1){
											if(sclass!=''){
												user.classno = sclass;
											}else{
												plugin.openMsg('请填写班级信息',1);
												return false;
											}
										}
										if(data.setting.enrolltime==1){
											if(sdate!=''){
												user.enrolltime = sdate;
											}else{
												plugin.openMsg('请填写入学时间',1);
												return false;
											}
										}
										if(data.setting.grade==1){
											if(sgrade!=''){
												user.grade = sgrade;
											}else{
												plugin.openMsg('请填写年级信息',1);
												return false;
											}
										}
										if(data.setting.major==1){
											if(spro!=''){
												user.major = spro;
											}else{
												plugin.openMsg('请填写专业信息',1);
												return false;
											}
										} 
										API.StudentAddtionInfoApi_updateMyCourseInfo(cid,user,function(tData){/////api 修改 学生专业年级性别
											location.href = $(_this).attr('href');
										});
									})
									d.find('.quitinfo').on('click',function(){
										layer.close(l);
									})
								}
							});
						}
					})
				}
			})
			
		})

		 //创建课堂
		 $(".ktcon1l").click(function () {
			 $(".chuangjiankc").show();
			 $('.chuangjiankc input').val('');
			 $('.chuangjiankc input').focus();
			 $(".bg").show();
		 });
	 };
	 
	 //老师部分
	 exports.teacher=function() {
		 var timer=null;
		//  API.TwoelevenVipActivity2018Api_isAllowPopDialog(function(data){
		// 	if(data.allow == 1){
		// 		$('.ad').show();
		// 	}
		//  })
		//  $(document).on('click','.closead',function(){
		// 	API.TwoelevenVipActivity2018Api_readIt(function(data){});
		// 	$('.ad').remove();
		//  });
		 //新建班级弹窗
		 $('.ktcon1l').click(function(e){
		 	$(this).next('.options').show();
		 	e.stopPropagation();
		 })
		 $('#joinClass').click(function(){
		 	$(".chuangjiankc").show();
			 $('.chuangjiankc input').val('');
			 $('.chuangjiankc input').focus();
			 $(".bg").show();
		 })
		 $('#addClass').click(function () {
			  // API.agencyApi_getLists(function(data){
				 var html=template('tpl-newClass')
				 $('body').append(html);
				 $(".bg").show();
				 $('#new-class input').focus();
				 if(data.data.length>0){
					 plugin.setSlideswitch('islinkswitch',false,function(s){
						 if(s){
							 $('.linkinfo').show();
						 }else{
							$('.linkinfo').hide();
						 }
					 })
				  }
				//  var coid=$('.school>span').attr('data-id') || $('.choose-box>p>span').attr('data-id');
				//  if(coid){
				// 	 API.agencyApi_getDepartment(coid,function(datas){
				// 		 $('.department .item-box').html('');
				// 		 for(var i=0; i<datas.data.length; i++){
				// 			 var aHtml=$('<a href="javascript:;" data-id="'+datas.data[i].id+'">'+datas.data[i].departname+'</a>')
				// 			 $('.department .item-box').append(aHtml);
				// 		 }
				// 	 })
				//  }
			 // });
		 });
		 $(document).on('focus','.new-class-pop input',function(){
			$(this).parents('.input-box').addClass('focus');
		 }).on('blur','.new-class-pop input',function() {
			 $(this).parents('.input-box').removeClass('focus')
		 }).on('keyup','.new-class-pop input',function(){
			 var oV=$(this).val();
			 if(oV==''){
				 $('.new-class-pop .pop-btns .sure').removeClass('active');
			 }else{
				 $('.new-class-pop .pop-btns .sure').addClass('active');
			 }
		 });
		//新建班级取消
		 $(document).on('click','.new-class-pop .cancel',function(){
			 $(this).parents('.new-class-pop').remove();
			 $(".bg").hide();
		 })
		 //选择学校
		 $(document).on('click','.new-class-pop .item span:not(".checkno")',function(){
			 $('.new-class-pop .item span').next().slideUp(100);
			 $('.new-class-pop .item').removeClass('active');
			 if($(this).next().css('display')=='none'){
				 $(this).next().slideDown(100)
				 $(this).parents('.item').addClass('active');
			 }else{
				 $(this).next().slideUp(100)
				 $(this).parents('.item').removeClass('active');
			 }
			 return false;
		 });
		 $(document).on('click','.new-class-pop .school .item-box a',function(){
			 var coid=$(this).attr('data-id');
			 var _this=$(this);
			 API.agencyApi_getDepartment(coid,function(datas){
				 $('.department .item-box').html('');
				 if(datas.data.length>0){
					 $('.new-class-pop .department').show();
					 $('.new-class-pop .department span').html('请选择院系').removeAttr('data-id')
				 }else{
					 $('.new-class-pop .department').hide();
				 }
				 for(var i=0; i<datas.data.length; i++){
					 var aHtml=$('<a href="javascript:;" data-id="'+datas.data[i].id+'">'+datas.data[i].departname+'</a>')
					 $('.department .item-box').append(aHtml);
				 }
			 })
		 });
		 $(document).on('click','.new-class-pop .item-box a',function(){
			 $(this).parents('.item').css('border-color','#4D90FE')
			 $(this).parents('.item').find('span').html($(this).html()).attr('data-id',$(this).attr('data-id'));
		 });
		 $(document).on('click',function(){
			 $('.new-class-pop .item span').next().slideUp(100);
			 $('.new-class-pop .item').removeClass('active');
		 });

		 $(document).on('click','.new-class-pop .check-box.switchselect',function(){
			 if($(this).hasClass('active')){
				 $(this).removeClass('active');
				 $('.new-class-pop .item span').removeClass('checkno');
				 $('.ss-shc').removeClass('no');
			 }else{
				 $(this).addClass('active');
				 $('.new-class-pop .item span').addClass('checkno');
				 $('.ss-shc').addClass('no');
				 $('.choose-item .item').css('border-color','#c8c8c8');
			 }
		 });
		 $(document).on('click','.new-class-pop .check-box.normalp',function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$(this).attr('isopen','0');
			}else{
				$(this).addClass('active');
				$(this).attr('isopen','1');
			}
		});
		 //创建课程
		 var bCreat=true;
		 $(document).on('click','#new-class .sure',function(){
			 var coursename=$('#new-class input').val();
			 if(coursename==''){
				 plugin.openMsg('请输入班级名称', 1);
				 return;
			 }
			 // var relation = 0;
			 // var coursenumber = 0;
			 // var coid = 0;
			 // if($('#islinkswitch').attr('switch') == 'on'){
				// relation = 1;
				// coursenumber = $('.classnum').val();
				// // coursenumber = coursenumber.replace(/\D/g,'');
				// coid=$('#new-class .school>span').attr('data-id')||$('.choose-box>p>span').attr('data-id');
				// if($('#isonly').attr('only')=='1'){coid=$('#isonly').attr('coid')}
				// if(!coid){
				// 	plugin.openMsg('请选择所属学校',1);
				// 	return;
				// }
				// if(coursenumber == '' || coursenumber == '0'){
				// 	plugin.openMsg('请输入班级号',1);
				// 	return;
				// }
			 // }
			//  if($('#new-class').find('.choose-box').length==0 || $('.check-box.switchselect').hasClass('active')){
			// 	 coid=0;
			// 	 departid=0;
			//  }else{
			// 	 coid=$('#new-class .school>span').attr('data-id')||$('.choose-box>p>span').attr('data-id');
			// 	 if ($('.department').css('display') == 'block') {
			// 		 departid = $('#new-class .department>span').attr('data-id');
			// 	 }else{
			// 		 departid = 0
			// 	 }
			// 	 if(!coid){
			// 		 plugin.openMsg('请选择所属学校',1);
			// 		 return;
			// 	 }
			// 	 if(!departid){
			// 		 if($('.department').css('display')=='block'){
			// 			 plugin.openMsg('请选择所属院系',1)
			// 			 return;
			// 		 }else{
			// 			 departid=0;
			// 		 }
			// 	 }
			//  }
			 // var needspecialty = $('#spro').attr('isopen');//专业
			 // var neednatureclass = $('#sclass').attr('isopen');//班级
			 // var needgrade = $('#sgrade').attr('isopen');//年级
			 // var needentrance = $('#sdate').attr('isopen');//入学年月
			 if(bCreat){
				bCreat=false;
				 API.courseApi_createCourseV3(coursename,localStorage["uid"],function(data){
					 if(data.status == 1){
						 $('#new-class').remove();
						 $('.bg').hide();
						 var html = template('tpl-course',{lists:[data.data],newtype:true});
						 $('.ktcon2').prepend(html);
						  var html2 = template('tpl-leftlists',{lists:[data.data],newtype:true});
						 $("#left_lists").append(html2);
						
						 if(data.info != 'success'){
							 plugin.openMsg(data.info,1);
						 }else{
						 	 plugin.openMsg('班级已创建',0);
						 }
						 hideBlank();
					 }
					 bCreat=true;
				 })
			 }
		 });
		 var abandonLayer=null;
		 $(document).on('click','#have-attend .cancel',function(){
			 abandonLayer=layer.open({
				 type: 1,
				 title: false,
				 closeBtn: false,
				 area: ['400px', '196px'],
				 content: $('#abandon-attend'),
				 shift: 7,
				 moveType: 1
			 });
		 });
		 $(document).on('click','#have-attend .sure',function(){
			 var id=$('#have-attend').attr('data-id');
			 var courseid=$('#have-attend').attr('data-courseid');
			 location.href="/Attence/index?courseid="+courseid+"&id="+id;
		 });
		 //取消放弃
		 $(document).on('click','#abandon-attend .cancel',function(){
			 layer.close(abandonLayer);
		 });
		 //确认放弃
		 $(document).on('click','#abandon-attend .sure',function(){
			 var id=$('#have-attend').attr('data-id');
			 API.attenceApi_delAttence(id,function(data){
				 layer.closeAll();
				 plugin.openMsg('考勤已放弃',0)
			 });
			 clearInterval(timer);
		 });
		 exports.common();//公共部分
		 //重命名
		$(document).on("click", ".ktcon2 .kdcgd li.kdli1", function () {
			var id=$(this).parents('dl').attr('data-id');
			API.courseApi_getCourse(id,function(data){
				data.data.courseid=id;
				if(data.data.agencyCount>0){
				API.agencyApi_getLists(function(data2){
					API.CourseApi_getRelationInfo(id,function(datas){
						data.data.cinfo = datas.data;
						data.data.sinfo = data2.data;
						var html=template('tpl-editClass',data.data);
						$('body').append(html);
						$('.bg').show();
						plugin.moveEnd($('#edit-class input').get(0));
						if(datas.data.coursenumber){
							$('.linkinfo').show();
							plugin.setSlideswitch('islinkswitch',true,function(s){
								if(s){
									$('.linkinfo').show();
								}else{
								$('.linkinfo').hide();
								}
							})
						}else{
							$('.linkinfo').hide();
							plugin.setSlideswitch('islinkswitch',false,function(s){
								if(s){
									$('.linkinfo').show();
								}else{
								$('.linkinfo').hide();
								}
							})
						}
					})
				});
				}else{
				var html=template('tpl-editClass',data.data);
				$('body').append(html);
				$('.bg').show();
				plugin.moveEnd($('#edit-class input').get(0));
				}
				//  API.agencyApi_getLists(function(data2){
				// 	 $('.school .item-box').html('')
				// 	 if(data2.data.length==1){
				// 		 $('.ss-shc span').html(data2.data[0].agencyName).attr('data-id',data2.data[0].coid)
				// 	 }
				// 	 for(var i=0; i<data2.data.length; i++){
				// 		 var aHtml=$('<a href="javascript:;" data-id="'+data2.data[i].coid+'">'+data2.data[i].agencyName+'</a>')
				// 		 $('.school .item-box').append(aHtml);
				// 	 }
				// 	 var coid=$('.school>span').attr('data-id') || $('.choose-box>p>span').attr('data-id');
				// 	 if(coid){
				// 	  API.agencyApi_getDepartment(coid,function(datas){
				// 	 	 $('.department .item-box').html('');
				// 	 	 for(var i=0; i<datas.data.length; i++){
				// 	 		 var aHtml=$('<a href="javascript:;" data-id="'+datas.data[i].id+'">'+datas.data[i].departname+'</a>')
				// 	 		 $('.department .item-box').append(aHtml);
				// 	 	 }
				// 	  })
				// 	 }
				//  });
			})
		 });

		 //重命名确定
		 $(document).on('click','#edit-class .sure',function() {
			 var coursename = $('#edit-class input').val();
			 if(coursename==''){
				 plugin.openMsg('请输入班级名称', 1);
				 return;
			 }
			//  var coid;
			//  var departid;
			 var courseid=$('#edit-class').attr('data-id');
			//  if ($('#edit-class').find('.choose-box').length == 0 || $('.check-box.switchselect').hasClass('active')) {
			// 	 coid = 0;
			// 	 departid = 0;
			//  } else {
			// 	 coid = $('#edit-class .school>span').attr('data-id') || $('.choose-box>p>span').attr('data-id');
			// 	 if ($('.department').css('display') == 'block') {
			// 		 departid = $('#edit-class .department>span').attr('data-id');
			// 	 }else{
			// 		 departid = 0
			// 	 }
			// 	 if (!coid) {
			// 		 plugin.openMsg('请选择所属学校', 1);
			// 		 return;
			// 	 }
			// 	 if (!departid) {
			// 		 if ($('.department').css('display') == 'block') {
			// 			 plugin.openMsg('请选择所属院系', 1)
			// 			 return;
			// 		 } else {
			// 			 departid = 0;
			// 		 }
			// 	 }
			//  }
			 var coursenumber = 0;
			 var coid = 0;
			 if($('#islinkswitch').attr('switch') == 'on'){
				coursenumber = $('.classnum').val();
				// coursenumber = coursenumber.replace(/\D/g,'');
				coid = $('#edit-class .school>span').attr('data-id') || $('.choose-box>p>span').attr('data-id');
				if($('#isonly').attr('only')=='1'){coid=$('#isonly').attr('coid')}
				if (!coid) {
					plugin.openMsg('请选择所属学校', 1);
					return;
				}
				if (!coursenumber) {
					plugin.openMsg('请输入班级号', 1);
					return;
				}
			 }
			 var needspecialty = $('#spro').attr('isopen');
			 var neednatureclass = $('#sclass').attr('isopen');
			 var needgrade = $('#sgrade').attr('isopen');
			 var needentrance = $('#sdate').attr('isopen');
			 var setting = {
				 major:needspecialty,
				 classno:neednatureclass,
				 grade:needgrade,
				 enrolltime:needentrance
			 }
			 API.CourseApi_renameCourseV3(courseid,coursename,coid,coursenumber,setting,function(data){
				 $('.ktcon2 dl[data-id='+courseid+'] strong a').html(coursename)
				 $('#edit-class').remove();
				 $('.bg').hide();
				 plugin.openMsg('班级已编辑',0);
				 if(data.data.tips != 'success'){
					 plugin.openMsg(data.data.tips,1);
				 }
			 });
		 });


		 
		 //归档管理的删除弹窗的  确定
		 $(".deletebot ul").delegate(".btn-positive", "click", function () {
		 	var type = $(this).text();
			 var password = $(".deletekccon input").val();
			 API.courseApi_delCourse(guidang.id,password,function(data){
				 $(".deletekt").hide();
				 $(".bg").hide();
				 guidang.$ele.remove();
				 plugin.openMsg('课程'+type+'成功',0);
                 if($('#viewer-container-lists dl').length==0){
                 	showBlank();
                 }
			 });

		 });
	 }
	 //绑定微信
	 exports.bindwechat = function(){
		var apiurl = $(".bingWechat").attr('data-api');
	    $.ajax({
	    	type: "GET",
	   	 	url: apiurl,
	   	 	data: {},
	   	 	dataType: "json",
	   	 	success: function(data){
	   	 		if(data.status == 1){
	   	 			$("#wechat-qrcode").attr('src',data.url);
	   	 		}
	   	 	}
	   	});
	    //每隔1.5S检查一次
	    setInterval(function(){
		    API.userApi_isBindWechat(function(data){
		    	if(data.status == 1){
		    		plugin.openMsg('绑定成功',0);
		    		setTimeout(function(){
		    			location.href = "/Main/index.html";
		    		},1500);
		    	}
		    });
	    },1500); 
	 };
});
/**
 * Created by Administrator on 2015/11/21.
 */
define(function(require,exports,module){
    window.$=window.jQuery=$=require('jquery');
    var layer=require('layer');
    var plugin=require('plugin');
    var template = require('art-template');
	template = plugin.templateConfig(template);
	var nativetemplate = require('art-template-native');
	nativetemplate = plugin.templateConfig(nativetemplate);
    var API = require('API');
    var scrollBar=require('scrollBar');
    var importCourseWareDialog = require("/html/Public/Home/js/importcourseware.js");
    var uploaderInteractFile = require("/html/Public/Home/js/uploaderInteractFile.js");
    require('lib/wangEditor/css/wangEditor.min.css');
    var my ={};
    var maxFileLimitSize = 1024*1024*200;//最大到200MB
    my.drtype = '';
    my.toptype = '';
    my.curN = 0;  
    var timer = null;
    //图片上传类
    var ImgUploader = {};
    function initImgUploader(obj,parentid){
 	   require('webuploader');
 	   require('lib/webuploader-0.1.5/webuploader.css');
 	   ImgUploader = WebUploader.create({
 		   auto: true,
 		   swf:'/Public/Common/js/lib/webuploader-0.1.5/Uploader.swf',
 		   server: '/UploadApi/upload',
 		   pick: {id:obj,multiple:true},
 		   resize: false,
 		   duplicate:true,
 		   compress:false,
 		   chunked: false,
 		   chunkSize:4194304,
 		   chunkRetry:4,
 		   fileSingleSizeLimit:1024*1000*10,//10M
 		   accept:{
 			   title: '请选择图片',
 			   extensions: 'gif,jpg,jpeg,bmp,png',
 			   mimeTypes: 'image/*'
 		   }
 	   });
 	   window.ImgUploader = ImgUploader;
 	   var annexBox = $(parentid);
 	   ImgUploader.on( 'fileQueued', function( file ) {
 		   var mFile = {};
 		   mFile.id = file.id;
 		   mFile.name = file.name;
 		   mFile.size = plugin.format_bytes(file.size);
 		   ImgUploader.makeThumb( file, function( error, src ) {
 			   if ( !error ){
 				   mFile.ext = src;
 			   }else{
 				   mFile.ext = plugin.getFileExtIcon(file.ext);
 			   }
 			   var html = template('tpl-fileUp',mFile);
 			   annexBox.prepend(html);
 		   },64,64);
 	   });
 	   ImgUploader.on( 'uploadProgress', function( file, percentage ) {
 		   var $fileDiv = annexBox.find("#"+file.id);
 		   var precent = Math.floor(percentage*100);
 		   if(precent == 99){
 			   $fileDiv.find(".state.fl a span").text("   正在保存...");
 		   }else{
 			   $fileDiv.find(".state.fl a span").text(precent+"%");
 		   }
 	   });
 	   ImgUploader.on( 'uploadError', function( file, reason) {
 		   var $fileDiv = annexBox.find("#"+file.id);
 		   $fileDiv.find(".state.fl a").removeClass();
 		   $fileDiv.find(".state.fl a").addClass('fail');
 		   $fileDiv.find(".state.fl a").text('上传失败');
 	   });
 	   ImgUploader.on('uploadAccept',function(object,ret){
 		   if(ret.status == 1){
 			   var $fileDiv = annexBox.find("#"+object.file.id);
 			   $fileDiv.attr('data-fileid',ret.fileid);
 			   $fileDiv.find(".state.fl a").removeClass();
 			   $fileDiv.find(".state.fl a").addClass('succ');
 			   $fileDiv.find(".state.fl a").text('已上传');
 		   }else if(ret.status == 2){
 			   // 这里是分块上传成功的提示
 		   }else{
 			   plugin.openMsg(ret.info,1);
 		   }
 	   });
 	   ImgUploader.on('error', function(type){
 		   if(type == 'F_EXCEED_SIZE'){
 			   plugin.openMsg('单文件上传超过了10MB',1);
 		   }
 	   });
    };
    //检查转码是否完成了
    exports.checkPPTTransCode = function(opts){
    	 var options = {
			 fileid:'',
			 finishCallback:null,
			 cancleCallback:null,
	 		 errorCallback:null
    	 };
    	 $.extend(options,opts);
    	 var fileid = options.fileid;
    	 var finishCallback = options.finishCallback;
    	 var cancleCallback = options.cancleCallback;
    	 var errorCallback  = options.errorCallback;
		 API.InteractApi_checkPPTTransCode(fileid,function(tData){
			 if(tData.state == 0){
				 if($('.ppt-upload-pop').length == 0){
				 	layer.closeAll();
	                var html = template('tpl-ppt-upload',tData.data);
	                $('body').append(html);
				 	API.InteractApi_sendPPTTOTransCode(fileid);
	                layer.open({
	                    type: 1,
	                    title: false,
	                    closeBtn: false,
	                    area: ['600px','300px'],
	                    content: $('.ppt-upload-pop'),
	                    shift: 7,
	                    moveType: 1
	                });
	                var $fileDiv = $('.ppt-upload-pop');
	                $fileDiv.on('click','.close',function(){
	                    layer.closeAll();
	                    $fileDiv.remove();
	                    plugin.openMsg('已取消添加',1);
	                    if(cancleCallback){
	                    	cancleCallback();
	                    }
	                });
				 }
			 }else if(tData.state < 0){
				 layer.closeAll();
				 $('.ppt-upload-pop').remove();
				 if(errorCallback){
					 errorCallback();
				 }
				 plugin.cursoralert({
					 title:'系统提示',
					 info:tData.info,
					 sure:'知道了',
				 });
			 }else{
				 if(finishCallback){
					 finishCallback();
				 }
			 }
		 });
    };
    exports.listAll=function() {
        function showBlank(){
            $('.empty-box').show();
        };
        function hideBlank(){
            $('.empty-box').hide();
        };
        var courseid = $("#course-header").attr('data-id');
        
        //切换
        $(document).on('click', '.work-title-type a', function () {
            $(this).addClass('active').siblings().removeClass('active');
            var index=$(this).index();
            if(index==1){
                $('.send-an').removeClass('hide');
                $('.send-ppt').addClass('hide');
                $('.send-weike').addClass('hide');
                
                $('#send-box').hide();
                $('#send-weike-box').hide();
            }else if(index==2){
                $('.send-ppt').addClass('hide');
                $('.send-an').addClass('hide');
                $('.send-weike').removeClass('hide');
                
                $('#send-box').hide();
                $('#send-weike-box').hide();
            }else if(index==0){
                $('.send-ppt').removeClass('hide');
                $('.send-an').addClass('hide');
                $('.send-weike').addClass('hide');
                $('#send-box').hide();
                $('#send-weike-box').hide();
            }
        });
        
        //列出所有的互动
        function lists(){
            plugin.loading();
            API.InteractApi_getInteractLists(courseid,function(data){
                $('.announce-box ul').html("");
                if(data.data == null || data.data.length == 0){
                    showBlank();
                }
                for(var i=0;i<data.data.length;i++){
                    var k=0;
                    if(data.data[i].type==1&&data.data[i].stepList&&data.data[i].stepList.length>0){
                        data.data[i].stepList.map(function(item){
                            if(item.over==1){
                                k++;
                            }
                        })
                    }
                    data.data[i].k = k;
                    var html = template('tpl-anList',data.data[i]);
                    $('#viewer-container-lists').append(html);
                }
                plugin.closeLoading();
                introstart();
                //更换ppt
            });
        };
        function introstart(){
            var introtype=10;
            var courseid=$('#course-header').attr('data-id');
            API.TourApi_isTour(courseid,introtype,function(data){
                if(data.isTour==0){
                    require.async(['intro','/Public/Common/js/lib/intro/introjs.css'],function(){
                        $('.announce-cont-box .work-title a').eq(0).attr({'data-step':2,'data-intro':'点击互动名称，查看互动详情','data-position':'top'});
                        $('.announce-cont .link-list').eq(0).attr({'data-step':3,'data-intro':'此互动中包含的环节名称及各环节的状态','data-position':'top'});
                        var intros=introJs().setOptions({'prevLabel':'〈 上一步','nextLabel':'下一步 〉','skipLabel':'跳过','doneLabel':'完成'}).start();
                        intros.oncomplete(function() {
                            API.TourApi_setTourFinish(introtype,function(){});
                        });
                    });
                }
            })
        }
        function setDrPopItemContH(){
            var drPopHeight=parseInt($(window).height()*0.9)-60-85;
            if(drPopHeight>435)drPopHeight=435;
            $('.dr-pop .class-item').css('height',drPopHeight);
            $('.dr-pop .class-cont').css('height',drPopHeight);
        }
        
        //获取资源导入的课程
        function import1List(){
            my.drtype = 'import1';//从备课区导入 试题互动
            $('.dr-pop .dr-from .import1').addClass('active').siblings().removeClass('active');
            API.ResourceApi_getResourceList(function(data){
                my.resourcelist = data;
                data.import1 = true;
                var html1 = template('tpl-import-part',data);
                $(".pop-cont").html(html1);
                var html2 = template('tpl-import-resource',data);
                $(".pop-cont .class-item ul").html(html2);
                setDrPopItemContH();
                scrollBar.scrollBar($('.class-cont.fr'),$('.class-cont.fr .cont-box'));
                scrollBar.scrollBar($('.class-item.fl'),$('.class-item.fl ul'));
                $('.dr-pop .class-item.fl li a ').eq(0).click()
            })
        }

        //列出所有可以导入的互动列表
        function import2List(){
            my.drtype = 'import2';//从班级导入课件互动
            $('.dr-pop .dr-from .import2').addClass('active').siblings().removeClass('active');
            API.InteractApi_importList(function(data){
                data.import2 = true;
                var html1 = template('tpl-import-part',data);
                $(".pop-cont").html(html1);
                setDrPopItemContH();
                var html = template('tpl-import-course',data);
                $("#dr-pop .class-item ul").html(html);
                scrollBar.scrollBar($('.class-cont.fr'),$('.class-cont.fr .cont-box'));
                scrollBar.scrollBar($('.class-item.fl'),$('.class-item.fl ul'));
                $('.dr-pop .class-item.fl li a ').eq(0).click()
            });
        };
        //获取所有可导入的PPT互动(从班级里面进行处理)
        function import2PPT(){
            my.drtype = 'importppt2';
            $('.dr-pop .dr-from .import2').addClass('active').siblings().removeClass('active');
            API.InteractPPTApi_importList(function(data){
                data.import2 = true;
                var html1 = template('tpl-import-part',data);
                $(".pop-cont").html(html1);
                setDrPopItemContH();
                var html = template('tpl-import-course',data);
                $("#dr-pop .class-item ul").html(html);
                scrollBar.scrollBar($('.class-cont.fr'),$('.class-cont.fr .cont-box'));
                scrollBar.scrollBar($('.class-item.fl'),$('.class-item.fl ul'));
                $('.dr-pop .class-item.fl li a ').eq(0).click()
            });
        };
        //ppt导入从备课区进行选择
        function import1PPT(){
            my.drtype = 'importppt1';
            $('.dr-pop .dr-from .import1').addClass('active').siblings().removeClass('active');
            API.ResourceApi_getResourceList(function(data){
                my.resourcelist = data;
                data.import1 = true;
                var html1 = template('tpl-import-part',data);
                $(".pop-cont").html(html1);
                var html2 = template('tpl-import-resource',data);
                $(".pop-cont .class-item ul").html(html2);
                setDrPopItemContH();
                scrollBar.scrollBar($('.class-cont.fr'),$('.class-cont.fr .cont-box'));
                scrollBar.scrollBar($('.class-item.fl'),$('.class-item.fl ul'));
                $('.dr-pop .class-item.fl li a ').eq(0).click()
            });
        };
        lists();
        //点击发布试题互动显示隐藏
        $('.send-an').mousedown(function(){
            $(this).addClass('active');
        }).mouseup(function(){
            $(this).removeClass('active');
        }).click(function(){
            $(this).addClass('hide');
            var data = {};
            data.newpost = 1;
            var html = template('tpl-sendbox',data);
            $('.send-an').after(html);
            $(this).next('.send-box').attr('id','send-box')
            $("#send-box .txt1").focus()
        });
        //发布微课互动
        $('.send-weike').mousedown(function(){
            $(this).addClass('active');
        }).mouseup(function(){
            $(this).removeClass('active');
        }).click(function(){
            $(this).addClass('hide');
            var data = {};
            data.newpost = 2;
            var html = template('tpl-weike-sendbox',data);
            $('.send-weike').after(html);
            $(this).next('.send-box').attr('id','send-weike-box');
            $("#send-weike-box .txt1").focus();
        });
        
        $(document).on('click','#send-box .opt-btn .cancel',function(){
            $('#send-box').remove();
            $('.send-an').removeClass('hide');
        });

        $(document).on('click','#send-weike-box .opt-btn .cancel',function(){
            $('#send-weike-box').remove();
            $('.send-weike').removeClass('hide');
        });
        
        //有内容的时候确定按钮变色
        $(document).on('keyup', '.send-box .txt1',function(){
            var oV1=$(this).val();
            if(oV1!=''){
                $(this).parents('.send-box').find('.opt-cont .sure').addClass('active');
            }else{
                $(this).parents('.send-box').find('.opt-cont .sure').removeClass('active');
            }
        });

        $(document).on('mouseenter','.opt-btn .sure.active',function(){
            $(this).addClass('hover');
        }).on('mouseleave','.opt-btn .sure.active',function(){
            $(this).removeClass('hover');
        }).on('mousedown','.opt-btn .sure.active',function(){
            $(this).addClass('click');
        }).on('mouseup','.opt-btn .sure.active',function(){
            $(this).removeClass('click');
        });


        //操作点击显示隐藏
        $(document).on('click','.announce-box .title .opt .opt-btn',function(){
            $('.announce-box .title .opt').find('.opt-btn').removeClass('active');
            $('.announce-box .title .opt').find('.opt-box2').hide();
            $(this).addClass('active');
            $(this).next('.opt-box2').show();
            return false;
        });
        $(document).click(function(){
            $('.announce-box .title .opt').find('.opt-btn').removeClass('active');
            $('.announce-box .title .opt').find('.opt-box2').hide();
        });
        //点击编辑，弹出编辑框
        $(document).on('click','.announce-box .title .edit',function(){
            var data = {
                title: $(this).parents('.announce-cont-box').find('.announce-cont .work-title a').html()
            };
            var html = template('tpl-sendbox',data);
            $(this).parents('li').append(html);
            $(this).parents('li').find('.announce-cont-box').hide();
            $(this).parents('li').find('.send-box .sure').addClass('active');
            plugin.moveEnd($(this).parents('li').find(".send-box .txt1").get(0))
        });

        //编辑确认
        $(document).on('click','.announce-box li .send-box .sure',function(){
            var id = $(this).parents('li').attr('data-id');
            var title = $(this).parents('.send-box').find('.input-box .txt1').val();
            if(title == ""){
                plugin.openMsg('标题不能为空',1)
                return;
            }
            var $obj = $(this);
            API.InteractApi_updateInteractTitle(id,title,function(data){
                $obj.parents('li').find('.announce-cont .work-title a').html(title)
                $obj.parents('li').find('.announce-cont-box').show();
                $obj.parents('.send-box').remove();
                plugin.openMsg('修改已经保存',0);
            });
        });

        //编辑关闭
        $(document).on('click','.announce-box li .send-box .cancel',function(){
            $(this).parents('li').find('.announce-cont-box').show();
            $(this).parents('.send-box').remove();
        });

        //发布互动  确认
        var dbclick = true;
        $(document).on('click','#send-box .sure.active',function(){
            var title = $('#send-box .txt1').val();
            if(title == ""){
                plugin.openMsg('标题不能为空',1)
                dbclick = true;
                return;
            }
            if(dbclick == true){
                dbclick = false;
                if($('#send-box').attr('data-id')){
                    var interactid=$('#send-box').attr('data-id');
                    if($(this).hasClass('import1')){
                        API.ResourceInteractApi_copyInteract(interactid,courseid,title,function(data){
                            lists();
                            $('#send-box').hide();
                            $('.send-an').show();
                            plugin.openMsg('导入互动成功',0);
                            hideBlank();
                            dbclick = true;
                        })
                    }
                    if($(this).hasClass('import2')){
                        API.InteractApi_copyInteract(interactid,courseid,title,function(data){
                            if(data.status == 1){
                                lists();
                                $('#send-box').remove();
                                $('.send-an').show();
                                plugin.openMsg('导入互动成功',0);
                                hideBlank();
                                dbclick = true;
                            }else{
                                plugin.openMsg(data.info,1);
                                dbclick = true;
                            }
                        })
                    }
                    
                }else{
                    API.InteractApi_addInteract(courseid,title,function(data){
                        if(data.status == 1){
                            lists()
                            $('#send-box').remove();
                            $('.send-an').show();
                            plugin.openMsg('添加互动成功，正在进入环节编辑……',0);
                            hideBlank();
                            setTimeout(function(){
                                location.href="/Interact/interact/interactid/"+data.data.id+".html";
                            },1000)
                            dbclick = true;
                        }else{
                            plugin.openMsg(data.info,1);
                            dbclick = true;
                        }
                    });
                }
            }
        });
        //创建微课
        $(document).on('click','#send-weike-box .sure.active',function(){
            var title = $('#send-weike-box .txt1').val();
            if(title == ""){
                plugin.openMsg('微课名称不能为空',1);
                dbclick = true;
                return;
            }
            if(dbclick == true){
                dbclick = false;
                if($('#send-weike-box').attr('data-id')){
                    var interactid=$('#send-weike-box').attr('data-id');
                    if($(this).hasClass('import1')){
                        API.ResourceInteractApi_copyInteract(interactid,courseid,title,function(data){
                            lists();
                            $('#send-weike-box').hide();
                            $('.send-weike').show();
                            plugin.openMsg('导入微课成功',0);
                            hideBlank();
                            dbclick = true;
                        });
                    }
                    if($(this).hasClass('import2')){
                        API.InteractApi_copyInteract(interactid,courseid,title,function(data){
                            if(data.status == 1){
                                lists();
                                $('#send-weike-box').remove();
                                $('.send-weike').show();
                                plugin.openMsg('导入互动成功',0);
                                hideBlank();
                                dbclick = true;
                            }else{
                                plugin.openMsg(data.info,1);
                                dbclick = true;
                            }
                        })
                    }
                    
                }else{
                    API.InteractApi_addInteract(courseid,title,function(data){
                        if(data.status == 1){
                            lists()
                            $('#send-weike-box').remove();
                            $('.send-weike').show();
                            plugin.openMsg('创建微课成功，正在进入微课编辑……',0);
                            hideBlank();
                            setTimeout(function(){
                                location.href="/Interact/interact/interactid/"+data.data.id+".html";
                            },1000)
                            dbclick = true;
                        }else{
                            plugin.openMsg(data.info,1);
                            dbclick = true;
                        }
                    });
                }
            }
        });
        //删除互动弹窗
        $(document).on('click','.announce-box .title .del',function(){
            var parentsli = $(this).parents('li');
            var id = parentsli.attr('data-id');
            layer.confirm('', {
                type: 1,
                skin: 'layer-ext-ding00',
                title: '确定要删除该次互动？',
                closeBtn: 0,
                area: ['400px'],
                success:function(layero){
                    this.layero = layero;
                    layero.find('.layui-layer-btn0').addClass('active');
                },
                btn: ['确定', '取消'], //按钮
                shift: 7,
                moveType: 1
            }, function(index) {
                var self = this.layero.find('.layui-layer-btn0');
                self.addClass('disabled');
                API.InteractApi_delInteract(id,function(data){
                    if(data.status===1){
                        parentsli.remove();
                        plugin.openMsg('删除成功',0);
                        if($('.announce-box>ul>li').length == 0){
                            showBlank();
                        }
                    }else{
                        plugin.openMsg(data.info,1);
                        self.removeClass('disabled');
                    }
                })
                layer.close(index);
            }, function(index) {
                layer.close(index);
            });
        });
        //下载ppt文件
        $(document).on('click','.announce-box .title .downloadppt',function(){
            var parentsli = $(this).parents('li');
            var id = parentsli.attr('data-id');
            API.InteractPPTApi_downloadppt(id,function(tData){
            	var url = tData.downurl;
            	location.href = url;
            });
        });
        //更换互动ppt的弹窗
        $(document).on('click','.announce-box .title .changeppt',function(){
            var parentsli = $(this).parents('li');
            var interactid = parentsli.attr('data-id');
            
       		importCourseWareDialog.initAPI({
    			getCourseCousewareLists:API.coursewareApi_getCousewarePPTAndPdfLists,
    			getResourceCoursewareLists:API.ResourceCoursewareApi_listAllCoursewarePPTAndPDF
    		});
    		importCourseWareDialog.openResourceDialog({
				 singleCheck:1,
				 title:'请选择文件进行更换',
				 hideUploader:false,
				 defaultUploader:true,
				 canSelectFolder:false,
				 fileSizeLimit:maxFileLimitSize,
				 cancleCallback:function(){
    				clearInterval(timer);
    			 },
             	 exceedSizeCallback:function(fileSizeLimit){
             		var info = "互动课件的文件大小，最大支持"+plugin.format_bytes(fileSizeLimit);
             		plugin.cursoralert({title:"系统提示",info:info});
             	 },
				 acceptFileType:{
             		title:'ppt,pdf,word文件',
             		extensions:'ppt,pptx,pdf,doc,docx',
             		mimeTypes:'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
     			 },
				 finishCallback:function(fileidArray,remark,fromType,idArray){
    				var fileid = fileidArray[0];
    				plugin.openMsg("开始进入转码阶段...",0,3000);
    				var timer = setInterval(function(){
	        			exports.checkPPTTransCode({
	       					 fileid:fileid,
	       					 finishCallback:function(){
	       						 clearInterval(timer);
	           					 API.InteractApi_updatePPTInteractFile(interactid,fileid,function(tData){
	           						 if(tData.status == 1){
	                                        layer.closeAll();
	                                        plugin.openMsg('更换课件成功,正在跳转，请稍后',0,4000);
		                       				plugin.cursoralert({
		                    					 title:'更换课件成功',
		                    					 info:"课件已经转码成功，点击进入编辑",
		                    					 sure:'立即编辑',
		                    					 sureCallback:function(){
		                       						location.href='/InteractPPT/interact/interactid/'+tData.interactid;
		                       					 }
		                    				});
	           						 }else{
	           							 layer.closeAll();
	           							 $('.ppt-upload-pop').remove();
	           							 plugin.cursoralert({title:'系统提示',info:tData.info});
	           						 }
	           					 });
	       					 },
	       					 cancleCallback:function(){
	       						 clearInterval(timer);
	       					 },
	       			 		 errorCallback:function(){
	       						 clearInterval(timer);
	       					 }
	        			});
    				},5000);
    				exports.checkPPTTransCode({
    					 fileid:fileid,
    					 finishCallback:function(){
    						 clearInterval(timer);
        					 API.InteractApi_updatePPTInteractFile(interactid,fileid,function(tData){
        						 if(tData.status == 1){
                                     layer.closeAll();
                                     plugin.openMsg('更换课件成功，正在跳转，请稍后',0,4000);
                       				 plugin.cursoralert({
                    					 title:'更换课件成功',
                    					 info:"课件已经转码成功，点击进入编辑",
                    					 sure:'立即编辑',
                    					 sureCallback:function(){
                       					 		location.href='/InteractPPT/interact/interactid/'+tData.interactid;
                       					 }
                    				 });
        						 }else{
        							 layer.closeAll();
        							 $('.ppt-upload-pop').remove();
        							 plugin.cursoralert({title:'系统提示',info:tData.info});
        						 }
        					 });
    					 },
    					 cancleCallback:function(){
    						 clearInterval(timer);
    					 },
    			 		 errorCallback:function(){
    						 clearInterval(timer);
    					 }
    				});
    			},
    		});
        });
        //导入 弹窗
        var drLayer;
        $(document).on('click','#send-box .dr-btn',function(){
        	my.toptype = "subject";
            var datas={type:0};
            var html=template('tpl-dr-pop',datas);
            $('#dr-pop').html(html);
            var drPopHeight=parseInt($(window).height()*0.9)-60-85;
            if(drPopHeight>435)drPopHeight=435;
            $('.dr-pop .pop-cont').css('height',drPopHeight);
            layer.closeAll();
            import1List();
            drLayer=layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area: ['810px'],
                success: function () {
                    $('.dr-pop .cont-list').css('border','1px solid #dcdcdc');
                    $('.dr-pop .cont-list').find('i').removeClass('active');
                    $('.dr-pop .sure').removeClass('active');
                },
                content: $('#dr-pop'),
                shift: 7,
                moveType: 1
            });
            calBarH('.dr-pop .pop-cont .class-item ul',drPopHeight,'.dr-pop .class-item');
        });
        
        $(document).on('click','.send-ppt',function(){
        	my.toptype = "ppt";
            var datas={type:1};
            var html=template('tpl-dr-pop',datas);
            $('#dr-pop').html(html);
            
            var courseid = $("#course-header").attr('data-id');
            var url = '/UploadApi/uploadInteractPPT/courseid/'+courseid;
            uploaderInteractFile.intUploader({
            	obj:$('.dr-pop .sc-btn'),
            	fileSizeLimit:maxFileLimitSize,
            	url:url,
            	exceedSizeCallback:function(fileSizeLimit){
            		var info = "互动课件的文件大小，最大支持"+plugin.format_bytes(fileSizeLimit);
            		plugin.cursoralert({title:"系统提示",info:info});
            	},
            	acceptCallback:function($fileDiv,ret,obj){
            		var fileid = ret.fileid;
            		plugin.openMsg("开始进入转码阶段...",0,3000);
            		exports.checkPPTTransCode({
           			 	fileid:fileid,
           			 	finishCallback:function(){
            				clearInterval(timer);
	       					API.InteractApi_addPPTInteract(courseid,fileid,function(tData){
	       						 if(tData.status == 1){
	       							 clearInterval(timer);
	       							 layer.closeAll();
	       							 $fileDiv.remove();
	                                 plugin.openMsg('已上传,正在跳转，请稍候',0,4000);
                       				 plugin.cursoralert({
                    					 title:'课件转码成功',
                    					 info:"课件已经转码成功，点击进入编辑",
                    					 sure:'立即编辑',
                    					 sureCallback:function(){
                       					 	location.href='/InteractPPT/interact/interactid/'+tData.interactid;
                       					 }
                    				 });
	       						 }else{
	       							 clearInterval(timer);
	       							 layer.closeAll();
	       							 $fileDiv.remove();
	       							 plugin.cursoralert({title:'系统提示',info:tData.info});
	       						 }
	       					 }); 
            			},
           			 	cancleCallback:function(){
            				clearInterval(timer);
            			},
           			 	errorCallback:function(){
            				clearInterval(timer);
            			}
            		});
	            	timer = setInterval(function(){
	            		exports.checkPPTTransCode({
	           			 	fileid:fileid,
	           			 	finishCallback:function(){
	            				clearInterval(timer);
		       					API.InteractApi_addPPTInteract(courseid,fileid,function(tData){
		       						 if(tData.status == 1){
		       							 layer.closeAll();
		       							 $fileDiv.remove();
		                                 plugin.openMsg('已上传，正在跳转，请稍候',0,4000);
	                       				 plugin.cursoralert({
	                    					 title:'课件转码成功',
	                    					 info:"课件已经转码成功，点击进入编辑",
	                    					 sure:'立即编辑',
	                    					 sureCallback:function(){
	                       					 	location.href='/InteractPPT/interact/interactid/'+tData.interactid;
	                       					 }
	                    				 });
		       						 }else{
		       							 clearInterval(timer);
		       							 layer.closeAll();
		       							 $fileDiv.remove();
		       							 plugin.cursoralert({title:'系统提示',info:tData.info});
		       						 }
		       					 }); 
	            			},
	           			 	cancleCallback:function(){
	            				clearInterval(timer);
	            			},
	           			 	errorCallback:function(){
	            				clearInterval(timer);
	            			}
	            		});
					},5000); 
            	}
            });
            
            var drPopHeight=parseInt($(window).height()*0.9)-60-85;
            if(drPopHeight>435)drPopHeight=435;
            $('.dr-pop .pop-cont').css('height',drPopHeight);
            layer.closeAll();
            import1PPT();//优先展示资源区的互动ppt
            drLayer = layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area: ['810px'],
                success: function () {
                    $('.dr-pop .cont-list').css('border','1px solid #dcdcdc');
                    $('.dr-pop .cont-list').find('i').removeClass('active');
                    $('.dr-pop .sure').removeClass('active');
                },
                content: $('#dr-pop'),
                shift: 7,
                moveType: 1
            });
            calBarH('.dr-pop .pop-cont .class-item ul',drPopHeight,'.dr-pop .class-item');
        });
        //计算滚动条大小
        function calBarH(objBig,ph,appendDiv){
            if($(objBig).height()>ph){
                var bBar=$('<div class="bar"><div class="bar2"></div></div>');
                bBar.appendTo($(appendDiv));
                var bH=ph/$(objBig).height();
                bH=parseInt(ph*bH);
                $(objBig).next('.bar').find('.bar2').css({'height':bH,'top':0});
            }
        };

        //计算导入弹窗高度
        var drPopHeight=parseInt($(window).height()*0.9)-60-85;
        if(drPopHeight>435)drPopHeight=435;
        $('.dr-pop .pop-cont').css('height',drPopHeight);
        
        $(window).resize(function(){
            var drPopHeight=parseInt($(window).height()*0.9)-60-85;
            if(drPopHeight>435)drPopHeight=435;
            $('.dr-pop .pop-cont').css('height',drPopHeight);
            $('.dr-pop .class-item').css('height',drPopHeight);
            $('.dr-pop .class-cont').css('height',drPopHeight);
            layer.style(drLayer, {
                height:'auto'
            });
            $('.layui-layer-content').css('height','auto');
            scrollBar.scrollBar($('#dr-pop .class-item'),$('#dr-pop .class-item ul'));
            scrollBar.scrollBar($('#dr-pop .class-cont'),$('#dr-pop .class-cont .cont-box'));
        });
        //资源
        $(document).on('click','#dr-pop .dr-from .import1',function(){
            $(this).addClass('active').siblings().removeClass('active');
        	if(my.toptype == "ppt"){
                my.drtype='importppt1';
                import1PPT();
        	}else if(my.toptype == "subject"){
                my.drtype='import1';
                import1List();
        	}
        });
        //班级导入选择
        $(document).on('click','#dr-pop .dr-from .import2:not(".no")',function(){
            $(this).addClass('active').siblings().removeClass('active');
        	if(my.toptype == "ppt"){
                my.drtype='importppt2';
                import2PPT();
        	}else if(my.toptype == "subject"){
                my.drtype='import2';
                import2List();	
        	}
        });
        //课件互动，从资料区导入
        $(document).on('click','#dr-pop .dr-from .import3',function(){
        	$(this).addClass('active').siblings().removeClass('active');
        	var courseid=$('#course-header').attr('data-id');
        	if(my.toptype == "ppt"){
        		layer.closeAll();
        		importCourseWareDialog.initAPI({
        			getCourseCousewareLists:API.coursewareApi_getCousewarePPTAndPdfLists,
        			getResourceCoursewareLists:API.ResourceCoursewareApi_listAllCoursewarePPTAndPDF
        		});
        		importCourseWareDialog.openResourceDialog({
					 singleCheck:1,
					 title:'导入课件到互动里',
					 hideUploader:false,
					 defaultUploader:true,
					 canSelectFolder:false,
					 cancleCallback:function(){
    					clearInterval(timer);
    			 	 },
    			 	 fileSizeLimit:maxFileLimitSize,
    			 	 exceedSizeCallback:function(fileSizeLimit){
    			 		 var info = "互动课件的文件大小，最大支持"+plugin.format_bytes(fileSizeLimit);
    	            	 plugin.cursoralert({title:"系统提示",info:info});
    			 	 },
    			 	 acceptFileType:{
    			 		title:'ppt或者pdf文件',
    			 		extensions:'ppt,pptx,pdf,doc,docx',
    			 		mimeTypes:'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    			 	 },
					 intCallBack:null,
					 finishCallback:function(fileidArray,remark,fromType,idArray){
        				var fileid = fileidArray[0];
        				var timer = setInterval(function(){
	            			exports.checkPPTTransCode({
	           					 fileid:fileid,
	           					 finishCallback:function(){
	           						clearInterval(timer);
	   	           					API.InteractApi_addPPTInteract(courseid,fileid,function(tData){
	   	        						 if(tData.status == 1){
	   	                                     layer.closeAll();
	   	                                     plugin.openMsg('导入课件到互动里面成功，正在跳转，请稍候',0,4000);
		                       				 plugin.cursoralert({
		                    					 title:'课件转码成功',
		                    					 info:"成功导入课件到互动里，点击进入编辑",
		                    					 sure:'立即编辑',
		                    					 sureCallback:function(){
		                       					 	location.href='/InteractPPT/interact/interactid/'+tData.interactid;
		                       					 }
		                    				 });
	   	        						 }else{
	   	        							 layer.closeAll();
	   	        							 $('.ppt-upload-pop').remove();
	   	        							 plugin.cursoralert({title:'系统提示',info:tData.info});
	   	        						 }
	   	        					});
	           					 },
	           					 cancleCallback:function(){
	           						 clearInterval(timer);
	           					 },
	           			 		 errorCallback:function(){
	           						 clearInterval(timer);
	           					 }
	           				});
        				},5000);
        				exports.checkPPTTransCode({
        					 fileid:fileid,
        					 finishCallback:function(){
        						clearInterval(timer);
	           					API.InteractApi_addPPTInteract(courseid,fileid,function(tData){
	        						 if(tData.status == 1){
	                                     layer.closeAll();
	                                     plugin.openMsg('导入课件到互动里面成功，请稍候',0,4000);
	                       				 plugin.cursoralert({
	                    					 title:'课件转码成功',
	                    					 info:"成功导入课件到互动里，点击进入编辑",
	                    					 sure:'立即编辑',
	                    					 sureCallback:function(){
	                       					 	location.href='/InteractPPT/interact/interactid/'+tData.interactid;
	                       					 }
	                    				 });
	        						 }else{
	        							 layer.closeAll();
	        							 $('.ppt-upload-pop').remove();
	        							 plugin.cursoralert({title:'系统提示',info:tData.info});
	        						 }
	        					});
        					 },
        					 cancleCallback:function(){
        						 clearInterval(timer);
        					 },
        			 		 errorCallback:function(){
        						 clearInterval(timer);
        					 }
        				});
        			},
        		});
        	}
        });
        
        //导入通知列表移入点击效果
        $(document).on('click','.dr-pop .cont-list i.radio,.dr-pop .cont-list h3',function(){
            var i = $(this).parents('li').find('i');
            if(i.hasClass('active')){
                i.removeClass('active');
                $('.dr-pop .sure').removeClass('active');
            }else{
                $('.dr-pop .cont-list').find('i').removeClass('active');
                i.addClass('active');
                $('.dr-pop .sure').addClass('active');
            }
        });

        //确定按钮移入移出效果
        $(document).on('mouseover','.dr-pop .sure.active',function(){
            $(this).addClass('hover');
        }).on('mouseleave','.dr-pop .sure.active',function(){
            $(this).removeClass('hover');
        }).on('mousedown','.dr-pop .sure.active',function(){
            $(this).addClass('click');
        }).on('mouseup','.dr-pop .sure.active',function(){
            $(this).removeClass('click');
        });

        //关闭导入弹窗
        $(document).on('click','.dr-pop .cancel,.dr-pop .close',function(){
            layer.closeAll();
        });
        //导入选中的互动(选中)
        $(document).on('click',"#dr-pop .class-item li a",function(){
            var id = $(this).parents('li').attr('data-id');
            var self = this;
            if(my.drtype=='import1'){
                API.ResourceInteractApi_getIneractListsByType(id,0,function(data){
                    $('#dr-pop .import1-item li .active').removeClass('active');
                    $(self).addClass('active');
                    data.data&&data.data.map(function(item){
                        item.createtime = plugin.time_format_year_month_day_hour_min(item.createtime);
                    })
                    data.isresource = true;
                    var html = template('tpl-import-notify',data);
                    $(".class-cont.fr .cont-box").html(html);
                    scrollBar.scrollBar($('#dr-pop .class-cont'),$('#dr-pop .class-cont .cont-box'));
                });
            }
            if(my.drtype=='import2'){
                API.InteractApi_getInteractListsByType(id,0,function(data){
                    $('#dr-pop .import2-item li .active').removeClass('active');
                    $(self).addClass('active');
                    data.data&&data.data.map(function(item){
                        item.createtime = plugin.time_format_year_month_day_hour_min(item.createtime);
                    })
                    data.iscourse = true;
                    var html = template('tpl-import-notify',data);
                    $(".class-cont.fr .cont-box").html(html);
                    scrollBar.scrollBar($('#dr-pop .class-cont'),$('#dr-pop .class-cont .cont-box'));
                });
            }
            if(my.drtype=='importppt2'){
                API.InteractApi_getInteractListsByType(id,1,function(data){
                    $('#dr-pop .import2-item li .active').removeClass('active');
                    $(self).addClass('active');
                    data.data&&data.data.map(function(item){
                        item.createtime = plugin.time_format_year_month_day_hour_min(item.createtime);
                    })
                    data.isppt = true;
                    var html = template('tpl-import-notify',data);
                    $(".class-cont.fr .cont-box").html(html);
                    scrollBar.scrollBar($('#dr-pop .class-cont'),$('#dr-pop .class-cont .cont-box'));
                });
            }
            if(my.drtype=='importppt1'){
                API.ResourceInteractApi_getIneractListsByType(id,1,function(data){
                    $('#dr-pop .import1-item li .active').removeClass('active');
                    $(self).addClass('active');
                    data.data&&data.data.map(function(item){
                        item.createtime = plugin.time_format_year_month_day_hour_min(item.createtime);
                    })
                    data.isresource = true;
                    var html = template('tpl-import-notify',data);
                    $(".class-cont.fr .cont-box").html(html);
                    scrollBar.scrollBar($('#dr-pop .class-cont'),$('#dr-pop .class-cont .cont-box'));
                });
            }
        });
        //确认导入
        $(document).on('click',"#dr-pop .btns .sure.stdr.active",function(){
            var id = $("#dr-pop .class-cont .radio.active").parents('li').attr('data-id');
            var title=$("#dr-pop .class-cont .radio.active").parents('li').find('h3').text();
            layer.closeAll();
            $("#send-box").show().attr('data-id',id).find('.txt1').val(title).focus();
            $("#send-box .sure").addClass('active '+ my.drtype);
        });
        $(document).on('click',"#dr-pop .btns .sure.pptdr.active",function(){
            var interactid = $("#dr-pop .class-cont .radio.active").parents('li').attr('data-id');
            var courseid=$('#course-header').attr('data-id');
            layer.closeAll();
            if(my.toptype == "ppt"){
            	if(my.drtype == "importppt1"){
                    API.ResourceInteractPPTApi_copyInteract(interactid,courseid, function (data) {
                        plugin.openMsg('从备课区导入互动PPT成功',0);
                        location.href='/InteractPPT/interact/interactid/'+data.data.id
                    });
            	}else if(my.drtype == "importppt2"){
                    API.InteractPPTApi_copyInteract(interactid,courseid, function (data) {
                        plugin.openMsg('从班级里导入互动PPT成功',0);
                        location.href='/InteractPPT/interact/interactid/'+data.data.id
                    });
            	}	
            }
        });

        function listsResource(callback){
            if(!my.resourcelist){
                API.ResourceApi_getResourceList(function(data){
                    my.resourcelist = data;
                    callback();
                })
            }else{
                callback();
            }
        }
        function setResourceList(){
            $('.beikequ .item-box').remove();
            $(".beikequ .item span").html('请选择备课区');
            if(my.resourcelist.data==null||my.resourcelist.data.length==0){
                $(".beikequ .item span").addClass('disabled');
            }else{
                $(".beikequ .item span").removeClass('disabled');
                var courseid = $("#course-header").attr('data-id');
                var source = '<div class="item-box" style="display: none;">'
                    +    '{{each data as value i}}'
                    +        '<a data-id="{{value.id}}">{{value.title}}</a>'
                    +    '{{/each}}'
                    + '</div>';
                var render = template.compile(source);
                var html = render(my.resourcelist);
                $(".beikequ .item").append(html);
            }
        }
        //点击保存，弹出bc框
        $(document).on('click','.announce-box .title .saveb',function(){
            $(this).parents('li').attr('rel',2).siblings('li').removeAttr('rel');
            listsResource(function(){
                setResourceList();
            });
            var lay2=null;
            lay2=layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area: ['400px'],
                content: $('#bc-pop'),
                success:function(content){
                    $('.layui-layer-content').css('overflow','visible');
                    $('#bc-pop .sure').removeClass('active hover click');
                },
                shift: 7,
                moveType: 1
            });
        });
        $(document).on('click','#bc-pop .choose-box .item span',function(e){
            $(this).parents('.input-box').siblings('.input-box').find('.item-box').hide();
            $(this).next().slideToggle(100);
            e.stopPropagation();
        })
        $(document).on('click','.pop-new-V2 .item-box a',function(){
             $(this).parents('.item').find('span').html($(this).html()).attr('data-id',$(this).attr('data-id'));
             $(this).parents('.pop-new-V2').find('.sure').addClass('active');
         });
        $(document).on('click',function(){
             $('.pop-new-V2 .item span').next().slideUp(100);
             $('.pop-new-V2 .item').removeClass('active');
         });
        //确定保存
        $(document).on('click','#bc-pop .sure.active',function(){
            var id = $('.announce-box ul li[rel=2]').attr('data-id');
            var rid = $(this).parents('.pop-new-V2').find('.choose-item span').attr('data-id');
            API.ResourceInteractApi_putInteractToResource(id,rid,function(data){
                layer.closeAll();
                plugin.openMsg('已保存',0);
            })
        });
        //分享互动给同事
        $(document).on('click','.announce-box .title .shareInteract',function(){
            var parentsli = $(this).parents('li');
            var id = parentsli.attr('data-id');
        	var tipsTpl = '<b class="toptips help-info-tips" data-tips="该互动已经创建了分享链接">分享</b>';
            API.InteractApi_generateShare(id,function(tData){
                var tplData = [];
                tplData['url'] = tData['url'];
                var tpl = template('tpl-share-interact-dialog',tplData);
                var lay2=null;
                lay2=layer.open({
                    type: 1,
                    title: false,
                    closeBtn: true,
                    area: ['450px'],
                    content: tpl,
                    success:function(content){
                		if(parentsli.find('.work-title b').length == 0){
                			parentsli.find('.work-title').prepend(tipsTpl);
                		}
                		plugin.openMsg('分享链接已创建，点击复制链接，即可分享给同事',0,5000);
                		require('zeroclipboard');
                		require.async("zeroclipboard", function  (ex) {
                    		var client = new ZeroClipboard($(".copy-share-btn"), {
                      		  moviePath: "/Public/Common/js/lib/zeroclipboard-2.2.0/ZeroClipboard.swf",
                      		  trustedDomains: ['*'],
                      		});
                    		client.on('ready', function (event) {
                    			client.on('copy', function (event) {
                    				var val = $(content).find('.input-share-link').val();
                    		        event.clipboardData.setData('text/plain', val);
                    		        layer.close(lay2);
                    		        plugin.alerttips({info:'链接已复制到系统剪贴板中'});
                    		    });
                    		 });
                    		 client.on('error', function (event) {
                    		      ZeroClipboard.destroy();
                    		 });
                		});
                		$(content).find('.input-share-link').select();
                		$(content).find('.remove-link').on('click',function(){
                			API.InteractApi_cancleShare(id,function(cData){
                				layer.close(lay2);
                				plugin.openMsg('已取消分享，分享链接已失效',0,5000);
                        		if(parentsli.find('.work-title b').length > 0){
                        			parentsli.find('.work-title b').remove();
                        		}
                			});
                		});
                		$(content).find('.input-share-link').on('click',function(){
                			$(this).select();
                		});
                    },
                    shift: 7,
                    moveType: 1
                });
            });
        });
        //关闭弹窗
        $(document).on('click','#bc-pop .cancel,#bc-pop .close', function () {
            layer.closeAll();
        });

    }

    exports.editAll=function(){
        exports.links();
        var top1=40;
        $(window).scroll(function () {
            var scrollT=document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollT>=top1) {
                $('.new-ques .title .tit-tit').css({'position':'fixed','top':72,'z-index':8});
                $('.new-ques .title .tit-tit2').show();
            } else {
                $('.new-ques .title .tit-tit').css({'position':'relative','top':0,'z-index':8});
                $('.new-ques .title .tit-tit2').hide();
            }
        });
        //点击编辑试题跳转
        $(document).on('click','.edit-link',function(){
            var title=$('#links-box .links-name ul li.active h3 span').html();
            var id=$('#links-box .links-name ul li.active').attr('data-id')
            $('#links-box').addClass('hide');
            $('#edit-box').removeClass('hide').attr('data-id',id);
            $('#edit-box .interact-txt').val(title).focus();
            exports.getInteractInit();
            var stepid = $('#edit-box').attr('data-id');
            $("#rand-control-pannel").html('');
            API.InteractApi_getStepInfo(stepid,function(data){
            	var step = data.data;
            	var tpl = template('tpl-rand-control',step);
            	$("#rand-control-pannel").html(tpl);
            });
        });
        //试题随机打乱
        $(document).on("click", ".title-order-opt span", function() {
            $(this).next().show();
            return false;
        });
        $(document).on("click", ".title-order-opt .hs-box a", function() {
            var state = $(this).attr('data-state');
            var self = this;
            var stepid = $('#edit-box').attr('data-id');
            API.InteractApi_setTitleRand(stepid, state, function(data) {
                $(self).addClass("active").siblings("a").removeClass("active");
                $(self).parent().prev('span').html($(self).html())
            });
        });
        //打乱选项的顺序
        $(document).on("click", ".option-order-opt span", function() {
            $(this).next().show();
            return false;
        });
        $(document).on("click", ".option-order-opt .hs-box a", function() {
            var state = $(this).attr('data-state');
            var stepid = $('#edit-box').attr('data-id');
            var self = this;
            API.InteractApi_setOptionRand(stepid, state, function(data) {
                $(self).addClass("active").siblings("a").removeClass("active");
                $(self).parent().prev('span').html($(self).html())
            });
        });
        
        $(document).on('click',function(){
            $('.hs-opt .hs-box').hide();
            $('.title-order-opt .hs-box').hide();
            $('.option-order-opt .hs-box').hide();
        });
        //预览试题
        $(document).on('click','#preveiwsubject',function(){
        	var stepid = $("#edit-box").attr('data-id');
        	var url = "/Interact/previewsubject/stepid/"+stepid;
        	plugin.openPreviewSubjectDialog(url);
        });
    };
    
    //获取所有的题型
    exports.getInteractInit=function(){
        require.async('/Public/Home/js/subject.js',function(e){
            e.subject({
                navtype:'interactstep'
            })
            if(!my.subjectCache){
                e.subjectController();
                my.subjectCache = true;
            }
        })
        if(!my.editPartCache){
            exports.editPart();
            my.editPartCache = true;
        }
    }
    exports.editPart = function(){
        
        $(document).on('click','#return-course',function(){
            if($('.new-ques').hasClass('hide')==false){
                if($('.new-ques').find('.no-save').length>0 || $('.new-ques').find('.edit').length>0){
                    plugin.openMsg('您有题目尚未保存',1);
                    var goTo1=0;
                    var goTo2=0;
                    if($('.new-ques').find('.no-save').length>0){
                        goTo1=$('.new-ques').find('.no-save').offset().top;
                    }
                    if($('.new-ques').find('.edit').length>0){
                        goTo2=$('.new-ques').find('.edit').offset().top;
                    }
                    if(goTo1==0&&goTo2!=0){
                        $('html,body').animate({'scrollTop':goTo2-159})
                    }
                    if(goTo1!=0&&goTo2==0){
                        $('html,body').animate({'scrollTop':goTo1-159})
                    }
                    if(goTo1!=0&&goTo2!=0){
                        var goTo=Math.min(goTo1,goTo2);
                        $('html,body').animate({'scrollTop':goTo-159})
                    }
                    return false;
                }else{
                    history.go(-1);
                }
            }

        })
        //环节名编辑
        $(document).on('click','.new-ques .title .finish',function(){
            var stepid=$('#edit-box').attr('data-id');
            var title=$('.new-ques .interact-txt').val();
            if($('.new-ques').find('.no-save').length>0 || $('.new-ques').find('.edit').length>0){
                plugin.openMsg('您有题目尚未保存',1);
                var goTo1=0;
                var goTo2=0;
                if($('.new-ques').find('.no-save').length>0){
                    goTo1=$('.new-ques').find('.no-save').offset().top;
                }
                if($('.new-ques').find('.edit').length>0){
                    goTo2=$('.new-ques').find('.edit').offset().top;
                }
                if(goTo1==0&&goTo2!=0){
                    $('html,body').animate({'scrollTop':goTo2-159})
                }
                if(goTo1!=0&&goTo2==0){
                    $('html,body').animate({'scrollTop':goTo1-159})
                }
                if(goTo1!=0&&goTo2!=0){
                    var goTo=Math.min(goTo1,goTo2);
                    $('html,body').animate({'scrollTop':goTo-159})
                }
            }else{
                API.InteractApi_updateStepTitle(stepid,title,function(data){
                    $('.links-box').attr('data-click',stepid);
                    getLinks();
                    plugin.openMsg('保存成功',0);
                    $('#edit-box').removeAttr('data-id');
                    $('#edit-box').addClass('hide');
                    $('#links-box').removeClass('hide');
                });
            }
        });
    }
    function getLinks(){
        $('.big-btns .error-tips').addClass('hide2');
        var interactid = $('#return-course').attr('data-interactid');
        var index = plugin.getQuery2('index');
        var click = $('.links-box').attr('data-click');
        API.InteractApi_getStepList(interactid,function(data){
            if(data.data.length==0){
                $('#new-links').removeClass('hide');
            }else{
                var html=template('tpl-name-list',data);
                $('#links-box .links-name ul').html(html);
                $('#links-box').removeClass('hide');
                scrollBar.scrollBar($('#links-box .links-name'),$('#links-box .links-name ul'));
            }
            if(click){
                $('.links-name li[data-id='+click+']').click();
            }else if(index){
            	var length = $('.links-name li').length-1;
            	if(index<=0){
            		index = 0;
            	}
            	if(length > index){
                    $('.links-name li').eq(index).click();	
            	}else{
                    $('.links-name li').eq(0).click();
            	}
            }else{
                $('.links-name li').eq(0).click();
                if($('.links-box').is(':visible')){
                    introstart2();
                }
            }
        });
    }
    function introstart2(){
        var introtype=11;
        var courseid=$('#return-course').attr('data-id');
        API.TourApi_isTour(courseid,introtype,function(data){
            if(data.isTour==0){
                require.async(['intro','/Public/Common/js/lib/intro/introjs.css'],function(){
                    $('.links-box .links-name li.add-link').attr({'data-step':1,'data-intro':'此处可以新加互动环节','data-position':'right'});
                    $('.links-box .links-cont .big-btns .start').attr({'data-step':2,'data-intro':'点击此图标，可以发布当前互动环节，学生即可参与此环节互动','data-position':'top'});
                    $('.links-box .student-cont .student-item').attr({'data-step':3,'data-intro':'开始答题后，可以看到有多少学生已参与完成此互动环节','data-position':'top'});
                    $('.links-box .links-cont .big-btns .play').attr({'data-step':4,'data-intro':'点击此图标，即可全屏展示此环节的题型，并有学生答题详情','data-position':'top'});
                    var intros=introJs().setOptions({'prevLabel':'〈 上一步','nextLabel':'下一步 〉','skipLabel':'跳过','doneLabel':'完成'}).start();
                    intros.oncomplete(function() {
                        API.TourApi_setTourFinish(introtype,function(){});
                    });
                });
            }
        })
    }

    exports.links=function(){
        //环节列表页
        var nameHeight=$(window).height()-52-50;
        $('#links-box .links-name').css('height',nameHeight);
        $('#links-box .links-cont').css('min-height',nameHeight);
        var interactid=$('#return-course').attr('data-interactid');
        getLinks();
        $(window).resize(function(){
            var nameHeight2=$(window).height()-72-50;
            $('#links-box .links-name').css('height',nameHeight2);
            $('#links-box .links-cont').css('min-height',nameHeight2);
            scrollBar.scrollBar($('#links-box .links-name'),$('#links-box .links-name ul'));
        })
        //新建环节
        $(document).on('click','.add-btn',function(){
            var title='第1环节';
            API.InteractApi_addInteractStep(interactid,title,function(data){
                $('#new-links').addClass('hide');
                $('#edit-box').removeClass('hide').attr('data-id',data.data.id);
                $('#edit-box .interact-txt').val(title).focus();
                scrollBar.scrollBar($('#links-box .links-name'),$('#links-box .links-name ul'));
                $('#ques-list').html('');
                $('.new-ques .null-ques').removeClass('hide');
                $('.add-type').removeClass('hide');
                exports.getInteractInit();
                if(!my.editPartCache){
                    exports.editPart();
                    my.editPartCache = true;
                }
            })
        });
        $(document).on('click','.add-link',function(){
            var n=$('#links-box .links-name ul li').length;
            var title='第'+n+'环节';
            API.InteractApi_addInteractStep(interactid,title,function(data){
                $('#links-box').addClass('hide');
                $('#edit-box').removeClass('hide').attr('data-id',data.data.id);
                $('#edit-box .interact-txt').val(title).focus();
                $('#ques-list').html('');
                $('.new-ques .null-ques').removeClass('hide');
                $('.add-type').removeClass('hide');
                exports.getInteractInit();
                if(!my.editPartCache){
                    exports.editPart();
                    my.editPartCache = true;
                }
            })
        });
        
        $('.links-box .links-cont .title-div').css('background',$('body').css('background-color'))
        $(document).on('click','.links-name li:not(".add-link,.create-attence")', function(){
            $('.big-btns .error-tips').addClass('hide2');
            $('.links-cont .ll-div').hide();
            var loadHmtl=$("<div class='web-loading' style='position:absolute'><img src='/Public/Common/img/loading.gif' width='64' ></div>");
            $('.links-cont').append(loadHmtl);
            $('.links-box .links-cont .title h3').html($(this).find('h3 span').html());
            var oV=$(this).find('p').html();
            if(oV=='未完成' || oV=='已完成'){
                $('.big-btns .stop').addClass('hide');
                $('.big-btns .start').removeClass('hide');
                $('.xq-tip').addClass('hide');
            }else{
                $('.big-btns .stop').removeClass('hide');
                $('.big-btns .start').addClass('hide');
                $('.xq-tip').removeClass('hide');
            }
            var stepid=$(this).attr('data-id');
            var index = $(this).index();
            plugin.setQuery2("index",index);
            $(this).addClass('active').siblings().removeClass('active');
            API.InteractApi_getStepAnswerInfo(stepid,function(data){
                var html=template('tpl-student',data);
                $('.links-cont .student-cont').html(html);
                plugin.closeLoading();
                setTimeout(function(){
                    $('.links-cont .ll-div').show();
                },200);
            });

        });
        //获取学生提交状况
        $(document).on('click','.student-item .nohand',function(){
            $(this).addClass('active');
            $('.student-item .hand').removeClass('active')
            var stepid=$('.links-name li.active').attr('data-id');
            API.InteractApi_getStepNohandupList(stepid,function(data){
                var html=template('tpl-no-student',data);
                $('.links-cont .student-cont').html(html);
            })
        })
        $(document).on('click','.student-item .hand',function(){
            $(this).addClass('active');
            $('.student-item .nohand').removeClass('active');
            var stepid=$('.links-name li.active').attr('data-id');
            API.InteractApi_getStepAnswerInfo(stepid,function(data){
                var html=template('tpl-student',data);
                $('.links-cont .student-cont').html(html);
            });
        });

        //清除答题数据
        $(document).on('click','.clear-record a',function(){
            if($('.big-btns .start').hasClass('hide')){
                plugin.openMsg('互动正在进行，无法清除',1)
            }else{
                var stepid=$('.links-name li.active').attr('data-id');
                layer.confirm('<p class="confirmtext">清除后，学生参与互动的所有数据均无法恢复。</p>', {
                    type: 1,
                    skin: 'layer-ext-ding00',
                    title: '确定清除该环节的答题数据吗？',
                    closeBtn: 0,
                    area: ['400px'],
                    success:function(layero){
                        this.layero = layero;
                        layero.find('.layui-layer-btn0').addClass('active');
                    },
                    btn: ['确定', '取消'], //按钮
                    shift: 7,
                    moveType: 1
                }, function(index) {
                    var self = this.layero.find('.layui-layer-btn0');
                    self.addClass('disabled');
                    API.InteractApi_clearStepData(stepid,function(data){
                        if(data.status===1){
                            plugin.openMsg('已清除答题数据',0);
                            API.InteractApi_getStepAnswerInfo(stepid,function(data2){
                                var html=template('tpl-student',data2);
                                $('.links-cont .student-cont').html(html);
                            });
                            $('.links-box .links-name li.active').find('p').html('未完成').removeClass('red green').addClass('gray');
                        }else{
                            plugin.openMsg(data.info,1);
                            self.removeClass('disabled');
                        }
                    });
                    layer.close(index);
                }, function(index) {
                    layer.close(index);
                });
            }
        });


        //删除某个环节
        $(document).on('click','.links-name li .del-link',function(){
            var parentsli = $(this).parents('li');
            var title=parentsli.find('h3 span').text(),
                stepid=parentsli.attr('data-id');
            layer.confirm('<p class="confirmtext">此环节内的所有互动题目也将一同被删除</p>', {
                type: 1,
                skin: 'layer-ext-ding00',
                title: '确定要删除"<span style="color:#4d90fe">'+title+'</span>"环节吗？',
                closeBtn: 0,
                area: ['400px'],
                success:function(layero){
                    this.layero = layero;
                    layero.find('.layui-layer-btn0').addClass('active');
                },
                btn: ['确定', '取消'], //按钮
                shift: 7,
                moveType: 1
            }, function(index) {
                var self = this.layero.find('.layui-layer-btn0');
                self.addClass('disabled');
                API.InteractApi_delStep(stepid,function(data){
                    if(data.status===1){
                        plugin.openMsg('删除成功',0);
                        if(parentsli.hasClass('active')){
                            if(parentsli.prev('li').size()>0){
                                parentsli.prev('li').trigger('click');
                            }else if(parentsli.next('li[data-id]').size()>0){
                                parentsli.next('li[data-id]').trigger('click');
                            }else{
                                $('#links-box').addClass('hide');
                                $('#new-links').removeClass('hide');
                            }
                        }
                        parentsli.remove();
                    }else{
                        plugin.openMsg(data.info,1);
                        self.removeClass('disabled');
                    }
                });
                layer.close(index);
            }, function(index) {
                layer.close(index);
            });
        });
        $(document).on('click','.little-pop .cancel',function(){
            layer.closeAll();
            $('li').removeAttr('rel');
        });
        //对环节进行排序
        function sortStepLists(){
            var arr=[];
            $('.links-name ul>li:not(".add-link")').each(function(index){
                $(this).find('h3 b').html(index+1);
                arr.push($(this).attr('data-id'));
            });
            var stepids=arr.join('|');
            API.InteractApi_sortStepLists(stepids,function(data){});
        }
        //环节顺序调整,向下调整
        $(document).on('click','.links-name li .move-down-link',function(event){
        	event.stopPropagation();
            var li = $(this).parents('li');
            var stepid=li.attr('data-id');
			var next = li.next();
			if(next.length>0){
				if(next.hasClass('add-link')){
					plugin.openMsg('已经排到最后一个了',0,2000);
					return false;
				}
				li.fadeOut(500, function () {
					next.after(li);
					li.fadeIn(500);
					sortStepLists();
					plugin.openMsg("移动成功",0);
                });
			}else{
				plugin.openMsg('已经排到最后一个了',0,2000);
			}
            return false;
        });
        //环节顺序调整,向上调整
        $(document).on('click','.links-name li .move-up-link',function(event){
        	event.stopPropagation();
			var li = $(this).parents('li');
			var prev = li.prev();
			if(prev.length>0){
				li.fadeOut(500, function () {
					prev.before(li);
					li.fadeIn(500);
					sortStepLists();
					plugin.openMsg("移动成功",0);
                });
			}else{
				plugin.openMsg('已经排到第一个了',0,2000);
			}
        	return false;
        });
        
        //开始答题
        var ssTimer=null;
        $(document).on('click','.links-box .big-btns .start',function(){
            clearTimeout(ssTimer);
            var count=$('.links-name li.active').attr('data-count');
            var stepid=$('.links-name li.active').attr('data-id');
            if(count==0){
                $('.big-btns .error-tips').removeClass('hide2');
                ssTimer=setTimeout(function(){
                    $('.big-btns .error-tips').addClass('hide2');
                },3000)
            }else{
                API.InteractApi_beginStep(stepid,function(data){
                    $('.links-box .big-btns .start').addClass('hide');
                    $('.links-box .big-btns .stop').removeClass('hide');
                    $('.links-box .links-name li').each(function(){
                        if($(this).find('p').html()=='正在进行中'){
                            $(this).find('p').html('已完成').removeClass('red green').addClass('green');
                        }
                    });
                    $('.links-name li.active').find('p').html('正在进行中').addClass('red');
                    $('.xq-tip').removeClass('hide')
                });
            }
        });
        //结束答题
        window.document.stop = function(){
            $('.links-box .big-btns .stop').addClass('hide');
            $('.links-box .big-btns .start').removeClass('hide');
            $('.links-box .links-name li.active').find('p').html('已完成').removeClass('red gray').addClass('green');
            $('.xq-tip').addClass('hide')
        }
        $(document).on('click','.links-box .big-btns .stop',function(){
            var stepid=$('.links-name li.active').attr('data-id');
            API.InteractApi_finishStep(stepid,function(data){
                $('.links-box .big-btns .stop').addClass('hide');
                $('.links-box .big-btns .start').removeClass('hide');
                $('.links-name li.active').find('p').html('已完成').removeClass('red gray').addClass('green');
                $('.xq-tip').addClass('hide')
            });
        });
        $(document).on('click','.links-box .big-btns .play',function(){
            clearTimeout(ssTimer);
            var stepid=$('.links-name li.active').attr('data-id');
            var count=$('.links-name li.active').attr('data-count');
            if(count==0){
                $('.big-btns .error-tips').removeClass('hide2');
                ssTimer=setTimeout(function(){
                    $('.big-btns .error-tips').addClass('hide2');
                },3000)
            }else {
            	var url = '/Interact/preview.html/?stepid=' + stepid;
            	var id = "openPreviewStep_"+stepid;
            	plugin.openNewWindows(url,id);
            }
        });
    };
    //互动分析管理
    exports.manageAll=function(){
    	var interactid = $("#return-course").attr('data-interactid');
        setCurrListsState();
        function setCurrListsState(){
            plugin.loading();
            API.InteractApi_getStepList(interactid,function(data){
                plugin.closeLoading();
                var html=template('tpl-ppt-li',data);
                $('.manage-box ul').html(html);
                plugin.previewImg($('.manage-box li .imgs'))
            })
        }
        window.document.setCurrListsState= setCurrListsState;
        var checkCount=0;
        //左右下拉显示隐藏
        $('.download-opt span').click(function(){
            $('.download-opt .box').hide();
            $(this).next('.box').show();
            $(this).parent().addClass('active');
            return false;
        });
        $(document).click(function () {
            $('.download-opt .box').hide();
        });
        //下载互动成绩报表
        $(document).on('click','#downloadgrade',function(){
        	var interactid = $("#return-course").attr('data-interactid');
        	var courseid = $("#return-course").attr('data-id');
        	var packageDoamin = $("#return-course").attr('data-packageurl');
        	var uid = $("#return-course").attr('data-uid');
        	var url = packageDoamin + "/Package/interactStatisticsView/interactid/"+interactid+"/uid/"+uid;
        	plugin.checkVipDilog(courseid,{index:9},function(data,content){
        		plugin.openNewUrlByDialog(url,"autoNewpackageUrl_01");
        	});
        });
        $(document).on('click','.check-pop .close',function(){
            layer.closeAll();
         });
        //下载试题
        $(document).on('click','#downloadsubject',function(){
        	var interactid = $("#return-course").attr('data-interactid');
        	var courseid = $("#return-course").attr('data-id');
        	var packageDoamin = $("#return-course").attr('data-packageurl');
        	var uid = $("#return-course").attr('data-uid');
        	var url = packageDoamin + "/package/interactview/interactid/"+interactid+"/uid/"+uid;
        	plugin.checkVipDilog(courseid,{index:9},function(data,content){
        		plugin.openNewUrlByDialog(url,"autoNewpackageUrl");
        	});
        });
        //下载学生的答卷
        $(document).on('click','#downloadStudentSubject',function(){
        	var interactid = $("#return-course").attr('data-interactid');
        	var courseid = $("#return-course").attr('data-id');
        	var packageDoamin = $("#return-course").attr('data-packageurl');
        	var uid = $("#return-course").attr('data-uid');
        	var url = packageDoamin + "/Package/interactstudentview/interactid/"+interactid+"/uid/"+uid;
        	plugin.checkVipDilog(courseid,{index:9},function(data,content){
        		plugin.openNewUrlByDialog(url,"autoNewpackageUrl");
        	});
        });
        //生成平时成绩
        $(document).on('click','#regulargrade',function(event){
        	var interactid=$('#return-course').attr('data-interactid');
             API.InteractApi_getStepList(interactid,function(data){
                 plugin.closeLoading();
                 var html=template('tpl-attend-li',data);
                 var generateHtml = template('tpl-generate-regular-grade',[]);
                 $(generateHtml).find('.sure').addClass('active');
                 $(generateHtml).find('.choose a').eq(0).addClass('active');
                 $(generateHtml).find('.choose a').eq(1).removeClass('active');
                 if(data.data!=''){
                     layer.open({
                         type: 1,
                         title: false,
                         closeBtn: false,
                         area: ['600px', '550px'],
                         content: generateHtml,
                         skin:'layer-ext-ding00',
                         shift: 7,
                         moveType: 0,
                         success:function(layerContent){
                    	 	$(layerContent).find('.ch-box ul').html(html);
                    	 	checkCount = $(layerContent).find('.ch-box ul>li').length;
                    	 	$(layerContent).find('.sure').click(function(event){
                    	 		$(this).html('正在生成...');
                    	 		var takeInObj = $(layerContent).find('input[name=takeinSubjectiveScore]');
                    	 		var takeinscore = takeInObj.val();
                    	 		
                    	 		var takeinObjective = $(layerContent).find('input[name=takeinObjectiveScore]');
                    	 		var takeinObjectiveScore = takeinObjective.val();
                    	 		
                    	 		var objectiveObj = $(layerContent).find('input[name=objectivescore]');
                    	 		var objectivescore = objectiveObj.val();
                    	 		if(takeinscore < 0 || takeinscore == ""){
                    	 			takeInObj.focus();
                    	 			takeInObj.val('');
                    	 			plugin.openMsg('参与分不能为负数或为空',1);
                    	 			$(this).html('确定');
                    	 			return false;
                    	 		}
                    	 		if(takeinObjectiveScore < 0 || takeinObjectiveScore == ""){
                    	 			takeinObjective.focus();
                    	 			takeinObjective.val('');
                    	 			plugin.openMsg('客观题参与分不能为负数或为空',1);
                    	 			$(this).html('确定');
                    	 			return false;
                    	 		}
                    	 		if(objectivescore < 0 || objectivescore == ""){
                    	 			objectiveObj.focus();
                    	 			objectiveObj.val();
                    	 			plugin.openMsg('参与分不能为负数或为空',1);
                    	 			$(this).html('确定');
                    	 			return false;
                    	 		}
                    	 		if($(this).hasClass('active')){
                                    var idIndexs=[];
                                    $(layerContent).find('.content .ch-box li i.checked').each(function () {
                                    	idIndexs.push($(this).parents('li').attr('data-id'));
                                    })
                                    idIndexs=idIndexs.join('|');
                                    API.InteractApi_createRegularGrade(interactid,idIndexs,takeinscore,takeinObjectiveScore,objectivescore,function(){
                                        layer.closeAll();
                                        layer.open({
                                            type: 1,
                                            title: false,
                                            closeBtn: false,
                                            area: ['600px', '300px'],
                                            content: $('#interact-succes-tips'),
                                            shift: 7,
                                            moveType: 1
                                        });
                                    });
                                    return false;
                    	 		}else{
                    	 			plugin.openMsg('至少选择一个环节',1);
                    	 			$(this).html('确定');
                    	 			return false;
                    	 		}
                    	 	});
                            $(layerContent).find('.ch-box li .cont i').on('click',function(){
                                if($(this).hasClass('checked')){
                                    checkCount--;
                                    $(this).removeClass('checked');
                                    $(this).parents('.cont').prev().removeClass('active');
                                    $(layerContent).find('.content .choose a').eq(0).removeClass('active');
                                    if(checkCount==0){
                                    	$(layerContent).find('.content .choose a').eq(1).addClass('active');
                                    	$(layerContent).find('.sure').removeClass('active');
                                    }
                                }else{
                                	$(layerContent).find('.sure').addClass('active')
                                    $(this).parents('.cont').prev().addClass('active');
                                    checkCount++;
                                    $(this).addClass('checked');
                                    $(layerContent).find('.content .choose a').eq(1).removeClass('active');
                                    if(checkCount==$(layerContent).find('.ch-box ul>li').length){
                                    	$(layerContent).find('.content .choose a').eq(0).addClass('active');
                                    }
                                }
                            });
                            $(layerContent).find('.content .choose a:eq(0)').on('click',function(){
                                $(this).addClass('active').siblings().removeClass('active');
                                $(layerContent).find('.ch-box li .cont i').addClass('checked');
                                $(layerContent).find('.ch-box li .imgs').addClass('active');
                                checkCount=$(layerContent).find('.ch-box ul>li').length;
                                $(layerContent).find('.sure').addClass('active');
                            });

                            $(layerContent).find('.content .choose a:eq(1)').on('click',function(){
                            	$(layerContent).find('.ch-box li .imgs').removeClass('active');
                                $(this).addClass('active').siblings().removeClass('active');
                                $(layerContent).find('.ch-box li .cont i').removeClass('checked');
                                checkCount=0;
                                $(layerContent).find('.sure').removeClass('active')
                            });

                            $(layerContent).find('.ch-box li .imgs').on('click',function(){
                                $(this).next('.cont').find('i').click();
                            });
                     	}
                     });
                 }else{
                     plugin.openMsg('暂无有互动的环节,无法生成平时成绩',1,5000);
                 }
             });
        });
        //点击生成试卷
        $(document).on('click','.create-testpaper',function(event){
        	plugin.checkVipDilog('',{title:'开通VIP，立即利用互动生成测试的试卷',index:10},function(){
            	var interactid=$('#return-course').attr('data-interactid');
                API.InteractApi_getStepList(interactid,function(data){
                    plugin.closeLoading();
                    data.createtestpaper = 1;
                    var html=template('tpl-attend-li',data);
                    var generateHtml = template('tpl-generate-testpaper',[]);
                    $(generateHtml).find('.sure').addClass('active');
                    $(generateHtml).find('.choose a').eq(0).addClass('active');
                    $(generateHtml).find('.choose a').eq(1).removeClass('active');
                    if(data.data!=''){
                        layer.open({
                            type: 1,
                            title: false,
                            closeBtn: false,
                            area: ['600px', '550px'],
                            content: generateHtml,
                            skin:'layer-ext-ding00',
                            shift: 7,
                            moveType: 0,
                            success:function(layerContent){
                       	 	$(layerContent).find('.ch-box ul').html(html);
                       	 	checkCount = $(layerContent).find('.ch-box ul>li').length;
                       	 	$(layerContent).find('.sure').click(function(event){
                       	 		$(this).html('正在生成...');
                       	 		if($(this).hasClass('active')){
                                       var idIndexs=[];
                                       $(layerContent).find('.content .ch-box li i.checked').each(function () {
                                       		idIndexs.push($(this).parents('li').attr('data-id'));
                                       })
                                       idIndexs=idIndexs.join('|');
                                       API.InteractApi_createTestpaper(interactid,idIndexs,function(tData){
                                           layer.closeAll();
                                           var succTpl = template("tpl-generate-testpaper-succ",{testpaperid:tData.testpaperid})
                                           layer.open({
                                               type: 1,
                                               title: false,
                                               closeBtn: false,
                                               area: ['600px', '300px'],
                                               content: succTpl,
                                               shift: 7,
                                               moveType: 1
                                           });
                                       });
                                       return false;
                       	 		}else{
                       	 			plugin.openMsg('至少选择一个环节',1);
                       	 			$(this).html('确定');
                       	 			return false;
                       	 		}
                       	 	});
                               $(layerContent).find('.ch-box li .cont i').on('click',function(){
                                   if($(this).hasClass('checked')){
                                       checkCount--;
                                       $(this).removeClass('checked');
                                       $(this).parents('.cont').prev().removeClass('active');
                                       $(layerContent).find('.content .choose a').eq(0).removeClass('active');
                                       if(checkCount==0){
                                       	$(layerContent).find('.content .choose a').eq(1).addClass('active');
                                       	$(layerContent).find('.sure').removeClass('active');
                                       }
                                   }else{
                                   	   $(layerContent).find('.sure').addClass('active');
                                       $(this).parents('.cont').prev().addClass('active');
                                       checkCount++;
                                       $(this).addClass('checked');
                                       $(layerContent).find('.content .choose a').eq(1).removeClass('active');
                                       if(checkCount==$(layerContent).find('.ch-box ul>li').length){
                                       	$(layerContent).find('.content .choose a').eq(0).addClass('active');
                                       }
                                   }
                               });
                               $(layerContent).find('.content .choose a:eq(0)').on('click',function(){
                                   $(this).addClass('active').siblings().removeClass('active');
                                   $(layerContent).find('.ch-box li .cont i').addClass('checked');
                                   $(layerContent).find('.ch-box li .imgs').addClass('active');
                                   checkCount=$(layerContent).find('.ch-box ul>li').length;
                                   $(layerContent).find('.sure').addClass('active');
                               });

                               $(layerContent).find('.content .choose a:eq(1)').on('click',function(){
                               	$(layerContent).find('.ch-box li .imgs').removeClass('active');
                                   $(this).addClass('active').siblings().removeClass('active');
                                   $(layerContent).find('.ch-box li .cont i').removeClass('checked');
                                   checkCount=0;
                                   $(layerContent).find('.sure').removeClass('active')
                               });

                               $(layerContent).find('.ch-box li .imgs').on('click',function(){
                                   $(this).next('.cont').find('i').click();
                               });
                        	}
                        });
                    }else{
                        plugin.openMsg('暂无有互动的环节,无法生成测试的试卷',1,5000);
                    }
                });
        	});
        });
        //生成考勤点击
        $(document).on('click','.get-attend',function(event){
        	var interactid=$('#return-course').attr('data-interactid');
        	 $('#new-perform .sure').addClass('active');
             $('#new-perform .choose a').eq(0).addClass('active');
             $('#new-perform .choose a').eq(1).removeClass('active');
             API.InteractApi_getStepList(interactid,function(data){
                 plugin.closeLoading();
                 var html=template('tpl-attend-li',data);
                 $('#new-perform .ch-box ul').html(html);
                 checkCount=$('#new-perform .ch-box ul>li').length;
                 if(data.data!=''){
                     layer.open({
                         type: 1,
                         title: false,
                         closeBtn: false,
                         area: ['600px', '500px'],
                         content: $('#new-perform'),
                         shift: 7,
                         moveType: 1
                     });
                 }else{
                     plugin.openMsg('暂无有互动的环节,无法生成考勤',1)
                 }
             });
        });
        $(document).on('click','.del-pop .close,.del-pop .cancel', function () {
            layer.closeAll();
        });
        //全选
        $(document).on('click','#new-perform .ch-box li .cont i',function(){
            if($(this).hasClass('checked')){
                checkCount--;
                $(this).removeClass('checked');
                $(this).parents('.cont').prev().removeClass('active');
                $('#new-perform .content .choose a').eq(0).removeClass('active');
                if(checkCount==0){
                    $('#new-perform .content .choose a').eq(1).addClass('active');
                    $('#new-perform .sure').removeClass('active')
                }
            }else{
                $('#new-perform .sure').addClass('active')
                $(this).parents('.cont').prev().addClass('active');
                checkCount++;
                $(this).addClass('checked');
                $('#new-perform .content .choose a').eq(1).removeClass('active');
                if(checkCount==$('#new-perform .ch-box ul>li').length){
                    $('#new-perform .content .choose a').eq(0).addClass('active');
                }
            }
        });

        $(document).on('click','#new-perform .content .choose a:eq(0)',function(){
            $(this).addClass('active').siblings().removeClass('active');
            $('#new-perform .ch-box li .cont i').addClass('checked');
            $('#new-perform .ch-box li .imgs').addClass('active');
            checkCount=$('#new-perform .ch-box ul>li').length;
            $('#new-perform .sure').addClass('active')
        });

        $(document).on('click','#new-perform .content .choose a:eq(1)',function(){
            $('#new-perform .ch-box li .imgs').removeClass('active');
            $(this).addClass('active').siblings().removeClass('active');
            $('#new-perform .ch-box li .cont i').removeClass('checked');
            checkCount=0;
            $('#new-perform .sure').removeClass('active')
        });

        $(document).on('click','#new-perform .ch-box li .imgs',function(){
            $(this).next('.cont').find('i').click();
        });
        //确认生成考勤
        $(document).on('click','#new-perform .sure',function(){
            if($(this).hasClass('active')){
                var idIndexs=[];
                $('#new-perform .content .ch-box li i.checked').each(function () {
                	idIndexs.push($(this).parents('li').attr('data-id'));
                })
                idIndexs=idIndexs.join('|');
                API.InteractApi_createAttence(interactid,idIndexs,function(){
                    layer.closeAll();
                    layer.open({
                        type: 1,
                        title: false,
                        closeBtn: false,
                        area: ['600px', '300px'],
                        content: $('#attence-succes-tips'),
                        shift: 7,
                        moveType: 1
                    })
                })
            }else{
                plugin.openMsg('请至少选择一个环节',1);
            }
        });
        $(document).on('click','.sc-succ .cancel,.sc-succ .close',function(){
            layer.closeAll()
        });
        //查看详情
        $(document).on('click','.manage-box li .cont span',function(){
            if($(this).hasClass('disabled'))return;
            var stepid=$(this).parents('li').attr('data-id');
            if(stepid==-1){

            }else{
                var _this=this;
                $('.change-box').remove();
                API.InteractApi_getStepAnswerInfo(stepid, function (data) {
                    var html=template('tpl-detail-box',data);
                    $(_this).parents('.cont').after(html);
                    scrollBar.scrollBar($(_this).parents('li').find('.change-box'),$(_this).parents('li').find('.change-box ul'))
                })
                return false;
            }

        })
        $(document).click(function(){
            $('.change-box').remove();
        })

        $(document).on('click','.manage-box li .change-box .item a:eq(1)', function () {
            $(this).addClass('active').siblings().removeClass('active');
            var stepid=$(this).parents('li').attr('data-id');
            var _this=this;
            API.InteractApi_getStepNohandupList(stepid, function (data) {
                var html=template('tpl-detail-no',data);
                $(_this).parents('.change-box').find('ul').html(html);
                scrollBar.scrollBar($(_this).parents('.change-box'),$(_this).parents('.change-box').find('ul'))
            })
        })
        $(document).on('click','.manage-box li .change-box .item a:eq(0)', function () {
            $(this).addClass('active').siblings().removeClass('active');
            var stepid=$(this).parents('li').attr('data-id');
            var _this=this;
            API.InteractApi_getStepAnswerInfo(stepid, function (data) {
                var html=template('tpl-detail-have',data);
                $(_this).parents('.change-box').find('ul').html(html);
                scrollBar.scrollBar($(_this).parents('.change-box'),$(_this).parents('.change-box').find('ul'))
            })
        });
        $(document).on('click','.manage-box li .change-box',function(){
            return false;
        });

        var iTimer=null;
        $(document).on('mouseenter','.manage-box li .imgs .i2',function(){
            $('.tj-tips').hide();
            clearTimeout(iTimer)
            $(this).next('.tj-tips').show();
        }).on('mouseleave','.manage-box li .imgs .i2',function(){
            var _this=this;
            iTimer=setTimeout(function(){
                $(_this).next('.tj-tips').hide();
            },300)

        })

    };
    //获取已经提交的名单情况
	var handupListTimer = null;
    exports.handupLists=function(){
    	clearInterval(handupListTimer);
    	var stepid = $(".edit-page").attr('data-stepid');
        API.InteractApi_getStepAnswerInfo(stepid,function(data){
            var html=template('tpl-student',data);
            $('.links-cont .student-cont').html(html);
            plugin.closeLoading();
            setTimeout(function(){
                $('.links-cont .ll-div').show();
            },200);
        });
        $(document).on('click','.student-item .hand',function(){
            $(this).addClass('active');
            $('.student-item .nohand').removeClass('active');
            API.InteractApi_getStepAnswerInfo(stepid,function(data){
                var html=template('tpl-student',data);
                $('.links-cont .student-cont').html(html);
            });
        });
        $(document).on('click','.student-item .nohand',function(){
            $(this).addClass('active');
            $('.student-item .hand').removeClass('active');
            API.InteractApi_getStepNohandupList(stepid,function(data){
                var html=template('tpl-no-student',data);
                $('.links-cont .student-cont').html(html);
            })
        });
        handupListTimer = setInterval(function(){
        	var index = $(".student-item .active").index();
        	if(index == 0){
        		$('.student-item .hand').click();
        	}else if(index == 1){
        		$('.student-item .nohand').click();
        	}
        },8000);
    }
    //老虎机的方式进行提问
    exports.bandit = function(){
    	var bandTimer = null;
    	var namelist=[];
    	var mlists=[];
    	var num = 0;
    	var courseid = $(".banditbody").attr('data-courseid');
    	API.studentsApi_search(courseid,'',function(tData){
    		if(tData.lists != null && tData.lists.length > 0){
    			mlists = tData.lists;
        		for(var i=0;i<tData.lists.length;i++){
        			namelist.push(tData.lists[i].username);
        		}
    		}
    	});
    	function show(){
    		num = Math.floor((Math.random()*100000))%namelist.length;
    		if(namelist[num] == "" || namelist[num] == null){
        		$("#banditBox").html('班级没有成员');
    		}else{
        		$("#banditBox").html(namelist[num]);
    		}
    		bandTimer = setTimeout(function(){
    			show();
    		},1);
    	} 
    	$(document).on('click','#beginBandit',function(){
    		if(bandTimer == null){
    			$("#beginBandit").html("停止");
    			$("#rewardBtn").css({"display":"none"});
    			show();                    
    		}else{
    			$("#beginBandit").html("开始随机");
    			$("#rewardBtn").css({"display":"inline-block"});
    			clearTimeout(bandTimer);
    			bandTimer = null;
    		}
    	});
    	$(document).on('click','#rewardBtn',function(){
    		var studentName = mlists[num]['username'];
    		var studentid = mlists[num]['id'];
    		plugin.givePerformReward({
    			studentname:studentName,
    			courseid:courseid,
    			studentid:studentid,
    			type:'课堂提问',
    			giveReward:API.performanceApi_giveRewardToAsk,
    		});
    	});
    };
    //查看互动分享
    exports.share = function(){
       	$(document).on('click','.saveto',function(){
    		plugin.checkVipDilog('',{title:'开通VIP，立即保存分享的互动到备课区',index:23},function(){
                var lay2=null;
                var tpl = template('tpl-saveto-beikequ',[]);
                lay2=layer.open({
                    type: 1,
                    title: false,
                    closeBtn: false,
                    area: ['400px'],
                    content: tpl,
                    success:function(content){
                    	API.ResourceApi_getResourceList(function(data){
                            $('.beikequ .item-box').remove();
                            $(".beikequ .item span").html('请选择备课区');
                            if(data.data==null||data.data.length==0){
                                $(".beikequ .item span").addClass('disabled');
                            }else{
                                $(".beikequ .item span").removeClass('disabled');
                                var source = '<div class="item-box" style="display: none;">'
                                    +    '{{each data as value i}}'
                                    +        '<a data-id="{{value.id}}">{{value.title}}</a>'
                                    +    '{{/each}}'
                                    + '</div>';
                                var render = template.compile(source);
                                var html = render(data);
                                $(".beikequ .item").append(html);
                                
                                $(content).find('.item-box a').on('click',function(){
                                    $(this).parents('.item').find('span').html($(this).html()).attr('data-id',$(this).attr('data-id'));
                                    $(this).parents('.pop-new-V2').find('.sure').addClass('active');
                                });
                            }
                    	});
                    	$(content).find('.layui-layer-content').css('overflow','visible');
                        $(content).find('.sure').removeClass('active hover click');
                        $(content).find('.choose-box .item span').on('click',function(e){
                            $(this).parents('.input-box').siblings().find('.item-box').hide();
                            $(this).next().slideToggle(100);
                            e.stopPropagation();
                        });
                        $(content).on('click',function(){
                            $('.pop-new-V2 .item span').next().slideUp(100);
                            $('.pop-new-V2 .item').removeClass('active');
                        });
                        $(content).find('.cancel').on('click',function(){
                        	layer.close(lay2);
                        });
                        $(content).find('.sure').on('click',function(){
                        	var _this = this;
                        	var rid = $(this).parents('.pop-new-V2').find('.choose-item span').attr('data-id');
                        	var interactid = $(".sharecontainer").attr('data-interactid');
                        	if($(this).hasClass('active')){
                        		$(_this).removeClass('active').html('正在保存...');
                    			API.ResourceInteractApi_putInteractToResourceByShare(interactid,rid,function(rData){
                             		if(rData.status == 1){
                           				$(_this).addClass('active').html('确定');
                        				layer.close(lay2);
                        				plugin.alerttips({
                        						info:'已成功保存到指定的“备课区”',
                        						cancle:'关闭',
                        						sure:'前往备课区',
                        						sureCallback:function(){
                        							var url = "/Resource.html?rid="+rid+"&navtype=3";
                        							location.href = url;
                        						}
                        					}
                        				);
                             		}else{
                             			$(_this).addClass('active').html('确定');
                             			plugin.openMsg(rData.info,0);
                             		}
                    			});
                        	}else{
                        		plugin.openMsg('请选择备课区...',1);
                        	}
                        });
                    },
                    shift: 7,
                    moveType: 1
                });
    		});
    	});
    }
});
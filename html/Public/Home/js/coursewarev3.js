/**
 * Created by Administrator on 2015/5/18.
 */
define(function(require,exports,module){
    window.$=window.jQuery=$=require('jquery');
    require('jquery-ui');
    var layer=require('layer');
    var plugin=require('plugin');
    var template = require('art-template');
    template = plugin.templateConfig(template);
    // var importDialog = require("/html/Public/Home/js/importcourseware.js");
    var scrollBar = require('scrollBar');
	// var importMoocModule = require("/html/Public/Home/js/importmooc.js");
    var API = require('API');
    var cou = {};
    cou.drtype = '';
    //上传课件
    var uploader = {};
    var maxLimit = plugin.getMaxUploaderFileSize();
    var limit = plugin.getUploaderLimitFileSize(function(size){
    	limit = size;
    });
    function emptyDispose(){
    	var len1 = $(".data-box .data-cont ul li").length;
    	var allHtml = '<div class="none">没有文件啦</div>';
    	if(len1 == 0){
    		$(".data-box .data-cont ul").html(allHtml);
    	}else{
    		$(".none").remove();
    	}
    	var len2 = $(".data-box .data-cont2 ul li").length;
    	if(len2 == 0){
    		$(".data-box .data-cont2 ul").html(allHtml);
    		$(".cont2title").hide();
    	}else{
    		$(".none").remove();
    		$(".cont2title").show();
    	}
    };
    exports.intUploader = function(obj){
        require('webuploader');
    	require('lib/webuploader-0.1.5/webuploader.css');
    	var courseid = $("#course-header").attr('data-id');
    	var folderid = $(".all.fl").attr('data-folderid');
    	// var url = '/UploadApi/uploadCourseware/courseid/'+courseid+'/parent/'+folderid;
    	var url = 'http://localhost:8080/UploadApi/uploadCourseware';
    	uploader = WebUploader.create({
    		auto: true,
    	    swf:'/html/Public/Common/js/lib/webuploader-0.1.5/Uploader.swf',
    	    server: url,
    	    pick: {id:obj,multiple:true},
    	    resize: false,
    	    disableGlobalDnd:true,
    	    duplicate:true,
    	    compress:false,
    	    chunked: false,
    	    fileSingleSizeLimit:limit,//500M
    	});

    	window.uploader = uploader;
    	var box = $('.data-box').find('.data-tab');
    	var folderid = $(".all.fl").attr('data-folderid');
    	uploader.on( 'fileQueued', function( file ) {
            layer.closeAll();
    		var mFile = {};
    		mFile.id = file.id;
    		mFile.name = file.name;
    		mFile.size = plugin.format_bytes(file.size);
    		uploader.makeThumb( file, function( error, src ) {
    			if ( !error ){
        			mFile.ext = src;
    			}else{
    				mFile.ext = plugin.getFileExtIcon(file.ext);
    			}
                mFile.createtime = new Date().getTime()/1000;
                if($('.empty-box').is(':visible')&&$('.data-box').hasClass('hide')){
                    $('.empty-box').hide();
                    $('.data-box').show();
                    $('.data-cont').removeClass('hide');
                    $('.data-cont2').addClass('hide');
                }
    			var html = template('tpl-upload-file',mFile);
    			$(".data-cont>ul").prepend(html);
                var html = template('tpl-upload-file2',mFile);
                $(".data-cont2>ul").prepend(html);
                var $fileDiv = box.find("#file-ID-"+file.id);
                $fileDiv.on('click','.closeX',function(){
                    uploader.cancelFile(file);
                    $fileDiv.remove();
                });
                emptyDispose();
    		},64,64);
    	});
    	uploader.on( 'uploadProgress', function( file, percentage ) {
    		var $fileDiv = box.find("#file-ID-"+file.id);
    		var precent = Math.floor(percentage*100);
            if(precent<100){
                $fileDiv.find(".precent-ing .precentnum").text(precent+"%");
                $fileDiv.find(".precent-ing .precent").width(precent+"%");
            }
    	});
    	uploader.on( 'uploadError', function( file, reason) {
    		var $fileDiv = box.find("#file-ID-"+file.id);
    		$fileDiv.remove();
    		emptyDispose();
    	});
    	uploader.on('uploadAccept',function(object,ret){
            var $fileDiv = box.find("#file-ID-"+object.file.id);
    		if(ret.status == 1){
        		$fileDiv.remove();
                plugin.openMsg('已上传',0);
        		//这里要处理，将
        		var courseware = ret.data;
    			courseware.role = 1;
    			if(folderid == 0){
        			courseware.leavl = 1;	
    			}else{
        			courseware.leavl = 2;
    			}
    			var html = template('tpl-courseware',courseware);
    			$(".data-cont>ul").prepend(html);
                var html2 = template('tpl-courseware2',courseware);
                $(".data-cont2>ul").prepend(html2);
                emptyDispose();
    		}else if(ret.status == 2){
    			//这里是分块上传成功的提示
    		}else{
    			plugin.openMsg(ret.info,1);
                $fileDiv.remove();
    		}
    	});
    	uploader.on('error', function(type){
    		if(type == 'F_EXCEED_SIZE'){
    			plugin.openMsg('单文件上传超过了'+plugin.format_bytes(limit),1);
    		}
    		if(maxLimit > limit){
    			plugin.checkVipDilog('',{title:'开通VIP，立即上传大于150MB的文件',tips:'VIP用户，单个文件大小上限提升到500MB',index:3});
    		}
    	});
    };
    //拖动排序
    exports.sortableUI = function(){
        $(".data-tab ul").sortable({
            revert: true,
            containment: ".data-box",
            update: function(event, ui) {
                //排序接口
                var fileidlist = '';
                $(event.target).parents('.data-tab').find('li').each(function(){
                    fileidlist += $(this).attr('data-id')+'|';
                })
                API.coursewareApi_sortBat(fileidlist,function(data){});
            }
        });
        $(".data-tab ul li").draggable({
            connectToSortable: '.data-tab ul',
            refreshPositions: true,
            distance: 40,
        });
        $(".data-tab ul li[data-folder=1]").droppable({
            accept: ".data-tab ul li[data-folder=0]",
            distance: 40,
            addClasses: false,
            drop: function(event, ui) {
                if (!cou['drop'+event.timeStamp]) {
                    cou['drop'+event.timeStamp] = true;
                    var li = ui.draggable;
                    API.coursewareApi_moveFile(li.attr('data-id'), $(event.target).attr('data-id'), function(data) {
                        li.remove();
                        plugin.openMsg('移入成功', 0);
                        delete cou['drop'+event.timeStamp];
                    });
                }
            }
        });
        $(".data-cont ul,.data-cont ul li").disableSelection();
    }
    exports.getListType = function(){
		var type = 0;
		var typeObj =  $(".qh-btn .type1");
		if(typeObj.hasClass("active")){
			type = 1;
		}else{
			typeObj =  $(".qh-btn .type2");
			if(typeObj.hasClass("active")){
				type = 2;
			}
		}
		return type;
    }
    //进入某个目录
    exports.listsFile = function(folderid){
    	var type = exports.getListType();
		if(type == 1){
			$(".data-cont ul").html("");
			$(".data-cont").removeClass("hide");
			$(".data-cont2").addClass("hide");
		}else if(type ==2){
			$(".data-cont2 ul").html("");
			$(".data-cont").addClass("hide");
			$(".data-cont2").removeClass("hide");
		}
        
    	API.coursewareApi_folder(folderid,function(data){
    		var allHtml = "";
    		if(data.lists == null || data.lists.length == 0){
    			emptyDispose();
    		}else{
        		for(var i=0;i<data.lists.length;i++){
        			var courseware = data.lists[i];
        			courseware.role = data.role;
        			courseware.leavl = 2;
        			if(type == 1){
        				allHtml += template('tpl-courseware',courseware);	
        			}else if(type == 2){
        				allHtml += template('tpl-courseware2',courseware);
        			}
        		}
    			$(".data-cont ul").html(allHtml);
                $(".data-cont2 ul").html(allHtml);
    		}
            plugin.closeLoading();
    	});
    };
    //列出1级目录的所有课件信息,type=1表示 网格  2表示列表
    exports.listsFirstLeavl = function(courseid,type){
    	if(type == 1){
            $(".data-box .title .qh-btn .type1").addClass('active');
            $(".data-box .title .qh-btn .type1").siblings().removeClass('active');
    	}else if(type == 2){
            $(".data-box .title .qh-btn .type2").addClass('active');
            $(".data-box .title .qh-btn .type2").siblings().removeClass('active');
    	}
    	
    	if(type == 1){
    		$(".data-cont ul").html(""); 
    	}else if(type == 2){
            $(".data-cont2 ul").html("");	
    	} 
        API.coursewareApi_listAll(courseid,function(data){
            var allHtml = "";
            $('.multidelete').hide();
        	if(data.lists == null || data.lists.length == 0){
        		emptyDispose();
        		if(type == 2){
        			$(".cont2title").hide();
        		}
        	}else{
        		if(type == 2){
        			$(".cont2title").show();
        		}
                for(var i=0;i<data.lists.length;i++){
                    var courseware = data.lists[i];
                    courseware.role = data.role;
                    courseware.leavl = 1;
                    if(type == 1){
                    	allHtml += template('tpl-courseware',courseware);
                    }else if(type == 2){
                    	allHtml += template('tpl-courseware2',courseware);	
                    }
                }
                if(type == 1){
                    $(".data-cont ul").html(allHtml);
                }else{
                    $(".data-cont2 ul").html(allHtml);
                }
                $(document).off('click','.cwcheckbox');
                $(document).on('click','.cwcheckbox',function(){
                    if($(this).hasClass('cwactive')){
                        $(this).removeClass('cwactive');
                    }else{
                        $(this).addClass('cwactive');
                    }
                    cwcheckboxcount();
                });
                $(document).off('click','.cwcheckboxall');
                $(document).on('click','.cwcheckboxall',function(){
                    if($(this).hasClass('cwactive')){
                        // $(this).removeClass('cwactive');
                        $('.cwcheckbox').removeClass('cwactive');
                    }else{
                        // $(this).addClass('cwactive');
                        $('.cwcheckbox').addClass('cwactive');
                    }
                    cwcheckboxcount();
                });
                $('.multidelete').off('click');
                $('.multidelete').on('click',function(){
                    var dlist = $('.cwcheckbox.cwactive');
                    var count = $('.cwcheckbox.cwactive').length;
                    var done = 0;
                    plugin.cursorconfirm({
                        title:'系统提示',
                        info:'您是否确定要删除选中的文件？',
                        sureCallback:function(){
                            for(var i=0;i<count;i++){
                                var parentsli = $(dlist[i]).parents('li');
                                var id = parentsli.attr('data-id');
                                parentsli.remove();
                                API.coursewareApi_delCourseware(id,function(data){
                                    if(data.status===1){
                                        emptyDispose();
                                    }else{
                                        plugin.openMsg(data.info,1);
                                    }
                                    done++;
                                    if(done == count){
                                        plugin.openMsg('删除成功',0);
                                        cwcheckboxcount();
                                        emptyDispose();
                                    }
                                });
                            }
                        }
                    });
                });
        	}			
            plugin.closeLoading();
            var role = data.role;
            if(role == 1){
                exports.sortableUI();	
            }
        });
    };

    function cwcheckboxcount(){
        if($('.cwcheckbox.cwactive').length == $('.cwcheckbox').length){
            $('.cwcheckboxall').addClass('cwactive');
        }else{
            $('.cwcheckboxall').removeClass('cwactive');
        }
        if($('.cwcheckbox.cwactive').length>0){
            $('.multidelete').show();
        }else{
            $('.multidelete').hide();
        }
    }

    

    //初始化附件资源列表
    exports.initCoursewareResourceContrl = function(courseid){
    	if(cou.initCoursewareResourceContrlCache){
    		return;
    	}else{
    		cou.initCoursewareResourceContrlCache = true;
    	}
        function listsFolder(){
            $('.wenjianjia .item-box').remove();
            $(".wenjianjia .item span").html('请选择文件夹');
        	var courseid = $("#course-header").attr('data-id');
        	API.coursewareApi_listFolders(courseid,function(data){
                if(data.lists==null||data.lists.length==0){
                    $(".wenjianjia .item span").addClass('disabled');
                }else{
                    $(".wenjianjia .item span").removeClass('disabled');
                    var source = '{{if lists!=null&&lists.length>0}}<div class="item-box" style="display: none;">'
                        +    '{{each lists as value i}}'
                        +        '<a data-id="{{value.id}}" title="{{value.foldername}}">{{value.foldername}}</a>'
                        +    '{{/each}}'
                        + '</div>{{/if}}';
                    var render = template.compile(source);
                    var html = render(data);
                    $(".wenjianjia .item").append(html);
                }
        	});
        };
        //添加文件夹
        function addFolder(foldername){
        	var courseid = $("#course-header").attr('data-id');
        	API.coursewareApi_addFoloder(courseid,foldername,function(data){
        		var courseware = data.data;
    			courseware.role = data.role;
    			courseware.leavl = 1;
    			var html = template('tpl-courseware',courseware);
    			$(".data-cont ul").prepend(html);
                var html = template('tpl-courseware2',courseware);
                $(".data-cont2 ul").prepend(html);
                exports.sortableUI();
                emptyDispose();
        	});
        };        
        //文件移入弹窗
        $(document).on('click','.data-box ul li .yr-btn',function(){
            $(this).parents('li').attr('rel',2);
        	listsFolder();
            var lay2=null;
            lay2=layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area: ['400px'],
                content: $('#yr-pop'),
                success:function(content){
                    $('.layui-layer-content').css('overflow','visible');
                    $('#yr-pop .sure').removeClass('active hover click');
                    $(content).find(".cancel").on("click",function(){
                    	layer.close(lay2);
                    });
                },
                shift: 7,
                moveType: 1
            });
            $(this).parents('li').attr('rel',2).siblings().removeAttr('rel');
        });
        $(document).on('click','.pop-new-V2 .choose-box .item span',function(e){
            $(this).parents('.input-box').siblings().find('.item-box').hide();
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
        
        //确认移入
        $(document).on('click','#yr-pop .sure.active',function(){
            var id = $('.data-box ul li[rel=2]').attr('data-id');
            var folderid = $('#yr-pop .item span').attr('data-id');
            API.coursewareApi_moveFile(id,folderid,function(data){
                $('.data-box ul li[rel=2]').remove();
                layer.closeAll();
            });
        });
        
        //移出，不需要确认
        $(document).on('click','.data-cont ul li .yc-btn',function(){
            var index=$('.data-cont ul li .yc-btn').index(this);
        	var id=$(this).parents('li').attr('data-id');
        	var obj = $(this);
        	API.coursewareApi_moveFileOut(id,function(data){
        		obj.parents('li').remove();
                $('.data-cont2 ul li').eq(index).remove();
        		plugin.openMsg('移出成功',0);
        	});
        });
        $(document).on('click','.data-cont2 ul li .yc-btn',function(){
            var index=$('.data-cont ul li .yc-btn').index(this);
            var id=$(this).parents('li').attr('data-id');
            var obj = $(this);
            API.coursewareApi_moveFileOut(id,function(data){
                obj.parents('li').remove();
                $('.data-cont ul li').eq(index).remove();
                plugin.openMsg('移出成功',0);
            });
        });
        function listsResource(callback){
            if(!cou.resourcelist){
                API.ResourceApi_getResourceList(function(data){
                    cou.resourcelist = data;
                    callback();
                })
            }else{
                callback();
            }
        }
        function setResourceList(){
            $('.beikequ .item-box').remove();
            $('.beikequfolder .item-box').remove();
            $(".beikequ .item span").addClass('disabled').html('请选择备课区');
            $(".beikequfolder .item span").addClass('disabled').html('请选择文件夹');
            if(cou.resourcelist.data==null||cou.resourcelist.data.length==0){
                $(".beikequ .item span").addClass('disabled');
            }else{
                $(".beikequ .item span").removeClass('disabled');
                var courseid = $("#course-header").attr('data-id');
                var source = '<div class="item-box" style="display: none;">'
                    +    '{{each data as value i}}'
                    +        '<a data-id="{{value.id}}" title="{{value.title}}">{{value.title}}</a>'
                    +    '{{/each}}'
                    + '</div>';
                var render = template.compile(source);
                var html = render(cou.resourcelist);
                $(".beikequ .item").append(html);
            }
        }
        function setResourceFolder(rid){
            $('.beikequfolder .item-box').remove();
            $(".beikequfolder .item span").addClass('disabled').html('请选择文件夹');
            API.ResourceCoursewareApi_listFolders(rid,function(data){
                if(data.lists==null||data.lists.length==0){
                    $(".beikequfolder .item span").addClass('disabled');
                }else{
                    $(".beikequfolder .item span").removeClass('disabled');
                    var source = '<div class="item-box" style="display: none;">'
                        +    '{{each lists as value i}}'
                        +        '<a data-id="{{value.id}}" title="{{value.foldername}}">{{value.foldername}}</a>'
                        +    '{{/each}}'
                        + '</div>';
                    var render = template.compile(source);
                    var html = render(data);
                    $(".beikequfolder .item").append(html);
                }
            });
        }
        //文件保存弹窗
        $(document).on('click','.data-box ul li .bc-btn',function(){
            $(this).parents('li').attr('rel',2).siblings().removeAttr('rel');
            listsResource(function(){
                setResourceList();
            })
            var lay2=null;
            lay2 = layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area: ['400px'],
                content: $('#bc-pop'),
                success:function(content){
                    $('.layui-layer-content').css('overflow','visible');
                    $('#bc-pop .sure').removeClass('active hover click');
                    $(content).find(".cancel").on("click",function(){
                    	layer.close(lay2);
                    });
                },
                shift: 7,
                moveType: 1
            });
        });
        $(document).on('click','.beikequ .choose-item .item-box a',function(){
            var rid = $(this).attr('data-id');
            if($('.data-tab li[rel=2]').attr('data-folder')==0){
                setResourceFolder(rid);
            }else{
                $('#bc-pop .sure').addClass('active');
            }
        })
        $(document).on('click','#bc-pop .sure.active',function(){
            var rid = $(this).parents('.pop-new-V2').find('.beikequ .item span').attr('data-id');
            var folderid = $(this).parents('.pop-new-V2').find('.beikequfolder .item span').attr('data-id');
            var id = $('.data-tab li[rel=2]').attr('data-id');
            API.ResourceCoursewareApi_putCoursewareToResource(id,rid,folderid,function(data){
                plugin.openMsg('已保存',0);
                layer.closeAll();
            })
        })
        //【点击文件夹或者文件】，这里有可能有其他的处理，暂时都汇总到这里,在线预览等操作
        $(document).on('click','.data-tab li a.fileext',function(){
        	var isfolder = $(this).parent().attr('data-folder');
        	if(isfolder == 1){
        		var folderid = $(this).parent().attr('data-id');
        		var foldername = $(this).parents('li').find('h3 a').html();
        		$(".all.fl").attr('data-folderid',folderid);
        		$(".all.fl span").text(foldername);
        		exports.listsFile(folderid);
                $('.data-box .title .here').hide();
                $('.data-box .title .there').show();
                $('.data-box .title i').removeClass('hide2');
                $('.data-box .title .new-btn').hide();
                $('.data-box .title .all span').html($(this).find('h3 a').html()).removeClass('hide');
        	}else{
        		plugin.preview($(this));
        	}
        });

        //文件、文件夹删除弹窗
        $(document).on('click','.data-box ul li .del-btn',function(){
            var parentsli = $(this).parents('li');
            var id = parentsli.attr('data-id'),
            isfolder=parentsli.attr('data-folder'),
            name=parentsli.find('h3 a').text();
            plugin.cursorconfirm({
            	title:'系统提示',
            	info:'您是否确定要删除该文件？',
            	sureCallback:function(){
                	API.coursewareApi_delCourseware(id,function(data){
                		if(data.status===1){
                			parentsli.remove();
                			plugin.openMsg('删除成功',0);
                			emptyDispose();
                		}else{
                        	plugin.openMsg(data.info,1);
                		}
                	});
            	}
            });
        });
        
        //文件夹下载
        $(document).on('click','.data-cont li .opt-aa a.down-btn',function(){
            console.info(2);
        	var isfolder = $(this).parents('li').attr('data-folder');
        	var url = $(this).attr('href');
        	if(isfolder == 1){
    			if(url!=undefined && url!="" && url!="javascript:;" && url!=null){
            		window.open(url);
            		return false;
    			}else{
    				plugin.cursoralert({
    					title:'系统提示',
    					info:'老师已经将此课件设置为 不可下载，您只能在线查看！',
    					sure:'朕知道了',
    				});
    				return false;
    			}
        	}else{
    			if(url!=undefined && url!="" && url!="javascript:;" && url!=null){
    				location.href = url;
    			}else{
    				plugin.cursoralert({
    					title:'系统提示',
    					info:'老师已经将此课件设置为 不可下载，您只能在线查看！',
    					sure:'朕知道了',
    				});
    			}
        	}
        });
        //列表模式下的文件夹下载    
        $(document).on('click','.data-tab li .opt-a a.down-btn',function(){
        	var isfolder = $(this).parents('li').attr('data-folder');
        	var url = $(this).attr('href');
        	if(isfolder == 1){
    			if(url!=undefined && url!="" && url!="javascript:;" && url!=null){
            		window.open(url);
            		return false;
    			}else{
    				plugin.cursoralert({
    					title:'系统提示',
    					info:'老师已经将此课件设置为 不可下载，您只能在线查看！',
    				});
    				return false;
    			}
        	}else{
    			if(url!=undefined && url!="" && url!="javascript:;" && url!=null){
    				location.href = url;
    			}else{
    				plugin.cursoralert({
    					title:'系统提示',
    					info:'老师已经将此课件设置为 不可下载，您只能在线查看！',
    				});
    			}
        	}
        });
        
        //弹出更多的窗口
        $(document).on('click','.data-cont li .opt-aa a.more-btn,.data-cont2 li .opt-a a.more-btn',function(){
            console.info(1);
			 var isfolder = $(this).parents("li").attr("data-folder");
			 var tpl = "";
			 if(isfolder == 1){
	        	 tpl = '<div class="opt-box2"><a href="javascript:;" class="down-auth">权限设置</a><a href="javascript:;" class="del-courseware">删除</a></div>';
				 if(!$(this).next().hasClass('opt-box2')){
					 $(this).after(tpl);
				 }else{
					 $(this).next().remove();
				 }
			 }else{
	        	 tpl = '<div class="opt-box2"><a href="javascript:;" class="use-stat">使用统计</a><a href="javascript:;" class="down-auth">权限设置</a><a href="javascript:;" class="del-courseware">删除</a></div>';
				 if(!$(this).next().hasClass('opt-box2')){
					 $(this).after(tpl);
				 }else{
					 $(this).next().remove();
				 }
			 }
			 return false;
        });
		 $(document).on('click',function(){
			 $(".opt-box2").remove();
		 });
        //资源使用情况统计
        $(document).on('click','.opt-box2 .use-stat',function(){
            var parentsli = $(this).parents('li');
            var id = parentsli.attr('data-id');
            var tpl = template("tpl-courseware-use-stat",[]);
            var index = layer.open({
                type: 1,
                title: false,
                closeBtn: true,
                shadeClose:true,
                area: ['790px','580px'],
                content: tpl,
                success:function(content){
            		
            		API.coursewareApi_getCoursewareUseStat(id,function(tData){
    			 		layui.use('table', function(){
       			 			var table = layui.table;
       			 			table.render({
       			 				elem: '#visit-table',
       			 				cols: [[
       			 				        {field: 'username', title: '姓名', align:'center', sort: true,width: 150},
       			 				        {field: 'stno', title: '学号', align:'center',sort: true,width: 150},
       			 				        {field: 'watchnum', title: '查阅次数',sort: true, align:'center',width: 120},
       			 				        {field: 'downcount', title: '下载次数',sort: true, align:'center',width: 120},
       			 				        {field: 'updatetime', title: '最后访问',sort: true, align:'center',width: 190},
       			 				       ]],
       			 				height: 490,
       			 				initSort:{field:'watchnum',type:'desc'},
       			 				limit:tData.count,
       			 				data:tData.data
       			 			});
       			 		});
            			plugin.closeLoading();
            		});
                },
                end:function(){
                	plugin.closeLoading();
                },
                shift: 7,
                moveType: 1
            });
        });
        //资源的权限设置
        $(document).on('click','.opt-box2 .down-auth',function(){
            var parentsli = $(this).parents('li');
            var id = parentsli.attr('data-id');
            API.coursewareApi_getCoursewareInfo(id,function(tData){
                var tpl = template("tpl-courseware-auth-dialog",tData.data);
                var lay2=null;
                lay2 = layer.open({
                    type: 1,
                    title: false,
                    closeBtn: false,
                    area: ['400px'],
                    content: tpl,
                    success:function(content){
                        $('.layui-layer-content').css('overflow','visible');
                        $(content).find('.sure').removeClass('active hover click');
                        $(content).find(".cancel").on("click",function(){
                        	layer.close(lay2);
                        });
                        $(content).find('.sure').on("click",function(){
                        	 if(!$(this).hasClass("active")) return false;
                        	 var state = $(content).find('.choose-item .selectbox').attr('data-id');
                        	 API.coursewareApi_setDownloadAuth(id,state,function(tData){
                        		 plugin.openMsg('设置成功',0);
                        		 layer.close(lay2);
                        	 });
                        });
                    },
                    shift: 7,
                    moveType: 1
                });
            });
        });
        //删除课件
        $(document).on('click','.opt-box2 .del-courseware',function(){
            var parentsli = $(this).parents('li');
            var id = parentsli.attr('data-id'),
            isfolder=parentsli.attr('data-folder'),
            name=parentsli.find('h3 a').text();
            plugin.cursorconfirm({
            	title:'系统提示',
            	info:'您是否确定要删除该文件？',
            	sureCallback:function(){
                	API.coursewareApi_delCourseware(id,function(data){
                		if(data.status===1){
                			parentsli.remove();
                			plugin.openMsg('删除成功',0);
                			emptyDispose();
                		}else{
                        	plugin.openMsg(data.info,1);
                		}
                	});
            	}
            });
        });
        //重命名文件夹
        $(document).on('click','.data-box ul li .edit-btn', function(){
            var folderid=$(this).parents('li').attr('data-id');
            var foldername=$(this).parents('li').find('h3 a').attr('title');
            var index = layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area: ['400px'],
                content: $('#edit-wjj'),
                success:function(renameContent){
                    $(renameContent).find('#edit-wjj').attr('data-id',folderid);
                    $(renameContent).find('#edit-wjj .txt1').focus().val(foldername);
                    //确认重命名
                    $(renameContent).find('#edit-wjj .sure').on('click',function(){
                        var folderid = $(renameContent).find('#edit-wjj').attr('data-id');
                        var oV= $(renameContent).find('#edit-wjj input').val();
                        if(oV==''){
                            plugin.openMsg('请输入文件夹名',1);
                        }else{
                            API.coursewareApi_renameFolder(folderid,oV,function(){
                                layer.closeAll();
                                plugin.openMsg('修改成功',0);
                                var a=oV;
                                a.length>=18?a=a.substr(0,18)+'...':a;
                                $('.data-box .data-cont ul li[data-id='+folderid+']').find('h3 a').html(a).attr('title',oV);
                                $('.data-box .data-cont2 ul li[data-id='+folderid+']').find('h3 a').html(oV).attr('title',oV);
                            })
                        }
                    });
                    $(renameContent).find('.cancel').on('click',function(){
                    	layer.close(index);
                    	return false;
                    });
                },
                shift: 7,
                moveType: 1
            });
        });

        $(document).on('focus','.pop-new-2 .input-box input',function(){
            $(this).parents('.input-box').addClass('focus');
        }).on('blur','.pop-new-2 .input-box input',function(){
            $(this).parents('.input-box').removeClass('focus');
        })

        //新建文件夹
        $(document).on('click','.data-box .title .new-btn a', function(){
            var index = layer.open({
                type: 1,
                title: false,//['新建文件夹', 'font-size:18px; height:66px; line-height:66px; background:#FFF; color:#a9a9a9; padding-left:28px; border-bottom:1px solid #ececec'],
                closeBtn: false,
                area: ['400px'],
                content: $('#new-wjj'),
                success:function(newFolderContent){
                    $('#new-wjj .sure').removeClass('active hover click');
                    $('#new-wjj .txt1').focus().val('');
                    $(newFolderContent).find('.cancel').on('click',function(event){
                    	layer.close(index);
                    	return false;
                    });
                },
                shift: 7,
                moveType: 1
            });
        });
        //新建确认
        $(document).on('click','#new-wjj .sure.active',function(){
            addFolder($('#new-wjj .txt1').val());
            layer.closeAll();
        });
        
        //【所有课件】点击
        $(document).on('click','.data-box .title .all .there',function(){
        	$(".all.fl").attr('data-folderid',0);
            $('.data-box .title .here').show();
            $(this).hide();
            $('.data-box .title i').addClass('hide2');
            $('.data-box .title .new-btn').show();
            $('.data-box .title .all span').html('').addClass('hide');
            exports.listsFirstLeavl(courseid,exports.getListType());
        });
        
        //导入选中的(选中课程)
        $(document).on('click',"#dr-pop .class-item li a",function(){
            var id = $(this).parents("li").attr('data-id');
        	var isfolder = $(".all.fl").attr('data-folderid');
            var self = this;
            $('.class-item.fl li .active').removeClass('active');
            $(self).addClass('active');
            if(cou.drtype=='import1'){
            	plugin.mloading();
                API.ResourceCoursewareApi_listAllCourseware(id,function(data){
                    data.lists&&data.lists.map(function(item){
                        item.createtime = plugin.time_format_year_month_day_hour_min(item.createtime);
                    })
                    data.isresource = true;
                    if(isfolder!=0){
                        data.istofolder = true;
                    }
                    var html = template('tpl-import-courseware',data);
                    $(".class-cont.fr .cont-box").html(html);
                    scrollBar.scrollBar($('.class-cont.fr'),$('.class-cont.fr ul'));
                    plugin.closeLoading();
                })
            }
            if(cou.drtype=='import2'){
            	plugin.mloading();
                $('.class-item.fl li .active').removeClass('active');
                $(self).addClass('active');
                API.coursewareApi_getCousewareList(id,isfolder,function(data){
                    data.lists&&data.lists.map(function(item){
                        item.createtime = plugin.time_format_year_month_day_hour_min(item.createtime);
                    })
                    data.iscourse = true;
                    if(isfolder!=0){
                        data.istofolder = true;
                    }
                    var html = template('tpl-import-courseware',data);
                    $(".class-cont.fr .cont-box").html(html);
                    scrollBar.scrollBar($('.class-cont.fr'),$('.class-cont.fr ul'));
                    plugin.closeLoading();
                });
            }
        	
        });
        
        //导入确认
        $(document).on('click','#dr-pop .sure.active',function(){
        	var filelist="";
        	$(".class-cont.fr ul li").each(function(ele){
        		if($(this).find('i').hasClass('active')){
        			filelist +=$(this).attr('data-id');
        			filelist +="|";	
        		}
        	});
        	var courseid = $("#course-header").attr('data-id');
        	var folderid = $(".all.fl").attr('data-folderid');
            if(cou.drtype=='import1'){
                API.ResourceCoursewareApi_putResourceCoursewareToCourse(filelist,courseid,folderid,function(data){
                    layer.closeAll();
                    plugin.openMsg('导入成功',0);
                    hideBlank();
                    if(folderid=="0"){
                    	exports.listsFirstLeavl(courseid,exports.getListType());
                    }else{
                    	exports.listsFile(folderid);
                    }
                })
            }
            if(cou.drtype=='import2'){
                API.coursewareApi_importFiles(courseid,folderid,filelist,function(data){
                    for(var i=0;i<data.lists.length;i++){
                        var courseware = data.lists[i];
                        courseware.role = data.role;
                        if(folderid != 0){
                            courseware.leavl = 2;
                        }else{
                            courseware.leavl = 1;
                        }
                        var html = template('tpl-courseware',courseware);
                        $(".data-cont ul").prepend(html);
                        var html2 = template('tpl-courseware2',courseware);
                        $(".data-cont2 ul").prepend(html2);
                    }
                    layer.closeAll();
                    plugin.openMsg('导入成功',0);
                    hideBlank();
                    if(folderid=="0"){
                    	exports.listsFirstLeavl(courseid,exports.getListType());
                    }else{
                    	exports.listsFile(folderid);
                    }
                });
            }
        	
        });
        
        //点击目录
        $(document).on('click','.data-box .foldertext',function(){
        	var isfolder = $(this).parents('li').attr('data-folder');
        	if(isfolder == 1){
        		var folderid = $(this).parents('li').attr('data-id');
        		var foldername = $(this).parents('li').find('h3 a').html();
        		$(".all.fl").attr('data-folderid',folderid);
        		$(".all.fl span").text(foldername);
        		exports.listsFile(folderid);
                $('.data-box .title .here').hide();
                $('.data-box .title .there').show();
                $('.data-box .title i').removeClass('hide2');
                $('.data-box .title .new-btn').hide();
                $('.data-box .title .all span').html($(this).find('h3 a').html()).removeClass('hide');
        	}
        });
        
    	//网格和列表模式的切换
        $(document).on('click','.data-box .title .qh-btn a.type1',function(){
            $(this).addClass('active').siblings().removeClass('active');
            $('.data-cont').removeClass('hide');
            $('.data-cont2').addClass('hide');
            exports.listsFirstLeavl(courseid,1);
        });
        $(document).on('click','.data-box .title .qh-btn a.type2',function(){
            $(this).addClass('active').siblings().removeClass('active');
            $('.data-cont').addClass('hide')
            $('.data-cont2').removeClass('hide');
            exports.listsFirstLeavl(courseid,2);
        });
    }
    exports.initCoursewareResource = function(courseid,type){
    	var tpl = template("tpl-courseware-resource-area",{type:type});
    	$(".right-pannel").html(tpl);
    	exports.listsFirstLeavl(courseid,type);
    	exports.initCoursewareResourceContrl(courseid);
    }
    exports.openAttachmentDialog = function(){
    	importDialog.initAPI();
    	importDialog.openResourceDialog({
			singleCheck:0,
			defaultUploader:false,
			canSelectFolder:false,
			intCallBack:function(dialogObj){
    			exports.intUploader(dialogObj.find('.sc-btn'));
    		},
			finishCallback:function(fileidArray,remark,fromType,idArray){
    			var filelist="";
    			if(fromType<=2){
    				for(var i=0;i<idArray.length;i++){
            			filelist += idArray[i];
            			filelist +="|";	
        			}
    	        	var courseid = $("#course-header").attr('data-id');
    	        	var folderid = $(".all.fl").attr('data-folderid');
    				if(fromType == 1){
    	                API.ResourceCoursewareApi_putResourceCoursewareToCourse(filelist,courseid,folderid,function(data){
    	                    layer.closeAll();
    	                    plugin.openMsg('导入成功',0);
    	                    if(folderid=="0"){
    	                        exports.listsFirstLeavl(courseid,exports.getListType());
    	                    }else{
    	                    	exports.listsFile(folderid);
    	                    }
    	                });
    				}else if(fromType == 2){
    	                API.coursewareApi_importFiles(courseid,folderid,filelist,function(data){
    	                    layer.closeAll();
    	                    plugin.openMsg('导入成功',0);
    	                    if(folderid=="0"){
    	                        exports.listsFirstLeavl(courseid,exports.getListType());
    	                    }else{
    	                    	exports.listsFile(folderid);
    	                    }
    	                });
    				}
    			}
    		}
    	});
    };
    exports.getMoocListsContrl = function(courseid,order){
    	var tpl = template("tpl-mooc-lists-Area",[]);
    	$(".right-pannel").html(tpl);
    	API.coursewareApi_getMoocLists(courseid,order,function(tData){
        	var tplLists = template("tpl-course-lists",tData);
        	$(".tabArea-body").html(tplLists);
    	});
    	if(cou.getMoocListsContrlCache){
    		return;
    	}else{
    		cou.getMoocListsContrlCache = true;
    	}
    	$(document).on("click",".tabArea .tabArea-header ul li",function(){
    		var liIndex = $(this).index();
    		if(liIndex == 0){
    	    	API.coursewareApi_getMoocLists(courseid,0,function(tData){
    	        	var tplLists = template("tpl-course-lists",tData);
    	        	$(".tabArea-body").html(tplLists);
    	    	});
    		}else if(liIndex == 1){
    	    	API.coursewareApi_getMoocLists(courseid,1,function(tData){
    	        	var tplLists = template("tpl-course-lists",tData);
    	        	$(".tabArea-body").html(tplLists);
    	    	});
    		}
    		$(this).addClass("active");
    		$(this).siblings().removeClass("active");
    	});
    	$(document).on('click',".opt-box2 .delMooc",function(){
    		var li = $(this).parents("li");
    		var dataid = $(this).parents("li").attr("data-id");
    		plugin.cursorconfirm({
    			title:"系统提示",
    			info:"您是否要删除该课程资源？",
    			sureCallback:function(){
    				API.coursewareApi_delCouresewareMooc(dataid,function(tData){
    					li.remove();
    					plugin.openMsg("删除成功");
    				});
    			}
    		});
    	});
    	$(document).on('click',".op .dropdownbt",function(){
    		var obj = $(this).next();
			if(obj.hasClass("opt-box2")){
				if(obj.css("display") == 'none'){
					obj.show();
				}else{
					obj.hide();
				}
			}
			return false;
		});
		$("body").on('click',function(){
			$(".opt-box2").hide();
		});
    };
    //外链资源列表
    exports.getOutlinkContrl = function(courseid,order){
    	API.CoursewareApi_getWebLinkLists(courseid,function(tData){
            var tplLists = template("tpl-courseware-outlink-area",tData);
        	$(".right-pannel").html(tplLists);
        });
    	if(cou.getOutlinkContrlCache){
    		return;
    	}else{
    		cou.getOutlinkContrlCache = true;
    	}
        $(document).on('click',".outlinkctrl .opt-box2 .delol",function(){
    		var li = $(this).parents(".outlinkblock");
    		var dataid = $(this).parents(".outlinkblock").attr("olid");
    		plugin.cursorconfirm({
    			title:"系统提示",
    			info:"您是否要删除该外链资源？",
    			sureCallback:function(){
    				API.CoursewareApi_deleteWebLink(dataid,function(tData){
    					li.remove();
    					plugin.openMsg("删除成功");
    				});
    			}
    		});
        });
        $(document).on('click',".outlinkctrl .opt-box2 .editol",function(){
            var fb = $(this).parents(".outlinkblock");
            var dataid = $(this).parents(".outlinkblock").attr("olid");
            var tit = $(fb).find(".outlinktitle").html();
            var con = $(fb).find(".outlinkcontent").html();
    		var opt={};
            opt.title='<div class="addoltitle">'
            		  +'编辑外链链接'
            		  +'<div class="dialogClose"></div>'
            		  +'</div>'
            		  +'<input type="text" name="" id="oltitle" placeholder="外链标题简介" value="'+tit+'">'
            		  +'<input type="text" name="" id="olcontent" placeholder="外链网址链接" value="'+con+'">'
            		  +'<div class="btnoke">确认</div>';
            opt.maskclose = true;
            opt.success = function(optContentObj){
            	optContentObj.find(".btnoke").on("click",function(){
                    var oltitle = optContentObj.find("#oltitle").val();
                    var olcontent = optContentObj.find("#olcontent").val();
                    if(oltitle!="" && olcontent!=""){
                        if(exports.checkurl(olcontent)){
                            if(!olcontent.match(/^https?:(?:\/\/)?/)){
                                olcontent="http:\/\/"+olcontent;
                            }
                            API.CoursewareApi_updateWebLink(dataid,oltitle,olcontent,function(){
                                $(fb).find(".outlinktitle").html(oltitle);
                                $(fb).find(".outlinkcontent").html(olcontent);
                                plugin.openMsg("修改成功",0);
                                optContentObj.remove();
                            });
                        }else{
                            plugin.openMsg("请输入正确的超链接",1);
                            return false;
                        }
                    }else{
                        plugin.openMsg("标题或链接不能为空",1);
                    }
            	});
            };
            plugin.blankalert(opt);
    	});
        $(document).on('click',".outlinkctrl .dropdownbt",function(){
    		var obj = $(this).next();
			if(obj.hasClass("opt-box2")){
				if(obj.css("display") == 'none'){
					obj.show();
				}else{
					obj.hide();
				}
			}
			return false;
		});
		$("body").on('click',function(){
			$(".opt-box2").hide();
		});
    };
    exports.openOutlinkDialog = function(courseid){
        var opt={};
        opt.title='<div class="addoltitle">'
        		  +'添加外链链接'
        		  +'<div class="dialogClose"></div>'
        		  +'</div>'
        		  +'<input type="text" name="" id="oltitle" placeholder="外链标题简介">'
        		  +'<input type="text" name="" id="olcontent" placeholder="外链网址链接">'
        		  +'<div class="btnoka">导入</div>';
	    opt.maskclose = true;
	    opt.success = function(optContentObj){
	    	optContentObj.find(".btnoka").on('click',function(){
	            var oltitle=optContentObj.find("#oltitle").val();
	            var olcontent=optContentObj.find("#olcontent").val();
	            if(oltitle!="" && olcontent!=""){
	                if(exports.checkurl(olcontent)){
	                    if(!olcontent.match(/^https?:(?:\/\/)?/)){
	                        olcontent="http:\/\/"+olcontent;
	                    }
	                    API.CoursewareApi_addWebPageLink(courseid,oltitle,olcontent,function(){
	                    	exports.getOutlinkContrl(courseid,0);
		                    optContentObj.remove();
	                        plugin.openMsg("添加成功",0);
	                    });
	                }else{
	                    plugin.openMsg("请输入正确的超链接",1);
	                    return false;
	                }
	            }else{
	                plugin.openMsg("标题或链接不能为空",1);
	                return false;
	            }
			});
	    };
    	plugin.blankalert(opt);
    }
    exports.openMoocDialog = function(courseid){
    	importMoocModule.openResourceDialog(null,function(moocid,chapterid,subchapterid,lessonid){
    		API.coursewareApi_addMoocResource(courseid,moocid,chapterid,subchapterid,lessonid,function(){
    		});
    	},function(){
			exports.getMoocListsContrl(courseid,0);
			plugin.openMsg("导入成功",0);
		});
    }
    
    exports.coursewareContrl=function(showtype) {
    	if(showtype == "" || showtype == undefined || showtype == null){
    		showtype = 1;
    	}
        var courseid = $("#course-header").attr('data-id');
        var index = plugin.getQuery2("index");
        if(index == "" || index == null){
            index = 0;
        }
        $(".left-pannel ul li").eq(index).addClass("active");
        if(index == 0){
        	exports.initCoursewareResource(courseid,showtype);	
        }else if(index == 1){
        	exports.getOutlinkContrl(courseid,0);
        }else if(index == 2){
        	exports.getMoocListsContrl(courseid,0);
        }
        $(document).on("click",".add-resource-btn",function(){
        	index = $(".left-pannel ul li.active").index();
        	if(index == 0){
        		exports.openAttachmentDialog();
        	}else if(index == 1){
        		exports.openOutlinkDialog(courseid);
        	}else if(index == 2){
        		exports.openMoocDialog(courseid);
        	}
        });
        $(document).on("click",".left-pannel ul li",function(){
        	index = $(this).index();
        	if(index == 0){
        		exports.initCoursewareResource(courseid,showtype);
        	}else if(index == 1){
        		exports.getOutlinkContrl(courseid,0);
        	}else if(index == 2){
        		exports.getMoocListsContrl(courseid,0);
        	}
        	$(".left-pannel ul li").eq(index).addClass("active");
        	$(".left-pannel ul li").eq(index).siblings().removeClass("active");
        	plugin.setQuery2("index",index);
        });
    };

    exports.checkurl = function(str){
    	if(str == "" || str == null){
    		return false;
    	}
        return !!str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g);
    };
});
/**
 * Created by Administrator on 2015/5/7.
 */
define(function(require,exports,module){
    window.$=window.jQuery=$=require('jquery');
    var layer=require('layer');
    var plugin=require('plugin');
    var template = require('art-template');
    var API = require('API');
    var scrollBar=require('scrollBar');
    require('webuploader');
	require('lib/webuploader-0.1.5/webuploader.css');
    template.helper('delTag',function(content){
    	return plugin.delHtmlTag(content);
    });
    template.helper('resetdesc',function(content){
        var imgreg = /<img (?!class="kfformula")[^>]*?[^>]*?>/g;
        if(imgreg.test(content)){
            return content.match(imgreg)[0]+plugin.subStringLen(plugin.delHtmlTag(content),160);
        }else{
            return plugin.subStringLen(plugin.delHtmlTag(content),160);
        }
    });
    function myread(id){
       
       API.notifyApi_readNotify(id,function(data){
            plugin.openMsg('已阅读',2);
       });
    };
    //
    function showBlank(){
    	$('.empty-box').show();
    };
    function hideBlank(){
    	$('.empty-box').hide();
    };
    $(document).ready(function() {
        calH();
        setAutoHeight();
        plugin.previewImg($('.fileext[data-ispic=1]'));
    })
    //列出所有的公告
    function lists(){
        // var courseid = $("#course-header").attr('data-id');
    	API.notifyApi_lists(localStorage['cid'],function(data){
    		if(data.lists == null || data.lists.length == 0){
    			showBlank();
    		}else{
                hideBlank();
                $('.announce-box ul').html("");
                for(var i=0,l=data.lists.length;i<l;i++){
                    // data.lists[i].createtime = plugin.time_format_year_month_day_hour_min(data.lists[i].createtime);
                    var html = template('tpl-anList',data.lists[i]);
                    $('#viewer-container-lists').append(html);
                    if(i==l-1){
                        setTimeout(function(){
                            calH();
                            setAutoHeight();
                            plugin.previewImg($('.fileext[data-ispic=1]'));
                        },200)
                    }
                }
                
            }
            // plugin.closeLoading();
            // introstart()
        });

        // function introstart(){
        //     var introtype=6;
        //     var courseid=$('#course-header').attr('data-id');
        //     API.TourApi_isTour(courseid,introtype,function(data){
        //         if(data.isTour==0){
        //             require.async(['intro','/Public/Common/js/lib/intro/introjs.css'],function(){
        //                 var intros=introJs().setOptions({'prevLabel':'〈 上一步','nextLabel':'下一步 〉','skipLabel':'跳过','doneLabel':'完成'}).start();
        //                 intros.oncomplete(function() {
        //                     API.TourApi_setTourFinish(introtype,function(){});
        //                 });
        //             });
        //         }
        //     })
        // }
    };
    //有锚点时自动滚动
    function setAutoHeight(){
        var url = window.location.href;
        var reg = /\#\w+/;
        if(!reg.test(url)){return;}
        var result = url.match(reg)[0].substring(1);
        var top = $("#viewer-container-lists li[data-id="+result+"]").offset().top;
        $("html,body").animate({scrollTop:top-113},200);
    }
    function setDrPopItemContH(){
        var drPopHeight=parseInt($(window).height()*0.9)-60-85;
        if(drPopHeight>435)drPopHeight=435;
        $('.dr-pop .class-item').css('height',drPopHeight);
        $('.dr-pop .class-cont').css('height',drPopHeight);
    }
    //列出所有可以导入的公告列表
    function importList(){
        $("#viewer-container-course-notifylist").html('');
    	API.notifyApi_importList(function(data){
            var html1 = template('tpl-import-part',data);
            $(".pop-cont").html(html1);
            setDrPopItemContH();
    		var html = template('tpl-import-course',data);
    		$("#viewer-container-courselists").html(html);
    		scrollBar.scrollBar($('.class-item.fl'),$('.class-item.fl ul'));
            $('.dr-pop .class-item.fl li a ').eq(0).click()
    	});
    };
    //附件上传
    var uploader = {};
    var maxLimit = plugin.getMaxUploaderFileSize();
    var limit = plugin.getUploaderLimitFileSize(function(size){
    	limit = size;
    });
    
    function initUploader(obj){
    	uploader = WebUploader.create({
    		 auto: true,
    	    swf:'/html/Public/Common/js/lib/webuploader-0.1.5/Uploader.swf',
    	    server: '/UploadApi/upload',
    	    pick: {id:obj,multiple:true},
    	    paste:".input-txt",
    	    disableGlobalDnd:true,
    	    dnd:".send-box",
    	    resize: false,
    	    duplicate:true,
    	    compress:false,
    	    chunked: false,
    	    fileSingleSizeLimit:limit,//500M
    	});
    	window.uploader = uploader;
    	var annexBox = obj.parents('.send-box').find('.annex-box');
    	uploader.on( 'fileQueued', function( file ) {
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
    			var html = template('tpl-file',mFile);
    			annexBox.prepend(html);
    		},64,64);
    	});
    	uploader.on( 'uploadProgress', function( file, percentage ) {
    		var $fileDiv = annexBox.find("#file-ID-"+file.id);
    		var precent = Math.floor(percentage*100);
            $fileDiv.find(".meter-box p").text(precent+"%");
            $fileDiv.find(".meter span").css('width',precent+"%")
    	});
    	uploader.on( 'uploadError', function( file, reason) {
    		var $fileDiv = annexBox.find("#file-ID-"+file.id);
    		$fileDiv.find(".meter-box").html('上传失败');
    	});
    	uploader.on('uploadAccept',function(object,ret){
    		if(ret.status == 1){
                var $fileDiv = annexBox.find("#file-ID-"+object.file.id);
                $fileDiv.attr('data-id',ret.fileid);
                $fileDiv.find(".meter-box").html('');
                var viewimg = $fileDiv.find('.file-icon');
                viewimg.addClass('fileext preview').attr({
                    'data-url': ret.data.rurl,
                    'data-down': ret.data.url,
                }).find('img').attr({
                    'src':ret.data.ext,
                    'data-src':ret.data.src,
                });
                if(ret.data.isPic==1){
                    plugin.previewImg(viewimg);
                }
            }else if(ret.status == 2){
            	
            }else{
                plugin.openMsg(ret.info,1);
            }
    	});
    	uploader.on('error', function(type){
    		if(type == 'F_EXCEED_SIZE'){
    			plugin.openMsg('单文件上传超过了100MB',1);
    		}
    	});
    };
    //计算高度，是否显示查看全文
    function calH(){
        $('.announce-cont-box').each(function(){
            if($(this).find('.announce-cont .annex').length>0){
                if(($(this).find('.announce-cont .word .p').height()>90) || $(this).find('.announce-cont .annex ul').height()>120){
                    $(this).find('.announce-cont .word').css('max-height', '90px');
                    $(this).find('.announce-cont .annex').css('max-height', '120px');
                    $(this).find('.announce-cont .read-all').show();
                    // $(this).css('padding','0 20px 40px 40px')
                }else{
                    $(this).find('.announce-cont .read-all').hide();
                    // $(this).css('padding','0 20px 20px 40px')
                }
            }else{
                if($(this).find('.announce-cont .word .p').height()>180){
                    $(this).find('.announce-cont .word').css('max-height',  '180px')
                    $(this).find('.announce-cont .read-all').show();
                    // $(this).css('padding','0 20px 40px 40px')
                }else{
                    $(this).find('.announce-cont .read-all').hide();
                    // $(this).css('padding','0 20px 20px 40px')
                }
            }
        });
    };
    
    exports.announceAll=function() {
    	lists();

        //点击发布公告显示隐藏
        $('.send-an').mousedown(function(){
            $(this).addClass('active');
        }).mouseup(function(){
            $(this).removeClass('active');
        }).click(function(){
            $(this).hide();
            var data = {};
            data.newpost = 1;
            var html = template('tpl-sendbox',data);
            $('.send-an').after(html);
            $(this).next('.send-box').attr('id','send-box')
            // plugin.autoTextarea($("#send-box  .input-txt").get(0));
            // $("#send-box .txt1").focus()
            //初始化
            // var obj = $("#send-box").find('.sc-btn');
            // initUploader(obj);
            
            var d = 'editor'+(new Date()).getTime();
            $("#send-box  .input-txt").attr('id',d);
            // plugin.autoTextarea($("#send-box  .input-txt").get(0));
            // initUploader($('.sc-btn'),'');
            plugin.setUeditorSim(d,function(editor){
            	
                initUploader(editor.menuContainer.$menuContainer.find('a').eq(-2),'');
                editor.$txt.html('');
                $("#send-box .txt1").focus();
            });
        });
         $(document).on('click','.myclick',function(){
            var id = $(this).parents('.announce-cont-box').data('id');
            API.notifyApi_readNotify(id,function(data){
            plugin.openMsg('已阅读',0);
       });
        });
        $(document).on('click','#send-box .opt-btn .cancel',function(){
            $('#send-box').remove();
            $('.send-an').show();
        });
        
        //删除附件
        $(document).on('click','.send-box .annex-box .file .cancel',function(){
        	$(this).parent().remove();
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


        //查看全文点击
        $(document).on('click','.announce-box li .read-all',function(){
            $(this).parents('.announce-cont').find( '.word').css('max-height', 'none');
            $(this).parents('.announce-cont').find( '.annex').css('max-height', $(this).parents('.announce-cont').find( '.annex ul').outerHeight());
            $(this).hide();
            $(this).next('.sq-all').show()
        });

        //收起全文
        $(document).on('click','.announce-box li .sq-all',function(){
            calH();
            $(this).hide();
            $(this).prev('.read-all').show();
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

        //公告区移入变色
        $(document).on('mouseenter','.announce-box>ul>li',function(){
            $(this).find('.annex li a').addClass('hover')
        })
        $(document).on('mouseleave','.announce-box>ul>li',function(){
            $(this).find('.annex li a').removeClass('hover')
        })
        $(document).on('mouseenter','.announce-box .annex li',function(){
            $(this).find('.download').show();
        })
        $(document).on('mouseleave','.announce-box .annex li',function(){
            $(this).find('.download').hide();
        });

        //点击编辑，弹出编辑框
        $(document).on('click','.announce-box .title .edit',function(){
            var id = $(this).parents('li').attr('data-id');
            var self = this;
            API.notifyApi_getNotify(id,function(data){
                var html = template('tpl-sendbox',data.data);
                $(self).parents('li').append(html);
                $(self).parents('li').find('.announce-cont-box').hide();
                $(self).parents('li').find('.send-box .sure').addClass('active');
                var d = 'editor'+(new Date()).getTime();
                $(self).parents('li').find(".send-box  .input-txt").attr('id',d);
                $(self).parents('li').find(".send-box  .input-txt").get(0).value = data.data.content;
                plugin.setUeditorSim(d,function(editor){
                    initUploader(editor.menuContainer.$menuContainer.find('a').eq(-2),'');
                    plugin.moveEnd($(self).parents('li').find(".send-box .txt1").get(0))
                });
                plugin.previewImg($(self).parents('li').find('.fileext[data-ispic=1]'));
            })
            
        });

        //编辑确认
        $(document).on('click','.announce-box li .send-box .sure',function(){
        	var _this = this;
        	var id = $(this).parents('li').attr('data-id');
        	var title = $(this).parents('.send-box').find('.input-box .txt1').val();
            var desHtml=$(this).parents('.send-box').find('.input-box .input-cont .input-txt').val();
            if(title == ""){
                plugin.openMsg('标题不能为空',1)
                return;
            }else if(desHtml==''){
                desHtml='如题所述';
            }
            plugin.btnControl($(_this),'正在修改...',true,'active');
            //获取附件的id值列表
            var attachment="";
            $(this).parents('.send-box').find('.annex-box .file').each(function(ele){
            	attachment += $(this).attr('data-id');
            	attachment += "|";
            });
            $obj = $(this);
            API.notifyApi_updateNotify(id,title,desHtml,attachment,function(data){
            	if(data.status == 1){
                    data.data.createtime = plugin.time_format_year_month_day_hour_min(data.data.createtime);
                	var html = template('tpl-announce-cont-box',data.data);
                	$obj.parents('li').find('.announce-cont-box').remove();
                	$obj.parents('li').prepend(html);
                    $obj.parents('.send-box').remove();
                    calH();
                    plugin.openMsg('修改已经保存',0);
            	}else{
            		plugin.btnControl($(_this),'确定',false,'active');
            	}
            });
        });
        
        //编辑关闭
        $(document).on('click','.announce-box li .send-box .cancel',function(){
            $(this).parents('li').find('.announce-cont-box').show();
            $(this).parents('.send-box').remove();
        });

        //发布公告  确认
        var dbclick = true;
        $(document).on('click','#send-box .sure',function(){
        	var _this = this;
            var describe=$('#send-box .input-txt').val();
            var title = $('#send-box .txt1').val();
            if(title == ""){
                plugin.openMsg('标题不能为空',1);
                $('#send-box .txt1').focus();
                dbclick = true;
            	return;
            }else if(describe==''){
                describe='如题所述';
                dbclick = true;
            }
            var attachment="";
            $(this).parents('#send-box').find('.annex-box .file').each(function(ele){
            	attachment += $(this).attr('data-id');
            	attachment += "|";
            });
            plugin.btnControl($(_this),'正在发布...',true,'active');
            var courseid = $("#course-header").attr('data-id');
            if(dbclick == true){
            	dbclick = false;
            	API.notifyApi_addNotify(localStorage['cid'],localStorage["uid"],title,describe,function(data){
            		if(data.status == 1){
    	                var anListHtml2=template('tpl-anList',data.data);
    	                $('#viewer-container-lists').prepend(anListHtml2);
    	                calH();
    	                $('#send-box').remove();
    	                $('.send-an').show();
    	                plugin.openMsg('公告发布成功',0);
    	                hideBlank();
    	                dbclick = true;
                        lists();	
            		}else{
            			dbclick = true;
            			plugin.openMsg(data.info,1);
            			plugin.btnControl($(_this),'确定',false,'active');
            		}
	            });
            }
        });

        //置顶
        $(document).on('click','.announce-box .title .top',function(){
            var parentsli = $(this).parents('li');
            var id = parentsli.attr('data-id');
            var state = $(this).attr('data-state');
            var sort = 0;
            if(state == 0){
            	sort = 1000;
            	$(this).text("取消置顶");
            }else{
            	sort = 0;
            	$(this).text("设为置顶");
            }
        	$(this).attr('data-state',sort);
            API.notifyApi_setTop(id,sort,function(data){
            	lists();
            	plugin.openMsg('设置成功',0,5000);
            });
        });
        
        //删除公告弹窗
        $(document).on('click','.announce-box .title .del',function(){
            var parentsli = $(this).parents('li');
            var id = parentsli.attr('data-id');
            layer.confirm('', {
                type: 1,
                skin: 'layer-ext-ding00',
                title: '确定要删除该次公告？',
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
                API.notifyApi_delNotify(id,function(data){
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

        //导入 弹窗
        var drLayer;
        $(document).on('click','#send-box .dr-btn',function(){
            layer.closeAll();
            importList();
            drLayer=layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area: ['810px'],
                success: function () {
                    $('.dr-pop .cont-list').find('i').removeClass('active');
                    $('.dr-pop .sure').removeClass('active')
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
        $('.dr-pop .class-item').css('height',drPopHeight);
        $('.dr-pop .class-cont').css('height',drPopHeight-16);
        $(window).resize(function(){
            var drPopHeight=parseInt($(window).height()*0.9)-60-85;
            if(drPopHeight>435)drPopHeight=435;
            $('.dr-pop .pop-cont').css('height',drPopHeight);
            $('.dr-pop .class-item').css('height',drPopHeight);
            $('.dr-pop .class-cont').css('height',drPopHeight-16);
            layer.style(drLayer, {
                height:'auto'
            });
            $('.layui-layer-content').css('height','auto');
            scrollBar.scrollBar($('#dr-pop .class-item'),$('#dr-pop .class-item ul'));
            scrollBar.scrollBar($('#dr-pop .class-cont'),$('#dr-pop .class-cont .cont-box'));
        });
        //班级导入
        $(document).on('click','.dr-pop .dr-from .import2',function(){
            importList();
        })
        //导入通知列表移入点击效果
        $(document).on('click','.dr-pop .cont-list i.radio,.dr-pop .cont-list h3',function(){
            var i = $(this).parents('li').find('i');
            if(i.hasClass('active')){
                i.removeClass('active');
                $('.dr-pop .sure').removeClass('active')
            }else{
                $('.dr-pop .cont-list').find('i').removeClass('active');
                i.addClass('active');
                $('.dr-pop .sure').addClass('active')
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
        $('.dr-pop .cancel,.dr-pop .close').click(function(){
            layer.closeAll();
        });
        
        //导入选中的公告(选中课程)
        $(document).on('click',"#dr-pop .class-item li a",function(){
            var id = $(this).parents("li").attr('data-id');
            var self = this;
        	API.notifyApi_getNotifyList(id,function(data){
                $('#dr-pop .class-item li .active').removeClass('active');
                $(self).addClass('active');
                data.nlist&&data.nlist.map(function(item){
                    item.createtime = plugin.time_format_year_month_day_hour_min(item.createtime);
                })
				var html = template('tpl-import-notify',data);
				$("#dr-pop .class-cont ul").html(html);
				scrollBar.scrollBar($('.class-cont.fr'),$('.class-cont.fr ul'));
        	});
        });
        //确认导入
        $(document).on('click',"#dr-pop .btns .sure.active",function(){
        	var id = $("#dr-pop .class-cont .radio.active").parents("li").attr('data-id');
        	API.notifyApi_getNotify(id,function(data){
                // data.data.content=data.data.content//.replace(/<br>/g, "\n");
        		// var importData = data.data;
        		data.data.newpost = 1;
                var html = template('tpl-sendbox',data.data);
                $("#send-box").remove();
                $('.send-an').after(html);
                $('.send-an').next('.send-box').attr('id','send-box');
                // plugin.autoTextarea($("#send-box  .input-txt").get(0));
                var d = 'editor'+(new Date()).getTime();
                $("#send-box .input-txt").attr('id',d);
                $("#send-box .input-txt").get(0).value = data.data.content;
                plugin.setUeditorSim(d,function(editor){
                    initUploader(editor.menuContainer.$menuContainer.find('a').eq(-2),'');
                    plugin.moveEnd($("#send-box .txt1").get(0))
                });
                plugin.previewImg($('#send-box').find('.fileext[data-ispic=1]'));
                layer.closeAll();
				$('#send-box').find('.opt-cont .sure').addClass('active');
	            // var obj = $("#send-box").find('.sc-btn');
	            // initUploader(obj);
        	});
        });
    }
});
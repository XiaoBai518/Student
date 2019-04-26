/**
 * Created by Administrator on 2015/10/14.
 */
define(function(require,exports,module) {
    window.$ = window.jQuery = $ = require('jquery');
    var layer = require('layer');
    var plugin = require('plugin');
    var template = require('art-template');
    template = plugin.templateConfig(template);
    var API = require('API');
    var scrollBar=require('scrollBar');
    require('layuiV3');
    
    var courseid = $("#return-course").attr('data-id');
    function fnArr(a,b){
        var obj = {};
        a.forEach(function(val){
            obj[val] = true;
        });
        b.forEach(function(val){
            if(obj[val]) delete obj[val]
        });
        return Object.keys(obj);
    }
    var inviteCode=$('.m-l-box .invite-box .invite span').html();

    //获取助教
    function getTeacher(callback){
        $('.m-r-box .all-list .null-word').remove();
        $(".invite-tea").show();
        $('.all-title h3').css("width","auto");
        plugin.loading();
        API.assistantApi_getTeacherTeam(courseid,function(data){
            var html=template('tpl-teacherList',data);
            $('.all-list ul').html(html);
            $('.all-list ul').show();
            var length = data.lists?data.lists.length:0;
            var tpl = "教学团队（老师<span>"+length+"</span>）";
            $('.all-title  h3').html(tpl);
            if(callback != null){
            	callback(length);
            }
            plugin.closeLoading(); 
        });
    }
    
     exports.MymemberLists = function() {
        API.studentsApi_search(localStorage["cid"],'',function(data){
            var html=template('tpl-allStudent',data);            
            $('.all-list ul').append(html);
            $("#Usertotal").html(data.total);
        });
    }
    function getStudentLists(callback,role){
    	$('.m-r-box .all-list .null-word').remove();
    	$(".invite-tea").hide();
    	plugin.loading();
        API.studentsApi_search(courseid,'',function(datas){
            // for(var i =0 ;i<1000;i++){
            //     datas.lists[i]=datas.lists[0];
            // }
            API.CourseApi_getCourseAllowQuit(courseid,function(datass){
                var al = false;
                if(datass.data.isallowquit == 0){
                    al = true;
                }
                if(datas.lists.length==0){
                    var nullHtml=$('<p class="null-word empty-box">学生只需输入六位课程邀请码（'+inviteCode+'）即可快速加入班级。'+'<a href="javascript:;" class="fileext previewVideo" data-isvideo="1" data-url="http://assets.ketangpai.com/guide/smovie/yaoqingma.mp4">（点击 播放视频，查看使用详情）</a>');
                    $('.m-r-box .all-list').append(nullHtml)
                    $('.all-title h3 .fl span').eq(1).html(0);
                    $('.all-list ul').show();
                    $('.all-list ul').html("");
                    var tpl = "<div class='fl'>全部学生（学生<span>0</span>）</div>";
                    tpl +='<div class="allowquit fr"><div class="allowquittip">不允许退课</div><div class="allowquitswitch" id="allowquitswitch"></div></div>'
                    if(role == 1){
                        if(datas.limitnum>-1){
                            tpl += "<div class='fr limitnum help-info-tips' data-tips='设定班级最大的加课人数，超过这个数之后，其他学生无法加入该班级'><a href='javascript:;' class='kcheckbox active'>人数限制</a><input class='inputlimit' value='"+datas.limitnum+"' /><span>人</span><span>&nbsp;</span></div>";	
                        }else{
                            tpl += "<div class='fr limitnum help-info-tips' data-tips='设定班级最大的加课人数，超过这个数之后，其他学生无法加入该班级'><a href='javascript:;' class='kcheckbox'>人数限制</a><span>&nbsp;</span></div>";
                        }                
                    }
                    $('.all-title h3').css("width","100%");
                    $('.all-title h3').html(tpl);
                    plugin.setSlideswitch('allowquitswitch',al,function(s){
                        var a = 0;
                        if(s==0){
                            a = 1;
                        }
                        API.CourseApi_setCourseAllowQuit(courseid,a,function(data){
                            if(data.status == '1'){
                                plugin.openMsg('保存成功',0);
                            }
                        })
                    });
                }else{
                    for (var i = 0; i<datas.lists.length-1; i++) {
                        var self = datas.lists[i];
                        var second = datas.lists[i+1];
                        if(plugin.trimall(self.stno)==plugin.trimall(second.stno)){
                            self.isre = true;
                            second.isre = true;
                        }
                    };
                    var html=template('tpl-allStudent',datas);
                    $('.all-list ul').show();
                    $('.all-list ul').html(html);
                    loadimg()
                    var tpl = "<div class='fl'>全部学生（学生<span>"+datas.lists.length+"</span>）</div>";
                    tpl +='<div class="allowquit fr"><div class="allowquittip">不允许退课</div><div class="allowquitswitch" id="allowquitswitch"></div></div>'
                    if(role == 1){
                        if(datas.limitnum>-1){
                            tpl += "<div class='fr limitnum help-info-tips' data-tips='设定班级最大的加课人数，超过这个数之后，其他学生无法加入该班级'><a href='javascript:;' class='kcheckbox active'>人数限制</a><input class='inputlimit' value='"+datas.limitnum+"' /><span>人</span><span>&nbsp;</span></div>";	
                        }else{
                            tpl += "<div class='fr limitnum help-info-tips' data-tips='设定班级最大的加课人数，超过这个数之后，其他学生无法加入该班级'><a href='javascript:;' class='kcheckbox'>人数限制</a><span>&nbsp;</span></div>";
                        }                
                    }
                    $('.all-title h3').css("width","100%");
                    $('.all-title h3').html(tpl);
                    plugin.setSlideswitch('allowquitswitch',al,function(s){
                        var a = 0;
                        if(s==0){
                            a = 1;
                        }
                        API.CourseApi_setCourseAllowQuit(courseid,a,function(data){
                            if(data.status == '1'){
                                plugin.openMsg('保存成功',0);
                            }
                        })
                    });
                }
                if(callback != null){
                    callback(datas.lists.length);
                }
                plugin.closeLoading();
            });
        });
    }
    function introstart(){
        var introtype=12;
        var courseid=$('#return-course').attr('data-id');
        API.TourApi_isTour(courseid,introtype,function(data){
            if(data.isTour==0){
                require.async(['intro','/Public/Common/js/lib/intro/introjs.css'],function(){
                    $('.m-l-box .group-box').attr({'data-step':1,'data-intro':'鼠标点击此处，可以新加分组，将学生分组后，可以进行分组教学，如：分组作业等。','data-position':'right'});
                    $('.m-r-box .title .invite-tea').attr({'data-step':2,'data-intro':'老师可以邀请助教/老师来协同管理班级','data-position':'top'});
                    $('.m-r-box ul li').eq(1).attr({'data-step':3,'data-intro':'鼠标移入此行，点击此图标可以对此成员进行管理，如：重命名、私信等','data-position':'top'});
                    var intros=introJs().setOptions({'prevLabel':'〈 上一步','nextLabel':'下一步 〉','skipLabel':'跳过','doneLabel':'完成'}).start();
                    intros.oncomplete(function() {
                        API.TourApi_setTourFinish(introtype,function(){});
                    });
                });
            }
        });
    }

    //获取全部成员
    function getAllStu(){
        API.studentsApi_search(courseid,'',function(data){
            var html=template('tpl-allStudent',data);
            $('.all-list ul .teacher:last').after(html);
            $('.all-title h3 .fl span').eq(1).html(data.lists.length);
        });
    };
    
    //导入学生到某个班级里面去
    exports.importStudentToCourse = function(){
        function setDrPopItemContH(){
            var drPopHeight=parseInt($(window).height()*0.9)-60-85;
            if(drPopHeight>435)drPopHeight=435;
            $('.dr-pop .class-item').css('height',drPopHeight);
            $('.dr-pop .class-cont').css('height',drPopHeight);
            $('.dr-pop .class-cont .content').css('height',drPopHeight-40);
        }
        //列出所有可以导入的班级列表
        function importList(){
            $("#dr-pop .class-cont").html('');
            var tocourseid = $("#return-course").attr('data-id');
            API.courseApi_getImportList(function(data){
                var result = $.grep(data.lists,function(n,i){
                    return n.id !== tocourseid;
                });
                data.lists = result;
                var html1 = template('tpl-import-part',data);
                $(".pop-cont").html(html1);
                setDrPopItemContH();
                var html = template('tpl-import-course',data);
                $("#viewer-container-courselists").html(html);
                scrollBar.scrollBar($('.class-item.fl'),$('.class-item.fl ul'));
                $('.dr-pop .class-item.fl li a').eq(0).click();
            });
        };
        //导入 弹窗
        var drLayer;
        $(document).on('click','.drmember-btn',function(){
            layer.closeAll();
            importList();
            drLayer=layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area: ['810px'],
                success: function () {
                    $('.dr-pop .cont-list').find('i').removeClass('active');
                    $('.dr-pop .sure').removeClass('active').text('导入');
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
        $('.dr-pop .class-cont').css('height',drPopHeight);
        $('.dr-pop .class-cont .content').css('height',drPopHeight-40);
        $(window).resize(function(){
            var drPopHeight=parseInt($(window).height()*0.9)-60-85;
            if(drPopHeight>435)drPopHeight=435;
            $('.dr-pop .pop-cont').css('height',drPopHeight);
            $('.dr-pop .class-item').css('height',drPopHeight);
            $('.dr-pop .class-cont').css('height',drPopHeight);
            $('.dr-pop .class-cont .content').css('height',drPopHeight-40);
            layer.style(drLayer, {
                height:'auto'
            });
            $('.layui-layer-content').css('height','auto');
            scrollBar.scrollBar($('#dr-pop .class-item'),$('#dr-pop .class-item ul'));
            scrollBar.scrollBar($('#dr-pop .class-cont .content'),$('#dr-pop .class-cont .content ul'));
        });
        //班级导入
        $(document).on('click','.dr-pop .dr-from .import2',function(){
            importList();
        })
        //导入通知列表移入点击效果
        $(document).on('click','.dr-pop .title i.checkbox',function(){
            if($(this).hasClass('active')){
                $('#dr-pop .class-cont .content li i.checkbox').removeClass('active');
            }else{
                $('#dr-pop .class-cont .content li i.checkbox').addClass('active');
            }
            setCurActive();
        });
        $(document).on('click','.dr-pop .cont-list .select',function(){
            if($(this).parents('li').hasClass('disabled')){
                plugin.openMsg('该学生已在本班级',1);
                return;
            }
            var i = $(this).parents('li').find('i.checkbox');
            i.toggleClass('active');
            setCurActive();
        });
        function setCurActive(){
            var titlei = $('#dr-pop .class-cont .title i.checkbox'),
                checki = $('#dr-pop .class-cont .content li i.checkbox'),
                activei = $('#dr-pop .class-cont .content li i.checkbox.active');
            if(activei.size()===0){
                $('.dr-pop .sure').removeClass('active').text('导入');
                titlei.removeClass('active');
            }else if(activei.size()>=0&&activei.size()<checki.size()){
                $('.dr-pop .sure').addClass('active').text('导入（'+activei.size()+'）');
                titlei.removeClass('active');
            }else{
                $('.dr-pop .sure').addClass('active').text('导入（'+activei.size()+'）');
                titlei.addClass('active');
            }
            titlei.nextAll('span').text(activei.size());
        }
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
        
        //导入选中的成员(选中课程)
        $(document).on('click',"#dr-pop .class-item li a",function(){
            var id = $(this).parents("li").attr('data-id');
            var tocourseid = $("#return-course").attr('data-id');
            var self = this;
            API.courseApi_getStudentList(id,tocourseid,function(data){
                $('#dr-pop .class-item li .active').removeClass('active');
                $(self).addClass('active');
                data.incoursecount = 0;
                for (var i = 0; i<data.lists.length-1; i++) {
                    var that = data.lists[i];
                    var second = data.lists[i+1];
                    if(plugin.trimall(that.stno)==plugin.trimall(second.stno)){
                        that.isre = true;
                        second.isre = true;
                    }
                    if(that.incourse===0){
                        data.incoursecount += 1;
                    }
                };
                if(data.lists&&data.lists.length===1&&data.lists[0].incourse===0){
                    data.incoursecount += 1;
                }
                var html = template('tpl-import-member',data);
                $("#dr-pop .class-cont").html(html);
                $('.dr-pop .class-cont .content').css('height',$('#dr-pop .class-item').height()-40);
                scrollBar.scrollBar($('.class-cont.fr .content'),$('.class-cont.fr .content ul'));
            });
        });
        //确认导入
        $(document).on('click',"#dr-pop .btns .sure.active",function(){
            var studentidlist="";
            $("#dr-pop .class-cont.fr .content ul li").each(function(ele){
                if($(this).find('i').hasClass('active')){
                    studentidlist +=$(this).attr('data-id');
                    studentidlist +="|"; 
                }
            });
            var courseid = $("#return-course").attr('data-id');
            var fromcourseid = $("#dr-pop .class-item .active").parents('li').attr('data-id');
            API.courseApi_importStudents(fromcourseid,courseid,studentidlist,function(data){
                layer.closeAll();
                if(data.status===1){
                    plugin.openMsg('导入成功',0);
                    $(".my-group .all").click();
                }else{
                    plugin.openMsg(data.info,1);
                }
            });
        });
    };
    exports.memberAll=function(){
        MymemberLists();
        /**/
        $(document).on('click','.member-title .member-change .tit',function(e){
            e.stopPropagation();
            if($('.change-box').is(':visible')){
                $('.change-box').hide();
            }else{
                API.studentsApi_studentsChange(courseid,1,function(data){
                    var html=template('tpl-change',data);
                    $('.change-box .ul-cont ul').html(html);
                    $('.change-box').show();
                    scrollBar.scrollBar($('.change-box .ul-cont'),$('.change-box .ul-cont ul'));
                });
            }
        });
        $(document).on('click','.member-title .member-change',function(){
            return false;
        });
        $(document).on('click',function(){
            $('.member-change .change-box').hide();
        });

        /*plugin.loading();*/
        //获取分组
        function getGroup(){
            API.GroupApi_listGroups(courseid,function(data){
                var html=template('tpl-groupList',data);
                $('.my-group ul').html(html);
                if(data.data.length==0){
                    $('.noGroup').removeClass('hide');
                    //$('.my-group').addClass('hide');
                    $('.allow-tips').addClass('hide')
                }else{
                    $('.haveGroup').removeClass('hide');
                    $('.my-group').removeClass('hide');
                    if($('.closeGroup').hasClass('active')){
                        $('.allow-tips').removeClass('hide')
                    }
                }
                
            });
        }
        /*getGroup();
        introstart();
        getTeacher()*/;
        $(document).on('click','.invite .opt',function(){
            $('.opt-item').hide();
            $('.my-group li .opt').removeClass('active');
            $(this).next('.invite-opt').show();
            $(this).addClass('active');
            return false;
        });
        $(document).on('click',function(){
            $('.invite .opt').next('.invite-opt').hide();
            $('.opt').removeClass('active');
            $('.opt-item').hide();
            $('.groupName').show();
            $('.my-group li .opt').removeClass('active');
        });
        $('.group-box .noGroup').hover(function(){
            $(this).html('添加分组');
            $(this).addClass('active');
        },function(){
            $(this).html('暂无成员分组');
            $(this).removeClass('active');
        });


        //添加分组
        $(document).on('click','.group-box .noGroup,.haveGroup .addGroup',function(){
            layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area: ['450px', '202px'],
                content: $('#new-group'),
                success:function(){
                    $('#new-group input').val('').focus();
                    $('#new-group .sure').removeClass('active');
                },
                shift: 7,
                moveType: 1
            });
        });
        //取消添加
        $(document).on('click','.pop-new-2 .cancel,.little-pop .cancel',function(){
            layer.closeAll();
            $('.my-group li').removeAttr('rel');
            $('.m-r-box ul li').removeAttr('rel');
        });
        //检测文字
        $(document).on('keyup','.pop-new-2 input',function(){
            var oV=$(this).val();
            if(oV==''){
                $(this).parents('.pop-new-2').find('.pop-btns .sure').removeClass('active');
            }else{
                $(this).parents('.pop-new-2').find('.pop-btns .sure').addClass('active');
            }
        });
        //确定添加
        var bAdd=true;
        $(document).on('click','#new-group .sure',function(){
            var groupname=$('#new-group input').val();
            if(groupname==''){
                plugin.openMsg('小组名称不能为空',1);
                return;
            }
            if(bAdd){
                bAdd=false
                API.GroupApi_addGroup(courseid,groupname,function(data){
                    $('.noGroup').addClass('hide');
                    $('.haveGroup').removeClass('hide');
                    $('.my-group').removeClass('hide');
                    var html=template('tpl-oneGroup',data.data);
                    $('.my-group li.all').after(html);
                    if($('.closeGroup').hasClass('active')){
                        $('.allow-tips').removeClass('hide')
                    }
                    layer.closeAll();
                    bAdd=true;
                })
            }
        });
        //重命名分组
        $(document).on('click','.my-group li .cmm-btn',function(){
            var oV=$(this).parents('li').find('span').html();
            $(this).parents('li').attr('rel',1);
            layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area: ['400px', '202px'],
                content: $('#edit-group'),
                success:function(){
                    $('#edit-group input').val(oV).focus();
                },
                shift: 7,
                moveType: 1
            });
        });
        //重命名确定
        $(document).on('click','#edit-group .sure',function(){
            var groupid=$('.my-group li[rel=1]').attr('data-id');
            var groupname=$('#edit-group input').val();
            API.GroupApi_updateGroup(groupid,groupname,function(data){
                plugin.openMsg('已修改',0);
                layer.closeAll();
                $('.my-group li[rel=1]').find('span').html(groupname).attr('title',groupname);
                $('.my-group li').removeAttr('rel');
            })
        });

        //删除分组
        $(document).on('click','.my-group li .del-btn',function(){
            $(this).parents('li').attr('rel','1');
            var oV=$(this).parents('li').find('span').html();
            layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area: ['400px', '196px'],
                content: $('#del-group'),
                success:function(){
                    $('#del-group .title span').html(oV);
                },
                shift: 7,
                moveType: 1
            });
        });
        //确认删除
        $(document).on('click','#del-group .sure',function(){
            var groupid=$('.my-group li[rel=1]').attr('data-id')
            API.GroupApi_delGroup(groupid,function(){
                layer.closeAll();
                plugin.openMsg('已删除',0)
                $('.my-group li').eq(0).click();
                $('.my-group li[rel=1]').remove();
                if($('.my-group li').length==1){
                    $('.noGroup').removeClass('hide');
                    $('.haveGroup').addClass('hide');
                    $('.my-group').addClass('hide');
                    $('.allow-tips').addClass('hide')
                }
            });
        });

        //开启限定人数
        $(document).on("click",".limitnum .kcheckbox",function(){
        	if($(this).hasClass('active')){
        		$(this).removeClass('active');
        		if($(this).next().hasClass("inputlimit")){
        			$(this).next().remove();
        			$(this).next().remove();
        		}
        		//取消限制人数限定
        		API.courseApi_setLimitNum(courseid,-1,function(tData){
        			plugin.openMsg('人数限制已经取消',0);
        		});
        	}else{
        		$(this).addClass('active');
        		if($(this).next().hasClass("inputlimit")){
        		}else{
        			var inputHtml = "<input class='inputlimit' value='' /><span>人</span>";
        			$(this).after(inputHtml);
        		}
        	}
        });
        //输入限制人数的
        $(document).on("blur",".limitnum .inputlimit",function(){
        	var val = $(this).val();
        	if(val == ''){
        		return false;
        	}
        	var limitNum = parseInt(val);
        	if(limitNum < 0){
        		plugin.openMsg("人数限制不能小于0",1);
        		$(this).focus();
        	}else{
        		//进行保存
        		API.courseApi_setLimitNum(courseid,limitNum,function(tData){
        			plugin.openMsg('人数限制设置成功',0);
        		});
        	}
        });
        //关闭分组
        $(document).on('click','.haveGroup .closeGroup',function(){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                API.GroupApi_setJoinGroup(courseid,0,function(data){
                    plugin.openMsg('已停止自主选组',1);
                    $('.allow-tips').addClass('hide');
                });
            }else{
                $(this).addClass('active');
                API.GroupApi_setJoinGroup(courseid,1,function(data){
                    plugin.openMsg('已允许选组',0);
                    $('.allow-tips').removeClass('hide');
                });
            }
        });

        var closetime=null;
        $(document).on('mouseenter','.haveGroup .closeGroup',function(){
            clearTimeout(closetime);
            $('.haveGroup .tips').fadeIn(100);
        }).on('mouseleave','.haveGroup .closeGroup',function(){
            closetime=setTimeout(function(){
                $('.haveGroup .tips').fadeOut(100);
            },300)
        });
        //操作分组
        $(document).on('click','.my-group li .opt,.m-r-box ul .opt,.member-search ul .opt',function(){
            $('.invite .opt').next('.invite-opt').hide();
            $('.opt').removeClass('active');
            $('.opt-item').hide();
            $(this).find('.opt-item').show();
            $(this).addClass('active');
            $(this).next('.groupName').hide();
            return false;
        });
        $(document).on('click','.my-group li .opt a,.m-r-box li .opt a',function(){
            $(this).parents('.opt').removeClass('active');
            $(this).parents('.opt-item').hide();
            $('.groupName').show();
            return false;
        });

        //添加助教/老师
        $(document).on('click','.all-list .invite-tea',function(){
            var opt = new Object();
            opt.title='添加老师/助教';
            opt.width='500px';
            opt.info='<div>老师账号列表：账号列表复制到这里（账号之间要 换行 进行分开）</div><textarea id="addMemberArea" style="width:calc(100% - 22px);border:1px solid #ccc;height:100px;padding:10px;"></textarea>';
            opt.sureCallback=function(){
                var classid = $('#return-course').data('id');
                // classid = classid.replace("/","");
                // classid = classid.replace(".html","");
                var stuidli = $("#addMemberArea").val();
                var sidarr = stuidli.split("\n");
                // console.log(sidarr);
                var scount=0;
                var ecount=0;
                var done=0;
                for(var j=0;j<sidarr.length;j++){
                    if(sidarr[j]!='' && sidarr[j]!=null){
                        API.assistantApi_addAssistant(courseid,sidarr[j],function(data){
                            if(data.status == 1){
                                scount++;
                            }else{
                                console.warn(data.info);
                                plugin.openMsg(''+data.info,1);
                                ecount++;
                            }
                            done++;
                            if(done==sidarr.length){
                                $(".my-group .teacherTeam").click();
                                if(ecount==0){
                                    plugin.openMsg('已成功添加'+scount+'位老师',0);
                                }
                            }
                        });
                    }else{
                        done++;
                        if(done==sidarr.length){
                            $(".my-group .teacherTeam").click();
                            if(ecount==0){
                                plugin.openMsg('已成功添加'+scount+'位老师',0);
                            }
                        }
                    }
                }
            };
            plugin.cursorconfirm(opt);
            // var addlayer = layer.open({
            //     type:1,
            //     skin:'layer-ext-ding00',
            //     title:'添加助教/老师',
            //     closeBtn: 0,
            //     area:['400px'],
            //     content:'<div class="pop-new-2 new-class-pop">\
            //                 <div class="input-box">\
            //                     <input type="text" placeholder="账号/邮箱/手机">\
            //                 </div>\
            //             </div>',
            //     success:function(layero){
            //         this.layero = layero;
            //         var sure = layero.find('.layui-layer-btn0'),
            //             cancel = layero.find('.layui-layer-btn1'),
            //             input = layero.find('input');
            //         input.focus();
            //         input.on('keyup',function(){
            //             var value = $(this).val();
            //             if(value){
            //                 sure.addClass('active');
            //             }else{
            //                 sure.removeClass('active');
            //             }
            //         });
            //     },
            //     btn: ['确定', '取消'],
            //     yes:function(index){
            //         var self = this.layero.find('.layui-layer-btn0'),
            //             input = this.layero.find('input');
            //         if(self.hasClass('disabled'))return;
            //         if(input.val()){
            //             $(this).addClass('disabled');
            //             API.assistantApi_addAssistant(courseid,input.val(),function(data){
            //                 if(data.status===1){
            //                     $(".my-group .teacherTeam").click();
            //                     plugin.openMsg('添加成功',0,5000);
            //                 }else{
            //                     self.removeClass('disabled');
            //                     plugin.alerttips({info:data.info,sure:'知道了'});
            //                 }
            //             })
            //             layer.closeAll();
            //         }else{
            //             plugin.openMsg('账号/邮箱/手机 不能为空',1);
            //             this.layero.find('.input-box input').focus();
            //         }
            //     },
            //     canel:function(index){
            //         layer.close(index);
            //     },
            //     shift:7,
            //     moveType: 1
            // })
        });

        //编辑名片
        $(document).on('click','.opt .edit-card',function(){
            var parentsli = $(this).parents('li');
            var username = parentsli.find('.name').text(),
                stuno = parentsli.find('.stuno').text(),
                id = parentsli.attr('data-id');
            var addlayer = layer.open({
                type:1,
                skin:'layer-ext-ding00',
                title:'编辑班级名片',
                closeBtn: 0,
                area:['400px'],
                content:'<div class="pop-new-2 new-class-pop">\
                            <div class="input-box">\
                                <span>姓名：</span>\
                                <input type="text" name="name" placeholder="请输入姓名">\
                            </div>\
                            <div class="input-box">\
                                <span>学号：</span>\
                                <input type="text" name="stno" placeholder="请输入学号">\
                            </div>\
                        </div>',
                success:function(layero){
                    this.layero = layero;
                    var sure = layero.find('.layui-layer-btn0'),
                        cancel = layero.find('.layui-layer-btn1'),
                        name = layero.find('input[name=name]'),
                        stno = layero.find('input[name=stno]'),
                        input = layero.find('input');
                    stno.val(stuno);
                    name.val(username).focus();
                    if(name.val()&&stno.val()){
                        sure.addClass('active');
                    }
                    input.on('keyup',function(){
                        if(name.val()&&stno.val()){
                            sure.addClass('active');
                        }else{
                            sure.removeClass('active');
                        }
                    });
                },
                btn: ['确定', '取消'],
                yes:function(index){
                    var self = this.layero.find('.layui-layer-btn0'),
                        name = this.layero.find('input[name=name]'),
                        stno = this.layero.find('input[name=stno]'),
                        input = this.layero.find('input');
                    if(self.hasClass('disabled'))return;
                    if(!name.val()){
                        plugin.openMsg('姓名不能为空',1);
                    }else if(!stno.val()){
                        plugin.openMsg('学号不能为空',1);
                    }else{
                        API.userApi_modifyNikeName(courseid,id,name.val(),stno.val(),function(data){
                            if(data.status===1){
                                plugin.openMsg('编辑成功',0);
                                parentsli.find('.name').text(name.val());
                                parentsli.find('.stuno').text(stno.val());
                            }else{
                                plugin.openMsg(data.info,1);
                                self.removeClass('disabled');
                            }
                        });
                        layer.close(index);
                    }
                },
                canel:function(index){
                    layer.close(index);
                },
                shift:7,
                moveType: 1
            })
        });
        //删除成员 、助教、老师
        function setDeledList(){
            $('.my-group .all i').html($('.my-group .all i').html()-1);
            if($('.all-list ul li').length==1){
                var nullHtml=$('<p class="null-word empty-box">学生只需输入六位课程邀请码（'+inviteCode+'）即可快速加入班级。'
                    +'（点击<a href="javascript:;" class="fileext preview" data-isvideo="1" data-url="http://assets.ketangpai.com/guide/smovie/yaoqingma.mp4">播放视频</a>，查看使用详情）'
                    +'<br>邀请"老师/助教”，在这里共同管理本班级的学生。'
                    +'（点击<a href="javascript:;" class="fileext preview" data-isvideo="1" data-url="http://assets.ketangpai.com/guide/smovie/chengyuan.mp4">播放视频</a>，查看使用详情）'
                    +'</p>');
                $('.m-r-box .all-list').append(nullHtml);
                $('.all-list ul').hide()
            }
        }
        $(document).on('click','.all-list li .del-member,.member-search li .del-member,.all-list .teacher .del,.all-list .teacher .dels',function(){
            var parentsli = $(this).parents('li');
            var name=parentsli.find('.name').text()||parentsli.find('.teaName span').text(),
                id = parentsli.attr('data-id')||parentsli.attr('data-assistantid');
            layer.confirm('<p class="confirmtext">该学生将无法参与该班级<br />学生可通过邀请码重新加入该班级</p>', {
                type: 1,
                skin: 'layer-ext-ding00',
                title: '确定要删除“<span style="color:#4d90fe">'+name+'</span>”吗？',
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
                if(parentsli.hasClass('teacher')){
                    API.assistantApi_delAssistant(id,function(data){
                        if(data.status===1){
                            plugin.openMsg('删除成功',0);
                            $(".my-group .teacherTeam").click();
                        }else{
                            plugin.openMsg(data.info,1);
                            self.removeClass('disabled');
                        }
                    })
                }else{
                    API.studentsApi_delStudents(courseid,id,function(data){
                        if(data.status===1){
                            parentsli.remove();
                            plugin.openMsg('删除成功',0);
                            $('.all-title h3 .fl span').eq(1).html($('.all-title h3 .fl span').eq(1).html()-1);
                            setDeledList();
                        }else{
                            plugin.openMsg(data.info,1);
                            self.removeClass('disabled');
                        }
                    });
                }
                layer.close(index);
            }, function(index) {
                layer.close(index);
            });
        });
        //统计
        $(document).on('click','li .total-btn',function(){
            var studentid = $(this).parents('li').attr('data-id');
            require.async('./summary',function(summary){
                summary.show(courseid,studentid);
            });

        });

        //邀请码
        $(document).on('click','.invite-box .stop',function(){
            var $obj = $(this);
            API.courseApi_stopCourseCode(courseid,function(data){
                $obj.addClass('hide2');
                $('.invite-box .reset').addClass('hide2');
                $('.invite-box .start').removeClass('hide2');
                plugin.openMsg('邀请码已停用',1);
                $('.invite-box .invite span').attr('data-abc',$('.invite-box .opt-a span').html())
                $('.invite-box .invite span').html('停用');
            });
        });
        $(document).on('click','.invite-box .start',function(){
            var $obj = $(this);
            API.courseApi_startCourseCode(courseid,function(data){
                $obj.addClass('hide2');
                $('.invite-box .stop').removeClass('hide2');
                $('.invite-box .reset').removeClass('hide2');
                plugin.openMsg('邀请码已启用',0);
                $('.invite-box .invite span').html($('.invite-box .invite span').attr('data-abc'));
            });
        });
        $(document).on('click','.invite-box .reset',function(){
            layer.confirm('<p class="confirmtext">重置后原来的6位邀请码将失效</p>', {
                type: 1,
                skin: 'layer-ext-ding00',
                title: '要重置邀请码吗？',
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
                API.courseApi_resetCourseCode(courseid,function(data){
                    if(data.status===1){
                        $('.invite-box .stop').removeClass('hide');
                        $('.invite-box .invite span').html(data.courseCode);
                        plugin.openMsg('邀请码已重置',0);
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
        
        //获取小组成员
        function getGroupList(groupid){ 
        	plugin.loading();
            API.GroupApi_getGroupStudents(groupid,function(data){
                $('.all-list .null-word').remove();
                if(data.data.length==0){
                    var nullHtml=$('<p class="null-word">暂无学生加入该小组<br>老师可以手动加入学生，或开启『允许选组』按钮，方便学生自主选组。</p>');
                    $('.all-list').append(nullHtml);
                    $('.all-list ul').html('');
                }else{
                    var html=template('tpl-groupStudent',data);
                    $('.all-list ul').html(html);
                    loadimg()
                    for(var i=0; i<data.data.length; i++){
                        if(data.data[i].type==1){
                            $('.setLeader').addClass('hide2')
                        }
                    }
                    $('.group-title h3 span').html('（'+$('.all-list ul li').length+'）');
                    $('.my-group li.active b').html('（'+$('.all-list ul li').length+'）');
                }
                plugin.closeLoading();
            });
        }
        //切换小组
        $(document).on('click','.m-l-box .my-group ul li:not(.all,.teacherTeam)',function(){
            console.log(1);
            $(this).addClass('active').siblings().removeClass('active');
            $('.m-r-box .all-title').addClass('hide');
            $('.m-r-box .group-title').removeClass('hide');
            $('.m-r-box .group-title').attr('data-id',$(this).attr('data-id'));
            $('.m-r-box .group-title h3').html($(this).find('span').html()+'<span>'+$(this).find('b').html()+'</span>');
            var groupid=$(this).attr('data-id');
            getGroupList(groupid);
        });
        //获取所有学生
        $(document).on('click','.m-l-box .my-group ul li.all',function(){
            $('.my-group ul li').removeClass('active');
            $(this).addClass('active');
            $('.all-list .null-word').remove();
            $('.m-r-box .group-title ').addClass('hide');
            $('.m-r-box .all-title').removeClass('hide');
            var obj = $(this);
            getStudentLists(function(length){
            	obj.find('i').html(length);
            },1);
        });
        //获取老师教学团队
        $(document).on('click','.m-l-box .my-group ul li.teacherTeam',function(){
            $('.my-group ul li').removeClass('active');
            $(this).addClass('active');
            $('.all-list .null-word').remove();
            $('.m-r-box .group-title ').addClass('hide');
            $('.m-r-box .all-title').removeClass('hide');
            var obj = $(this);
            getTeacher(function(length){
            	obj.find('i').html(length);
            });
        });
        //小组编辑成员
        $(document).on('click','.edit-member',function(){
            $('.bg').show();
            $('.lxr-box .res-list').html('');
            $('.lxr-box .end-list').html('');
            $('.lxr-box input').val('');
            var groupid=$('.group-title').attr('data-id');
            API.GroupApi_getStudents(groupid,'', function (data) {
                var html=template('tpl-lxr',data);
                $('.lxr-box .res-list').html(html);
                scrollBar.scrollBar($('.choose-div'),$('.choose-div .search-result'))
            });
            $('.lxr-box').show();
        });

        $(document).on('keyup','.lxr-box input',function(){
            var oV=$(this).val();
            var groupid=$('.group-title').attr('data-id');
            API.GroupApi_getStudents(groupid,oV, function (data) {
                if(data.data.length==0){
                    $('.lxr-box .no-search').remove();
                    var nullHtml=$('<p class="no-search">未搜索到结果</p>');
                    $('.lxr-box .search-result').append(nullHtml);
                }else{
                    $('.lxr-box .no-search').remove();
                }
                var html = template('tpl-lxr', data);
                $('.lxr-box .res-list').html(html);
                for(var i=0; i<$('.end-list p').length; i++){
                    $('.lxr-box .res-list p[data-id='+$('.end-list p').eq(i).attr('data-id')+']').find('i').addClass('checked');
                }
                scrollBar.scrollBar($('.choose-div'), $('.choose-div .search-result'));
            });
        });

        //取消编辑
        $(document).on('click','.lxr-box .title .cancel,.lxr-box .close',function(){
            $('.bg').hide();
            $('.lxr-box').hide();
            $('.end-box .title h2 span').html(0);
        });
        $(document).on('click','.res-list p',function(){
            var id=$(this).data('id');
            var name=$(this).find('span').html();
            if($(this).find('i').hasClass('checked')){
                $(this).find('i').removeClass('checked');
                $('.end-list dl[data-id=id]').remove();
                $('.end-list p[data-id='+$(this).attr('data-id')+']').remove();
                scrollBar.scrollBar($('.end-box .end-div'),$('.end-box .end-list'));
                $('.end-box .title h2 span').html($('.end-box .title h2 span').html()-1);
            }else{
                $(this).find('i').addClass('checked');
                addPeople(id,name);
                $('.end-box .title h2 span').html($('.end-box .title h2 span').html()-0+1);
            }
            scrollBar.scrollBar($('.end-box .end-div'),$('.end-box .end-list'));
        });
        $(document).on('click','.end-list p .cancel',function(){
            $(this).parents('p').remove();
            $('.res-list p[data-id='+$(this).parents('p').attr('data-id')+']').find('i').removeClass('checked');
            scrollBar.scrollBar($('.end-box .end-div'),$('.end-box .end-list'));
            $('.end-box .title h2 span').html($('.end-box .title h2 span').html()-1);
        });
        function addPeople(id,name){
            var data={
                id:id,
                name:name
            };
            var html=template('tpl-lxrone',data);
            $('.end-box .end-list').append(html);
            scrollBar.scrollBar($('.end-box .end-div'),$('.end-box .end-list'))
        }
        //确认添加
        $(document).on('click','.lxr-box .sure',function(){
            var groupid=$('.group-title').attr('data-id');
            var arr=[];
            var addstudentids;
            $('.end-list p').each(function(){
                arr.push($(this).attr('data-id'));
            });
            addstudentids=arr.join('|')
            if(addstudentids==''){
                $('.bg').hide();
                $('.lxr-box').hide();
            }else{
                API.GroupApi_joinGroupByTeacher(groupid,addstudentids,function(data){
                    $('.null-word').remove();
                    $('.bg').hide();
                    $('.lxr-box').hide();
                    getGroupList(groupid);
                    addstudentids='';
                    $('.end-box .title h2 span').html(0);
                });
            }
        });

        //将成员移除本组
        $(document).on('click','.all-list li .remove-btn',function(){
            $(this).parents('li').attr('rel','1');
            var oV=$(this).parents('li').find('.name').html();
            layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area: ['400px', '196px'],
                content: $('#remove-student'),
                success:function(){
                    $('#remove-student .title span').html(oV);
                },
                shift: 7,
                moveType: 1
            });
        });
        //确定移出本组
        $(document).on('click','#remove-student .sure',function(){
            var groupid=$('.group-title').attr('data-id');
            var delstudentids=$('li[rel=1]').attr('data-id')
            API.GroupApi_removeStudent(groupid,delstudentids,function(data){
                $('li[rel=1]').remove();
                layer.closeAll();
                $('.group-title h3 span').html('（'+$('.all-list ul li').length+'）');
                $('.my-group li.active b').html('（'+$('.all-list ul li').length+'）');
                if($('.all-list ul li').length==0){
                    var nullHtml=$('<p class="null-word">暂无学生加入该小组<br>老师可以手动加入学生，或开启『允许选组』按钮，方便学生自主选组。</p>');
                    $('.all-list').append(nullHtml);
                    $('.all-list ul').html('');
                }
            });
        });

        //设置组长
        $(document).on('click','.setLeader',function(){
            var groupid=$('.group-title').attr('data-id');
            var studentid=$(this).parents('li').attr('data-id');
            var _this=this;
            API.GroupApi_setGroupLeader(groupid,studentid,function(){
                plugin.openMsg('已设为组长',0);
                $(_this).parents('.leader').next('.isLeader').removeClass('hide2')
                $('.setLeader').addClass('hide2');
                $(_this).next('.delLeader').removeClass('hide2')
            })
        });
        //取消组长
        $(document).on('click','.delLeader',function(){
            var groupid=$('.group-title').attr('data-id');
            var studentid=$(this).parents('li').attr('data-id');
            var _this=this;
            API.GroupApi_cancelGroupLeader(groupid,studentid,function(){
                plugin.openMsg('已取消组长',0);
                $(_this).parents('.leader').next('.isLeader').addClass('hide2')
                $('.setLeader').removeClass('hide2');
                $(_this).addClass('hide2')
            })
        });
        //私信
        $(document).on('click','.calls',function(){
            var uid = $(this).parents('li').attr('data-uid'),
                username = $(this).parents('li').find('.teaName span').text(),
                courseid = $("#return-course").attr('data-id')
                coursename = $('#return-course span').text();
            require.async(['./chatDialog.js'],function(c){
                c.chatDialog(uid,username,courseid,coursename);
            })
        });
        $(document).on('click','.call-btn',function(){
            var studentIds = $(this).parents('li').attr('data-id'),
                username = $(this).parents('li').find('.name').text(),
                courseid = $("#return-course").attr('data-id')
                coursename = $('#return-course span').text();
            require.async(['./chatDialog.js'],function(c){
                c.chatDialog(studentIds,username,courseid,coursename);
            })
        });
        //搜索
        $(document).on('keyup','.member-title .input-box input',function(ev){
            var oV=$(this).val();
            if(oV==''){
                $('.member-search').addClass('hide');
                $('.member-cont').removeClass('hide');
                getTeacher();
                getGroup();
                $('.group-title').addClass('hide');
                $('.all-title').removeClass('hide');
            }else{
                if(ev.keyCode==13){
                    $('.member-search .search-title h3 span').html(oV)
                    $('.member-cont').addClass('hide');
                    $('.member-search').removeClass('hide');
                    API.studentsApi_search(courseid,oV,function(data){
                        if(data.lists.length==0){
                            $('.member-search ul').html('')
                            $('.member-search .no-search').remove();
                            var nullHtml=$('<p class="no-search">未搜索到结果</p>');
                            $('.member-search .search-title').after(nullHtml);
                        }else{
                            $('.member-search .no-search').remove();
                            var html=template('tpl-allStudent',data);
                            $('.member-search ul').html(html);
                            for(var i=0; i<$('.member-search ul p').length; i++){
                                $('.member-search ul p').eq(i).html(exports.keywords($('.member-search ul p').eq(i).html(),oV));
                            }
                        }
                    })
                }
            }
        });
        $(document).on('click','.member-title .input-box i',function(ev){
            var oV=$(this).prev().val();
            if(oV==''){
                return;
            }else{
                $('.member-search .search-title h3 span').html(oV)
                $('.member-cont').addClass('hide');
                $('.member-search').removeClass('hide');
                API.studentsApi_search(courseid,oV,function(data){
                    if(data.lists.length==0){
                        $('.member-search ul').html('')
                        $('.member-search .no-search').remove();
                        var nullHtml=$('<p class="no-search">未搜索到结果</p>');
                        $('.member-search .search-title').after(nullHtml);
                    }else{
                        $('.member-search .no-search').remove();
                        var html=template('tpl-allStudent',data);
                        $('.member-search ul').html(html);
                        for(var i=0; i<$('.member-search ul p').length; i++){
                            $('.member-search ul p').eq(i).html(exports.keywords($('.member-search ul p').eq(i).html(),oV));
                        }
                    }
                })
            }
        });
    };
    $(document).on('click','.allow-tips .close',function(){
        $('.allow-tips').addClass('hide');
    });
    exports.keywords = function(sC,txt){
        var sCont=sC;
        var reg=new RegExp(txt,'gi');
        sCont=sCont.replace(reg,'<span style="background: #fff3a0">'+txt+'</span>');
        return sCont;
    };
    exports.stuAll=function(){
        API.courseApi_getCourse(courseid,function(data){
            if(data.data.joingroup==0){
                $('.join-group').remove();
                $('.exit-group').remove();
            }
        });
        //加入该分组
        $(document).on('click','.join-group',function(){
            layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area: ['400px', '196px'],
                content: $('#join-group'),
                shift: 7,
                moveType: 1
            });
        });
        $(document).on('click','.exit-group',function(){
            layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area: ['400px', '196px'],
                content: $('#exit-group'),
                shift: 7,
                moveType: 1
            });
        });
        $(document).on('click','.little-pop .cancel',function(){
            layer.closeAll();
        });
        //获取分组信息
        function getGroup(){
            API.GroupApi_listGroups(courseid,function(data){
                var arrG1=[];
                var arrG2=[];
                data.data.map(function(item){
                    if(item.me==1){
                        arrG1.push(item);
                    }else{
                        arrG2.push(item);
                    }
                });
                Array.prototype.push.apply(arrG1,arrG2);
                data.data = arrG1;
                var html=template('tpl-groupList',data)
                $('.my-group ul').html(html);
                if(data.data.length==0){
                    //$('.my-group').addClass('hide');
                }else{
                    $('.my-group').removeClass('hide');
                    API.courseApi_getCourse(courseid,function(datas){
                        if(datas.data.joingroup==1){
                            for(var i=0; i<data.data.length; i++){
                                if(data.data[i].me==1){
                                    $('.join-group').addClass('hide2');
                                    break;
                                }else{
                                    $('.join-group').removeClass('hide2');
                                    $('.allow-tips').removeClass('hide');
                                }
                            }
                        }
                    });


                }
            });
        }
        getGroup();
        getTeacher();
        function getGroupList(groupid){
        	/*plugin.loading();*/
            API.GroupApi_getGroupStudents(groupid,function(data){
                $('.all-list .null-word').remove();
                if(data.data.length==0){
                    if($('.join-group').length!=0&&$('.join-group').hasClass('hide2')==false){
                        var nullHtml=$('<p class="null-word">暂无同学<br>点击右上角"<span>加入该组</span>"，即可直接加入。</p>');
                    }else{
                        var nullHtml=$('<p class="null-word">暂无同学<br>你已加入其他小组或老师未开启自主选组，无法加入该小组。</p>');
                    }

                    $('.all-list').append(nullHtml);
                    $('.all-list ul').html('');
                }else{
                    var html=template('tpl-groupStudent',data);
                    $('.all-list ul').html(html);
                    for(var i=0; i<data.data.length; i++){
                        if(data.data[i].type==1){
                            $('.setLeader').addClass('hide2')
                        }
                    }
                }
                plugin.closeLoading();
            });
        }
        $(document).on('click','.m-l-box .my-group ul li:not(.all,.teacherTeam)',function(){
            $(this).addClass('active').siblings().removeClass('active');
            var me=$(this).attr('data-me');
            if(me==1){
                $('.exit-group').removeClass('hide2')
            }else{
                $('.exit-group').addClass('hide2')
            }
            $('.m-r-box .all-title').addClass('hide');
            $('.m-r-box .group-title').removeClass('hide');
            $('.m-r-box .group-title').attr('data-id',$(this).attr('data-id'));
            $('.m-r-box .group-title h3').html($(this).find('span').html()+'<span>'+$(this).find('b').html()+'</span>');
            var groupid=$(this).attr('data-id');
            getGroupList(groupid);
        });
        //所有学生
        $(document).on('click','.m-l-box .my-group ul li.all',function(){
            $('.my-group ul li').removeClass('active');
            $(this).addClass('active');
            $('.all-list .null-word').remove();
            $('.m-r-box .group-title ').addClass('hide');
            $('.m-r-box .all-title').removeClass('hide');
            var obj = $(this);
            getStudentLists(function(length){
            	obj.find('i').html(length);
            },0);
        });
        //教学团队
        $(document).on('click','.m-l-box .my-group ul li.teacherTeam',function(){
            $('.my-group ul li').removeClass('active');
            $(this).addClass('active');
            $('.all-list .null-word').remove();
            $('.m-r-box .group-title ').addClass('hide');
            $('.m-r-box .all-title').removeClass('hide');
            var obj = $(this);
            getTeacher(function(length){
            	obj.find('i').html(length);
            });
        });
        //加入某个小组
        $(document).on('click','.join-group',function(){
            layer.closeAll();
            var oV=$('.my-group li.active').find('span').html();
            layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area: ['400px', '196px'],
                content: $('#join-group'),
                success:function(){
                    $('#join-group .title span').html(oV);
                },
                shift: 7,
                moveType: 1
            });

        });
        $(document).on('click','.little-pop .cancel',function(){
            layer.closeAll();
        });
        $(document).on('click','#join-group .sure',function(){
            var groupid=$('.group-title').attr('data-id');
            API.courseApi_getCourse(courseid,function(data){
                if(data.data.joingroup==0){
                    layer.closeAll();
                    $('.join-group').remove();
                    $('.exit-group').remove();
                    $('.allow-tips').addClass('hide')
                    plugin.openMsg('老师已关闭选组，无法加入',1);
                    setTimeout(function(){
                        location.href=location.href;
                    },1000);
                }else{
                    API.GroupApi_joinGroup(groupid,function(data){
                        layer.closeAll();
                        $('.exit-group').removeClass('hide2');
                        $('.join-group').addClass('hide2');
                        $('.my-group li.active i').removeClass('hide2');
                        $('.my-group li.active').attr('data-me',1);
                        $('.my-group li.active em').html($('.my-group li.active em').html()-0+1);
                        $('.my-group li.active').click();
                        $('.allow-tips').addClass('hide')
                    })
                }
            });
        });

        //退出某个小组
        $(document).on('click','.exit-group',function(){
            layer.closeAll();
            var oV=$('.my-group li.active').find('span').html();
            layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area: ['400px', '196px'],
                content: $('#exit-group'),
                success:function(){
                    $('#exit-group .title span').html(oV);
                },
                shift: 7,
                moveType: 1
            });

        });
        $(document).on('click','#exit-group .sure',function(){
            var groupid=$('.group-title').attr('data-id');
            API.courseApi_getCourse(courseid,function(data){
                if(data.data.joingroup==0){
                    layer.closeAll();
                    $('.join-group').remove();
                    $('.exit-group').remove();
                    $('.allow-tips').addClass('hide');
                    plugin.openMsg('老师已关闭选组，无法退出',1);
                    setTimeout(function(){
                        location.href=location.href;
                    },1000);
                }else{
                    API.GroupApi_quitGroup(groupid,function(data){
                        layer.closeAll();
                        $('.exit-group').addClass('hide2');
                        $('.join-group').removeClass('hide2');
                        $('.my-group li.active i').addClass('hide2');
                        $('.my-group li.active').attr('data-me',0);
                        $('.my-group li.active em').html($('.my-group li.active em').html()-1);
                        $('.my-group li.active').click();
                        $('.allow-tips').removeClass('hide');
                    })
                }
            })
        });
        //私信
        $(document).on('click','.m-r-box ul li.teacher .call',function(){
            var uid = $(this).parents('li').attr('data-uid'),
                username = $(this).parents('li').find('.teaName span').text(),
                courseid = $("#return-course").attr('data-id')
                coursename = $('#return-course span').text();
            require.async(['./chatDialog.js'],function(c){
                c.chatDialog(uid,username,courseid,coursename);
            })
        });
        $(document).on('click','li:not(.teacher) .call',function(){
            var studentIds = $(this).parents('li').attr('data-id'),
                username = $(this).parents('li').find('.name').text(),
                courseid = $("#return-course").attr('data-id')
                coursename = $('#return-course span').text();
            require.async(['./chatDialog.js'],function(c){
                c.chatDialog(studentIds,username,courseid,coursename);
            })

        });
        //搜索
        $(document).on('keyup','.member-title .input-box input',function(ev){
            var oV=$(this).val();
            if(oV==''){
                $('.member-search').addClass('hide');
                $('.member-cont').removeClass('hide');
                getTeacher();
                getGroup();
                $('.group-title').addClass('hide');
                $('.all-title').removeClass('hide');
            }else{
                if(ev.keyCode==13){
                    $('.member-search .search-title h3 span').html(oV)
                    $('.member-cont').addClass('hide');
                    $('.member-search').removeClass('hide');
                    API.studentsApi_search(courseid,oV,function(data){
                        if(data.lists.length==0){
                            $('.member-search ul').html('')
                            $('.member-search .no-search').remove();
                            var nullHtml=$('<p class="no-search">未搜索到结果</p>');
                            $('.member-search .search-title').after(nullHtml);
                        }else{
                            $('.member-search .no-search').remove();
                            var html=template('tpl-allStudent',data);
                            $('.member-search ul').html(html);
                            for(var i=0; i<$('.member-search ul p').length; i++){
                                $('.member-search ul p').eq(i).html(exports.keywords($('.member-search ul p').eq(i).html(),oV));
                            }
                        }
                    })
                }
            }
        });
        $(document).on('click','.member-title .input-box i',function(ev){
            var oV=$(this).prev().val();
            if(oV==''){
                return;
            }else{
                $('.member-search .search-title h3 span').html(oV)
                $('.member-cont').addClass('hide');
                $('.member-search').removeClass('hide');
                API.studentsApi_search(courseid,oV,function(data){
                    if(data.lists.length==0){
                        $('.member-search ul').html('')
                        $('.member-search .no-search').remove();
                        var nullHtml=$('<p class="no-search">未搜索到结果</p>');
                        $('.member-search .search-title').after(nullHtml);
                    }else{
                        $('.member-search .no-search').remove();
                        var html=template('tpl-allStudent',data);
                        $('.member-search ul').html(html);
                        for(var i=0; i<$('.member-search ul p').length; i++){
                            $('.member-search ul p').eq(i).html(exports.keywords($('.member-search ul p').eq(i).html(),oV));
                        }
                    }
                })
            }
        });
    };

    $(document).on('click','.btn_batch',function(){
        $(this).parents('ul').addClass('batchstart');
    })
    $(document).on('click','.delete_check',function(){
        $(this).toggleClass('delete_checked');
        checkednum()
    })
    $(document).on('click','.check_all',function(){
        if($(this).hasClass('delete_checked')){
            $('.delete_check').removeClass('delete_checked');
        }else{
            $('.delete_check').addClass('delete_checked');
        }
        checkednum()
        return false;
    })

    function checkednum(){
        var count = $('.delete_list').length;
        var checked = $('.delete_list.delete_checked').length;
        if(checked == 0){
            $('.check_all').removeClass('delete_checked');
            $('.btn_delete_checked').attr('disabled','true')
            $('.btn_delete_checked').addClass('disabled');
            $('.btn_message_checked').attr('disabled','true')
            $('.btn_message_checked').addClass('disabled');
        }else if(checked ==count){
            $('.check_all').addClass('delete_checked');
            $('.btn_delete_checked').removeClass('disabled');
            $('.btn_message_checked').removeClass('disabled');
        }else{
            $('.check_all').removeClass('delete_checked');
            $('.btn_delete_checked').removeClass('disabled');
            $('.btn_message_checked').removeClass('disabled');
        }
    }

    $(document).on('click','.btn_delete_checked',function(){
        if($(this).hasClass('disabled')){
            return false;
        }else{
            var courseid=$('#return-course').attr('data-id');
            var list = $('.delete_list.delete_checked');
            var str = '';
            for(var i = 0;i<list.length;i++){
                if(i==0){

                }else{
                    str+='|'
                }
                str+= list.eq(i).parent().data('id');
            }
            plugin.cursorconfirm({
                 title:'',
                    info:'确认批量删除学生吗',
                    canel:'取消',
                    sure:'确定',
                    width:'300px',
                    sureCallback:function(){
                        
                        API.courseApi_deleteStudentBat(courseid,str,function(data){
                            if(data.status==1){
                                plugin.openMsg('删除成功',0)
                                // API.GroupApi_listGroups(courseid,function(data){
                                //     var html=template('tpl-groupList',data)
                                //     $('.my-group ul').html(html);
                                //     $('.group-box .my-group li').removeClass('active');
                                //     $('.group-box .my-group li.all').addClass('active');
                                // })
                                list.parent().remove();
                                checkednum()
                            }
                        })
                        
                    },
                })

        }
    })

    $(document).on('click','.btn_message_checked',function(){
        if($(this).hasClass('disabled')){
            return false;
        }else{
            var courseid=$('#return-course').attr('data-id');
            var list = $('.delete_list.delete_checked');
            var str = '';
            for(var i = 0;i<list.length;i++){
                if(i==0){

                }else{
                    str+='|'
                }
                str+= list.eq(i).parent().data('id');
            }
            require.async("./letter", function  (ex) {
                ex.dialogAll(str,courseid,'',function(){});
            });
        }
    })

    var stafftime = null;
    $(document).scroll(function(){
        clearInterval(stafftime);
        stafftime = setTimeout(function(){
            loadimg();
        },300)
        
    })

    function loadimg(){
        var winheight = $(window).height();
        var scrollTop = $(document).scrollTop()
        var count = parseInt(winheight/61)  //  一窗口高度可以显示的学生个数
        var downline = parseInt((scrollTop+winheight)/61);
        var upline =  parseInt((scrollTop-winheight)/61);
        if(upline<0){
            upline = 0;
        }
        var __img = $('.avatar');
        if(__img.length<=downline){
            downline = __img.length;
        }
        for( var i = upline;i<downline;i++ ){
            var _img = __img.eq(i);
            if(_img.attr('data-end')==null){
                _img.attr('src',_img.data('src')).attr('data-end','1')
                
            }
        }
    }

    exports.groupall = function(){
        var courseid = $('#return-course').data('id');
        $(document).on('click',function(){
            $('.activityoptul').addClass('ihide');
        })
        //加载所有活动
        function loadallactivity(){
            API.CourseGroupActivityApi_getLists(courseid,function(data){
                var fix;
                for(var i=0;i<data.data.length;i++){
                    if(data.data[i].isfixed == '1'){
                        fix = data.data[i];
                    }
                }
                var ht = template('tpl-grouplists',data);
                $('#groupdone').html(ht);
                var fixht = template('tpl-fixgroup',fix);
                $('.fixedgroupbox').html(fixht);
                $('.groupactivity').on('click',function(){
                    var aid = $(this).data('id');
                    loadsingleactivity(aid,0);
                })
                $('.activityoptsbox').on('click',function(e){
                    e.stopImmediatePropagation();
                    $(this).next().removeClass('ihide');
                })
                $('.delthisactivity').on('click',function(e){
                    e.stopPropagation();
                    var aid = $(this).data('id');
                    plugin.cursorconfirm({
                        title:'确定要删除该分组吗',
                        info:'您即将删除该分组，此操作进行后无法撤回',
                        sureCallback:function(){
                            API.CourseGroupActivityApi_delGroupActivity(aid,function(data){
                                if(data.status == 1){
                                    plugin.openMsg('删除分组成功');
                                    loadallactivity();
                                }
                            })
                        }
                    })
                })
            })
            
        }
        //加载活动中的小组
        function loadsingleactivity(aid,index){
            $('.groupmain').hide();
            $('.singlegroup').show();
            loadbaseinfo(aid);
            loadgroupslist(aid,index);
        }
        // 加载小组基本信息
        function loadbaseinfo(aid){
           /* plugin.loading();*/
            API.CourseGroupActivityApi_getActivityInfo(aid,function(data){
                var ht = template('tpl-activitydetail',data);
                $('.sghead').html(ht);
                if(data.data.isallowjoin == '0'){
                    plugin.setSlideswitch('allowswitch',false,function(s){
                        API.CourseGroupApi_setJoinGroup(aid,s,function(data){})
                    });
                }else{
                    plugin.setSlideswitch('allowswitch',true,function(s){
                        API.CourseGroupApi_setJoinGroup(aid,s,function(data){})
                    });
                }
                $('.indelthisactivity').on('click',function(){
                    var aid = $(this).data('id');
                    plugin.cursorconfirm({
                        title:'确定要删除该分组吗',
                        info:'您即将删除该分组，此操作进行后无法撤回',
                        sureCallback:function(){
                            API.CourseGroupActivityApi_delGroupActivity(aid,function(data){
                                if(data.status == 1){
                                    plugin.openMsg('删除分组成功');
                                    $('.changeactivity').click();
                                    loadallactivity();
                                }
                            })
                        }
                    })
                })
                plugin.closeLoading();
            })
        }
        // 加载小组列表
        function loadgroupslist(aid,index){
            /*plugin.loading();*/
            API.CourseGroupApi_listGroups(aid,function(data){
                data.index = index;
                data.aid = aid;
                var ht = template('tpl-activitygrouplist',data);
                $('.grouplist').html(ht);
                plugin.closeLoading();
                var gid = $('.groupli.active').data('id');
                var gname = $('.groupli.active').attr('title');
                $('.groupli').on('click',function(e){
                    var gids = $(this).data('id');
                    var gnames = $(this).parent().attr('title');
                    $('.groupli.active').removeClass('active');
                    $(this).addClass('active');
                    loadgrouppeople(gids,gnames);
                })
                loadgrouppeople(gid,gname);
            });
        }
        // 加载小组成员
        function loadgrouppeople(gid,gname){
            if(gid == '' || gid == undefined){
                $('.sgbodyr').html('<div class="nogroupinfo">暂无小组信息，试试创建小组吧</div>')
                return false;
            }
            plugin.loading();
            API.CourseGroupApi_getGroupStudents(gid,function(data){
                data.gname = data.groupname;
                data.gid = gid;
                var ht = template('tpl-singlegroupdetail',data);
                $('.sgbodyr').html(ht);
                $('.groupli.active font').text(data.data.length);
                plugin.closeLoading();
            })
        }
        // 编辑活动信息
        function editactivity(aid,aname,slimit,allowcreate,glimit,type){
            API.CourseGroupActivityApi_editGroupActivity(aid,aname,slimit,allowcreate,glimit,function(data){
                if(data.status == '1'){
                    if(type == '2'){
                        plugin.openMsg('编辑成功',0);
                    }
                    $('.createnewlaert').hide();
                }
                loadallactivity();
                loadbaseinfo(aid);
            })
        }
        // 初始化加载所有活动
        loadallactivity();
        plugin.setSlideswitch('allownew',false,function(s){
            if(s == 0){
                $('#allownew').nextAll().hide();
            }else{
                $('#allownew').nextAll().show();
            }
        });
        // 添加活动点击事件
        $('.addnewgroups').on('click',function(){
            $('body').append(template('tpl-selectnewtype',{}));
            var now = new Date();
            var gname = (now.getMonth()+1)+'月'+now.getDate()+'日活动分组';
            $('.choosefreetype').on('click',function(){
                var now = new Date();
                var gname = (now.getMonth()+1)+'月'+now.getDate()+'日活动分组';
                $('.myshade').remove();
                $('body').append(template('tpl-createfreenew',{gname:gname}));
            })
            $('.chooselimittype').on('click',function(){
                $('.myshade').remove();
                API.GroupApi_listGroups(courseid,function(data){
                    $('body').append(template('tpl-createlimitnew',{scount:data.studentCount,gname:gname}));
                    // 新建活动事件绑定
                    plugin.setSlideswitch('autosetmember',false);
                    plugin.setSlideswitch('allowstucreatenew',false);
                    $('.slidetab').on('click',function(){
                        if($(this).hasClass('slideme')){
                            return false;
                        }
                        $('.slideme').removeClass('slideme');
                        $(this).addClass('slideme')
                        if($(this).attr('id') == 'sdividebygroup'){
                            $('#dividebygroup').show();
                            $('#dividebypeople').hide();
                        }else{
                            $('#dividebygroup').hide();
                            $('#dividebypeople').show();
                        }
                    });
                    $('#dividebygroupnum').on('blur input',function(){
                        $(this).val($(this).val().replace(/\D/g,''));
                        var tn = Number($(this).parents('.createlimitnewbox').data('count'));
                        var dn = Number($(this).val());
                        var result = Math.ceil(tn/dn);
                        if(dn == 0){
                            result = tn;
                        }
                        $('#calcresultnumg').html(result);
                    })
                    $('#dividebypeoplenum').on('blur input',function(){
                        $(this).val($(this).val().replace(/\D/g,''));
                        if($(this).val() == ''){
                            $(this).val(0);
                        }
                        var tn = Number($(this).parents('.createlimitnewbox').data('count'));
                        var dn = Number($(this).val());
                        var result = Math.ceil(tn/dn);
                        if(dn == 0){
                            result = tn;
                        }
                        $('#calcresultnump').html(result);
                    })
                });
                
            })
        })
        $(document).on('click','.myshade',function(e){
            e.stopPropagation();
            $(this).remove();
        })
        $(document).on('click','.shadebox',function(e){
            e.stopPropagation();
            return false;
        })
        $(document).on('click','.surecreates',function(e){
            if($(this).data('type') == '0'){
                var aname = $('#createactivitynames').val();
                API.CourseGroupActivityApi_addGroupActivity(courseid,aname,function(data){
                    if(data.status == '1'){
                        plugin.openMsg('创建成功',0);
                        $('.myshade').remove();
                        loadallactivity();
                    }
                })
            }else{
                var aname = $('#createactivitynames').val();
                var glimit,plimit,allowc,autoset;
                if($('#autosetmember').attr('switch') == 'on'){
                    autoset = 1;
                }else{
                    autoset = 0;
                }
                if($('#allowstucreatenew').attr('switch') == 'on'){
                    allowc = 1;
                }else{
                    allowc = 0;
                }
                if($('.slideme').attr('id') == 'sdividebygroup'){
                    glimit = $('#dividebygroupnum').val();
                    plimit = 0;
                }else{
                    glimit = 0;
                    plimit = $('#dividebypeoplenum').val();
                }
                API.CourseGroupActivityApi_addGroupActivityAutoMore(courseid,aname,plimit,allowc,glimit,autoset,function(data){
                    if(data.status == '1'){
                        plugin.openMsg('创建成功',0);
                        $('.myshade').remove();
                        loadallactivity();
                    }
                })
            }
        })
        $(document).on('click','.canclecreates',function(e){
            $('.myshade').remove();
        });
        //下载小组的信息
        $(document).on('click','.downloadgroup',function(){
        	 var aid = $('.activename').data('id');
        	 location.href = "/Export/exportGroupAcitity/activityid/"+aid;
        });
        // 添加活动设置点击事件
        $(document).on('click','.activesetting',function(){
            var aid = $('.activename').data('id');
            $('.createnewhead').html('编辑活动分组').attr('type',2);
            $('#newactivetyname').val($('.activename').html());
            if($(this).attr('groupnumslimit') == '0'){
                $('#grouplimit').val('不限');
            }else{
                $('#grouplimit').val($(this).attr('groupnumslimit'));
            }
            if($(this).attr('groupstudentlimit') == '0'){
                $('#peoplelimit').val('不限');
            }else{
                $('#peoplelimit').val($(this).attr('groupstudentlimit'));
            }
            if($(this).attr('isallowcreate') == '0'){
                plugin.setswitchstatus('allownew',false);
                $('#allownew').nextAll().hide();
            }else{
                plugin.setswitchstatus('allownew',true);
                $('#allownew').nextAll().show();
            }
            $('.createnewlaert').show();
            $('#newactivetyname').focus();
        })
        // 活动设置
        $(document).on('focus','#newactivetyname,.newactivityname',function(){
            $(this).parent().addClass('inputactive');
        })
        $(document).on('blur','#newactivetyname,.newactivityname',function(){
            $(this).parent().removeClass('inputactive');
        })
        $(document).on('click','.delinput',function(){
            $(this).prev().val('');
            $(this).prev().focus();
        })
        $(document).on('click','.surecreate',function(){
            var aname = $('#newactivetyname').val();
            if(aname == ''){
                plugin.openMsg('活动分组名称不能为空',1);
                $('#newactivetyname').focus();
                return false;
            }
            var peoplelimit = $('#peoplelimit').val().replace(/\D/g,'');
            if(peoplelimit == ''){
                peoplelimit = 0;
            }
            var allownew = $('#allownew').attr('switch');
            if(allownew == 'on'){
                allownew = 1;
            }else{
                allownew = 0;
            }
            var grouplimit = $('#grouplimit').val().replace(/\D/g,'');
            if(grouplimit == ''){
                grouplimit = 0;
            }
            var type = $('.createnewhead').attr('type');
            if(type == 1){
                API.CourseGroupActivityApi_addGroupActivity(courseid,aname,function(data){
                    if(data.status == 1){
                        plugin.openMsg('创建成功',0);
                        editactivity(data.data.id,aname,peoplelimit,allownew,grouplimit,type);
                    }
                })
            }else{
                var aid = $('.activename').data('id');
                editactivity(aid,aname,peoplelimit,allownew,grouplimit,type);
            }  
        })
        $(document).on('click','.canclecreate',function(){
            $('.createnewlaert').hide();
        })
        
        // 点击切换分组
        $(document).on('click','.changeactivity',function(){
            $('.singlegroup').hide();
            $('.groupmain').show();
        })
        // 点击添加小组
        $(document).on('click','.addnewgroup',function(){
            var aid = $('.activename').data('id');
            var newname;
            layui.layer.prompt({title:'输入小组名称'},function(value, index, elem){
                API.CourseGroupApi_addGroup(aid,value,function(data){
                    if(data.status == 1){
                        plugin.openMsg('创建成功',0);
                        $('#layui-layer'+index).remove();
                        $('.layui-layer-shade').remove();
                        var indexs = $('.groupli.active').index();
                        loadgroupslist(aid,indexs);
                    }
                })
            })
        })
        // 小组添加成员
        $(document).on('click','.addgroupmember',function(){
            var gid = $('.sgroupname').data('id');
            $('.bg').show();
            $('.lxr-box .res-list').html('');
            $('.lxr-box .end-list').html('');
            $('.lxr-box input').val('');
            API.CourseGroupApi_getStudents(gid,'', function (data) {
                var html=template('tpl-lxr',data);
                $('.lxr-box .res-list').html(html);
                scrollBar.scrollBar($('.choose-div'),$('.choose-div .search-result'))
            });
            $('.lxr-box').show();
        })
        $(document).on('keyup','.lxr-box input',function(){
            var oV=$(this).val();
            var gid = $('.sgroupname').data('id');
            API.CourseGroupApi_getStudents(gid,oV, function (data) {
                if(data.data.length==0){
                    $('.lxr-box .no-search').remove();
                    var nullHtml=$('<p class="no-search">未搜索到结果</p>');
                    $('.lxr-box .search-result').append(nullHtml);
                }else{
                    $('.lxr-box .no-search').remove();
                }
                var html = template('tpl-lxr', data);
                $('.lxr-box .res-list').html(html);
                for(var i=0; i<$('.end-list p').length; i++){
                    $('.lxr-box .res-list p[data-id='+$('.end-list p').eq(i).attr('data-id')+']').find('i').addClass('checked');
                }
                scrollBar.scrollBar($('.choose-div'), $('.choose-div .search-result'));
            });
        });

        //取消编辑
        $(document).on('click','.lxr-box .title .cancel,.lxr-box .close',function(){
            $('.bg').hide();
            $('.lxr-box').hide();
            $('.end-box .title h2 span').html(0);
        });
        $(document).on('click','.res-list p',function(){
            var id=$(this).data('id');
            var name=$(this).find('span').html();
            if($(this).find('i').hasClass('checked')){
                $(this).find('i').removeClass('checked');
                $('.end-list dl[data-id=id]').remove();
                $('.end-list p[data-id='+$(this).attr('data-id')+']').remove();
                scrollBar.scrollBar($('.end-box .end-div'),$('.end-box .end-list'));
                $('.end-box .title h2 span').html($('.end-box .title h2 span').html()-1);
                $(this).removeClass('pselected');
                $(this).addClass('npselected');
            }else{
                $(this).find('i').addClass('checked');
                addPeople(id,name);
                $('.end-box .title h2 span').html($('.end-box .title h2 span').html()-0+1);
                $(this).addClass('pselected');
                $(this).removeClass('npselected');
            }
            if($('.selectp i').length == $('.selectp i.checked').length){
                $('.selectall').addClass('active');
            }else{
                $('.selectall').removeClass('active');
            }
            scrollBar.scrollBar($('.end-box .end-div'),$('.end-box .end-list'));
        });
        $(document).on('click','.selectall',function(){
            if($(this).hasClass('active')){
                $('.pselected').click();
            }else{
                $('.npselected').click();
            }
        });
        $(document).on('click','.end-list p .cancel',function(){
            $(this).parents('p').remove();
            $('.res-list p[data-id='+$(this).parents('p').attr('data-id')+']').find('i').removeClass('checked');
            scrollBar.scrollBar($('.end-box .end-div'),$('.end-box .end-list'));
            $('.end-box .title h2 span').html($('.end-box .title h2 span').html()-1);
        });
        function addPeople(id,name){
            var data={
                id:id,
                name:name
            };
            var html=template('tpl-lxrone',data);
            $('.end-box .end-list').append(html);
            scrollBar.scrollBar($('.end-box .end-div'),$('.end-box .end-list'))
        }
        //确认添加
        $(document).on('click','.lxr-box .sure',function(){
            var groupid=$('.sgroupname').attr('data-id');
            var arr=[];
            var addstudentids;
            $('.end-list p').each(function(){
                arr.push($(this).attr('data-id'));
            });
            addstudentids=arr.join('|')
            if(addstudentids==''){
                $('.bg').hide();
                $('.lxr-box').hide();
            }else{
                API.CourseGroupApi_joinGroupByTeacher(groupid,addstudentids,function(data){
                    $('.null-word').remove();
                    $('.bg').hide();
                    $('.lxr-box').hide();
                    addstudentids='';
                    var gname = $('.sgroupname').html();
                    loadgrouppeople(groupid,gname);
                });
            }
        });
        
        // 多选按钮
        $(document).on('click','.selectboxsingle',function(){
            if($(this).hasClass('selected')){
                $(this).removeClass('selected');
            }else{
                $(this).addClass('selected');
            }
            if($('.selectboxsingle.selected').length == $('.selectboxsingle').length){
                $('.allselect').addClass('selected');
            }else{
                $('.allselect').removeClass('selected');
            }
            if($('.selectboxsingle.selected').length>0){
                $('.btnbox').removeClass('disablebtn');
            }else{
                $('.btnbox').addClass('disablebtn');
            }
        })
        $(document).on('click','.allselect',function(){
            if($(this).hasClass('selected')){
                $(this).removeClass('selected');
                $('.selectboxsingle').removeClass('selected');
                $('.btnbox').addClass('disablebtn');
            }else{
                $(this).addClass('selected');
                $('.selectboxsingle').addClass('selected');
                $('.btnbox').removeClass('disablebtn');
            }
        })
        // 设为组长
        $(document).on('click','.setasgroupmaster',function(){
            var _this = this;
            var gid = $('.sgroupname').data('id');
            var uid = $(this).parent().data('id');
            API.CourseGroupApi_setGroupLeader(gid,uid,function(data){
                if(data.status == '1'){
                    plugin.openMsg('已成功设置为组长',0);
                    $(_this).parents('.ctrlopt').before('<div class="isgroupmaster">组长</div>');
                    $(_this).removeClass('setasgroupmaster').addClass('unsetasgroupmaster').html('取消组长');
                }
            })
        })
        // 取消组长
        $(document).on('click','.unsetasgroupmaster',function(){
            var _this = this;
            var gid = $('.sgroupname').data('id');
            var uid = $(this).parent().data('id');
            API.CourseGroupApi_cancelGroupLeader(gid,uid,function(data){
                if(data.status == '1'){
                    plugin.openMsg('已成功取消组长任命',0);
                    $(_this).parents('.groupstuli').find('.isgroupmaster').remove();
                    $(_this).removeClass('unsetasgroupmaster').addClass('setasgroupmaster').html('取消组长');
                }
            })
        })
        // 移出此组
        $(document).on('click','.kickthisguy',function(){
            var _this = this;
            var gid = $('.sgroupname').data('id');
            var uid = $(this).parent().data('id');
            API.CourseGroupApi_removeStudent(gid,uid,function(data){
                if(data.status == '1'){
                    plugin.openMsg('已成功移出此组',0);
                    var gname = $('.sgroupname').text();
                    loadgrouppeople(gid,gname);
                }
            })
        })
        // 私信
        $(document).on('click','.sendselfmessage',function(){
            var studentIds = $(this).parent().attr('data-id'),
                username = $(this).parents('.groupstuli').find('.stuname').text(),
                courseid = $("#return-course").attr('data-id')
                coursename = '';
            require.async(['./chatDialog.js'],function(c){
                c.chatDialog(studentIds,username,courseid,coursename);
            })
        });
         // 删除小组
        $(document).on('click','.delthisgroup',function(e){
            e.stopImmediatePropagation();
            var _this = this;
            var gid = $(this).parents('.groupli').data('id');
            plugin.cursorconfirm({
                title:'确定要删除小组吗？',
                info:'您确定要删除此小组吗？该操作执行后不可撤销',
                sureCallback:function(){
                    API.CourseGroupApi_delGroup(gid,function(data){
                        if(data.status == '1'){
                            plugin.openMsg('已成功删除小组',0);
                            if($(_this).parents('.groupli').hasClass('active')){
                                $('.groupli').eq(0).click();
                            }
                            $(_this).parents('.groupli').remove();
                        }
                    })
                }
            })
        })
        // 群发私信
        $(document).on('click','.groupsendmsg',function(){
            if($(this).hasClass('disablebtn')){
                return false;
            }else{
                var courseid=$('#return-course').attr('data-id');
                var list = $('.selectbox.selectboxsingle.selected');
                var str = '';
                for(var i = 0;i<list.length;i++){
                    if(i==0){
    
                    }else{
                        str+='|'
                    }
                    str+= list.eq(i).parent().data('id');
                }
                require.async("./letter", function  (ex) {
                    ex.dialogAll(str,courseid,'',function(){});
                });
            }
        })
        // 群体移出小组
        $(document).on('click','.kickoutgroup',function(){
            if($(this).hasClass('disablebtn')){
                return false;
            }else{
                var gid=$('.sgroupname').attr('data-id');
                var list = $('.selectbox.selectboxsingle.selected');
                var str = '';
                for(var i = 0;i<list.length;i++){
                    if(i==0){
    
                    }else{
                        str+='|'
                    }
                    str+= list.eq(i).parent().data('id');
                }
                API.CourseGroupApi_removeStudent(gid,str,function(data){
                    if(data.status == '1'){
                        plugin.openMsg('移除成员成功',0);
                        var gname = $('.sgroupname').text();
                        loadgrouppeople(gid,gname);
                    }
                })
            }
        })
        $(document).on('click','.sgroupset',function(){
            var gid=$('.sgroupname').attr('data-id');
            var aid = $('.activename').data('id');
            var gname = $('.sgroupname').html();
            var limit = $(this).data('limit');
            plugin.blankalert({
                title:template('tpl-editgroup',{gname:gname,limit:limit}),
                success : function(dom){
                    $(dom).find('#singlegroupnumset').on('input blur',function(){
                        $(this).val($(this).val().replace(/\D/g,''));
                        if($(this).val() == ''){
                            $(this).val(0);
                        }
                    })
                    $(dom).find('.surecreatez').on('click',function(){
                        var newgname = $(dom).find('#singlegroupname').val();
                        if(newgname == ''){
                            plugin.openMsg('小组名称不能为空',1);
                        }
                        var singlelimit = $(dom).find('#singlegroupnumset').val();
                        API.CourseGroupApi_updateGroup(gid,newgname,singlelimit,function(data){
                            if(data.status == '1'){
                                plugin.openMsg('修改组名成功',0);
                                $(dom).remove();
                                $('.sgroupname').html(newgname);
                                var indexs = $('.groupli.active').index();
                                loadgroupslist(aid,indexs);
                            }
                        })
                    })
                    $(dom).find('.canclecreatez').on('click',function(){
                        $(dom).remove();
                    })
                }
            })
        });
        $(document).on('click','.fixeddetail',function(){
            var aid = $(this).data('id');
            loadsingleactivity(aid,0);
        })
    }
    exports.groupalls = function(){
        var courseid = $('#return-course').data('id');
        //加载所有活动
        function loadallactivity(){
            API.CourseGroupActivityApi_getLists(courseid,function(data){
                var fix;
                for(var i=0;i<data.data.length;i++){
                    if(data.data[i].isfixed == '1'){
                        fix = data.data[i];
                    }
                }
                var ht = template('tpl-grouplists',data);
                $('#groupdone').html(ht);
                var fixht = template('tpl-fixgroup',fix);
                $('.fixedgroupbox').html(fixht);
                $('.groupactivity').on('click',function(){
                    var aid = $(this).data('id');
                    loadsingleactivity(aid,0);
                })
            })
            
        }
        //加载活动中的小组
        function loadsingleactivity(aid,index){
            $('.groupmain').hide();
            $('.singlegroup').show();
            loadbaseinfo(aid);
            loadgroupslist(aid,index);
        }
        // 加载小组基本信息
        function loadbaseinfo(aid){
            plugin.loading();
            API.CourseGroupActivityApi_getActivityInfo(aid,function(data){
                var ht = template('tpl-activitydetail',data);
                $('.sghead').html(ht);
                if(data.data.isallowcreate == '1'){
                    $('.addnewgroup').show();
                }else{
                    $('.addnewgroup').hide();
                }
                if(data.data.isallowjoin == '0'){
                    plugin.setSlideswitch('allowswitch',false,function(s){
                        API.CourseGroupApi_setJoinGroup(aid,s,function(data){})
                    });
                    $('.sgbodyr').removeClass('allowstujoin');
                }else{
                    plugin.setSlideswitch('allowswitch',true,function(s){
                        API.CourseGroupApi_setJoinGroup(aid,s,function(data){})
                    });
                    $('.sgbodyr').addClass('allowstujoin');
                }
                plugin.closeLoading();
            })
        }
        // 加载小组列表
        function loadgroupslist(aid,index){
            plugin.loading();
            API.CourseGroupApi_listGroups(aid,function(data){
                data.index = index;
                data.aid = aid;
                data.hasme = 0;
                for(var i=0;i<data.data.length;i++){
                    if(data.data[i].me == '1'){
                        data.hasme = 1;
                        break;
                    }
                }
                var ht = template('tpl-activitygrouplist',data);
                $('.grouplist').html(ht);
                plugin.closeLoading();
                var gid = $('.groupli.active').data('id');
                var gname = $('.groupli.active').attr('title');
                $('.groupli').on('click',function(e){
                    var gids = $(this).data('id');
                    var gnames = $(this).attr('title');
                    $('.groupli.active').removeClass('active');
                    $(this).addClass('active');
                    loadgrouppeople(gids,gnames);
                })
                loadgrouppeople(gid,gname);
            });
        }
        // 加载小组成员
        function loadgrouppeople(gid,gname){
            if(gid == '' || gid == undefined){
                $('.sgbodyr').html('<div class="nogroupinfo">暂无小组信息，试试创建小组吧</div>')
                return false;
            }
            plugin.loading();
            API.CourseGroupApi_getGroupStudents(gid,function(data){
                data.gname = gname;
                data.gid = gid;
                console.info(data);
                var ht = template('tpl-singlegroupdetail',data);
                $('.sgbodyr').html(ht);
                $('.groupli.active font').text(data.data.length);
                plugin.closeLoading();
            })
        }
        // 初始化加载所有活动
        loadallactivity();
        plugin.setSlideswitch('allownew',false,function(s){
            if(s == 0){
                $('#allownew').nextAll().hide();
            }else{
                $('#allownew').nextAll().show();
            }
        });
        // 添加小组（活动）点击事件
        $('.addnewgroups').on('click',function(){
            $('.createnewhead').html('新建活动分组').attr('type',1);
            $('.createnewlaert').show();
            $('#newactivetyname').focus();
        });
        // 添加活动设置点击事件
        $(document).on('click','.activesetting',function(){
            var aid = $('.activename').data('id');
            $('.createnewhead').html('编辑活动分组').attr('type',2);
            $('#newactivetyname').val($('.activename').html());
            if($(this).attr('groupnumslimit') == '0'){
                $('#grouplimit').val('不限');
            }else{
                $('#grouplimit').val($(this).attr('groupnumslimit'));
            }
            if($(this).attr('groupstudentlimit') == '0'){
                $('#peoplelimit').val('不限');
            }else{
                $('#peoplelimit').val($(this).attr('groupstudentlimit'));
            }
            if($(this).attr('isallowcreate') == '0'){
                plugin.setswitchstatus('allownew',false);
                $('#allownew').nextAll().hide();
            }else{
                plugin.setswitchstatus('allownew',true);
                $('#allownew').nextAll().show();
            }
            $('.createnewlaert').show();
            $('#newactivetyname').focus();
        })
        // 点击切换分组
        $(document).on('click','.changeactivity',function(){
            $('.singlegroup').hide();
            $('.groupmain').show();
        })
        // 点击添加小组
        $(document).on('click','.addnewgroup',function(){
            var aid = $('.activename').data('id');
            var newname;
            layui.layer.prompt({title:'输入小组名称'},function(value, index, elem){
                API.CourseGroupApi_addGroup(aid,value,function(data){
                    if(data.status == 1){
                        plugin.openMsg('创建成功',0);
                        $('#layui-layer'+index).remove();
                        $('.layui-layer-shade').remove();
                        var indexs = $('.groupli.active').index();
                        loadgroupslist(aid,indexs);
                    }
                })
            })
        })
        // 小组添加成员
        $(document).on('click','.addgroupmember',function(){
            var gid = $('.sgroupname').data('id');
            $('.bg').show();
            $('.lxr-box .res-list').html('');
            $('.lxr-box .end-list').html('');
            $('.lxr-box input').val('');
            API.CourseGroupApi_getStudents(gid,'', function (data) {
                var html=template('tpl-lxr',data);
                $('.lxr-box .res-list').html(html);
                scrollBar.scrollBar($('.choose-div'),$('.choose-div .search-result'))
            });
            $('.lxr-box').show();
        })
        $(document).on('keyup','.lxr-box input',function(){
            var oV=$(this).val();
            var groupid=$('.group-title').attr('data-id');
            API.GroupApi_getStudents(groupid,oV, function (data) {
                if(data.data.length==0){
                    $('.lxr-box .no-search').remove();
                    var nullHtml=$('<p class="no-search">未搜索到结果</p>');
                    $('.lxr-box .search-result').append(nullHtml);
                }else{
                    $('.lxr-box .no-search').remove();
                }
                var html = template('tpl-lxr', data);
                $('.lxr-box .res-list').html(html);
                for(var i=0; i<$('.end-list p').length; i++){
                    $('.lxr-box .res-list p[data-id='+$('.end-list p').eq(i).attr('data-id')+']').find('i').addClass('checked');
                }
                scrollBar.scrollBar($('.choose-div'), $('.choose-div .search-result'));
            });
        });

        //取消编辑
        $(document).on('click','.lxr-box .title .cancel,.lxr-box .close',function(){
            $('.bg').hide();
            $('.lxr-box').hide();
            $('.end-box .title h2 span').html(0);
        });
        $(document).on('click','.res-list p',function(){
            var id=$(this).data('id');
            var name=$(this).find('span').html();
            if($(this).find('i').hasClass('checked')){
                $(this).find('i').removeClass('checked');
                $('.end-list dl[data-id=id]').remove();
                $('.end-list p[data-id='+$(this).attr('data-id')+']').remove();
                scrollBar.scrollBar($('.end-box .end-div'),$('.end-box .end-list'));
                $('.end-box .title h2 span').html($('.end-box .title h2 span').html()-1);
            }else{
                $(this).find('i').addClass('checked');
                addPeople(id,name);
                $('.end-box .title h2 span').html($('.end-box .title h2 span').html()-0+1);
            }
            scrollBar.scrollBar($('.end-box .end-div'),$('.end-box .end-list'));
        });
        $(document).on('click','.end-list p .cancel',function(){
            $(this).parents('p').remove();
            $('.res-list p[data-id='+$(this).parents('p').attr('data-id')+']').find('i').removeClass('checked');
            scrollBar.scrollBar($('.end-box .end-div'),$('.end-box .end-list'));
            $('.end-box .title h2 span').html($('.end-box .title h2 span').html()-1);
        });
        function addPeople(id,name){
            var data={
                id:id,
                name:name
            };
            var html=template('tpl-lxrone',data);
            $('.end-box .end-list').append(html);
            scrollBar.scrollBar($('.end-box .end-div'),$('.end-box .end-list'))
        }
        //确认添加
        $(document).on('click','.lxr-box .sure',function(){
            var groupid=$('.sgroupname').attr('data-id');
            var arr=[];
            var addstudentids;
            $('.end-list p').each(function(){
                arr.push($(this).attr('data-id'));
            });
            addstudentids=arr.join('|')
            if(addstudentids==''){
                $('.bg').hide();
                $('.lxr-box').hide();
            }else{
                API.CourseGroupApi_joinGroupByTeacher(groupid,addstudentids,function(data){
                    $('.null-word').remove();
                    $('.bg').hide();
                    $('.lxr-box').hide();
                    addstudentids='';
                    var gname = $('.sgroupname').html();
                    loadgrouppeople(groupid,gname);
                });
            }
        });
        
        // 多选按钮
        $(document).on('click','.selectboxsingle',function(){
            if($(this).hasClass('selected')){
                $(this).removeClass('selected');
            }else{
                $(this).addClass('selected');
            }
            if($('.selectboxsingle.selected').length == $('.selectboxsingle').length){
                $('.allselect').addClass('selected');
            }else{
                $('.allselect').removeClass('selected');
            }
            if($('.selectboxsingle.selected').length>0){
                $('.btnbox').removeClass('disablebtn');
            }else{
                $('.btnbox').addClass('disablebtn');
            }
        })
        $(document).on('click','.allselect',function(){
            if($(this).hasClass('selected')){
                $(this).removeClass('selected');
                $('.selectboxsingle').removeClass('selected');
                $('.btnbox').addClass('disablebtn');
            }else{
                $(this).addClass('selected');
                $('.selectboxsingle').addClass('selected');
                $('.btnbox').removeClass('disablebtn');
            }
        })
        // 设为组长
        $(document).on('click','.setasgroupmaster',function(){
            var _this = this;
            var gid = $('.sgroupname').data('id');
            var uid = $(this).parent().data('id');
            API.CourseGroupApi_setGroupLeader(gid,uid,function(data){
                if(data.status == '1'){
                    plugin.openMsg('已成功设置为组长',0);
                    $(_this).parents('.ctrlopt').before('<div class="isgroupmaster">组长</div>');
                    $(_this).removeClass('setasgroupmaster').addClass('unsetasgroupmaster').html('取消组长');
                }
            })
        })
        // 取消组长
        $(document).on('click','.unsetasgroupmaster',function(){
            var _this = this;
            var gid = $('.sgroupname').data('id');
            var uid = $(this).parent().data('id');
            API.CourseGroupApi_cancelGroupLeader(gid,uid,function(data){
                if(data.status == '1'){
                    plugin.openMsg('已成功取消组长任命',0);
                    $(_this).parents('.groupstuli').find('.isgroupmaster').remove();
                    $(_this).removeClass('unsetasgroupmaster').addClass('setasgroupmaster').html('取消组长');
                }
            })
        })
        // 移出此组
        $(document).on('click','.kickthisguy',function(){
            var _this = this;
            var gid = $('.sgroupname').data('id');
            var uid = $(this).parent().data('id');
            API.CourseGroupApi_removeStudent(gid,uid,function(data){
                if(data.status == '1'){
                    plugin.openMsg('已成功移出此组',0);
                    var gname = $('.sgroupname').text();
                    loadgrouppeople(gid,gname);
                }
            })
        })
        // 私信
        $(document).on('click','.sendselfmessage',function(){
            var studentIds = $(this).parent().attr('data-id'),
                username = $(this).parents('.groupstuli').find('.stuname').text(),
                courseid = $("#return-course").attr('data-id')
                coursename = '';
            require.async(['./chatDialog.js'],function(c){
                c.chatDialog(studentIds,username,courseid,coursename);
            })
        });
        // 修改小组名称
       $(document).on('click','.renamethisgroup',function(e){
            e.stopPropagation();
            var _this = this;
            var gid = $(this).parents('.groupli').data('id');
            var gname = $(this).parents('.groupli').find('span[title]').eq(0).attr('title');
            var aid = $('.activename').data('id');
            layui.layer.prompt({
                title:'输入小组名称',
                success:function(dom, index){
                    $(dom).find('input').val(gname);
                }
            },function(value, index, elem){
                API.CourseGroupApi_updateGroupName(gid,value,function(data){
                    if(data.status == 1){
                        plugin.openMsg('修改成功',0);
                        $('#layui-layer'+index).remove();
                        $('.layui-layer-shade').remove();
                        var indexs = $('.groupli.active').index();
                        loadgroupslist(aid,indexs);
                    }
                })
            })
       })
         // 删除小组
        $(document).on('click','.delthisgroup',function(e){
            e.stopImmediatePropagation();
            var _this = this;
            var gid = $(this).parents('.groupli').data('id');
            plugin.cursorconfirm({
                title:'确定要删除小组吗？',
                info:'您确定要删除此小组吗？该操作执行后不可撤销',
                sureCallback:function(){
                    API.CourseGroupApi_delGroup(gid,function(data){
                        if(data.status == '1'){
                            plugin.openMsg('已成功删除小组',0);
                            if($(_this).parents('.groupli').hasClass('active')){
                                $('.groupli').eq(0).click();
                            }
                            $(_this).parents('.groupli').remove();
                        }
                    })
                }
            })
        })
        // 群发私信
        $(document).on('click','.groupsendmsg',function(){
            if($(this).hasClass('disablebtn')){
                return false;
            }else{
                var courseid=$('#return-course').attr('data-id');
                var list = $('.selectbox.selectboxsingle.selected');
                var str = '';
                for(var i = 0;i<list.length;i++){
                    if(i==0){
    
                    }else{
                        str+='|'
                    }
                    str+= list.eq(i).parent().data('id');
                }
                require.async("./letter", function  (ex) {
                    ex.dialogAll(str,courseid,'',function(){});
                });
            }
        })
        $(document).on('click','.fixeddetail',function(){
            var aid = $(this).data('id');
            loadsingleactivity(aid,0);
        })
        $(document).on('click','.stuquitgroup',function(){
            var gid = $('.sgroupname').data('id');
            API.CourseGroupApi_quitGroup(gid,function(data){
                if(data.status == 1){
                    plugin.openMsg('退出小组成功',0);
                    var indexs = $('.groupli.active').index();
                    var aid = $('.activename').data('id');
                    loadsingleactivity(aid,indexs);
                }
            })
        })
        $(document).on('click','.stujoingroup',function(){
            var gid = $('.sgroupname').data('id');
            API.CourseGroupApi_joinGroup(gid,function(data){
                if(data.status == 1){
                    plugin.openMsg('加入小组成功',0);
                    var indexs = $('.groupli.active').index();
                    var aid = $('.activename').data('id');
                    loadsingleactivity(aid,indexs);
                }
            })
        })
    }
})
/**
 * Created by Administrator on 2015/5/26.
 */
define(function(require,exports,moudles) {
    window.$=window.jQuery=$=require('jquery');
    var plugin = require('plugin');
    var API = require('API');
    var layer = require('layer');
    var template = require('art-template');
    /*---------首页---------*/
    exports.homeAll=function(){
    	require('superslide');
    	$(".fullSlide").hover(function(){
		    $(this).find(".prev,.next").stop(true, true).fadeTo("show",1);
		},
		function(){
		    $(this).find(".prev,.next").fadeOut()
		});
		$(".fullSlide").slide({
		    titCell: ".hd ul",
		    mainCell: ".bd ul",
		    effect: "fold",
		    autoPlay: true,
		    autoPage: true,
		    trigger: "click",
		    interTime: "5000",
		    startFun: function(i) {
		        var curLi = jQuery(".fullSlide .bd li").eq(i);
		    }
        });
        
	
//  	$('.header2 .logo a img').attr('src','/Public/Home/img/logo-blue.png');
        $(window).scroll(function(){
            if($(window).scrollTop()>=400 && $(window).scrollTop()<600) {
                $('.sx-box .fk3').hide();
                $('.sx-box .fk4').hide();
                $('.sx-box .fk3').css({'height':0})
                $('.sx-bg').show();
                $('.sx-box .fk1').show();
                $('.sx-box .fk1').stop().animate({'width': 102, 'height': 143}, 400);
                $('.sx-box .fk2').show();
            }
            if($(window).scrollTop()>=605){
                $('.sx-bg').show();
                $('.sx-box .fk1').hide();
                $('.sx-box .fk2').hide();
                $('.sx-box .fk1').css({'width':0,'height':0})
                $('.sx-box .fk3').show().stop().animate({'height': 215}, 400);
                $('.sx-box .fk4').show();
            }
            if($(window).scrollTop()<200){
                $('.sx-box .fk1').hide();
                $('.sx-box .fk1').css({'width':0,'height':0})
                $('.sx-box .fk3').css({'height':0})
                $('.sx-box .fk2').hide();
                $('.sx-box .fk3').hide();
                $('.sx-box .fk4').hide();
                $('.sx-bg').hide();
            }
        });
        /*API.NewsApi_getXueBaRank(function(data){
            data.len = data.data.length;
            // var t = {li:data,len:data.length};
            var ht = template('tpl-mrli',data);
            $('.mediareportul').html(ht);
            var hts = template('tpl-dotli',data);
            $('.mediareportul').after(hts);
            $('.mediareportul').css('width',860*(data.data.length+4)+'px');
            $('.mrli :first').before($('.mrli :last').clone().removeClass('mainli'));
            $('.mrli :first').before($('.mrli :last').prev().clone().removeClass('mainli'));
            $('.mediareportul').append($('.mrli').eq(2).clone().removeClass('mainli'));
            $('.mediareportul').append($('.mrli').eq(3).clone().removeClass('mainli'));
            $('.mrli').eq(2).addClass('liactive');
            $('.dot :first').addClass('dotactive');
            $('.lt').on('click',function(){
                changeprev();
            });
            $('.gt').on('click',function(){
                changenext();
            });
        });*/
        
        function changenext(){
            var index = parseInt($('.liactive').attr('index'));
            var len = parseInt($('.liactive').attr('len'));
            var _this = $('.liactive');
            var _thisdot = $('.dotactive');
            if(index+1 == len){
                $('.mainli :first').addClass('liactive');
                $(_this).next().addClass('liactive');
                $(_this).removeClass('liactive');
                $(_thisdot).removeClass('dotactive');
                $('.dot :first').addClass('dotactive');
                $('.mediareportul').animate({'margin-left':'-=860px'},1000,function(){
                    $('.mediareportul').css({'margin-left':'50%'});
                    $(_this).next().removeClass('liactive');
                });
            }else{
                $(_this).next().addClass('liactive');
                $(_thisdot).removeClass('dotactive');
                $(_thisdot).next().addClass('dotactive');
                $(_this).removeClass('liactive');
                $('.mediareportul').animate({'margin-left':'-=860px'},1000,function(){
                });
            }
        }
        function changeprev(){
            var index = parseInt($('.liactive').attr('index'));
            var len = parseInt($('.liactive').attr('len'));
            var _this = $('.liactive');
            var _thisdot = $('.dotactive');
            if(index == 0){
                $('.mainli :last').addClass('liactive');
                $(_this).prev().addClass('liactive');
                $(_this).removeClass('liactive');
                $(_thisdot).removeClass('dotactive');
                $('.dot :last').addClass('dotactive');
                $('.mediareportul').animate({'margin-left':'+=860px'},1000,function(){
                    $('.mediareportul').css({'margin-left':'calc(50% - '+(len-1)*860+'px'});
                    $(_this).prev().removeClass('liactive');
                });
            }else{
                $(_this).prev().addClass('liactive');
                $(_this).removeClass('liactive');
                $(_thisdot).removeClass('dotactive');
                $(_thisdot).prev().addClass('dotactive');
                $('.mediareportul').animate({'margin-left':'+=860px'},1000,function(){
                });
            }
        }
        // (function(data){
        //     var obj = document.getElementById('section-words'),
        //         cont = document.getElementById('center-cont'),
        //         menu = document.getElementById('TVsaysmenu');
        //     var flag = document.createDocumentFragment();
        //     var timer1,timer2,m=0;
        //     function wordsshow(i){
        //         m = i;
        //         clearTimeout(timer1);
        //         var k = 3;
        //         timer1 = setInterval(function(){
        //             if(k < 20){
        //                 var v = 100 / 20;
        //                 cont.style.opacity = v * k / 100;
        //                 if(k==3){
        //                     obj.getElementsByTagName('p')[0].innerHTML = data[i].info;
        //                     obj.getElementsByTagName('span')[0].innerHTML = data[i].title;
        //                 }
        //                 k++;
        //             }
        //         },80)
        //         for(var s=0,j=menu.getElementsByTagName('a').length;s<j;s++){
        //             if(s==i){
        //                 menu.getElementsByTagName('a')[s].className = 'active';
        //             }else{
        //                 menu.getElementsByTagName('a')[s].className = '';
        //             }
        //         }
        //     }
        //     for(var i=0,l=data.length;i<l;i++){
        //         var a = document.createElement('a'),
        //             img = document.createElement('img');
        //         a.setAttribute('href','javascript:void(0);');
        //         img.src = data[i].src;
        //         a.appendChild(img);
        //         flag.appendChild(a);
        //         (function(i){
        //             a.onmouseover = function(){
        //                 clearInterval(timer2);
        //                 wordsshow(i);
        //             }
        //             a.onmouseout = function(){
        //                 if(i>=2){m=-1}
        //                 wordsfocus(m+1);
        //             }
        //             cont.onmouseover = function(){
        //                 clearInterval(timer2);
        //             }
        //             cont.onmouseout = function(){
        //                 if(m>=2){m=-1}
        //                 wordsfocus(m+1);
        //             }
        //         })(i)
        //     }
        //     menu.appendChild(flag);
        //     menu.getElementsByTagName('a')[0].onmouseover();
        //     function wordsfocus(m){
        //         timer2 = setInterval(function(){
        //             wordsshow(m++);
        //             if(m>=3){m=0}
        //         },3000)
        //     }
        //     wordsfocus(1);
        // }(data))
    };
    /*---------A+计划---------*/
    exports.plusAll=function(){
        var arr=[51,257,460,665];
        var n=0;
        var timer2=null;
        $('.section1 ul li').mouseenter(function(){
            clearInterval(timer2);
            var index=$('.section1 ul li').index(this);
            n=index;
            tab();
        });
        $('.section1 ul li').mouseleave(function(){
            timer2=setInterval(function(){
                if(n>=3){
                    n=0
                }else{
                    n++;
                }
                tab();
            },2000)
        });
        timer2=setInterval(function(){
            if(n>=3){
                n=0
            }else{
                n++;
            }
            tab();
        },2000);
        $('.section1 p').mouseenter(function(){
            clearInterval(timer2);
        });
        $('.section1 p').mouseleave(function(){
            timer2=setInterval(function(){
                if(n>=3){
                    n=0
                }else{
                    n++;
                }
                tab();
            },2000);
        });
        function tab(){
            $('.section1 p').hide();
            $('.section1 p').eq(n).show();
            $('.section1 ul li').find('a').removeClass('active');
            $('.section1 ul li').eq(n).find('a').addClass('active');
            $('.line .dot').css('left',arr[n]);
        }
     
        //验证
        var bReady=false;
        function check(obj){
            if(bReady==false){
                var arr=[];
                $(obj).find('input').each(function() {
                    this.name!=='verify'&&arr.push($(this).attr('name'));
                });
                for(var i=0; i<arr.length; i++){
                    if($(obj).find('input[name='+arr[i]+']').val()==''){
                        $(obj).parents('.box').find('.error-tip span').html($(obj).find('input[name='+arr[i]+']').next('span').html()+'不能为空')
                        $(obj).parents(parent).find('.error-tip').show();
                        return;
                    }else{
                        if(arr[i]=='mail'){
                            var reg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                            if(reg.test($(obj).find('input[name='+arr[i]+']').val())==false){
                                $(obj).parents('.box').find('.error-tip span').html('邮箱格式错误，请重新输入')
                                $(obj).parents('.box').find('.error-tip').show();
                                return;
                            }
                        }if(arr[i]=='pass'){
                            var reg=/^(.{6,18})$/;
                            if(reg.test($(obj).find('input[name='+arr[i]+']').val())==false){
                                $(obj).parents('.box').find('.error-tip span').html('请输入6-18位密码');
                                $(obj).parents('.box').find('.error-tip').show();
                                return;
                            }
                        }if(arr[i]=='mobile'){
                            var reg=/^0?(1[3|5|7|8][0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
                            if(reg.test($(obj).find('input[name='+arr[i]+']').val())==false){
                                $(obj).parents('.box').find('.error-tip span').html('手机号码格式不对');
                                $(obj).parents('.box').find('.error-tip').show();
                                return;
                            }
                        }
                        else{
                            $(obj).parents('.box').find('.error-tip').hide();
                        }
                    }
                }
            }
            bReady=true;
        }
        
        $('#new-box input').keydown(function(event){
            if(event.keyCode==13 || event.keyCode==8){
                if($(this).val()==''){
                    $(this).next('span').show();
                }else{
                    $(this).next('span').hide();
                }
            }else{
                $(this).next('span').hide();
            }
        });
        $('#new-box input').keyup(function(event){
            if($(this).val()==''){
                $(this).next('span').show();
            }else{
                $(this).next('span').hide();
            }
            $('.error-tip').hide();
        });
        function clearAll(){
			 $("#new-box input[name=username]").val('');
			 $("#new-box input[name=username]").next('span').show();
			 $("#new-box input[name=school]").val('');
			 $("#new-box input[name=school]").next('span').show();
			 $("#new-box input[name=mail]").val('');
			 $("#new-box input[name=mail]").next('span').show();
			 $("#new-box input[name=mobile]").val('');
			 $("#new-box input[name=mobile]").next('span').show();
             $("#new-box input[name=verify]").val('');
             $("#new-box input[name=verify]").next('span').show();
			 $("#new-box input[name=code]").val('');
			 $("#new-box input[name=code]").next('span').show();
        };
        //短信验证码倒计时
        var phtimer = null;
        function setTime(time) {
            $("#phonecode b").html(time);
            if(time<=0){
                clearInterval(phtimer);
                $('#phonecode').removeClass('disabled').html('重新获取');
            }
        }
        function setDefaultTime(){
            clearInterval(phtimer);
            $("#phonecode").addClass('disabled').html('重新获取(<b>59</b>)');
            var time = 59;
            setTime(time);
            phtimer = setInterval(function () {
                setTime(--time);
            },1000)
        }
        //发送验证码
        $(document).on('click',"#phonecode",function(){
            if($(this).hasClass('disabled'))return;
        	var mobile = $("#new-box input[name=mobile]").val();
            var verify = $("#new-box input[name=verify]").val();
        	var reg=/^1\d{10}$/
        	if(reg.test(mobile)==false){
                $(this).parents('.box').find('.error-tip span').html('手机号码格式不对');
                $(this).parents('.box').find('.error-tip').show();
                return;
        	}else if(plugin.trim(verify)===''){
                $(this).parents('.box').find('.error-tip span').html('图片验证码不能为空');
                $(this).parents('.box').find('.error-tip').show();
                return;
            }else{
        		$(this).parents('.box').find('.error-tip').hide();
        	}
            setDefaultTime();
            var self = this;
            $(this).addClass('disabled');
        	API.utilApi_sendPhoneCode(mobile,verify,function(data){
                if(data.status==1){
                    plugin.openMsg('手机验证码已经发送到你的手机，请注意查收',0);
                }else{
                    if(data.info.indexOf('验证码')!=-1){
                        data.info = data.info.replace(/验证码/g,'图片验证码');
                    }
                    plugin.openMsg(data.info,1);
                    clearInterval(phtimer);
                    $(self).removeClass('disabled').html('重新获取');
                }
                // $(".reloadverify").click();
        	});
        });
        //点击注册
        $(document).on('click','.mf-btn',function(){
        	check('#new-box .input');
        	 if(bReady){
        		 $('.mf-btn').html('正在申请...');
        		 var username = $("#new-box input[name=username]").val();
        		 var school = $("#new-box input[name=school]").val();
        		 var email = $("#new-box input[name=mail]").val();
        		 var mobile = $("#new-box input[name=mobile]").val();
        		 var code = $("#new-box input[name=code]").val();
        		 API.userApi_applyAplus(username,school,email,mobile,code,function(data){
        			 if(data.status == 1){
        				 plugin.openMsg(data.info,0);
        				 clearAll();
                         var content = '<div class="sq-progress-lqinfo success">\
                                            <a href="javascript:;" class="close"></a>\
                                            <h3>已成功提交了课堂派机构的申请</h3>\
                                            <p>'+data.info+'</p>\
                                        </div>';
                        layer.open({
                            type: 1,
                            title:false,
                            closeBtn: false,
                            area: ['600px', '275px'],
                            content: content,
                            shift: 7,
                            moveType: 1,
                            success:function(content){
                                clearInterval(phtimer);
                                $('#phonecode').removeClass('disabled').html('获取验证码');
                            }
                        })
        			 }else{
                        $(".reloadverify").click();
        				 $('#new-box').find('.error-tip span').html(data.info);
        				 $('#new-box').find('.error-tip').show();
        			 }
        			 $('.mf-btn').html('免费申请');
        		 });
        		 bReady = false;
        	 }
        });
        $(document).on('click','.sq-progress-lqinfo .close',function(){
            layer.closeAll();
        });
        //点击免费注册滑下
        var timer=null;
        var bInterval=true;
        $('#appealopen').click(function(){
            clearInterval(timer);
            timer=setInterval(function(){
                var scrollT=$(document).scrollTop();
                var iSpeed=(3210-scrollT)/5;
                iSpeed=iSpeed>3210?Math.ceil(iSpeed):Math.floor(iSpeed);
                if(3210==scrollT){
                    clearInterval(timer);
                }else{
                    bInterval=true;
                    scrollT+=iSpeed;
                    $(document).scrollTop(scrollT);
                }
            },30);
            return false;
        });
        $(window).scroll(function(){
            var scrollT=$(document).scrollTop();
            if(bInterval==false){
                clearInterval(timer);
            }
            bInterval=false;
        });
        //刷新验证码
        require.async('/Public/Home/js/indextop.js',function(it){
            it.RefreshImg();
        })

    };

    /*---------帮助中心---------*/
    var editor = {};
    exports.helpAll=function(){
        if($('.search-list li').length==0){
            $('.search-cont-list .no-result').show()
        }else{
            $('.search-cont-list .no-result').hide()
        }
        $('#search-txt').focus(function(){
            $('.search-box .bd').show();
        });
        $('#search-txt').blur(function(){
            $('.search-box .bd').hide();
        });
        //计算高度
        var arr=[];
        $('.help-page .ques-box .box>ul>li').each(function(){
            arr.push($(this).outerHeight());
        });
        $('.help-page .ques-box .box>ul>li').css('height',Math.max.apply(null,arr));
        //点击选择帮助选项
        $('.advice-box .choose span').click(function(){
            $('.c-list').show();
            return false;
        });
        $(document).on('click','.advice-box .c-list a',function(){
            $('.advice-box .choose span').html($(this).html());
        });
        $(document).click(function(){
            $('.advice-box .choose .c-list').hide();
        });
        exports.search();
        
        
		//帮助视频切换
		$(document).on('hover','.videoTab dl dd',function(){
			$(this).addClass('active').siblings().removeClass('active');
			var index = $(this).index();
			if(index == 0){
				$('.teachervList').show();
				$('.studentvList').hide();
			}else{
				$('.teachervList').hide();
				$('.studentvList').show();
			};
		});

        $(document).on('click','.teachervList ul li,.studentvList ul li',function(){
            var index = $(this).attr('data-index');
            var url = "//assets.ketangpai.com/webvideo/"+index+".mp4";
            var data = {};
            data.url = url;
            var html = template('tpl-video',data);
            $('body').append(html);
            $('.pop-bg').show();
            $('video').get(0).play();
        });
        $(document).on('click','.studentvList ul li',function(){
            var index = $(this).attr('data-index');
        });
        $(document).on('click','.video-play .cancel',function(){
            //$('video').get(0).pause();
            $(this).parents('.video-play').remove();
            $('.pop-bg').hide();
           // $('video').trigger('pause');

        });
        $(document).on('click','.pop-bg',function(){
            $('.video-play .cancel').click();
        })
        editor = new Simditor({
              textarea: $('#txt-content'),
              placeholder: '这里输入你反馈的问题...',
              pasteImage: true,
              toolbarFloat: false,
              toolbar: ['title', 'bold','ol', 'ul','image'],
              defaultImage: '/Public/Common/js/lib/simditor-1.0.3/images/image.png',
              upload:{
                    url: '/UploadApi/upload',
                    leaveConfirm: '正在上传文件，如果离开上传会自动取消'
              }
        });
        // exports.feedback();
        //反馈部分
        $(document).on('click','#send-feedback',function(){
            var type = $(".choose.fl span").text();
            var email = $("#feedback-email").val();
            if(email == ''){
                $("#feedback-email").focus();
                plugin.openMsg('请填写你的邮箱地址',1);
                $("#feedback-email").focus();
                return;
            }
            if(!plugin.validEmail(email)){
                plugin.openMsg('邮箱格式错误',1);
                $("#feedback-email").focus();
                return;
            }
            if(editor.getValue() == ''){
                plugin.openMsg('反馈的内容不能为空',1);
                return;
            }
            API.helpApi_sendFeedback(type,email,editor.getValue(),function(data){
                if(data.status==1){
                    plugin.openMsg(data.info,0);
                    editor.setValue('');  
                    var content = '<div class="sq-progress-lqinfo success">\
                                        <a href="javascript:;" class="close"></a>\
                                        <h3>已成功反馈问题</h3>\
                                        <p>我们会在1个工作日内给您回复到邮箱'+email+'，请您注意查收邮件。</p>\
                                    </div>';
                    layer.open({
                        type: 1,
                        title:false,
                        closeBtn: false,
                        area: ['600px', '275px'],
                        content: content,
                        shift: 7,
                        moveType: 1,
                        success:function(content){
                            
                        }
                    })
                }
                
            });
        });
        $(document).on('click','.sq-progress-lqinfo .close',function(){
            layer.closeAll();
        });
        //点击放大图片
        $(document).on('click','.help-page .cont-box img',function(){
   		 	var obj = $(this);
   		 	if(!obj.hasClass('viewer-toggle')){
   		 		require.async(['lib/preview/viewer.css','lib/preview/viewer.js'],function(ev,ek){
   		 			obj.viewer({
	                    navbar: false,
	                    title: false,
	                    button:true,
	                    simple:true,
	                    fullscreen: false,
	                    inbody:true,
	                    keyboard: false,
	                    url: 'data-src',
	                    show: function() {          
	                    }
   		 			});
   		 			obj.click();
   		 		}); 
   		 	}
        });
    };
    /**********反馈信息发送*************/
    exports.search = function(){
    	$(document).on('click','#btn-search',function(){
    		var txt = $("#search-txt").val();
    		if(txt == ''){
    			return false;
    		}else{
    			location.href="/Help/search/txt/"+txt;
    		}
    	});
    	$(document).on('keyup',"#search-txt",function(event){
    		var txt = $("#search-txt").val();
        	if(event.keyCode==13){
        		if(txt == ""){
        			return false;
        		}
        		location.href="/Help/search/txt/"+txt;
        	}
    	});
    };
    //密码重置
    exports.resetpassword = function(){
        $('.input input').focus(function(){
            $(this).parent().addClass('focus');
            $(this).parents('.input').find('.error-tips').remove();
        }).blur(function(){
            $(this).parent().removeClass('focus');
        });
    	$(document).on('click','.send-btn',function(){
        	var uid = $(".forget-page").attr('data-uid');
        	var expires = $(".forget-page").attr('data-expires');
        	var sign = $(".forget-page").attr('data-sign');
        	var password = $("#password").val();
            var repass= $("#repassword").val();
            $('.error-tips').remove();
            var bReady=false;
            var bReady2=false;
            if(password==''){
                var html=$('<p class="error-tips">输入新密码不能为空</p>')
                $('#password').after(html);
                bReady=false;
            }else{
                var reg=/^(.{6,24})$/;
                if(reg.test(password)==false){
                    var html=$('<p class="error-tips">请输入6-24位密码</p>')
                    $('#password').after(html);
                    bReady=false;
                }else{
                    bReady=true;
                }
            }
            if(repass==''){
                var html=$('<p class="error-tips">确认新密码不能为空</p>')
                $('#repassword').after(html);
                bReady2=false;
            }else{
                if(repass!=password){
                    var html=$('<p class="error-tips">两次密码不一致</p>');
                    $('#repassword').after(html);
                    bReady2=false;
                }else{
                    bReady2=true;
                }
            }
            if(bReady==true && bReady2==true){
                API.userApi_resetPassword(uid,password,expires,sign,function(data){
                	if(data.status == 1){
                		plugin.openMsg('密码修改成功，你可以进行登录',0);
                		location.href = "/User/login.html";
                	}else{
                		plugin.openMsg(data.info,1);
                	}
                });
            }
    	});
        $(document).on('blur','.input input',function(){
            var oV=$(this).val();
            var oTag=$(this).prev('span').html();
            oTag=oTag.substring(0,oTag.length - 1);
            var oName=$(this).attr('name');
            $(this).next('.error-tips').remove();
            var oV1=$('#password').val();
            if(oV==''){
                //var html=$('<p class="error-tips">'+oTag+'不能为空'+'</p>')
                //$(this).after(html)
            }else{
                if(oName=='pass'){
                    var reg=/^(.{6,24})$/;
                    if(reg.test(oV)==false){
                        var html=$('<p class="error-tips">请输入6-24位密码</p>');
                        $(this).after(html);
                    }
                }
                if(oName=='repass'){
                    if(oV!=oV1){
                        var html=$('<p class="error-tips">两次密码不一致</p>');
                        $(this).after(html);
                    }
                }
            }
        })
    };
    //校园侠客行
    exports.campus = function(){
    	$(document).on('click','#formbtn',function(){
    		var username = $("input[name=username]").val();
    		if(username == ""){
    			$("input[name=username]").focus();
    			plugin.openMsg('姓名不能为空',1);
    			return false;
    		}
    		var school = $("input[name=school]").val();
    		if(school == ""){
    			$("input[name=school]").focus();
    			plugin.openMsg('学校不能为空',1);
    			return false;
    		}
    		var mobile = $("input[name=mobile]").val();
    		if(mobile == ""){
    			$("input[name=mobile]").focus();
    			plugin.openMsg('手机号码不能为空',1);
    			return false;
    		}
    		var qq = $("input[name=qq]").val();
    		if(qq == ""){
    			$("input[name=qq]").focus();
    			plugin.openMsg('QQ号码不能为空',1);
    			return false;
    		}
    		API.helpApi_sendCampus(username,school,mobile,qq,function(data){
    			plugin.openMsg(data.info,0);
    			$("input[name=username]").val('');
    			$("input[name=school]").val('');
    			$("input[name=mobile]").val('');
    			$("input[name=qq]").val('');
    		});
    	});
    };
});
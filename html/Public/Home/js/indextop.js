/**
 * Created by Administrator on 2015/5/29.
 */
define(function(require,exports,module){
    window.$=window.jQuery=$=require('jquery');
    var API = require('API');
    var layer = require('layer');
    var plugin = require("plugin");
    var domain = $("#wechatLogin").attr('data-domain');
    if(domain == ""){
    	domain = "www";
    }
    function wechatlogin(){
    	API.userApi_getWechatThirdPardLoginConf(function(tData){
    		var redirect_uri = tData.conf.redirect_uri+"?domain="+domain;
    		var appid = tData.conf.appid;
        	var obj = new WxLogin({
                id:"login_container", 
                appid: appid,
                scope: "snsapi_login",
                redirect_uri: redirect_uri,
                state: "ketangapi",
                style: "black",
        	});
    	});
    };
    //刷新验证码
    exports.RefreshImg = function(){
    	$(".verifyimg").attr("src","http://localhost:8080/verify/img");
		var verifyimg = $(".verifyimg").attr("src");
        $(".reloadverify").click(function(){
            if( verifyimg.indexOf('?')>0){
                $(".verifyimg").attr("src", verifyimg+'&random='+Math.random());
            }else{
                $(".verifyimg").attr("src", verifyimg.replace(/\?.*$/,'')+'?'+Math.random());
            }
        });
    }
    exports.loginAll=function(layercallback) {
    	var ieModel = plugin.getBrowserType();
    	if(ieModel == "IE9" || ieModel == "IE8" || ieModel == "IE7" || ieModel == "IE6"){
    		location.href = "/Index/older.html";
    	}
      
        $('.login-box input').eq(0).focus().parent().addClass('focus');
        //老师注册弹窗
        $('.identity-box .teacher').click(function(){
        	  exports.RefreshImg();
            $('.identity-box').hide();
            $('#tea-reg').show();
            $('#tea-reg input').eq(0).focus();
            $(".reloadverify").click();
            return false;
        });
        //学生注册弹窗
        $('.identity-box .student').click(function(){
        	  exports.RefreshImg();
            $('.identity-box').hide();
            $('#stu-reg').show();
            $('#stu-reg input').eq(0).focus();
            $(".reloadverify").click();
            return false;
        });
        $('.login-box .return').click(function(){
            $('.input .error-tips').remove();
            $(this).parents('.login-box').hide();
            $('.identity-box').show();
            return false;
        });

        //自动登录选中
        $('#login .auto-login').click(function(){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
            }else{
                $(this).addClass('active');
            }
        });

        //登录切换
        $(document).on('click','.login-box .items a',function(){
            $('.input .error-tips').remove();
            var index=$(this).index();
            if(index==0){
                $(this).addClass('active').siblings().removeClass('active');
                $('.tel-login').addClass('hide');
                $('.pt-login').removeClass('hide');
                $('.pt-login input').eq(0).focus();
            }else if(index==1){
                $(this).addClass('active').siblings().removeClass('active');
                $('.pt-login').addClass('hide');
                $('.tel-login').removeClass('hide');
                $('.tel-login input').eq(0).focus();
            }else if(index==2){
            	$('.qr-sj').click();
            }
        });

        $(' .login-box input').keydown(function(event){
            if(event.keyCode==13 || event.keyCode==8){
                if($(this).val()==''){
                    $(this).next('span').show();
                }else{
                    $(this).next('span').hide()
                }
            }else{
                $(this).next('span').hide()
            }
        });
        $('.login-box input').keyup(function(){
            $('.error-tip').hide();
        });

        $('.login-box input').focus(function(){
            $(this).parent().addClass('focus');
            $(this).parents('.input').find('.error-tips').remove();
        }).blur(function(){
            $(this).parent().removeClass('focus');
        });

        //验证
        var bReady=false;
        function check(obj){
            if(bReady==false){
                var arr=[];
                var oTag=[];
                $(obj).find('input').each(function() {
                    arr.push($(this).attr('name'));
                });
                $(obj).find('.error-tips').remove();
                for(var i=0; i<arr.length; i++){
                    if($(obj).find('input[name='+arr[i]+']').val()==''){
                        oTag[i]=$(obj).find('span').eq(i).html();
                        oTag[i]=oTag[i].substring(0,oTag[i].length - 1);
                        var html=$('<p class="error-tips">'+oTag[i]+'不能为空'+'</p>');
                        $(obj).find('input[name='+arr[i]+']').after(html);
                    }else{
                        if(arr[i]=='mail'){
                        	var reg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                            if(reg.test($(obj).find('input[name='+arr[i]+']').val())==false){
                                var html=$('<p class="error-tips">邮箱格式错误，请重新输入</p>')
                                $(obj).find('input[name='+arr[i]+']').after(html);
                            }
                        }else if(arr[i]=='mailtel'){
                            var reg= /^1\d{10}$/
                            var reg2= /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                            if(reg.test($(obj).find('input[name='+arr[i]+']').val())==false && reg2.test($(obj).find('input[name='+arr[i]+']').val())==false){
                                var html=$('<p class="error-tips">邮箱或手机号码格式错误</p>')
                                $(obj).find('input[name='+arr[i]+']').after(html);
                            }
                        }else if(arr[i]=='pass'){
                            var reg=/^(.{6,24})$/;
                            if(reg.test($(obj).find('input[name='+arr[i]+']').val())==false){
                                var html=$('<p class="error-tips">请输入6-24位密码</p>')
                                $(obj).find('input[name='+arr[i]+']').after(html);
                            }
                        }else if(arr[i]=='tel'){
                            var reg=/^1\d{10}$/;
                            if(reg.test($(obj).find('input[name='+arr[i]+']').val())==false){
                                var html=$('<p class="error-tips">手机号码格式错误</p>')
                                $(obj).find('input[name='+arr[i]+']').after(html);
                            }
                        }
                        if(i==arr.length-1){
                            if($('.input .error-tips').length==0){
                                bReady=true;
                            }
                        }
                    }
                }
            }

        }

        //失焦验证
        $(document).on('blur','.input input',function(){
            var oV=$(this).val();
            var oTag=$(this).prev('span').html();
            oTag=oTag.substring(0,oTag.length - 1);
            var oName=$(this).attr('name');
            $(this).next('.error-tips').remove();
            if(oV==''){
                //var html=$('<p class="error-tips">'+oTag+'不能为空'+'</p>')
                //$(this).after(html);
            }else{
                if(oName=='tel'){
                    var reg= /^1\d{10}$/;
                    if(reg.test(oV)==false){
                        var html=$('<p class="error-tips">手机号码格式错误</p>');
                        $(this).after(html);
                    }
                }
                if(oName=='mailtel'){
                    var reg= /^1\d{10}$/
                    var reg2= /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                    if(reg.test(oV)==false && reg2.test(oV)==false){
                        var html=$('<p class="error-tips">邮箱或手机号码格式错误</p>');
                        $(this).after(html);
                    }
                }
                if(oName=='pass'){
                    var reg=/^(.{6,24})$/;
                    if(reg.test(oV)==false){
                        var html=$('<p class="error-tips">请输入6-24位密码</p>');
                        $(this).after(html);
                    }
                }
            }
        });

        //点击帐号登录
        $('#login .pt-login .btn-btn,#login.bind .btn-btn').click(function(){
            $('.error-tips').remove();
            check('#login .pt-login .input');
            check('#login.bind .input');
            var obj = $(this);
            if(bReady==true){
                var remember;
                if($('.pt-login .auto-login').hasClass('active')){
                    remember=1;
                }else{
                    remember=0;
                }
                obj.html('正在登录...');
                var email  = $("#login input[name=account]").val();
                var password=$("#login input[name=pass]").val();
                API.userApi_login(email,password,remember,function(data){
                	if(data.status == 1){
                		localStorage["uid"] = data.uid;
                        if(layercallback!=null){
                            layercallback();
                        }else{
                            location.href=data.url;
                        }
                        bReady=false;
                	}else{
                        var error=data.info;
                        if(error.indexOf('用户')==-1){
                            var html=$('<p class="error-tips">'+error+'</p>');
                            $('#login .input').eq(1).append(html);
                        }else{
                            var html=$('<p class="error-tips">'+error+'</p>');
                            $('#login .input').eq(0).append(html);
                        }
                        bReady=true;
                	}
                	obj.html('登录');
                });

            }
        });
        //点击手机号登录
        $('#login .tel-login .btn-btn').click(function(){
            $('.error-tips').remove();
            check('#login .tel-login .input');
            var obj = $(this);
            if(bReady==true){
                var remember;
                if($('.tel-login .auto-login').hasClass('active')){
                    remember=1;
                }else{
                    remember=0;
                }
                obj.html('正在登录...');
                var mobile  = $("#login input[name=tel]").val();
                var code=$("#login input[name=yzm]").val();
                API.userApi_loginByMobile(mobile,code,remember,function(data){
                    if(data.status == 1){
                    	localStorage["uid"] = data.uid;
                        if(layercallback!=null){
                            layercallback();
                        }else{
                            location.href=data.url;
                        }
                        bReady=false;
                    }else{
                        var error=data.info;
                        if(error.indexOf('手机')==-1){
                            var html=$('<p class="error-tips">'+error+'</p>');
                            $('#login .tel-login .input').eq(1).append(html);
                        }else{
                            var html=$('<p class="error-tips">'+error+'</p>');
                            $('#login .tel-login .input').eq(0).append(html);
                        }
                        bReady=true;
                    }
                    obj.html('登录');
                });

            }
        });
        //获取验证码
        var timer=null;
        $(document).on('click','#login .tel-login .get-yzm:not(".nod")',function(){
            var oTel=$('.tel-login .input input').eq(0).val();
            if(oTel==''){
                $('#login .tel-login .input .error-tips').eq(0).remove();
                var html = $('<p class="error-tips">手机号不能为空</p>');
                $('#login .tel-login .input').eq(0).append(html);
                return;
            }
            var reg= /^1\d{10}$/;
            var _this=$('#login .tel-login .get-yzm:not(".nod")');
            if(reg.test(oTel)==false){
                $('#login .tel-login .input .error-tips').eq(0).remove();
                var html = $('<p class="error-tips">手机号码格式错误</p>');
                $('#login .tel-login .input').eq(0).append(html);
                return;
            }
            clearInterval(timer);
            $("#picyzmshow").show();
            $("#picyzm").attr("src", '/UserApi/verify.html?'+Math.random());
        });
        $('#picyzmshow').on('click',function(e){
            e.stopImmediatePropagation();
            e.stopPropagation();
            closemyshade();
        })
        $('#picyzm').on('click',function(e){
            var verifyimg = $('#picyzm').attr('src');
            $("#picyzm").attr("src", '/UserApi/verify.html'.replace(/\?.*$/,'')+'?'+Math.random());
            $('#picyzminput').val('');
            e.stopImmediatePropagation();
            e.stopPropagation();
        });
        $('#picyzminput').on('click',function(e){
            e.stopImmediatePropagation();
            e.stopPropagation();
        });
        $('.picyzmok').on('click',function(e){
            var v = $('#picyzminput').val();
            API.UserApi_checkVerify(v,function(data){
                if(data.status == 1){
                    closemyshade();
                    getmsgyzm(v);
                }else{
                    // console.info($('#picyzm'));
                    plugin.openMsg(data.info,1);
                    $('#picyzm').trigger('click');
                    $('#picyzminput').val('').focus();
                }
            });
            
            e.stopImmediatePropagation();
            e.stopPropagation();
        });
        function closemyshade(){
            $('#picyzmshow').hide();
        }
        function getmsgyzm(v){
            var oTel=$('.tel-login .input input').eq(0).val();
            if(oTel==''){
                $('#login .tel-login .input .error-tips').eq(0).remove();
                var html = $('<p class="error-tips">手机号不能为空</p>');
                $('#login .tel-login .input').eq(0).append(html);
                return;
            }
            var reg= /^1\d{10}$/;
            var _this=$('#login .tel-login .get-yzm:not(".nod")');
            if(reg.test(oTel)==false){
                $('#login .tel-login .input .error-tips').eq(0).remove();
                var html = $('<p class="error-tips">手机号码格式错误</p>');
                $('#login .tel-login .input').eq(0).append(html);
                return;
            }else{
                API.userApi_sendCode(oTel,v,function(data){
                    var error=data.info;
                    if(data.status == 1){
                        var count=60;
                        $(_this).html('重新获取（'+count+'）').addClass('nod');
                        timer=setInterval(function(){
                            count--;
                            $(_this).html('重新获取（'+count+'）');
                            if(count==0){
                                clearInterval(timer);
                                $(_this).html('重新获取').removeClass('nod');
                            }
                        },1000)

                    }else{
                        if(error.indexOf('手机')!=-1) {
                            var html = $('<p class="error-tips">' + error + '</p>');
                            $('#login .tel-login .input .error-tips').eq(0).remove();
                            $('#login .tel-login .input').eq(0).append(html);
                        }else{
                            $('.yzm-box .error-tips').remove();
                            $('#login .tel-login .input .error-tips').eq(1).remove();
                            var html = $('<p class="error-tips">' + error + '</p>');
                            $('#login .tel-login .input').eq(1).append(html);
                        }
                    }
                });
            }
        }
        //回车时，进行登录操作
        $(document).on('keyup',function(event){
        	if(event.keyCode == 13){
        		if(!$("#login").is(":hidden")){
        			$('#login .btn-btn').click();
        		}
        		if(!$("#stu-reg").is(":hidden")){
        			$('#stu-reg .btn-btn').click();
        		}
        		if(!$("#tea-reg").is(":hidden")){
        			$('#tea-reg .btn-btn').click();
        		}
        	}
        });
        //学生注册
        $('#stu-reg .btn-btn').click(function(){
            clearInterval(timer)
            check('#stu-reg .input');
            var obj = $(this);
            if(bReady==true){
            	var email  = $("#stu-reg input[name=mailtel]").val();
            	var password=$("#stu-reg input[name=pass]").val();
            	var username=$("#stu-reg input[name=name]").val();
            	var school = $("#stu-reg input[name=school]").val();
            	var stno = $("#stu-reg input[name=id]").val();
            	var verify = $("#stu-reg input[name=verify]").val();
                var reg= /^1\d{10}$/;
                    obj.html('正在注册...');
                    API.userApi_sendRegisterCode(verify,function(data){
                    	if(data.status==1){
                    		 API.userApi_registerStudent(email,password,school,stno,username,function(data){
                    			if(data.status == 1){
                        			localStorage["uid"] = data.uid;
                            		location.href=data.url;
                            		bReady=false;
                        		}else{
                           		var html=$('<p class="error-tips">'+data.info+'</p>');
                            		$('#stu-reg .input').eq(0).append(html);
                            		bReady=true;
                            		obj.html('注册为学生');
                        		}
                        		obj.html('注册为学生');
                    		});
                    	}else{
                    		var html=$('<p class="error-tips">'+data.info+'</p>');
                            		$('#stu-reg .input').eq(0).append(html);
                            		bReady=true;
                    	}
                    });             
            }
        });
        //老师注册
        $('#tea-reg .btn-btn').click(function(){
            clearInterval(timer)
            check('#tea-reg .input');
            var obj = $(this);
            if(bReady==true){
            	var email  = $("#tea-reg input[name=mailtel]").val();
            	var password=$("#tea-reg input[name=pass]").val();
            	var username=$("#tea-reg input[name=name]").val();
            	var school = $("#tea-reg input[name=school]").val();
            	var verify = $("#tea-reg input[name=verify]").val();
                var reg= /^1\d{10}$/;
                    obj.html('正在注册...');
                    API.userApi_sendRegisterCode(verify,function(data){
                    	if(data.status==1){
                   	 		API.userApi_registerTeacher(email,password,school,username,function(data){
                    			if(data.status == 1){
                        			localStorage["uid"] = data.uid;
                            		location.href=data.url;
                            		bReady=false;
                        		}else{
                            		var html=$('<p class="error-tips">'+data.info+'</p>');
                            		$('#tea-reg .input').eq(0).append(html);
                            		bReady=true;
                            		obj.html('注册为老师');
                        		}
                        		obj.html('注册为老师');
                    		});
            			}else{
                    		var html=$('<p class="error-tips">'+data.info+'</p>');
                            		$('#tea-reg .input').eq(0).append(html);
                            		bReady=true;
                    	}
        		});
            }
        });
        $(document).on('click','.tel-validate .close',function(){
            clearInterval(timer);
            $('.tel-validate input').val('');
            $('.tel-validate .words span').html('');
            $('.tel-validate').hide();
            $('.pop-bg').hide();
        });

        $(document).on('click','.tel-validate .get-yzm:not(".nod")',function(){
            clearInterval(timer)
            var verify = $("input[name=verify]").val();
            var oTel=$('.tel-validate .words span').html();
            oTel=oTel.substring(1,oTel.length-1);
            var _this=this;
            API.userApi_sendRegisterCode(oTel,verify,function(data){
                if(data.status==1){
                    var count=60;
                    $(_this).html('重新获取（'+count+'）').addClass('nod');
                    timer=setInterval(function(){
                        count--;
                        $(_this).html('重新获取（'+count+'）');
                        if(count==0){
                            clearInterval(timer);
                            $(_this).html('重新获取').removeClass('nod');;
                        }
                    },1000);
                }else{
                    $('.tel-validate .error-tips').remove();
                    var html = $('<p class="error-tips">' + data.info + '</p>');
                    $('.tel-validate .input').append(html);
                }

            })
        });
        $(document).on('click','#tel-validate-tea .button',function(){
            var code=$('.tel-validate .yzm-box input').val();
            $('.error-tips').remove();
            if(code==''){
                var html=$('<p class="error-tips">验证码不能为空</p>');
                $('.tel-validate .input').eq(0).append(html);
                return;
            }else{
                var email  = $("#tea-reg input[name=mailtel]").val();
                var password=$("#tea-reg input[name=pass]").val();
                var username=$("#tea-reg input[name=name]").val();
                var school = $("#tea-reg input[name=school]").val();
                API.userApi_registerTeacher(email,password,school,username,code,function(data){
                    if(data.status == 1){
                        location.href=data.url;
                        bReady=false;
                    }else{
                        var html=$('<p class="error-tips">'+data.info+'</p>');
                        $('.tel-validate .input').eq(0).append(html);
                        bReady=true;
                    }

                });
            }
        })
        $(document).on('click','#tel-validate-stu .button',function(){
            $('.error-tips').remove();
            var code=$('.tel-validate .yzm-box input').val();
            if(code==''){
                var html=$('<p class="error-tips">验证码不能为空</p>');
                $('.tel-validate .input').eq(0).append(html);
                return;
            }else{
                var email = $("#stu-reg input[name=mailtel]").val();
                var password=$("#stu-reg input[name=pass]").val();
                var username=$("#stu-reg input[name=name]").val();
                var school = $("#stu-reg input[name=school]").val();
                var stno = $("#stu-reg input[name=id]").val();
                var reg= /^1\d{10}$/;
                API.userApi_registerStudent(email,password,school,stno,username,code,function(data){
                    if(data.status == 1){
                        location.href=data.url;
                        bReady=false;
                    }else{
                        var html=$('<p class="error-tips">'+data.info+'</p>');
                        $('.tel-validate .input').eq(0).append(html);
                        bReady=true;
                    }

                });
            }
        })
    }
});
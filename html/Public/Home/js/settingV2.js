/**
 * Created by Administrator on 2015/12/28.
 */
define(function(require,exports,module){
    window.$=window.jQuery=$=require('jquery');
    var template = require('art-template');
    var plugin = require('plugin');
    var API = require('API');
    var layer = require('layer');
    template.helper('year_month_day', function (unixTime) {
        return plugin.time_format_year_month_days(unixTime);
    });
    template.helper('year_month_day_hour_min', function (unixTime) {
        return plugin.time_format_year_month_day_hour_min(unixTime);
    });
    exports.RefreshImg = function(){
		var verifyimg = $(".verifyimg").attr("src");
        $(".reloadverify").click(function(){
            if( verifyimg.indexOf('?')>0){
                $(".verifyimg").attr("src", verifyimg+'&random='+Math.random());
            }else{
                $(".verifyimg").attr("src", verifyimg.replace(/\?.*$/,'')+'?'+Math.random());
            }
        });
    }
    
    exports.all=function(){
    	exports.RefreshImg();
        //有锚点时自动点开并更换链接防止刷新再次点开
        function setAutoClick(){
            if(!window.location.hash){
                $('.item-change').children().eq(0).removeClass('hide').siblings().addClass('hide');
            }
            if(window.location.hash&&window.location.hash=='#setting'){
                $('.s-header .h-nav a').eq(1).trigger('click');
                window.location.href = window.location.href.replace(/setting$/,'');
            }
            if(window.location.hash&&window.location.hash=='#wenkuupload'){
                $('.s-header .h-nav a').eq(2).addClass('active').siblings().removeClass('active');
                $('.item-change').children().eq(2).removeClass('hide').siblings().addClass('hide');
                setWenkuType(0,1);
                // window.location.href = window.location.href.replace(/wenkuupload$/,'');
            }
            if(window.location.hash&&window.location.hash=='#wenkudown'){
                $('.s-header .h-nav a').eq(2).addClass('active').siblings().removeClass('active');
                $('.item-change').children().eq(2).removeClass('hide').siblings().addClass('hide');
                setWenkuType(2,1);
                // window.location.href = window.location.href.replace(/wenkudown$/,'');
            }
        }
        var vipele = $('.viptxt.isvip');
        if(vipele.size()>0){
            API.userApi_getUserVipSetting(function(data){
                var txt = '会员将于'+(data.data.vipdate.days>20?plugin.time_format_year_month_days(data.data.vipdate.endtime):data.data.vipdate.days+'天后')+'到期'+(data.data.vipdate.days>20?'':'&nbsp;&nbsp;<a href="/VipActivity/pay" target="_blank">续费</a>');
                vipele.html(txt);
            })
        }
        //
        $(document).on('click','.uc-subtit .jifentxt',function(){
            var self = this;
            API.UserScoreApi_getScoreFlow(function(data){
                var source = '<div class="jifenTitle clearfix">'
                            +   '<span class="fl">积分记录</span>'
                            + '</div>'
                            + '<div class="jifenCont">'
                            + '{{if lists!=null&&lists.length>0}}'
                            +   '<ul>'
                            +    '{{each lists as value i}}'
                            +        '<li class="readed"><span class="txt">{{value.content}} {{value.score}}</span><span class="time">{{year_month_day_hour_min value.createtime}}</span></li>'
                            +    '{{/each}}'
                            +   '</ul>'
                            +   '{{else}}<p style="text-align:center;color:#aaa;padding-bottom:20px;">暂时没有积分记录！</p>{{/if}}'
                            + '</div>';
                var render = template.compile(source);
                var html = render(data);
                var length = data.lists.length;
                var tipd = layer.tips(html,self, {
                    skin:'layer-ext-ding01',
                    area: ['340px',length>5?'310px':'auto'],
                    shift:5,
                    tips: 3,
                    time: 1000000,
                    success:function(content){
                        content.css({'left':'50%','margin-left':'-330px','z-index':'0'});
                        var ti = content.find('.layui-layer-TipsG');
                        ti.css({'left':'270px'});
                        if(ti.hasClass('layui-layer-TipsB')){
                            ti.clone().appendTo(ti.parent()).css({'border-bottom-color':'#fff','top':'-19px'});
                        }else{
                            ti.clone().appendTo(ti.parent()).css({'border-top-color':'#fff','bottom':'-19px'});
                        }
                        var cont = content.find('.jifenCont');
                        if(length>5){
                            cont.css({'position':'relative','overflow':'hidden'}).height(240);
                            require.async(['perfect-scrollbar','perfect-scrollbar-css'],function(){
                                cont.perfectScrollbar();
                            })
                        }else{
                            content.css({'height':'auto'});
                        }
                        $(document).on('click',function(e){
                            if($(e.target).closest(content).length===0){
                                layer.close(tipd);
                            }
                        })
                    }
                });
            })
            
        })
        //点击编辑出现输入框聚焦到最后
        $(document).on('focus','.txts',function(){
            plugin.moveEnd($(this).get(0))
        })
        //编辑基本资料
        $(document).on('click','.basic .edit-btn',function(){
            $(this).hide();
            $(this).next('.exit-edit').show();
            $(this).parents('ul').find('li').each(function(){
                $(this).find('.txts').val( $(this).find('span').html());
            });
            $(this).parents('ul').find('li .edit-box span').hide();
            $(this).parents('ul').find('li .edit-box .txts').show().eq(0).focus();
            $(this).parents('.options').find('.save-btn').removeClass('hide2');
        });
        //放弃编辑
        $(document).on('click','.basic .exit-edit',function(){
            $(this).hide();
            $(this).prev('.edit-btn').show();
            $(this).parents('ul').find('li .edit-box span').show();
            $(this).parents('ul').find('li .edit-box .txts').hide();
            $(this).parents('.options').find('.save-btn').addClass('hide2');
            $('.basic .edit-box b').remove();
        });
        //角色变更
        $(document).on('click','.rolechange .edit-btn',function(){
            $(this).hide();
            $(this).next('.exit-edit').show();
            $(this).parents('ul').find('li .edit-box span').hide();
            $(this).parents('ul').find('li .edit-box .radio1').removeClass('hide2');
            $(this).parents('ul').find('li .edit-box .radio2').removeClass('hide2');
            $(this).parents('.options').find('.save-btn').removeClass('hide2');
        });
        $(document).on('click','.rolechange .exit-edit',function(){
            $(this).hide();
            $(this).prev('.edit-btn').show();
            $(this).parents('ul').find('li .edit-box span').show();
            $(this).parents('ul').find('li .edit-box .radio1').addClass('hide2');
            $(this).parents('ul').find('li .edit-box .radio2').addClass('hide2');
            $(this).parents('.options').find('.save-btn').addClass('hide2');
            $('.basic .edit-box b').remove();
        });
        //保存角色变更
        $(document).on('click','.rolechange .save-btn',function(){
        	var span = $(this).parent().find('li .edit-box span');
        	var olderName = span.text();
        	var role = $(".rolechange input[type='radio']:checked").val();
        	var roleName = role==1?"老师":"学生";
        	var _this = this;
        	API.userApi_changeRole(localStorage["uid"],role,function(tData){
        		if(tData.status == 0){
        			plugin.cursoralert({
        				title:'系统提示',
        				info:tData.info,
        			});
        		}else{
        			if(tData.status == 1){
        				plugin.cursoralert({
        					title:'系统提示',
        					info:'变更成功了',
        					sure:'知道了',
        					sureCallback:function(){
        					}
        				});
        				span.text(roleName);
                		$(".rolechange .exit-edit").click();
        			}
           //          else if(tData.state == 5){
        			// 	plugin.cursoralert({
        			// 		title:'系统提示',
        			// 		info:'老师角色已经具备了学生的功能了，同时您为VIP用户，不需要转为学生角色的。如确实有需要，等VIP到期后，再自行变更',
        			// 		sure:'朕知道了',
        			// 	});
           //      		$(".rolechange .exit-edit").click();
        			// }else if(tData.state == -1){
        			// 	plugin.cursoralert({
        			// 		title:'系统提示',
        			// 		info:'您是学生VIP用户，暂不支持学生VIP转为老师的角色的功能，如有需要请联系我们：17718377645。或者待VIP到期后，再自行变更',
        			// 		sure:'朕知道了',
        			// 	});
           //      		$(".rolechange .exit-edit").click();
        			// }
        		}
        	});
        });
        
        var bReady=false;
        function check(obj){
            bReady=false;
            var arr=[];
            var oTag=[];
            $(obj).find('input').each(function() {
                arr.push($(this).attr('name'));
            });
            $(obj).find('b').remove();
            for(var i=0; i<arr.length; i++){
                if($(obj).find('input[name='+arr[i]+']').val()==''){
                    if(arr[i]=='code'){
                        var html=$('<b>验证码不能为空'+'</b>');
                        $(obj).find('input[name='+arr[i]+']').parents('.yzm').after(html);
                    }else{
                        oTag[i]=$(obj).find('input[name='+arr[i]+']').parents('.edit-box').prev('p').html();
                        oTag[i]=oTag[i].substring(0,oTag[i].length - 1);
                        var html=$('<b>'+oTag[i]+'不能为空'+'</b>');
                        $(obj).find('input[name='+arr[i]+']').after(html);
                    }

                }else{
                    if(arr[i]=='newemail'){
                        var reg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                        if(reg.test($(obj).find('input[name='+arr[i]+']').val())==false){
                            var html=$('<b>邮箱格式错误</b>')
                            $(obj).find('input[name='+arr[i]+']').after(html);
                        }
                    }else if(arr[i]=='pass1' ||arr[i]=='newpass'||arr[i]=='oldpass'){
                        var reg=/^(.{6,24})$/;
                        if(reg.test($(obj).find('input[name='+arr[i]+']').val())==false){
                            var html=$('<b>请输入6-24位密码</b>')
                            $(obj).find('input[name='+arr[i]+']').after(html);
                        }
                    }else if(arr[i]=='mobile'){
                        var reg=/^1\d{10}$/;
                        if(reg.test($(obj).find('input[name='+arr[i]+']').val())==false){
                            var html=$('<b>手机号码格式错误</b>')
                            $(obj).find('input[name='+arr[i]+']').after(html);
                        }
                    }
                    if(i==arr.length-1){
                        if($(obj).find('b').length==0){
                            bReady=true;
                        }
                    }else{
                        bReady=false;
                    }
                }
            }
        }


        //保存基本资料
        $(document).on('click','.basic .save-btn',function(){
            check('.basic');
            var username=$('.basic').find('input[name=name]').val();
            var school=$('.basic').find('input[name=school]').val();
            var stno=$('.basic').find('input[name=stno]').val();
            if(typeof stno=='undefined'){
                stno='';
            }
            if(bReady==true){
                API.userApi_updateInfo(localStorage["uid"],username,school,stno,function(data){
                    $('.basic .edit-box span').each(function(){
                        $(this).html($(this).next('.txts').val());
                        $(this).show().next('.txts').hide();
                        $('.basic .save-btn').addClass('hide2');
                        $('.basic .edit-btn').show();
                        $('.basic .exit-edit').hide();
                    })
                    plugin.openMsg('保存成功',0)
                })
            }
        });
        $(document).on('keyup','.edit-box .txts', function () {
            $(this).next('b').remove();
        });

        $(document).on('blur','.edit-box .txts', function () {
            $(this).siblings('b').remove();
            var err=$(this).parents('.edit-box').prev('p').html()
            var errorTips=err.substring(0,err.length-1);
            if($(this).val()==''){
                //var html=$('<b>'+errorTips+'不能为空</b>')
                //$(this).after(html)
            }else{
                if($(this).attr('name')=='newemail'){
                    var reg= /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                    if(reg.test($(this).val())==false){
                        var html=$('<b>邮箱格式错误</b>')
                        $(this).after(html);
                    }
                }if($(this).attr('name')=='mobile'){
                    var reg= /^1\d{10}$/;
                    var _this=this;
                    if(reg.test($(this).val())==false){
                        var html=$('<b>手机号码格式错误</b>');
                        $(this).after(html);
                    }
                }if($(this).attr('name')=='oldpass'){
                    var oV=$(this).val();
                    if(oV.length<6){
                        var html=$('<b>请输入6-24位密码</b>')
                        $(this).after(html);
                    }
                }if($(this).attr('name')=='newpass'){
                    var oV=$(this).val();
                    if(oV.length<6){
                        var html=$('<b>请输入6-24位密码</b>')
                        $(this).after(html);
                    }
                    if(oV==$('.password .txts[name=surepass]').val()){
                        $('.password .txts[name=surepass]').next('b').remove();
                    }
                    if($('.password .txts[name=surepass]').val()!='' && $('.password .txts[name=surepass]').val()!==oV){
                        var html=$('<b>两次密码不一致</b>');
                        $('.password .txts[name=surepass]').next('b').remove();
                        $('.password .txts[name=surepass]').after(html);
                    }
                }if($(this).attr('name')=='surepass'){
                    var oV=$(this).val();
                    var oV2=$('.password input[name=newpass]').val();
                    if(oV!=oV2){
                        var html=$('<b>两次密码不一致</b>')
                        $(this).next('b').remove();
                        $(this).after(html);
                    }
                }
            }
        });

        $('.edit-box input').focus(function(){
            $(this).next('b').remove();
        });
        $('.mobile .yzm input').focus(function(){
            $(this).parents('.yzm').next('b').remove();
        });

        //编辑邮箱
        $(document).on('click','.account .change-mail',function(){
            $(this).parents('ul').addClass('hide');
            $(this).parents('ul').next('.mail').removeClass('hide').find('.exit-edit').show();;
            $(this).parents('ul').next('.mail').find('.txts').eq(0).focus();
        });

        //编辑点后
        $(document).on('click','.account .change-mobile',function(){
            $(this).parents('ul').addClass('hide');
            $(this).parents('ul').next().next('.mobile').removeClass('hide').find('.exit-edit').show();;
            $(this).parents('ul').next().next('.mobile').find('.txts').eq(0).focus();
        });

        //放弃编辑
        $(document).on('click','.account .exit-edit',function(){
            $(this).parents('.mail').addClass('hide');
            $(this).parents('.mobile').addClass('hide');
            $('.account>ul').removeClass('hide');
            $('.account b').remove();
        });
        //确认编辑
        $(document).on('click','.mail .save-btn',function(){
            check('.mail');
            var email=$('.mail').find('input[name=newemail]').val();
            var pass=$('.mail').find('input[name=pass1]').val();
            if(bReady==true){
                API.userApi_updateEmail(localStorage["uid"],pass,email,function(data){
                    if(data.status == 1){
                        $('.mail').addClass('hide');
                        $('.mail li:eq(0) span').html(email);
                        $('.mail li:eq(0) span').next('.unbind').remove();
                        $('.mail li:eq(0) span').after('<a href="javascript:;" class="unbind">解绑</a>');
                        $('.mail input').val('');
                        $('.account>ul').removeClass('hide');
                        $('.account>ul li:eq(1) .edit-box span').html(email);
                        $('.account>ul li .change-mail').html('修改邮箱').removeClass('blue');
                        plugin.openMsg('绑定成功',0);
                    }else{
                        var info=data.info;
                        if(info.indexOf('邮箱')!=-1){
                            var html=$('<b>'+info+'</b>');
                            $('.mail input[name=newemail]').next('b').remove();
                            $('.mail input[name=newemail]').after(html);
                        }
                        if(info.indexOf('密码')!=-1){
                            var html=$('<b>'+info+'</b>');
                            $('.mail input[name=pass1]').next('b').remove();
                            $('.mail input[name=pass1]').after(html);
                        }
                    }
                })
            }
        });

        //绑定手机
        $(document).on('click','.mobile .save-btn',function(){
            check('.mobile');
            var mobile = $('.mobile .txts').val();
            var code= $('.mobile').find('input[name=code]').val();
            if(bReady==true){
                API.userApi_updateMobile(mobile,code,function(data){
                    if(data.status == 1){
                        plugin.openMsg('绑定成功',0);
                        $('.mobile').addClass('hide');
                        $('.mobile li:eq(0) span').html(mobile);
                        $('.mobile input').val('');
                        $('.account>ul').removeClass('hide');
                        $('.account>ul li:eq(2) .edit-box span').html(mobile);
                        $('.mobile li:eq(0) span').next('.unbind').remove();
                        $('.mobile li:eq(0) span').after('<a href="javascript:;" class="unbind">解绑</a>');
                        $('.account>ul li .change-mobile').html('修改手机').removeClass('blue');
                        $('.mobile .yzm a').html('获取验证码').removeClass('getIng');
                    }else{
                        var info=data.info;
                        $('.mobile b').remove();
                        if(info.indexOf('手机')!=-1){
                            var html=$('<b>'+info+'</b>');
                            $('.mobile .txts').after(html);
                        }
                        if(info.indexOf('验证码')!=-1){
                            var html=$('<b>'+info+'</b>');
                            $('.mobile').find('input[name=code]').after(html);
                        }
                    }
                })
            }

        });
        //发送验证码
        var timer=null;
        $(document).on('click','.mobile .yzm a:not(".getIng")',function(){
            $('.mobile .yzm').next('b').remove();
            var phonenum=$('.mobile .txts').val();
            var verify = $('.mobile').find('input[name=verify]').val();
            var _this=this;
            if(phonenum==''){
                $('.mobile .txts').next('b').remove();
                $('.mobile .txts').after('<b>新手机不能为空</b>');
            }else{
                var reg=/^1\d{10}$/;
                if(reg.test(phonenum)==true){
                    API.userApi_checkMobile(phonenum,function(data){
                        if(data.status == 0){
                            var html=$('<b>'+data.info+'</b>');
                            $('.mobile .edit-box b').remove();
                            $('.mobile .txts').after(html);
                        }else{
                            clearInterval(timer);
                            API.utilApi_sendPhoneCode(phonenum,verify,function(datas){
                                if(datas.status==1){
                                    $(_this).html('重新获取(<i>60</i>)').addClass('getIng');
                                    var count=60;
                                    timer=setInterval(function(){
                                        count--;
                                        if(count==0){
                                            $(_this).html('获取验证码').removeClass('getIng');
                                            clearInterval(timer);
                                        }else{
                                            $(_this).find('i').html(count);
                                        }
                                    },1000);
                                }else{
                                	$(".reloadverify").click();
                                	if(datas.code == -1){
                                        $('.mobile').find('input[name=verify]').parents('.yzm').next('b').remove()
                                        var html2=$('<b>'+datas.info+'</b>');
                                        $('.mobile').find('input[name=verify]').parents('.yzm').after(html2);	
                                	}else{
                                        $('.mobile').find('input[name=code]').parents('.yzm').next('b').remove()
                                        var html2=$('<b>'+datas.info+'</b>');
                                        $('.mobile').find('input[name=code]').parents('.yzm').after(html2);	
                                	}
                                }
                            })
                        }
                    });
                }
            }


        });

        //修改密码
        $(document).on('click','.pass .edit-btn',function(){
            $(this).parents('ul').addClass('hide');
            $(this).parents('ul').next('.password').removeClass('hide').find('.exit-edit').show();;
            $(this).parents('ul').next('.password').find('.txts').eq(0).focus();
        });

         //放弃编辑
        $(document).on('click','.p-exit-edit',function(){
            $(this).parents('.password').addClass('hide');
            $('.pass>ul').removeClass('hide');
        });

        //放弃编辑
        $(document).on('click','.pass .p-exit-edit',function(){
            $(this).parents('.password').addClass('hide');
            $('.pass>ul').removeClass('hide');
        });

        //确认编辑
        $(document).on('click','.password .save-btn',function(){
            check('.password');
            var oldpassword=$('.password').find('.txts[name=oldpass]').val();
            var newpassword=$('.password').find('.txts[name=newpass]').val();
            var surepassword=$('.password').find('.txts[name=surepass]').val();
            if(surepassword!=newpassword){
                var html=$('<b>两次密码不一致</b>');
                $('.password').find('input[name=surepass]').next('b').remove();
                $('.password').find('input[name=surepass]').after(html);
                return;
            }
            if(bReady==true) {
                API.userApi_updatePassword(localStorage["uid"], newpassword, function (data) {
                    if (data.status == 1) {
                        plugin.openMsg('修改成功', 0);
                        $('.password').addClass('hide').find('input').val('');
                        $('.pass>ul').removeClass('hide');
                        clearInterval(timer);
                    } else {
                        var info=data.info;
                        $('.password').find('input[name=oldpass]').next('b').remove();
                        var html=$('<b>'+info+'</b>');
                        $('.password').find('input[name=oldpass]').after(html);
                    }
                });
            }
        });
         //面部信息变更
        $(document).on('click','.FaceData .edit-btn',function(){
            $(this).hide();
            $(this).parents('ul').find('li .edit-box span').hide();
            layer.open({
                            type: 1,
                            title: false,
                            closeBtn: false,
                            area: ['600px', '512px'],
                            success: function () {
                                
                                // $('#Face-attend').attr('data-id',MYid);
                                // $('#Face-attend .pop-title h3 span').html(MYtitle);
                                // $('#Face-attend .opt p').removeClass('error')
                                // $('#Face-attend').removeAttr('data-end');
                            },
                            content: $('#Face-attend'),
                            shift: 7,
                            moveType: 1
                        }); 
                uid = localStorage["uid"];
                Video();
                websocket(uid);
        });
         //放弃采集
        var abandonLayer=null;
        $(document).on('click','#Face-attend .close',function(){
           
                layer.closeAll();
                location.href=location.href;
          
        });
         //放弃采集
        var abandonLayer=null;
        $(document).on('click','#Face-attend .cancel',function(){
           
                layer.closeAll();
                location.href=location.href;
          
        });


//调用摄像头
function Video() {
             //  由于IOS必须在版本11以上才能使用webrtc，并且只有Safari支持，所以做一个小小的判断，限定在
    if(/(iPhone|iPad|iPod|iOS)/i.test(window.navigator.userAgent) && navigator.vender.indexOf("apple") > -1) {
　　　　return;
    }
    /**
     * =============实现在浏览器中打开摄像头，并且将摄像头内容显示在页面中
     * 想要实现这一功能，需要了解webRTC（Web Real-Time Communication）网络实时通话技术，它允许浏览器实现视频、音频、P2P文件分享等功能。
     */
    // 开启视频功能，依赖window的navigator对象，采用getUserMedia方法，有版本差异，所以需要判断区分
    // 需要IE(Edge)15+， Safari 11+， IOS Safari 11.2+, Android 64+, UC 不支持， QQ、百度部分支持

    // 所以首先需要对浏览器支持情况进行判断
    // 先判断浏览器是否支持
    if (navigator.mediaDevices === undefined ||
      navigator.mediaDevices.enumerateDevices === undefined ||
      navigator.mediaDevices.getUserMedia === undefined) {
      // 再判断具体是那个方法不支持，并向用户显示
      if (navigator.mediaDevices === undefined) {
        var fctName = 'navigator.mediaDevices'
      } else if (navigator.mediaDevices.enumerateDevices === undefined) {
        var fctName = 'navigator.mediaDevices.enumerateDevices'
      } else if (navigator.mediaDevices.getUserMedia === undefined) {
        var fctName = 'navigator.mediaDevices.getUserMedia'
      } else {
        console.assert(false)
      }
      alert('WebRTC issue-! ' + fctName + ' not present in your browser')
    }
    const video = document.querySelector('#video')

    // 如果浏览器支持，该方法的更新是向后兼容，新版将所有功能都使用navigator.mediaDevices进行了封装
    navigator.mediaDevices.enumerateDevices().then(function (sourceInfos) {
      // 如果支持新的方法，那么就使用新的方法来获取，当然这是一种比较主流的判断方法
      // 如果是想旧的方法兼容，可以使用下面作为判断条件，除IOS和PC以外，均使用旧的获取方式
      // !(navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || !/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent))
      
      /**
       * 无论是旧的写法还是新的标准，思路都是通过设备信息，获取摄像头的视频流，通过转换变成blob的格式交给video的src
       */
      if (!navigator.mediaDevices.getUserMedia) {
        // 声明一个数组，用于装载设备媒体设备的相关信息，由于回调中sourceInfos对象中携带有所有媒体对象的相关信息
        // 这里对信息进行遍历筛选，只选出摄像头的Id并保存在数组中
        var exArray = [];  
        for (var i = 0; i < sourceInfos.length; ++i) {
          if (sourceInfos[i].kind == 'videoinput') {
            exArray.push(sourceInfos[i].deviceId);
          }
        }
        // 通过navigator的getUserMedia获取摄像头的视频流，并在成功的回调中将视频流交给video
        getMedia();

        function getMedia() {
          if (navigator.getUserMedia) {
            // 该方法可以传递3个参数，分别为获取媒体信息的配置，成功的回调函数和失败的回调函数
            navigator.getUserMedia({
              audio: false, // 表明是否获取音频
              video: {  // 对视频信息进行配置
                optional: [{
                  'sourceId': exArray[1] // 下标为0是前置摄像头，1为后置摄像头，所以PC不能进入该判断，否则画面会保持在第一帧不动
                }]
              },
            }, successFunc, errorFunc); //success是获取成功的回调函数  
          } else {
            alert('Native device media streaming (getUserMedia) not supported in this browser.');
          }
        }
        // 这里是获取媒体信息成功的回调函数
        function successFunc(stream) {
          // 对FireFox进行兼容，这里对返回流数据的处理不同
          if (video.mozSrcObject !== undefined) {
            //Firefox中，video.mozSrcObject最初为null，而不是未定义的，我们可以靠这个来检测Firefox的支持  
            video.mozSrcObject = stream;
          } else {
            // 一般的浏览器需要使用createObjectURL对流数据进行处理，再交给video元素的src
            video.src = window.URL && window.URL.createObjectURL(stream) || stream;
          }
        }
        // 获取媒体信息失败的回调
        function errorFunc(e) {
          alert('Error！' + e);
        }
      } else {  // 当采用最新的标准方式获取视频时
        // 这里对生成视频进行配置
        var userMediaConstraints = {
          audio: false, // 是否获取音频
          video: {
            facingMode: 'environment'  // 环境表示后置摄像头，使用user表示采用前置
          }
        }
        // 这里就采用新的方法来获取视频
        navigator.mediaDevices.getUserMedia(userMediaConstraints).then(function success(stream) {
          video.srcObject = stream;
 
        }).catch(function (error) {
          alert(error.name + error.message)
        });
      }
    }).catch(function(error) {
      alert(error.name + error.message)
    })
} 

              var video = document.getElementById('video');
              var canvas = document.getElementById('canvas');
              var ctx = canvas.getContext('2d');

   function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type:mimeString});
    }
   

//webSocket
function websocket(uid) {
             var ws = new WebSocket("ws://localhost:8081/faceCollection");
    function sendFaceData() {
         ctx.drawImage(video, 0, 0, 250, 250);
        var data = canvas.toDataURL('image/jpeg');
        newblob = dataURItoBlob(data);
        ws.send(newblob);
        console.log("onopen时间"+new Date().getMilliseconds())
    }
             
// 建立 web socket 连接成功触发事件
    ws.onopen = function() {
        ws.send(uid);
       sendFaceData();
    };
// 接收服务端数据时触发事件
    ws.onmessage = function (evt) { 
        console.log(evt.data)
     if(evt.data=="0"){
        //没有人脸数据
         plugin.openMsg('请正视摄像头哦',0);
         sendFaceData();
     }else if(evt.data=="1"){
        //多人入镜
        plugin.openMsg('请自己入镜哦',0);
        sendFaceData();
     }else if(evt.data =="2"){
        //已处理一帧数据
        sendFaceData();
    }else if(evt.data =="关闭"){
        plugin.openMsg('已完成信息录入，5秒钟后将自动返回个人中心页面...',0);
        timename=setTimeout(function(){
            ws.close();
        },5000);
        
    }
    };
// 断开连接 触发事件
    ws.onclose = function(e) {
        console.log("断开连接原因："+"错误码"+e.code + "断开原因" + e.reason + "是否正常断开" + e.wasClean);
        if(e.wasClean) location.href = location.href;
    };
//  web socket 连接失败触发事件
    ws.onerror = function(err) {
        console.log("Error: " + err);
    };


   

     // timer = setInterval(
     //        function () {
     //            ctx.drawImage(video, 0, 0, 250, 250);
     //          var data = canvas.toDataURL('image/jpeg');
     //            newblob = dataURItoBlob(data);
     //            ws.send(newblob);
     //            console.log("时间"+new Date().getMilliseconds())
     //        }, 3000);
          }
        //切换
        $(document).on('click','.s-header .h-nav a',function(){
            var index=$(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $('.item-change').children().eq(index).removeClass('hide').siblings().addClass('hide');
            if(index==2){
                setWenkuType(0,1);
                window.location.hash = 'wenkuupload';
            }else{
                window.location.hash = '';
            }
        });
        $(document).on('click','.wenkudownlist .change-box .item a',function(){
            var index=$(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            setWenkuType(index,1);
        });
        var reco = {};
        function setWenkuType(t,n){
            $('.wenkudownlist .change-box .item a').eq(t).addClass('active').siblings().removeClass('active');
            if(t==0){
                API.WenkuApi_listsUserDocument(n,function(data){
                    var html=template('tpl-downfilelist',$.extend({index:t},data.data));
                    $('.wenkudownlist .tableBox').html(html);
                    setWenkuPage(t,n,data.data.pages);
                })
            }else if(t==1){
                API.WenkuApi_getFavoriteLists(n,function(data){
                    var html=template('tpl-downfilelist',$.extend({index:t},data.data));
                    $('.wenkudownlist .tableBox').html(html);
                    setWenkuPage(t,n,data.data.pages);
                })
            }else if(t==2){
                API.WenkuApi_getDownloadList(n,function(data){
                    var html=template('tpl-downfilelist',$.extend({index:t},data));
                    $('.wenkudownlist .tableBox').html(html);
                    setWenkuPage(t,n,data.pages);
                })
            }
        }
        function setWenkuPage(t,n,p){
            require.async(['/Public/Common/js/lib/pagination/pagination.css#', 'pagination'], function(cs, ev) {
                if(p<=1)return;
                reco.pageele = new Pagination('#pagination'+t, {
                    totalPage: {
                        value: p
                    },
                    currentPage: {
                        value: n
                    },
                    firstPagesCount: {
                        value: 1
                    },
                    lastPagesCount: {
                        value: 1
                    },
                    viewStyle: 'nojump'
                });
                reco.pageele.success = function(e) {
                    setWenkuType(t, e.page,p);
                }
            })
        }
        setAutoClick();
        var clock = null;
        function checkBind(){
            clock = setInterval(function(){
                API.userApi_isBindWechat(function(data){
                    if(data.status == 1){
                        plugin.openMsg('绑定成功',0);
                        clearInterval(clock);
                        $(".wx .edit-box span").html(data.data.nickname);
                        $("#remove-bind-wechat").removeClass("hide2");
                        $("#bind-wechat").addClass("hide2");
                        $('.mask-layer,.qrcode').addClass('hide');
                    }
                });
            },1500);
        };
        //绑定微信
        $(document).on('click','a#bind-wechat',function(){
            $('.mask-layer,.qrcode').removeClass('hide');
            var apiurl = $('.setting-layer.qrcode').attr('data-api');
            $.ajax({
                type: "GET",
                url: apiurl,
                data: {},
                dataType: "json",
                success: function(data){
                    if(data.status == 1){
                        $("#wechat-qrcode").attr('src',data.url);
                        checkBind();
                    }
                }
            });
            return;
        });

        //关闭二维码等窗口
        $(document).on('click','.settingclose',function(){
            $('.mask-layer,.setting-layer').addClass('hide');
            if(clock != null){
                clearInterval(clock);
            }
            return;
        });
        //解除绑定窗口
        $(document).on('click','a#remove-bind-wechat',function(){
            layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area: ['347px','237px'],
                success: function () {},
                content: $('#remove_bind'),
                shift: 7,
                moveType: 1
            });
        });
        $(document).on('click','#remove_bind a.cancel',function(){
            layer.closeAll();
        });
        //解除绑定操作
        $(document).on('click','#remove_bind a.sure',function(){
            //code
            API.userApi_unbindWechat(function(data){
                plugin.openMsg(data.info,0);
                $(".wx .edit-box span").html("未绑定");
                $("#remove-bind-wechat").addClass("hide2");
                $("#bind-wechat").removeClass("hide2");
                layer.closeAll();
            });
        });

        //开关
        $(document).on('click','.switch-box span',function(){
            $('.switch-box span').removeClass('active');
            $('.switch-box>div').hide();
            $(this).addClass('active');
            $(this).next().show();
            return false;
        });

        $(document).on('click','.switch-box a',function(){
            var index=$(this).index();
            var flage;
            index==0&&(flage=1);
            index==1&&(flage=0);
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parent().prev().html($(this).html());
            if($(this).parents('.switch-box').hasClass('noty1')){
                API.userApi_setAddClassEmailNotify(flage,function(){
                    flage==0 && plugin.openMsg('已关闭',0);
                    flage==1 && plugin.openMsg('已开启',0);
                });
            }
            if($(this).parents('.switch-box').hasClass('noty2')){
                API.userApi_setHomeworkEmailNotify(flage,function(){
                    flage==0 && plugin.openMsg('已关闭',0);
                    flage==1 && plugin.openMsg('已开启',0);
                });
            }
            if($(this).parents('.switch-box').hasClass('noty3')){
                API.userApi_switchLetterNotify(flage,function(){
                    flage==0 && plugin.openMsg('已关闭',0);
                    flage==1 && plugin.openMsg('已开启',0);
                });
            }
        });

        $(document).on('click',function(){
            $('.switch-box span').removeClass('active');
            $('.switch-box>div').hide();
        })

        //解绑手机号
        $(document).on('click','.setting-item .mobile .unbind',function(){
            var name=$(this).prev().html()
            layer.open({
                type:1,
                title: false,
                closeBtn: false,
                area:['420px','195px'],
                content: $('#unbind-mobile'),
                success:function(){
                    $('#unbind-mobile h3 span').html(name)
                },
                shift:7
            })
        });
        $(document).on('click','.unbind-box .cancel,.tel-validate .close',function(){
            clearInterval(getTimer)
            layer.closeAll();
        });

        var getTimer=null;
        $(document).on('click','#unbind-mobile .sure',function(){
            layer.closeAll();
            var name=$('#unbind-mobile h3 span').html()
            name='“ '+name+' ”';
            layer.open({
                type:1,
                title: false,
                closeBtn: false,
                area:['400px','310px'],
                content: $('#v-mobile'),
                success:function(){
                    $('#v-mobile input').val('').focus();
                    $('#v-mobile .words span').html(name);
                    var count=60;
                    $('#v-mobile .yzm-box .get-yzm').html('重新获取（'+count+'）').addClass('nod');
                    getTimer=setInterval(function(){
                        count--;
                        $('#v-mobile .yzm-box .get-yzm').html('重新获取（'+count+'）');
                        if(count==0){
                            clearInterval(getTimer);
                            $('#v-mobile .yzm-box .get-yzm').html('重新获取').removeClass('nod');;
                        }
                    },1000);
                },
                shift:7
            });
            API.userApi_unbindSendCode(function(data){
                if(data.status==0){
                    plugin.openMsg(data.info,1)
                }
            })
        });
        $(document).on('click','.tel-validate .get-yzm:not(".nod")',function(){
            clearInterval(getTimer)
            var _this=this;
            API.userApi_unbindSendCode(function(data){
                if(data.status==1){
                    var count=60;
                    $(_this).html('重新获取（'+count+'）').addClass('nod');
                    getTimer=setInterval(function(){
                        count--;
                        $(_this).html('重新获取（'+count+'）');
                        if(count==0){
                            clearInterval(getTimer);
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
        $(document).on('click','#v-mobile .button',function(){
            var code=$('#v-mobile .yzm-box input').val();
            $('.error-tips').remove();
            if(code==''){
                var html=$('<p class="error-tips">验证码不能为空</p>');
                $('#v-mobile .input').eq(0).append(html);
                return;
            }else{
                API.userApi_unbindPhone(code,function(data){
                    if(data.status == 1){
                        clearInterval(getTimer);
                        layer.closeAll();
                        $('.setting-item .mobile .edit-box span').html('未绑定');
                        $('.setting-item .mobile .edit-box .unbind').remove();
                        plugin.openMsg('解绑成功',0);
                        $('.account>ul li:eq(2) .edit-box span').html('未绑定');
                        $('.account>ul li .change-mobile').html('绑定手机').addClass('blue');
                        $('.account .mobile').addClass('hide');
                        $('.account>ul').removeClass('hide');
                    }else{
                        var html=$('<p class="error-tips">'+data.info+'</p>');
                        $('#v-mobile .input').eq(0).append(html);
                    }

                });
            }
        })

        $(document).on('click','.setting-item .mail .unbind',function(){
            var name=$(this).prev().html();
            layer.open({
                type:1,
                title: false,
                closeBtn: false,
                area:['420px','195px'],
                content: $('#unbind-mail'),
                success:function(){
                    $('#unbind-mail h3 span').html(name)
                },
                shift:7
            })
        });

        $(document).on('click','#unbind-mail .sure',function(){
            layer.closeAll();
            layer.open({
                type:1,
                title: false,
                closeBtn: false,
                area:['400px','280px'],
                content: $('#v-mail'),
                success:function(){
                    $('#v-mail .words span').html(name);
                    $('#v-mail input').focus().val('');
                },
                shift:7
            })
        });
        $(document).on('click','#v-mail .button',function(){
            var pass=$('#v-mail .yzm-box input').val();
            $('.error-tips').remove();
            if(pass==''){
                var html=$('<p class="error-tips">密码不能为空</p>');
                $('#v-mail .input').eq(0).append(html);
                return;
            }else{
                API.userApi_unbindEmail(pass,function(data){
                    if(data.status == 1){
                        layer.closeAll();
                        $('.setting-item .mail .edit-box span').html('未绑定');
                        $('.setting-item .mail .edit-box .unbind').remove();
                        plugin.openMsg('解绑成功',0);
                        $('.account>ul li:eq(1) .edit-box span').html('未绑定');
                        $('.account>ul li .change-mail').html('绑定邮箱').addClass('blue');
                        $('.account .mail').addClass('hide');
                        $('.account>ul').removeClass('hide');
                    }else{
                        var html=$('<p class="error-tips">'+data.info+'</p>');
                        $('#v-mail .input').eq(0).append(html);
                    }
                });
            }
        });
        $('.tel-validate input').focus(function(){
            $(this).parent().addClass('focus');
            $(this).parents('.input').find('.error-tips').remove();
        }).blur(function(){
            $(this).parent().removeClass('focus');
        });

    };
});
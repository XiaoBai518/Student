/**
 * Created by Administrator on 2015/5/25.
 */
define(function(require,exports,module){
    window.$=window.jQuery=$=require('jquery');
    var layer=require('layer');
    var plugin=require('plugin');
    var template = require('art-template');
    template = plugin.templateConfig(template);
    var API = require('API');
    var scrollBar=require('scrollBar');
    var giveupattence = false;

    /*-----------互动-------------*/
    exports.videoAll=function() {
        var courseid = localStorage['cid'];
        API.attenceApi_getNotFinishAttenceStudent(courseid,localStorage["uid"],function(data){
             if(data.attence!=undefined){
                     MYid = data.attence.id;
                     MYtitle = data.attence.title;
                     MYtype = data.attence.type;
                NotFlayer = layer.open({
                    type: 1,
                    title: false,
                    closeBtn: false,
                    area: ['400px', '155px'],
                    success:function(){
                        $('#have-attend').attr('data-id',data.attence.id);
                        $('#have-attend').attr('data-courseid',data.attence.courseid);
                    },
                    content: $('#have-attend'),
                    shift: 7,
                    moveType: 1
                });
                $('.layui-layer-content').css("overflow-y","hidden");
            }
        })
         $(document).on('click','#have-attend .cancel',function(){
            layer.close(NotFlayer);
        });
        $(document).on('click','#have-attend .sure',function(){    
                if(MYtype == 1){
                    if(!giveupattence){
                        layer.open({
                            type: 1,
                            title: false,
                            closeBtn: false,
                            area: ['600px', '512px'],
                            success: function () {
                                $('#number-attend input').val('').focus();
                                $('#number-attend').attr('data-id',MYid);
                                $('#number-attend .pop-title h3 span').html(MYtitle);
                                $('#number-attend .opt p').html('请输入数字，手动完成签到').removeClass('error')
                                $('#number-attend').removeAttr('data-end');
                            },
                            content: $('#number-attend'),
                            shift: 7,
                            moveType: 1
                        }); 
                    }
                }else if(MYtype == 2){
                     if(!giveupattence){
                        layer.open({
                            type: 1,
                            title: false,
                            closeBtn: false,
                            area: ['600px', '512px'],
                            success: function () {
                                
                                $('#Face-attend').attr('data-id',MYid);
                                $('#Face-attend .pop-title h3 span').html(MYtitle);
                                $('#Face-attend .opt p').removeClass('error')
                                $('#Face-attend').removeAttr('data-end');
                            },
                            content: $('#Face-attend'),
                            shift: 7,
                            moveType: 1
                        }); 
                    }
                     // API.attenceApi_checkin(id,'',function(data){
                     //     if(data.status == 1){
                     //         location.reload();
                     //         plugin.cursoralert({
                     //             'title':'签到提示',
                     //             'info':'签到成功',
                     //             'sure':'朕知道了',
                     //         });
                     //     }
                     // });
                     uid = localStorage["uid"];
                      Video();
                     websocket(uid);
                }
        });
        //智能人脸考勤
         //放弃考勤
        var abandonLayer=null;
        $(document).on('click','#Face-attend .close',function(){
            if($('#Face-attend').attr('data-end')==1){
                layer.closeAll();
                location.href=location.href;
            }else{
                abandonLayer=layer.open({
                    type: 1,
                    title: false,
                    closeBtn: false,
                    area: ['400px', '196px'],
                    content: $('#abandon-attend'),
                    shift: 7,
                    moveType: 1
                });
            }
        });
       

        //数字考勤
        //放弃考勤
        var abandonLayer=null;
        $(document).on('click','#number-attend .close',function(){
            if($('#number-attend').attr('data-end')==1){
                layer.closeAll();
                location.href=location.href;
            }else{
                abandonLayer=layer.open({
                    type: 1,
                    title: false,
                    closeBtn: false,
                    area: ['400px', '196px'],
                    content: $('#abandon-attend'),
                    shift: 7,
                    moveType: 1
                });
            }
        });
        //取消放弃
        $(document).on('click','#abandon-attend .cancel',function(){
            layer.close(abandonLayer);
        });
        //确认放弃
        $(document).on('click','#abandon-attend .sure',function(){
            layer.closeAll();
            giveupattence = true;
            
        });
        $(document).on('keydown','#number-attend input',function(ev){
           if((ev.keyCode<48 || ev.keyCode>57)&& (ev.keyCode!=8) && (ev.keyCode<96 || ev.keyCode>105)){
               return false;
           }
        });
        $(document).on('keyup','#number-attend input',function(ev){
            var oV=$(this).val();
            var id=$('#number-attend').attr('data-id');
            if(isNaN(oV)){
                if(oV.length==1){
                    oV=''
                }else{
                    oV=parseInt(oV)
                }
                $(this).val(oV);
                $(this).css('left',0)
            }else{
                if(oV.length==4){
                    API.attenceApi_checkin(id,oV,localStorage["uid"],function(data){
                        if(data.status == 1){
                            $('#attend li[data-id='+id+']').find('.state').html('<span class="green">出勤</span>');
                            location.reload();
                            layer.closeAll();
                            plugin.openMsg('签到成功',0);
                        }else{
                            if(data.state==-2){
                                $('#number-attend').attr('data-end',1);
                            }
                            $('#number-attend .opt p').html(data.info).addClass('error');
                        }
                    });
                }else{
                    $('#number-attend .opt p').html('请输入数字，手动完成签到').removeClass('error')
                }
            }
        })
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
function websocket(uid) {
             var ws = new WebSocket("ws://localhost:8082/faceRecognition");
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
      console.log(uid)
      console.log(evt.data== uid)
       if(evt.data !="-1"&&evt.data== uid){
       
        API.attenceApi_checkin(id,oV,localStorage["uid"],function(data){
                        if(data.status == 1){
                            $('#attend li[data-id='+id+']').find('.state').html('<span class="green">出勤</span>');
                            layer.closeAll();
                             plugin.openMsg('已完成签到，3秒钟后将自动关闭页面...',1);
                               timename=setTimeout(function(){
                                      ws.close();
                              },3000);
                        }else{
                            if(data.state==-2){
                                $('#number-attend').attr('data-end',1);
                            }
                            $('#number-attend .opt p').html(data.info).addClass('error');
                        }
                    });
      
        
    }
    //   if(evt.data=="0"){
    //     //没有人脸数据
    //      plugin.openMsg('请正视摄像头哦',0);
    //      sendFaceData();
    //  }else if(evt.data=="1"){
    //     //多人入镜
    //     plugin.openMsg('请自己入镜哦',0);
    //     sendFaceData();
    //  }else if(evt.data =="2"){
    //     //已处理一帧数据
    //     sendFaceData();
    // }else
    };
// 断开 web socket 连接成功触发事件
    ws.onclose = function(e) {
        console.log("断开连接原因："+"错误码"+e.code + "断开原因" + e.reason + "是否正常断开" + e.wasClean);
      if(e.wasClean) location.href = location.href;
    };
//  web socket 连接失败触发事件
    ws.onerror = function(err) {
        console.log("Error: " + err);
    };

          }
    };
});

//     /*-----------学生成员-------------*/
//     exports.memberAll=function() {
//     	var member = require('./member');
//     	member.student();
//         var courseid = $("#return-course").attr('data-id');
//         API.attenceApi_getNotFinishAttenceStudent(courseid,function(data){
//             if(data.lists.length>0){
//                 $('.in-header .nav a:eq(1)').append($('<i></i>'))
//             }
//         })
//     };
//     //显示空白部分
//     function showBlank(){
//     	$(".empty-box").show();
//     };
//     function hideBlank(){
//     	$(".empty-box").hide();
//     };
//     /*-----------学生公告-------------*/
//     exports.announceAll=function(){
//         var courseid = $("#course-header").attr('data-id');
//         API.attenceApi_getNotFinishAttenceStudent(courseid,function(data){
//             if(data.lists.length>0){
//                 $('.toprx .li6').append($('<i></i>'))
//             }
//         })
//         //计算高度，是否显示查看全文
//         function calH(){
//             $('.announce-cont-box').each(function(){
//                 if($(this).find('.announce-cont .annex').length>0){
//                     if(($(this).find('.announce-cont .word .p').height()>90) || $(this).find('.announce-cont .annex ul').height()>120){
//                         $(this).find('.announce-cont .word').css('max-height', '90px');
//                         $(this).find('.announce-cont .read-all').show();
//                         $(this).css('padding','0 20px 40px 40px')
//                     }else{
//                         $(this).find('.announce-cont .read-all').hide();
//                         $(this).css('padding','0 20px 20px 40px')
//                     }
//                 }else{
//                     if($(this).find('.announce-cont .word .p').height()>180){
//                         $(this).find('.announce-cont .word').css('max-height',  '180px')
//                         $(this).find('.announce-cont .read-all').show();
//                         $(this).css('padding','0 20px 40px 40px')
//                     }else{
//                         $(this).find('.announce-cont .read-all').hide();
//                         $(this).css('padding','0 20px 20px 40px')
//                     }
//                 }
//             });
//         }
//     	var courseid = $("#course-header").attr('data-id');
//     	plugin.loading("75%");
//     	API.notifyApi_lists(courseid,function(data){
//     		plugin.closeLoading();
//     		$('#viewer-annouce').html("");
//     		if(data.lists == null || data.lists.length == 0){
//     			showBlank();
//     			$('.announce-box').hide();
//     		}else{
//     			hideBlank();
//     			$('.announce-box').show();
//     		}
//     		for(var i=0;i<data.lists.length;i++){
//     			var html = template('tpl-notify',data.lists[i]);
//     			$('#viewer-annouce').append(html);
//     		}
//             calH();
//             setAutoHeight();
//             plugin.previewImg($('.fileext[data-ispic=1]'));
//     	});
//         //有锚点时自动滚动
//         function setAutoHeight(){
//             var url = window.location.href;
//             var reg = /\#\w+/;
//             if(!reg.test(url)){return;}
//             var result = url.match(reg)[0].substring(1);
//             var top = $("#viewer-annouce li[data-id="+result+"]").offset().top;
//             $("html,body").animate({scrollTop:top-113},200);
//         }
        
//         //查看全文点击
//         $(document).on('click','.announce-box li .read-all',function(){
//             $(this).parents('.announce-cont').find( '.word').css('max-height', $(this).parents('.announce-cont').find( '.word .p').height());
//             $(this).parents('.announce-cont').find( '.annex').css('max-height', $(this).parents('.announce-cont').find( '.annex ul').height());
//             $(this).hide();
//             $(this).next('.sq-all').show()
//         });

//         //收起全文
//         $(document).on('click','.announce-box li .sq-all',function(){
//             calH();
//             $(this).hide();
//             $(this).prev('.read-all').show();
//         });
//     };
//     /*-----------学生资料-------------*/
//     exports.dataAll=function() {
//     	var data = require('./courseware');
//     	data.student();
//         var courseid = $("#course-header").attr('data-id');
//         API.attenceApi_getNotFinishAttenceStudent(courseid,function(data){
//             if(data.lists.length>0){
//                 $('.toprx .li6').append($('<i></i>'))
//             }
//         })
//     };

//     /*-----------学生作业-------------*/
//     exports.workAll=function() {
//         var courseid = $("#course-header").attr('data-id');
//         sessionStorage.courseid = courseid;
//         var NotFlayer = null;
//         API.EvaluationTeacherApi_checkCourse(courseid,function(data){
//             if(data.state == 0){
//                 var opt={};
// 					opt.title='您有未完成的评教';
// 					opt.info='是否填写';
// 					opt.canel='暂不填写';
// 					opt.sure='去填写';
// 					opt.sureCallback=function(){
// 						sessionStorage.evalid = data.evalid;
// 						location.href='/EvalTeacher/evalteacher.html';
// 					};
//                 plugin.cursorconfirm(opt);
//             }
//         });
//         API.attenceApi_getNotFinishAttenceStudent(courseid,function(data){
//             if(data.lists.length>0){
//                 $('.toprx .li6').append($('<i></i>'))
//                 NotFlayer = layer.open({
//                     type: 1,
//                     title: false,
//                     closeBtn: false,
//                     area: ['400px', '155px'],
//                     success:function(){
//                         $('#have-attend').attr('data-id',data.lists[0].id);
//                         $('#have-attend').attr('data-courseid',data.lists[0].courseid);
//                     },
//                     content: $('#have-attend'),
//                     shift: 7,
//                     moveType: 1
//                 });
//             }
//         })

        
//         $(document).on('click','#have-attend .cancel',function(){
//             layer.close(NotFlayer);
//         });
//         $(document).on('click','#have-attend .sure',function(){
//             var id=$('#have-attend').attr('data-id');
//             var courseid = localStorage['cid'];
//             location.href="/StudentsV2/classDetail/courseid/"+courseid+".html";
//         });
//         function listHomework(){
//         	plugin.loading("75%");
//         	var courseid = $("#course-header").attr('data-id');
//         	API.homeworkApi_listsHomework(courseid,function(data){
//         		plugin.closeLoading();
//         		$('.homework-cont').html("");
//         		if(data.lists == null || data.lists.length == 0){
//         			showBlank();
//         		}else{
//         			hideBlank();
//         		}
//         		for(var i=0;i<data.lists.length;i++){
//         			var homework = data.lists[i];
//         			homework.avatar = data.avatar;
//         			var html = template('tpl-homework',homework);
//         			$('.homework-cont').append(html);
//                     if(data.lists[i].isExpeditor){
//                         setCJTip($('.homework-list').eq(i).find('.work-new-r a'));
//                     }
//         		}
//                 plugin.previewImg($('.fileext[data-ispic=1]'));
//         	});
//         };
//         $(document).on('click','.homework-list .read-all',function(){
//             $(this).find('i').remove();
//         });
//         listHomework();
//         function setCJTip(obj){
//             var tipd = layer.tips('<span style="color:#94463f;line-height:38px;font-size:12px;">老师已催交该作业！</span>',obj, {
//                 skin:'layer-ext-ding01',
//                 area: ['auto','auto'],
//                 shift:5,
//                 tips: [1,'#ffffd2'],
//                 time: 1000000,
//                 success:function(content){
//                     content.css({'left':'50%','margin-left':'320px','margin-top':'36px','z-index':'0','box-shadow':'none','border-color':'#94463f'});
//                     var ti = content.find('.layui-layer-TipsG');
//                     ti.css({'left':'100px','border-right-color':'transparent'});
//                     if(ti.hasClass('layui-layer-TipsB')){
//                         ti.css({'border-bottom-color':'#94463f'});
//                         ti.clone().appendTo(ti.parent()).css({'border-bottom-color':'#ffffd2','top':'-19px'});
//                     }else{
//                         content.css({'margin-top':'97px'})
//                         ti.removeClass('layui-layer-TipsT').addClass('layui-layer-TipsB');
//                         ti.css({'border-bottom-color':'#94463f'});
//                         ti.clone().appendTo(ti.parent()).css({'border-bottom-color':'#ffffd2','top':'-19px'});
//                     }
//                 }
//             });
//         }
//         var d = require('./homework');
//         d.discuss();
//         $(document).on("click",".homework-list .gotogroup a",function(e){
//             e.preventDefault();
//             var courseid = $("#course-header").attr('data-id');
//             var self= this;
//             // API.GroupApi_isJoinGroup(courseid,function(data2){
//             //     if(data2.data==1){
//                     var url = $(self).attr("data-href");
//                     location.href = url;
//             //     }else{
//             //         if($(self).attr("data-href").indexOf("Discuss")!=-1){
//             //             plugin.openMsg("请先在『同学』加入小组",1);
//             //             return ;
//             //         }else{
//             //             plugin.openMsg("请尽快加入小组，才可提交作业",1);
//             //             return ;
//             //         }
//             //     }
//             // })
//         })
//     };

//     /*-----------课堂详情-------------*/
//     exports.detailAll=function() {
//         var courseid=$("#return-course").attr('data-id');
//         API.attenceApi_getNotFinishAttenceStudent(courseid,function(data){
//             if(data.lists.length>0){
//                 var id = data.lists[0].id;
//                 var title = data.lists[0].title;
//                 var type = data.lists[0].type;
//                 if(type == 1){
//                     if(!giveupattence){
//                         layer.open({
//                             type: 1,
//                             title: false,
//                             closeBtn: false,
//                             area: ['600px', '512px'],
//                             success: function () {
//                                 $('#number-attend input').val('').focus();
//                                 $('#number-attend').attr('data-id',id);
//                                 $('#number-attend .pop-title h3 span').html(title);
//                                 $('#number-attend .opt p').html('请输入数字，手动完成签到').removeClass('error')
//                                 $('#number-attend').removeAttr('data-end');
//                             },
//                             content: $('#number-attend'),
//                             shift: 7,
//                             moveType: 1
//                         });	
//                     }
//                 }else if(type == 2){
//                 	 API.attenceApi_checkin(id,'',function(data){
//                          if(data.status == 1){
//                              location.reload();
//                              plugin.cursoralert({
//                             	 'title':'签到提示',
//                             	 'info':'签到成功',
//                             	 'sure':'朕知道了',
//                              });
//                          }
//                      });
//                 }else if(type == 3){
//                     plugin.cursoralert({
//                    	 	'title':'您有新的考勤待签到',
//                    	 	'info':'由于该次考勤类型为“扫码考勤”，您无法在电脑上签到，请用微信扫码老师屏幕上的二维码进行签到',
//                    	 	'sure':'朕知道了',
//                     });
//                 }
//             }
//         })
//         $(document).on('click','#have-attend .cancel',function(){
//             layer.closeAll();
//         });
//         $(document).on('click','#have-attend .sure',function(){
//             var id=$('#have-attend').attr('data-id');
//             var courseid2=$('#have-attend').attr('data-courseid');
//             location.href="/StudentsV2/classDetail/courseid/"+courseid2+".html";
//         });
//         function lists(){
//         	//总成绩
//         	API.summaryApi_totalGrade(courseid,function(data){
//         		if(data.state == 1){
//             		var html2=template('tpl-total-grades',data);
//             		$('.detail-page .totalgrade-Area').html(html2);	
//             		$('#totalGrades .detail-box').height(150);
//         		}
//         	});
//             API.summaryApi_attence(courseid,function(data){
//                 console.log(data);
//                 var html2=template('tpl-attend',data);
//                 $('.detail-page .attence-Area').html(html2);
//                 if(data.data.length==0){
//                     $('#attend .detail-box').append($('<p class="no">您的老师还未创建考勤</p>'))
//                 }else if(data.data.length>5){
//                     $('#attend .detail-box').height(200);
//                     scrollBar.scrollBar($('#attend .detail-box'),$('#attend .detail-box ul'))
//                 }else{
//                     $('#attend .detail-box').height(data.data.length*40);
//                 }
//             });
// 			API.summaryApi_perform(courseid,function(data){
// 				var html3=template('tpl-perform',data);
// 				$('.detail-page .perform-Area').html(html3);
// 				if(data.data.length==0){
// 					$('#perform .detail-box').append($('<p class="no">您的老师还未创建表现</p>'))
// 				}else if(data.data.length>5){
// 					$('#perform .detail-box').height(200);
// 					scrollBar.scrollBar($('#perform .detail-box'),$('#perform .detail-box ul'))
// 				}else{
// 					$('#perform .detail-box').height(data.data.length*40);
// 				}
// 			});
//             API.summaryApi_homework(courseid,function(data){
//                 var html=template('tpl-grades',data);
//                 $('.detail-page .homework-Area').html(html);
//                 if(data.data.length==0){
//                     $('#grades .detail-box').append($('<p class="no">您的老师还未发布作业</p>'))
//                 }else if(data.data.length>5){
//                     $('#grades .detail-box').height(200);
//                     scrollBar.scrollBar($('#grades .detail-box'),$('#grades .detail-box ul'))
//                 }else{
//                     $('#grades .detail-box').height(data.data.length*40);
//                 }
//             });
//             API.summaryApi_testpaper(courseid,function(data){
//                 var html=template('tpl-test',data);
//                 $('.detail-page .test-Area').html(html);
//                 if(data.data.length==0){
//                     $('#test .detail-box').append($('<p class="no">您的老师还未发布测试</p>'))
//                 }else if(data.data.length>5){
//                     $('#test .detail-box').height(200);
//                     scrollBar.scrollBar($('#test .detail-box'),$('#test .detail-box ul'))
//                 }else{
//                     $('#test .detail-box').height(data.data.length*40);
//                 }
//             });
//             API.summaryApi_regular(courseid,0,function(data){
//             	if(data.data == false || data.data.length == 0){
//             		return;
//             	}
//             	data.regularGrade = true;
//                 var html=template('tpl-regular',data);
//                 $('.detail-page .regular-Area').html(html);
//                 if(data.data.length==0){
//                     $('#regular .detail-box').append($('<p class="no">您的老师还添加平时成绩</p>'))
//                 }else if(data.data.length>5){
//                     $('#regular .detail-box').height(200);
//                     scrollBar.scrollBar($('#test .detail-box'),$('#test .detail-box ul'))
//                 }else{
//                     $('#regular .detail-box').height(data.data.length*40);
//                 }
//             });
//             API.summaryApi_regular(courseid,10,function(data){
//             	if(data.data == false || data.data.length == 0){
//             		return;
//             	}
//             	data.finalGrade = true;
//                 var html=template('tpl-regular',data);
//                 $('.detail-page .final-Area').html(html);
//                 if(data.data.length==0){
//                     $('#regular .detail-box').append($('<p class="no">您的老师还添加期末考成绩</p>'))
//                 }else if(data.data.length>5){
//                     $('#regular .detail-box').height(200);
//                     scrollBar.scrollBar($('#test .detail-box'),$('#test .detail-box ul'))
//                 }else{
//                     $('#regular .detail-box').height(data.data.length*40);
//                 }
//             });
//         }
//         lists();

//         //点击签到
//         $(document).on('click','#attend .sign-btn',function(){
//             var id=$(this).parents('li').attr('data-id');
//             var type = $(this).parents('li').attr('data-type');
//             var title=$(this).parents('li').find('h3').html();
//             if(type == 1){
//                 layer.open({
//                     type: 1,
//                     title: false,
//                     closeBtn: false,
//                     area: ['600px', '512px'],
//                     success: function () {
//                         $('#number-attend input').val('').focus();
//                         $('#number-attend').attr('data-id',id);
//                         $('#number-attend .pop-title h3 span').html(title);
//                         $('#number-attend .opt p').html('请输入数字，手动完成签到').removeClass('error')
//                         $('#number-attend').removeAttr('data-end');
//                     },
//                     content: $('#number-attend'),
//                     shift: 7,
//                     moveType: 1
//                 });	
//             }else if(type == 3){
//                 plugin.cursoralert({
//                	 	'title':'您有新的考勤待签到',
//                	 	'info':'由于该次考勤类型为“扫码考勤”，您无法在电脑上签到，请用微信扫码老师屏幕上的二维码进行签到',
//                	 	'sure':'朕知道了',
//                 });
//             }
//         });

//         //放弃考勤
//         var abandonLayer=null;
//         $(document).on('click','#number-attend .close',function(){
//             if($('#number-attend').attr('data-end')==1){
//                 layer.closeAll();
//                 location.href=location.href;
//             }else{
//                 abandonLayer=layer.open({
//                     type: 1,
//                     title: false,
//                     closeBtn: false,
//                     area: ['400px', '196px'],
//                     content: $('#abandon-attend'),
//                     shift: 7,
//                     moveType: 1
//                 });
//             }
//         });
//         //取消放弃
//         $(document).on('click','#abandon-attend .cancel',function(){
//             layer.close(abandonLayer);
//         });
//         //确认放弃
//         $(document).on('click','#abandon-attend .sure',function(){
//             layer.closeAll();
//             giveupattence = true;
//             exports.detailAll();
//         });

//         $(document).on('keydown','#number-attend input',function(ev){
//            if((ev.keyCode<48 || ev.keyCode>57)&& (ev.keyCode!=8) && (ev.keyCode<96 || ev.keyCode>105)){
//                return false;
//            }
//         });
//         $(document).on('keyup','#number-attend input',function(ev){
//             var oV=$(this).val();
//             var id=$('#number-attend').attr('data-id');
//             if(isNaN(oV)){
//                 if(oV.length==1){
//                     oV=''
//                 }else{
//                     oV=parseInt(oV)
//                 }
//                 $(this).val(oV);
//                 $(this).css('left',0)
//             }else{
//                 if(oV.length==4){
//                     API.attenceApi_checkin(id,oV,function(data){
//                         if(data.status == 1){
//                             $('#attend li[data-id='+id+']').find('.state').html('<span class="green">出勤</span>');
//                             location.reload();
//                             layer.closeAll();
//                             plugin.openMsg('签到成功',0);
//                         }else{
//                             if(data.state==-2){
//                                 $('#number-attend').attr('data-end',1);
//                             }
//                             $('#number-attend .opt p').html(data.info).addClass('error');
//                         }
//                     });
//                 }else{
//                     $('#number-attend .opt p').html('请输入数字，手动完成签到').removeClass('error')
//                 }
//             }
//         })
//     }
// });
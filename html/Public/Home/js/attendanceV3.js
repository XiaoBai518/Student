/**
 * Created by ALong on 2018/4/25.
 */
define(function(require,exports,module){
    window.$=window.jQuery=$=require('jquery');
    var plugin=require('plugin');
    var API = require('API');
    //require('mockv3');
    var template = require('art-template-native');
    require('echartsv3');
    //require('layuiv2');
    require('layuiV3');
    var scrollBar=require('scrollBar');
    var hre={};
    var attper={};

    var ATTEND_RATE_WARNING = 50;// 出勤率警戒阈值，少于该值出勤率显示为红色，否则蓝色

    var stoptime = false;
    var useWechatCode = true;
    function setQrcodeTime(aid){
        if(stoptime){
            return false;
        }
        setTimeout(function(){
            API.attenceApi_getQrCode(aid,function(qrData){
                if(qrData.status == 1){
                	if(useWechatCode == true){
                    	var qrcode = qrData.qrcode;
                    	var img = new Image();
                    	img.src = qrcode;
                    	img.onload = function(){
                    		useWechatCode = true;
                            $(".qrcode").attr('src',qrData.qrcode);
                    	};
                    	img.onerror = function(){
                    		useWechatCode = false;
                    		$(".qrcode").attr('src',qrData.oss_qrcode);
                    	};	
                	}else{
                    	var qrcode = qrData.oss_qrcode;
                    	var img = new Image();
                    	img.src = qrcode;
                    	img.onload = function(){
                            $(".qrcode").attr('src',qrData.oss_qrcode);
                    	};
                    	img.onerror = function(){
                    		useWechatCode = true;
                    		$(".qrcode").attr('src',qrData.qrcode);
                    	};
                	}
                }
            });
            setQrcodeTime(aid);
        }, getrandomtimes());
    }
    function getrandomtimes(){
        var t = Math.ceil(Math.random()*6)+6;
        return Number(t+'000');
    }


    function showBlank(){
        // $('.empty-box').show();
        // $('.perform-cont').hide();
    };
    function hideBlank(){
        // $('.empty-box').hide();
        // $('.perform-cont').show();
    };
    var __LOCAL = {};
    __LOCAL.attendlist = {}
    __LOCAL.attendlist.list = [];

    function toDouble(n){
        if (n < 10) {
            return '0' + n;
        } else {
            return '' + n;
        }
    };
    template.helper('toDou', function (n) {
        return n>9?n+'':'0'+n;
    });
    template.helper('year_month_day',function(unixTime){
        var time = new Date(unixTime);
        var ymdhis = "";
        ymdhis += (time.getFullYear()+"").substring(0) + ".";
        ymdhis += toDouble((time.getMonth()+1)) + ".";
        ymdhis += toDouble(time.getDate());
        return ymdhis;
    })
    template.helper('hour_min',function(unixTime){
        var time = new Date(unixTime);
        var ymdhis = "";
        ymdhis += toDouble(time.getHours()) + ":";
        ymdhis += toDouble((time.getMinutes()));
        return ymdhis;
    });
    
    exports.init = function(){
        attper.curtype = 'attence';
        attper.curname = '考勤';
        attper.Api_updateState = API.attenceApi_updateState;
        attper.Api_rename = API.attenceApi_renameAttence;
        attper.Api_add = API.attenceApi_addAttence;
        attper.Api_del = API.attenceApi_delAttence;
        attper.Api_search = API.attenceApi_search;
        attper.Api_getStudentCount = API.studentsApi_getStudentCount;
        attper.Api_getTypeList = API.attenceApi_getAttenceList;
        attper.Api_getStudentStat = API.attenceApi_getStudentStat;

        exports.domthing();
        exports.getnotfinish();
        exports.get_attendlist();
        exports.draw_stuLateList();
    }
    //页面加载时渲染数据
    exports.get_attendlist = function(){
        //api
        var courseid = localStorage['cid'];
        API.AttenceV2Api_getAttenceList(courseid,function(data){
            if(data.lists == null || data.lists.length == 0){
                data.lists = [];
            }
            __LOCAL.attendlist = data;
            exports.draw_main();
            exports.draw_attendList();
        });
    };
    exports.getnotfinish =function(){
        var courseid = localStorage['cid'];
        API.attenceApi_getNotFinishAttence(courseid,function(data){
            notfinishdata = data;
            if(data.attence!=undefined){
                    var attence = {
                        id:notfinishdata.attence.id,
                        type:notfinishdata.attence.type,
                        title:notfinishdata.attence.title
                    };
           
                    if(attence.type == 1){ //数字考勤
                        layer.open({
                            type: 1,
                            title: false,
                            closeBtn: false,
                            area: ['600px', '510px'],
                            success: function () {
                                $('#number-attend').attr('data-id',attence.id);
                                $('body').attr('data-id',attence.id);
                                $('#number-attend .pop-title h3').html(attence.title);
                                API.attenceApi_getDigitAttence(attence.id,function(data2){
                                    $("#number-attend .ing").html(data2.finishCount);
                                    $("#number-attend .total").html(data2.studentCount);
                                    var code=data2.code.toString();
                                    code=code.split('');
                                    $('#number-attend .number-box span').each(function(){
                                        var index=$(this).index()
                                        $(this).html(code[index])
                                    })
                                });
                                timer=setInterval(function(){
                                    API.attenceApi_getAttenceState(attence.id,function(data2){
                                        status = data2;
                                        if(data2.attence == null){
                                            clearInterval(timer);
                                            return;
                                        }
                                        if(data2.attence.finishTime==undefined){
                                            API.attenceApi_getDigitSignIn(attence.id,function(data3){
                                                $("#number-attend .ing").html(data3.signInCount);
                                                $("#number-attend .total").html(data3.studentCount);
                                            });
                                        }else if(data2.attence.finishTime!=undefined){
                                            clearInterval(timer);
                                            return;
                                        }
                                    })

                                },5000)
                            },
                            content: $('#number-attend'),
                            shift: 7,
                            moveType: 1
                        })  
                    }else if(attence.type == 2){//人脸考勤
                       
                        var layerIndex =  layer.open({
                                type: 1,
                                title: false,
                                closeBtn: false,
                                area: ['600px', '510px'],
                                success: function () {
                                    $('#Face-attend').attr('data-id',attence.id);
                                    $('body').attr('data-id',attence.id);
                                    $('#Face-attend .pop-title h3').html(attence.title);
                                    API.attenceApi_getDigitSignIn(attence.id,function(data){
                                        $("#Face-attend .ing").html(data.signInCount);
                                        $("#Face-attend .total").html(data.studentCount);
                                    });
                                    timer=setInterval(function(){
                                        API.attenceApi_getAttenceState(attence.id,function(data2){
                                            status = data2;
                                            if(data2.attence == null){
                                                clearInterval(timer);
                                                return;
                                            }
                                            if(data2.attence.finishTime==undefined){
                                                API.attenceApi_getDigitSignIn(attence.id,function(data){
                                                    $("#Face-attend .ing").html(data.signInCount);
                                                    $("#Face-attend .total").html(data.studentCount);
                                                });
                                            }else if(data2.attence.finishTime!=undefined){
                                                clearInterval(timer);
                                                bClick=true;
                                                return;
                                            }
                                        })
                                    },3000);
                                    bClick=true;
                                },
                                content: $('#Face-attend'),
                                shift: 7,
                                moveType: 1
                            });
                    }
                }
            });
    };
    exports.draw_attendList = function(){
        $('.attend_attendlists').html(template('tmp-attendlist',__LOCAL.attendlist));
        var l = __LOCAL.attendlist;
        for( index in l.lists ){
            
            var attendrate = Math.floor(l.lists[index].attenceRate);
            var color = attendrate>ATTEND_RATE_WARNING?new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 1, color: '#83bff6'},
                                    {offset: 0.5, color: '#188df0'},
                                    {offset: 0, color: '#188df0'}
                                ]
                            ):new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#ec3452'},
                                    {offset: 0.5, color: '#fc8488'},
                                    {offset: 1, color: '#fc5452'}
                                ]
                            );
            echarts.init($('.attend_circle')[index]).setOption({
                title:{
                    text:attendrate+'%',
                    x:'center',
                    y:'center',
                    textStyle:{
                        color:color,
                        fontSize:14,
                    }
                },
                color:[color,'#e6e6e6'],
                series:[{
                    type:'pie',
                    hoverAnimation:false,

                    radius:['75%','100%'],
                    data:[
                        {value:attendrate,},
                        {value:100-attendrate,},
                    ],
                    
                    itemStyle:{
                        normal:{
                            
                            
                        
                            label:{
                                show:false,
                            },
                            labelLine:{
                                show:false,
                            }
                        }
                    }

                }]

            })
        }
        exports.draw_main();
    };
    exports.draw_stuLateList = function(){
        //api
        var courseid = localStorage['cid'];
        API.AttenceV2Api_getAbsenceHeightStudentLists(courseid,10,function(data){
            if(data.lists == null || data.lists.length == 0){
                data.lists = [];
            }
            __LOCAL.stulatelist = data;
            $('.attend_mainright').html(template('tmp-stulatelist',data));
        });
        //callback
    };
    exports.draw_main = function(){
        var length = __LOCAL.attendlist.lists.length;
        if(length==0)
            {__LOCAL.attendlist.attendrate='--';}
        else{
            $('#attence_count').html(length+"次");
            var sum = 0;
            for(var i = 0;i<length;i++){
                sum += __LOCAL.attendlist.lists[i].attenceRate;
            }
            __LOCAL.attendlist.attendrate = parseInt(sum*10/length)/10;
        }
        if(__LOCAL.attendlist.attendrate<ATTEND_RATE_WARNING )
        {
            var fontcolor = style="#ec3452";
        }else{
            var fontcolor = style="#328eeb";
        }
        $('.attend_ratenum').html( __LOCAL.attendlist.attendrate);
        $('.attend_ratenums').css('color',fontcolor);
    };
    //绑定dom事件
    // $(document).on('click','#downloadAttenceReport,#downloadPerformReport',function(){
    $(document).on('click','#downloadPerformReport',function(){
        var url = $(this).attr('data-href');
        var courseid = $("#return-course").attr('data-id');
        location.href = url;
    });
    $(document).on('click','.dlall',function(){
        var courseid = $("#return-course").attr('data-id');
        location.href = '/Export/attence/courseid/'+courseid+'.html';
    })
    $(document).on('click','.dlbytime',function(){
        var courseid = $("#return-course").attr('data-id');
        plugin.cursorconfirm({
            title:'请选择时间段',
            info:template('tpl-timeselect',{}),
            success:function(d){
                layui.laydate.render({
                    elem: '#limitdates',
                    max: 0
                });
                layui.laydate.render({
                    elem: '#limitdatee',
                    max: 0
                });
            },
            sureCallback:function(d){
                var strs = d.find('#limitdates').val();
                var stre = d.find('#limitdatee').val();
                if(strs == '' && stre == ''){
                    plugin.openMsg('请至少指定一个时间',1);
                    return 'noclose';
                }
                var sd = new Date(strs);
                var ed = new Date(stre);
                if(ed<=sd){
                    plugin.openMsg('开始时间必须小于结束时间',1);
                    return 'noclose';
                }
                var sds = String(sd.getTime()).slice(0,-3);
                var eds = String(ed.getTime()).slice(0,-3);
                location.href = '/Export/attence/courseid/'+courseid+'.html?begintime='+sds+'&endtime='+eds;
            }
        }); 
    });
    exports.domthing = function(){
        // //
        // $(document).on('click','.attend_attendlist .attend_alname',function(){
        //     var attendid = $(this).parents('.attend_attendlist').data('id');
        //     location.href="/Attence/attence/attenceid/"+attendid+".html";
        // });
        //下载报表
        // $(document).on('click','#downloadAttenceReport,#downloadPerformReport',function(){
        $(document).on('click','#downloadPerformReport',function(){
            var url = $(this).attr('data-href');
            var courseid = $("#return-course").attr('data-id');
            location.href = url;
        });

        //查看某个学生考勤详情
        $(document).on('click','.attend_studentlist',function(){
            var uid = $(this).data('id');
            var courseid = localStorage['cid'];
            // window.open("/Attence/studetail/stuid/"+uid+"/courseid/"+courseid+".html")
            location.href = "/Attence/studetail/stuid/"+uid+"/courseid/"+courseid+".html";
        });
        //新建考勤
        var notfinishdata ;
        $(document).on('click','.btn-createattend',function(){
                var courseid = localStorage['cid'];
                    if(false){
                        plugin.openMsg('暂无成员，无法新建'+attper.curname,1);
                    }else{
                        if(attper.curtype=='attence') {
                            API.attenceApi_getNotFinishAttence(courseid,function(data){
                                notfinishdata = data;
                                if(data.attence!=undefined){
                                    layer.closeAll();
                                    layer.open({
                                        type: 1,
                                        title: false,
                                        closeBtn: false,
                                        area: ['600px', '155px'],
                                        success:function(){
                                            $('#have-attend').attr('data-id',data.attence.id);
                                            $('#have-attend').attr('data-courseid',data.attence.courseid);
                                            $('#have-attend .new-pop-title span').html(data.attence.title).attr('title',data.lists[0].title)
                                        },
                                        content: $('#have-attend'),
                                        shift: 7,
                                        moveType: 1
                                    });
                                }else{
                                    layer.closeAll();
                                    layer.open({
                                        type: 1,
                                        title: false,
                                        closeBtn: false,
                                        area: ['780px', '512px'],
                                        success: function () {
                                            //生成默认的时间
                                            var mydate = new Date();
                                            var dafultTitle = mydate.getFullYear()+"."+plugin.toDouble(mydate.getMonth()+1)+"."+plugin.toDouble(mydate.getDate());
                                            $('#new-perform input').focus().val(dafultTitle);
                                            $('#new-perform .sure').addClass('active');
                                        },
                                        content: $('#new-perform'),
                                        shift: 7,
                                        moveType: 1
                                    });

                                    $('.opt-box').hide();
                                    $('.perform-page .opt-a').css('border', '1px solid #ececec');
                                }
                            });
                        }else if(attper.curtype=='perform'){
                            layer.open({
                                type:1,
                                skin:'layer-ext-ding00',
                                title:'新建'+attper.curname,
                                closeBtn: 0,
                                area:['400px'],
                                content:'<div class="pop-new-2 new-class-pop">\
                                            <div class="input-box">\
                                                <span>'+attper.curname+'名称：</span>\
                                                <input type="text" placeholder="请输入'+attper.curname+'名称">\
                                            </div>\
                                        </div>',
                                success:function(layero){
                                    this.layero = layero;
                                    var sure = layero.find('.layui-layer-btn0'),
                                        cancel = layero.find('.layui-layer-btn1'),
                                        input = layero.find('input');
                                    input.focus();
                                    input.on('keyup',function(){
                                        var value = $(this).val();
                                        if(value){
                                            sure.addClass('active');
                                        }else{
                                            sure.removeClass('active');
                                        }
                                    });
                                    //生成默认的时间
                                    var mydate = new Date();
                                    var dafultTitle = mydate.getFullYear()+"."+plugin.toDouble(mydate.getMonth()+1)+"."+plugin.toDouble(mydate.getDate());
                                    input.focus().val(dafultTitle);
                                    sure.addClass('active');
                                },
                                btn: ['确定', '取消'],
                                yes:function(index){
                                    var self = this.layero.find('.layui-layer-btn0'),
                                        input = this.layero.find('input');
                                    if(self.hasClass('disabled'))return;
                                    if(input.val()){
                                        $(this).addClass('disabled');
                                        createAttence(input.val(),function(data){
                                            
                                            __LOCAL.attendlist.lists.unshift(data.attence);
                                            exports.draw_main();
                                            exports.draw_attendList();
                                            if(data.status===1){
                                                plugin.openMsg('已新建',0);
                                                var txt = plugin.trim($("#search-input").val()||'');
                                                var groupid = $('.title .opt span').attr('data-groupid')||'';
                                                lists(txt,groupid);
                                                curTypeList();
                                            }else{
                                                plugin.openMsg(data.info,1);
                                                self.removeClass('disabled');
                                            }
                                        });
                                        layer.closeAll();
                                    }else{
                                        plugin.openMsg(attper.curname+'名称不能为空',1);
                                    }
                                },
                                canel:function(index){
                                    layer.close(index);
                                },
                                shift:7,
                                moveType: 1
                            })
                        }
                        
                    }
              
                return false;
            });

        var abandonLayer2=null;
        $(document).on('click','#have-attend .cancel',function(){
            abandonLayer2=layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area: ['400px', '196px'],
                content: $('#abandon-attend2'),
                shift: 7,
                moveType: 1
            });
        });
        $(document).on('click','#have-attend .sure',function(){
            var id=$('#have-attend').attr('data-id');
            var courseid=$('#have-attend').attr('data-courseid');
            //console.log( notfinishdata);
            var data = notfinishdata;
            var attence = {
                id:notfinishdata.lists[0].id,
                type:notfinishdata.lists[0].type
            }
           
                    if(attence.type == 1){ //数字考勤
                        layer.open({
                            type: 1,
                            title: false,
                            closeBtn: false,
                            area: ['600px', '510px'],
                            success: function () {
                                $('#number-attend').attr('data-id',attence.id);
                                $('body').attr('data-id',attence.id);
                                $('#number-attend .pop-title h3').html(attence.title);
                                API.attenceApi_getDigitAttence(attence.id,function(data2){
                                    $("#number-attend .ing").html(data2.finishCount);
                                    $("#number-attend .total").html(data2.studentCount);
                                    var code=data2.data.code;
                                    code=code.split('');
                                    $('#number-attend .number-box span').each(function(){
                                        var index=$(this).index();
                                        $(this).html(code[index]);
                                    })
                                });
                                timer=setInterval(function(){
                                    API.attenceApi_getAttenceState(attence.id,function(data2){
                                        status = data2;
                                        if(data2.data == null){
                                            clearInterval(timer);
                                            return;
                                        }
                                        if(data2.data.over==0){
                                            API.attenceApi_getDigitSignIn(attence.id,function(data3){
                                                $("#number-attend .ing").html(data3.signInCount);
                                                $("#number-attend .total").html(data3.studentCount);
                                            });
                                        }else if(data2.data.over==1){
                                            clearInterval(timer);
                                            return;
                                        }
                                    })

                                },3000)
                            },
                            content: $('#number-attend'),
                            shift: 7,
                            moveType: 1
                        })  
                    }else if(attence.type == 2){ //gps考勤
                        layer.open({
                            type: 1,
                            title: false,
                            closeBtn: false,
                            area: ['600px', '510px'],
                            success: function () {
                                $('#gps-attend').attr('data-id',attence.id);
                                $('body').attr('data-id',attence.id);
                                $('#gps-attend .pop-title h3').html(attence.title);
                                API.attenceApi_getDigitAttence(attence.id,function(data2){
                                    $("#gps-attend .ing").html(data2.finishCount);
                                    $("#gps-attend .total").html(data2.studentCount);
                                });
                                timer=setInterval(function(){
                                    API.attenceApi_getAttenceState(attence.id,function(data2){
                                        status = data2;
                                        if(data2.data == null){
                                            clearInterval(timer);
                                            return;
                                        }
                                        if(data2.data.over==0){
                                            API.attenceApi_getDigitSignIn(attence.id,function(data3){
                                                $("#gps-attend .ing").html(data3.signInCount);
                                                $("#gps-attend .total").html(data3.studentCount);
                                            });
                                        }else if(data2.data.over==1){
                                            clearInterval(timer);
                                            return;
                                        }
                                    });
                                },3000);
                            },
                            content: $('#gps-attend'),
                            shift: 7,
                            moveType: 1
                        });
                    }else if(attence.type == 3){
                        var layerIndex = layer.open({
                            type: 1,
                            title: false,
                            closeBtn: false,
                            area: ['800px', '600px'],
                            success: function (content) {
                                var attenceid = attence.id;
                                $('#nows-attend').attr('data-id',attenceid);
                                $('body').attr('data-id',attenceid);
                                $('#nows-attend .pop-title h3').html("扫码考勤 "+attence.title);
                                $(content).find(".qrcode").on("click",function(){
                                    exports.showFullQrcode($(".qrcode").attr('src'));
                                });
                                API.attenceApi_getDigitAttence(data.lists[0].id,function(data2){
                                    $("#nows-attend .checkin-count").html(data2.finishCount);
                                    $("#nows-attend .student-nums").html(data2.studentCount);
                                });
                                API.attenceApi_getQrCode(attenceid,function(qrData){
                                    if(qrData.status == 1){
                                       	if(useWechatCode == true){
                                        	var qrcode = qrData.qrcode;
                                        	var img = new Image();
                                        	img.src = qrcode;
                                        	img.onload = function(){
                                        		useWechatCode = true;
                                                $(".qrcode").attr('src',qrData.qrcode);
                                        	};
                                        	img.onerror = function(){
                                        		useWechatCode = false;
                                        		$(".qrcode").attr('src',qrData.oss_qrcode);
                                        	};	
                                    	}else{
                                        	var qrcode = qrData.oss_qrcode;
                                        	var img = new Image();
                                        	img.src = qrcode;
                                        	img.onload = function(){
                                                $(".qrcode").attr('src',qrData.oss_qrcode);
                                        	};
                                        	img.onerror = function(){
                                        		useWechatCode = true;
                                        		$(".qrcode").attr('src',qrData.qrcode);
                                        	};
                                    	}
                                    }
                                });
                                setQrcodeTime(attenceid);
                                timer=setInterval(function(){
                                    API.attenceApi_getAttenceState(data.lists[0].id,function(data2){
                                        status = data2;
                                        if(data2.data == null){
                                            clearInterval(timer);
                                            // clearInterval(qrcodeTimer);
                                            stoptime = true;
                                            return;
                                        }
                                        if(data2.data.over==0){
                                            API.attenceApi_getDigitSignIn(data.lists[0].id,function(data3){
                                                $(".checkin-count").html(data3.signInCount);
                                                $(".student-nums").html(data3.studentCount);
                                            });
                                        }else if(data2.data.over==1){
                                            clearInterval(timer);
                                            // clearInterval(qrcodeTimer);
                                            stoptime = true;
                                            return;
                                        }
                                    })

                                },3000);
                            },
                            content: $('#nows-attend'),
                            shift: 7,
                            moveType: 1
                        });
                    }

            //location.href="/Attence/index?courseid="+courseid+"&id="+id;
        });
        //取消放弃
        $(document).on('click','#abandon-attend2 .cancel',function(){
            layer.close(abandonLayer2);
        });
        //确认放弃
        $(document).on('click','#abandon-attend2 .sure',function(){
            var id=$('#have-attend').attr('data-id');
            API.attenceApi_delAttence(id,function(data){
                layer.closeAll();
                plugin.openMsg('考勤已放弃',0);
            });
            clearInterval(timer);
        });
        
        $(document).on('focus','#new-perform input',function(){
            $(this).parents('.input-box').addClass('active');
        });
        $(document).on('blur','#new-perform input',function(){
            $(this).parents('.input-box').removeClass('active');
        });
        $(document).on('keyup','#new-perform input',function(){
            var oV=$(this).val();
            if(oV==''){
                $('#new-perform .sure').removeClass('hover').removeClass('active');
            }else{
                $('#new-perform .sure').addClass('active');
            }
        });

        $(document).on('click','#new-perform .cancel,#new-perform .close',function(){
            
            layer.closeAll();
           $("#new-perform").attr("style","");
        });

        $(document).on('click','#new-perform .way a',function(){
            $(this).addClass('active').siblings().removeClass('active');
            $('#new-perform').attr('data-type',$(this).index());
        });

        $(document).on('click','#new-perform .attance-way li',function(){
            $(this).addClass('active').siblings().removeClass('active');
            var type = $(this).attr("data-type");
            $('#new-perform').attr('data-type',type);
        });
        
        $(document).on('mouseenter','#number-attend .tips',function(){
            $('#number-attend .img-tip').fadeIn(100);
        })
        $(document).on('mouseleave','#number-attend .tips',function(){
            $('#number-attend .img-tip').fadeOut(100);
        })

        
        //新建考勤确定
        var bClick=true;
        var timer=null;
        var qrcodeTimer = null;
        $(document).on('click', '#new-perform .sure', function () {
            if(bClick==true){
                bClick=false;
                var oV = $('#new-perform input').val();
                if (oV != '') {
                    if($('#new-perform').attr('data-type')==0){
                        createAttence(oV,function(data){
                            location.href ="/Attence/attence/attenceid/"+data.attenceid+".html";
                        });
                    }else if($('#new-perform').attr('data-type')==1){//数字考勤
                        var courseid = localStorage['cid'];
                        var id='';
                        API.attenceApi_addDigitAttence(courseid,oV,function(data){
                            id=data.attenceid;
                            $('#number-attend').attr('data-id',id);
                            $('body').attr('data-id',id);
                            layer.closeAll();
                             $("#new-perform").attr("style","");
                            layer.open({
                                type: 1,
                                title: false,
                                closeBtn: false,
                                area: ['600px', '510px'],
                                success: function () {
                                    $('#number-attend .pop-title h3').html(oV);
                                    API.attenceApi_getDigitAttence(id,function(data){
                                         console.log("814"+data);
                                        $("#number-attend .ing").html(data.finishCount);
                                        $("#number-attend .total").html(data.studentCount);
                                        var code=data.code.toString();
                                        code=code.split('');
                                        $('#number-attend .number-box span').each(function(){
                                            var index=$(this).index();
                                             $(this).html(code[index]);
                                           
                                        })
                                    });
                                    timer=setInterval(function(){
                                        API.attenceApi_getAttenceState(id,function(data2){
                                            status = data2;
                                            if(data2.attence == null){
                                                clearInterval(timer);
                                                bClick=true;
                                                return;
                                            }
                                            if(data2.attence.finishTime==undefined){
                                                API.attenceApi_getDigitSignIn(id,function(data){
                                                    $("#number-attend .ing").html(data.signInCount);
                                                    $("#number-attend .total").html(data.studentCount);
                                                });
                                            }else if(ata2.attence.finishTime!=undefined){
                                                clearInterval(timer);
                                                bClick=true;
                                                return;
                                            }
                                        })
                                    },3000);
                                    bClick=true;
                                },
                                content: $('#number-attend'),
                                shift: 7,
                                moveType: 1
                            })
                        });
                    }else if($('#new-perform').attr('data-type')==2){//智能人脸考勤
                        var courseid = localStorage['cid'];
                        var id='';
                        API.attenceApi_addFaceAttence(courseid,oV,function(data){
                            id=data.attenceid;
                            $('#Face-attend').attr('data-id',id);
                            $('body').attr('data-id',id);
                            layer.closeAll();
                            layer.open({
                                type: 1,
                                title: false,
                                closeBtn: false,
                                area: ['600px', '510px'],
                                success: function () {
                                    $('#Face-attend .pop-title h3').html(oV);
                                    API.attenceApi_getDigitSignIn(id,function(data){
                                        $("#Face-attend .ing").html(data.signInCount);
                                        $("#Face-attend .total").html(data.studentCount);
                                    });
                                    timer=setInterval(function(){
                                        API.attenceApi_getAttenceState(id,function(data2){
                                            status = data2;
                                            if(data2.attence == null){
                                                clearInterval(timer);
                                                return;
                                            }
                                            if(data2.attence.finishTime==undefined){
                                                API.attenceApi_getDigitSignIn(id,function(data){
                                                    $("#Face-attend .ing").html(data.signInCount);
                                                    $("#Face-attend .total").html(data.studentCount);
                                                });
                                            }else if(data2.attence.finishTime!=undefined){
                                                clearInterval(timer);
                                                bClick=true;
                                                return;
                                            }
                                        })
                                    },3000);
                                    bClick=true;
                                },
                                content: $('#Face-attend'),
                                shift: 7,
                                moveType: 1
                            });
                        });
                     }else if($('#new-perform').attr('data-type')==3){//现场考勤
                        var courseid = $("#return-course").attr('data-id');
                        var id='';
                        API.attenceApi_addNowsAttance(courseid,oV,function(data){
                            id=data.attenceid;
                            $('#nows-attend').attr('data-id',id);
                            $('body').attr('data-id',id);
                            layer.closeAll();
                            layer.open({
                                type: 1,
                                title: false,
                                closeBtn: false,
                                area: ['800px', '600px'],
                                success: function (content) {
                                    $('#nows-attend .pop-title h3').html("扫码考勤 "+oV);
                                    $(content).find(".qrcode").on("click",function(){
                                        exports.showFullQrcode($(".qrcode").attr('src'));
                                    });
                                    API.attenceApi_getDigitAttence(id,function(data){
                                        $(".checkin-count").html(data.finishCount);
                                        $(".student-nums").html(data.studentCount);
                                    });
                                    API.attenceApi_getQrCode(id,function(qrData){
                                        if(qrData.status == 1){
                                           	if(useWechatCode == true){
                                            	var qrcode = qrData.qrcode;
                                            	var img = new Image();
                                            	img.src = qrcode;
                                            	img.onload = function(){
                                            		useWechatCode = true;
                                                    $(".qrcode").attr('src',qrData.qrcode);
                                            	};
                                            	img.onerror = function(){
                                            		useWechatCode = false;
                                            		$(".qrcode").attr('src',qrData.oss_qrcode);
                                            	};	
                                        	}else{
                                            	var qrcode = qrData.oss_qrcode;
                                            	var img = new Image();
                                            	img.src = qrcode;
                                            	img.onload = function(){
                                                    $(".qrcode").attr('src',qrData.oss_qrcode);
                                            	};
                                            	img.onerror = function(){
                                            		useWechatCode = true;
                                            		$(".qrcode").attr('src',qrData.qrcode);
                                            	};
                                        	}
                                        }
                                    });
                                    setQrcodeTime(id);
                                    timer=setInterval(function(){
                                        API.attenceApi_getAttenceState(id,function(data2){
                                            status = data2;
                                            if(data2.data == null){
                                                clearInterval(timer);
                                                // clearInterval(qrcodeTimer);
                                                stoptime = true;
                                                return;
                                            }
                                            if(data2.data.over==0){
                                                API.attenceApi_getDigitSignIn(id,function(data){
                                                    $(".checkin-count").html(data.signInCount);
                                                    $(".student-nums").html(data.studentCount);
                                                });
                                            }else if(data2.data.over==1){
                                                clearInterval(timer);
                                                // clearInterval(qrcodeTimer);
                                                stoptime = true;
                                                bClick=true;
                                                return;
                                            }
                                        })
                                    },3000);
                                    bClick=true;
                                },
                                content:$('#nows-attend'),
                                shift: 7,
                                moveType: 1
                            });
                        });
                    }
                }else{
                    $('#new-perform input').focus();
                    plugin.openMsg('标题不能为空',1,5000);
                    bClick=true;
                }
            }
        });
        //更换验证码
        $(document).on('click','#number-attend .change-one',function(){
            var id=$('#number-attend').attr('data-id');
            API.attenceApi_getAttenceState(id,function(data2){
                if(data2.data == null){
                    plugin.openMsg("考勤已删除",0);
                    clearInterval(timer);
                    setTimeout(function(){
                        location.reload();
                    },600)
                    return;
                }
                if(data2.data.over==0){
                    API.attenceApi_updateDigitAttenceCode(id,function(data){
                        var code=data.code;
                        code=code.split('');
                        $('#number-attend .number-box span').each(function(){
                            var index=$(this).index()
                            $(this).html(code[index])
                        });
                        plugin.openMsg('已更换',0);
                    })
                }else if(data2.data.over==1){
                    plugin.openMsg("考勤已结束",0);
                    clearInterval(timer);
                    setTimeout(function(){
                        location.reload();
                    },600)
                    return;
                }
            })

        });
        //放弃考勤
        var abandonLayer=null;
        $(document).on('click','#number-attend .cancel,#nows-attend .cancel,#Face-attend .cancel,#number-attend .close,#Face-attend .close,#nows-attend .close',function(){
            // var id = $(this).parent().parent().data('id');
            var id = $('body').attr("data-id");
            API.attenceApi_getAttenceState(id,function(data2){
                console.log("1025"+data2);
                if(data2.attence == null){
                    plugin.openMsg("考勤已删除",0);
                    clearInterval(timer);
                    setTimeout(function(){
                        location.reload();
                    },600)
                }
                if(data2.attence.finishTime==undefined){
                    $('#abandon-attend').attr('data-id', id);
                    abandonLayer=layer.open({
                        type: 1,
                        title: false,
                        closeBtn: false,
                        area: ['400px', '196px'],
                        content: $('#abandon-attend'),
                        shift: 7,
                        moveType: 1
                    });
                }else if(data2.attence.finishTime!=undefined&&data2.attence.finishTime!=null){
                    plugin.openMsg("考勤已结束",0);
                    clearInterval(timer);
                    setTimeout(function(){
                        location.reload();
                    },600)
                }
            })
        });
        //取消放弃
        $(document).on('click','#abandon-attend .cancel',function(){
            layer.close(abandonLayer);
        });
        //确认放弃
        $(document).on('click','#abandon-attend .sure',function(){
            var id=$("body").attr('data-id');
            API.attenceApi_delAttence(id,function(data){
                plugin.openMsg('考勤已放弃',0)
                setTimeout(function(){
                    location.reload();
                },600)
            });
            clearInterval(timer);
        });
        //结束考勤
        var endLayer=null;
        $(document).on('click','#number-attend .sure,#Face-attend .sure,#nows-attend .sure',function(){
            var id = $('body').attr('data-id');

            API.attenceApi_getAttenceState(id,function(data2){
                if(data2.attence == null){
                    plugin.openMsg("考勤已删除",0);
                    clearInterval(timer);
                    setTimeout(function(){
                        location.reload();
                    },600)
                }
                if(data2.attence.finishTime==undefined||data2.attence.finishTime==null){
                    $('#end-attend').attr('data-id',id);
                    layer.close(endLayer)
                    endLayer=layer.open({
                        type: 1,
                        title: false,
                        closeBtn: false,
                        area: ['400px', '196px'],
                        content: $('#end-attend'),
                        shift: 7,
                        moveType: 1
                    });
                }else if(data2.attence.finishTime!=undefined&&data2.attence.finishTime!=null){
                    plugin.openMsg("考勤已结束",0);
                    clearInterval(timer);
                    setTimeout(function(){
                        location.reload();
                    },600)
                }
            })

        });
        //取消结束
        $(document).on('click','#end-attend .cancel',function(){
            layer.close(endLayer);
        });
        //确认结束
        $(document).on('click','#end-attend .sure',function(){
            var id=$("body").attr('data-id');
            var type = $("#new-perform").attr('data-type');
            API.attenceApi_overAttence(id,function(data){
                localStorage['attenceid'] = data.attenceId;
                location.href="/html/courseAttenceDetails.html"
            });
            clearInterval(timer);
        });

        function getAttenceTotal(state,change){
            if(state == 4){
                state = 7;
            }
            var attenceid=$('#p-detail').attr('data-id');
            API.attenceApi_getAttenceDetail(attenceid,state,function(data){
                if(change==1){
                    var count=template('tpl-aCount',data);
                    $('#p-detail .total-cont .choose-title').html(count);
                }
                var html=template('tpl-GPSlist',data);
                $('#p-detail .total-cont .list').html(html);
                scrollBar.scrollBar($('#p-detail .total-cont'),$('#p-detail .total-cont .list'));
            })
        }

        //总览切换
        $(document).on('click','#p-detail .total-cont .choose-title a',function(){
            var index=$(this).index();
            getAttenceTotal(index,0);
            $(this).addClass('active').siblings().removeClass('active');
        });
        //获取地理位置的信息
        $(document).on('click','#p-detail .list li',function(){
            var type = $('#p-detail').attr('data-type');
            if(type == 1 || type == 2){
                var studentid = $(this).attr("data-id");
                var attenceid = $('#p-detail').attr('data-id');
                var studentname = $(this).find('.names b').text();
                API.attenceApi_getStudentLocationInfo(attenceid,studentid,function(tData){
                    var tpl = '<div class="map" id="studentMap"></div>';
                    layer.open({
                        type:1,
                        title:studentname+"的地理位置",
                        closeBtn:true,
                        area: ['800px','600px'],
                        shade: 0.3,
                        shadeClose: true,
                        scrollbar: false,
                        content:tpl,
                        success:function(content){
                            getStudentMap(tData.data);
                        },
                        end: function () {
                        }
                    });
                }); 
            }
        });
        
       


        //获取异常
        function getError(){
            var attenceid=$('#p-detail').attr('data-id');
            API.attenceApi_getCluster(attenceid,function(data){
                var html=template('tpl-GPSlist2',data);
                $('#p-detail .error-cont .exlist .null-a').remove();
                $('#p-detail .error-cont .exlist').html(html);                
                $('#p-detail .error-cont .choose-title a:eq(0) i').html(data.exCount);
                $('#p-detail .error-cont .choose-title a:eq(1) i').html(data.noGPSCount);
                $('#p-detail .error-cont .choose-title a:eq(2) i').html(data.ppCount);
                scrollBar.scrollBar($('#p-detail .error-cont'),$('#p-detail .error-cont .exlist'));
            })
        }
        //获取没有开启GPS的签到列表
        function getNoGPSLists(){
            var attenceid=$('#p-detail').attr('data-id');
            API.attenceApi_getCluster(attenceid,function(data){
                var html=template('tpl-GPSlist3',data);
                $('#p-detail .error-cont .noGPSlist .null-a').remove();
                $('#p-detail .error-cont .noGPSlist').html(html);                
                $('#p-detail .error-cont .choose-title a:eq(0) i').html(data.exCount);
                $('#p-detail .error-cont .choose-title a:eq(1) i').html(data.noGPSCount);
                $('#p-detail .error-cont .choose-title a:eq(2) i').html(data.ppCount);
                scrollBar.scrollBar($('#p-detail .error-cont'),$('#p-detail .error-cont .exlist'));
            })
        }
        //获取代签的数据
        function getPPLists(){
            var attenceid=$('#p-detail').attr('data-id');
            API.attenceApi_getCluster(attenceid,function(data){
                var pphtml=template('tpl-pp-lists',data);
                $('#p-detail .error-cont .pplist .null-a').remove();
                $('#p-detail .error-cont .pplist').html(pphtml);
                $('#p-detail .error-cont .choose-title a:eq(0) i').html(data.exCount);
                $('#p-detail .error-cont .choose-title a:eq(1) i').html(data.noGPSCount);
                $('#p-detail .error-cont .choose-title a:eq(2) i').html(data.ppCount);
                scrollBar.scrollBar($('#p-detail .error-cont'),$('#p-detail .error-cont .pplist'));
            });
        }
        var hre={};
        //查看详情
        $(document).on('click', '.title .s-perform li .detail', function () {
            if($(this).parent().parent().attr('data-type')==1){
                $('.p-detail .d-title .item a:eq(1)').removeClass('hide2');
            }else{
                $('.p-detail .d-title .item a:eq(1)').addClass('hide2');
            }
            var id=$("body").attr('data-id');
            var type = $(this).parent().parent().attr('data-type');
            API.attenceApi_getGPSVipCount(id,function(data){
                data.type=type;
                hre.data=data;
                var html=template('tpl-p-detail',data)
                layer.open({
                    type: 1,
                    title: false,
                    closeBtn: false,
                    area: ['600px', '512px'],
                    content: html,
                    success:function(){
                        $('#p-detail').attr('data-id',id);
                        $('#p-detail .total-cont').addClass('hide');
                        $('#p-detail .d-title .item a:eq(0)').click();
                        if(type == 0 || type == 3){
                            $('#p-detail .d-title .item a:eq(1)').hide();
                            $(".has-vip").hide();
                        }
                    },
                    shift: 7,
                    moveType: 1
                });
            });
        });
        //非VIP获取异常考勤
        var errorLayer=null;
        $(document).on('click','#p-detail .get-error-btn',function(){
            var html = template('tpl-review-check',hre.data);
            $(".check-pop").html(html);
            errorLayer=layer.open({
                area:['600px','400px'],
                type: 1,
                title: false,
                closeBtn: false,
                content:$('.check-pop'),
                shift: 7,
                moveType: 1,
                success:function(content){
                    content.find('.get-check').on('click',function(){
                        var attenceid = $("#p-detail").attr("data-id");
                        //var html=template('tpl-p-detail',data);
                        API.attenceApi_useGPS(attenceid,function(){
                            layer.closeAll();
                            API.attenceApi_getGPSVipCount(attenceid,function(data){
                                data.type=1;
                                hre.data=data;
                                var htmls=template('tpl-p-detail',data);
                                layer.open({
                                    type: 1,
                                    title: false,
                                    closeBtn: false,
                                    area: ['600px', '512px'],
                                    content: htmls,
                                    success:function(){
                                        $('#p-detail').attr('data-id',attenceid);
                                        $('#p-detail .total-cont').addClass('hide');
                                        $('#p-detail .d-title .item a:eq(1)').click();
                                    },
                                    shift: 7,
                                    moveType: 1
                                });
                            });
                        })
                    });
                    content.find('.get-vip').on('click',function(){
                        window.open('/VipActivity/vipaction');
                    })
                }
            })
        });
        $(document).on('click','.check-pop .close',function(){
            layer.close(errorLayer);
        });

        //考勤总览和异常切换
        $(document).on('click','#p-detail .d-title .item a:eq(0)',function(){
            $(this).addClass('active').siblings().removeClass('active');
            $('#p-detail .error-cont').addClass('hide');
            $('#p-detail .total-cont').removeClass('hide');
            getAttenceTotal(0,1)
        });
        $(document).on('click','#p-detail .d-title .item a:eq(1)',function(){
            $(this).addClass('active').siblings().removeClass('active');
            $('#p-detail .total-cont').addClass('hide');
            $('#p-detail .error-cont').removeClass('hide');
            $('#p-detail .error-cont .choose-title a:eq(0)').click();
        });

        $(document).on('click','#p-detail .close',function(){
            layer.closeAll();
            var txt = plugin.trim($("#search-input").val()||'');
            var groupid = $('.title .opt span').attr('data-groupid')||'';
            lists(txt,groupid);
            curTypeList();
        });


        //异常签到和gps切换
        $(document).on('click','#p-detail .error-cont .choose-title a:eq(0)',function(){
            $(this).addClass('active').siblings().removeClass('active');
            $('#p-detail .error-cont .map').addClass('hide');
            $('#p-detail .error-cont .exlist').removeClass('hide');
            $('#p-detail .error-cont .noGPSlist').addClass('hide');
            $('#p-detail .error-cont .pplist').addClass('hide');
            getError();

        });
        $(document).on('click','#p-detail .error-cont .choose-title a:eq(1)',function(){
            $(this).addClass('active').siblings().removeClass('active');
            $('#p-detail .error-cont .map').addClass('hide');
            $('#p-detail .error-cont .exlist').addClass('hide');
            $('#p-detail .error-cont .noGPSlist').removeClass('hide');
            $('#p-detail .error-cont .pplist').addClass('hide');
            getNoGPSLists();
        });
        $(document).on('click','#p-detail .error-cont .choose-title a:eq(2)',function(){
            $(this).addClass('active').siblings().removeClass('active');
            $('#p-detail .error-cont .map').addClass('hide');
            $('#p-detail .error-cont .exlist').addClass('hide');
            $('#p-detail .error-cont .noGPSlist').addClass('hide');
            $('#p-detail .error-cont .pplist').removeClass('hide');
            getPPLists();
        });
        $(document).on('click','#p-detail .error-cont .choose-title a:eq(3)',function(){
            $(this).addClass('active').siblings().removeClass('active');
            $('#p-detail .error-cont .map').removeClass('hide');
            $('#p-detail .error-cont .exlist').addClass('hide');
            $('#p-detail .error-cont .noGPSlist').addClass('hide');
            $('#p-detail .error-cont .pplist').addClass('hide');
            getMap();
        });

        //获取地图
        function getMap(){
            var attenceid=$('#p-detail').attr('data-id');
            $('.error-cont .map').html('').removeAttr('style');
            API.attenceApi_getLocation(attenceid,function(data){
                if(data.lists.length==0){
                    var html=$('<p style="text-align: center; line-height: 300px; color: #595959">成员未开启GPS，无法定位</p>')
                    $('.error-cont .map').append(html);
                }else{
                    var map = new BMap.Map("container",{enableMapClick:false});
                    var myIcon = new BMap.Icon("/Public/Home/img/location.png", new BMap.Size(15,36));
                    var point = new BMap.Point(data.centerPoint.longitude, data.centerPoint.latitude);
                    map.centerAndZoom(point, 17);  // 编写自定义函数，创建标注
                    var oval = new BMap.Circle(point,data.radius,{strokeColor:"#3B793E", strokeWeight:2, strokeOpacity:0.6, fillColor:'#DDF1D9', fillOpacity:0.3});
                    map.addOverlay(oval);
                    var zoomopts = {type: BMAP_NAVIGATION_CONTROL_ZOOM ,anchor:BMAP_ANCHOR_BOTTOM_RIGHT}
                    map.addControl(new BMap.NavigationControl(zoomopts));
                    var points=[];
                    var infos=[];
                    for (var i = 0; i < data.lists.length; i ++) {
                        points[i] = new BMap.Point(data.lists[i].attence.longitude, data.lists[i].attence.latitude);
                        var html=template('tpl-map-cont',data.lists[i]);
                        infos[i]=html;
                    }
                    var opts = {
                        width : 250,     // 信息窗口宽度
                        height: 40,     // 信息窗口高度
                        title : "" , // 信息窗口标题
                    };
                    var marker=new Array();
                    for(var i=0; i<points.length; i++){
                        marker[i] =new BMap.Marker(points[i],{icon:myIcon});
                        map.addOverlay(marker[i]);
                    }
                    for(var i=0; i<marker.length; i++){
                        marker[i].index=i;
                        marker[i].addEventListener("click", function(){
                            var infoWindow =new BMap.InfoWindow(infos[this.index],opts)
                            this.openInfoWindow(infoWindow);
                        });
                        marker[i].addEventListener("mouseover", function(){
                            this.Zc.innerHTML = '<img src="/Public/Home/img/location2.png" style="display: block; border:none;margin-left:0px; margin-top:0px; ">';
                            this.Zc.parentNode.style.zIndex=2;
                        });
                        marker[i].addEventListener("mouseout", function(){
                            this.Zc.innerHTML = '<img src="/Public/Home/img/location.png" style="display: block; border:none;margin-left:0px; margin-top:0px; ">';
                            this.Zc.parentNode.style.zIndex=-100;
                            this.hideInfoWindow();
                        });
                    }
                    function ZoomControl(){
                        this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT ;
                        this.defaultOffset = new BMap.Size(537, 22);
                    }
                    ZoomControl.prototype = new BMap.Control();
                    ZoomControl.prototype.initialize = function(map){
                        var div = document.createElement("div");
                        div.style.cursor = "pointer";
                        div.style.background = "url(/Public/Home/img/gocenter.png) 0 0 no-repeat";
                        div.style.width = "30px";
                        div.style.height = "30px";
                        div.onclick = function(e){
                            map.reset()
                        };
                        map.getContainer().appendChild(div);
                        return div;
                    }
                    // 创建控件
                    var myZoomCtrl = new ZoomControl();
                    // 添加到地图当中
                    map.addControl(myZoomCtrl);
                }
            });
        }
        
        function getStudentMap(userData){
            $('#studentMap').html('').removeAttr('style');
            if((userData.latitude==null||userData.latitude==0)&&(userData.longitude==null||userData.longitude==0)){
                var html=$('<p style="text-align: center; line-height: 300px; color: #595959">该学生未开启GPS，无法定位</p>')
                $('#studentMap').append(html);
            }else{
                var map = new BMap.Map("studentMap",{enableMapClick:false});
                var myIcon = new BMap.Icon("/Public/Home/img/location.png", new BMap.Size(15,36));
                var point = new BMap.Point(userData.longitude, userData.latitude);
                map.centerAndZoom(point, 17);  // 编写自定义函数，创建标注
                var oval = new BMap.Circle(point,200,{strokeColor:"#3B793E", strokeWeight:2, strokeOpacity:0.6, fillColor:'#DDF1D9', fillOpacity:0.3});
                map.addOverlay(oval);
                var zoomopts = {type: BMAP_NAVIGATION_CONTROL_ZOOM ,anchor:BMAP_ANCHOR_BOTTOM_RIGHT}
                map.addControl(new BMap.NavigationControl(zoomopts));
                var points=[];
                var infos=[];
                points[0] = new BMap.Point(userData.longitude, userData.latitude);
                var html=template('tpl-student-map',userData);
                infos[0]=html;
                var opts = {
                    width : 250,     // 信息窗口宽度
                    height: 40,     // 信息窗口高度
                    title : "" , // 信息窗口标题
                };
                var marker=new Array();
                for(var i=0; i<points.length; i++){
                    marker[i] =new BMap.Marker(points[i],{icon:myIcon});
                    map.addOverlay(marker[i]);
                }
                for(var i=0; i<marker.length; i++){
                    marker[i].index=i;
                    marker[i].addEventListener("click", function(){
                        var infoWindow =new BMap.InfoWindow(infos[this.index],opts)
                        this.openInfoWindow(infoWindow);
                    });
                    marker[i].addEventListener("mouseover", function(){
                        this.Zc.innerHTML = '<img src="/Public/Home/img/location2.png" style="display: block; border:none;margin-left:0px; margin-top:0px; ">';
                        this.Zc.parentNode.style.zIndex=2;
                    });
                    marker[i].addEventListener("mouseout", function(){
                        this.Zc.innerHTML = '<img src="/Public/Home/img/location.png" style="display: block; border:none;margin-left:0px; margin-top:0px; ">';
                        this.Zc.parentNode.style.zIndex=-100;
                        this.hideInfoWindow();
                    });
                }
                function ZoomControl(){
                    this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT ;
                    this.defaultOffset = new BMap.Size(537, 22);
                }
                ZoomControl.prototype = new BMap.Control();
                ZoomControl.prototype.initialize = function(map){
                    var div = document.createElement("div");
                    div.style.cursor = "pointer";
                    div.style.background = "url(/Public/Home/img/gocenter.png) 0 0 no-repeat";
                    div.style.width = "30px";
                    div.style.height = "30px";
                    div.onclick = function(e){
                        map.reset();
                    };
                    map.getContainer().appendChild(div);
                    return div;
                }
                // 创建控件
                var myZoomCtrl = new ZoomControl();
                // 添加到地图当中
                map.addControl(myZoomCtrl);
            }
        }


        function getOneInfo(obj){
            var aState=['ok','no','late','parse'];
            var name=$(obj).find('span').attr('class')
            var id=$(obj).parents('.map-cont').attr('data-id');
            var attenceid=$('#p-detail').attr('data-id');
            var state=$(obj).attr('data-state');
            if(state==3){
                state=0;
            }else{
                state=state-0+1;
            }
            $(obj).attr('data-state',state);
            changeState(id,attenceid,state,function(data){
                for(var i=0; i<aState.length; i++){
                    if(name==aState[i]){
                        if(i==aState.length-1){
                            $(obj).find('span').attr('class',aState[0])
                        }else{
                            $(obj).find('span').attr('class',aState[i+1])
                        }
                    }
                }
                plugin.openMsg('考勤已变更',0);
            })
        }
        window.getOneInfo = getOneInfo;

        //数据统计
        
        //详情表格
        $(document).on('click','.btn-detail',function(){
            var courseid = $('#return-course').data('id');
           location.href="/attence/excel/courseid/"+courseid+".html";
        })
        //考勤更多
        $(document).on('click','.attend_alrmore',function(){
            if($(this).next().css('display')=='block')
                {
                    $(this).next().css('display','none');
                    return;
                }
            $('.attend_alrmore+ul').css('display','none');
            $(this).next().css('display','block');
            return false;
        })
        //更多出勤率过低学生
        $(document).on('click','.btn-moreattstu',function(){
            
        })

        //删除考勤
        $(document).on('click','.btn_delete_attend',function(){
            var _this = $(this);
            var _par = _this.parents('.attend_attendlist');
            var id = _par.data('id');
            layer.confirm('',{
                btn:['确认','取消'],
                title:false,
                skin:'layer-ext-ding00',
                content:'<p style="font-size:18px;height:50px;padding:10px 0 20px 0;">确认删除此次考勤?</p>',
                closeBtn: 0,
                shift:7,
                moveType: 1,
                area:['400px'],
                success:function(dialog){
                    $(dialog).find('.layui-layer-btn0').addClass('active');
                }
            },function(index){
                //ajax  通过id 删除考勤
                API.attenceApi_delAttence(id,function(data){
                    if(data.status==1){
                        ArrayUtil.delete(__LOCAL.attendlist.lists,id);               
                        layer.close(index)
                        plugin.openMsg('删除成功',0)
                        exports.draw_attendList(__LOCAL.attendlist);
                    } 
                })
                //回调 success
            })

        })
        //重命名
        $(document).on('click','.btn_altertitle_attend',function(){
            var _this = $(this)
            var _par = _this.parents('.attend_attendlist')
            var title = $.trim(_par.find('.attend_alname').html());
            layer.open({
                type:1,
                skin:'layer-ext-ding00',
                title:'请输入考勤名称',
                area:['450px'],
                content:'<input id="alterattencetitle" type = "text" value="'+title+'" placeholder="请输入考勤名称" style="width:90%;margin:0 20px;border:none;border-bottom:1px solid #328eeb;line-height:30px;"/>',
                btn:['确定','取消'],
                success:function(i){
                    $(i).find('input').on('input',function(){
                        var value = $.trim($(this).val());
                        if(value == ''||value ==title ){
                            $(i).find('.layui-layer-btn0').removeClass('active');
                        }else{
                            $(i).find('.layui-layer-btn0').addClass('active');
                        }
                    })
                },
                yes:function(i){
                    var attenceid = _par.data('id');
                    var value = $.trim($('#alterattencetitle').val());
                    API.attenceApi_renameAttence(attenceid,value,function(data){
                        if(data.status == 1){
                            plugin.openMsg('修改成功',0);
                            _par.find('.attend_alname').html(value)
                        }
                    });

                    layer.close(i);
                }

            })
        })


        $(document).bind("click", function(){
            $('.attend_alrmore+ul').css('display','none');
        });
        
    }


    ArrayUtil = {
        delete:function(array,id){//删除id为id的array数据
            //这里没有把双重循环写到里面是因为，当删除了文件夹和作业两种类型时，如果两种类型是两个数据库表，出现id相同的情况
            for(var i= 0;i<array.length;i++){
                if(array[i].id==id){
                    array.splice(i,1);//从下标i位置删除一个
                    break;
                }
            }
        },
        filter:function(array,byarray,value){
            var newarray = [];
            for(var i = 0;i<array.length;i++){
                for(var j = 0 ;j<byarray.length;j++){
                    if(array[i][byarray[j]].match(value)){
                        newarray.push(array[i]);
                        break;
                    }
                }
            }
            //console.log(newarray)
            return newarray;
        },
        getByKeyValue:function(array,key,value){
            var newarray = [];
            for(var i = 0;i<array.length;i++){
                if(array[i][key]==value){
                    newarray.push(array[i])
                }
            }
            return newarray;
        },
        sortBy:function(array,key,type,turn){//倒序排列
            //console.log(key+'---'+type+'---'+turn)
            type = type?type:'number';
            turn = turn?turn:'up';
            if(key=="attendstate"||key=="gpsstate") turn = turn=='down'?'up':'down';
            if(type == 'number'){
                if(turn == 'up'){
                    array.sort(function(a,b){
                        if(a[key]>b[key]) return -1;
                        if(a[key]==b[key]) return 0;
                        if(a[key]<b[key]) return 1;
                    });
                }else{
                    array.sort(function(b,a){
                        if(a[key]>b[key]) return -1;
                        if(a[key]==b[key]) return 0;
                        if(a[key]<b[key]) return 1;
                    });
                }
            }else{
                if(turn == "up"){
                    array.sort(function(a,b){
                        return a[key].localeCompare(b[key])
                    });
                }
                else{
                    array.sort(function(b,a){
                        return a[key].localeCompare(b[key])
                    });
                }
            }
        },
    }


    exports.showFullQrcode = function(qrcode){
        var done = $('.checkin-count').html();
        var count = $('.student-nums').html();
        //console.log([done,count]);
        var tpl = template('tpl-show-attence-full-qrcode',{qrcode:qrcode,done:done,count:count});
        var layerIndex = layer.open({
            type:1,
            title:false,
            closeBtn:true,
            area: ['100%','100%'],
            shade: 0.5,
            shadeClose: true,
            scrollbar: false,
            content:tpl,
            success:function(content){
                $(content).find(".course_qcode").parents(".layui-layer ").css({'background-color':'rgba(255,255,255,0)'});
                $(content).find(".left-innerbox").on("click",function(){
                    return false;
                });
                $(content).find(".right-innerbox").on("click",function(){
                    return false;
                });
                $(content).on("click",function(){
                    layer.close(layerIndex);
                });
            },
            end: function () {
            }
        });
    };
     //新建考勤//新建课堂表现
    function createAttence(title,callback){
        var courseid = $("#return-course").attr('data-id');
        attper.Api_add(courseid,title,function(data){
            callback(data);
        });
    }
     //获取学生数据
    function lists(txt,groupid,callback){
    	exports.draw_main();
        exports.draw_attendList();
    }
     //获取考勤列表//获取表现列表
    function curTypeList(callback){
    	
    };

})
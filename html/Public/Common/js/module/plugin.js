define(function(require, exports, module) {
    var $ = require('jquery');
    var layer = require('layer');
    // var layer = require('layuiV3');
    var template = require('art-template');
    var BatAdd = require("../../../Home/js/bataddq.js");
    var API = require('API');
    var logDebug = true;
    if(layer.v == '3.1.1'){
        layer.config({
            extend: ['style.css'],
        });
    }else{
        layer.config({
            extend: ['style.css'],
        });
    }
    
    if (typeof window.console != 'object') {
        window.console = {};
        console.log = function() {};
        console.error = function() {};
        console.info = function() {};
    }else{
    	console.log = (function(oriLogFunc){
    		return function(str){
    			if(logDebug == true){
        	        oriLogFunc.call(console,str);
    			}
    	    }
    	})(console.log);
    };
    //产生min ≤ r ≤ max随机数
    exports.randomNumBoth = function(Min,Max){
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    };
    //延时执行函数
    exports.delayRun = function(code, time) {
        var t = setTimeout(code, time);
    };
    //将某个数，四舍五入之后，保留x位小数
    exports.toDecimal = function(num,x) {  
        var f = parseFloat(num);  
        if (isNaN(f)) {  
            return;  
        }
        var target = 10*x;
        if(x <= 0){
        	target = 1;
        }
        f = Math.round(target*num)/target;
        return f;  
    }  
    //转为两位数
    exports.toDouble = function(n) {
        if (n < 10) {
            return '0' + n;
        } else {
            return '' + n;
        }
    };
    //转为1位数
    exports.toSingle = function(n) {
        return n < 10 ? Number(n) : n;
    };
    
    //忽略一个消息，右上角变化，并且同步localStorage.message
    exports.ignoreOneMsgDomChange = function(id){
        if($('.notice-ct dl[data-id='+id+']').size()==0){
            return;
        }else{
            $('.notice-ct dl[data-id='+id+']').remove();
        }
        if($('.notice-ct dl').size()==0){
            $("#notice span").remove();
            setTimeout(function(){
                $(".notice-ct p.zw").removeClass("hide");
            },600)
        }else{
            $("#notice span").text($('.notice-ct dl').size());
            $('.notice-ct .dl-box').height($('.notice-ct .dl-box').height()-81);
        }
        if(localStorage.message){
            localStorage.message = localStorage.message.replace(id,'');
        }
    };
    /*************art-template的公用函数*******/
    exports.templateConfig = function(tplObj){
    	if(tplObj==null || tplObj == undefined) return;
    	tplObj.helper('month_day_hour_min', function (unixTime) {
    		if(unixTime <= 0) return unixTime;
            return exports.time_format_month_day_hour_min(unixTime);
        });
    	tplObj.helper('year_month_days_hour_min', function (unixTime) {
    		if(unixTime <= 0) return unixTime;
            return exports.time_format_year_month_day_hour_min(unixTime);
        });
    	tplObj.helper('year_month_day', function (unixTime) {
    		if(unixTime <= 0) return unixTime;
            return exports.time_format_year_month_days(unixTime);
        });
    	tplObj.helper('year_month_day2', function (unixTime) {
    		if(unixTime <= 0) return unixTime;
            return exports.time_format_year_month_day(unixTime);
        });
    	tplObj.helper('date2', function (unixTime) {
        	if(unixTime <= 0) return unixTime;
            return exports.time_format_year_month_day_hour_min(unixTime);
        });
    	tplObj.helper('month_day', function (unixTime) {
    		if(unixTime <= 0) return unixTime;
        	return exports.time_format_month_day(unixTime);
        });
    	tplObj.helper('hour_min', function (unixTime) {
    		if(unixTime <= 0) return unixTime;
            return exports.time_format_hour_min(unixTime);
        });
    	tplObj.helper('ymdhm',function(unixTime){
    		if(unixTime <= 0) return unixTime;
    		return exports.time_format_year_month_day_hour_min(unixTime);
    	});
    	tplObj.helper('count',function(arr){
        	if(arr == null) return 0;
    		if (arr instanceof Array) {
            	return arr.length;	
    		}else{
    			return arr;
    		}
        });
    	tplObj.helper('time_format', function (unixTime) {
    		if(unixTime <= 0) return unixTime;
            return exports.time_format_year_month_days(unixTime);
        });
    	tplObj.helper('substr15',function(a){
    		return exports.subStringLen(a,15);
        });
    	tplObj.helper('delTag',function(content){
            return exports.delHtmlTag(content);
        });
    	tplObj.helper('delEmpty', function (a) {
            return exports.removeLastEmpty(a);
        });
    	tplObj.helper('letter',function(a){
            return String.fromCharCode(65 + a);
        });
        tplObj.helper('letterround',function(a){
            if(a<26){
                return String.fromCharCode(65 + a);
            }else{
                var round = Math.floor(a/26);
                var index = a%26;
                var roundchar = String.fromCharCode(65+(round-1));
                var indexchar = String.fromCharCode(65+index);
                return roundchar+indexchar;
            }
            
        });
    	tplObj.helper('string',function(n){
            return String.fromCharCode(65 + n);
        });
    	tplObj.helper('isAns',function(a,b){
            if(a==null){
                return '';
            }
            if(a.indexOf(b)!=-1){
                return 'isAns';
            }else{
                return '';
            }
        });
    	tplObj.helper('resetdesc',function(content){
            var imgreg = /<img (?!class="kfformula")[^>]*?[^>]*?>/g;
            if(imgreg.test(content)){
                return content.match(imgreg)[0]+exports.subStringLen(exports.delHtmlTag(content),160);
            }else{
                return exports.subStringLen(exports.delHtmlTag(content),160);
            }
        });
    	tplObj.helper('brdispose',function(content){
        	if(content == null || content == ""){
        		return content;
        	}
            var content = content.replace(/\n/g, "<br>");
            return content;
        });
        //获取选项名称
    	tplObj.helper('getChoice',function(index){
    		return exports.getChoice(index);
        });
        //选中答案处理
    	tplObj.helper('match',function(left, myanswer){
        	if(myanswer == null) return 0;
        	var aList = myanswer.split("|");
        	for(var i=0; i<aList.length; i++){
        		if(left == aList[i]){
        			return 1;
        		}
        	}
        	return 0;
        });
    	//获取测试的试题类型
    	tplObj.helper('getTestSubjectType',function(type){
    		return exports.getTestSubjectType(type);
        });
    	//获取互动的试题类型
    	tplObj.helper('getInteractSubjectType',function(type){
    		return exports.getInteractSubjectType(type);
        });
    	//对试题进行格式化后显示
    	tplObj.helper('formatTestSubject',function(subject){
    		if(subject == null || subject == undefined){
    			return "";
    		}
    		var title = exports.delHtmlTag(subject['title']);
    		var options = subject['options'];
    		var optionStr = "";
    		if(options != null && options != undefined){
        		for(var i=0;i<options.length;i++){
        			optionStr += exports.getChoice(i)+"、"+exports.delHtmlTag(options[i].title)+"<br/>";
        		}
    		}
    		var content = title +"<br/>"+ optionStr;
    		return content;
    	});
    	return tplObj;
    };
    //从某个网页里面获取内容
    var templatePageCached = {};
    exports.fetchHtml = function(url, cbSuccess, cbFail) {
    	var deferred = $.Deferred();
    	var cacheData = templatePageCached[url];
    	if(cacheData){
            cbSuccess && cbSuccess(cacheData);
            deferred.resolve(cacheData);
    	}else{
            $.ajax({
                cache:true,
                type: 'GET',
                url: url,
                dataType: 'html',
                success: function(data, status, xhr){
            		templatePageCached[url] = data;
                    cbSuccess && cbSuccess(data);
                    deferred.resolve(data);
                },
                error: function(xhr, errorType, error){
                    cbFail && cbFail();
                    deferred.reject();
                }
            });	
    	}
        return deferred.promise();
    };
    //template webpage版本，可以支持 从远程网页里面获取内容，然后提取 id值来处理
    //如果pageurl为空的话，表示当前的页面拥有此id值,如果pageurl不为空，则说明可以从当前的url里面获取页面
    exports.webtemplate = function(id,data,url,callback){
    	var deferred = $.Deferred();
    	if(url == "" || url == null || url == undefined){
    		var tpl = template(id,data);
    		callback && callback(tpl);
    		deferred.resolve(tpl);
    	}else{
    		exports.fetchHtml(url,function(tData){
    			var scriptList = $(tData).filter('script');
    			scriptList.each(function(index,item){
    				var scriptId = $(item).attr('id');
    				if(scriptId == id){
    					var content = $(item).html();
    	    			if(content.length > 0){
    	    				var renderDialog = template.compile(content);
    	    				var html = renderDialog(data);
    	    				callback && callback(html);
    	    				deferred.resolve(html);
    	    			}
    				}
    			});
    		});	
    	}
    	return deferred.promise();
    };
    //使用原生的部分
    exports.webnativetemplate = function(id,data,url,callback){
    	var deferred = $.Deferred();
    	if(url == "" || url == null || url == undefined){
    		var tpl = nativetemplate(id,data);
    		callback && callback(tpl);
    		deferred.resolve(tpl);
    	}else{
    		exports.fetchHtml(url,function(tData){
    			var scriptList = $(tData).filter('script');
    			scriptList.each(function(index,item){
    				var scriptId = $(item).attr('id');
    				if(scriptId == id){
    					var content = $(item).html();
    	    			if(content.length > 0){
    	    				var renderDialog = nativetemplate.compile(content);
    	    				var html = renderDialog(data);
    	    				callback && callback(html);
    	    				deferred.resolve(html);
    	    			}
    				}
    			});
    		});
    	}
    	return deferred.promise();
    };
    /****************试题相关的*****************/
    exports.getTestSubjectType = function(type){
		if(type == 1){
			return "判断题";
		}else if(type == 2){
			return "单选题";
		}else if(type == 3){
			return "多选题";
		}else if(type == 4){
			return "简答题";
        }else if(type == 5){
        	return "填空题";
		}else if(type == 6){
        	return "不定项题";
		}else if(type == 7){
        	return "文件题";
		}else if(type == 10){
			return "段落说明";
		}
    };
    exports.getInteractSubjectType = function(type){
		if(type == 1){
			return "判断题";
		}else if(type == 2){
			return "单选题";
		}else if(type == 3){
			return "多选题";
		}else if(type == 4){
			return "简答题";
        }else if(type == 5){
        	return "投票题(单选)";
		}else if(type == 6){
			return "投票题(多选)";
		}else if(type == 7){
			return "数值评价题";
		}else if(type == 8){
			return "匿名开放题";
		}else if(type == 9){
			return "拍照题";
		}
    };
    exports.getChoice = function(index){
        if(index<26){
            return String.fromCharCode(65+index);
        }else{
            var round = Math.floor(index/26);
            var index3 = index%26;
            var roundchar = String.fromCharCode(65+(round-1));
            var indexchar = String.fromCharCode(65+index3);
            return roundchar+indexchar;
        }
    	// var ala = ["A",'B', "C", 'D','E','F','G','H','I','J','K','L','N','M','O','P','Q','R','S','T','U','V','W','X','Y','Z']; 
    	// return ala[index];
    }
    /*************html转义相关的函数**************/
    exports.htmlEncode = function(value){
    	var entityMap = {
    			  '&': '&amp;',
    			  '<': '&lt;',
    			  '>': '&gt;',
    			  '"': '&quot;',
    			  "'": '&#39;',
    			  '/': '&#x2F;',
    			  '`': '&#x60;',
    			  '=': '&#x3D;'
    	};
    	return String(value).replace(/[&<>"'`=\/]/g, function (s) {
    	    return entityMap[s];
    	});
    };
    /*************获取浏览器的版本*****************/
    exports.getBrowserType = function() { 
      var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
      var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器 
      var isIE=window.ActiveXObject || "ActiveXObject" in window
      var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
      var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器 
      var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器 
      var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1&&!isEdge; //判断Chrome浏览器 
      if (isIE){ 
         var reIE = new RegExp("MSIE (\\d+\\.\\d+);"); 
         reIE.test(userAgent); 
         var fIEVersion = parseFloat(RegExp["$1"]); 
         if(userAgent.indexOf('MSIE 6.0')!=-1){
             return "IE6";
         }else if(fIEVersion == 7){ 
        	 return "IE7";
         }else if(fIEVersion == 8){ 
        	 return "IE8";
         }else if(fIEVersion == 9){ 
        	 return "IE9";
         }else if(fIEVersion == 10){ 
        	 return "IE10";
         }else if(userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)){ 
        	 return "IE11";
         } 
         else{ 
        	 return "0"
         }//IE版本过低
       }
       if (isFF) { return "FF";} 
       if (isOpera) { return "Opera";} 
       if (isSafari) { return "Safari";} 
       if (isChrome) { return "Chrome";} 
       if (isEdge) { return "Edge";} 
     };
    /*************检查文件上传的最大文件大小***********/
    exports.getMaxUploaderFileSize = function(){
    	var maxLimit = 1024*1024*500;
    	return maxLimit;
    };
    exports.getUploaderLimitFileSize = function(callback){
    	var limit = 1024*1024*500;
        // API.VipApi_isVip(function(data){
        //     if(data.isVip==1){
        //         limit = 1024*1024*500;
        //     }else{
        //         limit = 1024*1024*150;
        //     }
        //     if(callback){
        //     	callback(limit);
        //     }
        //     exports.setStore('isVip',data.isVip);
        //     exports.setStore('uid',data.uid);
        //     exports.setStore("UploaderFileMaxSize",limit);
        // });
        return limit;
    };
    /*************按钮控制事件******************/
    exports.btnControl = function(obj,text,disabled,cssClass){
    	if(obj == null || obj == undefined){
    		return;
    	}
    	if(disabled == null || disabled == undefined){
    		disabled = false;
    	}
    	if(cssClass=="" || cssClass == null || cssClass == undefined){
    		cssClass = 'active';
    	}
    	if(disabled == false){
    		obj.addClass(cssClass);
    	}else{
    		obj.removeClass(cssClass);
    	}
		obj.text(text);
		obj.attr('disabled',disabled);
    };
    /*************msg消息弹出*******************/
    var gTimer=null;
    exports.openMsg = function(info, type) {
        clearTimeout(gTimer);
        var timeout = arguments[2]?arguments[2]:3000;
        var msg = "";
        if(type == 0){ //默认是黑色
            msg = '<div class="gTips" id="show-tip"><span>'+info+'</span><i class="icon icon-notify-close"></i></div>';
        }else if(type == 1){//红色
            msg = '<div class="gTips" id="error-tip"><span>'+info+'</span><i class="icon icon-notify-close"></i></div>';
        }
        $('.gTips').remove();
        $('body').append(msg);
        $('.gTips').animate({
            bottom: '40px',
            opacity: 1
        }, 300,function(){
        	$('.gTips').animate({
        		bottom: '50px',
                opacity: 1
            },600);
        });
        gTimer=setTimeout(function(){
            $('.gTips').animate({
                bottom: '40px',
                opacity: 0
            }, 300,function(){
                $('.gTips').remove();
            })
        },timeout);
    };
    $(document).on('click','.gTips .icon-notify-close',function(){
    	$(this).parents('.gTips').remove();
    });
    /****************弹出确认和取消框***********/
    exports.cursorconfirm = function(opts){
        var v={},timestamp = new Date().getTime(),options = {
            title:'',
            info:'',
            canel:'取消',
            sure:'确定',
            ccls:'',
            scls:'',
            width:'300px',
            canelCallback:function(){
                $("#confirm-"+timestamp+",#isDel-"+timestamp).remove();
            }
        }
        $.extend(options,opts);
        v._tpl = {
            dialog:'<div class="confirm" id="confirm-'+timestamp+'" style="display:block;width:'+options.width+'">\
                        <div class="contentc">\
                          <h3 class="title fs30">'+options.title+'</h3>\
                            <p class="info fs28">'+options.info+'</p>\
                            <div class="opt">\
                                <a href="javascript:;" class="btn canel">'+options.canel+'</a>\
                                <a href="javascript:;" class="btn sure">'+options.sure+'</a>\
                            </div>\
                        </div>\
                    </div>',
            modal:'<div class="pop-bg isDel" id="isDel-'+timestamp+'" style="display:block"></div>'
        }
        $(v._tpl.dialog).appendTo("body");
        $(v._tpl.modal).appendTo("body");
        var dialogId = "#confirm-"+timestamp;
        if(options.success){
            options.success($(dialogId));
        }
        $(dialogId).find('.canel').on('click',function(){
        	if(options.canelCallback){
            	options.canelCallback($(dialogId));	
        	}
        	$("#confirm-"+timestamp+",#isDel-"+timestamp).remove();
        });
        
        $(dialogId).find('.btn.sure').on('click',function(){
            if(options.sureCallback){
                 var needclose = options.sureCallback($(dialogId));
                 if(needclose == 'noclose'){
                     return false;
                 }
            }
            $("#confirm-"+timestamp+",#isDel-"+timestamp).remove();
        });
    };

    exports.blankalert =function(opts){
        var v={},timestamp = new Date().getTime(),options = {
            title:'',
            info:'',
            sure:'确定',
            maskclose:false
        }
        $.extend(options,opts);
        v._tpl = {
            dialog:'<div class="weui_dialog_alert" id="alert-'+timestamp+'">\
                        <div class="weui_mask"></div>\
                        <div class="weui_dialog" style="width:auto;padding:30px;">'+options.title+'\
                        </div>\
                    </div>'
        }
        $(v._tpl.dialog).appendTo("body:last");
        if(options.initCallback){
        	options.initCallback(v._tpl.dialog);
        }
        if(options.success){
            options.success($("#alert-"+timestamp));
        }
        if(options.maskclose == true){
        	$("#alert-"+timestamp).find('.weui_mask').on('click',function(){
        		$("#alert-"+timestamp).remove();
        	});
        }
        $(document).on('click','.dialogClose',function(){
        	$("#alert-"+timestamp).remove();
            if(options.sureCallback){
            	 options.sureCallback($("#alert-"+timestamp));
            }
        });
    };

    
    /**
     * alert的窗口
     */
    exports.cursoralert =function(opts){
        var v={},timestamp = new Date().getTime(),options = {
            title:'',
            info:'',
            sure:'确定'
        }
        $.extend(options,opts);
        v._tpl = {
            dialog:'<div class="weui_dialog_alert" id="alert-'+timestamp+'">\
                        <div class="weui_mask"></div>\
                        <div class="weui_dialog">\
                            <div class="weui_dialog_hd">\
                                <strong class="weui_dialog_title">'+options.title+'</strong>\
                            </div>\
                            <div class="weui_dialog_bd">'+options.info+'</div>\
                            <div cl\ass="weui_dialog_ft">\
                                <a href="javascript:;" class="weui_btn_dialog primary">'+options.sure+'</a>\
                            </div>\
                        </div>\
                    </div>'
        }
        $(v._tpl.dialog).appendTo("body");
        var dialogID = "#alert-"+timestamp;
        if(options.success){
        	$(dialogID).remove();
            options.success($(dialogID));
        }
        $(dialogID).find('.weui_btn_dialog').on('click',function(){
            $(dialogID).remove();
            if(options.sureCallback){
            	 options.sureCallback($(dialogID));
            }
        })
    }
    /**
     * alerttips的提示窗口
     */
    exports.alerttips =function(opts){
        var v={},timestamp = new Date().getTime(),options = {
            info:'',
            sure:'确定'
        }
        options = $.extend({},options,opts);
        options['timestamp'] = timestamp;
        var tpl = '<div class="weui_dialog_alert" id="alert-{{timestamp}}">\
        			<div class="weui_mask"></div>\
        			<div class="weui_alert_pop_dialog">\
        				<div class="weui_dialog_pop_bd">{{info}}</div>\
        				<div cl\ass="weui_dialog_pop_ft">\
        					{{if cancle}}\
        					<a href="javascript:;" class="weui_btn_pop_cancle_dialog cancle">{{cancle}}</a>\
        					{{/if}}\
        					<a href="javascript:;" class="weui_btn_pop_dialog sure primary">{{sure}}</a>\
        				</div>\
        			</div>\
        		</div>';
        
        var renderDialog = template.compile(tpl);
        var html = renderDialog(options);
        
        v._tpl = {
            dialog:html
        }
        $(v._tpl.dialog).appendTo("body");
        var dialogID = "#alert-"+timestamp;
        if(options.success){
            options.success($(dialogID));
        }
        $(dialogID).find('.weui_dialog_pop_ft .sure').on('click',function(){
            if(options.sureCallback){
            	 options.sureCallback($(dialogID));
            }
            $(dialogID).remove();
        });
        if($(dialogID).find('.weui_dialog_pop_ft .cancle').length > 0){
            $(dialogID).find('.weui_dialog_pop_ft .cancle').on('click',function(){
                if(options.cancleCallback){
                	 options.cancleCallback($(dialogID));
                }
                $(dialogID).remove();
            });	
        }
    };
    /************调出奖励星星的工具弹窗*********/
    exports.givePerformReward = function(opts){
    	var options = {
    			studentname:'',
    			courseid:'',
    			studentid:'',
    			type:'课堂提问',
    			giveReward:null,
    	};
    	$.extend(options,opts);
    	var studentname = options.studentname;
    	var courseid = options.courseid;
    	var studentid = options.studentid;
    	var giveReward = options.giveReward;
    	var rewardType = options.type;
        var attenceDialogtpl = template('tpl-perform-bandit-dialog',[]);
        layer.open({
            type:1,
            skin:'layer-ext-ding00',
            title:'给  “'+studentname+'” 奖励星星，可累计',
            closeBtn: 0,
            shift:7,
            moveType: 1,
            area:['355px'],
            content:attenceDialogtpl,
            success:function(layero){
        		this.layero = layero;
        	 	var self = $(layero).find('.layui-layer-btn0');
        	 	self.addClass('active');
        	 	$(layero).find('.performChangeDialog ul li').on('click',function(){
        	 		$(layero).find('.performChangeDialog ul li.active').removeClass('active');
        	 		$(this).addClass('active');
        	 	});
            },
            btn: ['确定奖励', '取消'],
            yes:function(index){
            	var liIndex = this.layero.find('.performChangeDialog ul li.active').attr('data-star');
            	if(liIndex == undefined){
            		plugin.openMsg("请选择奖励的星星",1,5000);
            		return false;
            	}
            	if(liIndex == "" ){
            		liIndex = this.layero.find('.performChangeDialog ul li.active input').val();
            		if(liIndex == ""){
            			plugin.openMsg("请输入星星数",1,5000);
            			this.layero.find('.performChangeDialog ul li.active input').focus();
            			return false;
            		}
            		if(!isNaN(liIndex)){
            		}else{
            			plugin.openMsg("请输入数字",1,5000);
            			this.layero.find('.performChangeDialog ul li.active input').val('');
            			return false;
            		}
            	}
               	var _this = this;
               	_this.layero.find(".layui-layer-btn0").removeClass('active').html('正在奖励...');
               	giveReward(courseid,studentid,liIndex,function(data){
               		_this.layero.find(".layui-layer-btn0").removeClass('active').html('确定奖励');
               		layer.close(index);
                	var title = '恭喜  “'+studentname+'” 获得课堂提问奖励';
                	var info = "本次奖励 "+liIndex+" 星星；"+rewardType+"已奖励累计："+data.totalStars+" 星星";
                	exports.cursoralert({title:title,info:info});
            	});
            },
            canel:function(index){
                layer.close(index);
            }
        });
    };
    /****************调出打分器*************/
    var layerTipsIndex = -1;
    exports.giveScorePanle = function(opts){
        var options = {
        		score:5,
        		direct:4,
        		width:'auto',
        		height:'90px',
        		backgroundColor:'#e9f4f0',
        		timeout:15000,
        }
        $.extend(options,opts);
        var maxScore = options.score;
        var scoreAarry = new Array();
        var splitNum = 5;
        var pointNums = 1;
        if(maxScore > 5){
        	options.height = '90px';
        	splitNum = 10;
        	pointNums = 0;
        }
        for(var i=0;i<=splitNum;i++){
        	var tScore = (maxScore/splitNum)*i;
        	tScore = exports.toDecimal(tScore,pointNums);
        	scoreAarry.push(tScore);
        }
        var tpl = '<ul class="give-score-pannel">\
        			{{each scoreAarry as val index}}\
					<li data-score="{{val}}" {{if index==0}}class="zero"{{/if}} {{if index==scoreAarry.length-1}}class="zero"{{/if}} >{{val}}</li>\
					{{/each}}\
					<li><input value="" placeholder="其他" /></li>\
					</ul>';
		var renderDialog = template.compile(tpl);
	    var html = renderDialog({scoreAarry:scoreAarry});
	    
    	var layerIndex = layer.tips(html, options.target,{
    		area:[options.width,options.height],
    		shift:5,
    		closeBtn:true,
            tips: [options.direct,options.backgroundColor],
            time: options.timeout,
            zIndex:9999,
            success:function(content){
    			$(content).find('.give-score-pannel li').on('click',function(){
    				var clickScore = $(this).attr('data-score');
    				if(clickScore=="" || clickScore == undefined){
    					return;
    				}
    				if(options.Callback){
    					options.Callback(clickScore);
    				}
    				layer.close(layerIndex);
    			});
    			$(content).find('.give-score-pannel li input').on('blur',function(){
    				var val = $(this).val();
    				if(isNaN(val)){
    	                $(this).val(parseFloat(val).toString().match(/[0-9]\d*|0/g)||'');
    	                $(this).focus();
    	                exports.openMsg("得分必须>=0",1);
    	                return;
    	            }
    				if(val == ""){
    					layer.close(layerIndex);
    					return;
    				}
       				if(val == " "){
    					val = "未批";
    				}else{
    	  				val = parseFloat($(this).val());
        				if(val > maxScore){
        					val = maxScore;
        					$(this).val(maxScore);
        				}	
    				}
    				if(options.Callback){
    					options.Callback(val);
    				}
    				layer.close(layerIndex);
    			});
            }
    	});
    	layerTipsIndex = layerIndex;
    	return layerIndex;
    };
    exports.closeGiveScorePanle = function(layerIndex){
    	if(layerIndex != undefined){
    		layer.close(layerIndex);
    	}else{
    		layer.close(layerTipsIndex);
    	}
    };
    /****************调出某个互动题目的词云*************/
    exports.openInteractWordCloud = function(subjectid,callback){
    	exports.openWordCloudDialog(subjectid,API.InteractApi_getWordsCloud,callback);
    };
    exports.openWordCloudDialog = function(id,ApiFun,callback){
   	 var tpl = '<link href="/Public/Common/js/lib/jqcloud/jqcloud.min.css" rel="stylesheet" type="text/css">\
   		 <div class="wordcloud-area"><div class="wordtips">正在生成词云</div></div>';
   	 var layerIndex = -1;
   		require.async("jqcloud",function(){
   			layerIndex = layer.open({
				type:1,
		        skin:'layer-ext-ding00',
	            title:false,
	            closeBtn: true,
	            maxmin: true, 
		        area:['90%','90%'],
		        content:tpl,
		        success:function(layero){
					ApiFun(id,function(tData){
						layero.find(".wordcloud-area .wordtips").remove();
    	 				if(callback){
    	 					callback(tData);
    	 				}
	    	 			if(tData.status == 0){
	    	 				exports.openMsg(tData.info,1,5000);
	    	 				layer.close(layerIndex);
	    	 			}else{
	    	 				var dataCloud = [];
	    	 				for(var i=0; i<tData.words.length; i++){
	    	 					var word = tData.words[i];
	    	 					var item = {text:word['word'],weight:word['weight']};
	    	 					dataCloud.push(item);
                             }
                             layero.find(".wordcloud-area").css({'width':'100%','height':'100%'});
	    					layero.find(".wordcloud-area").jQCloud(dataCloud,{
	    				 		autoResize: true,
	    				 		delay: 50,
	    				 		fontSize: {
	    				 			from: 0.1,
	    				 			to: 0.02
	    				 		}
	    				 	});
	    	 			}
	    	 		});
	        	},
	        	shift:7,
	            moveType: 1
	     });
   		});
    };
    /****************检查用户是否为VIP，并进行弹窗******/
    exports.checkVipDilog = function(courseid,opts,callback){
        var options = {
            title:'您不是VIP用户，无法使用此功能',
            tips:'点击了解此功能特点',
            index:0
        }
        $.extend(options,opts);
        
    	var tpl = '<div class="vip-info-pop-dialog">\
    					<a href="javascript:;" class="close"></a>\
    					<h3>'+options.title+'</h3>\
    					<p><a target="_blank" href="/VipActivity/feainfo/#'+options.index+'\">（'+options.tips+'）</a></p>\
    					<a href="/VipActivity/pay" target="_blank" class="get-btn get-vip">立即开通VIP</a>\
    					<div class="tips">\
    	    				<span>VIP特权：无限次作业查重，压缩包在线解压预览，上传文件上限500M...</span>\
    	    				<a href="/VipActivity/feainfo" target="_blank">查看更多</a>\
    	    			</div>\
    	    		</div>';
    	
    	if($(".vip-info-pop-dialog").length>0){
    		$(".vip-info-pop-dialog").remove();
    	}
    	if(courseid != ""){
    		exports.mloading();
        	API.VipApi_isCourseVip(courseid,function(data){
        		exports.closeLoading();
        		if(data.isVip == 1){
        			if(callback){
        				callback(data);
        			}
        		}else{
        			var layerindex = layer.open({
        				area:['600px','400px'],
        	            type: 1,
        	            title: false,
        	            closeBtn: false,
        	            content:tpl,
        	            shift: 7,
        	            moveType: 1,
        	            success:function(content){
        					$(content).find(".close").on("click",function(){
        						layer.close(layerindex);
        					});
        	            }
        	         });
        		}
        	});	
    	}else{
    		exports.mloading();
    		API.VipApi_isVip(function(data){
    			exports.closeLoading();
        		if(data.isVip == 1){
        			if(callback){
        				callback(data);
        			}
        		}else{
        			var layerindex = layer.open({
        				area:['600px','400px'],
        	            type: 1,
        	            title: false,
        	            closeBtn: false,
        	            content:tpl,
        	            shift: 7,
        	            moveType: 1,
        	            success:function(content){
        					$(content).find(".close").on("click",function(){
        						layer.close(layerindex);
        					});
        	            }
        	         });
        		}
    		});
    	}
    };
    /****************检查学生是否不是vip用户并弹窗*******************/
    exports.checkStudentVipDilog = function(opts,callback){
        var options = {
            title:'您不是VIP用户，无法使用此功能',
            tips:'点击了解此功能特点',
            index:0
        }
        $.extend(options,opts);
        
    	var tpl = '<div class="vip-info-pop-dialog">\
    					<a href="javascript:;" class="close"></a>\
    					<h3>'+options.title+'</h3>\
    					<p><a target="_blank" href="/VipActivity/feainfo/#'+options.index+'\">（'+options.tips+'）</a></p>\
    					<a href="/VipActivity/pay" target="_blank" class="get-btn get-vip">立即开通VIP</a>\
    					<div class="tips">\
    	    				<span>VIP特权：获取作业查重率，查看谁提交了作业，压缩包在线解压预览...</span>\
    	    				<a href="/VipActivity/feainfo" target="_blank">查看更多</a>\
    	    			</div>\
    	    		</div>';
    	
    	if($(".vip-info-pop-dialog").length>0){
    		$(".vip-info-pop-dialog").remove();
    	}
		exports.mloading();
		API.VipApi_isVip(function(data){
			exports.closeLoading();
    		if(data.isVip == 1){
    			if(callback){
    				callback(data);
    			}
    		}else{
    			var layerindex = layer.open({
    				area:['600px','400px'],
    	            type: 1,
    	            title: false,
    	            closeBtn: false,
    	            content:tpl,
    	            shift: 7,
    	            moveType: 1,
    	            success:function(content){
    					$(content).find(".close").on("click",function(){
    						layer.close(layerindex);
    					});
    	            }
    	         });
    		}
		});
    };
    /*************文件大小格式化显示**************/
    exports.format_bytes = function(size) {
        var units = new Array(
            'B',
            'KB',
            'MB',
            'GB',
            'TB',
            'PB'
        );
        var i = 0;
        for (i = 0; size >= 1024 && i < 5; i++)
            size /= 1024;
        return Math.round(size, 2) + units[i];
    };
    /******************获取文件的ext的图标********************/
    exports.getFileExtIcon = function(ext) {
        if (ext == null || ext == "") {
            return "/Public/Common/img/fileicon/folds.png";
        }
        var picUrl = "/Public/Common/img/fileicon/file_ext_big_";
        var extArray = ["pdf","doc","docx","zip","xls","xlsx","vsd","psd","ppt","pptx","html","rar","wps","et","dps","txt"];
        if($.inArray(ext, extArray) == -1){
        	picUrl += "others.png";
        }else {
            picUrl += ext;
            picUrl += ".png";
        }
        return picUrl;
    };
    exports.getFileExt = function(filename){
    	if(filename == null){
    		return "";
    	}
		var point = filename.lastIndexOf("."); 
	    var type =  filename.substr(point+1); 
	    return type;
    };
    /*****************时间戳格式化**************************/
    //年
    exports.time_format_year = function(unixTime) {
        var time = new Date(unixTime * 1000);
        var ymdhis = "";
        ymdhis += time.getFullYear();
        return ymdhis;
    };
    //月/日
    exports.time_format_month_days = function(unixTime) {
        var time = new Date(unixTime * 1000);
        var ymdhis = "";
        ymdhis += exports.toDouble((time.getMonth() + 1)) + "/";
        ymdhis += exports.toDouble(time.getDate());
        return ymdhis;
    };
    //年/月/日
    exports.time_format_year_month_days = function(unixTime) {
        var time = new Date(unixTime * 1000);
        var ymdhis = "";
        ymdhis += (time.getFullYear() + "").substring(2) + "/";
        ymdhis += exports.toDouble((time.getMonth() + 1)) + "/";
        ymdhis += exports.toDouble(time.getDate());
        return ymdhis;
    };
    //年-月-日
    exports.time_format_year_month_day = function(unixTime) {
        var time = new Date(unixTime * 1000);
        var ymdhis = "";
        ymdhis += time.getFullYear() + "-";
        ymdhis += exports.toDouble((time.getMonth() + 1)) + "-";
        ymdhis += exports.toDouble(time.getDate());
        return ymdhis;
    };
    //月-日
    exports.time_format_month_day = function(unixTime) {
        var time = new Date(unixTime * 1000);
        var ymdhis = "";
        ymdhis += exports.toDouble((time.getMonth() + 1)) + "月";
        ymdhis += exports.toDouble(time.getDate()) + "日";
        return ymdhis;
    };
    exports.time_format_month_day_d = function(unixTime) {
        var time = new Date(unixTime * 1000);
        var ymdhis = "";
        ymdhis += exports.toDouble((time.getMonth() + 1)) + "-";
        ymdhis += exports.toDouble(time.getDate());
        return ymdhis;
    };
    //小时和分钟
    exports.time_format_hour_min = function(unixTime) {
        var time = new Date(unixTime * 1000);
        var ymdhis = "";
        ymdhis += exports.toDouble(time.getHours()) + ":";
        ymdhis += exports.toDouble((time.getMinutes()));
        return ymdhis;
    };
    //月-日 小时：分
    exports.time_format_month_day_hour_min = function(unixTime) {
        var time = new Date(unixTime * 1000);
        var ymdhis = "";
        ymdhis += exports.toDouble((time.getMonth() + 1)) + "月";
        ymdhis += exports.toDouble(time.getDate()) + "日   ";
        ymdhis += exports.toDouble(time.getHours()) + ":";
        ymdhis += exports.toDouble((time.getMinutes()));
        return ymdhis;
    };

    //月-日 小时：分2
    exports.time_format_year_month_day_hour_min = function(unixTime) {
        var time = new Date(unixTime * 1000);
        var ymdhis = "";
        ymdhis += (time.getFullYear() + "").substring(2) + "/";
        ymdhis += exports.toDouble((time.getMonth() + 1)) + "/";
        ymdhis += exports.toDouble(time.getDate()) + "   ";
        ymdhis += exports.toDouble(time.getHours()) + ":";
        ymdhis += exports.toDouble((time.getMinutes()));
        return ymdhis;
    };
    /*************浏览器全屏和退出全屏控制***********/
    exports.fullScreen = function(callback) {
        var el = document.documentElement;
        if (!!window.ActiveXObject || "ActiveXObject" in window){
        	el = document.body;
        }
        var rfs = el.requestFullScreen ||el.requestFullscreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen|| el.msRequestFullscreen;
        var  wscript;
        if(typeof rfs != "undefined" && rfs) {
            rfs.call(el);
            if(callback){
            	callback(true);
            }
            return;
        }
        if(typeof window.ActiveXObject != "undefined") {
            wscript = new ActiveXObject("WScript.Shell");
            if(wscript) {
                wscript.SendKeys("{F11}");
                if(callback){
                	callback(true);
                	return;
                }
            }
        }
        if(callback){
        	callback(false);
        }
    };
    exports.requestFullScreen = function() {
    	exports.fullScreen();
    };
    exports.exitFullScreen = function(callback) {
        var el = document;
        var cfs = el.cancelFullScreen || el.cancelFullscreen || el.webkitCancelFullScreen 
        		  || el.mozCancelFullScreen || el.exitFullScreen 
        		  || el.msExitFullscreen;
        var wscript;
        if (typeof cfs != "undefined" && cfs) {
            cfs.call(el);
            if(callback){
            	callback(true);
            }
            return;
        }
        if (typeof window.ActiveXObject != "undefined") {
            wscript = new ActiveXObject("WScript.Shell");
            if (wscript != null) {
                wscript.SendKeys("{F11}");
                if(callback){
                	callback(true);
                }
                return;
            }
        }
        if(callback){
        	callback(false);
        }
    };
    /****************附件预览窗口弹出**********************/
    exports.openPreviewDialog = function(file,obj){
    	var tpl = '<div id="previewContainer" tabindex="-1" style="display: block;">\
    				<div class="toolbar">\
        				<div class="file-name pre-ellipsis">{{name}}</div>\
        				<div class="file-nav">\
        					<button type="button" id="prevFile" title="上一个文件"><i class="icon icon-preview icon-preview-prev"></i></button>上下切换文件\
        					<button type="button" id="nextFile" title="下一个文件"><i class="icon icon-preview icon-preview-next"></i></button>\
        				</div>\
        				<div class="file-action">\
        					{{if iscourseware}}\
        					<button type="button" id="file_comments" data-title="评论"><i class="icon icon-preview icon-preview-comments"></i></button>\
        					{{/if}}\
        					<button type="button" class="all-screen" title="全屏"><i class="icon icon-preview icon-preview-pres"></i></button>\
        					<a href="{{url}}" title="下载文件"><i class="icon icon-preview icon-preview-download"></i></a>\
        					{{if role==1}}\
        					<button type="button" id="more_action" data-title="更多"><i class="icon icon-preview icon-preview-more"></i></button>\
        					{{/if}}\
        				</div>\
        				<div class="view-action">\
        					<button type="button" id="close_view" title="关闭"><i class="icon icon-preview icon-preview-close"></i></button>\
        				</div>\
        				<div id="loadingBar" class="hidden" style="width:10px;">\
        	            	<div class="progress" style="height: 100%; width: 100%;">\
        	                	<div class="glimmer"></div>\
        	                	</div>\
        	                </div>\
        	            </div>\
        		   <div tabindex="0" class="preview-content full" {{if !iscourseware||full==1}}style="right:0px;"{{/if}}>\
        		   		<div id="viewerContainer" class="control-mover" tabindex="1">\
        		   			<iframe id="iframeviewerId" class="fileViewer iframeViewer" allowFullScreen="true" src="{{rurl}}"></iframe>\
        		   		</div>\
        		   		<div class="viewer-container-loading"><img src="/Public/Common/img/loading-icon_big.gif" /></div>\
        		   </div>\
        		</div>';
        var full = exports.getQuery('full');
        if(full == undefined  || full == "" || full == 0){
        	full = 0;
        }
        var renderDialog = template.compile(tpl);
        var html = renderDialog(file);
        var isCourseware = file['iscourseware'];
        if(isCourseware == 1){
        	obj.parents('li').find('.courseware-comment-counts-tips').remove();
        }
        var commentHtml = "";
        var layerIndex = layer.open({
        	type:1,
        	shift:8,
        	title:'',
        	closeBtn:false,
        	area: ['100%','100%'],
        	skin: 'layui-layer-nobg',
        	shadeClose: false,
        	scrollbar: false,
        	content:html,
        	success:function(content){
        		if(isCourseware == 1){
                    var commentTpl = '<div class="preview-sidebar">\
        				<button type="button" class="toggle-button"><i class="icon icon-preview icon-preview-toggle"></i></button>\
        				<div class="sidebar-content">\
        					<ul class="tabs">\
        						<li class="active" data-slidebar-nav="comments">\
        							<a href="#preview_comments" class="separator">评论</a>\
        						</li>\
        					</ul>\
        				<div class="content" id="preview_comments">\
        					<div class="comments">\
        						<ul class="comment-list"></ul>\
        						<div class="comment-add">\
        							<div class="avatar">\
        								<img src="{{avatar}}" alt="{{username}}" width="32" height="32">\
        							</div>\
        							<div class="comment-add-main">\
        								<textarea class="comment-input" maxlength="1000" placeholder="输入评论..."></textarea>\
        								<div class="switchbutton">\
    										<input class="switchbutton-checkbox" id="onoffswitch" type="checkbox">\
    										<label class="switchbutton-label" for="onoffswitch">\
    											<span class="switchbutton-inner" data-on="匿名" data-off="实名"></span>\
    											<span class="switchbutton-switch"></span>\
    										</label>\
    									</div>\
        								<button type="button" class="pure-button button-primary addComment" title="按ctrl+enter快速发表">发表评论</button>\
        								<button type="button" class="pure-button cancel">取消</button>\
        							</div>\
        						</div>\
        					</div>\
        				</div>\
        			</div>\
        			</div>';
        			
        			var discussTpl = '<li class="newcomment" data-id="{{id}}">\
        								<div class="comment-item">\
        			    				<div class="avatar">\
        		       						<img src="{{avatar}}" alt="{{username}}" width="32" height="32">\
        		       					</div>\
        		       					<div class="comment-main">\
        		       						<a href="#" class="username" title="{{username}}">{{username}}</a>\
        		       						<span class="comment-time"><span class="dynamic-relative-time" data-absolute-time="{{createtime}}">{{timetips}}</span></span>\
        		       						{{if del==1}}\
        		       						<a href="javascript:;" class="act delete deleteCoursewareComment"><i class="icon icon-delete-comment"></i>删除</a>\
        		       						{{/if}}\
        		       						<div class="comment-content">{{#content}}</div>\
        		       					</div>\
        		       					</div>\
        		       				</li>';
        		    var coursewareid = file['coursewareid'];
        		    API.CoursewareDiscussApi_getDiscussList(coursewareid,0,500,function(data){
        	        	var commentRender = template.compile(commentTpl);
        	        	commentHtml = commentRender(data);
            			$(content).find(".preview-content").after(commentHtml);
        	        	var disRender = template.compile(discussTpl); 
        	        	for(var i=0;i<data.lists.length;i++){
        	        		var discuss = disRender(data.lists[i]);
        	        		$(content).find('.comment-list').append(discuss);
        	        	}
            			var previewContent = $(content).find('#previewContainer');
            			if(full == 0){
                			$(content).find(".preview-content").removeClass('full');	
            			}
            			$(content).find(".toggle-button").on('click',function(){
            				if($(content).find(".preview-content").hasClass('full')){
            					$(content).find(".preview-content").removeClass('full');
            				}else{
            					$(content).find(".preview-content").addClass('full');
            				}
            			});
            			$(content).find("#file_comments").on('click',function(){
            				$(content).find(".toggle-button").click();
            			});
            			previewContent.find('.comment-input').each(function () {
            				var height = this.scrollHeight;
            				if($(this).val() == ''){
            					height = 39;
            				}
            				this.setAttribute('style', 'height:' + height + 'px;overflow-y:hidden;');
            			}).on('input', function () {
            				this.style.height = 'auto';
            				var height = this.scrollHeight;
            				if($(this).val() == ''){
            					height = 39;
            				}
            				this.style.height = height + 'px';
            			});
            			//将这些消息变成已读
            			API.CoursewareDiscussApi_readIt(coursewareid,function(){});
            			//发布评论
            			$(document).on('click','#previewContainer .addComment',function(){
            				var anonymous = previewContent.find('.switchbutton-checkbox').is(':checked');
            				if(anonymous == true){
            					anonymous = 1;
            				}else{
            					anonymous = 0;
            				}
            				var comment = previewContent.find('.comment-input').val();
            				if(comment != ''){
            					previewContent.find('.comment-input').val('');
            					API.CoursewareDiscussApi_addDiscussByAnonymous(coursewareid,comment,'','',anonymous,function(disData){
                	        		var discuss = disRender(disData.data);
                	        		previewContent.find('.comment-list').prepend(discuss);
            					});
            				}else{
            					return false;
            				}
            			});
            			$(document).keypress(function(e){
            				var isCtrlEnter = false;
            			    if(e.ctrlKey && e.which == 13 || e.which == 10) {
            			    	isCtrlEnter = true;
            			    }else if (e.shiftKey && e.which==13 || e.which == 10) {
            			    	isCtrlEnter = true;
            			    }
            			    if(isCtrlEnter == true){
            			    	$('#previewContainer .addComment').click();
            			    }
            			})
            			//删除掉评论
            			$(document).on('click','#previewContainer .deleteCoursewareComment',function(){
            				var id = $(this).parents("li").attr('data-id');
            				var li = $(this).parents("li");
            				exports.cursorconfirm({
            					title:'是否删除？',
            					info:'您是否要删除该评论？',
            					canel:'取消',
            					sure:'确定',
            					sureCallback:function(dialog){
            						API.CoursewareDiscussApi_delDiscuss(id,function(){
            							li.remove();
            							exports.openMsg('评论已删除',0);
            						});
            						return;
            		            }
            				});
            			});
        		    });
        		    var moreTpl = '<div id="more_menu" style="position: absolute; z-index: 1002; top: 51px; right: 80px; display: block;">\
        		        			<ul>\
                    				<li id="file_properties"><i class="icon icon-preview icon-preview-prop"></i>重命名</li>\
                    				</ul>\
                    			</div>';
                    var reNameFileTpl = '<div class="little-pop pop-new-2" style="display: block;" id="rename-File-Name">\
                        			<div class="title">\
                    					<h3>重命名文件</h3>\
                    				</div>\
                    				<div class="input-box">\
                    					<span>文件名：</span>\
                    					<input type="text" class="txt1" placeholder="请输入文件名">\
                    				</div>\
                    				<div class="btns" style="padding:0">\
                    					<a href="javascript:;" class="cancel">取消</a>\
                    					<a href="javascript:;" class="sure active">确定</a>\
                    				</div>\
                    			</div>';
        		    //显示更多的弹窗
        		    $(content).find('#more_action').on('click',function(){
        		    	if($(content).find('#more_menu').length > 0){
        		    		$(content).find('#more_menu').remove();
        		    	}else{
        		    		$(content).append(moreTpl);
                		    $(content).find('#file_properties').on('click',function(){
                		    	$(content).find('#more_menu').remove();
                		    	var fileName = $(content).find('.toolbar .file-name').text();
                		    	var fileExt = (/[.]/.exec(fileName)) ? /[^.]+$/.exec(fileName.toLowerCase()) : '';
                		    	var fileName = fileName.replace(/.*(\/|\\)/, "");
                		    	var renameFileIndex = layer.open({
                		                type: 1,
                		                title: false,
                		                closeBtn: false,
                		                area: ['400px'],
                		                content: reNameFileTpl,
                		                success:function(renameContent){
                		    				$(renameContent).find('#rename-File-Name').show();
                		    				$(renameContent).find('#rename-File-Name .txt1').focus().val(fileName);
                		    				$(renameContent).find('.cancel').on('click',function(){
                		    					layer.close(renameFileIndex);
                		    					return false;
                		    				});
                		    				$(renameContent).find('#rename-File-Name .sure.active').on('click',function(){
                		    					 var oV= $(renameContent).find('#rename-File-Name input').val();
                		                         if(oV==''){
                		                             plugin.openMsg('请输入文件名',1);
                		                         }else{
                		                        	 layer.close(renameFileIndex); 
                		                         }
                		                         API.coursewareApi_renameFileName(coursewareid,oV,function(returnData){
                		                        	 $(content).find('.toolbar .file-name').text(returnData.fileName);
                		                        	 if(obj != null){
                    		                        	 obj.parents('li').find('h3 a').text(returnData.fileName); 
                		                        	 }
                		                         });
                		                         return false;
                		    				});
                		                },
                		                shift: 7,
                		                moveType: 1
                		         });
                		    });
        		    	}
        		    });
        		};
        		$(content).find(".icon-preview-download").on('click',function(){
        			var parent = $(this).parent();
        			var href = parent.attr("href");
        			if(href!=undefined && href!="" && href!="javascript:;" && href!=null){
        				location.href = href;
        			}else{
        				exports.cursoralert({
        					title:'系统提示',
        					info:'老师已经将此课件设置为 不可下载，您只能在线查看！',
        				});
        				return false;
        			}
        		});
        		$(content).find('#close_view').on('click',function(){
        			layer.close(layerIndex);
        			exports.exitFullScreen();
        		});
        		//全屏
        		$(content).find('.all-screen').on('click',function(){
        			$(this).removeClass('all-screen').addClass('exit-screen');
        			$(this).attr('title','取消全屏');
        			exports.requestFullScreen();
            		$(content).find('.exit-screen').on('click',function(){
            			$(this).removeClass('exit-screen').addClass('all-screen');
            			$(this).attr('title','全屏');
            			exports.exitFullScreen();
            		});
        		});
        		$(content).find('#loadingBar').removeClass('hidden');
        		var timer = setInterval(function(){
        			var width = $(content).find('#loadingBar').width();
        			$(content).find('#loadingBar').width(width+5);
        		},50);
        		$(content).find('.iframeViewer').load(function(){
        			$(content).find('#loadingBar').width('100%');
        			setTimeout(function(){
            			$(content).find('.viewer-container-loading').addClass('hidden');
            			$(content).find('#loadingBar').addClass('hidden');
            			clearInterval(timer);
        			},500);
        		});
        		//上一个文件
        		$(content).find('#prevFile').on('click',function(){
        			var parentObj = obj.parents('li');
        			if(parentObj.length > 0){
        				if(parentObj.prev().length == 0){
        					exports.openMsg('前面没有了',1,2000);
        					return;
        				}
            			while(parentObj.prev() != null && parentObj.prev().length > 0){
            				if(parentObj.prev().find(".fileext").length > 0){
            					parentObj = parentObj.prev();
            					if(parentObj.attr('data-folder') != 1){
            						var fileext = parentObj.find(".fileext");
            				    	var preFile = [];
            				    	preFile['name'] = fileext.attr('data-name');
            				    	preFile['url'] = fileext.attr('data-down');
            				    	preFile['rurl'] = fileext.attr('data-url');
            				    	var iscourseware = fileext.attr('data-iscourseware');
            				    	if(iscourseware == 1){
            				        	var id = fileext.attr('data-id');
            				        	var role = fileext.attr('data-role');
            				        	preFile['iscourseware'] = iscourseware;
            				        	preFile['coursewareid'] = id;
            				        	preFile['role'] = role;
            				    	}
            				    	exports.openPreviewDialog(preFile,fileext);
            				    	layer.close(layerIndex);
                		     		break;	
            					}
            		     	 }
            		     	 parentObj = parentObj.prev();
            		    }
        			}
        		});
        		//下一个文件
        		$(content).find('#nextFile').on('click',function(){
        			var parentObj = obj.parents('li');
        			if(parentObj.length > 0){
        				if(parentObj.next().length == 0){
        					exports.openMsg('后面没有了',1,2000);
        					return;
        				}
            			while(parentObj.next() != null && parentObj.next().length > 0){
            				if(parentObj.next().find(".fileext").length > 0){
            					parentObj = parentObj.next();
            					if(parentObj.attr('data-folder') != 1){
            						var fileext = parentObj.find(".fileext");
            				    	var preFile = [];
            				    	preFile['name'] = fileext.attr('data-name');
            				    	preFile['url'] = fileext.attr('data-down');
            				    	preFile['rurl'] = fileext.attr('data-url');
            				    	var iscourseware = fileext.attr('data-iscourseware');
            				    	if(iscourseware == 1){
            				        	var id = fileext.attr('data-id');
            				        	var role = fileext.attr('data-role');
            				        	preFile['iscourseware'] = iscourseware;
            				        	preFile['coursewareid'] = id;
            				        	preFile['role'] = role;	
            				    	}
            				    	exports.openPreviewDialog(preFile,fileext);
            				    	layer.close(layerIndex);
                		     		break;	
            					}
            		     	 }
            		     	 parentObj = parentObj.next();
            		    }	
        			}   			
        		});
        	}
        });
        
    }
    /****************附件在线预览的处理*********************/
    exports.preview = function(obj) {
        var src = obj.attr('data-src');
    	var file = [];
    	if(obj.attr('data-name') == null || obj.attr('data-name') == ""){
    		file['name'] = "文件预览";	
    	}else{
        	file['name'] = obj.attr('data-name');	
    	}
    	var iscourseware = obj.attr('data-iscourseware');
    	if(iscourseware == 1){
        	var id = obj.attr('data-id');
        	var role = obj.attr('data-role');
        	file['iscourseware'] = iscourseware;
        	file['coursewareid'] = id;
        	file['role'] = role;
    	}
    	file['url'] = obj.attr('data-down');
    	file['rurl'] = obj.attr('data-url');
    	exports.openPreviewDialog(file,obj);
    };
    //预览视频
    exports.previewVideo = function(obj){
        var ispic = obj.attr('data-ispic');
        var isvideo = obj.attr('data-isvideo');
        if(obj.hasClass('previewVideo') && isvideo == 1){
            require.async(["lib/videojs/video-js.css","video"],function(ev,ek){
                var myPlayer = null;
                var vurl = obj.attr("data-url");
                var source = '<div class="video-play">' + '<a href="javascript:;" class="cancel">关闭</a>' + '<div class="video-js-box">' + '<video id="simple_video" class="video-js" width="1024" height="576" controls autoPlay preload="auto" data-setup="{}">' + '<source src="' + vurl + '" type="video/mp4" />' + '<source src="' + vurl + '" type="video/m3u8" />' + '<source src="' + vurl + '" type="video/3gp:large" />' + '<source src="' + vurl + '" type="video/webm" />' + '<source src="' + vurl + '" type="video/3gp:small" />' + '<object id="flash_fallback_1" class="vjs-flash-fallback" width="1024" height="576" type="application/x-shockwave-flash" data="http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf">' + '<param name="movie" value="http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf" />' + '<param name="allowfullscreen" value="true" />' + '<param name="flashvars" value="config={playlist:[http://video-js.zencoder.com/oceans-clip.png, {url: ' + vurl + ',autoPlay:false,autoBuffering:true}]}" />' + '<embed src="' + vurl + '" width="1024" height="576" />' + '</object>' + '</video></div></div>';
                if (!myPlayer) {
                    if($('.bg').size()>0){
                        $('.bg').show()
                    }else{
                        $('body').append('<div class="bg" style="display:block"></div>')
                    }
                    $('body').append(source);
                    myPlayer = videojs('simple_video');
                }
                $('.video-play .cancel').on("click", function() {
                    $(".video-play").remove();
                    $('.bg').hide();
                    if (myPlayer != null) {
                        myPlayer.dispose();
                        myPlayer = null;
                    }
                });
            });
        	return false;
        }
    };
    exports.previewImg = function(obj) {
    	//exports.previewImgNew(obj);
    };
    exports.showImgInTime = function(obj) {
        require.async(['lib/preview/viewer.css','lib/preview/viewer.js'],function(ev,ek){
            var ispic = obj.attr('data-ispic');
            var src = obj.attr('data-src');
            if (ispic == 1) {
                $(obj).viewer({
                    navbar: false,
                    title: false,
                    button:false,
                    simple:true,
                    fullscreen: false,
                    inbody:true,
                    keyboard: false,
                    url: 'data-src',
                    show: function() {
                       
                    }
                });
                $(obj).find("img").click();
                return;
            }
        });
    };
    //图片放大和缩小的工具
    exports.zoomImg = function(obj){
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
    };
    exports.previewImgNew = function(obj,opts) {
		var downUrl = obj.attr('data-down');
		var src = obj.attr('data-src');
		if(downUrl == "" || downUrl == null){
			downUrl = src;
		}
    	var options = {
    			navbar: false,
				title: false,
				downUrl: downUrl,
				fullscreen: true,
				inbody:true,
				keyboard: false,
				url: 'data-src',
    	};
    	$.extend(options,opts);
    	require.async(['lib/preview/viewer.css','lib/preview/viewer.js'],function(ev,ek){
    		var ispic = obj.attr('data-ispic');
    		if (ispic == 1) {
    			$(obj).viewer(options);
    			$(document).on('click', '.viewer-container .download a', function() {
    				$(this).attr('href', downUrl);
    			});
    			return;
    		}
    	});
    };
    //图片标题加预览
    $(document).on("click", "a[data-ispic=1]:not(:has(img))", function(e) {
        if ($(this).data("src")) {
            var parent = $(this).parents("li:has(img)").eq(0);
            if (parent.find("img[src='" + $(this).data("src") + "']").size()) {
                parent.find("img[src='" + $(this).data("src") + "']").trigger("click");
            } else if (parent.find("img[data-src='" + $(this).data("src") + "']").size()) {
                parent.find("img[data-src='" + $(this).data("src") + "']").trigger("click");
            }
        }
        e.stopPropagation();
    })
    $(document).on('click', '.fileext.preview', function() {
        exports.preview($(this));
    });
    $(document).on('click', '.fileext.previewVideo', function() {
        exports.previewVideo($(this));
    });
    //编辑状态附件预览
    $(document).on('click', '.annex-box .file-cont', function() {
        $(this).prev('.fileext').find('img').trigger('click');
    });

    /***************去掉所有空格**************************/
    exports.trimall = function(str) {
        if (str == "" || str == null) return "";
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g, "");
        result = result.replace(/\s/g, "");
        return result;
    };
    exports.trim = function(str) {
        if (str == "" || str == null) return "";
        return str.replace(/(^\s*)|(\s*$)/g, "");
    };
    
    /*********************输入编辑框处理*********************/
    exports.autoTextarea = function(elem, extra, maxHeight) {
        extra = extra || 0;
        var isFirefox = !! document.getBoxObjectFor || 'mozInnerScreenX' in window,
            isOpera = !! window.opera && !! window.opera.toString().indexOf('Opera'),
            addEvent = function(type, callback) {
                elem.addEventListener ?
                    elem.addEventListener(type, callback, false) :
                    elem.attachEvent('on' + type, callback);
            },
            getStyle = elem.currentStyle ? function(name) {
                var val = elem.currentStyle[name];

                if (name === 'height' && val.search(/px/i) !== 1) {
                    var rect = elem.getBoundingClientRect();
                    return rect.bottom - rect.top -
                        parseFloat(getStyle('paddingTop')) -
                        parseFloat(getStyle('paddingBottom')) + 'px';
                };
                return val;
            } : function(name) {
                return getComputedStyle(elem, null)[name];
            },
            minHeight = 30;
        elem.style.resize = 'none';
        var change = function() {
            var scrollTop, height,
                padding = 0,
                style = elem.style;

            if (elem._length === elem.value.length) return;
            elem._length = elem.value.length;

            if (!isFirefox && !isOpera) {
                padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
            };
            scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            style.height = minHeight + 'px';
            if (elem.scrollHeight > minHeight) {
                if (maxHeight && elem.scrollHeight > maxHeight) {
                    height = maxHeight - padding;
                    style.overflowY = 'auto';
                } else {
                    height = elem.scrollHeight - padding;
                    style.overflowY = 'hidden';
                };
                elem.style.height = height + extra + 'px';
                elem.currHeight = parseInt(style.height);
                scrollTop += parseInt(style.height) - elem.currHeight;
                document.body.scrollTop = scrollTop;
                document.documentElement.scrollTop = scrollTop;

            };
        };
        addEvent('propertychange', change);
        addEvent('input', change);
        addEvent('focus', change);
        change();
    };
    /**************监听窗口是否关闭，然后提示上传的文件是否上传完毕了****************/
    //浏览器的关闭时触发
    window.onbeforeunload = function(event) {
        if (window.uploader != null && window.uploader != "undefined") {
            var stat = window.uploader.getStats();
            if (stat.progressNum > 0) {
                return "还有文件处于上传中，是否要放弃上传";
            }
        }
    };
    //附件正在上传的时候，用户要关闭窗口的时候，进行提醒
    exports.closeUploadTips = function(uploader, callback) {
        if (uploader == null) {
            callback(true);
            return true;
        }
        var stat = uploader.getStats();
        if (stat.progressNum > 0) {
            if (confirm("还有文件处于上传中，是否要放弃上传")) { //确定
                var files = uploader.getFiles("queued,progress");
                for (var i = 0; i < files.length; i++) {
                    uploader.cancelFile(files[i]);
                }
                callback(true); //可以关闭
                return true;
            } else {
                callback(false);
                return false;
            }
        } else {
            callback(true); //可以关闭
            return true;
        }
        return true;
    };
    /**************js邮箱验证*********************/
    exports.validEmail = function(email) {
        var emailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (!emailReg.test(email)) {
            return false;
        } else {
            return true;
        }
    };
    /**************loading样式的处理********************/
    var loadingtime = null;
    /*exports.loading = function(top) {
        if (top == null || top == "") {
            top = "50%";
        }
        var loadHmtl = $("<div class='web-loading' style='top:" + top + "'><img src='/Public/Common/img/loading.gif' width='64' ></div>");
        clearTimeout(loadingtime);
        loadingtime = setTimeout(function(){
            $('body').append(loadHmtl);
        },500);
    };*/
    exports.mloading = function(top){
        if (top == null || top == "") {
            top = "50%";
        }
    	var loadHmtl = '<div class="spinnerloading">\
			<div class="bounce1"></div>\
			<div class="bounce2"></div>\
			<div class="bounce3"></div>\
		</div>';
		if(loadingtime != null){
			clearTimeout(loadingtime);	
		}
		loadingtime = setTimeout(function(){
			$('body').append(loadHmtl);
		},300);
    };
    exports.closeLoading = function() {
        clearTimeout(loadingtime);
        $('.web-loading').remove();
        $('.spinnerloading').remove();
    };
    exports.closeloading = function(){
    	exports.closeLoading();
    };
    /***********工具类**************/
    exports.delHtmlTag = function(content) {
        if (content == null || content == "") return "";
        content = content.replace(/<[^>]+>/g, "");
        content = exports.htmlEncode(content);
        return content;
    };
    //截取字符串
    exports.subStringLen = function(str, len) {
    	if(str == null || str == "" || str == undefined){
    		return "";
    	}
        var newLength = 0;
        var newStr = "";
        var chineseRegex = /[^\x00-\xff]/g;
        var singleChar = "";
        var strLength = str.replace(chineseRegex, "**").length;
        for (var i = 0; i < strLength; i++) {
            singleChar = str.charAt(i).toString();
            if (singleChar.match(chineseRegex) != null) {
                newLength += 2;
            } else {
                newLength++;
            }
            if (newLength > len) {
                break;
            }
            newStr += singleChar;
        }
        if (strLength > len) {
            newStr += "...";
        }
        return newStr;
    }
    /**********光标聚焦到最后******/
    exports.moveEnd = function(obj) {
        if (obj.setSelectionRange) {
            obj.setSelectionRange(obj.value.length, obj.value.length);
            obj.focus();
        } else {
            var range = obj.createTextRange();
            range.collapse(false);
            range.select();
            obj.focus();
        }
    }
    /***************获取url的参数*************************/
    exports.getQuery = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null||localStorage[name];
    };
    exports.getQuery2 = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };
    //改变当前url的参数
    exports.changeURLArg = function(url,arg,arg_val){ 
        var pattern=arg+'=([^&]*)'; 
        var replaceText=arg+'='+arg_val; 
        if(url.match(pattern)){ 
            var tmp='/('+ arg+'=)([^&]*)/gi'; 
            tmp=url.replace(eval(tmp),replaceText); 
            return tmp; 
        }else{ 
            if(url.match('[\?]')){ 
                return url+'&'+replaceText; 
            }else{ 
                return url+'?'+replaceText; 
            } 
        } 
        return url+'\n'+arg+'\n'+arg_val; 
    } 
    exports.setQuery2 = function(key,name){
    	if ('pushState' in history){
    		 var oldUrl = location.href;
    		 var nUrl = exports.changeURLArg(oldUrl,key,name);
    		 var state = {title: '',url: nUrl};
    		 window.history.replaceState(state,'',nUrl);
    	}
    }
    exports.setQuery = function(key,name){
    	exports.setQuery2(key,name);
    	exports.setStore(key,name);
    }
    exports.setStore = function(key,value) {
    	localStorage[key] = value;
    };
    exports.getStore = function(key){
    	return localStorage[key];
    };
    //跟用户的uid有关系的部分
    exports.setUserStore = function(key,value) {
    	var uid = localStorage["uid"];
    	var key_uid = uid+"_"+key;
    	if(value == null){
    		localStorage.removeItem(key_uid);
    	}else{
        	localStorage[key_uid] = value;	
    	}
    };
    //跟用户的uid有关系
    exports.getUserStore = function(key){
    	var uid = localStorage["uid"];
    	var key_uid = uid+"_"+key;
    	return localStorage[key_uid];
    };
    //销毁编辑器
    exports.destoryEditor = function(id){
    	if(window.editorMap == null) return;
    	if(window.editorMap[id] != null){
    		var editor = window.editorMap[id];
    		if(editor){
    			editor.destroy();
    			editor = null;
    			window.editorMap[id] = null;
    		}
    		//删除掉数组
    		delete window.editorMap[id];
    	}
    };
    exports.openkfeframe = function(type){
        var layero = layer.open({
            type: 2,
            skin:'layer-ext-ding-kfe',
            title:'公式编辑器',
            btn: ['确定', '取消'],
            yes:function(index,layero){
                window.editor.menus.symbol.$frame.contentWindow.kfe.execCommand('get.image.data', function(data){
                    var latex = window.editor.menus.symbol.$frame.contentWindow.kfe.execCommand('get.source');
                    if(latex.indexOf('\placeholder ')>0){
                        exports.openMsg('请编辑公式',1);
                        return;
                    }
                    layer.close(index);
                    window.editor.xhrUploadImg({
                        base64: data.img,
                        fileType: 'image/png',
                        loadfn:function(resultText, xhr){
                            var resultSrc = JSON.parse(resultText).src;
                            var s = '<img class="kfformula" src="'+ resultSrc +'" data-latex="' + latex + '" /> ';
                            if(type=='append'){
                                window.editor.command(null, 'insertHtml', s);
                            }else if(type=='replace'){
                                var o = window.imgLatex;
                                o.setAttribute('src',resultSrc);
                                o.setAttribute('data-latex',latex);
                                var v = window.editor.$txt.html().replace(window.imgLatex.outerHTML,o.outerHTML);
                                window.editor.$txt.html(v);
                            }
                        },
                        name: 'wangEditorH5File'
                    });
                });
            },
            canel:function(index, layero){
                layer.close(index);
            },
            closeBtn:false,
            scrollbar:false,
            area: ['782px','490px'],
            content: '/html/Public/Common/js/lib/wangEditor/js/kityFormulaDialog.html',
            shift: 7,
            moveType: 1,
            success: function(layero, index){
                window.editor.menus.symbol.$frame = layero.find('iframe')[0];
                layero.find('.layui-layer-content').css({'font-size':'0'});
            }
        });  
    };
    /***********编辑器的基础************/
    exports.setBaseEditor = function(editor,showmenu,showfocus){
        // 初始化编辑器的内容
        editor.$txt.blur();
        editor.menuContainer.$menuContainer.hide();
        if(showmenu===''){
            if(showfocus===''){
                editor.menuContainer.$menuContainer.slideDown(function(){
                    editor.$txt.focus();
                });
            }else{
                editor.menuContainer.$menuContainer.slideDown();
            }
        }else{
            if(showfocus===''){
                setTimeout(function(){
                    editor.$txt.focus();
                },10);
            }
        }
        if(showmenu == true && showfocus == true){
        	editor.menuContainer.$menuContainer.show();
        }
        var placeholder = editor.$parent.find('textarea').attr('placeholder');
        editor.$txt.height('auto').attr('placeholder',placeholder);
        editor.$txt.on('focus',function(){
            var html = editor.$txt.html();
            if(html==''){
                editor.$txt.html('<p><br></p>');
            }
            editor.$editorContainer.css('border-color','#4d90fe');
        }).on('blur',function(){
            var html = editor.$txt.html();
            if(html=='<p><br></p>'){
                editor.$txt.html('');
            }
            editor.$editorContainer.css('border-color','#ccc');
            $('.wangEditor-container .clicked').removeClass('clicked');
            editor.$parent.find('textarea').blur();
        });
        
        editor.menus.symbol.$domNormal.on('click',function(){
            window.editor = editor;
            window.imgLatex = null;
            exports.openkfeframe('append');
        });
        editor.$txt.on('click','img:not(".kfformula")',function(){
            if($(this).parents('li.saved').length>0){
                $(this).parents('li.saved').trigger('click');
            }
        });
        editor.$txt.on('click','img.kfformula[data-latex]',function(e){
            window.editor = editor;
            var imgLatex = this;
            window.imgLatex = imgLatex;
            exports.openkfeframe('replace');
        });
        editor.$txt.on('click','table',function(e){
            if($(this).hasClass('clicked')){
                editor.$txt.blur();
            }
        });
        //黏贴的处理
        editor.$txt.on('paste', function (e) {
            var size = $(this).parents('li').find('.item-txt').size();
            if($(this).closest('.ques-title').length==1){
                if(!!size){
                    var text = editor.$txt.html();
                    if(text&&$(text).get(0).nodeName=='TABLE'){
                        text = editor.$txt.text();
                    }
                    if (text) {
                        text = text.replace(/\s| |&nbsp;/g, " ").replace(/\<\/p\>\<p\>(?=[A-Z])/g,' ')
                        var text1 = text;
                        var reg = /[\W][A-Z][,，、）】：\]\)\.\。\．\:]\s*((?! {1,}).)+/g;
                        var i = 0;
                        var hash = [];
                        var elem = $(this).parents('li').find(".item:not('.item-new')");
                        var _self = this;
                        if (!reg.test(text)) return;
                        var index = 0;
                        var re = function(s) {
                            index++;
                            if(index>=10){
                                return;
                            }
                            s.replace(reg, function(m, m1, ind) {
                                if (m.charAt(m.length - 2) == "A") {
                                    s = s.replace(s.substring(ind + m.length, ind + m.length + 1), '=');
                                    re(s)
                                }
                                if (reg.test(m.substring(3, m.length))) {
                                    s = s.replace(m.substring(1, 2), ' ');
                                    re(s)
                                }
                                if (String.fromCharCode(65 + i) == exports.trim(m).charAt(0).toUpperCase() || String.fromCharCode(65 + i) == exports.trim(m).charAt(1).toUpperCase()) {
                                    i++;
                                    hash.push(ind);
                                }
                                if (hash.length > elem.size()) {
                                    if($(_self).parents('.ques-title').prev().find('p').eq(0).html() == '： 数值评价题'){
                                        $(_self).parents('li').find(".item:not('.item-new'):last").after($(_self).parents('li').find(".item:not('.item-new'):last").clone());
                                        $(_self).parents('li').find(".item:not('.item-new'):last").removeClass("isAns");
                                    }else{
                                        $(_self).parents('li').find(".item:not('.item-new'):last").after($(_self).parents('li').find(".item:not('.item-new'):last").clone());
                                        $(_self).parents('li').find(".item:not('.item-new'):last").removeClass("isAns");
                                        $(_self).parents('li').find(".item:not('.item-new'):last").children("span").text(String.fromCharCode(64 + i).toUpperCase());
                                    }
                                    
                                }
                            });
                        }
                        re(text);
                        
                        hash.map(function(item, index, arr) {
                            var mm = text1.substring(item + 3, hash[index + 1]);
                            if (hash.length > elem.size()) {
                                $(_self).parents('li').find(".item:not('.item-new')").eq(index).find("textarea").val(mm);
                                $(_self).parents('li').find(".item:not('.item-new')").eq(index).find(".wangEditor-txt").html(mm);
                            }
                            elem.eq(index).find("textarea").val(mm);
                            elem.eq(index).find(".wangEditor-txt").html(mm);
                        })

                        $(_self).parent().prev('textarea').val(text1.substr(0, hash[0]));
                        $(_self).html(text1.substr(0, hash[0]));
                        if (hash.length > 0) {
                            $(_self).parents('li').find(".item.item-new").children('span').text(String.fromCharCode(65 + hash.length))
                        }
                        if (hash.length < elem.size()) {
                            $(_self).parents('li').find(".item:not('.item-new')").each(function(index) {
                                if (index > hash.length - 1 && hash.length != 0) {
                                    $(this).remove();
                                    return;
                                }
                            })
                        }
                    }
                }
            }
        });
        return editor;
    };
    /***********试题题干**************/
    exports.initEditorUploader = function(obj,parentid){
        require('webuploader');
    	require('lib/webuploader-0.1.5/webuploader.css');
    	var uploader = WebUploader.create({
    		 auto: true,
    		 swf:'/Public/Common/js/lib/webuploader-0.1.5/Uploader.swf',
    		 server: '/UploadApi/upload',
    		 pick: {id:obj,multiple:true},
    		 resize: false,
    		 duplicate:true,
    		 compress:false,
    		 chunked: false,
    		 fileSingleSizeLimit:100*1024*1024,//100M
    	});
    	window.uploader = uploader;
    	
    	var tplFileUp = '<div class="file" data-fileid="{{fileid}}" id="file-ID-{{id}}">\
    						<div class="file-icon fl">\
    							<img src="{{ext}}">\
    						</div>\
    						<div class="file-cont fl">\
    							<h3 class="file-name">\
    								<a href="javascript:;">{{name}}</a>\
    							</h3>\
    							<div class="opt clearfix">\
    								<p class="file-size fl">{{size}}</p>\
    								<div class="meter-box fl">\
    									<p class="fl">0%</p>\
    									<div class="meter fl">\
    										<span style="width: 0%;"></span>\
    									</div>\
    								</div>\
    							</div>\
    						</div>\
    						<a href="javascript:;" class="cancel"></a>\
    					</div>';
    	if(!obj.parents(".wangEditor-container").next().hasClass(".annex-box")){
    		obj.parents(".wangEditor-container").after("<div class='annex-box'></div>");
    	}
    	var annexBox = obj.parents(".ques-title").find(".annex-box");
    	uploader.on( 'fileQueued', function( file ) {
    		var mFile = {};
    		mFile.id = file.id;
    		mFile.name = file.name;
    		mFile.size = exports.format_bytes(file.size);
    		uploader.makeThumb( file, function( error, src ) {
    			if ( !error ){
        			mFile.ext = src;
    			}else{
    				mFile.ext = exports.getFileExtIcon(file.ext);
    			}
    			var renderDialog = template.compile(tplFileUp);
    		    var html = renderDialog(mFile);
    			annexBox.prepend(html);
    		},64,64);
    	});
    	uploader.on( 'uploadProgress', function( file, percentage ) {
    		var $fileDiv = annexBox.find("#file-ID-"+file.id);
    		var precent = Math.floor(percentage*100);
            if(precent<100){
                $fileDiv.find(".meter-box p").text(precent+"%");
                $fileDiv.find(".meter span").width(precent+"%");
            }
    	});
    	uploader.on( 'uploadError', function( file, reason) {
    		var $fileDiv = annexBox.find("#file-ID-"+file.id);
    		$fileDiv.find(".meter-box").html('上传失败');
    	});
    	uploader.on('uploadAccept',function(object,ret){
    		if(ret.status == 1){
    			var $fileDiv = annexBox.find("#file-ID-"+object.file.id);
        		$fileDiv.attr('data-fileid',ret.fileid);
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
                	exports.previewImg(viewimg);
                }
    		}else if(ret.status == 2){
            	
            }else{
            	exports.openMsg(ret.info,1);
    		}
    	});
    	uploader.on('error', function(type){
    		if(type == 'F_EXCEED_SIZE'){
    			exports.openMsg('单文件上传超过了100MB',1);
    		}
    	});
    };
    //题干题
    exports.setSubjectUeditor = function(id,showmenu,showfocus,htmlValue,callback){
    	return exports.setUeditor(id,showmenu,showfocus,htmlValue,callback);
    };
    /********富文本客户端 使用对象:试题和选项*/
    exports.setUeditor = function(id,showmenu,showfocus,htmlValue,callback){
        var htmlstr = '';
        var idObject = $('#' + id);
        if(idObject.length > 0){
            if(idObject.get(0).nodeName=='TEXTAREA'){
                htmlstr = idObject.val();
            }else if(idObject.get(0).nodeName=='DIV'){
                htmlstr = idObject.html();
            }	
        }else{
        	htmlstr = htmlValue;
        }
        // require.async(['wangEditor','/Public/Common/js/lib/wangEditor/css/wangEditor.min.css'],function(){
        require.async(['wangEditor','lib/wangEditor/css/wangEditor.min.css'],function(){
            var editor = new wangEditor(id);
            console.info(wangEditor());
            var end = (new Date()).valueOf();
            // 自定义菜单
            editor.config.menus = [
                    'bold',
                    'underline',
                    'italic',
                    'strikethrough',
                    '|',
                    'forecolor',
                    'fontfamily',
                    'fontsize',
                    '|',
                    'alignleft',
                    'aligncenter',
                    'alignright',
                    '|',
                    'insertcode',
                    'symbol',
                    'img',
                    'video',
            ];
            // 上传图片//未使用接口
            editor.config.uploadImgUrl = '/UploadApi/editorUpload';//虽然有值，但不执行，忽略
            editor.create();
            // 初始化编辑器的内容
            editor.$txt.html(htmlstr.replace(/clicked/g,''));
            editor = exports.setBaseEditor(editor,showmenu,showfocus);
            
            if(window.editorMap == null){
            	window.editorMap = {};
            }
            window.editorMap[id] = editor;
            if(callback){
            	callback(editor);
            }
        });
    };
    /******************弹出窗口里面editor****************/
    exports.setUeditorDialog = function(id,height,clasname,callback){
        var htmlstr = '';
        if($('#' + id).get(0).nodeName=='TEXTAREA'){
            htmlstr = $('#' + id).val();
        }else if($('#' + id).get(0).nodeName=='DIV'){
            htmlstr = $('#' + id).html();
        }
        var editorW = $('#' + id).width();
        var editorH = $('#' + id).height();
        require.async(['wangEditor','lib/wangEditor/css/wangEditor.min.css'],function(){
            var editor = new wangEditor(id);
            // 自定义菜单
            editor.config.menus = [
                    'bold',
                    'underline',
                    'italic',
                    'strikethrough',
                    'quote',
                    '|',
                    'forecolor',
                    'fontfamily',
                    'fontsize',
                    '|',
                    'symbol',
                    'img',
                    '|',
                    'fullscreen',
            ];
            editor.config.zindex = 20000;
            editor.config.pasteFilter = false;//关闭粘贴过滤样式
            // 上传图片//未使用接口
            editor.config.uploadImgUrl = '/UploadApi/editorUpload';//虽然有值，但不执行，忽略
            editor.create();
            editor.$editorContainer.addClass(clasname);
            editor.$editorContainer.addClass('margintop0px');
            if(editor.menus.fujian != null){
                editor.menus.fujian.$domNormal.off('click');	
            }
            // 初始化编辑器的内容
            if(callback != null){
                callback.call(this, editor);
            }
            var placeholder = editor.$parent.find('textarea').attr('placeholder');
            editor.$txt.height(height).attr('placeholder',placeholder);
            if(editorW != 0){
                editor.$editorContainer.width(editorW);	
            }
            editor.$txt.on('focus',function(){
                var html = editor.$txt.html();
                if(html==''){
                    editor.$txt.html('<p><br></p>');
                }
            }).on('blur',function(){
                var html = editor.$txt.html();
                if(html=='<p><br></p>'){
                    editor.$txt.html('');
                }
                $('.wangEditor-container .clicked').removeClass('clicked');
                editor.$parent.find('textarea').blur();
            })
            editor.menus.symbol.$domNormal.on('click',function(){
                window.editor = editor;
                window.imgLatex = null;
                exports.openkfeframe('append');
            })
            editor.$txt.on('click','img:not(".kfformula")',function(){
                if($(this).parents('li.saved').length>0){
                    $(this).parents('li.saved').trigger('click');
                }
            })
            editor.$txt.on('click','img.kfformula[data-latex]',function(e){
                window.editor = editor;
                var imgLatex = this;
                window.imgLatex = imgLatex;
                exports.openkfeframe('replace');
            })
            editor.$txt.on('click','table',function(e){
                if($(this).hasClass('clicked')){
                    editor.$txt.blur();
                }
            });
            editor.onchange = function(){
            	localStorage['wEditor'] = this.$txt.html();
            };
            window.editor = editor;
        })
    };
    /********富文本客户端 使用对象 测试、互动、备课区测试、备课区互动*/
    exports.setUeditorSim = function(id,callback,nov2){
        var htmlstr = '';
        if($('#' + id).get(0).nodeName=='TEXTAREA'){
            htmlstr = $('#' + id).val();
        }else if($('#' + id).get(0).nodeName=='DIV'){
            htmlstr = $('#' + id).html();
        }
        require.async(['wangEditor','lib/wangEditor/css/wangEditor.min.css'],function(){
            var editor = new wangEditor(id);
            //自定义菜单
            editor.config.menus = [
                    'bold',
                    'underline',
                    'italic',
                    'strikethrough',
                    'quote',
                    'eraser',
                    '|',
                    'forecolor',
                    'bgcolor',
                    'fontfamily',
                    'fontsize',
                    '|',
                    'alignleft',
                    'aligncenter',
                    'alignright',
                    '|',
                    'insertcode',
                    'symbol',
                    'img',
                    'video',
                    '|',
                    'fullscreen',
                    '|',
                    'fujian',
            ];
            editor.config.zindex = 20000;
            editor.config.pasteFilter = false;//关闭粘贴过滤样式
            //上传图片
            editor.config.uploadImgUrl = '/UploadApi/editorUpload';//虽然有值，但不执行，忽略
            editor.create();
            if(!nov2){
                editor.$editorContainer.addClass('v2');
                editor.$editorContainer.addClass('margintop0px');
            }
            editor.menus.fujian.$domNormal.off('click');
            // 初始化编辑器的内容
            if(callback != null){
                callback.call(this, editor);
            }
            var placeholder = editor.$parent.find('textarea').attr('placeholder');
            editor.$txt.height('auto').attr('placeholder',placeholder);
            editor.$txt.on('focus',function(){
                var html = editor.$txt.html();
                if(html==''){
                    editor.$txt.html('<p><br></p>');
                }
                editor.$editorContainer.parent().next('.annex-box').css({'border-bottom':'2px solid #4d90fe','margin-bottom':'-1px'});
            }).on('blur',function(){
                var html = editor.$txt.html();
                if(html=='<p><br></p>'){
                    editor.$txt.html('');
                }
                editor.$editorContainer.parent().next('.annex-box').css({'border-bottom':'1px solid #ececec','margin-bottom':'1px'});
                $('.wangEditor-container .clicked').removeClass('clicked');
                editor.$parent.find('textarea').blur();
            })
            editor.menus.symbol.$domNormal.on('click',function(){
                window.editor = editor;
                window.imgLatex = null;
                exports.openkfeframe('append');
            });
            editor.$txt.on('click','img:not(".kfformula")',function(){
                if($(this).parents('li.saved').length>0){
                    $(this).parents('li.saved').trigger('click');
                }
            });
            editor.$txt.on('click','img.kfformula[data-latex]',function(e){
                window.editor = editor;
                var imgLatex = this;
                window.imgLatex = imgLatex;
                exports.openkfeframe('replace');
            });
            editor.$txt.on('click','table',function(e){
                if($(this).hasClass('clicked')){
                    editor.$txt.blur();
                }
            });
            console.info(editor);
            window.editor = editor;
        });
    };
    exports.setUeditorSim1 = function(id,callback,nov2){
        var htmlstr = '';
        if($('#' + id).get(0).nodeName=='TEXTAREA'){
            htmlstr = $('#' + id).val();
        }else if($('#' + id).get(0).nodeName=='DIV'){
            htmlstr = $('#' + id).html();
        }
        require.async(['wangEditor','lib/wangEditor/css/wangEditor.min.css'],function(){
            var editor = new wangEditor(id);
            //自定义菜单
            editor.config.menus = [
                    'bold',
                    'underline',
                    'italic',
                    'strikethrough',
                    '|',
                    'forecolor',
                    'fontfamily',
                    'fontsize',
                    '|',
                    'alignleft',
                    'aligncenter',
                    'alignright',
                    '|',
                    'insertcode',
                    'symbol',
                    'img',
                    'video',
                    '|',
                    'fujian',
            ];
            editor.config.zindex = 20000;
            editor.config.pasteFilter = false;//关闭粘贴过滤样式
            //上传图片
            editor.config.uploadImgUrl = '/UploadApi/editorUpload';//虽然有值，但不执行，忽略
            editor.create();
            if(!nov2){
                editor.$editorContainer.addClass('v2');
                editor.$editorContainer.addClass('margintop0px');
            }
            editor.menus.fujian.$domNormal.off('click');
            // 初始化编辑器的内容
            if(callback != null){
                callback.call(this, editor);
            }
            var placeholder = editor.$parent.find('textarea').attr('placeholder');
            editor.$txt.height('auto').attr('placeholder',placeholder);
            editor.$txt.on('focus',function(){
                var html = editor.$txt.html();
                if(html==''){
                    editor.$txt.html('<p><br></p>');
                }
                editor.$editorContainer.parent().next('.annex-box').css({'border-bottom':'2px solid #4d90fe','margin-bottom':'-1px'});
            }).on('blur',function(){
                var html = editor.$txt.html();
                if(html=='<p><br></p>'){
                    editor.$txt.html('');
                }
                editor.$editorContainer.parent().next('.annex-box').css({'border-bottom':'1px solid #ececec','margin-bottom':'1px'});
                $('.wangEditor-container .clicked').removeClass('clicked');
                editor.$parent.find('textarea').blur();
            })
            editor.menus.symbol.$domNormal.on('click',function(){
                window.editor = editor;
                window.imgLatex = null;
                exports.openkfeframe('append');
            });
            editor.$txt.on('click','img:not(".kfformula")',function(){
                if($(this).parents('li.saved').length>0){
                    $(this).parents('li.saved').trigger('click');
                }
            });
            editor.$txt.on('click','img.kfformula[data-latex]',function(e){
                window.editor = editor;
                var imgLatex = this;
                window.imgLatex = imgLatex;
                exports.openkfeframe('replace');
            });
            editor.$txt.on('click','table',function(e){
                if($(this).hasClass('clicked')){
                    editor.$txt.blur();
                }
            });
            editor.$txt.on('paste', function (e) {
                var size = $(this).parents('li').find('.item-txt').size();
                if($(this).closest('.ques-title').length==1){
                    if(!!size){
                        var text = editor.$txt.html();
                        if(text&&$(text).get(0).nodeName=='TABLE'){
                            text = editor.$txt.text();
                        }
                        if (text) {
                            text = text.replace(/\s| |&nbsp;/g, " ").replace(/\<\/p\>\<p\>(?=[A-Z])/g,' ')
                            var text1 = text;
                            var reg = /[\W][A-Z][,，、）】：\]\)\.\。\．\:]\s*((?! {1,}).)+/g;
                            var i = 0;
                            var hash = [];
                            var elem = $(this).parents('li').find(".item:not('.item-new')");
                            var _self = this;
                            if (!reg.test(text)) return;
                            var index = 0;
                            var re = function(s) {
                                index++;
                                if(index>=10){
                                    return;
                                }
                                s.replace(reg, function(m, m1, ind) {
                                    if (m.charAt(m.length - 2) == "A") {
                                        s = s.replace(s.substring(ind + m.length, ind + m.length + 1), '=');
                                        re(s)
                                    }
                                    if (reg.test(m.substring(3, m.length))) {
                                        s = s.replace(m.substring(1, 2), ' ');
                                        re(s)
                                    }
                                    if (String.fromCharCode(65 + i) == exports.trim(m).charAt(0).toUpperCase() || String.fromCharCode(65 + i) == exports.trim(m).charAt(1).toUpperCase()) {
                                        i++;
                                        hash.push(ind);
                                    }
                                    if (hash.length > elem.size()) {
                                        if($(_self).parents('.ques-title').prev().find('p').eq(0).html() == '： 数值评价题'){
                                            $(_self).parents('li').find(".item:not('.item-new'):last").after($(_self).parents('li').find(".item:not('.item-new'):last").clone());
                                            $(_self).parents('li').find(".item:not('.item-new'):last").removeClass("isAns");
                                        }else{
                                            $(_self).parents('li').find(".item:not('.item-new'):last").after($(_self).parents('li').find(".item:not('.item-new'):last").clone());
                                            $(_self).parents('li').find(".item:not('.item-new'):last").removeClass("isAns");
                                            $(_self).parents('li').find(".item:not('.item-new'):last").children("span").text(String.fromCharCode(64 + i).toUpperCase());
                                        }
                                        
                                    }
                                });
                            }
                            re(text);
                            
                            hash.map(function(item, index, arr) {
                                var mm = text1.substring(item + 3, hash[index + 1]);
                                if (hash.length > elem.size()) {
                                    $(_self).parents('li').find(".item:not('.item-new')").eq(index).find("textarea").val(mm);
                                    $(_self).parents('li').find(".item:not('.item-new')").eq(index).find(".wangEditor-txt").html(mm);
                                }
                                elem.eq(index).find("textarea").val(mm);
                                elem.eq(index).find(".wangEditor-txt").html(mm);
                            })
    
                            $(_self).parent().prev('textarea').val(text1.substr(0, hash[0]));
                            $(_self).html(text1.substr(0, hash[0]));
                            if (hash.length > 0) {
                                $(_self).parents('li').find(".item.item-new").children('span').text(String.fromCharCode(65 + hash.length))
                            }
                            if (hash.length < elem.size()) {
                                $(_self).parents('li').find(".item:not('.item-new')").each(function(index) {
                                    if (index > hash.length - 1 && hash.length != 0) {
                                        $(this).remove();
                                        return;
                                    }
                                })
                            }
                        }
                    }
                }
            });
            window.editor = editor;
        });
    };
    //获取附件列表
    exports.getAttachment = function(obj){
    	if(obj == null || obj == undefined){
    		return "";
    	}
        var attachment="";
        obj.each(function(){
        	attachment += $(this).attr('data-fileid');
        	attachment += "|";
        });
        return attachment;
    };
    //关键字变色
    exports.setHeightKeyWord = function(tempHTML, keyword, color, bold) {
        if (keyword==[]||keyword.length==0) return;
        var htmlReg = new RegExp("\<.*?\>", "i");
        var arrA = new Array();
        for (var i = 0; true; i++) {
            var m = htmlReg.exec(tempHTML);
            if (m) {
                arrA[i] = m;
            } else {
                break;
            }
            tempHTML = tempHTML.replace(m, "[[[[" + i + "]]]]");
        }
        var replaceText
        if (bold) replaceText = "<b style='color:" + color + ";'>$1</b>";
        else replaceText = "<font style='color:" + color + ";'>$1</font>";
        var arrayWord = keyword;
        for (var w = 0; w < arrayWord.length; w++) {
            var r = new RegExp("(" + arrayWord[w].replace(/[(){}.+*?^$|\\\[\]]/g, "\\$&") + ")", "ig");
            tempHTML = tempHTML.replace(r, replaceText);
        }
        for (var i = 0; i < arrA.length; i++) {
            tempHTML = tempHTML.replace("[[[[" + i + "]]]]", arrA[i]);
        }
        return tempHTML;
    };
    //获取当前的页面的http协议
    exports.isHttps = function(){
    	var ishttps = 'https:' == document.location.protocol ? true: false;
    	if(ishttps){
    		return 1;
    	}
    	return 0;
    };
    //全站实时配置IM
    exports.stropheIM = function(callback){
        var httpType = exports.isHttps();
        require.async('strophe',function(){
            var BOSH_SERVICE = null;
            var connection = null;
            initIM();
            function initIM(){
                API.IMApi_getConfig(httpType,function(data){
                    //BOSH_SERVICE = '//'+data.data.host+':'+data.data.httpbindport+'/http-bind/';
                	BOSH_SERVICE = '/imchat/';
                    connection = new Strophe.Connection(BOSH_SERVICE);
                    if(!sessionStorage.resourcecookie){
                        sessionStorage.resourcecookie = data.data.resource;
                    }
                    var resourcecookie = sessionStorage.resourcecookie||data.data.resource;
                    connection.connect(data.data.uid+'@'+data.data.host+'/'+resourcecookie,data.data.pwd,onConnect);
                })
            }
            function onConnect(status) {
                if (status == Strophe.Status.CONNECTING) {
                } else if (status == Strophe.Status.CONNFAIL) {
                } else if (status == Strophe.Status.DISCONNECTING) {
                } else if (status == Strophe.Status.DISCONNECTED) {
                } else if (status == Strophe.Status.CONNECTED) {
                    connection.addHandler(onMessage, null, 'message', null, null, null);
                    connection.send($pres().tree());
                }
            }
            function onMessage(msg) {
                var to = msg.getAttribute('to');
                var from = msg.getAttribute('from');
                var type = msg.getAttribute('type');
                var elems = msg.getElementsByTagName('body');
                if (type == "chat" && elems.length > 0) {
                    var body = elems[0];
                    //处理接收到的json
                    var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
                    var data = JSON.parse(Strophe.getText(body).replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; }));
                    callback&&callback(data);
                }
                return true;
            }
            window.onbeforeunload = function(){
            	if(connection != null){
                    connection.disconnect();
            	} 
            }
        });
    };
    /**
     * 去掉最后的<p><br></p>
     */
   exports.removeLastEmpty = function(str){
	    if(str == null || str == "") return str;
    	var removeStr = '<p><br></p>';
    	if(arguments[1] != '' && arguments[1] != null){
    		removeStr = arguments[1];
    	}
    	if(str.length >= removeStr.length){
    		var len = str.length;
    		var substr = str.substring(len-removeStr.length);
    		while(substr == removeStr){
    			if(len-removeStr.length<0){
    				break;
    			}
    			str = str.substring(0,len-removeStr.length);
    			if(str.length >= removeStr.length){
    				len = str.length;
    				substr = str.substring(len-removeStr.length);
    				if(substr != removeStr){
    					break;
    				}
    			}else{
    				break;
    			}
    		}
    	}
    	return str;
    }
   /**
    * 获取浏览器的类型
    */
   exports.getBrowser = function(){
	    var ua = window.navigator.userAgent;  
	    var isIE = window.ActiveXObject != undefined && ua.indexOf("MSIE") != -1;  
	    var isFirefox = ua.indexOf("Firefox") != -1;  
	    var isOpera = window.opr != undefined;  
	    var isChrome = ua.indexOf("Chrome") && window.chrome;  
	    var isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1;  
	    if (isIE) {  
	        return "IE";  
	    } else if (isFirefox) {  
	        return "Firefox";  
	    } else if (isOpera) {  
	        return "Opera";  
	    } else if (isChrome) {  
	        return "Chrome";  
	    } else if (isSafari) {  
	        return "Safari";  
	    } else {  
	        return "Unkown";  
	    }
   }
   /**
    * 判断用户是否用mac进行操作
    */
   exports.isMac = function(){
	   if (navigator.userAgent.indexOf('Mac OS X') != -1) {
		   return true;
	   } else {
		   var browse = exports.getBrowser();
		   if(browse == "Safari"){
			   return true;
		   }
	   }
	   return false;
   }
   /**
    * 通过弹出窗口，让用户来确定进行跳转
    */
   exports.openNewUrlByDialog = function(url,id,opts){
       var v={},timestamp = new Date().getTime();
       var options = {
           title:'系统提醒',
           info:'系统将跳转到新页面进行操作',
           sure:'开始跳转'
       }
       $.extend(options,opts);
       v._tpl = {
           dialog:'<div class="weui_dialog_alert" id="alert-'+timestamp+'">\
                       <div class="weui_mask"></div>\
                       <div class="weui_dialog">\
                           <div class="weui_dialog_hd">\
                               <strong class="weui_dialog_title">'+options.title+'</strong>\
                           </div>\
                           <div class="weui_dialog_bd">'+options.info+'</div>\
                           <div cl\ass="weui_dialog_ft">\
                               <a target="_blank" href="'+url+'" class="weui_btn_dialog primary">'+options.sure+'</a>\
                           </div>\
                       </div>\
                   </div>'
       }
       $(v._tpl.dialog).appendTo("body");
       var dialogID = "#alert-"+timestamp;
       if(options.success){
       		$(dialogID).remove();
            options.success($(dialogID));
       }
       $(dialogID).find('.weui_btn_dialog').on('click',function(){
           $(dialogID).remove();
           if(options.sureCallback){
           	 options.sureCallback($(dialogID));
           }
       });
   }
   /**
    * 打开新窗口时的提示
    */
   exports.openNewWindows = function(url, id, opname){
	   var mac = exports.isMac();
	   if(mac == true){
		   exports.openNewUrlByDialog(url,id);
	   }else{
		   var window_0 = window.open('');
		   window_0.location = url;   
	   }
   }
   /**
    * 对表格的进行排序，点击某个选项的时候，对某个选项进行排序
    */
   exports.sortTable = function(obj,key,type){
	   if(obj == null || obj == undefined){
		   return;
	   }
       var cont =  obj;
       var ul = obj.find("ul");
       var arrUl = [];
       var arrUl2 = [];
       var arrUl3 = [];
       for(var i=0; i<ul.length; i++){
    	   	var sort = ul.eq(i).find('.'+key).attr('data-sort');
       		if(sort == "--" || sort =="" || sort == null || sort == "未批" ){
       			arrUl2.push(ul.eq(i));
       		}else{
               if(key=='stu'&&/[A-z]+/g.test(sort)){
                   arrUl3.push(ul.eq(i));
               }else{
                   arrUl.push(ul.eq(i));
               }
       		}
       }
       arrUl.sort(function(n,m){
           var a1,a2;
           if(type){
               a1 = n;
               a2 = m;
           }else{
               a1 = m;
               a2 = n;
           }
           return a1.find('.'+key).data('sort') - a2.find('.'+key).data('sort');
       });
       var arr = arrUl.concat(arrUl2);
       if(key=='stu'){
           arr = arrUl3.concat(arrUl).concat(arrUl2);
       }
       for(var i=0; i<arr.length; i++){
           cont.append(arr[i]);
       }
   };
   /************预览试题的弹出层***********/
   exports.openPreviewSubjectDialog = function(url){
   		var tpl = '<div id="previewContainer" tabindex="-1" style="display: block;">\
   			<div class="toolbar">\
   				<div class="file-name pre-ellipsis">预览试题</div>\
   				<div class="view-action">\
   					<button type="button" id="close_view" title="关闭"><i class="icon icon-preview icon-preview-close"></i></button>\
   				</div>\
   			</div>\
   			<div tabindex="0" class="preview-content full" style="right:0px;">\
   				<div id="viewerContainer" class="control-mover" tabindex="1">\
	   				<iframe id="iframeviewerId" class="fileViewer iframeViewer" allowFullScreen="true" src="{{url}}"></iframe>\
	   			</div>\
	   		</div>\
	   	</div>';
	   	
    	var renderDialog = template.compile(tpl);
    	var urlData = {};
    	urlData['url'] = url;
    	var html = renderDialog(urlData);
        var layerIndex = layer.open({
        	type:1,
            shift:8,
            title:'',
            closeBtn:false,
            area: ['100%','100%'],
            skin: 'layui-layer-nobg',
            shadeClose: false,
            scrollbar: false,
            content:html,
            success:function(content){
        		$(content).find('#close_view').on('click',function(){
        			layer.close(layerIndex);
        		});
            }
       });
   };
   /***********************document envent********************************/
   /*****************主题的处理***********************/
   //打开主题选择
   $(document).on('click', '#selecttheme', function() {
       API.courseApi_themeList(function(data) {
           $(".xuantu .xuantuconb.cl ul").html("");
           var html = template('tpl-theme', data);
           $(".xuantu .xuantuconb.cl ul").append(html);
           $(".xuantu").show();
           $('.bg').show();
           $('.xuantuconb').css('height', parseInt($(window).height() * 0.9) - 70 - 86)
           require.async('scrollBar',function(scrollBar) {
               scrollBar.scrollBar($('.xuantuconb'), $('.xuantuconb .ul1'));
           })
       });
   });

   //关闭
   $(document).on('click', ".xuantutopr.fr a", function() {
       $(".xuantu").hide();
       $('.bg').hide()
   });
   //取消
   $(document).on('click', ".xuantu .xli1", function() {
       $(".xuantu").hide();
       $('.bg').hide()
   });
   $(document).on('click', ".xuantuconb ul.ul1 li", function() {
       $(".xuantuconb ul.ul1 li").removeClass("on");
       $(".xuantuconb ul.ul1 li").find("div").addClass("on");
       if ($(this).find("span").hasClass("on")) {
           $(this).find("span").removeClass("on");
           $(this).find("div").addClass("on");
           $(this).removeClass("on");
           $(this).parents('.xuantu').find(".xuantubots ul li.xli2").removeClass("on");
       } else {
           $(".xuantuconb ul.ul1 li").find("span").removeClass("on");
           $(this).find("span").addClass("on");
           $(this).find("div").removeClass("on");
           $(this).addClass("on");
           $(this).parents('.xuantu').find(".xuantubots ul li.xli2").addClass("on");
       }
   });
   //主题确认
   $(document).on('click', ".xuantubots.cl .xli2.on", function() {
       var themeid = $(this).parents('.xuantu').find('.xuantuconb.cl li[class=on]').attr('data-id');
       var courseid = $("#course-header").attr('data-id');
       API.courseApi_updateTheme(courseid, themeid, function(data) {
           exports.openMsg('主题更新成功', 0);
           location.reload();
           $('.bg').hide()
       });
   });
   //课程页的滚轮
   if ($('.banner.cl').length > 0) {
       var top1 = $('.banner.cl').get(0).offsetTop;
       $(window).scroll(function() {
           var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
           if (scrollT >= top1) {
               $('.banner.cl').css({
                   'position': 'fixed',
                   'left': 0,
                   'top': 0,
                   'z-index': 8
               });
               $('.banner.cl .nav-menu-left').show();
               $('.banner.cl .in-header:not(:has(.nav-menu-right))').append($('.nav-menu-right'));
               $('.banner2').show();
           } else {
               $('.nav-clear:not(:has(.nav-menu-right))').append($('.nav-menu-right'));
               $('.banner.cl').css({
                   'position': 'relative',
                   'z-index': 2
               });
               $('.banner.cl .nav-menu-left').hide();
               $('.banner2').hide();
           }
       });   
   }   
   $.fn.extend({
       initSwitch: function(ajaxParam) {
           $(this).each(function(i, ele) {
               ele.ajaxParam = ajaxParam;
               if ($(ele).hasClass('switch-on')) {
                   ele.isOpen = true;
               } else {
                   ele.isOpen = false;
               }
           })
           $(this).click(this.toggleSwitch);
           return this;
       },
       toggleSwitch: function() {
           var that = this[0] || this;
           var $this = $(this);
           // 如果按钮处在中间状态，不做任何操作。
           if ($this.hasClass('switch-mid')) return;

           if (that.isOpen) {
               $this.removeClass('switch-on').addClass('switch-mid');
           } else {
               $this.removeClass('switch-off').addClass('switch-mid');
           }
           $.ajax(that.ajaxParam).success(function(data) {
               setTimeout(function() {
                   if (data.status == 1) {
                       if (that.isOpen) {
                           $this.removeClass('switch-mid').addClass('switch-off');
                           $this.next().text('已关闭')
                       } else {
                           $this.removeClass('switch-mid').addClass('switch-on');
                           $this.next().text('已打开')
                       }
                       that.isOpen = !that.isOpen;
                   } else {
                       if (that.isOpen) {
                           $this.removeClass('switch-mid').addClass('switch-on');
                       } else {
                           $this.removeClass('switch-mid').addClass('switch-off');
                       }
                   }
               }, 200);
           }).error(function(data) {
               if (that.isOpen) {
                   $this.removeClass('switch-mid').addClass('switch-on');
               } else {
                   $this.removeClass('switch-mid').addClass('switch-off');
               }
           })
           return this;
       }
   });
   
   //点击？的时候，进行帮助提示
   var tipsLayerIndex = -1;
   $(document).on('mouseover','.icon-help-tips,.help-info-tips',function(){
   		var tipsTxt = $(this).attr('data-tips');
   		if(tipsTxt == "" || tipsTxt == undefined){
   			return;
   		}
   		var maxwidth = $(this).attr('data-tips-maxwidth');
   		var minheight = $(this).attr('data-tips-minheight');
   		var direct = $(this).attr('data-direct')||2;
   		tipsLayerIndex = layer.tips(tipsTxt,this,{
   			area:['auto'],
   			shift:5,
   			tips: [direct,'#6c6c6c'],
   			time: 20000,
   			zIndex:99999999999999,
   			success:function(content){
   				if(maxwidth!=undefined && maxwidth!=""){
   					$(content).find(".layui-layer-content").css({'max-width':maxwidth});
   				}
   				if(minheight!=undefined && minheight!=""){
   					$(content).find(".layui-layer-content").css({'min-height':minheight});
   				}
           }
   		});
   });
   $(document).on('mouseout','.icon-help-tips,.help-info-tips',function(){
   		layer.close(tipsLayerIndex);
   });
   //点击搜索按钮
   var clickSearch = function() {
       $("#searchInput").show().animate({
           width: '180px'
       }, "swing", function() {
           $("#searchInput").focus();
           $('#gosearch').unbind('click');
           if ($("#searchInput").val()) {
               $('.search-result').slideDown(200);
           }
       });
   };
   $('#gosearch').bind('click', clickSearch);
   // 显示隐藏搜索结果
   $("#searchInput").blur(function() {
       $obj = $(this);
       $obj.animate({
           width: '0px'
       }, "swing", function() {
           $obj.hide();
           $('#gosearch').bind('click', clickSearch);
       });
   });

   var isResultShow = false;
   $(document).on('keyup', "#searchInput", function(event) {
       if (event.keyCode == 13) {
           var text = $(this).val();
           if (text != "") {
               location.href = "/Search/index/txt/" + text;
           }
       }
   });
   //加课二维码展示
   var getStudentNumTimer = null;
   $(document).on('click', '#course-code-select .qrcode', function() {
   	var codetips = $("#course-code-select .codetext").html();
   	var tpl = template('tpl-show-join-class-qrcode',{codetips:codetips});
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
   			$(".layui-layer").css({'background-color':'rgba(255,255,255,0)'});
   			$(content).find(".left-innerbox").on("click",function(){
   				return false;
   			});
   			$(content).find(".right-innerbox").on("click",function(){
   				return false;
   			});
   			$(content).on("click",function(){
   				layer.close(layerIndex);
   			});
           	var courseid = $("#course-header").attr('data-id');
           	API.InteractPPTApi_getQrCode(courseid,function(tData){
           		if(tData.qrcode != null && tData.qrcode!=""){
           			$(".course_qcode .left-innerbox img").attr("src",tData.qrcode);	
           		}
           	});
           	API.studentsApi_getStudentCount(courseid,function(tData){
           		$(".course_qcode .student-num").html(tData.studentCount);
           	});
           	getStudentNumTimer = setInterval(function(){
           		API.studentsApi_getStudentCount(courseid,function(tData){
           			$(".course_qcode .student-num").html(tData.studentCount);
           		});
           	},5000);
           },
           end: function () {
           		clearInterval(getStudentNumTimer);
           }
       });
   });
   //加课码的下拉操作
   $(document).on('click', '#course-code-select', function() {
       $(this).parents('.topm.cl').find('.selecon.cl').show();
       return false;
   });
   //停用加课码
   $(document).on('click', "#stop-course-code", function() {
       var courseid = $("#course-header").attr('data-id');
       var state = $(this).attr('data-state');
       var obj = $(this);
       API.courseApi_stopCourseCode(courseid, function(data) {
           $(".codetip").html('此邀请码已停用');
           exports.openMsg('邀请码已停用', 1);
           obj.parents('li').addClass('hide2');
           obj.parents('li').next('li').removeClass('hide2');
           obj.parents('li').next('li').next('li').addClass('hide2');
           $('#course-code-select').attr('data-abc', $('#course-code-select .codetext').html());
           $('#course-code-select .codetext').html('停用');
           $('#course-code-select .qrcode').addClass("hide2");
       });
   });
   //启用加课码
   $(document).on('click', "#start-course-code", function() {
       var courseid = $("#course-header").attr('data-id');
       var state = $(this).attr('data-state');
       var obj = $(this);
       API.courseApi_startCourseCode(courseid, function() {
           $(".codetip").html('使用以下邀请码邀请同学加课');
           exports.openMsg('邀请码已启用', 0);
           obj.parents('li').addClass('hide2');
           obj.parents('li').prev('li').removeClass('hide2');
           obj.parents('li').next('li').removeClass('hide2');
           $('#course-code-select .qrcode').removeClass("hide2");
           $('#course-code-select .codetext').html($('#course-code-select').attr('data-abc'))
       });

   });
   //重置加课码
   $(document).on('click', "#reset-course-code", function() {
       layer.open({
           type: 1,
           title: false,
           closeBtn: false,
           area: ['348px'],
           content: $('#cz-yqm-header'),
           shift: 7
       });
   });
   $(document).on('click', '#cz-yqm-header .sure', function() {
       var courseid = $("#course-header").attr('data-id');
       var state = $("#stop-course-code").attr('data-state');
       API.courseApi_resetCourseCode(courseid, function(data) {
           $('#course-code-select .codetext').html(data.courseCode);
           $('#course-code-select .qrcode').removeClass("hide2");
           exports.openMsg('邀请码已重置', 0);
       });
       layer.closeAll();
   });
   $(document).on('click', '#cz-yqm-header .cancel', function() {
       layer.closeAll();
   });

   // 点击消息按钮
   $('#notice').click(function() {
       $('.notice-ct dl').each(function(){
           var mtime = $(this).find('.mtime').text();
           var cname = $(this).find('.imged').text();
           var classColor = $(this).find('.imged').hasClass('classcolor');
           if(!/\d{4}-\d{2}-\d{2}/.test(mtime)){
               $(this).find('.mtime').text(exports.time_format_year_month_day(mtime));
           }
           if(classColor){
               $(this).find('.imged').text(exports.trim(cname.substring(0,1)));
           }
       })
       $('.notice-ct').show();
       $('.user-info').hide();
       $('.dl-box').css('height', $('.notice-ct .dl-cont').outerHeight())
       require.async('scrollBar',function(scrollBar) {
       	if(scrollBar != null){
               scrollBar.scrollBar($('.notice-ct .dl-box'), $('.notice-ct .dl-cont'));	
       	}
       });
       return false;
   });
   $('#user').click(function() {
       $('.user-info').show();
       $('.notice-ct').hide();
       return false;
   });

   //左边栏
   $('.side-button').click(function() {
       $('.leftcon .open-course').css('height', $(window).height() - 214);
       require.async('scrollBar',function(scrollBar) {
           scrollBar.scrollBar($('.open-course'), $('.open-course .open-box'));
       });
       $(".leftcon").stop().animate({
           left: '0px'
       }, 200);
       return false;
   });
   $('.leftcon  .open-box p').click(function() {
       return false
   });
   $(document).on('click', '.leftcon  .bar2', function() {
       return false;
   });
   $(document).click(function(e) {
   		if($(".selecon.cl").length > 0){
   			$(".selecon.cl").hide();	
   		}
   		if($(e.target).closest('.notice-ct').length==0){
           $('.notice-ct').hide();
           $('.notice-ct dl.readed').remove();
           $('.dl-box').css('height', $('.notice-ct .dl-cont').outerHeight())
           require.async('scrollBar',function(scrollBar) {
           	if(scrollBar != null){
                   scrollBar.scrollBar($('.notice-ct .dl-box'), $('.notice-ct .dl-cont'));	
           	}
           });
   		}
   		if($('.user-info').length > 0){
           $('.user-info').hide();	
   		}
   		if($(".leftcon").length > 0){
           $(".leftcon").animate({
               left: '-350px'
           }, 200);	
   		}
   });

   $(window).resize(function() {
       require.async('scrollBar',function(scrollBar) {
       	if(scrollBar != null){
       		if($('.leftcon .open-course').length > 0){
                   $('.leftcon .open-course').css('height', $(window).height() - 214);	
       		}
       		if($('.open-course').length > 0 || $('.open-course .open-box').length > 0){
                   scrollBar.scrollBar($('.open-course'), $('.open-course .open-box'));	
       		}
       		if($('.xuantuconb').length > 0){
                   $('.xuantuconb').css('height', parseInt($(window).height() * 0.9) - 70 - 86);	
       		}
       		if($('.xuantuconb').length > 0 || $('.xuantuconb .ul1').length > 0){
                   scrollBar.scrollBar($('.xuantuconb'), $('.xuantuconb .ul1'));	
       		}
       	}
       });
   });

   $('.notice-ct').on('mouseenter', 'dl:not(".readed")', function() {
       var ignore = '<a class="ignore" href="javascript:;">忽略</a>';
       $(this).find('dd').append(ignore);
   });
   $(document).on('mouseleave', '.notice-ct dl:not(".readed")', function() {
       $(this).find('.ignore').remove();
   });
   $(document).on('click', '.notice-ct .ignore', function(e) {
       var obj = $(this).parents('dl');
       var msgid = obj.attr('data-id');
       var self = this;
       API.messageApi_readIt(msgid, function(data) {
           $(self).remove();
           obj.addClass('readed');
           var count = $('#notice span').html();
           count = count - 1;
           if (count <= 0) {
               $('#notice span').remove();
               $('.notice-ct').find('.dl-box').remove();
               $('.notice-ct .zw').removeClass('hide');
           } else {
               $('#notice span').html(count);
           }
           if(localStorage.message){
               localStorage.message = localStorage.message.replace(msgid,'');
           }
       });
       e.stopPropagation();
   });
   $(document).on('click', '.notice-ct .mcoursename a', function(e) {
       e.preventDefault();
       var obj = $(this).parents('dl');
       var href = $(this).attr('href');
       var msgid = obj.attr('data-id');
       if(localStorage.message){
           localStorage.message = localStorage.message.replace(msgid,'');
       }
       location.href = href;
   })
   //忽略所有消息
   $(document).on('click', '#ignore-all', function() {
       $(this).parents('.notice-ct').find('.dl-box').remove();
       $('.notice-ct .zw').removeClass('hide');
       $('#notice span').remove();
       API.messageApi_readAll(function(data) {
           localStorage.removeItem('message');
       });
   });
   
   $('.user-info li').hover(function() {
       $(this).find('a').css('color', '#4d90fe');
   }, function() {
       $(this).find('a').css('color', '#2D2D2D');
   });

   $('.search-result').on('mouseenter', 'ul', function() {
       $(this).find('a').css('color', '#4d90fe');
   });
   $('.search-result').on('mouseleave', 'ul', function() {
       $(this).find('a').css('color', '#2D2D2D');
   });

   //回到顶部
   $(document).on("scroll resize",function(){
       if($(document).scrollTop()>0){
       	if($(".back-to-top").length > 0){
               $(".back-to-top").show();
       	}
       }else{
       	if($(".back-to-top").length > 0){
               $(".back-to-top").hide();	
       	}
       }
   });
   $(document).on("click",".back-to-top",function(){
       $("html,body").animate({'scrollTop':"0"},300);
   });
   //操作其他位置
   $(document).click(function() {
       $('.opt-box').hide();
       $('.perform-page .opt-a').css('border', '1px solid #ececec');
   });
   $(document).dblclick(function() {
       return false;
   });

   //新增确认
   $(document).on('click', '#new-perform .sure', function() {
       n = 0;
   });
   $(document).on('click', '#new-random .sure', function() {
       n = 0;
   });

   $('.little-pop').not($('#new-random,#del-perform')).find('.sure').hover(function() {
       var oV = $(this).parent().prevAll('input').val();
       if (oV != '') {
           $(this).addClass('hover');
       }
   }, function() {
       var oV = $(this).parent().prevAll('input').val();
       if (oV != '') {
           $(this).removeClass('hover');
       }
   }).mousedown(function() {
       var oV = $(this).parent().prevAll('input').val();
       if (oV != '') {
           $(this).addClass('click');
       }
   }).mouseup(function() {
       $(this).removeClass('click');
   });
   
   $('.little-pop').not($('#new-random')).find('input').on('keyup', function() {
       var oV = $(this).val();
       if (oV == '') {
           $('.little-pop .sure').removeClass('active');
           $(this).removeClass('active');
       } else {
           $('.little-pop .sure').addClass('active');
           $(this).addClass('active');
       }
   });
   /*layer common*/
   $(document).on('focus','.layer-ext-ding00 .pop-new-2 .input-box input',function(){
       var inputbox = $(this).parents('.input-box');
       inputbox.addClass('active');
   }).on('blur','.layer-ext-ding00 .pop-new-2 .input-box input',function(){
       var inputbox = $(this).parents('.input-box');
       inputbox.removeClass('active');
   });
   
   /******************自动为url添加链接**************/
   $(document).on("click",".autoOutLink,.detailContent a",function(){
   		var url = $(this).attr('data-href');
   		if(url == "" || url == null){
   			url = $(this).attr('href');
   		}
		exports.cursorconfirm({
			title:'是否跳转？',
			info:'这是外部链接，点击之后将进行跳转',
			canel:'取消',
			sure:'跳转',
			sureCallback:function(dialog){
				window.open(url);
				return;
           }
		});
		return false;
   });
   $(document).on("click",".photolists ul li img",function(){
   		var obj = $(this);
   		var dataSrc = "data-src";
   		if(obj.attr('data-src')){
   			dataSrc = "data-src";
   		}else{
   			dataSrc = "src";
   		}
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
	                    url: dataSrc,
	                    show: function() {          
	                    }
	             });
   			 obj.click();
   	     }); 
		}
   });
   /***************工具栏模块事件******************/
   //调出考勤管理
   $(document).on('click','.course-left-pannel-toolbar .toolbarul li.K_left_middle_attance',function(e){
   	   e.stopPropagation();
   	   var courseid = $("#course-header").attr('data-id');
       var url = "/Attence/indexpop/courseid/"+courseid;
       exports.mloading();
       layer.open({
           type:2,
           title:false,
           closeBtn:0,
           area: ['90%','100%'],
           offset:[0,'10%'],
           shade: 0.5,
           skin: 'layui-layer-pptview',
           shadeClose: true,
           scrollbar: false,
           content:url,
           success:function(content){
    	   		exports.closeLoading();
           },
           end: function () {
           }
       });
   });
   //调出表现管理
   $(document).on('click','.course-left-pannel-toolbar .toolbarul li.K_left_middle_perform',function(e){
	   e.stopPropagation();
	   var courseid = $("#course-header").attr('data-id');
       var url = "/Performance/indexpop/courseid/"+courseid;
       exports.mloading();
       layer.open({
           type:2,
           title:false,
           closeBtn:0,
           area: ['90%','100%'],
           offset:[0,'10%'],
           shade: 0.5,
           skin: 'layui-layer-pptview',
           shadeClose: true,
           scrollbar: false,
           content:url,
           success:function(content){
    	   		exports.closeLoading();
           },
           end: function () {
           }
       });
   });
   //调出提问模块
   $(document).on('click','.course-left-pannel-toolbar .toolbarul li.K_left_middle_ask',function(e){
   		e.stopPropagation();
   		var courseid = $("#course-header").attr('data-id');
   		exports.mloading();
        var url = "/InteractPPT/ask/courseid/"+courseid;
        layer.open({
           type:2,
           title:false,
           closeBtn:0,
           area: ['90%','100%'],
           offset:[0,'10%'],
           shade: 0.5,
           skin: 'layui-layer-pptview',
           shadeClose: true,
           scrollbar: false,
           content:url,
           success:function(content){
        		exports.closeLoading();
           },
           end: function () {
           		
           }
       });
   });
   //调出抢答模块
   $(document).on('click','.course-left-pannel-toolbar .toolbarul li.K_left_middle_race',function(e){
	   	e.stopPropagation();
	   	var courseid = $("#course-header").attr('data-id');
	   	exports.mloading();
        var url = "/AnswerRace/index/courseid/"+courseid;
        layer.open({
           type:2,
           title:false,
           closeBtn:0,
           area: ['90%','100%'],
           offset:[0,'10%'],
           shade: 0.5,
           skin: 'layui-layer-pptview',
           shadeClose: true,
           scrollbar: false,
           content:url,
           success:function(content){
        		exports.closeLoading();
           },
           end: function () {
           }
      });
   });
   //调出画板模块
   $(document).on('click','.course-left-pannel-toolbar .toolbarul li.K_left_middle_blackboard',function(e){
	   	e.stopPropagation();
	   	var courseid = $("#course-header").attr('data-id');
	   	exports.mloading();
       var url = "/WhiteBoard/index/courseid/"+courseid;
       layer.open({
          type:2,
          title:false,
          closeBtn:0,
          area: ['90%','100%'],
          offset:[0,'10%'],
          shade: 0.5,
          skin: 'layui-layer-pptview',
          shadeClose: true,
          scrollbar: false,
          content:url,
          success:function(content){
       		exports.closeLoading();
          },
          end: function () {
          }
     });
  });
   //左侧收起
   $(document).on('click','.course-left-pannel-toolbar .showpannel',function(e){
	   	if($(this).hasClass('leftarraw')){
	   		//计算当前的距离底部的高度
	   		var top = $(this).offset().top-$(document).scrollTop();
	   		$('.course-left-pannel-toolbar').css('top',top);
	   		$(this).removeClass('leftarraw');
	   		$(this).addClass('rightarraw');
	   		$(".course-left-pannel-toolbar .toolbarul").removeClass('clickdown');
	   		$(".course-left-pannel-toolbar .toolbarul").addClass('clickbefore');
	   	}else if($(this).hasClass('rightarraw')){
	   		$(this).removeClass('rightarraw');
	   		$(this).addClass('leftarraw');
	   		$('.course-left-pannel-toolbar').css('top','30%');
	   		$(".course-left-pannel-toolbar .toolbarul").removeClass('clickbefore');
	   		$(".course-left-pannel-toolbar .toolbarul").addClass('clickdown');
	   	}
   });

   //创建滑动开关
    exports.setSlideswitch = function(domid,isopen,callback){
        var _this = $("#"+domid);
        $(_this).addClass('myswitch');
        if(isopen){
            $(_this).addClass('myswitchon');
            $(_this).attr('switch','on')
        }else{
            $(_this).attr('switch','off')
        }
        var wei = parseInt($(_this).css('width'));
        var hei = parseInt($(_this).css('height'));
        $(_this).html('<div class="inmyswitch"></div>');
        $(_this).children().css({height:hei-2+'px',width:hei-2+'px',right:wei-hei+1+'px'});
        $(_this).on('click',function(){
            var s;
            if($(this).hasClass('myswitchon')){
                $(this).removeClass('myswitchon');
                $(_this).attr('switch','off')
                s = 0;
            }else{
                $(this).addClass('myswitchon');
                $(_this).attr('switch','on')
                s = 1;
            }
            if(callback){
                callback(s);
            }
        })
    }
    exports.setswitchstatus = function(domid,isopen){
        var _this = $("#"+domid);
        if(isopen){
            $(_this).addClass('myswitchon');
            $(_this).attr('switch','on')
        }else{
            $(_this).attr('switch','off')
            $(_this).removeClass('myswitchon');
        }
    }
    exports.setSlideswitchByClass = function(domclass,isopen,callback){
        var lis = $('.'+domclass);
        lis.each(function(index,item){
            $(item).addClass('myswitch');
            if(isopen){
                $(item).addClass('myswitchon');
                $(item).attr('switch','on')
            }else{
                $(item).attr('switch','off')
            }
            var wei = parseInt($(item).css('width'));
            var hei = parseInt($(item).css('height'));
            $(item).html('<div class="inmyswitch"></div>');
            $(item).children().css({height:hei-2+'px',width:hei-2+'px',right:wei-hei+1+'px'});
            $(item).on('click',function(){
                var s;
                if($(this).hasClass('myswitchon')){
                    $(this).removeClass('myswitchon');
                    $(item).attr('switch','off')
                    s = 0;
                }else{
                    $(this).addClass('myswitchon');
                    $(item).attr('switch','on')
                    s = 1;
                }
                if(callback){
                    callback(s);
                }
            })
        })
    }
});
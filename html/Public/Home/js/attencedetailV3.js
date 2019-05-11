/**
 * Created by ALong on 2018/4/25.
 */
define(function(require,exports,module){
	 window.$=window.jQuery=$=require('jquery');
    var plugin=require('plugin');
    var API = require('API');
    //require('mockv3');
    var template = require('art-template-native');
    require('layuiV2');
	//var layer = layui.layer;

	var __LOCAL = {}
	__LOCAL.attendstulist = {}
	__LOCAL.attendstulist.list = []


	function toDouble(n){
        if (n < 10) {
            return '0' + n;
        } else {
            return '' + n;
        }
    };
	template.helper('year_month_day',function(unixTime){
		var time = new Date(unixTime);
		var ymdhis = "";
		ymdhis += (time.getFullYear()+"").substring(0) + "/";
		ymdhis += toDouble((time.getMonth()+1)) + "/";
		ymdhis += toDouble(time.getDate());
		return ymdhis;
	})
	template.helper('year_month_day2',function(unixTime){
		var time = new Date(unixTime);
		var ymdhis = "";
		ymdhis += (time.getFullYear()+"").substring(0) + ".";
		ymdhis += toDouble((time.getMonth()+1)) + ".";
		ymdhis += toDouble(time.getDate());
		return ymdhis;
	})
	template.helper('year_month',function(unixTime){
		var time = new Date(unixTime);
		var ymdhis = "";
		ymdhis += (time.getFullYear()+"").substring(0) + "年";
		ymdhis += toDouble((time.getMonth()+1)) + "月";
		return ymdhis;
	})
	template.helper('hour_min',function(unixTime){
		var time = new Date(unixTime);
        var ymdhis = "";
        ymdhis += toDouble(time.getHours()) + ":";
        ymdhis += toDouble((time.getMinutes()));
        return ymdhis;
	})
	template.helper('getyearmonthfromkey',function(key){
		var arr = key.split('_');
		var str = arr[1]+'年'+arr[2]+'月';
        return str;
	})
	template.helper('ymdhm',function(unixTime){
		var time = new Date(unixTime);
		var ymdhis = "";
		ymdhis += (time.getFullYear()+"").substring(0) + ".";
		ymdhis += toDouble((time.getMonth()+1)) + ".";
		ymdhis += toDouble(time.getDate())+'&nbsp;&nbsp;&nbsp;';
		ymdhis += toDouble(time.getHours()) + ":";
        ymdhis += toDouble((time.getMinutes()));
        return ymdhis;
	})			

	__LOCAL.IMGLOAD = {}
	template.helper('checkimgload',function(id){
		//console.log(__LOCAL.IMGLOAD)
		if(__LOCAL.IMGLOAD[id]!=null&&__LOCAL.IMGLOAD[id]==1){
			return true;
		}else{
			return false;
		}
	})	



	



	exports.init = function(){
		exports.get_navlist();
		
	}
	exports.get_navlist = function(){
		var courseid = localStorage['cid'];
		
		API.AttenceV2Api_getAttenceList(courseid,function(data){
			if(data.status == 1){
				var json = {list:{}}
				for(var i = 0;i<data.lists.length;i++){
					var time = data.lists[i].createTime;
					var YearMouth = time.split(" ")[0];

					var ymdhis = "date_";
					ymdhis += (YearMouth.split("-")[0])+ "_";
					 ymdhis += YearMouth.split("-")[1];
					if(json.list[ymdhis]){
					}else{
						json.list[ymdhis] = [];
					}
						json.list[ymdhis].push(data.lists[i]);
				}
				__LOCAL.navlist = json;
				//console.log(json);
				exports.draw_navlist();

				
			}

		})
		
	}
	exports.draw_navlist = function(){
		$('.nav_attenddatelists').html(template('tmp-navlist',__LOCAL.navlist));
		var attenceid = localStorage['attenceid'];
		$('.nav_attendnamelist[data-id="'+attenceid+'"]').addClass('on').parent().prev().addClass('on');


		exports.get_attendstulist();
		exports.domthing();
		// if($('.nav_attenddatelist').length==0){
		// 	exports.draw_attendstulist({list:[]})
		// }else{
		// 	exports.get_attendstulist($('.nav_attendnamelist:eq(0)').data('id'));
		// 	$('.nav_down:eq(0)').addClass('on');
		// 	$('.nav_attendnamelist:eq(0)').addClass('on')
		// }
		

	}
	__LOCAL.locationstate2 = {};
	exports.get_attendstulist = function(attenceid){
		$('#mouhu_search').val('');
		var attenceid = (attenceid?attenceid:localStorage['attenceid']);
		API.AttenceV2Api_getAttenceStudentLists(attenceid,localStorage['cid'],function(data){

			// //map中的未签到

			// var newarray = [];
			// for(var i = 0;i<data.lists.length;i++){
			// 	if(data.lists[i].locationstate!=null){
			// 		if(data.lists[i].locationstate==2){
			// 			newarray.push(data.lists[i]);
			// 		}
					
			// 	}
			// }
			// __LOCAL.locationstate2.lists = newarray;


			if(data.status ==1){
				__LOCAL.attendstulist = data;
				$('.btn_sort_state').addClass('down');
				ArrayUtil.sortBy(__LOCAL.attendstulist.lists,'state','number','down')
				__LOCAL.attendstulist.createtime = $('.nav_attendnamelist.on').data('time');
				__LOCAL.attendstulist.attendname = $('.nav_attendnamelist.on').text();
				__LOCAL.attendstulist.attendtype = parseInt($('.nav_attendnamelist.on').data('type'));
				exports.draw_attendstulist();
				exports.databinding();
				exports.draw_head();
				
			}
		})




	}



	exports.draw_head = function(){
		$('.admhd_dis').html(template('tmp-head',__LOCAL.attendstulist))
	}
	exports.draw_attendstulist = function(attendstulist){
		$('.attend_date_lists').html(template('tmp-attendstulist',attendstulist?attendstulist:__LOCAL.attendstulist));
		if($('.nav_attendnamelist.on').data('type')==0||$('.nav_attendnamelist.on').data('type')==3){
			$('.btn_suspicious').css('display','none');
			$('.attend_date_list .attend_date_gps').html('--');
			
		}else{
			$('.btn_suspicious').css('display','inline');
		}
			loadimg();

	}
	//单向数据绑定
	exports.databinding = function(){
		//var array = __LOCAL.attendstulist.lists;
		//console.log(array)
		//var okcount = ArrayUtil.getByKeyValue(array,'state','0').length;
		
		
		// var latecount = ArrayUtil.getByKeyValue(array,'state','2').length;
		// var parsecount = ArrayUtil.getByKeyValue(array,'state','3').length
		// 				+ArrayUtil.getByKeyValue(array,'state','4').length
		// 				+ArrayUtil.getByKeyValue(array,'state','5').length;
		// 				+ArrayUtil.getByKeyValue(array,'state','6').length;
		// var offcount = ArrayUtil.getByKeyValue(array,'state','1').length;
		// var zaotuicount = ArrayUtil.getByKeyValue(array,'state','7').length;
		

		var okcount = 0;
		var latecount =0;
		var parsecount = 0;
		var offcount = 0;
		var zaotuicount = 0;


		var array = __LOCAL.attendstulist.lists;
		var length = array.length
		var state;
		for(var i = 0;i<length;i++){
				state = array[i].state;
				switch(parseInt(state)){
					case 0:okcount++;break;
					case 1:offcount++;break;
					case 2:latecount++;break;
					case 7:zaotuicount++;break;
					default:parsecount++;break;
				}
				
		}
		$('.attend_tab_count').html(length)
		$('.admhd_peoplenumtop span').html(okcount);
		$('.admhd_ratetop span').html(okcount/array.length)

		$('.attend_tab_attendcount').html(okcount);
		$('.attend_tab_latecount').html(latecount);
		$('.attend_tab_parsecount').html(parsecount);
		$('.attend_tab_offcount').html(offcount);
		$('.attend_tab_zaotuicount').html(zaotuicount);
		$('.admhd_peoplenumtop span').html(okcount);
		$('.admhd_ratetop span').html(array.length==0?0:parseInt(okcount*1000/array.length)/10);

		// var suspiciouscount = 0
		// for(var i = 0;i<__LOCAL.attendstulist.ppLists.length;i++){
		// 	for(var j = 0;j<__LOCAL.attendstulist.ppLists[i].length;j++){
		// 		suspiciouscount++;
		// 	}
		// }
		// $('.suspicious_num').css('display',suspiciouscount==0?'none':'inline-block').html(suspiciouscount);
	}
	//绘制学生列表的时候看当前选择的出勤状态作帅选
		function drawstulistbystate(state){
			if(state == '100') {
					exports.draw_attendstulist();
					
				}
			else if(state == 3){
				
				var array = __LOCAL.attendstulist.lists;
				var newarray = []
				for(var i = 0;i<array.length;i++){
					if(array[i].state==3||array[i].state==4||array[i].state==5||array[i].state==6){
						newarray.push(array[i]);
					}
				}
				exports.draw_attendstulist({lists:newarray});
			}
			else {
				
				exports.draw_attendstulist({lists:ArrayUtil.getByKeyValue(__LOCAL.attendstulist.lists,'state',state)});
			}
		}

	exports.domthing = function(){


		//管理
		$(document).on('click','.btn_root',function(){
			$(this).next().toggleClass('on');
			return false;
		})

		$(document).on('click','.btn_dl_single',function(){
			var attenceid = $("#return-course").attr('data-id');
			var url = '/AttenceV2Api/singleExport?attenceid='+attenceid;
			location.href = url;
		})

		$(document).on('click',function(){
			$('.btn_root+ul').removeClass('on');
		})
		$(document).on('click','.btn_root + ul li',function(){
			$('.btn_root+ul').removeClass('on');
			if($(this).index()==0){//重命名
				var title = $('.admhd_name').html();
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
						var attenceid = $('.nav_attendnamelist.on').data('id');
						var value = $.trim($('#alterattencetitle').val());
						API.attenceApi_renameAttence(attenceid,value,function(data){
							if(data.status == 1){
								plugin.openMsg('修改成功',0);
								$('.nav_attendnamelist.on').html(value);
								$('.admhd_name').html(value);
							}
						});

						layer.close(i);
					}

				})
			}
			else{//删除
				plugin.cursorconfirm({
		            info:'确认删除考勤吗',
		            canel:'取消',
		            sure:'确定',
		            width:'300px',
		            sureCallback:function(dialog){
		            	var attenceid = $('.nav_attendnamelist.on').data('id');
						API.attenceApi_delAttence(attenceid,function(data){
							if(data.status == 1){
								plugin.openMsg('删除成功',0)
								$('.nav_attendnamelist.on').remove();
								var nav = $('.nav_attendnamelist');
								if(nav.length==0){
									$('#return-course').click();
								}else{
									nav.eq(0).click();
									 window.history.pushState({},0,'http://'+window.location.host+'/'+'Attence/attence/attenceid/'+nav.eq(0).data('id')+'.html');
									//location.href = "/Attence/attence/attenceid/"++".html"
								}
							}
						})
		                dialog.remove();
		            }
				})
				
			}
			return false;
		})


		//模糊查询
		$('#mouhu_search').on('keydown',function(event){
            e=event || window.event;
			if(e.keyCode=='13'){
				$(this).next().click();
			}
		})

		$('#serach_student').click(function(){
			if($('#mouhu_search').hasClass('on')){
				var value = $.trim($('#mouhu_search').val());
				if(value==''){
					$('#mouhu_search').val('');
					//plugin.openMsg('请输入学生姓名或学号',1);
					//exports.draw_attendstulist();
					$('#mouhu_search').removeClass('on');
				}else{
					var t = ArrayUtil.filter(__LOCAL.attendstulist.lists,['stno','username'],value);
					$('.attend_tab').removeClass('on').eq(0).addClass('on');
					exports.draw_attendstulist({lists:t});
					
				}
			}else{
				$('#mouhu_search').addClass('on').focus();
			}
		})



		//点击学生姓名进入学生详情
		$(document).on('click','.attend_date_member_name,.attend_date_member img',function(){
			var stuid = $(this).parents('.attend_date_list').data('id');
			var courseid = $('#return-course').data('cid');
			location.href="/Attence/studetail/stuid/"+stuid+"/courseid/"+courseid+".html";
		});
		//查看变更记录
		$(document).on('click','.attend_date_lists .attend_date_change',function(){
			if($(this).html()==0){
				plugin.openMsg('没有变更记录',1);
				return;
			}  
			var username = $(this).parents('.attend_date_list').find('.attend_date_member_name').html();
			var stuid = $(this).parents('.attend_date_list').data('id');
			var attenceid = $('.nav_attendnamelist.on').data('id');
			API.AttenceV2Api_getStudentAttenceChangeLog(stuid,attenceid,function(data){
				//console.log(data)
				if(data.status == 1){
					layer.open({
						type:1,
						btn:false,
						skin:'layer-ext-ding00',
						title:'变更记录',
						area:["550px","350px"],
						content:template('lay-changelog',data),
					})
				}
			})
		})


		
		//切换 出勤状态学生列表
		$(document).on('click','.attend_tab',function(){
			if($(this).hasClass('on')) return;
			$('.attend_tab.on').removeClass('on');
			$(this).addClass('on');
			var state = $(this).data('state');
			drawstulistbystate(state);
		})

		//侧边栏展开关闭
		$(document).on('click','.nav_attenddatelist',function(){
			//if($(this).find('.nav_attendnamelist.on').length == 1) return;
			$(this).find('.nav_down').toggleClass('on');
		});
		//选择考勤
		$(document).on('click','.nav_attendnamelist',function(){
			$('.nav_attendnamelist.on').removeClass('on');
			$(this).addClass('on');
			var id = $(this).data('id');

			exports.get_attendstulist(id);
			$('.btn_sort').removeClass('up').removeClass('down');
			$('.attend_tab:eq(0)').click();
			 // window.history.pushState({},0,'http://'+window.location.host+'/html/courseAttenceDetails.html');

			return false;
		});

		//点击排序
		$(document).on('click','.btn_sort',function(){

			var turn = '';
			turn = $(this).hasClass('up')?'up':turn;
			turn = $(this).hasClass('down')?'down':turn;
			$('.btn_sort').removeClass('up').removeClass('down');
			var key = $(this).data('sort');
			
				$(this).addClass( turn == ''|| turn == 'up'? 'down' : 'up' )
			if(key=='state'||key=='locationstate'){
				turn = $(this).hasClass('down')?'down':'up';
			}

			var type = 'number';
			if(key == 'username') type = 'string';
			ArrayUtil.sortBy(__LOCAL.attendstulist.lists,key,type,turn);
			var state = $('.attend_tab.on').data('state');
			drawstulistbystate(state);
		})


		//弹出可疑代签窗口
		$(document).on('click','.btn_suspicious',function(){
			
			var i = layer.open({
				title:'可疑代签',
				btn:false,
				area:['560px','310px'],
				type:1,
				// skin:'layer-ext-ding00',
				content:template('lay-suspicious',__LOCAL.attendstulist),
			})

		})

	

		//弹出更改出勤状态
		$(document).on('click','.btn_changeattendstate',function(){
			var id=$(this).parents('.attend_date_list').data('id');
			var laststate = ArrayUtil.getValueByKeyValue(__LOCAL.attendstulist.lists,'uid',id,'state');
			//console.log(__LOCAL.attendstulist.lists)
			var stuname =  ArrayUtil.getValueByKeyValue(__LOCAL.attendstulist.lists,'uid',id,'username');
			var json = {
				stuname : stuname , 
				state : laststate
			}
			layer.open({
				type:1,
				title:false,
				closeBtn:0,
				skin:'layer-ext-ding00',
				area:['700px','auto'],
				content:template('lay-changestate',json),
				scrollbar: false,
				btn:['变更','取消'],
				success:function(layero){
	                this.layero = layero;
	                var self = $(layero).find('.layui-layer-btn0');
	                self.addClass('active');
	                
	            },
				yes:function(i){
					var attenceid = $('.nav_attendnamelist.on').data('id');
					var changestate = $('#btn_changestate span.on').data('state');
					

					//console.log(id)
					//console.log(attenceid)
					//console.log(changestate)
						layer.close(i)
 						API.attenceApi_updateState(id,attenceid,changestate,function(data){
						
						if(data.status == 1){
							plugin.openMsg('变更成功',0)
							
							ArrayUtil.alertByKeyValue(__LOCAL.attendstulist.lists,'uid',id,'state',changestate);
							//console.log(ArrayUtil.getValueByKeyValue(__LOCAL.attendstulist.lists,'uid',id,'logCount'))
							ArrayUtil.alertByKeyValue(__LOCAL.attendstulist.lists,'uid',id,'logCount',parseInt(ArrayUtil.getValueByKeyValue(__LOCAL.attendstulist.lists,'uid',id,'logCount'))+1);
							exports.databinding();
							// for(var i = 0;i<__LOCAL.attendstulist.ppLists.length;i++){
							// 		ArrayUtil.alertByKeyValue(__LOCAL.attendstulist.ppLists[i],'uid',id,'state',changestate+'');
							// 	}
							//exports.draw_attendstulist();
							var state = $('.attend_tab.on').data('state');
							drawstulistbystate(state);
							
							exports.draw_attendstulist(__LOCAL.attendstulist);
							
						}
					})

				}
				})
			
				$('#btn_changestate').on('click','span',function(){
				//console.log('---------')
				$('#btn_changestate span').removeClass('on');
				$(this).addClass('on');
			})
		})

		

		$(document).on('click','.img_attendstate_img',function(){
			var id=$(this).parents('.suspicious_list').data('id');
			var laststate = ArrayUtil.getValueByKeyValue(__LOCAL.attendstulist.lists,'uid',id,'state');
			var stuname =  ArrayUtil.getValueByKeyValue(__LOCAL.attendstulist.lists,'uid',id,'username');
			var json = {
				stuname : stuname , 
				state : laststate
			}
			var stuname = '1';
			//layer.closeAll();
			layer.open({
				type:1,
				title:false,
				closeBtn:0,
				skin:'layer-ext-ding00',
				area:['700px','auto'],
				content:template('lay-changestate',json),
				btn:['变更','取消'],
				yes:function(i){
					//console.log(i)
					var attenceid = $('.nav_attendnamelist.on').data('id');
					var changestate = $('#btn_changestate span.on').data('state');
					API.attenceApi_updateState(id,attenceid,changestate,function(data){
						
							if(data.status == 1){
								ArrayUtil.alertByKeyValue(__LOCAL.attendstulist.lists,'uid',id,'state',changestate+'');
								exports.databinding();
								plugin.openMsg('变更成功',0);
								//exports.draw_attendstulist();
								var state = $('.attend_tab.on').data('state');
								for(var i = 0;i<__LOCAL.attendstulist.ppLists.length;i++){
									ArrayUtil.alertByKeyValue(__LOCAL.attendstulist.ppLists[i],'uid',id,'state',changestate+'');
								}
								drawstulistbystate(state)
								$('#suspicious_lists').html(template('tmp-suspicious',__LOCAL.attendstulist))
							}
						})
						layer.close(i);
				},
				
				success:function(dialog){
					$(dialog).find('.layui-layer-btn0').addClass('active');
					
				}
			})
				$('#btn_changestate').on('click','span',function(){
					//console.log('---------')
					$('#btn_changestate span').removeClass('on');
					$(this).addClass('on');
				})
			
		})

		


		//


	}

	ArrayUtil = {
		sortBy:function(array,key,type,turn){//倒序排列
			//console.log(key+'---'+type+'---'+turn)
			type = type?type:'number';
			turn = turn?turn:'up';
			if(key=="attendstate"||key=="gpsstate") turn = turn=='down'?'up':'down';
			if(type == 'number'){
				if(turn == 'up'){
					array.sort(function(a,b){
						if(parseInt(a[key])>parseInt(b[key])) return -1;
						if(parseInt(a[key])==parseInt(b[key])) return 0;
						if(parseInt(a[key])<parseInt(b[key])) return 1;
						if(a[key]==null&&b[key]==null) return 0;
						if(a[key]==null) return 1;
						if(b[key]==null) return -1;
					});
				}else{
					array.sort(function(b,a){
						if(parseInt(a[key])>parseInt(b[key])) return -1;
						if(parseInt(a[key])==parseInt(b[key])) return 0;
						if(parseInt(a[key])<parseInt(b[key])) return 1;
						if(a[key]==null&&b[key]==null) return 0;
						if(a[key]==null) return -1;
						if(b[key]==null) return 1;
					});
				}
			}else{
				if(turn == "up"){
					array.sort(function(a,b){
						if(a[key]==null&&b[key]==null) return 0;
						if(a[key]==null) return 1;
						if(b[key]==null) return -1;
						return a[key].localeCompare(b[key])
					});
				}
				else{
					array.sort(function(b,a){
						if(a[key]==null&&b[key]==null) return 0;
						if(a[key]==null) return -1;
						if(b[key]==null) return 1;
						return a[key].localeCompare(b[key])
					});
				}
			}
		},

		getByKeyValue:function(array,key,value){
			var newarray = [];
			for(var i = 0;i<array.length;i++){
				if(array[i][key]==value){
					newarray.push(array[i]);
				}
			}
			return newarray;
		},
		alter:function(array,id,key,value){//修改指定id值得属性值
			//console.log(array+'--'+id+'--'+key+'--'+value)
			for(var i= 0;i<array.length;i++){
				if(array[i].id==id){
					array[i][key]=value;
					//console.log('修改了id为 '+id+ ' 的 '+key+' 值为 '+value);
					break;
				}
			}
		},
		alertByKeyValue:function(array,key,value,key2,value2){
			for(var i= 0;i<array.length;i++){
				if(array[i][key]==value){
					array[i][key2]=value2;
					break;
				}
			}
		},
		getValueById:function(array,id,key){
			for(var i= 0;i<array.length;i++){
				if(array[i].id == id){
					return array[i][key];
				}
			}
		},
		getValueByKeyValue:function(array,key,value,key2){
			for(var i= 0;i<array.length;i++){
				if(array[i][key] == value){
					return array[i][key2];
				}
			}
		},
		filter:function(array,byarray,value){
			var newarray = [];
			for(var i = 0;i<array.length;i++){
				for(var j = 0 ;j<byarray.length;j++){
					if(array[i][ byarray[j] ]!=null){
						if( array[i][ byarray[j] ].match(value) ){
							newarray.push(array[i]);
							break;
						}
					}
				}
			}
			//console.log(newarray)
			return newarray;
		},
	}





	
		function getStudentMap(userData){
			

			//console.log(userData)
            $('#studentMap').html('').removeAttr('style');
            if((userData.latitude==null||userData.latitude==0)&&(userData.longitude==null||userData.longitude==0)){
                var html=$('<p style="text-align: center; line-height: 300px; color: #595959">该学生未开启GPS，无法定位</p>')
                $('#studentMap').append(html);
            }else{
                var map = new BMap.Map("studentMap",{enableMapClick:false});
                map.enableScrollWheelZoom(true);
                map.enableDragging(); 

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
                //var str = "<p style='font-size:16px;'><span style='font-size:18px;font-weight:800;margin:0 3px;'>"+userData.username+"</span>的GPS定位距离教室中心<span id='stumiller' style='font-size:18px;font-weight:800;margin:0 3px;'>"+parseInt(map.getDistance(point,points[0]))+"</span> 米。<p>"
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
                    	//console.log(__LOCAL.userData)
                        var infoWindow =new BMap.InfoWindow(template('tpl-student-map',__LOCAL.userData),opts)
                        //var infoWindow =new BMap.InfoWindow(str,opts)
                        this.openInfoWindow(infoWindow);
                        var pointA = new BMap.Point(this.point.lng,this.point.lat)
                        setTimeout(function(){
                        	$('#stumiller').html(parseInt(map.getDistance(point,pointA)))
                        	
                        },200)
                    });
                   
                    marker[i].addEventListener("mouseup", function(){
                    	//console.log()
                    	var _this = this;
                    	var pointL = new BMap.Point(_this.LA.lng,_this.point.lat)
                    	var pointA = new BMap.Point(_this.point.lng,_this.point.lat)
                    	var distance = parseInt(map.getDistance(pointL,pointA));
                    	if(distance>0){
                    		var attenceid = userData.attenceid;
                    		var studentid = userData.uid;
                    		var latitude = _this.point.lat;
                    		var longitude = _this.point.lng;


                    		plugin.cursorconfirm({
	                    			 title:'',
							            info:'确认变更学生的gps位置吗',
							            canel:'取消',
							            sure:'确定',
							            width:'300px',
							            canelCallback:function(dialog){
							            	_this.setPosition(new BMap.Point(_this.LA.lng,_this.LA.lat));
							            	//_this.setPosition(_this.LA.lng,_this.LA.lat)
							                dialog.remove();
							            },
							            sureCallback:function(dialog){
							            	API.AttenceV2Api_changeStudentLocation(attenceid,studentid,latitude,longitude,function(){
					                    		plugin.openMsg('修改成功',0);
					                    		//alert('修改后的坐标'+_this.point.lng+','+_this.point.lat);
					                    		//$('#stumiller').html(parseInt(map.getDistance(point,pointA)))
				                    			
				                    		})
				                    		dialog.remove();
							            }
	                    		})
                    		// API.AttenceV2Api_changeStudentLocation(attenceid,studentid,latitude,longitude,function(){
	                    	// 	plugin.openMsg('修改成功',0);
	                    	// 	//alert('修改后的坐标'+_this.point.lng+','+_this.point.lat);
	                    	// 	//$('#stumiller').html(parseInt(map.getDistance(point,pointA)))
                    			
                    		// })
                    	}
                    	// }else{
                    	// 	plugin.openMsg('修改距离不能大于200米',1)
                    	// }
                    });

                    // marker[i].addEventListener("mouseover", function(){
                    //     this.Zc.innerHTML = '<img src="/Public/Home/img/location2.png" style="display: block; border:none;margin-left:0px; margin-top:0px; ">';
                    //     this.Zc.parentNode.style.zIndex=2;
                    // });
                    // marker[i].addEventListener("mouseout", function(){
                    //     this.Zc.innerHTML = '<img src="/Public/Home/img/location.png" style="display: block; border:none;margin-left:0px; margin-top:0px; ">';
                    //     this.Zc.parentNode.style.zIndex=-100;
                    //     this.hideInfoWindow();
                    // });
                }
                //marker[0].click;
                marker[0].enableDragging()
			 //    map.addEventListener("click",function(e){
			 //    	console.log(marker[0])
				// 	alert(marker[0].point.lng + "," + marker[0].point.lat);
				// });
                //marker[0].setAnimation(BMAP_ANIMATION_BOUNCE);
               	//alert( map.getDistance(point,points[0]).toFixed(2)+' 米。')
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


  //       //获取学生位置gpsmap
  //       __LOCAL.userData = {}
		// $(document).on('click','.attend_date_lists .attend_date_gps',function(){
		// 	if($(this).hasClass('flaseGPS100')){
		// 		plugin.openMsg('用户未签到',1);
		// 		return false;
		// 	}
		// 	var attenceid = $('.nav_attendnamelist.on').data('id');
		// 	var studentid = $(this).parents('.attend_date_list').data('id');
		// 	var studentname = $(this).parents('.attend_date_list').find('.attend_date_member_name').html();
		// 	API.attenceApi_getStudentLocationInfo(attenceid,studentid,function(tData){
		// 		//console.log(tData);
		// 		// tData.data.latitude = 40.0857080090
		// 		// tData.data.longitude = 116.3537590490
		// 		//tData.data.source = '116,39'

				
		// 		__LOCAL.userData = tData.data;





		// 		var tpl = '<div class="map" id="studentMap" style="height:600px;"></div>';
		// 		layer.open({
		//             type:1,
		//             title:studentname+"的地理位置",
		//             closeBtn:true,
		//             area: ['800px','600px'],
		//             shade: 0.3,
		//             shadeClose: true,
		//             scrollbar: false,
		//             content:tpl,
		//             success:function(content){
		// 				getStudentMap(tData.data);
		//             },
		//             end: function () {
		//             }
		//         });
		// 	});	
			
		// })

		$(document).on('click','.map_sus_list',function(){
			var i = $(this).data('id');
			var longitude = __LOCAL.markers[i].point.lng;
        	var latitude = __LOCAL.markers[i].point.lat
        	__LOCAL.map.panTo(new BMap.Point(longitude,latitude));
            var infoWindow =new BMap.InfoWindow(template('tpl-map-cont',__LOCAL.MAPS.lists[i]),{ width : 250, height: 40, title : "" ,  });
            __LOCAL.markers[i].openInfoWindow(infoWindow);
			
		})


		__LOCAL.markers = null;
		__LOCAL.map = null;
		//__LOCAL.infos = null;
		__LOCAL.MAPS = null;
		function getMap(){
            var attenceid=$('.nav_attendnamelist.on').data('id')
            //$('.error-cont .map').html('').removeAttr('style');
            API.attenceApi_getLocation(attenceid,function(data){
            	__LOCAL.MAPS = data;
            	ArrayUtil.sortBy(__LOCAL.MAPS.lists,'id','string','up');
	        	$('#map_suspicious').html(template('tpl-map-suspecial',{dis:data,nogps:__LOCAL.locationstate2}))
                var length = $('.map_sus_lists').length;
    			$('.map_sus_cont').html(length)
    			if(length==0){
    				$('.map_sus0').css('display','block')
    			}else{
    				$('.map_sus0').css('display','none')
    			}
                if(data.lists.length==0){
                    var html=$('<p style="text-align: center; line-height: 300px; color: #595959">成员未开启GPS，无法定位</p>')
                    $('#attenceMap').append(html);

                }else{
                    var map = new BMap.Map("attenceMap",{enableMapClick:false});
                    __LOCAL.map = map ;
                    map.enableScrollWheelZoom(true);
                	map.enableDragging(); 
                    var myIcon = new BMap.Icon("/Public/Home/img/location.png", new BMap.Size(15,36));
                    var point = new BMap.Point(data.centerPoint.longitude, data.centerPoint.latitude);
                    map.centerAndZoom(point, 17);  // 编写自定义函数，创建标注
                    var oval = new BMap.Circle(point,data.radius,{strokeColor:"#3B793E", strokeWeight:2, strokeOpacity:0.6, fillColor:'#DDF1D9', fillOpacity:0.3});
                    map.addOverlay(oval);
                    var zoomopts = {type: BMAP_NAVIGATION_CONTROL_ZOOM ,anchor:BMAP_ANCHOR_BOTTOM_RIGHT}
                    map.addControl(new BMap.NavigationControl(zoomopts));
                    var points=[];
                    var infos=[];
                    //console.log(data)

                    


                    for (var i = 0; i <  data.lists.length; i ++) {
                    	//39.9110666857,116.4136103013
                        points[i] = new BMap.Point(data.lists[i].attence.longitude, data.lists[i].attence.latitude);
                        //points[i] = new BMap.Point('39.9110666857','116.4136103013');
                        // data.lists[i]={
                        // 	id:1,
                        // 	stno:1,
                        // 	reason:'00',
                        // 	username:'long',
                        // 	attence:{
                        // 		state:0
                        // 	}

                        // }
                        var html=template('tpl-map-cont',data.lists[i]);
                        infos[i]=html;
                    }
                    __LOCAL.infos = infos;
                    var opts = {
                        width : 250,     // 信息窗口宽度
                        height: 40,     // 信息窗口高度
                        title : "" , // 信息窗口标题
                    };
                    var marker=new Array();
                    for(var i=0; i<points.length; i++){
                        marker[i] =new BMap.Marker(points[i],{icon:myIcon});
                        map.addOverlay(marker[i]);
                        marker[i].enableDragging()
                    }
                    for(var i=0; i<marker.length; i++){
                        marker[i].index=i;
                        marker[i].id = data.lists[i].id;
                        marker[i].addEventListener("click", function(){
                        	//console.log(this);
                        	var longitude = this.point.lng;
                        	var latitude = this.point.lat;
                        	map.panTo(new BMap.Point(longitude,latitude));
                        	__LOCAL.MAPS.lists[this.index].maps = 1;
                        	//console.log(__LOCAL.MAPS)
                            var infoWindow =new BMap.InfoWindow(template('tpl-map-cont',__LOCAL.MAPS.lists[this.index]),opts)
                            this.openInfoWindow(infoWindow);
                        	//map.setCenter(new BMap.Point(116.4035,42.915))
                        });

                        marker[i].addEventListener("mouseup", function(){
	                    	//console.log()

	                    	var _this = this;
	                    	var pointL = new BMap.Point(_this.LA.lng,_this.point.lat)
	                    	var pointA = new BMap.Point(_this.point.lng,_this.point.lat)
	                    	var distance = parseInt(map.getDistance(pointL,pointA));
	                    	if(distance>0){
	                    		var attenceid = $('.nav_attendnamelist.on').data('id');
	                    		var studentid = this.id;
	                    		var latitude = _this.point.lat;
	                    		var longitude = _this.point.lng;



	                    		plugin.cursorconfirm({
	                    			 title:'',
							            info:'确认变更学生的gps位置吗',
							            canel:'取消',
							            sure:'确定',
							            width:'300px',
							            canelCallback:function(dialog){
							            	_this.setPosition(new BMap.Point(_this.LA.lng,_this.LA.lat));
							            	//_this.setPosition(_this.LA.lng,_this.LA.lat)
							                dialog.remove();
							            },
							            sureCallback:function(dialog){
							            	API.AttenceV2Api_changeStudentLocation(attenceid,studentid,latitude,longitude,function(){
					                    		plugin.openMsg('修改成功',0);
					                    		API.attenceApi_getLocation(attenceid,function(data){
					                    			//console.log(data)
					                    			__LOCAL.MAPS = data;
					                    			ArrayUtil.sortBy(__LOCAL.MAPS.lists,'id','string','up');
					                    			var t = ArrayUtil.getByKeyValue(__LOCAL.MAPS.lists,'id',studentid)[0];
					                    			ArrayUtil.alertByKeyValue(__LOCAL.attendstulist.lists,'uid',studentid,'locationstate',t.reason==null?0:1)
					                    			var html = t.reason==null?'<img src="/Public/Home/img/attencev3/gpstrue.png" class="attend_dategpsimg">正常</div>':'<img src="/Public/Home/img/attencev3/gpsfalse.png" class="attend_dategpsimg">较远</div>';

					                    			$('.attend_date_list[data-id="'+studentid+'"]').find('.attend_date_gps').html(html).css('color',t.reason==null?'#357ae8':'#ff8c38')
					                    			//console.log(__LOCAL.MAPS.lists[_this.index])
					                    			 var infoWindow =new BMap.InfoWindow(template('tpl-map-cont',__LOCAL.MAPS.lists[_this.index]),opts)
                            						_this.openInfoWindow(infoWindow);
					                    			$('#map_suspicious').html(template('tpl-map-suspecial',{dis:data,nogps:__LOCAL.locationstate2}));
					                    			var length = $('.map_sus_lists').length;
					                    			$('.map_sus_cont').html(length)
					                    			if(length==0){
					                    				$('.map_sus0').css('display','block')
					                    			}else{
					                    				$('.map_sus0').css('display','none')
					                    			}
					                    			if(length<20){
					                    				$('.nav_attendnamelist.on').click();
					                    			}
					                    			//oval.hide()
					                    			map.removeOverlay(oval);
					                    			 point = new BMap.Point(data.centerPoint.longitude,data.centerPoint.latitude);
													 oval = new BMap.Circle(point,200,{strokeColor:"#3B793E", strokeWeight:2, strokeOpacity:0.6, fillColor:'#DDF1D9', fillOpacity:0.3});
									                map.addOverlay(oval);
					                    			//oval.setPosition(new BMap.Point(data.centerPoint.longitude,data.centerPoint.latitude))
					                    		})
					                    		//alert('修改后的坐标'+_this.point.lng+','+_this.point.lat);
					                    		//$('#stumiller').html(parseInt(map.getDistance(point,pointA)))
				                    			
				                    		})
				                    		dialog.remove();
							            }
	                    		})
	                    		// API.AttenceV2Api_changeStudentLocation(attenceid,studentid,latitude,longitude,function(){
		                    	// 	plugin.openMsg('修改成功',0);
		                    	// 	//alert('修改后的坐标'+_this.point.lng+','+_this.point.lat);
		                    	// 	//$('#stumiller').html(parseInt(map.getDistance(point,pointA)))
	                    			
	                    		// })
	                    	}
	                    	// }else{
	                    	// 	plugin.openMsg('修改距离不能大于200米',1)
	                    	// }
	                    });

                        // marker[i].addEventListener("mouseover", function(){
                        //     this.Zc.innerHTML = '<img src="/Public/Home/img/location2.png" style="display: block; border:none;margin-left:0px; margin-top:0px; ">';
                        //     this.Zc.parentNode.style.zIndex=2;
                        // });
                        // marker[i].addEventListener("mouseout", function(){
                        //     this.Zc.innerHTML = '<img src="/Public/Home/img/location.png" style="display: block; border:none;margin-left:0px; margin-top:0px; ">';
                        //     this.Zc.parentNode.style.zIndex=-100;
                        //     this.hideInfoWindow();
                        // });
                    
                    }
                    __LOCAL.markers = marker;

                    //marker[2].click()
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

        function getOneInfo(obj){
            var aState=['ok','no','late','parse','parse1','parse2','parse3','zaotui'];
            var name=$(obj).find('span').attr('class')
            var id=$(obj).parents('.map-cont').attr('data-id');
            var attenceid=$('.nav_attendnamelist.on').attr('data-id');
           //var stuid = $(this).parent().data('id');
           var state = $(obj).attr('data-state')
            var json = {
				stuname : $(obj).prev().find('b').html() , 
				state : state
			}


            layer.open({
				type:1,
				title:false,
				closeBtn:0,
				skin:'layer-ext-ding00',
				area:['700px','auto'],
				content:template('lay-changestate',json),
				btn:['变更','取消'],
				success:function(layero){
	                this.layero = layero;
	                var self = $(layero).find('.layui-layer-btn0');
	                self.addClass('active');
	                
	            },
				yes:function(i){
					var changestate = $('#btn_changestate span.on').data('state');
					//console.log(id)
					//console.log(attenceid)
					//console.log(changestate)
						layer.close(i)
 						API.attenceApi_updateState(id,attenceid,changestate,function(data){
						
						if(data.status == 1){
							plugin.openMsg('变更成功',0)
							if($(obj).data('maps')=='1'){
								for(var i= 0;i<__LOCAL.MAPS.lists.length;i++){
									if(__LOCAL.MAPS.lists[i].id==id){
										__LOCAL.MAPS.lists[i].attence.state=changestate;
										break;
									}
								}
							}else{
								__LOCAL.userData.state = changestate;
							}
							// API.attenceApi_getLocation(attenceid,function(data){
					  //           __LOCAL.MAPS = data;
					  //       })
							ArrayUtil.alertByKeyValue(__LOCAL.attendstulist.lists,'uid',id,'state',changestate+'');
							//console.log(ArrayUtil.getValueByKeyValue(__LOCAL.attendstulist.lists,'uid',id,'logCount'))
							ArrayUtil.alertByKeyValue(__LOCAL.attendstulist.lists,'uid',id,'logCount',parseInt(ArrayUtil.getValueByKeyValue(__LOCAL.attendstulist.lists,'uid',id,'logCount'))+1);
							for(var i = 0;i<__LOCAL.attendstulist.ppLists.length;i++){
									ArrayUtil.alertByKeyValue(__LOCAL.attendstulist.ppLists[i],'uid',id,'state',changestate+'');
								}
							exports.databinding();
							//exports.draw_attendstulist();
							var state = $('.attend_tab.on').data('state');
							$(obj).attr('data-state',changestate);
							$(obj).find('span').attr('class',aState[changestate])
							drawstulistbystate(state);
							
						}
					})

				}
				})
			
				$('#btn_changestate').on('click','span',function(){
				//console.log('---------')
				$('#btn_changestate span').removeClass('on');
				$(this).addClass('on');
			})


        }
        window.getOneInfo = getOneInfo;


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
        	var count = parseInt(winheight/48)  //  一窗口高度可以显示的学生个数
        	var downline = parseInt((scrollTop+winheight)/48);
        	var upline =  parseInt((scrollTop-winheight)/48);
        	if(upline<0){
        		upline = 0;
        	}
        	var __img = $('.attend_date_list .img_date_people_head');
        	if(__img.length<=downline){
        		downline = __img.length;
        	}
        	for( var i = upline;i<downline;i++ ){
        		var _img = __img.eq(i);
        		if(_img.attr('data-end')==null){
        			_img.attr('src',_img.data('src')).attr('data-end','1')
        			__LOCAL.IMGLOAD[_img.data('id')]=1;
        		}
        	}
        }

	
})
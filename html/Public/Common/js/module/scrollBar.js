/**
 * Created by Administrator on 2015/5/19.
 */
define(function(require,exports,module){
    window.$=window.jQuery=$=require('jquery');
    var onbottom;
    
    exports.addWheel = function(obj,fn){
        function fnWheel(ev){
            var oEvent=ev || event;
            var bDown=false;
            if(oEvent.wheelDelta){
                if(oEvent.wheelDelta<0){
                    bDown=true;
                }else{
                    bDown=false;
                }
            }else{
                if(oEvent.detail<0){
                    bDown=false;
                }else{
                    bDown=true;
                }
            }
            if(fn){
                fn(bDown);	
            }
            oEvent.preventDefault && oEvent.preventDefault();
            return false;
        }
        if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
            obj.get(0).addEventListener('DOMMouseScroll',fnWheel,false)
        }else{
            obj.get(0).onmousewheel=fnWheel;
        }
    }
    exports.touchEvent = function(obj,fn){
    	obj.on("touchstart", function(e){
		    startX = e.originalEvent.changedTouches[0].pageX,
		    startY = e.originalEvent.changedTouches[0].pageY;
    	});
    	obj.on("touchend", function(e){ 
    	    moveEndX = e.originalEvent.changedTouches[0].pageX,
    	    moveEndY = e.originalEvent.changedTouches[0].pageY,
    	    X = moveEndX - startX,
    	    Y = moveEndY - startY;
    	    //左滑
    	    if ( Y > 0) {
                if(fn){
                    fn(false,Y);
                }
                return false;
    	    }else if ( Y < 0 ) {
                if(fn){
                    fn(true,Y);
                }
                return false;
    	    }else if( Y== 0){
    	    	return true;
    	    }
    	});
    };
    exports.setTop = function(oBar1,oBar2,oCont,oBox,t){
        if(t<0)t=0;
        if(t>oBar1.outerHeight()-oBar2.outerHeight()){
            t=oBar1.outerHeight()-oBar2.outerHeight();
            if(onbottom){
                onbottom();
            }
        }
        oBar2.css('top',t);
        var scale=t/(oBar1.outerHeight()-oBar2.outerHeight());
        oCont.css('top',-scale*(oCont.outerHeight()-oBox.outerHeight()));
    };
    //到达指定位置
    exports.gotoDist = function(oBox,oCont,t){
        var oBar1=oBox.find('.bar1');
        var oBar2=oBox.find('.bar1 .bar2');
        exports.setTop(oBar1,oBar2,oCont,oBox,t);
    }
    exports.scrollBar=function(oBox,oCont,opts){
    	if(oBox.length == 0 || oCont.length == 0){
    		return;
    	}
    	var options={
    		background:'#f6f6f6',
    	};
        $.extend(options,opts);
        if(options.onBottomCallback){
            onbottom = options.onBottomCallback;
        }
    	var divHtml = '<div class="bar1" style="background:'+options.background+'"><div class="bar2"></div></div>';
        var barHtml=$(divHtml);
        var oHC=oCont.outerHeight();
        var oHB=oBox.outerHeight();
        if(oHC>oHB){
            if(oBox.find('.bar1').length==0){
                oBox.append(barHtml);
            }
            var barH=parseInt(oHB/oHC*oHB);
            oCont.css('top',0);
            oBox.find('.bar1 .bar2').css('height',barH);
        }else{
            oBox.find('.bar1').remove();
            oCont.css('top',0);
        }
        var oBar1=oBox.find('.bar1');
        var oBar2=oBox.find('.bar1 .bar2');
        $(window).resize(function(){
        	if(oBox.length > 0){
                oBar1=oBox.find('.bar1');
                oBar2=oBox.find('.bar1 .bar2');	
        	}
        });
        if(oBar1 == null || oBar1.length == 0) return;
        oBox.on('mousedown','.bar1 .bar2',function(ev){
            var oEvent=ev || event;
            var disY=oEvent.clientY-oBox.find('.bar1 .bar2').get(0).offsetTop;
            $(document).on('mousemove',function(ev){
                var oEvent=ev || event;
                var t=oEvent.clientY-disY;
                exports.setTop(oBar1,oBar2,oCont,oBox,t);
            });
            $(document).on('mouseup',function(){
                $(document).off('mouseup',null)
                $(document).off('mousemove',null);
                if(oBar2 != undefined && oBar2 != null){
                    oBar2.releaseCapture && oBar2.releaseCapture();	
                }
            });
            if(oBar2 != undefined && oBar2 != null){
                oBar2.setCapture  && oBar2.setCapture ();	
            }
            return false;
        });
        //滚轮事件
        exports.addWheel(oBox,function(bDown){
            if(oCont.outerHeight()<oBox.outerHeight()){
                if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
                    oBox.get(0).removeEventListener('DOMMouseScroll',fnWheel,false)
                }else{
                    oBox.get(0).onmousewheel=null;
                }
                return false;
            }
            if(oBar2.length>0){
                var t=oBar2.get(0).offsetTop;
                if(bDown){
                    t+=10;
                }else{
                    t-=10;
                }
                exports.setTop(oBar1,oBar2,oCont,oBox,t);
            }
        });
        //手势事件
        exports.touchEvent(oBox,function(bDown,dist){
            if(oCont.outerHeight()<oBox.outerHeight()){
                if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
                    oBox.get(0).removeEventListener('touchstart');
                }else{
                    oBox.get(0).ontouchstart=null;
                }
                return false;
            }
            dist = Math.abs(dist);
            if(dist > 20){
            	dist = 20;
            }
            if(oBar2.length>0){
                var t=oBar2.get(0).offsetTop;
                if(bDown){
                    t += dist;
                }else{
                    t -= dist;
                }
                exports.setTop(oBar1,oBar2,oCont,oBox,t);
            }
        });
    }
});
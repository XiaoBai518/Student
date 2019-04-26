define(function(require,exports,module){
    window.$=window.jQuery=$=require('jquery');
    var template = require('art-template');
    var plugin = require('plugin');
    var API = require('API');
    var layer = require('layer');
	define('jQuery', function() {
	    return jQuery;
	});
	//初始化头像上传
    function initUploader(){
        require('webuploader');
    	require('lib/webuploader-0.1.5/webuploader.css');
    	var uploader = WebUploader.create({
    		auto: true,
    	    swf:'/Public/Common/js/lib/webuploader-0.1.5/Uploader.swf',
    	    server: '/UploadApi/uploadAvatar',
			//server: '/UploadApi/uploadAvatarByCrop/x/'+x+'/y/'+y+'/w/'+w+'/h/'+h,
    	    pick: {id:".upload",innerHTML:''},
    	    resize: false,
    	    fileSingleSizeLimit:1024*1000*2,//2M
    	    accept: {
    	        title: 'Images',
    	        extensions: 'gif,jpg,jpeg,bmp,png',
    	        mimeTypes: 'image/*'
    	    }
    	});
    	uploader.on('uploadAccept',function(object,ret){
    		if(ret.status == 1){
    			$("#user-avatar").attr('src',ret.data['thumb_src']);
    			plugin.openMsg("头像更换成功",0);
    		}else{
    			plugin.openMsg(ret.info,1);
    		}
    	});
    	uploader.on('error', function(type){
    		if(type == 'F_EXCEED_SIZE'){
    			plugin.openMsg('图片超过了2MB',1);
    		}
    	});
    	plugin.delayRun(function(){
    		$("div[id*='rt_rt_']").css({'left':'0px','width':'90px','height':'90px'});
    	},200);
    };
    
    
//(function($){
//	$(function() {
//  		//图片容器
//  var $queue = $('.frame'),
//  //上传按钮
//  $upload = $('.btns .sure');
// 
//  // WebUploader实例
////  uploader;
//  var uploader = WebUploader.create({
//	        pick: {
//	            id: '#filePicker',
//	            label: '+'
//	        },
//	        swf: '/Public/Common/js/lib/webuploader-0.1.5/Uploader.swf',
//	        chunked: false,
//	        chunkSize: 512 * 1024,
//	        server: '/UploadApi/uploadAvatar',
//	         accept: {
//	             title: 'Images',
//	             extensions: 'gif,jpg,jpeg,bmp,png',
//	             mimeTypes: 'image/*'
//	         },
//	        // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
//	        fileNumLimit: 300,
//	        fileSizeLimit: 200 * 1024 * 1024,    // 200 M
//	        fileSingleSizeLimit: 50 * 1024 * 1024    // 50 M
//	    });
////	    uploader.addButton({
////		    id: '#filePicker',
////		    innerHTML: ''
////		});
//		$upload.on('click', function() {
//           uploader.upload();
//           uploader.on('uploadAccept',function(object,ret){
//	    		if(ret.status == 1){
//	    			$("#user-avatar").attr('src',ret.data['thumb_src']);
//	    			layer.closeAll();
//	    			$('.imgareaselect-outer').hide();
//		         	$('.imgareaselect-selection').hide();
//		         	$('.imgareaselect-handle').hide();
//		         	$('.imgareaselect-border1').hide();
//		         	$('.imgareaselect-border2').hide();
//		         	$('.imgareaselect-border3').hide();
//		         	$('.imgareaselect-border4').hide();
//	    			plugin.openMsg("头像更换成功",0);
//	    		}else{
//	    			plugin.openMsg(ret.info,1);
//	    		}
//	    	});
//	    	uploader.on('error', function(type){
//	    		if(type == 'F_EXCEED_SIZE'){
//	    			plugin.openMsg('图片超过了2MB',1);
//	    		}
//	    	});
//      });
//  		
//	})
//  	
//})( jQuery );
    
exports.all=function(){
	require('lib/imgareaselect/imgareaselect-animated.css');
    require('imgareaselect');
    //头像上传
    $(document).on('click','.faceUploaderPlus',function(){
    	$('#upload').click();
    });
    $(document).on('click','.avatar',function(){
     	layer.open({
		    type: 1,
            title: false,
            closeBtn: false,
            area: ['520px','500px'],
            success: function () {
            	init();
            },
            content: $('#faceUploader'),
            shift: 7,
            moveType: 1
		});
    })
    function clacImgZoomParam(maxWidth, maxHeight, width, height) {
		var param = {
			top: 0,
			left: 0,
			width: width,
			height: height
		};
		if (maxWidth) {
			rateWidth = width / maxWidth;
			rateHeight = height / maxHeight;
			if (rateWidth > rateHeight) {
				param.width = maxWidth;
				param.height = Math.round(height / rateWidth);
				rate = rateWidth;
			} else {
				param.width = Math.round(width / rateHeight);
				param.height = maxHeight;
				rate = rateHeight;
			}
		}
		return param;
	}
    $(document).on('change','#upload',function(){
      		change(this);
        });
		function change(file) {  
			var files = !!file.files ? file.files : []; 
			if(files[0].type == 'image/jpeg' || files[0].type == 'image/png'){
				$('.frame a').hide();
				$('.frame img').show();
				if (!files.length || !window.FileReader) return;
				var reader = new FileReader();  
				reader.readAsDataURL(files[0]);          
				reader.onloadend = function() {
					var img = $('#photo');
					img.attr("src", this.result);
					$("#view_photo").attr("src", this.result);
					img.load(function() {
						var img = $('#photo');
	//					img.width('100%');
	//					img.height('100%');
						var rect = clacImgZoomParam(300, 300, img.width(), img.height());
						img.width(rect.width);
						img.height(rect.height);
						$("#preview").width(img.width() / 3);
						$("#preview").height(img.width() / 3 * selectrate);
					});
				}
			}else{
				plugin.openMsg("格式仅支持JPG/PNG",1);
				return false;
			}
			
		}
		var $startX;
		var $startY;
		var $width;
		var $height;
		selectrate = 1;
		rate = 1;
		function preview(img, selection) {
			if (!selection.width || !selection.height)
				return;
			var img = $("#view_photo");
			var scaleX = $("#preview").width() / selection.width;
			var scaleY = $("#preview").height() / selection.height;
		
			$('#preview img').css({
				width: Math.round(scaleX * $("#photo").width()),
				height: Math.round(scaleY * $("#photo").height()),
				marginLeft: -Math.round(scaleX * selection.x1),
				marginTop: -Math.round(scaleY * selection.y1)
			});
			$startX = Math.round(selection.x1 * rate);
			$startY = Math.round(selection.y1 * rate);
			$width = Math.round(selection.width * rate);
			$height = Math.round(selection.height * rate);
		}
				
		//init();
				
		function init() {
			var width = $('#photo').width();
			var height = $('#photo').height();
			var ias = $('.uploaderFace').imgAreaSelect({
				instance: true,
				zIndex:9999999999,
				aspectRatio: "1:1",
				enable: true,
				handles: true,
				fadeSpeed: 200,
				onInit: function(){
					ias.setSelection(0, 0, 50, 50, true);
					ias.setOptions({ show: true });
					x = 0;
					y = 0;
					w = 200;
					h = 200;
				},
				onSelectChange: preview,
				onSelectEnd:function(){
					x = $startX;
					y = $startY;
					w = $width;
					h = $height;
				}
			});
		}
		function hideSide(){
			$('.imgareaselect-selection').parent().hide();
			$('.imgareaselect-outer').hide();
        	$('.imgareaselect-selection').hide();
        	$('.imgareaselect-handle').hide();
        	$('.imgareaselect-border1').hide();
        	$('.imgareaselect-border2').hide();
        	$('.imgareaselect-border3').hide();
        	$('.imgareaselect-border4').hide();
		};
        //取消头像上传
        $(document).on('click','#faceUploader .cancel',function(){
        	hideSide();
        	$('.frame a').show();
			$('.frame img').hide();
        	layer.closeAll();
        	location.reload();
        })
        
       	//上传
       	 $(document).on('click','#faceUploader .sure',function(){
       	 	var $src = $('#photo').attr('src');
       	 	if(!$src){
       	 		plugin.openMsg('请选择图片',1);
       	 		return false;
       	 	}else{
       	 		$(this).addClass('disabled');
	       	 	layer.load(1, {
				    shade: [0.1,'#fff'] 
				});
       	 		hideSide();
                require('jform');
				var $form = $('form');
				$form.attr('action','/UploadApi/uploadAvatarByCrop/x/'+x+'/y/'+y+'/w/'+w+'/h/'+h);
				$form.ajaxSubmit(function(message) { 
					var imgUrl = message.url;
					$("#user-avatar").attr('src',imgUrl);
					layer.closeAll();
    				plugin.openMsg("头像更换成功",0);
    				$('.frame a').show();
    				$('.frame img').hide();
    				location.reload();
		       }); 
       	 	};
        })
    };
});
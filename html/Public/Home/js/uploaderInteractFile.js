define(function(require,exports,module){
    window.$=window.jQuery=$=require('jquery');
    var layer=require('layer');
    var plugin=require('plugin');
    var template = require('art-template');
	template = plugin.templateConfig(template);
	var nativetemplate = require('art-template-native');
	nativetemplate = plugin.templateConfig(nativetemplate);
    var API = require('API');
    var scrollBar=require('scrollBar');
    
    //上传课件PPT
    var uploader = {};
    var maxLimit = plugin.getMaxUploaderFileSize();
    var limit = plugin.getUploaderLimitFileSize(function(size){
    	limit = size;
    });
    exports.intUploader = function(options){
    	var defaults={
    			obj:null,
    			url:null,
    			fileSizeLimit:limit,
    			cancelCallback:function(){},
    			acceptCallback:function(){},
    			exceedSizeCallback:function(){},
    	};
    	options = $.extend({}, defaults, options);
    	
    	var obj = options.obj;
    	var url = options.url;
    	var acceptCallback = options.acceptCallback;
    	var cancelCallback = options.cancelCallback;
    	var exceedSizeCallback = options.exceedSizeCallback;
    	var fileSizeLimit = options.fileSizeLimit;
        require('webuploader');
        require('lib/webuploader-0.1.5/webuploader.css');
        uploader = WebUploader.create({
            auto: true,
            swf:'/Public/Common/js/lib/webuploader-0.1.5/Uploader.swf',
            server: url,
            pick: {id:obj,multiple:false},
            resize: false,
            disableGlobalDnd:true,
            duplicate:true,
            compress:false,
            chunked: false,
            fileSingleSizeLimit:fileSizeLimit,
            accept:{
            	title:'ppt,pdf,word文件',
            	extensions:'ppt,pptx,pdf,doc,docx',
            	mimeTypes:'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            }
        });
        window.uploader = uploader;
        var box = $('.announce-box');
        uploader.on( 'fileQueued', function( file ) {
            layer.closeAll();
            var mFile = {};
            mFile.id = file.id;
            mFile.name = file.name;
            mFile.size = plugin.format_bytes(file.size);
            uploader.makeThumb( file, function( error, src ) {
                if ( !error ){
                    mFile.ext = src;
                }else{
                    mFile.ext = plugin.getFileExtIcon(file.ext);
                }
                mFile.createtime = new Date().getTime()/1000;
                mFile.per = 0;
                var names=mFile.name;
                var arr=names.split('.');
                if(/ppt[x]?/i.test(arr[arr.length-1])==false 
                    && /pdf?/i.test(arr[arr.length-1])==false 
                    && /doc[x]?/i.test(arr[arr.length-1])==false){
                    plugin.openMsg('该文档不是PPT或PDF或word，无法生成课件类型的互动',1);
                    uploader.cancelFile(file);
                    return;
                }
                var html = template('tpl-ppt-upload',mFile);
                $('body').append(html);
                layer.open({
                    type: 1,
                    title: false,
                    closeBtn: false,
                    area: ['600px','300px'],
                    content: $('.ppt-upload-pop'),
                    shift: 7,
                    moveType: 1
                });
                var $fileDiv = $('.ppt-upload-pop');
                $fileDiv.on('click','.close',function(){
                    layer.closeAll();
                    uploader.cancelFile(file);
                    $fileDiv.remove();
                    plugin.openMsg('已取消上传',1);
                    if(cancelCallback){
                    	cancelCallback(true);
                    }
                })
            },64,64);
        });
        uploader.on( 'uploadProgress', function( file, percentage ) {
            var $fileDiv = $('.ppt-upload-pop');
            var precent = Math.floor(percentage*100);
            if(precent<100){
                $fileDiv.find(".meter-box span").text(precent+"%");
                $fileDiv.find(".meter-box .m2").width(precent+"%");
            }
            if(precent>=97){
            	$fileDiv.find(".meter-box span").text("99%");
            	$fileDiv.find(".meter-box .m2").width("99%");
                $fileDiv.find(".meter-box p").text('转码中...');
            }
        });
        uploader.on( 'uploadError', function( file, reason) {
            var $fileDiv = $('.ppt-upload-pop');
            layer.closeAll();
            $fileDiv.remove();
        });
        uploader.on('uploadAccept',function(object,ret){
            var $fileDiv = $('.ppt-upload-pop');
            if(ret.status == 1){
            	if(acceptCallback){
            		acceptCallback($fileDiv,ret,obj);
            	}           	
            }else if(ret.status ==2){
            	
            } else{
                layer.closeAll();
                plugin.openMsg(ret.info,1);
                $fileDiv.remove();
            }
        });
        uploader.on('error', function(type){
            if(type == 'F_EXCEED_SIZE'){
                plugin.openMsg('文件上传超过了'+plugin.format_bytes(fileSizeLimit),1,5000);
                if(exceedSizeCallback){
                	exceedSizeCallback(fileSizeLimit);
                }
            }
        });
    };    
});
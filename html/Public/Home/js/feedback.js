define(function(require, exports, module) {
   var $ = require('jquery');
   var plugin = require('plugin');
   var layerIndex = -1;
   $(function(){
	    $(document).on('mouseenter','.cx-tj',function(){
	        $(this).find('.tj-tips').show();
	    });
	    $(document).on('mouseleave','.cx-tj',function(){
	        $(this).find('.tj-tips').hide();
	    });   
	    $(document).on("click",function(e){
	        if($(e.target).closest(".help-dips").length==0){
	            $(".help-dips-box").hide();
	        }
	    });
	    var editor = {};
	    $(document).on("click",".btn-feedback,a.feedback",function(){
	        $(".help-dips-box").hide();
	        // 加载simditor主体文件
	        require('/html/Public/Common/js/lib/simditor-1.0.3/scripts/js/simditor-all.js');
	        layerIndex = layer.open({
	            type: 1,
	            title: false,
	            closeBtn: false,
	            area: ['577px','450px'],
	            content: $('#feedBackWindow'),
	            shift: 7,
	            moveType: 1,
	            success:function(dialog){
	                editor = new Simditor({   
	                    textarea: $('#feedEditor'),
	                    toolbar: false,
	                    placeholder: '输入内容向我们反馈...',
	                    pasteImage: true,
	                    toolbarFloat: false,
	                    toolbarHidden: true,
	                    toolbar: ['image'],
	                    defaultImage: '/html/Public/Common/js/lib/simditor-1.0.3/images/image.png',
	                    upload:{
	                        url: '/UploadApi/upload',
	                        params: '正在上传文件，如果离开上传会自动取消'
	                    }
	                });
	                editor.on('valuechanged',function(e){
	                    if(editor.getValue() == ""){
	                        $(".layer-feedBack .btns .sure").removeClass("active");
	                    }else{
	                        $(".layer-feedBack .btns .sure").addClass("active");
	                    };
	                })
	                $(".simditor-toolbar").hide();
	                editor.hidePopover();
	                $(".simditor").css({
	                    marginTop:"15px",
	                    borderRadius:"3px"
	                });
	                $(".simditor").removeClass("focus")
	                $(".simditor .simditor-wrapper").css({
	                    borderRadius:"3px",
	                    height:"120px"
	                });
	                $(".simditor-placeholder").css({
	                    top:"0px"
	                });
	                $(".simditor-body p").css({
	                    color:"#2d2d2d",
	                    height:"20px",
	                    lineHeight:"20px"
	                });
	                $(".simditor-body").css({
	                    paddingBottom:"0px",
	                    height:"100px",
	                    overflow:"auto",
	                });
	                dialog.find('.closeFeedback,.btns .cancel').on('click',function(){
	                	$(this).parents('.layui-layer-page').remove();
	                	$(".layui-layer-shade").remove();
	                });
	            }
	        });
	    });
	    
	    //发送反馈
		$(document).on('click','#feedBackWindow .sure',function(){
			if(editor.getValue() == ''){
				plugin.openMsg('反馈的内容不能为空',1);
	            editor.focus();
				return false;
			}
	        var input = $('.btns .yourEmail input');
			var email = input.val();//$("#feedBackWindow").attr('data-email');
	        if(email==''){
	            plugin.openMsg('邮箱不能为空',1);
	            input.focus();
	            return false;
	        }else if(!plugin.validEmail(email)){
	            plugin.openMsg('邮箱格式不正确',1);
	            input.val(email).focus();
	            return false;
	        }
			var type= "需要帮助";
			var API = require('API');
	    	API.helpApi_sendFeedback(type,email,editor.getValue(),function(data){
	    		plugin.openMsg(data.info,0);
	    		editor.setValue('');
	    		layer.close(layerIndex);
	    	});
		});    
   });
});







define(function(require, exports, module) {
    window.$ = window.jQuery = $ = require("jquery");
    var layer = require("layer");
    var plugin = require("plugin");
    var template = require("art-template");
    template = plugin.templateConfig(template);
    var API = require("API");
    var scrollBar = require("scrollBar");
    var cou = {};
    var S = {};
    var uploader = {};
    var maxLimit = plugin.getMaxUploaderFileSize();
    var limit = plugin.getUploaderLimitFileSize(function(size){
    	limit = size;
    });
    exports.initAPI = function(options){
    	var defaults = {
    		getResourceCoursewareLists:API.ResourceCoursewareApi_listAllCourseware,//获取备某个备课区的所有课件
    		getCourseCousewareLists:API.coursewareApi_getCousewareList,//获取某个班级的所有课件
        }
    	S = $.extend({}, defaults, options);
    };
    exports.setDrPopItemContH = function(dialog, dialogHeight) {
        var drPopHeight = dialogHeight - 80 - 115;
        if (drPopHeight > 435) drPopHeight = 435;
        $(dialog).find(".class-item").css("height", drPopHeight);
        $(dialog).find(".class-cont").css("height", drPopHeight)
    };
    //obj, callback
    exports.initUploaderFile = function(obj, callback, acceptFileType, fileSizeLimit,exceedSizeCallback) {
    	if(fileSizeLimit == null || fileSizeLimit == undefined || fileSizeLimit == 0){
    		fileSizeLimit = limit;
    	}
        require("webuploader");
        require("lib/webuploader-0.1.5/webuploader.css");
        var url = "/UploadApi/upload";
        uploader = WebUploader.create({
            auto: true,
            swf: "/html/Public/Common/js/lib/webuploader-0.1.5/Uploader.swf",
            server: url,
            pick: {
                id: obj,
                multiple: false
            },
            resize: false,
            disableGlobalDnd: true,
            duplicate: true,
            compress: false,
            chunked: false,
            fileSingleSizeLimit: fileSizeLimit,
            accept:acceptFileType,
        });
        var timer = null;
        window.uploader = uploader;
        uploader.on("fileQueued",
        function(file) {
            layer.closeAll();
            var mFile = {};
            mFile.id = file.id;
            mFile.name = file.name;
            mFile.size = plugin.format_bytes(file.size);
            uploader.makeThumb(file,
            function(error, src) {
                if (!error) {
                    mFile.ext = src
                } else {
                    mFile.ext = plugin.getFileExtIcon(file.ext)
                }
                mFile.createtime = (new Date).getTime() / 1e3;
                var names = mFile.name;
                var html = template("tpl-ppt-upload", mFile);
                $("body").append(html);
                layer.open({
                    type: 1,
                    title: false,
                    closeBtn: false,
                    area: ["600px", "300px"],
                    content: $(".ppt-upload-pop"),
                    shift: 7,
                    moveType: 1
                });
                var $fileDiv = $(".ppt-upload-pop");
                $fileDiv.on("click", ".close",
                function() {
                    layer.closeAll();
                    uploader.cancelFile(file);
                    $fileDiv.remove();
                    plugin.openMsg("已取消上传", 1);
                    if (callback) {
                        callback(false);
                    }
                })
            },
            64, 64)
        });
        uploader.on("uploadProgress",function(file, percentage) {
            var $fileDiv = $(".ppt-upload-pop");
            var precent = Math.floor(percentage * 100);
            if(precent<100){
                $fileDiv.find(".meter-box span").text(precent+"%");
                $fileDiv.find(".meter-box .m2").width(precent+"%");
            }
            if(precent>=97){
                $fileDiv.find(".meter-box p").text('转码中...');
                $fileDiv.find(".meter-box span").text("99%");
                $fileDiv.find(".meter-box .m2").width("99%");
            }
        });
        uploader.on("uploadError",function(file, reason) {
            var $fileDiv = $(".ppt-upload-pop");
            layer.closeAll();
            $fileDiv.remove();
            if (callback) {
                callback(false);
            }
        });
        uploader.on("uploadAccept",function(object, ret) {
            var $fileDiv = $(".ppt-upload-pop");
            if (ret.status == 1) {
                var fileid = ret.fileid;
                layer.closeAll();
                $fileDiv.remove();
                if (callback) {
                    callback(true, fileid);
                }
            } else if (ret.status == 2) {} else {
                layer.closeAll();
                plugin.openMsg(ret.info, 1);
                $fileDiv.remove();
                if (callback) {
                    callback(false);
                }
            }
        });
        uploader.on("error",function(type) {
            if (type == "F_EXCEED_SIZE") {
                plugin.openMsg("文件上传超过了" + plugin.format_bytes(fileSizeLimit), 1);
                if(exceedSizeCallback){
                	exceedSizeCallback(fileSizeLimit);
                }
            }
        });
    };
    exports.import1List = function(dialog, singleCheck, callback) {
        cou.drtype = "import1";
        $(dialog).find(".dr-from .import1").addClass("active").siblings().removeClass("active");
        plugin.mloading();
        var import1Index = plugin.getStore("resource-dialog-import1-index");
        API.ResourceApi_getResourceList(function(data) {
            cou.resourcelist = data;
            data.import1 = true;
            var html1 = template("tpl-import-part", data);
            $(dialog).find(".pop-cont").html(html1);
            var html2 = template("tpl-import-resource", data);
            $(dialog).find(".pop-cont .class-item ul").html(html2);
            exports.setDrPopItemContH(dialog, 579);
            scrollBar.scrollBar($(dialog).find(".class-item.fl"), $(dialog).find(".class-item.fl ul"));
            scrollBar.scrollBar($(dialog).find(".class-cont.fr"), $(dialog).find(".class-cont.fr .cont-box"));
            if (callback) {
                callback(data)
            }
            if (import1Index == "" || import1Index == null) {
                import1Index = 0
            } else if (import1Index >= $(".class-item.fl ul li").length) {
                import1Index = 0
            }
            $(dialog).find(".class-item.fl li a ").eq(import1Index).click();
            plugin.closeLoading()
        })
    };
    exports.import2List = function(dialog, singleCheck, callback) {
        cou.drtype = "import2";
        var isfolder = 0;
        $(dialog).find(".dr-from .import2").addClass("active").siblings().removeClass("active");
        plugin.mloading();
        var import1Index = plugin.getStore("resource-dialog-import2-index");
        API.coursewareApi_getImportList(isfolder,
        function(data) {
            data.import2 = true;
            var html1 = template("tpl-import-part", data);
            $(".pop-cont").html(html1);
            exports.setDrPopItemContH(dialog, 579);
            var html = template("tpl-import-course", data);
            $(dialog).find(".class-item.fl ul").html(html);
            scrollBar.scrollBar($(dialog).find(".class-item.fl"), $(dialog).find(".class-item.fl ul"));
            plugin.closeLoading();
            if (callback) {
                callback(data)
            }
            if (import1Index == "" || import1Index == null) {
                import1Index = 0
            } else if (import1Index >= $(".class-item.fl ul li").length) {
                import1Index = 0
            }
            $(dialog).find(".class-item.fl li a").eq(import1Index).click()
        })
    };
    exports.commonContrl = function(content, singleCheck, canSelectFolder) {
        $(content).find(".sure").removeClass("active");
        $(content).find(".dr-pop .cancel").on("click",
        function() {
            layer.closeAll()
        });
        $(content).find(".dr-pop .close").on("click",
        function() {
            layer.closeAll()
        });
        $(content).find(".dr-pop-link .cancel").on("click",
        function() {
            layer.closeAll()
        });
        $(content).find(".dr-pop-link .close").on("click",
        function() {
            layer.closeAll()
        });
        $(content).find(".dr-from .import1").on("click",function() {
            cou.drtype = "import1";
            $(this).addClass("active").siblings().removeClass("active");
            exports.import1List(content, singleCheck,function() {});
        });
        $(content).find(".dr-from .import2").on("click",function() {
            cou.drtype = "import2";
            $(this).addClass("active").siblings().removeClass("active");
            exports.import2List(content, singleCheck,function() {});
        });
        if (cou.commonContrlCache) {
            return;
        } else {
            cou.commonContrlCache = true;
        }
        $(document).on("click", ".resource-dialog .import1-item li a",function() {
            var id = $(this).parents("li").attr("data-id");
            var clickIndex = $(this).parents("li").index();
            plugin.setStore("resource-dialog-import1-index", clickIndex);
            var isfolder = 0;
            var self = this;
            plugin.mloading();
            $(".resource-dialog .pop-cont .class-item.fl li .active").removeClass("active");
            $(self).addClass("active");
            S.getResourceCoursewareLists(id,function(data) {
                data.isresource = true;
                if (isfolder != 0) {
                    data.istofolder = true;
                }
                data.radio = singleCheck;
                var html = template("tpl-import-courseware", data);
                $(".resource-dialog .pop-cont .class-cont.fr .cont-box").html(html);
                scrollBar.scrollBar($(".resource-dialog .pop-cont .class-cont.fr"), $(".resource-dialog .pop-cont .class-cont.fr ul"));
                plugin.closeLoading();
            });
        });
        $(document).on("click", ".resource-dialog .import2-item li a",function() {
            var id = $(this).parents("li").attr("data-id");
            var clickIndex = $(this).parents("li").index();
            plugin.setStore("resource-dialog-import2-index", clickIndex);
            var isfolder = 0;
            var self = this;
            $(".resource-dialog .pop-cont .class-item.fl li .active").removeClass("active");
            $(self).addClass("active");
            plugin.mloading();
            S.getCourseCousewareLists(id, isfolder,function(data) {
                data.iscourse = true;
                if (isfolder != 0) {
                    data.istofolder = true;
                }
                data.radio = singleCheck;
                var html = template("tpl-import-courseware", data);
                $(".resource-dialog .pop-cont .class-cont.fr .cont-box").html(html);
                scrollBar.scrollBar($(".resource-dialog .pop-cont .class-cont.fr"), $(".resource-dialog .pop-cont .class-cont.fr ul"));
                plugin.closeLoading();
            });
        });
        $(document).on("click", ".resource-dialog .cont-list i,.cont-list h3",function() {
            var li = $(this).parent();
            var dialog = $(".dr-pop");
            var isfolder = li.attr("data-folder");
            if (isfolder == 0 || isfolder == 1 && canSelectFolder == true || $(this).hasClass("checkbox")) {
                if (singleCheck == 1) {
                    if (li.hasClass("active")) {
                        li.removeClass("active");
                        if ($(dialog).find("li").hasClass("active") == false) {
                            $(dialog).find(".sure").removeClass("active")
                        }
                    } else {
                        li.addClass("active");
                        li.siblings().removeClass("active");
                        $(dialog).find(".sure").addClass("active")
                    }
                } else {
                    if (li.hasClass("active")) {
                        li.removeClass("active");
                        if ($(dialog).find("li").hasClass("active") == false) {
                            $(dialog).find(".sure").removeClass("active")
                        }
                    } else {
                        li.addClass("active");
                        $(dialog).find(".sure").addClass("active")
                    }
                }
            } else {
                var folderid = li.attr("data-id");
                $(".resource-dialog .dr-pop .cont-list").find("i").removeClass("active");
                $(".resource-dialog .dr-pop .sure").removeClass("active");
                if (cou.drtype == "import1") {
                    API.ResourceCoursewareApi_folder(folderid,
                    function(data) {
                        if (data.lists == null || data.lists.length == 0) {
                            plugin.openMsg("空文件夹", 1);
                            return
                        }
                        data.radio = singleCheck;
                        if (isfolder != 0) {
                            data.istofolder = true
                        }
                        var html = template("tpl-import-courseware", data);
                        $(".resource-dialog .class-cont.fr .cont-box").html(html);
                        scrollBar.scrollBar($(dialog).find(".class-cont.fr"), $(dialog).find(".class-cont.fr ul"))
                    })
                } else if (cou.drtype == "import2") {
                    API.coursewareApi_folder(folderid,
                    function(data) {
                        if (data.lists == null || data.lists.length == 0) {
                            plugin.openMsg("空文件夹", 1);
                            return;
                        }
                        data.radio = singleCheck;
                        if (isfolder != 0) {
                            data.istofolder = true;
                        }
                        var html = template("tpl-import-courseware", data);
                        $(".resource-dialog .class-cont.fr .cont-box").html(html);
                        scrollBar.scrollBar($(dialog).find(".class-cont.fr"), $(dialog).find(".class-cont.fr ul"))
                    });
                }
            }
        });
    };
    
    exports.openResourceDialog = function(options) {
    	var defaults = {
    			title:"导入资源",
    			singleCheck:0,
    			hideUploader:false,
    			defaultUploader:null,
    			canSelectFolder:true,
    			intCallBack:null,
    			finishCallback:null,
    			cancleCallback:null,
    			fileSizeLimit:null,
    			exceedSizeCallback:null,
    			acceptFileType:{
    				extensions:"*",
    			}
        };
    	defaults = $.extend({}, defaults, options);
    	var singleCheck = defaults.singleCheck;
    	var defaultUploader = defaults.defaultUploader;
    	var canSelectFolder = defaults.canSelectFolder;
    	var intCallBack = defaults.intCallBack;
    	var finishCallback = defaults.finishCallback;
    	var acceptFileType = defaults.acceptFileType;
    	var cancleCallback = defaults.cancleCallback;
    	var fileSizeLimit = defaults.fileSizeLimit;
    	var exceedSizeCallback = defaults.exceedSizeCallback;
    	
    	var tpl = template("tpl-resource-dialog",{title:defaults.title,hideUploader:defaults.hideUploader});
        var layerIndex = layer.open({
            type: 1,
            title: false,
            closeBtn: false,
            area: ["830px", "579px"],
            success: function(content) {
                exports.commonContrl(content, singleCheck, canSelectFolder);
                var activeIndex = $(content).find(".dr-from a.active").index();
                if (activeIndex == 0) {
                    exports.import1List(content, singleCheck,function() {});
                } else if (activeIndex == 1) {
                    exports.import2List(content, singleCheck,function() {});
                }
                $(content).find(".sure").on("click",
                function() {
                    if (!$(this).hasClass("active")) return false;
                    var _this = this;
                    $(_this).removeClass("active");
                    $(_this).html("确定...");
                    var remark = "";
                    var fromType = 1;
                    if (cou.drtype == "import1") {
                        remark = "资源从备课区的资料模块导入";
                        fromType = 1;
                    } else if (cou.drtype == "import2") {
                        remark = "资源从班级的资料模块导入";
                        fromType = 2;
                    }
                    var fileidArray = new Array;
                    var idArray = new Array;
                    $(content).find(".cont-box li.active").each(function() {
                        var fileid = $(this).attr("data-fileid");
                        fileidArray.push(fileid);
                        idArray.push($(this).attr("data-id"))
                    });
                    if (finishCallback) {
                        finishCallback(fileidArray, remark, fromType, idArray);
                    }
                    layer.closeAll();
                });
                if (defaultUploader == true) {
                    exports.initUploaderFile($(content).find(".sc-btn"),
                    function(succ, fileid) {
                        if (succ == true) {
                            var fileidArray = new Array;
                            fileidArray.push(fileid);
                            finishCallback(fileidArray, "用户本地上传", 3);
                        }else{
                        	cancleCallback();
                        }
                    },acceptFileType,fileSizeLimit,exceedSizeCallback);
                }
                if (intCallBack) {
                    intCallBack($(content))
                }
            },
            content: tpl,
            shift: 7,
            moveType: 1
        });
        return layerIndex
    };
});
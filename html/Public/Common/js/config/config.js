seajs.config({
    alias: {
        "jquery": "lib/jquery/jquery-sea-1.8.1.js",
        "jquery3": "lib/jquery/jquery-3.2.1.min.js",
        "jQuery": "lib/jquery/jquery-sea-1.8.1.js",
        "jquery-ui": "lib/jquery/jquery-ui-1.12.0.js",
        "fly":"lib/jquery/jquery.fly.min.js",
        "art-template": "lib/artTemplate/template.js",
        "art-template-native": "lib/artTemplate/template-native.js",
        "plugin": 'module/plugin.js',
        "config": "module/dataconfig.js",
        "pluginp": '/html/Public/Home/personLession/js/plugin.js',
        "API": 'module/dataapi.js',
        "layer": "lib/layer/layer.js",
        "webuploader":"lib/webuploader-0.1.5/webuploader.nolog.js",
        "scrollBar": 'module/scrollBar.js',
        "perfect-scrollbar": 'lib/perfect-scrollbar/perfect-scrollbar-0.4.10.with-mousewheel.min.js',
        "perfect-scrollbar-css": 'lib/perfect-scrollbar/perfect-scrollbar-0.4.10.min.css?',
        "Popup": 'lib/imgPopup/jquery.magnific-popup.min.js',
        "date": 'lib/date/DatePicker.js',
        "tour":'lib/tour/bootstrap-tour-standalone.js',
        "superslide":'lib/superslide/superslide.2.1.js',
        "imgareaselect":'lib/imgareaselect/jquery.imgareaselect.min.js',
        "jform":'lib/jquery/jquery.form.js',
        "video":'lib/videojs/video.js',
        "autosize":'lib/autosize/autosize.js',
        "echarts":'lib/echarts/echarts.js',
        "echartsv4":'lib/echarts/echartsv4.min.js',
        "wordexport":'lib/wordExport/jquery.wordexport.js',
        "filesaver":'lib/wordExport/FileSaver.js',
        "qrcode":'lib/jquery/jquery.qrcode.min.js',
        "pagination":'lib/pagination/pagination.js',
        "wangEditor":'lib/wangEditor/js/wangEditor.js',
        "wangEditorv2":'/Public/Home/personLession/wangEditor-3.1.1/release/wangEditor.min.js',
        "intro":'lib/intro/intro.js',
        "vuejs":'lib/vue/vue.js',//开发版本vue
        "hz2py":'lib/jquery/jQuery.Hz2Py-min.js',
        "strophe":'lib/jquery/strophe.js',
        "barrager":'lib/danmu/barrager/js/jquery.barrager.js',
        "zeroclipboard":'lib/zeroclipboard-2.2.0/ZeroClipboard.min.js',
        "jqcloud":'lib/jqcloud/jqcloud.min.js',
        "recorder":'lib/recorderjs/recorder.js',
        "audiojs":'lib/audiojs/audio.min.js',
        "layui":"lib/layui/layui-v1.0.9_rls/layui/layui.js",
        "layuiV2":"lib/layui/layui-v2.0.0/layui/layui.all.js",
        "layuiV3":"lib/layui/layuiv3/layui.all.js",
        "mqtt":"lib/mqtt/mqttws31.js",
        "mockv3":"lib/mock/mock.js",
        'echartsv3':'lib/echartsv3/echarts.min.js',
        'mytree':'/html/Public/Home/personLession/mytree/mytree.js'
    },
    preload: 'jQuery',
    map:[
         [ /^(.*\/Public\/*\/.*\.(?:css|js))(?:.*)$/i, '$1?2019030801' ]
    ]
});
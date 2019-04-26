define(function(require, exports, module) {
	exports.appstate = "local";//productor,test,local
	exports.UPLOADERURL = "";
	if (exports.appstate == "local") {
		exports.UPLOADERURL = "";
	} else if (exports.appstate == "test") {
		exports.UPLOADERURL = "";
	} else if (exports.appstate == "productor") {
		exports.UPLOADERURL = "//localhost:8080";
	}
});
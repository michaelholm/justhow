var mt_log4js;
var mt_util_log = function (label, isEnabled) {

	var methods = [
		"debug", "info", "warn", "error", "assert",
		"dir", "dirxml", "group", "groupEnd", "time", "timeEnd",
		"count", "trace", "profile", "profileEnd"
	];
	
	var mylabel = label;

	if (mt_log4js == undefined) {
			this.log4js = mt_log4js = log4javascript.getLogger("main");
			//log4javascript.setEnabled(isEnabled);

			var browserAppender = new log4javascript.BrowserConsoleAppender();
			//var popupAppender = new log4javascript.PopUpAppender();
			var popUpLayout = new log4javascript.PatternLayout("%d{mm:ss,SSS} %-5p %m%n");
			browserAppender.setLayout(popUpLayout);
			//popupAppender.setLayout(popUpLayout);
			this.log4js.addAppender(browserAppender);
	} else {
		this.log4js = mt_log4js;
	}
	
	for (var i = 0; i < methods.length; i++) {
		var method = methods[i];
		this[method] = function () { };
	}
	
	for (var i = 0; i < methods.length; i++) {
		var method = methods[i];
		this[method] = $.proxy(this.log4js[method], this.log4js);
	}

	for (var i = 0; i < methods.length; i++) {
		var method = methods[i];
		var arg0 = arguments[0];
		var my = this;
		switch (method) {
			case "debug":
				this[method] = function () { if (!isEnabled) return; my.log4js.debug.apply(my.log4js, appendLabelToArgs(arguments)); };
				break;
			case "info":
				this[method] = function () { if (!isEnabled) return; my.log4js.info.apply(my.log4js, appendLabelToArgs(arguments)); };
				break;
			case "warn":
				this[method] = function () { if (!isEnabled) return; my.log4js.warn.apply(my.log4js, appendLabelToArgs(arguments)); };
				break;
			case "error":
				this[method] = function () { if (!isEnabled) return; my.log4js.error.apply(my.log4js, appendLabelToArgs(arguments)); };
				break;
			case "group":
				this[method] = function () { if (!isEnabled) return; my.log4js.group.apply(my.log4js, appendLabelToArgs(arguments)); };
				break;
			case "groupEnd":
				this[method] = function () { if (!isEnabled) return; my.log4js.groupEnd.apply(my.log4js, appendLabelToArgs(arguments)); };
				break;
			case "time":
				this[method] = function () { if (!isEnabled) return; my.log4js.time.apply(my.log4js, appendLabelToArgs(arguments)); };
				break;
			case "timeEnd":
				this[method] = function () { if (!isEnabled) return; my.log4js.timeEnd.apply(my.log4js, appendLabelToArgs(arguments)); };
				break;
			case "log":
				//this[method] = function () { my.log4js.error.apply(my.log4js, appendLabelToArgs(arguments)); };
				break;
			default:
				//alert("method:" + method + " arguments;" + arguments + " $:" + $);
				//this[method] = function () { my.log4js[method].apply(my.log4js, appendLabelToArgs(arguments)); };
				//$.proxy(this.log4js[method], 
				//try {
				//	this.log4js[method] = function (){ my.log4js.apply(this.log4js, arguments)};
				//} catch (e) { }
				break;
		}
	}
	
	function appendLabelToArgs(arg) {
		
		if (arg.length > 0) {
			var arg0 = arg[0];
			if ((typeof arg0 == "string") && arg0 != undefined && arg0 != null) {
				arg0 = "[" + mylabel + "]  " + arg0;
				arg[0] = arg0;
			}

		}

		return arg;
	}
};
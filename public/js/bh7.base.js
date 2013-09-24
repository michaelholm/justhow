var $base = window.$base = { 
	backbone:Backbone,
	util: {},
	classes: {}
};


// http://forrst.com/posts/Backbone_js_super_function-4co
$base.backbone.Model.prototype._super = function (method) {
	return this.constructor.__super__[method].apply(this, _.rest(arguments));
}
$base.backbone.View.prototype._super = function (method) {
	return this.constructor.__super__[method].apply(this, _.rest(arguments));
}
$base.backbone.Router.prototype._super = function (method) {
	return this.constructor.__super__[method].apply(this, _.rest(arguments));
}

//if (!ELC_Base) var ELC_Base = { model: {}, view: {} }
$base.classes.ControllerBase = $base.backbone.Model.extend({
	defaults: {
		logLabel: "label",
		isLogEnabled: false
	},
	log: null,
	//modelTest: function () { alert("model test"); },
	isEnabled: false,
	view: null,
	initialize: function () {
		with (this) {
			log = new mt_util_log(this.get("logLabel"), this.get("isLogEnabled"));
		}
	},
	toggle: function (val) {
		with (this) {
			log.info("toggle:" + val + " isEnabled:" + isEnabled);
			//turn off
			if (!val && isEnabled) {
				if (view) view.$el.hide();
			}

			// turn on
			else if (val && !isEnabled) {
				if (view) view.$el.show();
				//fetch();
			}
			isEnabled = val;
		}
	}
});

$base.classes.ViewBase = $base.backbone.View.extend({
	logLabel: "",
	isLogEnabled: false,
	log: null,
	initialize: function () {
		with (this) {
			log = new mt_util_log(logLabel, isLogEnabled);
		}
	}
});

$base.classes.RouterBase = $base.backbone.Router.extend({
	logLabel: "",
	isLogEnabled: false,

	log: null,
	initialize: function () {

		this.log = new mt_util_log(this.logLabel, this.isLogEnabled);
	}
});
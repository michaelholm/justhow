$base.classes.Util = $base.backbone.Model.extend({
	/**
	* Will pull out the value of a named param from the given url
	* @method getPoundParam
	* @param {String} name - name of param
	* @param {String} url - url with params
	* @return {Sting} value of the param
	*/
	getPoundParam: function (name, url) {
		if (url == null || url == undefined || url == '') {
			url = window.location.href;
		}
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = "[\\#&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(url);
		if (results == null)
			return null;
		else
			return results[1];
	},

	/**
	* Adds commas appropriatly to large numbers
	* @method addCommas
	* @param {String} string number 
	* @return {String} comma'd number
	*/
	addCommas: function (nStr) {
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	},
	/**
	* Tests a string if it is a valid url
	* @method isURL
	* @param {String} url
	* @return {Bool} 
	*/
	isURL: function (url) {
		url = unescape(url);
		var urlRegex = /(http|https):\/\/[A-Za-z0-9\.-]{3,}\.[A-Za-z]{3}/
		return urlRegex.test(url);
	},

	// object comparison
	equals: function (x, y) {
		if (x === y) return true;
		// if both x and y are null or undefined and exactly the same

		if (!(x instanceof Object) || !(y instanceof Object)) return false;
		// if they are not strictly equal, they both need to be Objects

		if (x.constructor !== y.constructor) return false;
		// they must have the exact same prototype chain, the closest we can do is
		// test there constructor.

		for (var p in x) {
			if (!x.hasOwnProperty(p)) continue;
			// other properties were tested using x.constructor === y.constructor

			if (!y.hasOwnProperty(p)) return false;
			// allows to compare x[ p ] and y[ p ] when set to undefined

			if (x[p] === y[p]) continue;
			// if they have the same strict value or identity then they are equal

			if (typeof (x[p]) !== "object") return false;
			// Numbers, Strings, Functions, Booleans must be strictly equal

			if (!Object.equals(x[p], y[p])) return false;
			// Objects and Arrays must be tested recursively
		}

		for (p in y) {
			if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
			// allows x[ p ] to be set to undefined
		}
		return true;
	},

	randomString: function (length) {
		var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
			out = "",
			len = chars.length;

		for (x = 0; x < length; x++) {
			i = Math.floor(Math.random() * len);
			out += chars.charAt(i);
		}
		return out;
	},
	objectHasAnyOfKeys: function (o, keyArr) {
		var out = false;
		if (o == undefined || o == null) {

		} else if (keyArr == undefined || keyArr.length == 0) {

		} else {
			for (var i = 0; i < keyArr.length; i++) {
				var key = keyArr[i];
				for (var oKey in o) {
					if (oKey == key) {
						out = true;
						break;
					}
				}
			}
		}
		return out;
	},
	objectIsDiff: function (a, b) {
		var diff = false;
		var item;
		for (item in a) {
			if (a[item] != b[item]) {
				diff = true;
				break;
			}
		}
		return diff;
	}
});



/*
*	Template Loader
*/

tpl = {
 
    // Hash of preloaded templates for the app
    templates: {},
 
    // Recursively pre-load all the templates for the app.
    loadTemplates: function(names, callback) {
 
        var that = this;
 
        var loadTemplate = function(index) {
            var name = names[index];
            console.log('Loading template: templates/' + name + ".html");
            $.get('templates/' + name + '.html', function(data) {
                that.templates[name] = data;
                index++;
                if (index < names.length) {
                    loadTemplate(index);
					console.log('Loaded template: ' + name);
                } else {
                    callback();
                }
				
            });

        }
 
        loadTemplate(0);
    },
 
    // Get template by name from hash of preloaded templates
    get: function(name) {
        return this.templates[name];
    }
 
};

/* 
* end template loader 
*/


/*
* Date Format 1.2.3
* (c) 2007-2009 Steven Levithan <stevenlevithan.com>
* MIT license
*
* Includes enhancements by Scott Trenda <scott.trenda.net>
* and Kris Kowal <cixar.com/~kris.kowal/>
*
* Accepts a date, a mask, or a date and a mask.
* Returns a formatted version of the given date.
* The date defaults to the current date/time.
* The mask defaults to dateFormat.masks.default.
*/
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (obj, start) {
		for (var i = (start || 0), j = this.length; i < j; i++) {
			if (this[i] === obj) { return i; }
		}
		return -1;
	}
}

var dateFormat = function () {
	var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var _ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d: d,
				dd: pad(d),
				ddd: dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m: m + 1,
				mm: pad(m + 1),
				mmm: dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy: String(y).slice(2),
				yyyy: y,
				h: H % 12 || 12,
				hh: pad(H % 12 || 12),
				H: H,
				HH: pad(H),
				M: M,
				MM: pad(M),
				s: s,
				ss: pad(s),
				l: pad(L, 3),
				L: pad(L > 99 ? Math.round(L / 10) : L),
				t: H < 12 ? "a" : "p",
				tt: H < 12 ? "am" : "pm",
				T: H < 12 ? "A" : "P",
				TT: H < 12 ? "AM" : "PM",
				Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
} ();

// Some common format strings
dateFormat.masks = {
	"default": "ddd mmm dd yyyy HH:MM:ss",
	shortDate: "m/d/yy",
	mediumDate: "mmm d, yyyy",
	longDate: "mmmm d, yyyy",
	fullDate: "dddd, mmmm d, yyyy",
	shortTime: "h:MM TT",
	mediumTime: "h:MM:ss TT",
	longTime: "h:MM:ss TT Z",
	isoDate: "yyyy-mm-dd",
	isoTime: "HH:MM:ss",
	isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

// END DATETIME PLUGIN

$.fn.serializeObject = function () {
	var o = {};
	var a = this.serializeArray();

	$.each(a, function () {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};
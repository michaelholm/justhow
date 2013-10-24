window.app = window.app || { };

app.Rating = Backbone.Model.extend({
	urlRoot:"/ratings",
	defaults: {
		className: "rating",
	},
	/**
	 * Sets a badge type based upon rating value
	 * @param  {Number} rating
	 */
	badgeType: function(rating) {
		badge = 'default';
		switch(true) {
			case ( rating < 3 ):
				badge = 'important';
				break;
			case ( rating < 5 ):
				badge = 'info';
				break;
			case ( rating < 8 ):
				badge = 'warning';
				break;
			default:
				badge = 'success';
		}
		//return badge;
	},

	/**
	 * [initialize description]
	 * @param  {[type]} options
	 * @return {[type]}
	 */
	initialize: function(options) {
		this.set({ badge: this.badgeType(this.rating) });
	}
	
});



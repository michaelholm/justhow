window.app = window.app || { };

app.RatingsList = Backbone.Collection.extend({

	//localStorage: new Backbone.LocalStorage("RatingsCollection"),

	url: '/ratings',
	/**
	 * [initialize description]
	 * @return {[type]}
	 */
	initialize:function () {
		this.fetch();
	},
	/**
	 * [comparator description]
	 * @param  {[type]} rating
	 * @return {[type]}
	 */
	comparator: function(rating) {
		return rating.get("x");
	},
	/**
	 * [iwhere description]
	 * @param  {[type]} key
	 * @param  {[type]} val
	 * @return {[type]}
	 */
	iwhere : function( key, val ){
    return this.filter( function( item ) {
        return item.get( key ).toLowerCase() === val.toLowerCase();
    });
	}


});
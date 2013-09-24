// setup the model
window.Rating = Backbone.Model.extend({
	urlRoot:"../api/ratings",
	initialize: function(options) {
		this.badgeType : badgeType(this.options.rating);
	},
		
	badgeType: function(rating) {
		var badgeType = 'default';
   		switch(true)
		{
			case ( rating < 3 ):
			  badgeType = 'important';
			  break;
			case ( rating < 5 ):
			  badgeType = 'info';
			  break;
			case ( rating < 8 ):
			  badgeType = 'warning';
			  break;
			default:
			  badgeType = 'success';
		}
		return badgeType;		
	}
		
});

// collection
var RatingsCollection = Backbone.Collection.extend({ 
	model: Rating,
	url:"../api/ratings",
	
	localStorage: new Backbone.LocalStorage("RatingsCollection")
});

var app = app || {};

// list of ratings
app.RatingsListView = Backbone.View.extend({
	// el: "ul.ratingsListing",
	tagName: "ul",
	className: "ratingsListing",
			
	initialize: function (models, options) {
		var self = this;
		options = options || {};
		
		_.bindAll(this, 'render');
		self.collection.on("change", self.render);
		

		self.collection = app.ratingsList;
		
		rateTitle = $('ul.ratingsListing li.nav-header');
		$('ul.ratingsListing').empty();
		$('ul.ratingsListing').append(rateTitle);
	
		self.render();

	},

	events: {
		//"click li" : "hoverBadge"
	},

	render: function(){
		var self = this;
		
		_.each(
			self.collection.models,
				function (item) {
					//self.renderItem(item);
				},
			this);
	},
	
	renderItem:function (rating) {
		var item = new app.RatingListItem(rating.toJSON());
		item.render().$el.prependTo(this.$el);
		return item;
	},

	hoverBadge: function(event) {
		console.log('hovering');
		var target = $(event.currentTarget);
		var notes = target.$el.find('.notes-overlay');
		notes.$el.fadeToggle('slow');
	}
	
});

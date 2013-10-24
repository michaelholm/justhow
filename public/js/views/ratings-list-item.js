var app = app || {};

// rating list item view
app.RatingListItem = Backbone.View.extend({
	tagName: "li",
	model: app.Rating,
	className: "rating",
			
	initialize: function (options) {
		self = this;
		self.model = new app.Rating();
		try {
			self.model.set('rating', options.rating);
			self.model.set('category', options.category);
			self.model.set('notes', options.notes);
			self.model.set('created', new Date() );
			self.model.set('badgeStyle',  this.badgeType(self.model.get('rating')) );
		} catch (err) {
			console.log("Oops. An issue was raised in the RatingListItem initialize method with the following error: " + error);
		}

		self.template = _.template(tpl.get('ratings-list-item'));

	},

	events: {
		"click" : "hoverBadge"
	},

	render: function ( event ) {
		var self = this;
		//self.$el.html(self.template(self));
		//console.log(self.model);
		//var tmplOptions = self.model.options;
		_.extend({}, self.model, self.options);
		$('.ratingsListing').append( '<li>' + self.template(self.model.toJSON()) + '</li>' );
		return this;
	},

	hoverBadge: function(event) {
		console.log('hovering');
		var target = $(event.currentTarget);
		var notes = target.$el.find('.notes-overlay');
		notes.$el.fadeToggle('slow');
	},
	
	badgeType: function(rating) {
		badge = 'default';
		switch(true)
		{
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
		return badge;
	},
	
});
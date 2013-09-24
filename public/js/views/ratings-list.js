window.RatingsListView = Backbone.View.extend({

	tagName: "ul",
			
	initialize: function (models,options) {
		//this.template = _.template(tpl.get('rating-list-item'));
		
		this.model.bind("reset", this.render, this);
		var self = this;
		
		this.collection = window.RatingsList;
		this._super("initialize");
		
		rateTitle = $('ul.ratingsListing li.nav-header');
		$('ul.ratingsListing').empty();
    	$('ul.ratingsListing').append(rateTitle);
	
		this.render();

	},
	
	render: function(eventName){ 
		_.each(this.collection.models, function (item) {
            //this.renderItem(item);
			$(this.el).append(new RatingsListItemView({model:rating}).render().el);
        }, this);

	},
	
	renderItem: function (rating) {
		var item = new RatingListItemView(rating);
		//render item, grab html, and append to this view's html
		item.render().$el.prependTo(this.$el);
	},
	
});

window.RatingListItemView = Backbone.View.extend({

    tagName: "li",

    className: "rating",
    model: rating,
		
    initialize: function (options) {
		this.template = _.template(tpl.get('ratings-list-item'));
		
		this.model.rating = this.options.rating;
		this.model.category = this.options.category;
		
		this.badgeType = 'important'; //badgeType(this.rating);
		
		
	    logLabel = "viewListItem";
		isLogEnabled = false;
		this._super( "initialize" );
		appLog.info( "added" );			
	
	},
	
    render: function () {
	    with( this ) {
			$(this.el).html(this.template(JSON.parse(this.attributes)));
	        return this;
		}
	},
});

window.RatingsChart = Backbone.View.extend({

	tagName: "div",
			//<div id="container1"></div>
	initialize: function (models,options) {
		
		this.template = _.template(tpl.get('ratings-list-item'), {});
		this.model.bind("reset", this.render, this);
		var self = this;
		
		// this.collection = RatingsList;
		// this._super("initialize");
		// 
		// rateTitle = $('ul.ratingsListing li.nav-header');
		// $('ul.ratingsListing').empty();
		//     	$('ul.ratingsListing').append(rateTitle);
	
		this.render();

	},
	
	render: function(){ 
		_.each(this.collection.models, function (item) {
            //this.renderItem(item);
			$(this.el).append(new RatingsChart({model:rating}).render().el);
        }, this);

	}
	
});

/*

basic_bars
basic_bubble
bars_stacked
basic

*/
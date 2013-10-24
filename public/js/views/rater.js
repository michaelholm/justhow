var app = app || {};

// rater view
app.Rater = Backbone.View.extend({
	el: '.hero-unit',
	initialize: function() {
		this.template = _.template(tpl.get('hero'));
	},
	events: {
		"click #rateBtn": "addRating",
		"click #clearRateListBtn": "clearRatingsList"
},

	render: function() {
		this.$el.html(this.template());
		$( "#slider" ).slider({
			range: "min",
			value: 5,
			min: 1,
			max: 10,
			step: 1,
			slide: function( event, ui ) {
				$( "#rating_value" ).html( ui.value );
			}
		});
		$( "#rating_value" ).html( $( "#slider" ).slider( "value" ) );

	},

addRating: function(e) {

		var newRatingObject = {
			'rating': $( "#slider" ).slider( "value" ),
			'category': $('select#categorySelect :selected').html(),
			'notes': $('#notes').val()
		};
		var rating = new app.Rating(newRatingObject);
		rating.save(newRatingObject, {
			success: function (model, response) {	console.log("success"); }
		});
		app.ratingsList.add(rating);
		$('#notes').val('');
		ratingView = new app.RatingListItem(rating);
		ratingView.render();
},

clearRatingsList:function(e) {
		var rateTitle = $('ul.ratingsListing li.nav-header');
		$('ul.ratingsListing').empty();
		$('ul.ratingsListing').append(rateTitle);
		Ratings.each( function(model) {
			//appLog.info('destroying '+ this.rating);
			model.destroy();
		});
  RatingsList.fetch();
}

});
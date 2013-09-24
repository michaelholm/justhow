$(function(){
  window.app = window.app || { };
	

	// Rating Model
	app.Rating = Backbone.Model.extend({
		urlRoot:"/ratings",
		defaults: {
			className: "rating",
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
		
		toFullJSON: function(){
			var json = this.toJSON();
		    return _.extend(json);
		},
		
		initialize: function(options) {
			this.set({ badge: this.badgeType(rateVal) });
		}
		
	});
	
	// Rating Model
	//app.Ratings = Backbone.Model.extend({ });

  // Ratings collection
	app.RatingsList = Backbone.Collection.extend({
	
		//localStorage: new Backbone.LocalStorage("RatingsCollection"),
		
		url: '/ratings',
		
		initialize:function () {
			//this.fetch();			
		},

			
	});
	

	
	//add routing
	app.RatingsRouter = Backbone.Router.extend({

		routes: {
			'' : 'home'
		},

    initialize: function () {

			app.rater = new app.Rater();
			app.rater.render();
	  	app.ratingsList = new app.RatingsList({ model: app.Rating });
			app.ratingsView = new app.RatingsListView({ collection: app.ratingsList });
    	app.ratingsList.fetch({ 
				success: function(){
					$.each(app.ratingsList.models, function(key, item) {
						item.set('y', item.get('rating'));
						item.set('x', item.get('created') || moment());
						item.save();
					});
					app.ratingsView.work = app.ratingsList.where({ category: 'Work'});
					app.ratingsView.general = app.ratingsList.where({ category: 'General'});
					app.ratingsView.love = app.ratingsList.where({ category: 'Love'});
					app.ratingsView.social = app.ratingsList.where({ category: 'Social'});
					app.ratingsView.health = app.ratingsList.where({ category: 'Health'});
					
					app.ratingsChart = new app.Chart({ category: 'work' });
					app.ratingsChart.render();
				} 
			});
			
    	app.ratingsList.bind('reset', function () { app.ratingsView.render(); });
			
    },
		
		home: function () {
			
		}

    // urlFilter: function (type) {
    //     Ratings.filterType = type;
    //     Ratings.trigger("change:filterType");
    // }
	});

	var templatesList = ['overlay', 'ratings-list-item', 'hero'];
	tpl.loadTemplates(templatesList, function() {
		//create router instance
		
		app.ratingsRouter = new app.RatingsRouter();
		//app.ratingsRouter.initialize();
		//start history service
		Backbone.history.start();

	});
 
});
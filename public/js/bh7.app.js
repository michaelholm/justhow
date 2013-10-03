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
			return badge;		
		},
		
		toFullJSON: function(){
			var json = this.toJSON();
		    return _.extend(json);
		},
		
		initialize: function(options) {
			this.set({ badge: this.badgeType(this.rating) });
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

		comparator: function(rating) {
			return rating.get("x");
		},

		iwhere : function( key, val ){
        return this.filter( function( item ){
            return item.get( key ).toLowerCase() === val.toLowerCase();
        });
     }

			
	});
	

	
	//add routing
	app.RatingsRouter = Backbone.Router.extend({

		routes: {
			'' : 'home'
		},

    initialize: function () {
    	var self = this;
			app.rater = new app.Rater();
			app.rater.render();
	  	app.ratingsList = new app.RatingsList({ model: app.Rating });
			app.ratingsView = new app.RatingsListView({ collection: app.ratingsList });
    	app.ratingsList.fetch({ 
				success: function (collection, response, options) {
					console.log('SUCCESS FETCHING DATA FROM SERVER');

					app.ratingsView.work = app.ratingsList.where({ category: 'Work'});
					app.ratingsView.general = app.ratingsList.where({ category: 'General'});
					app.ratingsView.love = app.ratingsList.iwhere( 'category', 'Love' );
					app.ratingsView.social = app.ratingsList.where({ category: 'Social'});
					app.ratingsView.health = app.ratingsList.iwhere( 'category', 'Health' );
					//_.sortBy(app.ratingsView.work, function(item) { return item.get('x'); }, this);

					var mappedWork = _.map(app.ratingsView.work, function(item) { 
								var passItem = {};
								passItem.x = parseInt(item.get('x'), 10);
								passItem.y = parseInt(item.get('y'), 10);
								passItem.category = item.get('category');

								return passItem; 
							});
					var workRatings = _.sortBy(mappedWork, function(item) { return item.x; }, this);

					var mappedGeneral = _.map(app.ratingsView.general, function(item) { 
							var passItem = {};
							passItem.x = parseInt(item.get('x'), 10);
							passItem.y = parseInt(item.get('y'), 10);
							passItem.category = item.get('category');

							return passItem; 
						});
					var generalRatings = _.sortBy(mappedGeneral, function(item) { return item.x; }, this);

					var mappedHealth = _.map(app.ratingsView.health, function(item) { 
								var passItem = {};
								passItem.x = parseInt(item.get('x'), 10);
								passItem.y = parseInt(item.get('y'), 10);
								var cat = item.get('category');
								passItem.category = cat.toLowerCase();

								return passItem; 
						});
					var healthRatings = _.sortBy(mappedHealth, function(item) { return item.x; }, this);
					//var loveRatings = 

					//var loveRatings = self.doMapping(app.ratingsView.love);
					// var socialRatings = self.doMapping(app.ratingsView.social);
					//var healthRatings = self.doMapping(app.ratingsView.health);

					//console.log(JSON.stringify(healthRatings));
					//console.log(JSON.stringify(loveRatings));

					app.ratingsChart = new app.Chart({ work: workRatings, general: generalRatings, health: healthRatings });
					app.ratingsChart.render();
				},

				error: function (collection, response, options) {
					console.log('ERROR FETCHING DATA FROM SERVER');
				},


			});
			
    	app.ratingsList.bind('reset', function () { app.ratingsView.render(); });
			
    },

		doMapping: function(col) {
			var tmp = _.map(col, function(item) { 
										var passItem = {};
										passItem.x = parseInt(item.get('x'), 10);
										passItem.y = parseInt(item.get('y'), 10);
										var cat = item.get('category');
										passItem.category = cat.toLowerCase();

										return passItem; 
								});
			console.log(col);
			var sortedTmp = _.sortBy(tmp, function(item) { 
				return item.x; 
			}, this);
			console.log(col);
			return tmp;
		},
		
		home: function () {
			
		}

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
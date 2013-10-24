$(function(){
  window.app = window.app || { };

	/*
	*	Template Loader
	*/

	tpl = {
	 
		// Hash of preloaded templates for the app
		templates: {},
    // Recursively pre-load all the templates for the app.
    loadTemplates: function(names, callback) {
	 
			var that = this;
	 
			var loadTemplate = function(index) {
				var name = names[index];
				console.log('Loading template: templates/' + name + ".html");
				$.get('templates/' + name + '.html', function(data) {
					that.templates[name] = data;
					index++;
					if (index < names.length) {
						loadTemplate(index);
						console.log('Loaded template: ' + name);
					} else {
						callback();
					}
				});
			};
			loadTemplate(0);
		},
	 
		// Get template by name from hash of preloaded templates
		get: function(name) {
			return this.templates[name];
		}
	 
	};

	/* 
	* end template loader 
	*/

	app.RatingsRouter = Backbone.Router.extend({

		routes: {
			'' : 'home'
		},

		/**
		 * [initialize description]
		 * @return {[type]}
		 */
    initialize: function () {
			var self = this;
			app.rater = new app.Rater();
			app.rater.render();
			app.ratingsList = new app.RatingsList({ model: app.Rating });
			app.ratingsView = new app.RatingsListView({ collection: app.ratingsList });
			app.ratingsList.fetch({
				/**
				* [success description]
				* @param  {[type]} collection
				* @param  {[type]} response
				* @param  {[type]} options
				* @return {[type]}
				*/
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
								var cat = item.get('category');
								passItem.category = cat.toLowerCase();

								return passItem;
							});
					var workRatings = _.sortBy(mappedWork, function(item) { return item.x; }, this);

					var mappedGeneral = _.map(app.ratingsView.general, function(item) {
							var passItem = {};
							passItem.x = parseInt(item.get('x'), 10);
							passItem.y = parseInt(item.get('y'), 10);
							var cat = item.get('category');
							passItem.category = cat.toLowerCase();

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

					app.ratingsChart = new app.Chart({
						work: workRatings,
						general: generalRatings,
						health: healthRatings
						//social: self.doMapping(app.ratingsView.social)
					});
					app.ratingsChart.render();

					$('body').append(JSON.stringify( workRatings ));
				},

				error: function (collection, response, options) {
					console.log('ERROR FETCHING DATA FROM SERVER');
				},


			});
			
			app.ratingsList.bind('reset', function () { app.ratingsView.render(); });
			
    },
    /**
     * [doMapping description]
     * @param  {[type]} col
     * @return {[type]}
     */
		doMapping: function(col) {
			var tmp = _.map(col, function(item) {
									var passItem = {};
									passItem.x = parseInt(item.get('x'), 10);
									passItem.y = parseInt(item.get('y'), 10);
									var cat = item.get('category');
									passItem.category = cat.toLowerCase();

									return passItem;
							});
			var sortedTmp = _.sortBy(tmp, function(item) { return item.x; }, this);
			
			return tmp;
		},
		/**
		 * [home description]
		 * @return {[type]}
		 */
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
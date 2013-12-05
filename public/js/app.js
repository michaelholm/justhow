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

					var mymap = function(data) {
						var md = _.map(data, function(item) {
							var passitem = {};
							var row = [];
							var obj = {};
							if (item.get('category').toLowerCase()=== 'work') {
								// obj.v = item.get('category').toLowerCase();
								row.push({ v: parseInt(item.get('x'), 10) });
								row.push({ v: parseInt(item.get('y'), 10) });
								row.push(null);
								// obj.v = parseInt(item.get('x'), 10);
								// row.push(obj);//1
								// obj.v = null;
								// row.push(obj);//2
								// obj.v = parseInt(item.get('y'), 10);
								// row.push(obj);//3
							} else {
								row.push({ v: parseInt(item.get('x'), 10) });
								row.push(null);
								row.push({ v: parseInt(item.get('y'), 10) });
								// obj.v = parseInt(item.get('x'), 10);
								// row.push(obj);//1
								// obj.v = parseInt(item.get('y'), 10);
								// row.push(obj);//2
								// obj.v = null;
								// row.push(obj);//3
							}

							//console.log('row', row);
							return { c: row };
						});
						//console.log('md', md);
						return md;
					};
					//console.log('health', app.ratingsView.health);
					var ratingsColl = mymap(app.ratingsView.work.concat(app.ratingsView.general));
					var json = JSON.stringify(ratingsColl).replace(/\"([^(\")"]+)\":/g,"$1:");
					//console.log('ratingsColl', json);

					console.log('ratingsColl', ratingsColl);

					self.ratings = ['Work', 'Health', 'Social', 'Love', 'General'];


					self.ratings['ratings'] = ratingsColl; //mymap(_.sortBy(ratingsColl, function(item) { return parseInt(item.get('x'), 10); }, this));
					//self.ratings['work'] = mappedWork;
					//self.ratings['general'] = generalRatings;
					//self.ratings['health'] = mappedHealth;
					//social: self.doMapping(app.ratingsView.social)
					app.ratingsChart = new app.Chart();
					app.ratingsChart.render();

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
									passItem.name = cat.toLowerCase();

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
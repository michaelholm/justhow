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

					console.log('UNmapped', JSON.stringify(app.ratingsView.work));
					var mymap = function(data) {
						var md = _.map(data, function(item) {
							console.log('ITEM', item);
								var passitem = {};
								var row = [];
								var obj = {};
								obj.v = parseInt(item.get('x'), 10);
								row.push(obj);
								obj = {};
								obj.v = parseInt(item.get('y'), 10);
								row.push(obj);
								obj = {};
								obj.v = item.get('category').toLowerCase();
								row.push(obj);
								return { c: row };
							});
						return md;
					};

					var mappedWork = mymap(_.sortBy(app.ratingsView.work, function(item) { return item.get('x'); }, this));
					var mappedHealth = mymap(app.ratingsView.health);
					// var mappedGeneral = _.map(app.ratingsView.general, function(item) {
					// 		var passItem = {};
					// 		passItem.x = parseInt(item.get('x'), 10);
					// 		passItem.y = parseInt(item.get('y'), 10);
					// 		var cat = item.get('category');
					// 		passItem.name = cat.toLowerCase();

					// 		return passItem;
					// 	});
					//var generalRatings = _.sortBy(mappedGeneral, function(item) { return item.x; }, this);

					// var mappedHealth = _.map(app.ratingsView.health, function(item) {
					// 			var passItem = {};
					// 			passItem.x = parseInt(item.get('x'), 10);
					// 			passItem.y = parseInt(item.get('y'), 10);
					// 			var cat = item.get('category');
					// 			passItem.name = cat.toLowerCase();

					// 			return passItem;
					// 	});
					//var healthRatings = _.sortBy(mappedHealth, function(item) { return item.x; }, this);
					//var loveRatings =

					//var loveRatings = self.doMapping(app.ratingsView.love);
					// var socialRatings = self.doMapping(app.ratingsView.social);
					//var healthRatings = self.doMapping(app.ratingsView.health);
					self.ratings = [];
					self.ratings['work'] = mappedWork;
					//self.ratings['general'] = generalRatings;
					self.ratings['health'] = mappedHealth;
					//social: self.doMapping(app.ratingsView.social)
					app.ratingsChart = new app.Chart();
					app.ratingsChart.render();
					//google.setOnLoadCallback(app.ratingsChart.render);
					//
					//google.load('visualization', '1', {packages:['gauge']});
						//google.setOnLoadCallback(drawChart);
					//function drawChart() {
						var data = google.visualization.arrayToDataTable([
							['Label', 'Value'],
							['Work', 7.8],
							['Social', 6.5],
							['Health', 6.8]
						]);

						var guageChartOptions = {
							width: 400, height: 120,
							redFrom: 0, redTo: 1.5,
							yellowFrom:1.5, yellowTo: 3,
							greenFrom:7.5, greenTo: 10,
							minorTicks: 5,
							min:0,
							max:10
						};

						var chart = new google.visualization.Gauge(document.getElementById('guage-container'));
						chart.draw(data, guageChartOptions);
					//}

					//$('body').append(JSON.stringify( app.ratingsChart.options.ratings ) + ' <p>&nbsp;</p>');
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
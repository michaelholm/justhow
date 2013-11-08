var app = app || {};

app.Chart = Backbone.View.extend({
	el: '#chart-container',
	initialize: function(options) {
		var self = this;
		//self.data = options.ratings;
		console.log('initializing chart');
	},

	events: {},

	render: function() {
		var self = this;
    console.log('rendering chart');

    var workdata = app.ratingsRouter.ratings['work'];

    var dt = new google.visualization.DataTable(
     {
       cols: [
          {id: 'name', label: 'Rating', type: 'string'},
          {id: 'x', label: 'Day', type: 'number'},
          {id: 'y', label: 'Rating', type: 'number'}
        ],
       rows: workdata
     },
      0.6);

    console.log('CHART DATA ', dt);
    // Create and draw the visualization.
    new google.visualization.LineChart(document.getElementById('chart-container')).draw( dt, {
        curveType: "function",
        width: 900,
        height: 400,
        vAxis: {
          maxValue: 10,
          gridlines: {
            color: '#333',
            count: 4
          }
        }
      }
    );
	}
});

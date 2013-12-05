var app = app || {};

app.Chart = Backbone.View.extend({
	el: '#chart-container',
	initialize: function(options) {
		var self = this;
	},

	events: {},

	render: function() {
		var self = this;
    console.log('rendering chart');
    var dataTable;

    var workdata = app.ratingsRouter.ratings['ratings']; //.concat(app.ratingsRouter.ratings['health']);
    console.log('work data', workdata);
    console.log('--->', {
          cols: [
            {id: 'x', label: 'Day', type: 'number'},
            {id: 'y', label: 'Work', type: 'number'},
            {id:'yy', label: 'Health', type: 'number'}
          ],
          rows: workdata
        });
    try {
      dataTable = new google.visualization.DataTable(
        {
          cols: [
            {id: 'x', label: 'Day', type: 'number'},
            {id: 'y', label: 'Work', type: 'number'},
            {id:'yy', label: 'Health', type: 'number'}
          ],
          rows: workdata
        },
        0.6
      );
    } catch (e) {
      console.log('ERROR CONFIGURING CHART DATA --->');
      console.log(e);
    }

    try {
      // Create and draw the visualization.
      var options = {
        title: 'Ratings',
        hAxis: { title: 'Day of Month'},
        vAxis: { title: 'Rating' },
        // legend: 'none',
        // trendlines: {
        //   0: {
        //     labelInLegend: 'Work',
        //     type: 'exponential',
        //     visibleInLegend: false,
        //   },
        //   1: {
        //     labelInLegend: 'Health',
        //     type: 'exponential',
        //     visibleInLegend: false,
        //   },
        // },
        width: 920,
        height: 400,
      };

      var chart = new google.visualization.ScatterChart(document.getElementById('chart-container'));
      chart.draw(dataTable, options);

    } catch(err) {
      console.log('ERROR RENDERING CHART --->');
      console.log(err);
    }

	}


});



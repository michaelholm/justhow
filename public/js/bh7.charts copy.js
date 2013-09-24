
var data = {
	labels : ["8/01","8/02","8/03","8/04","8/05","8/06","8/07","8/08","8/09","8/10","8/11","8/12","8/13","8/14","8/15","8/16","8/17","8/18","8/19","8/20","8/21","8/22","8/23","8/24","8/25","8/26","8/27","8/28","8/29","8/30"],
	datasets : [
		{
			fillColor : "rgba(220,220,220,0.5)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			data : [7,8,7,7,6,6,5,7,7,8,9,6,5,7,7,8,7,7,8,7,8,8,7,6,8,5,8,6,7,8]
		},
		{
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(151,187,205,1)",
			pointColor : "rgba(151,187,205,1)",
			pointStrokeColor : "#fff",
			data : [6,6,7,7,7,7,7,7,7,7,7,7,7,5,5,7,7,5,5,6,6,6,6,6,6,7,7,7,7,6]
		},
		{
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(181,227,205,1)",
			pointColor : "rgba(181,227,205,1)",
			pointStrokeColor : "#fff",
			data : [5,5,4,4,3,4,5,5,5,6,6,6,6,5,5,7,7,5,5,5,5,5,7,6,6,5,6,6,7,6]
		},
		{
			fillColor : "rgba(173,105,181,0.5)",
			strokeColor : "rgba(135,105,181,1)",
			pointColor : "rgba(135,105,181,1)",
			pointStrokeColor : "#fff",
			data : [8,7,6,8,5,8,6,7,8,8,7,8,7,7,8,7,7,5,6,9,8,7,7,5,6,6,7,7,8,7]
		},
		{
			fillColor : "rgba(105,150,181,0.5)",
			strokeColor : "rgba(77,125,157,1)",
			pointColor : "rgba(77,125,157,1)",
			pointStrokeColor : "#fff",
			data : [7,5,6,8,4,5,6,7,8,8,7,8,7,6,5,4,3,3,3,4,4,6,6,7,8,9,9,8,8,7]
		}
	]
}

var options = {};

// Get context with jQuery
var ctx = $("#lineChart").get(0).getContext("2d");

//This will get the first returned node in the jQuery collection.
var myLineChart = new Chart(ctx);
	
//new Chart(ctx).Line(data,options);


var donutData = [
	{
		value: 30,
		color:"rgba(220,220,220,0.5)"
	},
	{
		value : 50,
		color : "rgba(151,187,205,0.5)"
	},
	{
		value : 100,
		color : "rgba(151,187,205,0.5)"
	},
	{
		value : 40,
		color : "rgba(173,105,181,0.5)"
	},
	{
		value : 120,
		color : "rgba(105,150,181,0.5)"
	}

]

/* Donut chart */
//var donutCtx = $("#donutChart").get(0).getContext("2d");
//This will get the first returned node in the jQuery collection.
//var myDonutChart = new Chart(donutCtx);
//new Chart(donutCtx).Doughnut(donutData,options);

/*  ----- */

$(document).ready(function() {
	$('#container').highcharts({
  	chart: {
    	   type: 'line'
	   },
	   title: {
	       text: 'August 2013'
	   },
	   subtitle: {
	       text: ''
	   },
	followPointer: false,
		xAxis: {
			categories: ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],
			tickmarkPlacement: 'on',
			title: {
			    enabled: false
			}
		},
     yAxis: {
         title: {
             text: 'Scale 1 - 10'
         },
				categories: ["1","2","3","4","5","6","7","8","9","10"],
         labels: {
             formatter: function() {
                 return this.value;
             }
         }
     },
     tooltip: {
         shared: true,
         headerFormat: '<span style="font-size: 10px">AUGUST {point.key}</span><br/>'
     },
     plotOptions: {
         area: {
             stacking: 'normal',
             lineColor: '#666666',
             lineWidth: 1,
             marker: {
                 lineWidth: 1,
                 lineColor: '#666666'
             }
         }
     },
     series: [{
         name: 'Work',
         data: [7,8,7,7,6,6,5,7,7,8,9,6,5,7,7,8,7,7,8,7,8,8,7,6,8,5,8,6,7,8]
     }, {
         name: 'Health',
         data: [6,6,7,7,7,7,7,7,7,7,7,7,7,5,5,7,7,5,5,6,6,6,6,6,6,7,7,7,7,6]
     }, {
         name: 'Love',
         data: [5,5,4,4,3,4,5,5,5,6,6,6,6,5,5,7,7,5,5,5,5,5,7,6,6,5,6,6,7,6]
     }, {
         name: 'Social',
         data: [8,7,6,8,5,8,6,7,8,8,7,8,7,7,8,7,7,5,6,9,8,7,7,5,6,6,7,7,8,7]
     }, {
         name: 'General',
         data: [7,5,6,8,4,5,6,7,8,8,7,8,7,6,5,4,3,3,3,4,4,6,6,7,8,9,9,8,8,7]
     }]
 });
	var chart = $('#container').highcharts();
	console.log('Chart Series Length' + chart.series.length);
});
    

/*




---




*/

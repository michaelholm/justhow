
	//$('#container').highcharts({
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
    

/*




---




*/

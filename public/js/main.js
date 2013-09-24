
// unbind view objects when closing them
Backbone.View.prototype.close = function () {
    console.log('Closing view ' + this);
    if (this.beforeClose) {
        this.beforeClose();
    }
    this.remove();
    this.unbind();
};



$(document).ready(function() {

	$('.dropdown-toggle').dropdown();

	// slider / rater
	$(function() {
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
    });
    
    // charts
	//     (function basic_bars(container, horizontal) {
	// 
	//   var
	//     horizontal = (horizontal ? true : false), // Show horizontal bars
	//     d1 = [],                                  // First data series
	//     d2 = [],                                  // Second data series
	//     point,                                    // Data point variable declaration
	//     i;
	// 
	//   for (i = 0; i < 4; i++) {
	// 
	//     if (horizontal) { 
	//       point = [Math.ceil(Math.random()*10), i];
	//     } else {
	//       point = [i, Math.ceil(Math.random()*10)];
	//     }
	// 
	//     d1.push(point);
	//         
	//     if (horizontal) { 
	//       point = [Math.ceil(Math.random()*10), i+0.5];
	//     } else {
	//       point = [i+0.5, Math.ceil(Math.random()*10)];
	//     }
	// 
	//     d2.push(point);
	// };
  
  
              
	// Draw the graph
	// Flotr.draw(
	// 	  		container,
	// 	  		[d1, d2],
	// 			{
	// 		      bars : {
	// 		        show : true,
	// 		        horizontal : horizontal,
	// 		        shadowSize : 0,
	// 		        barWidth : 0.5
	// 		      },
	// 		      mouse : {
	// 		        track : true,
	// 		        relative : true
	// 		      },
	// 		      yaxis : {
	// 		        min : 0,
	// 		        autoscaleMargin : 1
	// 		      }
	// 			}
	// 		);
	// 	})(document.getElementById("container1")); 
	
	// container 2
	// (function basic_bars(container, horizontal) {
	// 	
	// 	  var
	// 	    horizontal = (horizontal ? true : false), // Show horizontal bars
	// 	    d1 = [],                                  // First data series
	// 	    d2 = [],                                  // Second data series
	// 	    point,                                    // Data point variable declaration
	// 	    i;
	// 	
	// 	  for (i = 0; i < 10; i++) {
	// 	
	// 	    if (horizontal) { 
	// 	      point = [Math.ceil(Math.random()*10), i];
	// 	    } else {
	// 	      point = [i, Math.ceil(Math.random()*10)];
	// 	    }
	// 	
	// 	    d1.push(point);
	// 	        
	// 	    if (horizontal) { 
	// 	      point = [Math.ceil(Math.random()*10), i+0.5];
	// 	    } else {
	// 	      point = [i+0.5, Math.ceil(Math.random()*10)];
	// 	    }
	// 	
	// 	    d2.push(point);
	// 	  };
	// 	              
	// 	  // Draw the graph
	// 	  Flotr.draw(
	// 	    container,
	// 	    [d1, d2],
	// 	    {
	// 	      bars : {
	// 	        show : true,
	// 	        horizontal : horizontal,
	// 	        shadowSize : 0,
	// 	        barWidth : 0.5
	// 	      },
	// 	      mouse : {
	// 	        track : true,
	// 	        relative : true
	// 	      },
	// 	      yaxis : {
	// 	        min : 0,
	// 	        autoscaleMargin : 1
	// 	      }
	// 	    }
	// 	  );
	// 	})(document.getElementById("container2"),true);  
	// 
	// 	(function basic_bubble(container) {
	// 	
	// 	  var
	// 	    d1 = [],
	// 	    d2 = [],
	// 	    point, graph, i;
	// 	      
	// 	  for (i = 0; i < 10; i++ ){
	// 	    point = [i, Math.ceil(Math.random()*10), Math.ceil(Math.random()*10)];
	// 	    d1.push(point);
	// 	    
	// 	    point = [i, Math.ceil(Math.random()*10), Math.ceil(Math.random()*10)];
	// 	    d2.push(point);
	// 	  }
	// 	  
	// 	  // Draw the graph
	// 	  graph = Flotr.draw(container, [d1, d2], {
	// 	    bubbles : { show : true, baseRadius : 5 },
	// 	    xaxis   : { min : -4, max : 14 },
	// 	    yaxis   : { min : -4, max : 14 }
	// 	  });
	// 	})(document.getElementById("container3"));
	// 
	// 	// container4
	// 	(function bars_stacked(container, horizontal) {
	// 	
	// 	  var
	// 	    d1 = [],
	// 	    d2 = [],
	// 	    d3 = [],
	// 	    graph, i;
	// 	
	// 	  for (i = -10; i < 10; i++) {
	// 	    if (horizontal) {
	// 	      d1.push([Math.random(), i]);
	// 	      d2.push([Math.random(), i]);
	// 	      d3.push([Math.random(), i]);
	// 	    } else {
	// 	      d1.push([i, Math.random()]);
	// 	      d2.push([i, Math.random()]);
	// 	      d3.push([i, Math.random()]);
	// 	    }
	// 	  }
	// 	
	// 	  graph = Flotr.draw(container,[
	// 	    { data : d1, label : 'Low' },
	// 	    { data : d2, label : 'Mid' },
	// 	    { data : d3, label : 'High' }
	// 	  ], {
	// 	    legend : {
	// 	      backgroundColor : '#D2E8FF' // Light blue 
	// 	    },
	// 	    bars : {
	// 	      show : true,
	// 	      stacked : true,
	// 	      horizontal : horizontal,
	// 	      barWidth : 0.6,
	// 	      lineWidth : 1,
	// 	      shadowSize : 0
	// 	    },
	// 	    grid : {
	// 	      verticalLines : horizontal,
	// 	      horizontalLines : !horizontal
	// 	    }
	// 	  });
	// 	})(document.getElementById("container4"));
	//        
	// 	// container5
	// 	(function basic(container) {
	// 	
	// 	  var
	// 	    d1 = [[0, 3], [4, 8], [8, 5], [9, 13]], // First data series
	// 	    d2 = [],                                // Second data series
	// 	    i, graph;
	// 	
	// 	  // Generate first data set
	// 	  for (i = 0; i < 14; i += 0.5) {
	// 	    d2.push([i, Math.sin(i)]);
	// 	  }
	// 	
	// 	  // Draw Graph
	// 	  graph = Flotr.draw(container, [ d1, d2 ], {
	// 	    xaxis: {
	// 	      minorTickFreq: 4
	// 	    }, 
	// 	    grid: {
	// 	      minorVerticalLines: true
	// 	    }
	// 	  });
	// 	})(document.getElementById("container5"));
	// 
	// 	// container6
	// 	(function bars_stacked(container, horizontal) {
	// 	
	// 	  var
	// 	    d1 = [],
	// 	    d2 = [],
	// 	    d3 = [],
	// 	    graph, i;
	// 	
	// 	  for (i = -10; i < 10; i++) {
	// 	    if (horizontal) {
	// 	      d1.push([Math.random(), i]);
	// 	      d2.push([Math.random(), i]);
	// 	      d3.push([Math.random(), i]);
	// 	    } else {
	// 	      d1.push([i, Math.random()]);
	// 	      d2.push([i, Math.random()]);
	// 	      d3.push([i, Math.random()]);
	// 	    }
	// 	  }
	// 	
	// 	  graph = Flotr.draw(container,[
	// 	    { data : d1, label : 'Serie 1' },
	// 	    { data : d2, label : 'Serie 2' },
	// 	    { data : d3, label : 'Serie 3' }
	// 	  ], {
	// 	    legend : {
	// 	      backgroundColor : '#D2E8FF' // Light blue 
	// 	    },
	// 	    bars : {
	// 	      show : true,
	// 	      stacked : true,
	// 	      horizontal : horizontal,
	// 	      barWidth : 0.6,
	// 	      lineWidth : 1,
	// 	      shadowSize : 0
	// 	    },
	// 	    grid : {
	// 	      verticalLines : horizontal,
	// 	      horizontalLines : !horizontal
	// 	    }
	// 	  });
	// 	})(document.getElementById("container6"),true);
    
    
    
});

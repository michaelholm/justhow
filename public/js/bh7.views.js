$(function(){
    window.app = window.app || { };
    
        
    // list of ratings
	app.RatingsListView = Backbone.View.extend({
		// el: "ul.ratingsListing",
		tagName: "ul",
		className: "ratingsListing",
				
		initialize: function (models, options) {
			var self = this;
			var options = options || {}
			
			_.bindAll(this, 'render');
	    self.collection.on("change", self.render);
			

			
			self.collection = app.ratingsList;
			self._super("initialize");
			
			rateTitle = $('ul.ratingsListing li.nav-header');
			$('ul.ratingsListing').empty();
	    $('ul.ratingsListing').append(rateTitle);
		
			self.render();

		},

		events: {
	   	//"click li" : "hoverBadge"
	  },

		render: function(){
			var self = this;
			
			_.each(
					self.collection.models, 
					function (item) {
	    				//self.renderItem(item);
		   		}, 
		   		this
		   	);

		},
		
		renderItem:function (rating) {
			var item = new app.RatingListItem(rating.toJSON());
			item.render().$el.prependTo(this.$el);
			return item;
		},

		hoverBadge: function(event) {
			console.log('hovering');
			var target = $(event.currentTarget);
			var notes = target.$el.find('.notes-overlay');
			notes.$el.fadeToggle('slow');
		}
		
	});
	    
	// rating view
	app.RatingListItem = Backbone.View.extend({
		tagName: "li",
		model: app.Rating,
		className: "rating",
				
		initialize: function (options) {
			self = this;
			self.model = new app.Rating();
			try {
				self.model.set('rating', options.rating);
				self.model.set('category', options.category);
				self.model.set('notes', options.notes);
				self.model.set('created', new Date() );
				self.model.set('badgeStyle',  this.badgeType(self.model.get('rating')) );
			} catch (err) {
				console.log("Oops. An issue was raised in the RatingListItem initialize method with the following error: " + error);
			}

			self.template = _.template(tpl.get('ratings-list-item'));

		},

		events: {
	   	"click" : "hoverBadge"
	  },
	
	  render: function ( event ) {
	  	var self = this;
			//self.$el.html(self.template(self));
			//console.log(self.model);
			//var tmplOptions = self.model.options;
			_.extend({}, self.model, self.options);
			$('.ratingsListing').append( '<li>' + self.template(self.model.toJSON()) + '</li>' );
	    return this;
		},

		hoverBadge: function(event) {
			console.log('hovering');
			var target = $(event.currentTarget);
			var notes = target.$el.find('.notes-overlay');
			notes.$el.fadeToggle('slow');
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
		
	});
	
	// rater view
	app.Rater = Backbone.View.extend({
		el: '.hero-unit',
		initialize: function() { 
			this.template = _.template(tpl.get('hero'));
		},
		events: {
	      "click #rateBtn": "addRating",
        "click #clearRateListBtn": "clearRatingsList"
    },

		render: function() {
			this.$el.html(this.template());
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
 
		},
    
    addRating: function(e) {
  
			var newRatingObject = {
				'rating': $( "#slider" ).slider( "value" ),
 				'category': $('select#categorySelect :selected').html(),
				'notes': $('#notes').val()
			}
    	var rating = new app.Rating(newRatingObject);
    	rating.save(newRatingObject, { success: function (model, response) {	console.log("success") } });
    	app.ratingsList.add(rating);
			$('#notes').val('');
			ratingView = new app.RatingListItem(rating);
			ratingView.render();
    },
    
    clearRatingsList:function(e) {
    	var rateTitle = $('ul.ratingsListing li.nav-header');
    	$('ul.ratingsListing').empty();
    	$('ul.ratingsListing').append(rateTitle);
       Ratings.each( function(model) {
       	//appLog.info('destroying '+ this.rating);
       	model.destroy(); 
       } );
       RatingsList.fetch();
    }
	
	});
	
	app.Chart = Backbone.View.extend({
		el: '#chart-container',
		initialize: function(options) {
			console.log('initializing chart');
		},
		events: {},

		render: function() {
			var self = this;
			console.log('rendering chart');

			var work = JSON.stringify(app.ratingsView.work);
			var health = JSON.stringify(app.ratingsView.health);
			var love = JSON.stringify(app.ratingsView.love)
			var social = JSON.stringify(app.ratingsView.social)
			var general = JSON.stringify(app.ratingsView.general);


			$('#chart-container').highcharts({
		  	chart: { type: 'line' },
			  title: { text: 'August 2013' },
				followPointer: false,
				turboThreshold: 0,
				xAxis: {
					categories: ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],
					tickmarkPlacement: 'on',
					title: { enabled: false }
				},
		    yAxis: {
		    	title: { text: 'Scale 1 - 10' },
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
	     	data: work
		  }
		 //  , 
			// {
		 //  	name: 'Health',
	  //    	data: health
		 // 	}, 
		 // 	{
   //     	name: 'Love',
   //   		data: love
		 // 	}, {
	  //  		name: 'Social',
	  // 		data: social
			// }, 
			// {
		 //  	name: 'General',
	  //  		data: general
		 // 	}
		 	]
		 });
		}
	});
	    
});






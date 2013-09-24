window.RatingsChart = Backbone.Model.extend({
	
	this.template = _.template(tpl.get('ratings-chart'), {});
	
	urlRoot:"../api/ratings-chart",
	
	defaults : {
		id:null,
		d1:[],
		d2:[],
		d3:[]
		chartType: "basic"
	},
	
	render:function (eventName) {
	        $(this.el).html(this.template(JSON.parse(this.attributes)));
	        return this;
	}
	
	
		
});
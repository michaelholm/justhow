
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
        
});


/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var justy = require('./routes/justy');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


/*
**	GET
*			/ratings
*			/ratings/[lastNumDays]
*			/ratings/[category]
*			/ratings/[category]/[lastNumDays]
*
**	PUT
*			/rating/[user_id]/[rating]/[category]
*			/rating/[user_id]/[rating]/[category]/[notes]
*/
/*app.get('/', routes.index);*/
app.get('/ratings', justy.findAll);
//app.get('/ratings/:id', justy.findRating);
app.get('/ratings/categories/:category', justy.findByRatingCategory);
app.get('/ratings/chart/:category', justy.getChartData);
app.post('/ratings', justy.addRating);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

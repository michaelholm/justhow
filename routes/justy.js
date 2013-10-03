var mongo = require('mongodb');
var _ = require('underscore');
var moment = require('moment');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('justhowhappy', server);


db.open(function(err, db) {
    if (!err) {
        // console.log("Connected to 'justhowhappy' database");
    }
});

exports.addRating = function(req, res) {
  db.collection('justhowhappy', function(err, collection) {
		var obj = {};
		obj.created = moment().format('MMMM Do YYYY, h:mm:ss a');
        obj.x = req.body.x || moment().format('D');
        obj.y = req.body.rating;
		var newObj = _.extend(obj, req.body);

	  collection.insert(newObj);
	 	res.send('added a ' + obj.rating + ' rating for ' + obj.category + ' category\n\n');
		
	});
}

exports.findByRatingCategory = function(req, res) {
    var category = req.params.category;
    db.collection('justhowhappy', function(err, collection) {
        collection.findOne({ category: category  }, function(err, items) {
            if (err) {
                res.send({'error':'Oops! An error has occurred'});
            } else {
                res.send(items);
            }
        });
    });
};

exports.findAll = function(req, res) {
  db.collection('justhowhappy', function(err, collection) {
  	collection.find().toArray(function(err, items) {
    	res.send(items);
    });
	});
};



/*

curl -i -X POST -H 'Content-Type: application/json' -d '{"rating": 6, "category": "Stress", "badge": "warning" }' http://localhost:3000/ratings

curl -i -X POST -H 'Content-Type: application/json' -d '{"rating": 8, "category": "Work", "badge": "success", "x": "September 26th 2013, 6:44:43 pm", "y": 8 }' http://localhost:3000/ratings

*/
var mongo = require('mongodb');

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
		obj.created = Date();
		obj.rating = req.body.rating || null;
		obj.category = req.body.category || null;
		obj.notes = req.body.notes || null;
	  collection.insert(obj);
	 	res.send('added a ' + obj.rating + ' rating for ' + obj.category + ' category');
		
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


*/
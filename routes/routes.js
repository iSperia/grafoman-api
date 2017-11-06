var mongo = require("../mongo.js");

var appRouter = function(app) {

	app.get("/", function(req, res) {
	    mongo.db.collection("users").findOne({}, function(err, result) {
	    	if (err) throw err;
	    	console.log(result.nickname);
	    	res.send("Hello, " + result.nickname);
	    });
	});

	
}

module.exports = appRouter;
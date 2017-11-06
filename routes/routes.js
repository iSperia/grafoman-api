var mongo = require("../mongo.js");

var appRouter = function(app) {

	app.get("/", function(httpRequest, httpResponse) {
	    mongo.db.collection("users").findOne({}, function(mongoError, mongoResult) {
	    	if (mongoError) throw mongoError;
	    	console.log(mongoResult.nickname);
	    	httpResponse.send("Hello, " + result.nickname);
	    });
	});

	
}

module.exports = appRouter;
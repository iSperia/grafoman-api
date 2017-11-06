var User = require('./model/User.js');
var mongo = require('./mongo.js');

module.exports = function(req, res, next) {
	var authToken = req.get("Auth");
	if (authToken == null) {
		res.set(403).send("Authorization is required");
		return;
	}
	mongo.db.collection("users").findOne({nickname:authToken}, function(err, mongoRes) {
		if (err) {
			res.set(500).send("Database error");
			return;
		} else if (!mongoRes) {
			res.set(403).send("Authorization failed");
			return;
		}
		req.user = new User(mongoRes);
		next();
	});
};
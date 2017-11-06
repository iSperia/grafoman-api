var mongo = require("../mongo.js");

var express = require('express');
var router = express.Router();

router.get("/", function(req, response) {
	var responseObject = {};
	responseObject.users = [];
	mongo.db.collection("users").find({}).toArray(function(err, res) {
		if (err) throw err;
		console.log(res);
		for (var i in res) {
			responseObject.users.push({
			 	nickname: res[i].nickname,
			 	id: res[i]._id
			});
		}
		response.send(JSON.stringify(responseObject));
	});
});

module.exports = router;
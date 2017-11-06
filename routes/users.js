var mongo = require("../mongo.js");
var User = require("../model/User.js");

var express = require('express');
var router = express.Router();

router.get("/", function(httpRequest, httpResponse) {
	var responseObject = {};
	responseObject.users = [];
	mongo.db.collection("users").find({}).toArray(function(mongoFindError, mongoFindResponse) {
		if (mongoFindError) {
			httpResponse.set(500).send("Database error");
			return;
		}
		console.log(mongoFindResponse);
		for (var i in mongoFindResponse) {
			responseObject.users.push({
			 	nickname: mongoFindResponse[i].nickname,
			 	id: mongoFindResponse[i]._id
			});
		}
		httpResponse.send(JSON.stringify(responseObject));
	});
});

router.post("/", function(httpRequest, httpResponse) {
	var body = httpRequest.body;
	var nickname = body.nickname;
	console.log("Inserting <%s>", nickname);
	if (nickname == null) {
		httpResponse.set(500).send(JSON.stringify({error:"Empty nickname"}));
		return;
	}
	mongo.db.collection("users").find({nickname:nickname}).toArray(function(mongoFindError, mongoFindResponse) {
		if (mongoFindError) {
			httpResponse.set(500).send("Database error");
			return;
		}
		if (mongoFindResponse.length == 0) {
			var document = {
				nickname: body.nickname
			};
			mongo.db.collection("users").insertOne(document, function(mongoInsertError, mongoInsertResponse) {
				console.log("Record added as " + mongoInsertResponse.ops[0]);
				httpResponse.send(JSON.stringify(new User(mongoInsertResponse.ops[0]).asJson()));	
			});
		} else {
			httpResponse.set(500).send(JSON.stringify({error:"Already exists"}));
		}
	});
});

module.exports = router;
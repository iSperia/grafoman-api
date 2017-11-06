var auth = require('../auth.js');
var mongo = require('../mongo.js');
var express = require('express');
var Story = require('../model/Story.js');
var router = express.Router();

router.use(auth);

router.get("/", function(httpRequest, httpResponse) {
	var count = parseInt(httpRequest.get("X-Count"), 10);
	var page = parseInt(httpRequest.get("X-Page"), 10);
	if (count == null || page == null) {
		httpResponse.set(500).send("Did not specify X-Count or X-Page");
		return;
	}

	mongo.db.collection("stories")
		.find({})
		.skip(page * count)
		.limit(count)
		.toArray(function(mongoFindError, mongoFindResult) {
			if (mongoFindError) {
				httpResponse.set(500).send("Database error");
				return;
			}
			var resultObject = {stories:[]};
			for (var i in mongoFindResult) {
				var story = new Story(mongoFindResult[i]);
				resultObject.stories.push(story.asJson());
			}
			httpResponse.send(JSON.stringify(resultObject));
		});
});

router.post("/", function(httpRequest, httpResponse) {
	var body = httpRequest.body;
	if (!body.title) {
		httpResponse.set(500).send("Empty title");
		return;
	}
	var doc = {
		author:{
			_id:httpRequest.user._id,
			nickname:httpRequest.user.nickname
		},
		title:body.title
	};
	mongo.db.collection("stories").insertOne(doc, function(mongoInsertError, mongoInsertResult) {
		if (mongoInsertError) {
			httpResponse.set(500).send("Database error");
			return;
		}
		httpResponse.send(JSON.stringify(new Story(mongoInsertResult.ops[0]).asJson()));
	});
});

module.exports = router;
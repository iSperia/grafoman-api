var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/grafoman';
var MongoInterface = {
	db: null
};
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected successfully to mongo");
	MongoInterface.db = db;
})

module.exports = MongoInterface;
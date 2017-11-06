var mongo = require("./mongo.js");

var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var routes = require('./routes/routes.js')(app);
app.use('/users', require('./routes/users.js'));

var server = app.listen(3000, function() {
	console.log("Listening on port %s...", server.address().port);
});
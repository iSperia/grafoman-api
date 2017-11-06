var User = require("./User.js");

function Story(dbrec) {
	this.id = dbrec._id;
	this.author = new User(dbrec.author);
	this.title = dbrec.title;
	this.root = dbrec.root;

	this.asJson = function() {
		return {
			id:this.is,
			author:this.author.asJson(),
			title:this.title,
			root:this.root
		}
	};
}

module.exports = Story;
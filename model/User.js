function User(dbrec) {
	this.nickname = dbrec.nickname;
	this.id = dbrec._id;

	this.asJson = function() {
		return {
			id:this.id,
			nickname:this.nickname
		};
	}
}

module.exports = User;
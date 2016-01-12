var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var Image = new Schema({
	id: String,
	dataname: String,
	url: String
});


module.exports = mongoose.model('User', {
	id: String,
	username: String,
	password: String,
	email: String,
	nickname: String,
	imgs: [Image],
});

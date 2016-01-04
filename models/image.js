var mongoose = require('mongoose');

module.exports = mongoose.model('Image', {
	id: String,
	username: String,
	dataname: String,
	url: String
});

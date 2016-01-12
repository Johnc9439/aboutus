var mongoose = require('mongoose');

module.exports = mongoose.model('Image', {
	id: String,
	dataname: String,
	url: String
});

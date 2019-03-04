const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
	originalUrl: {
		type: String,
		required: true
	},
	shortUrl: {
		type: String,
		required: true
	}
});

const UrlModel = mongoose.model('short-url', UrlSchema)

module.exports = UrlModel;

const mongoose = require('mongoose');

const UrlModel = new mongoose.Schema({
	originalUrl: {
		type: String,
		required: true
	},
	shortUrl: {
		type: String,
		required: true
	}
});

module.exports = UrlModel;

const express = require('express');
const dns = require('dns');
const url = require('url');
const validUrl = require('valid-url');
const UrlModel = require('../models/url-model');

const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(process.cwd() + '/views/index.html');
});

router.post('/api/shorturl/new', (req, res) => {
	const originalUrl = req.body.url;
	if(validUrl.isWebUri(originalUrl)) {
		const host = url.parse(originalUrl).host;
		const shortUrl = (Math.floor(Math.random() * 100000)).toString();
		// TODO: check if generated url arleady exists in database before add
		dns.lookup(host, (err) => {
			if(!err) {
				const document = new UrlModel({
					originalUrl,
					shortUrl
				});
				document.save((error, doc) => {
					if(error) {
						console.err('Problem with saving document to the database', error);
						res.json({ error: 'cannot save document to the database' });
					} else {
						console.info('document was successfuly saved to the database', doc);
						res.json({
							originalUrl: doc.originalUrl,
							shortUrl: doc.shortUrl
						});
					}
				});
			} else {
				res.json({ error: 'Invalid Host Name' });
			}
		});
	} else {
		res.json({ error: 'Invalid Url' });
	}
});


router.get('/api/shorturl/:shorturl', (req, res) => {
	UrlModel.findOne({ shortUrl: req.params.shorturl }, (err, data) => {
		if(err) {
			console.log(err);
		} else {
			res.status('301').redirect(data.originalUrl);
		}
	});
});

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dns = require('dns');
const url = require('url');
const UrlModel = require('./models/url-model');

const app = express();
// initial middleware
app.use(cors({ optionSuccessStatus: 200 }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

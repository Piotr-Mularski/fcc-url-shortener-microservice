const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const router = require('./routes/index');

const app = express();
dotenv.config();
// initial middleware
app.use(cors({ optionSuccessStatus: 200 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

// connect to the database
mongoose.connect(process.env.DATABASE_URI, (err) => {
	if(err) {
		console.error('cannot connect to the database', err);
	} else {
		console.log('connected to the database');
	}
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

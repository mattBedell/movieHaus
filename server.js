const express = require('express');
const logger = require('morgan');
const path = require('path');
require('dotenv');

const moviesRoute = require('./routes/moviesRoute');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '')));

app.use('/api/movies', moviesRoute);










app.listen(PORT, console.log(`LISTENING ON PORT: ${PORT}`));

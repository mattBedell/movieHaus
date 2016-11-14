const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv');

const moviesRoute = require('./routes/moviesRoute');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static(__dirname));

app.use('/api/movies', moviesRoute);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})
app.get('/movie/:movId', (req, res) => {
  res.sendFile(__dirname + '/views/show.html')
})










app.listen(PORT, console.log(`LISTENING ON PORT: ${PORT}`));

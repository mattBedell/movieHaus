const router = require('express').Router();
const {getAllMovies} = require('../models/movies')

const sendResponse = (req, res) => { res.json(res.movies) };

router.route('/')
  .get(getAllMovies, sendResponse);



module.exports = router;

const router = require('express').Router();
const {getAllMovies, getOneMovie, editMovie, addMovie, deleteMovie} = require('../models/movies')

const sendResponse = (req, res) => { res.json(res.movies)};

router.route('/:movId')
  .get(getOneMovie, sendResponse)
  .put(editMovie, (req, res) => res.send(204))
  .delete(deleteMovie, (req, res) => res.send(204))

router.route('/')
  .get(getAllMovies, sendResponse)
  .post(addMovie, (req, res) => res.send(204));




module.exports = router;

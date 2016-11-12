const db = require('../lib/dbConnect');

function getAllMovies(req, res, next) {
  db.any(`SELECT * FROM movies;`)
    .then((data) => {
      res.movies = data;
      next();
    })
}

module.exports = {
  getAllMovies
}

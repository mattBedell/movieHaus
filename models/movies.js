const db = require('../lib/dbConnect');

function getAllMovies(req, res, next) {
  db.any(`SELECT * FROM movies;`)
    .then((data) => {
      res.movies = data;
      next();
    })
}
function getOneMovie(req, res, next) {
  db.one(`SELECT * FROM movies
          WHERE movies.id = $/movId/;`, req.params)
    .then ((data) => {
      res.movies = data;
      next();
    })
}
function editMovie(req, res, next) {
  db.none(`UPDATE movies SET title = $/title/, writer = $/writer/, director = $/director/, plot = $/plot/, rated = $/rated/, metascore = $/metascore/, poster = $/poster/
            WHERE movies.id = $/id/`, req.body)
    .then(() => next());
}
function addMovie(req, res, next) {
  db.none(`INSERT INTO movies (title, year, rated, runtime, genre, writer, director, actors, plot, poster, metascore, imdbID) VALUES
          ($/title/, $/year/, $/rated/, $/runtime/, $/genre/, $/writer/, $/director/, $/actors/, $/plot/, $/poster/, $/metascore/, $/imdbid/);`, req.body)
    .then(() => next());
}
function deleteMovie(req, res, next) {
  db.none(`DELETE FROM movies WHERE id = $/movId/;`, req.params)
  .then(() => next());
}
module.exports = {
  getAllMovies,
  getOneMovie,
  editMovie,
  addMovie,
  deleteMovie
}

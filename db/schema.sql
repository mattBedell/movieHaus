DROP TABLE IF EXISTS movies CASCADE;
DROP TABLE IF EXISTS showtime_dates CASCADE;
DROP TABLE IF EXISTS showtime_times CASCADE;
DROP TABLE IF EXISTS movie_date_ref CASCADE;
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  year VARCHAR(5) NOT NULL,
  rated VARCHAR(5),
  runtime VARCHAR(20),
  genre VARCHAR(255),
  writer VARCHAR(255),
  director VARCHAR(255),
  actors VARCHAR(255),
  plot TEXT,
  poster VARCHAR(255),
  metascore VARCHAR (5),
  imdbID VARCHAR (15)
);

CREATE TABLE showtime_dates (
  id SERIAL PRIMARY KEY,
  month VARCHAR(20) NOT NULL,
  day SMALLINT NOT NULL
);

CREATE TABLE showtime_times(
  id SERIAL PRIMARY KEY,
  movietime VARCHAR(10) NOT NULL,
  moviedate SMALLINT NOT NULL REFERENCES showtime_dates ON DELETE CASCADE
);

CREATE TABLE movie_date_ref(
  movie_id SMALLINT NOT NULL REFERENCES movies (id) ON DELETE CASCADE,
  date_id SMALLINT NOT NULL REFERENCES showtime_dates (id),
  time_id SMALLINT NOT NULL REFERENCES showtime_times (id)
);

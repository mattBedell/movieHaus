BEGIN;

INSERT INTO movies (title, year, rated, runtime, genre, writer, director, actors, plot, poster, metascore, imdbID) VALUES
('The Matrix', '1999', 'R', '136 Min', 'Action, Sci Fi', 'Lana Wachowski, Lilly Wachowski', 'Lana Wachowski, Lilly Wachowski', 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving', 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', 'https://images-na.ssl-images-amazon.com/images/M/MV5BMDMyMmQ5YzgtYWMxOC00OTU0LWIwZjEtZWUwYTY5MjVkZjhhXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg', '73', 'tt0133093'),
('Big', '1988', 'PG', '104 Min', 'Comedy, Drama, Family', 'Gary Ross, Anne Spielberg', 'Penny Marshall', 'Tom Hanks, Elizabeth Perkins, Robert Loggia, John Heard', 'When a pre-teen boy wishes to be big at a magic wish machine, he wakes up the next morning and finds himself in an adult body.', 'https://images-na.ssl-images-amazon.com/images/M/MV5BNDk0OTM1Mzk3M15BMl5BanBnXkFtZTgwNDg2NjIyMDE@._V1_SX300.jpg', '73', 'tt0094737');

INSERT INTO showtime_dates (month, day) VALUES
('Nov', 12),
('Nov', 13),
('Nov', 14);

INSERT INTO showtime_times (movietime, moviedate) VALUES
('3:00 PM', 1),
('4:30 PM', 1),
('3:00 PM', 2);

INSERT INTO movie_date_ref (movie_id, date_id, time_id) VALUES
(1, 1, 2),
(1, 2, 3),
(2, 3, 1),
(2, 1, 1);

COMMIT;

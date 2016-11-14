console.log('loaded');
const getData = fetchAndRender();
getData.getOneMovieFromDB(getMovieIdFromUrl());
$('.submitBtn').on('click', () => {
  getData.editMovie(getMovieIdFromUrl());
})

const getData = fetchAndRender();
getData.getMoviesFromDB();
$('body').on('keypress', (event) => {
  if(event.which === 13) {
    getData.searchMovies();
  }
})

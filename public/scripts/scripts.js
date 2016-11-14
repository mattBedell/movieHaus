function fetchAndRender() {
  const renderPlaylist = (data) => {
    $('.nowPlayingCont').remove();
    $nowPlayingCont = $('<div class="nowPlayingCont"></div>')
    data.forEach( (mov) => {
      let $card = $(`<div class="card" movId="${mov.id}"></div>`);
      let $title = $(`<div class="title">${mov.title}<div>`);
      let $poster = $(`<img src="${mov.poster}"></img>`);
      let $runtime = $(`<div class="runtime"><span>Runtime:</span> ${mov.runtime}</div>`);
      let $rated = $(`<div class="rated"><span>Rated:</span> ${mov.rated}</div>`);
      let $details = $(`<div class="details"><a href="/movie/${mov.id}">More Details</a></div>`);

      $card.append($title, $poster, $runtime, $rated, $details);
      $($nowPlayingCont).append($card);
    })
    $('.contentContainer').append($nowPlayingCont);
  };
  const renderMovie = (mov) => {
    $('.searchCont').remove();
    let $searchCont = $('<div class="searchCont"></div>');
    let $card = $('<div class="card"></div>');
    let $detailsCont = $('<div class="detailsCont"></div>');
    let $title = $(`<div class="title">${mov.title || mov.Title}<div>`);
    let $poster = $(`<img class="detail"src="${mov.poster || mov.Poster}"></img>`);
    let $runtime = $(`<div class="runtime detail">${mov.runtime || mov.runtime}</div>`);
    let $writer = $(`<div class="writer detail"><span>Writer(s):</span> ${mov.writer || mov.Writer}</div>`);
    let $director = $(`<div class="director detail"><span>Director:</span> ${mov.director || mov.Director}</div>`);
    let $actors = $(`<div class="actors detail"><span>Actors:</span> ${mov.actors || mov.Actors}</div>`);
    let $plot = $(`<div class="plot detail">${mov.plot || mov.Plot}</div>`);
    let $rated = $(`<div class="rated detail"><span>Rated:</span> ${mov.rated || mov.Rated}</div>`);
    let $metascore = $(`<div class="metascore detail"><span>Metascore:</span> ${mov.metascore || mov.Metascore}</div>`);
    let $imdb = $(`<div class="imdb detail"><a href="http://www.imdb.com/title/${mov.imdbid || mov.imdbID}" target="_blank">IMDB Movie Page</a></div>`);

    $detailsCont.append($title, $writer, $director, $actors, $plot, $rated, $metascore, $imdb);
    $card.append($poster, $detailsCont);

    if(mov.Title) {
      let $addBtn = $('<button type="button" class="addBtn btn">Add to Playlist</button>')
      $addBtn.on('click', () => {
        addToPlaylist(mov.Title);
      })
      $detailsCont.append($addBtn);
    } else {
      let $deleteBtn = $('<button type="button" class="deleteBtn btn">Delete From Playlist</button>')
      $deleteBtn.on('click', () => {
        deleteFromPlaylist(mov.id);
      })
      $detailsCont.append($deleteBtn);
    }
    $searchCont.append($card);
    $('.contentContainer').prepend($searchCont);

  }
  const searchMovies = () => {
    fetch(`http://www.omdbapi.com/?t=${$('.searchBar').val()}&type=movie`)
    .then((response) => response.json())
    .then((mov) => {
      renderMovie(mov)
    })
  }
  const getMoviesFromDB = () => {
    fetch('/api/movies')
    .then( (response) => response.json())
    .then( (data) => renderPlaylist(data))
  };
  const getOneMovieFromDB = (movId) => {
    fetch(`/api/movies/${movId}`)
    .then( (response) => response.json())
    .then( (data) => renderMovie(data))
  };
  const editMovie = (movId) => {
    const payload = {};
    fetch(`/api/movies/${movId}`)
    .then( (data) => data.json())
    .then((mov) => {
      payload.id = getMovieIdFromUrl(),
      payload.title = $('.iTitle').val() || mov.title,
      payload.writer = $('.iWriter').val() || mov.writer,
      payload.director = $('.iDirector').val() || mov.director,
      payload.plot = $('.iPlot').val() || mov.plot,
      payload.rated = $('.iRated').val() || mov.rated,
      payload.metascore = $('.iMetascore').val() || mov.metascore,
      payload.poster = $('.iPoster').val() || mov.poster
    }).then( () => {
      fetch(`/api/movies/${movId}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(payload)
      }).then(getOneMovieFromDB(movId))
    })
  };
  const addToPlaylist = (movieTitle) => {
    const payload = {};
    fetch(`http://www.omdbapi.com/?t=${movieTitle}&type=movie`)
    .then ((response) => response.json())
    .then((data) => {
      payload.title = data.Title
      payload.year = data.Year
      payload.rated = data.Rated
      payload.runtime = data.Runtime
      payload.genre = data.Genre
      payload.writer = data.Writer
      payload.director = data.Director
      payload.actors = data.Actors
      payload.plot = data.Plot
      payload.poster = data.Poster
      payload.metascore = data.Metascore
      payload.imdbid = data.imdbID
    }).then(() => {
      console.log(payload);
      fetch('/api/movies', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(payload)
      }).then(getMoviesFromDB)
    })
  }
  const deleteFromPlaylist = () => {
    fetch(`/api/movies/${getMovieIdFromUrl()}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    }).then(window.location = '/')
  }
  return {
    getMoviesFromDB,
    getOneMovieFromDB,
    editMovie,
    searchMovies,
    deleteFromPlaylist
  }
};
function getMovieIdFromUrl() {
  let windowLocation = window.location.href;
  let isolateMovieId = windowLocation.split('/');
  isolateMovieId = isolateMovieId[isolateMovieId.length - 1];
  return isolateMovieId;
};

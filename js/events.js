'use strict';
let _ = require('lodash');
let moment = require('moment');
let dbInteraction = require('./TMDB_interaction.js');
let User = require('./user');

let Handlers = {
  loginClickEvent: function() {
    $('#btn-login').click(event => {
      User.logInLogOut();
    });
  },
  getUserInput: function(movieAjaxCall) {
    $('#user-input').on('keyup', () => {
      let userInput = $('#user-input').val();
      return movieAjaxCall(userInput);
    });
  },
  addMovieToWatchList: function(movieAjaxCall) {
    $(document).on('click', '#add-to-watchlist', function(event) {
      let movieId = $(this).data('movie-id');
      let moviesPromise = dbInteraction.getSingleMovieFromTMD(movieId);
      let actorsPromise = dbInteraction.getMovieActors(movieId);
      return Promise.all([moviesPromise, actorsPromise]).then(data => {
        let movie = data[0];
        let actors = data[1].cast;

        let movieObj = Handlers.buildMovieObj(movie, actors);
        dbInteraction.addMovieToFirebase(movieObj).then(function(movie) {
          console.log('Added Movie: ', movie);

        });
        // console.log('Build MovieObj: ', movieObj);

        // console.log(actorsArray, '-', movie.genres, '-', [ `http://image.tmdb.org/t/p/w185/${movie.poster_path}`, `http://image.tmdb.org/t/p/w780/${movie.poster_path}`], movie.original_title, movie.release_date);
      });
    });
  },
  buildMovieObj: function(movie, actors) {
    let now = moment();
    let user = User.getCurrentUser();
    let actorsArray = _.map(actors, function(actor) {
      return actor.name;
    });
    let genresArray = _.map(movie.genres, function(genre) {
      return genre.name;
    });

    let movieObj = {
      actors: actorsArray,
      genre: genresArray,
      poster_thumbnail: `http://image.tmdb.org/t/p/w185/${movie.poster_path}`,
      poster_large: `http://image.tmdb.org/t/p/w780/${movie.poster_path}`,
      rating: 0,
      title: movie.original_title,
      year: movie.release_date,
      favorite: false,
      time_stamp: now.format(),
      uid: user.uid
    };
    return movieObj;
  }
};

Handlers.loginClickEvent();
Handlers.addMovieToWatchList(dbInteraction.getSingleMovieFromTMD);
Handlers.getUserInput(dbInteraction.getMoviesFromDB);

module.exports = Handlers;

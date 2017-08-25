'use strict';
let $ = require('jquery');
let Api = require('./api.js');
let User = require('./user');

let dbInteraction = {
  //listens for keyup in search bar and searches TMDB
  getMoviesFromDB: userInput => {
    let api = Api.getAPI().api;
    $.ajax({
      url: `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${userInput}&include_adult=false&page=1`
    }).done(movieData => {
      return movieData;
    });
  },
  getSingleMovieFromTMD: function(movieId) {
    return new Promise(function(resolve, reject) {
      let api = Api.getAPI().api;
      console.log('TMB key: ', api);

      $.ajax({
        url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api}`
      }).done(movieData => {
        resolve(movieData);
      });
    });
  },
  getMovieActors: function(movieId) {
    return new Promise(function(resolve, reject) {
      let api = Api.getAPI().api;
      $.ajax({
        url: `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api}`
      }).done(actorsData => {
        resolve(actorsData);
      });
    });
  },
  addMovieToFirebase: function(movieObj) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: `${User.getFirebaseConfi().databaseURL}/movies.json`,
        type: 'POST',
        data: JSON.stringify(movieObj),
        dataType: 'json'
      }).done(function(movie) {
        resolve(movie);
      });
    });
  }
};

module.exports = dbInteraction;

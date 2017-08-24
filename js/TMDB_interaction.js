'use strict';
let $ = require('jquery');
let Api = require('./api.js');


let dbInteraction = {
  //listens for keyup in search bar and searches TMDB
  getMoviesFromDB: userInput => {
    let api = Api.getTMDBkey();
    $.ajax({
      url: `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${userInput}&include_adult=false&page=1`
    }).done(movieData => {
      return movieData;
    });
  },
  getSingleMovieFromTMD: function(movieId) {
    let api = Api.getTMDBkey();
    $.ajax({
      url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api}`
    }).done(movieData => {
      return movieData;
    });
  }
};

dbInteraction.getSingleMovieFromTMD('1891');
module.exports = dbInteraction;

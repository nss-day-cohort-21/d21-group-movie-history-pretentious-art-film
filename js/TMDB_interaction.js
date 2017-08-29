'use strict';
let $ = require('jquery');
let _ = require('lodash');
let Api = require('./api.js');
let User = require('./user');

let dbInteraction = {

  /**
   * Get movies from TMDB.
   *
   * @param {string} userInput : search input
   * @returns {Promise} moviesData : movies object
   */
  getMoviesFromTmdbOnSearch: userInput => {
    return new Promise(function(resolve, reject) {
      let api = Api.getAPI().api;
      $.ajax({
        url: `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${userInput}&include_adult=false&page=1`
      }).done(movieData => {
        resolve(movieData.results);
      });
    });
  },

  /**
   * Retrieve movie by TMDB movie id.
   *
   * @param {string} movieId : TMDB movie id
   * @returns {promise} movieData : movie data
   */
  getSingleMovieFromTMDB: function(movieId) {
    return new Promise(function(resolve, reject) {
      let api = Api.getAPI().api;

      $.ajax({
        url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api}`
      }).done(movieData => {
        resolve(movieData);
      });
    });
  },

  /**
   * Retrieve movie actors of specific movie from TMDB by movie id.
   *
   * @param {string} movieId : TMDB movie id
   * @returns {promise} actorsData : actors data
   */
  getMovieActors: function(movieId) {
    return new Promise(function(resolve, reject) {
      let api = Api.getAPI().api;
      $.ajax({
        url: `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api}`
      }).done(actorsData => {
        let actorsArray = _.map(actorsData.cast, function(actor) {
          return actor.name;
        });
        resolve(actorsArray);
      });
    });
  },

  /**
   * Add single movie to Firebase.
   *
   * @param {object} movieObj : movie object
   * @returns {promise} movie : success added movie
   */
  addMovieToFirebase: function(movieObj) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: `${User.getFirebaseConfi().databaseURL}/movies.json`,
        type: 'POST',
        data: JSON.stringify(movieObj),
        dataType: 'json'
      }).done(function(movie) {
        console.log('Movie Ajax', movie);
        resolve(movie);
      });
    });
  }
};

module.exports = dbInteraction;

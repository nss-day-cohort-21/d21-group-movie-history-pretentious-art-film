'use strict';
let _ = require('lodash');
let moment = require('moment');
let dbInteraction = require('./TMDB_interaction.js');
let User = require('./user');
let template = require('./DOM_builder');
let firebase = require('./firebase_interaction');

let Handlers = {
  loginClickEvent: function() {
    $('#btn-login').click(event => {
      User.logInLogOut();
    });
  },

  /**
   * Search for movies on enter key.
   *
   * @param {api call} movieCall : ajax call to get movies
   * @param {function call} domBuilder : function to build cards
   */
  searchTmdbOnKeyUp: function(movieCall, domBuilder) {
    $('#user-input').on('keypress', event => {
      let userInput = $('#user-input');
      if (event.keyCode === 13 && document.activeElement.id === 'user-input') {
        movieCall(userInput.val()).then(movieData => {
          domBuilder(movieData);
        });
      }
    });
  },
  /**
   * Add movie to Firebase.
   *
   * @param {ajax} movieAjaxCall : ajax call to add movie to Firebase.
   */
  addMovieToWatchList: function(movieAjaxCall) {
    $(document).on('click', '#add-to-watchlist', function(event) {
      let movieId = $(this).data('movie-id');
      let moviesPromise = dbInteraction.getSingleMovieFromTMDB(movieId);
      let actorsPromise = dbInteraction.getMovieActors(movieId);
      return Promise.all([moviesPromise, actorsPromise]).then(data => {
        let movie = data[0];
        let actors = data[1];
        let movieObj = Handlers.buildMovieObj(movie, actors);

        dbInteraction
          .addMovieToFirebase(movieObj)
          .then(function(movie) {
            // Populate the DOM
            console.log('Added Movie: ', movie);
          })
          .catch(error => {
            console.warn('ERROR: ', error.code, error.message);
          });
      });
    });
  },
  /**
   * Build movie object.
   *
   * @param {object} movie : movie object
   * @param {object} actors : actors object
   * @returns {object} movie with actors : movie with actors
   */
  buildMovieObj: function(movie, actors) {
    let now = moment();
    let user = User.getCurrentUser();
    let actorsArray = actors;
    let genresArray = _.map(movie.genres, function(genre) {
      return genre.name;
    });

    let movieObj = {
      actors: actorsArray,
      genre: genresArray,
      poster_thumbnail: `http://image.tmdb.org/t/p/w185${movie.poster_path}`,
      poster_large: `http://image.tmdb.org/t/p/w780${movie.poster_path}`,
      rating: 0,
      title: movie.original_title,
      year: movie.release_date,
      favorite: false,
      time_stamp: now.format(),
      uid: user.uid
    };
    return movieObj;
  },

  showUnwatched: function (){
    return new Promise ((resolve)=>{
      console.log("getCurrentUser", User.getCurrentUser());
          firebase.getMovies(User.getCurrentUser().uid).then((item)=>{
              console.log('item', item);
              resolve(item);
          });

        });
    },

};


$('#btn-showUnWatched').on('click', ()=>{
  let watchListArray = [];
  Handlers.showUnwatched().then((item)=>{
    template.buildMovieCard(item);
    console.log('watchlistItem type of', typeof item);
    console.log('watchListArray', item);
    item.forEach((items)=>{
      console.log('items.each', items);
      watchListArray.push(items);
      // watchListArray.push(items);

    });
  });
  // console.log('typeof', typeof watchListArray);
  template.buildMovieCard(watchListArray);
});



Handlers.loginClickEvent();
Handlers.addMovieToWatchList(dbInteraction.getSingleMovieFromTMDB);
Handlers.searchTmdbOnKeyUp(dbInteraction.getMoviesFromTmdbOnSearch, template.buildMovieCard);

module.exports = Handlers;

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
      logoutSearchBar();
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
          console.log("moviedata", movieData);
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
  addMovieToWatchList: function(movieAjaxCall, starRating) {
    $(document).on('click', '#add-to-watchlist', function(event) {
      let movieId = $(this).data('movie-id');
      let moviesPromise = dbInteraction.getSingleMovieFromTMDB(movieId);
      let actorsPromise = dbInteraction.getMovieActors(movieId);
      return Promise.all([moviesPromise, actorsPromise]).then(data => {
        let movie = data[0];
        let actors = data[1];
        let movieObj = Handlers.buildMovieObj(movie, actors, starRating);

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
  buildMovieObj: function(movie, actors, starRating) {
    let now = moment();
    let user = User.getCurrentUser();
    let actorsArray = actors;
    let genresArray = _.map(movie.genres, function(genre) {
      return genre.name;
    });

    let movieObj = {
      actors: actorsArray,
      genre: genresArray,
      poster_thumbnail: `${movie.poster_path}`,
      poster_path: `${movie.poster_path}`,
      rating: 0,
      original_title: movie.original_title,
      release_date: movie.release_date,
      favorite: false,
      time_stamp: now.format(),
      uid: user.uid,
      id: movie.id,
      overview: movie.overview,
      starRating: starRating
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

$(document).on("click", "#btn-showWatched", ()=>{
  console.log("WATCHED");
        $('#user-input').hide();
        $('#user-unwatched').hide();
        $('#user-watched').css("display", "block");
 });
$(document).on("click", "#btn-showUnWatched", ()=>{
        $('#user-watched').hide();
        $('#user-input').hide();
        $('#user-unwatched').css("display", "block");
 });

$(document).on("click", "#btn-showUnTracked", ()=>{
  console.log("UNWATCHED");
        $('#user-watched').hide();
        $('#user-unwatched').hide();
        $('#user-input').css("display", "block");
 });

function logoutSearchBar(){
        $('#user-watched').hide();
        $('#user-unwatched').hide();
        $('#user-input').css("display", "block");
}

// var options = {
//   shouldSort: true,
//   threshold: 0.05,
//   location: 0,
//   distance: 100,
//   maxPatternLength: 32,
//   minMatchCharLength: 1,
//   keys: ["title"]
// };


//watched search bar
$("input#user-watched").on("keydown",()=>{
    $('input#user-watched').quicksearch('.card');
});
//unwatched search bar
$("#user-unwatched").on("keydown",()=>{
  $('#user-unwatched').quicksearch('.card');
});




$('#btn-showUnWatched').on('click', ()=>{
  let watchListArray = [];
  Handlers.showUnwatched().then((item)=> {

      for (var prop in item) {

          console.log("what is watchlist arr", watchListArray);
          template.buildMovieCard(item);

      }
  });


      $(document).on("click",".rateYo",(e)=> {
          let startarget = e.currentTarget;
          let movieId = $(startarget).data("movie");
          console.log(movieId);
          console.log(startarget);
          let rating = $(startarget).rateYo("rating") * 2;
          console.log(rating);
          Handlers.addMovieToWatchList(rating);
      });


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





    // item.forEach((items)=>{
    //   console.log('items.each', items);
    //   watchListArray.push(items);
    //   // watchListArray.push(items);

    // });
  });
  // console.log('typeof', typeof watchListArray);
});



Handlers.loginClickEvent();
Handlers.addMovieToWatchList(dbInteraction.getSingleMovieFromTMDB);
Handlers.searchTmdbOnKeyUp(dbInteraction.getMoviesFromTmdbOnSearch, template.buildMovieCard);
});

module.exports = Handlers;
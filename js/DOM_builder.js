'use strict';

let _ = require('lodash');
let tmdbInteractions = require('./TMDB_interaction');


let domBuilder = {
  buildMovieCard: function(movieData) {
    $('#card-wrapper').html('');
    let card = '';
    console.log("movieData", movieData);
    var uglyId;
      for (var prop in movieData){
        uglyId = prop;
      }
    _.forEach(movieData, function(movie) {
      let currentMovie = {
        poster: movie.poster_path ? `http://image.tmdb.org/t/p/w185${movie.poster_path}` : `http://placehold.it/185x185`,
        stars: movie.uid ? `<div class="rateYo" data-movie="${movie.id}"></div>`: `<a id="add-to-watchlist" data-movie-id="${movie.id}" href="#" class="btn btn-primary btn-block">Add To Watchlist</a><a id="$\{prop}" data-movie-id="tmdb-id" href="#" class="btn btn-danger">Remove From List</a> `


      };
      card += `<div class="col-3 each-card" data-list=".default_list_data">
            <div class="card">
            <div class="img-wrapper">
            <img class="card-img-top" src="${currentMovie.poster}" alt="Card image cap">
            </div>
            <div class="card-body">
            <div class="d-flex w-100 justify-content-between">

            <small class="text-muted">${movie.release_date}</small>
            </div>
            <hr>
            <h2 class="card-text">${movie.original_title}</h2>
            <p class="card-text">${movie.overview}</p>
            ${currentMovie.stars}
             </div>
            </div>
            </div>`;
    });
    console.log(movieData);

    domBuilder.writeCardToDom(card);
    $(`.rateYo`).rateYo({
    numStars: 10,
    rating: movieData.starRating,
    spacing: "5px"
  }).on("rateyo.set", function (e, data) {


        console.log("The rating is set to " + data.rating *2 + "!");
    });
  },
  writeCardToDom: function(movieHtml) {
    $('#card-wrapper').html();
    $('#card-wrapper').html(movieHtml);
  }
};



module.exports = domBuilder;

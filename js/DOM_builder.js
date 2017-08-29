'use strict';

let _ = require('lodash');
let tmdbInteractions = require('./TMDB_interaction');

let domBuilder = {
  buildMovieCard: function(movieData) {
    var keys = Object.keys(movieData);
    console.log('keys', keys);
    $('#card-wrapper').html('');
    let card = '';
    console.log("movieData", movieData);
    // var uglyId = [];
var starRating =[];


    _.forEach(movieData, function(movie, index) {
        // for (var prop in movieData){
        //   uglyId.push(prop);
    // }

      let currentMovie = {
        poster: movie.poster_path ? `http://image.tmdb.org/t/p/w185${movie.poster_path}` : `http://placehold.it/185x185`,
        stars: movie.uid ? `<a data-movie-id="tmdb-id" href="#" class="btn btn-danger">Remove From List</a>`: `<a id="add-to-watchlist" data-movie-id="${movie.id}" href="#" class="btn btn-primary btn-block">Add To Watchlist</a> `


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
            <div class="rateYo ${movie.id}" ></div>
             </div>
            </div>
            </div>`;

        starRating.push(movieData[index].starRating);
        console.log('movieId', movie.id);
    });

    console.log('starRating', starRating);




    domBuilder.writeCardToDom(card);
starRating.forEach((item, index)=>{

  console.log('what were looking for', movieData[keys[index]].id);
    $('.' + movieData[keys[index]].id).rateYo({
    numStars: 10,
    rating: item,
    spacing: "5px"
  }).on("rateyo.set", function (e, data) {


        console.log("The rating is set to " + data.rating *2 + "!");
    });

});
  },
  writeCardToDom: function(movieHtml) {
    $('#card-wrapper').html();
    $('#card-wrapper').html(movieHtml);
  }
};



module.exports = domBuilder;

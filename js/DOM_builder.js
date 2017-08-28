'use strict';

let _ = require('lodash');
let tmdbInteractions = require('./TMDB_interaction');

let domBuilder = {
  buildMovieCard: function(movieData) {
    $('#card-wrapper').html('');
    let card = '';

    _.forEach(movieData, function(movie) {
      let currentMovie = {
        poster: movie.poster_path ? `http://image.tmdb.org/t/p/w185${movie.poster_path}` : `http://placehold.it/185x185`
      };

      card += `<div class="col-3 each-card">
            <div class="card">
            <div class="img-wrapper">
            <img class="card-img-top" src="${currentMovie.poster}" alt="Card image cap">
            </div>
            <div class="card-body">
            <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${movie.original_title}</h5>
            <small class="text-muted">${movie.release_date}</small>
            </div>
            <hr>
            <p class="card-text">${movie.overview}</p>
            <a data-movie-id="${movie.id}" href="#" class="btn btn-primary btn-block">Add To Watchlist</a>
            </div>
            </div>
            </div>`;
    });
    domBuilder.writeCardToDom(card);
  },
  writeCardToDom: function(movieHtml) {
    $('#card-wrapper').html();
    $('#card-wrapper').html(movieHtml);
  }
};

module.exports = domBuilder;

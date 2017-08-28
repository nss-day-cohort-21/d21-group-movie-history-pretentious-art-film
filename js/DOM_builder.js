'use strict';

let _ = require('lodash');
let tmdbInteractions = require('./TMDB_interaction');
// let Handlers = require('./events');

let domBuilder = {
  buildMovieCard: function(moviesId) {
    $('#card-wrapper').html('');
    let card = '';

    _.forEach(moviesId, function(movieId) {
      let moviePromise = tmdbInteractions.getSingleMovieFromTMDB(movieId);
      let actorsPromise = tmdbInteractions.getMovieActors(movieId);

      return Promise.all([moviePromise, actorsPromise]).then(data => {
        let movie = data[0];
        let actors = data[1];

        console.log(data[0]);


        let currentMovie = {
          poster: movie.poster_path ? `http://image.tmdb.org/t/p/w185${movie.poster_path}` : `http://placehold.it/185x185`,
          actors: actors.length < 1 ? (actors = ['no actor listed']) : actors
        };

        // card += `<div class="col-3 each-card">
        //     <div class="card">
        //     <div class="img-wrapper">
        //     <img class="card-img-top" src="${currentMovie.poster}" alt="Card image cap">
        //     </div>
        //     <div class="card-body">
        //     <div class="d-flex w-100 justify-content-between">
        //     <h5 class="mb-1">${movie.original_title}</h5>
        //     <small class="text-muted">${movie.release_date}</small>
        //     </div>
        //     <hr>
        //     <h5>Main Actors:</h5>
        //     <ul class="list-group">
        //     <li class="list-group-item">${actors[0]}</li>
        //     <li class="list-group-item">${actors[1]}</li>
        //     <li class="list-group-item">${actors[2]}</li>
        //     </ul>
        //     <hr>
        //     <p class="card-text">${movie.overview}</p>
        //     <a id="add-to-watchlist or detele-movie" data-movie-id="tmdb-id" href="#" class="btn btn-primary btn-block">Add To Watchlist</a>
        //     </div>
        //     </div>
        //     </div>`;
      });
    });
    // domBuilder.writeCardToDom(card);
  },
  writeCardToDom: function(movieHtml) {
    $('#card-wrapper').html();
    $('#card-wrapper').html(movieHtml);
  }
};

module.exports = domBuilder;

'use strict';
let $ = require('jquery');
let API = require('./api.js');
let apiData = API();

let dbInteraction = {
	//listens for keyup in search bar and searches TMDB
	getMoviesFromDB: (userInput) => {
		$.ajax({
			url: `https://api.themoviedb.org/3/search/movie?api_key=${apiData.api}&query=${userInput}&include_adult=false&page=1`
		}).done(movieData => {
			console.log("movie data", movieData);
			return movieData;
		});
	}
};

module.exports = dbInteraction;
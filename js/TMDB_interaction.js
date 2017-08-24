'use strict';
let $ = require('jquery');
let Api = require('./api.js');

let dbInteraction = {
	//listens for keyup in search bar and searches TMDB
	getMoviesFromDB: (userInput) => {
		let api = Api.getTMDBkey();
		$.ajax({
			url: `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${userInput}&include_adult=false&page=1`
		}).done(movieData => {
			console.log("movie data", movieData);
			return movieData;
		});
	}
};

module.exports = dbInteraction;
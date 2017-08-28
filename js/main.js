'use strict';

// const $ = require('jquery');
// const rateYo = require('./jquery.rateyo');

const FBInteraction = require('./firebase_interaction');
const User = require('./user');

function loadUserMovies() {
	// let currentUser = User.getCurrentUser();
	let currentUser = '69bj7wpbnbecR4Kn95Q3HrBZNIq1'; //hard coding current user to test, delete line 9 later
	FBInteraction.getMovies(currentUser)
	.then((movieData)=>{
		console.log("movie data", movieData);
	});
}

// loadUserMovies();  //loading movies at page load for now



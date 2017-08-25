'use strict';

const $ = require('jquery');

const FBInteraction = require('./firebase_interaction');
const User = require('./user');

function loadUserMovies() {
	// let currentUser = User.getCurrentUser();
	let currentUser = 'u90B7wHi2JUGpLB410jfTlsecoZ2'; //hard coding current user to test, delete line 9 later
	FBInteraction.getMovies(currentUser)
	.then((movieData)=>{
		console.log("movie data", movieData);
	});
}

loadUserMovies();  //loading movies at page load for now



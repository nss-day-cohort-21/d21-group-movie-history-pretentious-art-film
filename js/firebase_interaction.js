'use strict';

const firebase = require('firebase');
const $ = require('jquery');
const fbConfig = require('./get_keys');

let config = fbConfig.getKey();

let FBInteraction = {
	/**
   * Get unwatched movies from Firebase.
   *
   * @param {string} user :  Firebase uid
   * @returns {Promise} movie data : Unwatched movies
   */
  getMovies: function(user) {
		return new Promise((resolve, reject)=>{
			$.ajax({
				url: `${config.databaseURL}/movies.json?orderBy="uid"&equalTo="${user}"`
			}).done((movieData)=>{
				resolve(movieData);
			});
		});
	}
};

module.exports = FBInteraction;


//

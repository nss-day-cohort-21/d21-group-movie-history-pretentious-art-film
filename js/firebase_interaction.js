'use strict';

const firebase = require('firebase');
const $ = require('jquery');
const fbConfig = require('./get_keys');

let config = fbConfig.getKey();

function getMovies(user) {
		return new Promise((resolve, reject)=>{
			$.ajax({
				url: `${config.databaseURL}/movies.json?orderBy="uid"&equalTo="${user}"`
			}).done((movieData)=>{
				resolve(movieData);
			});
		});
	}


module.exports = {getMovies};


//

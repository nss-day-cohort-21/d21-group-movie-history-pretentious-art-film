'use strict';

let firebase = require('firebase/app');
let fb = require('./get_keys');
let fbData = fb();

require('firebase/auth');
require('firebase/database');

//adds config keys to Firebase object
let config = {
	apiKey: fbData.apiKey,
    authDomain: fbData.authDomain,
    databaseURL: fbData.databaseURL
};

firebase.getFBsettings = function () {
	return config;
};

module.exports = firebase;
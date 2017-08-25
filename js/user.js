'use strict';
// Dependencies
const firebase = require('firebase');
const $ = require('jquery');
const fbConfig = require('./get_keys');

// Firebase initialization
let config = fbConfig.getKey();
firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();

let currentUser;

let User = {
  logInLogOut: function() {
    if (currentUser) {
      firebase.auth().signOut().then(() => {
          currentUser = null;
        })
        .catch(error => {
        });
    } else {
      firebase.auth().signInWithPopup(provider)
        .then(userObj => {
          currentUser = userObj.user;
        })
        .catch(error => {
        });
    }
  },
  getCurrentUser: function() {
    return currentUser;
  },
  getFirebaseConfi: function(){
    return config;
  }
};

module.exports = User;

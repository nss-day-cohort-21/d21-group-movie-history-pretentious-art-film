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

function addPhotoAfterLogin (userObj) {
  console.log("userObj photo", userObj.photoURL);
  $("#profile-image-anchor").append(
    `<img src="${userObj.user.photoURL}" id="profile-img" class="flex-sm-fill">`
  );
}
function clearUserPhoto (){
  $("#profile-image-anchor").empty();
}

let User = {
  logInLogOut: function() {
    if (currentUser) {
      firebase.auth().signOut().then(() => {
        clearUserPhoto();
          currentUser = null;
        })
        .catch(error => {
        });
    } else {
      firebase.auth().signInWithPopup(provider)
        .then(userObj => {
          console.log("userObj", userObj);
          currentUser = userObj.user;
          addPhotoAfterLogin(userObj);
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

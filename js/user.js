'use strict';
// Dependencies
const firebase = require('firebase');
const $ = require('jquery');

// Firebase initialization
const config = {
  apiKey: 'AIzaSyCDbuxg0OfEiqFLQJv9Lw4Pd6LvEAFST8E',
  authDomain: 'second-tester.firebaseapp.com',
  databaseURL: 'https://second-tester.firebaseio.com',
  projectId: 'second-tester',
  storageBucket: 'second-tester.appspot.com',
  messagingSenderId: '527615551007'
};
firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();

let currentUser;

let User = {
  logInLogOut: function() {
    if (currentUser) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          currentUser = null;
        })
        .catch(error => {
          console.warn('ERROR: ', error.code, '--', error.message);
        });
    }
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(userObj => {
        console.log('User Obj', JSON.stringify(userObj));
        currentUser = userObj.user;
      })
      .catch(error => {
        console.warn('ERROR: ', error.code, '--', error.message);
      });
  }
};

module.exports = User;

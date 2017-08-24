'use strict';

let dbInteraction = require('./TMDB_interaction.js');
let User = require('./user');

let Handlers = {
  loginClickEvent: function() {
    $('#btn-login').click(event => {
      console.log('Login Btn: ', User);
      User.logInLogOut();
    });
  },
  getUserInput: function(movieAjaxCall) {
  	$('#user-input').on('keyup', ()=> {
  		let userInput = $('#user-input').val();
  		return movieAjaxCall(userInput);
  	});
  }
};

Handlers.loginClickEvent();

Handlers.getUserInput(dbInteraction.getMoviesFromDB);

module.exports = Handlers;

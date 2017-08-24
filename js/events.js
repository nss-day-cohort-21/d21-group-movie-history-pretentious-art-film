'use strict';

var User = require('./user');

let Handlers = {
  loginClickEvent: function() {
    $('#btn-login').click(event => {
      console.log('Login Btn: ', User);
      User.logInLogOut();
    });
  }
};

Handlers.loginClickEvent();

module.exports = Handlers;

'use strict';

const $ = require('jquery');

console.log('From Main');


//*************************
//		Star Rating
//*************************

$(function () {
 
  $("#rateYo").rateYo({
    rating: 0,
    fullStar: true
  });
});
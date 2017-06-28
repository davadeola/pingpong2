
var apikeys = require('./../.env').apikeys;
var Weather = require('./../js/weather.js').weatherModule;

$(document).ready(function(){

  var currentWeatherObject = new Weather();//initiating a Weather object
  currentWeatherObject.getWeather();//calling the getWeather function

  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    $('.showWeather').text("The city you have chosen is " + city + ".");

    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apikeys).then(function(response) {
      console.log(response);
      console.log(JSON.stringify(response));//converts the JavaObject back to JSON
      $('.showWeather').text("The humidity in " + city + " is " + response.main.humidity + "%").fail(function(error) {//fail() is executed when the promise enters a rejected state.
        $('.showWeather').text(error.responseJSON.message);
      });
    });
  });
});

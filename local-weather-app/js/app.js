/** 
  * Written by Anith Vishwanath 
 **/

var celTempDisplay;
var fahrTempDisplay;

$(document).ready(function() {
  $("#temp").html("<p class='lead'>Loading...</p>"); //Loading text

  //Geolocation API
  if (navigator.geolocation) {
  	navigator.geolocation.getCurrentPosition(getPosition, errPosition);
  } else {
  	console.log("Geolocation error.");
  }

  /* Function that gets the position (coords) of the user */
  function getPosition(position) {
  	var latitude = "lat=" + position.coords.latitude;
  	var longitude = "lon=" + position.coords.longitude;
  	getWeather(latitude, longitude);
  }

  /* Error function */
  function errPosition(error) {
  	switch(error.code) {
  		case error.PERMISSION_DENIED:
  		$("#data").html("Request Denied.");
  		break;
  		case error.POSITION_UNAVAILABLE:
  		$("#data").html("Location information is unavailable.");
  		break;
  		case error.TIMEOUT:
  		$("#data").html("Request timed out.");
  		break;
  		case error.UNKNOWN_ERROR:
  		$("#data").html("An unknown error occurred.");
  		break;
  	}
  }

  $(".weather-toggle").click(function() {
  	var currentUnit = $("#unit").text();
  	var newUnit = currentUnit == "C" ? "F" : "C";
    $("#unit").text(newUnit);
    
    if (newUnit == "F") {
      fahrTempDisplay = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahrTempDisplay + String.fromCharCode(176));
    } else {
      $("#temp").text(celTempDisplay + String.fromCharCode(176));
    }
  });
});

//Weather API stuff.
function getWeather(latitude, longitude) {
  var apiLink = "https://fcc-weather-api.glitch.me/api/current?";
  var unit = "C";
  var link = apiLink + latitude + "&" + longitude;

  //callback function
  $.ajax({
    url: link, success: function(value) {
      $("#city").text(value.name + ", ");
      $("#country").text(value.sys.country);
      celTempDisplay = Math.round((value.main.temp * 10) / 10);
      $("#temp").text(celTempDisplay + String.fromCharCode(176));
      $("#unit").text(unit);
      $("#description").text(value.weather[0].main);
      backgroundColour();
      showIcons(value);
    }
  });

  /* Function for Skycons */
  function showIcons(value) {
    var icon = value.weather[0].main.toLowerCase();
    var skycons = new Skycons({"color": "black"}),
    list  = ["clear-day", "cloudy", "rain", "snow", "fog"], i;

    for (i = list.length; i--; ) {
      if (icon === "clear") {
        skycons.set("weather-icon", list[0]);
        skycons.play();
      } else if (icon === "clouds") {
        skycons.set("weather-icon", list[1]);
        skycons.play();
      } else if (icon === "rain" || icon === "thunderstorm" || icon === "drizzle") {
        skycons.set("weather-icon", list[2]);
        skycons.play();
      } else if (icon === "snow") {
        skycons.set("weather-icon", list[3]);
        skycons.play();
      } else if (icon === "haze" || icon === "mist") {
        skycons.set("weather-icon", list[4]);
        skycons.play();
      } else {
        skycons.remove("weather-icon");
      }
    }
  }
  
  /* Function that changes colour in correlation to the weather
   * Displays when the background image cannot be displayed.
   */
  function backgroundColour() {
    if (celTempDisplay < 30) {
      $("body").css("background-color", "#0066dc"); // Blue 
    } else if (celTempDisplay >= 30 && celTempDisplay < 36) {
      $("body").css("background-color", "#dc6600"); // Orange 
    } else if (celTempDisplay >= 36) {
      $("body").css("background-color", "#dc0008"); // Red
    }
  }
}

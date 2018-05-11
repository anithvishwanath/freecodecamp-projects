/**
  * Wikipedia viewer v0.1
  * Anith Vishwanath, https://github.com/anithvishwanath
  * Last updated: 2018-04-27
  *
  */

var apiLink =
  "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";

$(document).ready(function() {
  $("#search-button").click(function() {
  var searchTerm = $("#user-input").val(); // get the user input
    var searchLink = apiLink + searchTerm;
    //ajax call for getting the data
    $.ajax({
      url: searchLink,
      type: "POST",
      dataType: "jsonp", //need jsonp because CORS
      success: function(response) {
        $("#search-result").empty(); //make it empty every time

        //formatting
        $("#results-header").html(
          "<h3 class='title is-4'> Search Results </h3>"
        );
        $("#separator").html("<hr>");

        //append data based on the results retrieved (default: 10)
        for (var i = 0; i < response[1].length; i++) {
          $("#search-result").append(
            "<div class='box'><strong><a href= " +
              response[3][i] +
              " target='_blank'>" +
              response[1][i] +
              "</a></strong><p>" +
              response[2][i] +
              "</p></div>"
          );
        }
      },
      error: function(errorMsg) {
        $("#search-result").html("Error");
      }
    });
  });
});

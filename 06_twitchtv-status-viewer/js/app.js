const streamers = ["ESL_SC2", "OgamingSC2", "cretetion",
      "freecodecamp", "h3h3productions", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

getStreamInfo();

function getStreamInfo() {
  $.each(streamers, function(index, streamer) {
    $.ajax({
      type: 'GET',
      url: 'https://wind-bow.glitch.me/twitch-api/streams/'+ streamer +'?callback=?', //streamers endpoint for live channels
      dataType: 'jsonp',
      success: function(data) {
        // if offline
        if (data.stream === null) {
          $.ajax({
            type: 'GET',
            url: 'https://wind-bow.glitch.me/twitch-api/channels/'+ streamer +'?callback=?', //channels endpoint for offline channels
            dataType: 'jsonp',
            success: function(data) {
              displayStreamInfo(data.display_name,
                data.logo,
                "Last streamed " + data.game,
                data.status,
                "Offline");
            }
          }); // end ajax for null data streams
        } else { // streaming/live
          displayStreamInfo(data.stream.channel.display_name,
            data.stream.channel.logo,
            "Streaming " + "<span class='live'>" + data.stream.game + "</span>",
            data.stream.channel.status,
            "Live");
        }
      }, // end success function
      error: function(jqXHR) {
        let errorMsg = '';
        if (jqXHR.status === 0) {
          errorMsg = 'Can\'t connect';
        } else if (jqXHR.status === 404) {
          errorMsg = 'Resource not found (404)';
        } else if (jqXHR.status === 500) {
          errorMsg = 'Internal Server Error (500)';
        }
        $('#streamer-info').html(errorMsg);
      } // end error function
    }); // end ajax
  }); // end loop

  function displayStreamInfo(streamer, logo, game, title, status) {
    let listStream = '<div id="streams" class="' + status.toLowerCase() + '">';
    listStream += '<div><img src="' + logo + '"class="stream-logo">';
    listStream += '<span class="stream-content"><a href="https://www.twitch.tv/' + streamer + '"target="_blank">' + streamer + '</a></span>';
    listStream += '<span class="stream-game">' + game + '</span>';
    listStream += '<span class="stream-title">' + title + '</span></div>';
    listStream += '<span class="status">' + status + '</span></div>';
    listStream += '</div>';

    $('#streamer-info').append(listStream);
  } // end displayStreamInfo function
} // end getStreamInfo function

$('button').click(function() {
  $('button').removeClass("selected");
  $(this).addClass("selected");

  let $status = $(this).attr('id');

  if ($status === "default") {
    $('.offline').show();
    $('.live').show();
  } else if ($status === "online") {
    $('.offline').hide();
    $('.live').show();
  } else if ($status === "offline") {
    $('.offline').show();
    $('.live').hide();
  }
}); // end button click event handler

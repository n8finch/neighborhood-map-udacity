(function ($) {
  $(document).ready(function () {

    /**
     * Wikipedia API Call
     */


//Set the variables and URL string


// Make the AJAX request


    $('.bcn-list-links').on('click', function () {
      var clicked = $(this).text();
      console.log(clicked);

      var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=';
      var searchTerm = clicked;
      var callback = '&prop=revisions&rvprop=content&format=json&callback=?';
      wikiURL = wikiURL + searchTerm + callback;

// Set the timeout if no response is received.
      var wikiRequestTimeout = setTimeout(function () {
        $wikiElem.text('Bummer! No results could be found to match that address...:-(');
      }, 5000);


      $.ajax({
        url: wikiURL,
        dataType: 'json',
        success: function (response) {
          console.log(response);

          var wikiTitles = response[1];
          var wikiLinks = response[3];

          for (var i = 0; i < wikiTitles.length; i++) {
            var wikiTitle = wikiTitles[i];
            var wikiLink = wikiLinks[i];
            $wikiElem.append('<li>' +
              '<a href="' + wikiLink + '">' + wikiTitle + '</a>' +
              '</li>');
          }
          ;

          clearTimeout(wikiRequestTimeout);
        }
      });


    });


    /*
     * Get Foursquare Data
     */

    var CLIENT_ID_Foursquare = '2EE11MHVU5MQHXAS4YNOTYW3WO4OLJOA0DU5OKLET1VRHNXF';
    var CLIENT_SECRET_Foursquare = 'SJYX3UAEK3HNWLRPCO4CMYWAQWLYLDAYWYHSMCBDCC3WQKYT';
    /**creating all the markers on the map**/


    /*Foursquare api ajax request*/
// $.ajax({
//   type: "GET",
//   dataType: 'json',
//   cache: false,
//   url: 'https://api.foursquare.com/v2/venues/explore',
//   data: 'limit=1&ll=' + '22.277291' + ',' + '114.169230' + '&query=' + 'The Butchers Club Burgers' + '&client_id=' + CLIENT_ID_Foursquare + '&client_secret=' + CLIENT_SECRET_Foursquare + '&v=20140806&m=foursquare',
//   async: true,
//   success: function (data) {
//
//     console.log(data);
//   },
//   error: function (data) {
//     /*callback function if error - an alert will be activaded to notify the user of the error*/
//     alert("Could not load data from foursquare!");
//   }
// });


    /**
     * Get Hotwire calls
     */

// $.ajax({
//   type: "GET",
//   cache: false,
//   url: 'http://api.hotwire.com/v1/deal/hotel?&apikey=5dpykaswx6td8dg75ghcwnjt&dest=barcelona&limit=1&callback=',
//   async: true,
//   success: function (data) {
//
//     console.log(data);
//   },
//   error: function (data) {
//     /*callback function if error - an alert will be activaded to notify the user of the error*/
//     alert("Could not load data from foursquare!");
//   }
// });
  });
}(jQuery));





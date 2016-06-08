(function ($) {
  $(document).ready(function () {

    /**
     * Wikipedia API Call
     */


    ajaxWiki = function (wikiTerm) {

      var wikiElem = $('#wikipedia-tab');
      var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=';
      var callback = '&prop=revisions&rvprop=content&format=json&callback=?';
      wikiURL = wikiURL + wikiTerm + callback;

      //hide any <p> currently displayed
      wikiElem.children().hide();

      // Set the timeout if no response is received.
      var wikiRequestTimeout = setTimeout(function () {
        wikiElem.text('Bummer! No results could be found to match that address...:-(');
      }, 5000);


      $.ajax({
        url: wikiURL,
        dataType: 'json',
        success: function (response) {
          console.log(response);

          var wikiTitle = response[1][0];
          var wikiLink = response[3][0];
          var wikiContent = response[2][0];
          var wikiDisplay =
            '<h3>' + wikiTitle + '</h3>' +
            '<p>' + wikiContent + '</p>' +
            '<a href="' + wikiLink + '" target="_blank">Read more on Wikipedia...</a>';


          wikiElem.append(wikiDisplay);


          clearTimeout(wikiRequestTimeout);
        }
      });
    };





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





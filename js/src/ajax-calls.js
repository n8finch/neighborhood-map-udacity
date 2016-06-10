/**
 * API Calls
 *
 * These are functions that serve two purposes:
 * 1. Make calls to 3rd party APIs
 * 2. Modify the DOM with the information in the callback.
 */


/**
 * Wikipedia API Call
 */


ajaxWiki = function (wikiTerm) {

  // ID of the element we will modify
  var wikiElem = $('#wikipedia-tab');

  //Build the URL and Callback for the jax request
  var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=';
  var callback = '&prop=revisions&rvprop=content&format=json&callback=?';
  wikiURL = wikiURL + wikiTerm + callback;

  //hide any <p> currently displayed
  wikiElem.children().fadeOut(1000);

  // Set the timeout if no response is received.
  var wikiRequestTimeout = setTimeout(function () {
    wikiElem.text('Bummer! No results could be found to match that address...:-(');
  }, 5000);


  $.ajax({
    url: wikiURL,
    dataType: 'json',
    success: function (response) {

      //Assign Responses from Wikipedia to variables for building elements
      var wikiTitle = response[1][0];
      var wikiLink = response[3][0];
      var wikiContent = response[2][0];
      var wikiDisplay =
        '<h3>' + wikiTitle + '</h3>' +
        '<p>' + wikiContent + '</p>' +
        '<a href="' + wikiLink + '" target="_blank">Read more on Wikipedia...</a>';


      wikiElem.append(wikiDisplay);


      clearTimeout(wikiRequestTimeout);
    }, error: function (response) {
      //callback function if error - an alert will be activated to notify the user of the error
      alert("Could not load data from wikipedia!");
    }
  });
};


/*
 * Get Foursquare Data
 */

ajaxFourSquare = function (data) {

  // ID of the element we will modify
  var foursquareElem = $('#foursquare-tab');

  //API Keys
  var CLIENT_ID_Foursquare = '2EE11MHVU5MQHXAS4YNOTYW3WO4OLJOA0DU5OKLET1VRHNXF';
  var CLIENT_SECRET_Foursquare = 'SJYX3UAEK3HNWLRPCO4CMYWAQWLYLDAYWYHSMCBDCC3WQKYT';


  //hide any <div> currently displayed
  foursquareElem.children().fadeOut(1000);

  $.ajax({
    type: "GET",
    dataType: 'json',
    cache: false,
    url: 'https://api.foursquare.com/v2/venues/explore?',
    data: 'limit=5&ll=' + data + '&radius=5000&venuePhotos=1&client_id=' + CLIENT_ID_Foursquare + '&client_secret=' + CLIENT_SECRET_Foursquare + '&v=20140806&m=foursquare',
    async: true,
    success: function (response) {
      var responseArr = response.response.groups[0].items;

      for (var i = 0; i < responseArr.length; i++) {
        var title, content, photosArr, photoURL, url;
        var self = responseArr[i];

        title = self.venue.name;
        content = self.tips[0].text;
        photosArr = self.venue.photos.groups[0].items[0];
        photoURL = photosArr.prefix + '100x100' + photosArr.suffix;
        url = self.tips[0].canonicalUrl;

        var foursquareDisplay =
          '<div class="foursquare-item">' +
          '<img src="' + photoURL + '" alt=""/>' +
          '<h3>' + title + '</h3>' +
          '<p>' + content + '</p>' +
          '<a href="' + url + '" target="_blank">Read more on FourSquare...</a>' +
          '</div>';


        foursquareElem.append(foursquareDisplay).hide().fadeIn(700);

      }


    },
    error: function (response) {
      //callback function if error - an alert will be activated to notify the user of the error
      alert("Could not load data from foursquare!");
    }
  });

};


/**
 * Get Hotwire calls
 */

// ajaxHotwire = function({
//   type: "GET",
//   cache: false,
//   url: 'http://api.hotwire.com/v1/deal/hotel?&apikey=5dpykaswx6td8dg75ghcwnjt&dest=barcelona&limit=1&callback=',
//   async: true,
//   success: function (data) {
//
//     console.log(data);
//   },
//   error: function (data) {
//     alert("Could not load data from foursquare!");
//   }
// });






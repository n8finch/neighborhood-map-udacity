(function ($) {

  $(document).ready(function () {

    /**
     * Build the base array
     */

    var bcnArr = [];

    bcnArr.push(sagradaFamilia, parcGuell, ovejaNegra, bonMercat, boqueria);

    console.log(bcnArr);

    /**
     * Build the map
     */

    var initMap = (function () {
      map = new google.maps.Map(document.getElementById('map_canvas'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    });

    initMap();

    //
    // var baseMap = (function () {
    //   var myLatlng = new google.maps.LatLng(base.lat, base.lon),
    //     mapCenter = new google.maps.LatLng(base.lat, base.lon),
    //     mapCanvas = document.getElementById('map_canvas'),
    //     mapOptions = {
    //       center: mapCenter,
    //       zoom: 13,
    //       scrollwheel: false,
    //       draggable: true,
    //       disableDefaultUI: true,
    //       mapTypeId: google.maps.MapTypeId.ROADMAP
    //     },
    //     map = new google.maps.Map(mapCanvas, mapOptions),
    //     contentString =
    //       '<div id="content">'+
    //       '<div id="siteNotice">'+
    //       '</div>'+
    //       '<h1 id="firstHeading" class="firstHeading">Title Heading</h1>'+
    //       '<div id="bodyContent"'+
    //       '<p>info here</p>'+
    //       '</div>'+
    //       '</div>',
    //     infowindow = new google.maps.InfoWindow({
    //       content: contentString,
    //       maxWidth: 300
    //     });
    //
    //
    //   for (var i = 0; i < 3; i++) {
    //     var self = bcnArr[i];
    //     console.log(self);
    //
    //     myLatlng = new google.maps.LatLng(self.lat, self.lon);
    //
    //     marker = new google.maps.Marker({
    //       position:  myLatlng,
    //       map: map,
    //       title: self.name
    //     });
    //
    //     // console.log(marker);
    //   };
    //
    //   return {
    //     init: function () {
    //       map.set('styles', [{
    //         featureType: 'landscape',
    //         elementType: 'geometry',
    //         stylers: [
    //           { hue: '#ffff00' },
    //           { saturation: 30 },
    //           { lightness: 10}
    //         ]}
    //       ]);
    //
    //       google.maps.event.addListener(marker, 'click', function () {
    //         infowindow.open(map,marker);
    //       });
    //     }
    //   };
    // }());
    //
    // baseMap.init();


    /**


     /**
     * Build the List from the BCN Array
     */

    //TODO build the list


    /**
     * Get the Wikipedia Articles
     */

    //Set the variables and URL string
    // var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=';
    // var searchTerm = 'barcelona';
    // var callback = '&prop=revisions&rvprop=content&format=json&callback=?';
    // wikiURL = wikiURL + searchTerm + callback;

    //Set the timeout if no response is received.
    // var wikiRequestTimeout = setTimeout(function () {
    //   $wikiElem.text('Bummer! No results could be found to match that address...:-(');
    // }, 5000);

    // Make the AJAX request
    // $.ajax({
    //   url: wikiURL,
    //   dataType: 'json',
    //   success: function (response) {
    //     console.log(response);

    // var wikiTitles = response[1];
    // var wikiLinks = response[3];

    // for (var i = 0; i < wikiTitles.length; i++) {
    //   var wikiTitle = wikiTitles[i];
    //   var wikiLink = wikiLinks[i];
    //   $wikiElem.append('<li>' +
    //     '<a href="' + wikiLink + '">' + wikiTitle + '</a>' +
    //     '</li>');
    // };

    //     clearTimeout(wikiRequestTimeout);
    //   }
    // });


    /**
     * Get the Airbnb Datas
     */

    //Set the variables and URL string
    // var airbnbURL = 'https://api.airbnb.com/v2/search_results?client_id=';
    // var clientID = '996467250304-puv3b6pb8252umq2kqamd3bhqhghvar7.apps.googleusercontent.com';
    // var airbnbVars = '3092nxybyb0otqw18e8nh5nty&locale=en-US&currency=USD&_format=for_search_results_with_minimal_pricing&_limit=10&_offset=0&fetch_facets=true&guests=1&ib=false&ib_add_photo_flow=true&location=barcelona&min_bathrooms=0&min_bedrooms=0&min_beds=1&min_num_pic_urls=10&price_max=210&price_min=40&sort=1';
    //
    // airbnbURL = airbnbURL + clientID + airbnbVars ;
    //
    // //Set the timeout if no response is received.
    // var airbnbRequestTimeout = setTimeout(function () {
    //   var temp = 'Bummer! No results could be found to match that address...:-(';
    // }, 5000);
    //
    // // Make the AJAX request
    // $.ajax({
    //   url: airbnbURL,
    //   dataType: 'jsonp',
    //   isLocal: true,
    //   success: function (response) {
    //     console.log(response);
    //
    //     // var wikiTitles = response[1];
    //     // var wikiLinks = response[3];
    //
    //     // for (var i = 0; i < wikiTitles.length; i++) {
    //     //   var wikiTitle = wikiTitles[i];
    //     //   var wikiLink = wikiLinks[i];
    //     //   $wikiElem.append('<li>' +
    //     //     '<a href="' + wikiLink + '">' + wikiTitle + '</a>' +
    //     //     '</li>');
    //     // };
    //
    //     clearTimeout(wikiRequestTimeout);
    //   }
    // });
    //


    /**
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
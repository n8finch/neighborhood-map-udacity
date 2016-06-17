/**
 * Contains the Model Data for the app
 */

var base =   {
  name: 'Barcelona',
  lat: 41.3907242,
  lon: 2.1773645,
  info: 'Barcelona is a nice place!',
  wiki: 'barcelona',
  foursquare: 'barcelona2'
};

var bcnArr = [
  {
    name: 'Sagrada Familia',
    lat: 41.403123,
    lon: 2.173728,
    info: 'A must see! This is Gaudi\'s enduring legacy, still under construction.',
    wiki: 'sagrada familia'

  },
  {
    name: 'Parc Güell',
    lat: 41.413610,
    lon: 2.153136,
    info: 'An amazing place to walk around, mystical, and, unless things have changed, free to the public!',
    wiki: 'parc güell'
  },
  {
    name: 'L\'Ovella Negra',
    lat: 41.3831457,
    lon: 2.1682898,
    info: 'This is the best place to get sangria in... all Spain!',
    wiki: 'el raval'
  },
  {
    name: 'Bon Mercat Roasters',
    lat: 41.3835709,
    lon: 2.1777242,
    info: 'This is the best coffee and drinking chocolate in Barcelona, and probably the world.',
    wiki: 'gothic quarter barcelona'
  },
  {
    name: 'La Boqueria',
    lat: 41.3813886,
    lon: 2.1718393,
    info: 'This is the classic outdoor market place, fresh fruits, food stands, etc. So fun!',
    wiki: 'la rambla barcelona'
  }
];





/**
 * Components taken from Refills: http://refills.bourbon.io/
 */

/**
 * Sliding Panel
 */

$('ul#bcn-list,.sliding-panel-button,.sliding-panel-fade-screen,.sliding-panel-close,.filter-list-elements').on('click',function (e) {
  $('.sliding-panel-content,.sliding-panel-fade-screen').toggleClass('is-visible');
  e.preventDefault();
});

$('.accordion-tabs-minimal').each(function(index) {
  $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
});
$('.accordion-tabs-minimal').on('click', 'li > a.tab-link', function(event) {
  if (!$(this).hasClass('is-active')) {
    event.preventDefault();
    var accordionTabs = $(this).closest('.accordion-tabs-minimal');
    accordionTabs.find('.is-open').removeClass('is-open').hide();

    $(this).next().toggleClass('is-open').toggle();
    accordionTabs.find('.is-active').removeClass('is-active');
    $(this).addClass('is-active');
  } else {
    event.preventDefault();
  }
});



/**
 * The engine making everything run.
 *
 * The ViewModel creates the
 *
 */


var ViewModel = function () {

  var self = this;
  //this array is displayed on the map and in the list of locations in the menu
  self.markersVisible = ko.observableArray([]);
  //this array saves all the locations displayed and not displayed
  self.markersMap = ko.observableArray([]);
  //this array keeps the info window information and binds it to the
  self.infoWindows = ko.observableArray([]);
  //create the observable for the filtering list on the menu
  self.filterList = ko.observable('');
  //create the observable for Foursquare content
  self.foursquareContent = ko.observable('Init');

  function initialize() {
    //create the map
    map = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: 13,
      center: new google.maps.LatLng(base.lat, base.lon)
    });
    var infowindow = new google.maps.InfoWindow({});


    //push all the markers on the map to the observable arrays
    bcnArr.forEach(function (item) {
      //creation of new markers
      // https://developers.google.com/maps/documentation/javascript/markers#animate
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(item.lat, item.lon),
        map: map,
        title: item.name,
        info: item.info,
        wiki: item.wiki,
        foursquare: item.lat + ',' + item.lon,
        /**if the location on the list is clicked than the info window of the marker will appear-**/
        listClick: function (thisMarker) {

          //make ajax calls on menu item clicks
          console.log('from the viewmodel: ' + ajaxFourSquare(marker.foursquare));

          ajaxWiki(marker.wiki);
          infowindow.setContent(thisMarker.info);
          infowindow.open(map, thisMarker);

          if (marker.getAnimation() == null) {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
              marker.setAnimation(null);
            }, 4000);
          } else {
            marker.setAnimation(null);
          }

        }
      });
      self.markersVisible.push(marker);
      self.markersMap.push(marker);
      marker.addListener('click', function () {

        //load the ajax call marker clicks
        console.log('from the viewmodel: ' + ajaxFourSquare(marker.foursquare));

        ajaxWiki(marker.wiki);

        //add animation to map markers
        if (marker.getAnimation() == null) {
          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function () {
            marker.setAnimation(null);
          }, 4000);
        } else {
          marker.setAnimation(null);
        }
        infowindow.setContent(marker.info);
        infowindow.open(map, marker);
      });
    });


  }


  //subscribe the filterList to any changes made in the input box on the menu.
  self.filterList.subscribe(function (value) {
    //make all markers as hidden and remove them from the visible markers menu list
    self.markersMap().forEach(function (item) {
      item.setVisible(false);
      self.markersVisible.remove(item);
    });
    self.markersMap().forEach(function (item) {
      if (item.title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        //if the location is relevant to the search, make the marker and list item visible
        item.setVisible(true);
        self.markersVisible.push(item);
      }
    });
  });

  google.maps.event.addDomListener(window, 'load', initialize);
};
/**
 * Contains reusable functions called in app.js to abstract them
 */



//Create Variables
var base = bcnArr[0];
baseLatLon = {lat: base.lat, lng: base.lon};
var baseLat = base.lat;
var baseLon = base.lon;





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
    dataType: 'json'
    })
    .done( function (response) {

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
    })
    .fail( function (response) {
      //callback function if error - an alert will be activated to notify the user of the error
      var wikiDisplay =
        '<p>Bummer!... Could not load data from Wikipedia! Make sure you are connected to the Internet, or try again later.</p>';

      wikiElem.append(wikiDisplay);
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
    async: true
  })
    .done ( function (response) {
      var responseArr = response.response.groups[0].items;

      var foursquareDisplay = '';

      for (var i = 0; i < responseArr.length; i++) {
        var title, content, photosArr, photoURL, url;
        var self = responseArr[i];


        title = self.venue.name;
        content = self.tips[0].text ? self.tips[0].text : "No tips here!";
        photosArr = self.venue.photos.groups[0].items[0];
        photoURL = photosArr.prefix + '100x100' + photosArr.suffix;
        url = self.tips[0].canonicalUrl;

        foursquareDisplay +=
          '<div class="foursquare-item">' +
          '<img src="' + photoURL + '" alt=""/>' +
          '<h3>' + title + '</h3>' +
          '<p>' + content + '</p>' +
          '<a href="' + url + '" target="_blank">Read more on FourSquare...</a>' +
          '</div>';




      }

      console.log('from the ajax call: ' + foursquareDisplay);
      //foursquareElem.append(foursquareDisplay).hide().fadeIn(700);
      return foursquareDisplay;

    })
      .fail( function (response) {
      //callback function if error - an alert will be activated to notify the user of the error
      var foursquareDisplay =
        '<p>Bummer!... Could not load data from Foursquare! Make sure you are connected to the Internet, or try again later.</p>';

      foursquareElem.append(foursquareDisplay);
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





/**
 * Apply the ViewModel bindings, build the map, start the app up.
 *
 * Nothing displays without this!
 */

// ko.applyBindings(new ViewModel());

/**
 * Load initial info about Barcelona in the tabs section
 */

var googleError = function() {
  alert('Bummer... Looks like Google Maps is not loading. Please try again later.');
};
var googleSuccess = function() {

  ko.applyBindings(new ViewModel());

};

//Get latitude and longitude from the base array.
var baseLatLon = base.lat + ',' + base.lon;

//Make initial calls to Wikipedia and Foursquare for Barcelona information.
ajaxFourSquare(baseLatLon);
ajaxWiki(base.wiki);



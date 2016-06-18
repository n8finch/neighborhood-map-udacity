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
  //create the observable for Wikipedia content
  self.wikiTitle = ko.observable('test');
  self.wikiContent = ko.observable('testing');
  self.wikiLink = ko.observable('http://www.google.com');
  //create the observables for Foursquare content
  self.fstitle = ko.observable('title');
  self.fscontent = ko.observable('content');
  self.fsphotosArr = ko.observable('photosArr');
  self.fsphotoURL = ko.observable('img/parlacat.jpg');
  self.fsurl =ko.observable('fsurl');

  /**
   * Wikipedia API Call
   */

  self.ajaxWiki = function (wikiTerm) {

    // ID of the element we will modify
    var wikiElem = $('#wikipedia-tab');

    //Build the URL and Callback for the jax request
    var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=';
    var callback = '&prop=revisions&rvprop=content&format=json&callback=?';
    wikiURL = wikiURL + wikiTerm + callback;

    //hide any <p> currently displayed
    // wikiElem.children().fadeOut(1000);

    // Set the timeout if no response is received.
    var wikiRequestTimeout = setTimeout(function () {
      wikiElem.text('Bummer! No results could be found to match that address...:-(');
    }, 5000);


    $.ajax({
      url: wikiURL,
      dataType: 'json'
    })
      .done(function (response) {

        //Assign Responses from Wikipedia to variables for building elements
        self.wikiTitle = response[1][0];
        self.wikiLink = response[3][0];
        self.wikiContent = response[2][0];

        console.log('from inside the Wikipedia ajax call: ' + self.wikiTitle);

        clearTimeout(wikiRequestTimeout);
      })
      .fail(function (response) {
        //callback function if error - an alert will be activated to notify the user of the error
        var wikiDisplay =
          '<p>Bummer!... Could not load data from Wikipedia! Make sure you are connected to the Internet, or try again later.</p>';

        wikiElem.append(wikiDisplay);
      });
  };

  console.log('from outside the Wikipedia ajax call: ' + self.wikiTitle);

  /*
   * Get Foursquare Data
   */

  self.ajaxFourSquare = function (data) {

    // ID of the element we will modify
    var foursquareElem = $('#foursquare-tab');

    //API Keys
    var CLIENT_ID_Foursquare = '2EE11MHVU5MQHXAS4YNOTYW3WO4OLJOA0DU5OKLET1VRHNXF';
    var CLIENT_SECRET_Foursquare = 'SJYX3UAEK3HNWLRPCO4CMYWAQWLYLDAYWYHSMCBDCC3WQKYT';


    //hide any <div> currently displayed
    // foursquareElem.children().fadeOut(1000);

    $.ajax({
      type: "GET",
      dataType: 'json',
      cache: false,
      url: 'https://api.foursquare.com/v2/venues/explore?',
      data: 'limit=5&ll=' + data + '&radius=5000&venuePhotos=1&client_id=' + CLIENT_ID_Foursquare + '&client_secret=' + CLIENT_SECRET_Foursquare + '&v=20140806&m=foursquare',
      async: true
    })
      .done(function (response) {
        var responseArr = response.response.groups[0].items;

        var foursquareDisplay = '';

        for (var i = 0; i < responseArr.length; i++) {

          var self = responseArr[i];

          self.fstitle = responseArr[i].venue.name;
          self.fscontent = responseArr[i].tips[0].text ? self.tips[0].text : "No tips here!";
          self.fsphotosArr = responseArr[i].venue.photos.groups[0].items[0];
          self.fsphotoURL = self.fsphotosArr.prefix + '100x100' + self.fsphotosArr.suffix;
          self.fsurl = responseArr[i].tips[0].canonicalUrl;
          
        }

        console.log('from inside the Foursquare ajax call: ' + self.fstitle);

      })
      .fail(function (response) {
        //callback function if error - an alert will be activated to notify the user of the error
        var foursquareDisplay =
          '<p>Bummer!... Could not load data from Foursquare! Make sure you are connected to the Internet, or try again later.</p>';

        foursquareElem.append(foursquareDisplay);
      });
  };

  console.log('from outside the Foursquare ajax call: ' + self.fstitle);


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
          self.ajaxFourSquare(marker.foursquare);
          self.ajaxWiki(marker.wiki);
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
        self.ajaxFourSquare(marker.foursquare);

        self.ajaxWiki(marker.wiki);

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

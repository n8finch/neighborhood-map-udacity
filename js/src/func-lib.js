/**
 * Contains reusable functions called in app.js to abstract them
 */



//Create Variables
var base = bcnArr[0];
baseLatLon = {lat: base.lat, lng: base.lon};
var baseLat = base.lat;
var baseLon = base.lon;

/**
 * Map builder
 */

var initMap = function () {

  map = new google.maps.Map(document.getElementById('map_canvas'), {
    center: baseLatLon,
    zoom: 13
  });

};


/**
 * Marker builder
 */

var createMarker = function (latlon, title, content) {

  marker = new google.maps.Marker({
    position: latlon,
    map: map,
    title: title,
    content: 'YO!'
  });

  var infowindow = new google.maps.InfoWindow({
    content: content
  });

  marker.addListener('click', function () {
    infowindow.open(map, marker);
  });

  // Close infoWindow on next click
  map.addListener('click', function () {
    infowindow.close();
  });

};


/**
 * Build BCN List from array
 */

var buildBCNList = function (self) {

  for (var i = 1; i < self.length; i++) {
    var item = '<li class="bcn-list-item"><a class="bcn-list-links" href="#">' +
      self[i].name +
      '</a></li>';

    $('#bcn-list').append(item);
  }

};



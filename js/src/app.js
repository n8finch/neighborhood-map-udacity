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
// ajaxFourSquare(baseLatLon);
// ajaxWiki(base.wiki);



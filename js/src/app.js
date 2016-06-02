(function ($) {

  $(document).ready(function () {

    /**
     * Build the map
     */

    initMap();

    /**
     * Draw the markers and info windows
     */

    for (var i = 1; i < bcnArr.length; i++) {

      var self = bcnArr[i];
      var currentName = self.name;
      var currentLatLon = {lat: self.lat, lng: self.lon};
      var windowInfo = self.info;

      createMarker(currentLatLon, currentName, windowInfo);

    }
    


    /**
     * Build the List from the BCN Array
     */


    buildBCNList(bcnArr);


    /**
     * Get the Wikipedia Articles
     */


    /**
     * Get Four Square Data
     */


  });

}(jQuery));
var ViewModel = function() {

  var self = this;
  /**the array of visible markers is the one the will be displayed on the mapl and in the list of resturants**/
  self.markersVisible = ko.observableArray([]);
  /**the array of markers will save all the locations - the ones that are displayed and the ones that are not displyed**/
  self.markersMap = ko.observableArray([]);
  self.infoWindows = ko.observableArray([]);

  function initialize() {
    /**creation of the map**/
    map = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: 13,
      center: new google.maps.LatLng(base.lat, base.lon)
    });
    var infowindow = new google.maps.InfoWindow({});



    /**creating all the markers on the map**/
    bcnArr.forEach(function (item) {
      /*creation of new markers*/
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(item.lat, item.lon),
        map: map,
        title: item.name,
        info: item.info,
        // URL: item.URL,
        // rating: item.rating,
        /**if the location on the list is clicked than the info window of the marker will appear-**/
        listClick: function (thisMarker) {
          infowindow.setContent(thisMarker.info);
          infowindow.open(map, thisMarker);
        }
      });
      self.markersVisible.push(marker);
      self.markersMap.push(marker);
      marker.addListener('click', function () {
        /*if the animation is allready active, clicking again will stop it*/
        if (marker.getAnimation() == null) {
          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function () {
            marker.setAnimation(null);
          }, 2000);
        } else {
          marker.setAnimation(null);
        }
        infowindow.setContent(marker.info);
        infowindow.open(map, marker);
      });
    });

    var input = document.getElementById('search-filter');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    markers = [];
    // Bias the SearchBox results towards current map's viewport.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });

  }


  google.maps.event.addDomListener(window, 'load', initialize);
};

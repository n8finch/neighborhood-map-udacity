var ViewModel = function () {

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
        wiki: item.wiki,
        foursquare: item.foursquare,
        /**if the location on the list is clicked than the info window of the marker will appear-**/
        listClick: function (thisMarker) {
          ajaxWiki(marker.wiki);
          infowindow.setContent(thisMarker.info);
          infowindow.open(map, thisMarker);
        }
      });
      self.markersVisible.push(marker);
      self.markersMap.push(marker);
      marker.addListener('click', function () {

        //load the ajax call on a
        ajaxWiki(marker.wiki);

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


  }

  self.filterList = ko.observable('');

  self.filterList.subscribe(function (value) {
    /**mark all markers as invisible and remove them from the visible markers list**/
    self.markersMap().forEach(function (item) {
      item.setVisible(false);
      self.markersVisible.remove(item);
    });
    self.markersMap().forEach(function (item) {
      if (item.title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        /**if the place is relevant to the search, make the marker visible and add the marker to the visible markers list**/
        item.setVisible(true);
        self.markersVisible.push(item);
      }
    });
  });

  google.maps.event.addDomListener(window, 'load', initialize);
};

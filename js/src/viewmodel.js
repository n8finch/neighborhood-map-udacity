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

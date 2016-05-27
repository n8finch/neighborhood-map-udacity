/**
 * Components taken from Refills: http://refills.bourbon.io/
 */

/**
 * Sliding Panel
 */
var bittersMap = (function () {
  var myLatlng = new google.maps.LatLng(59.342457, 18.057340),
    mapCenter = new google.maps.LatLng(59.340458, 18.057340),
    mapCanvas = document.getElementById('map_canvas'),
    mapOptions = {
      center: mapCenter,
      zoom: 13,
      scrollwheel: false,
      draggable: true,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    map = new google.maps.Map(mapCanvas, mapOptions),
    contentString =
      '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">thoughtbot</h1>'+
      '<div id="bodyContent"'+
      '<p>Sveavägen 98</p>'+
      '</div>'+
      '</div>',
    infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 300
    }),
    marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'thoughtbot (Sweden)'
    });

  return {
    init: function () {
      map.set('styles', [{
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
          { hue: '#ffff00' },
          { saturation: 30 },
          { lightness: 10}
        ]}
      ]);

      google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map,marker);
      });
    }
  };
}());

bittersMap.init();
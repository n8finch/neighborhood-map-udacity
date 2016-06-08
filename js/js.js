/**
 * Contains the Model Data for the app
 */

var bcnArr = [
  {
    name: 'Barcelona',
    lat: 41.3907242,
    lon: 2.1773645,
    info: 'Barcelona is a nice place!',
  },
  {
    name: 'Sagrada Familia',
    lat: 41.403123,
    lon: 2.173728,
    info: 'Sagrada Familia is a nice place!'
  },
  {
    name: 'Parc Güell',
    lat: 41.413610,
    lon: 2.153136,
    info: 'Parc Güell is a nice place!'
  },
  {
    name: 'L\'Ovella Negra',
    lat: 41.3831457,
    lon: 2.1682898,
    info: 'L\'Ovella Negra is a nice place!'
  },
  {
    name: 'Bon Mercat Roasters',
    lat: 41.3835709,
    lon: 2.1777242,
    info: 'Bon Mercat Roasters is a nice place!'
  },
  {
    name: 'La Boqueria',
    lat: 41.3813886,
    lon: 2.1718393,
    info: 'Mercado de la Boqueria is a nice place!'
  }
];


// class BCN {
//   constructor(name, lat, lon, info) {
//     this.name = name;
//     this.lat = lat;
//     this.lon = lon;
//     this.info = info;
//   }
// }
//
// var base = new BCN( 'Barcelona', 41.3907242, 2.1773645, 'Barcelona is a nice place!' );
// var sagradaFamilia = new BCN( 'Sagrada Familia', 41.403123, 2.173728, 'Sagrada Familia is a nice place!' );
// var parcGuell = new BCN( 'Parc Güell', 41.413610, 2.153136 , 'Parc Güell is a nice place!' );
// var ovejaNegra = new BCN( 'L\'Ovella Negra', 41.3831457, 2.1682898, 'L\'Ovella Negra is a nice place!' );
// var bonMercat = new BCN( 'Bon Mercat Roasters', 41.3835709, 2.1777242, 'Bon Mercat Roasters is a nice place!' );
// var boqueria = new BCN( 'Mercado de la Boqueria', 41.3813886, 2.1718393, 'Mercado de la Boqueria is a nice place!' );


var CryptoJS=CryptoJS||function(a,b){var c={},d=c.lib={},e=function(){},f=d.Base={extend:function(a){e.prototype=this;var b=new e;return a&&b.mixIn(a),b.hasOwnProperty("init")||(b.init=function(){b.$super.init.apply(this,arguments)}),b.init.prototype=b,b.$super=this,b},create:function(){var a=this.extend();return a.init.apply(a,arguments),a},init:function(){},mixIn:function(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},g=d.WordArray=f.extend({init:function(a,c){a=this.words=a||[],this.sigBytes=c!=b?c:4*a.length},toString:function(a){return(a||i).stringify(this)},concat:function(a){var b=this.words,c=a.words,d=this.sigBytes;if(a=a.sigBytes,this.clamp(),d%4)for(var e=0;a>e;e++)b[d+e>>>2]|=(c[e>>>2]>>>24-8*(e%4)&255)<<24-8*((d+e)%4);else if(65535<c.length)for(e=0;a>e;e+=4)b[d+e>>>2]=c[e>>>2];else b.push.apply(b,c);return this.sigBytes+=a,this},clamp:function(){var b=this.words,c=this.sigBytes;b[c>>>2]&=4294967295<<32-8*(c%4),b.length=a.ceil(c/4)},clone:function(){var a=f.clone.call(this);return a.words=this.words.slice(0),a},random:function(b){for(var c=[],d=0;b>d;d+=4)c.push(4294967296*a.random()|0);return new g.init(c,b)}}),h=c.enc={},i=h.Hex={stringify:function(a){var b=a.words;a=a.sigBytes;for(var c=[],d=0;a>d;d++){var e=b[d>>>2]>>>24-8*(d%4)&255;c.push((e>>>4).toString(16)),c.push((15&e).toString(16))}return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;b>d;d+=2)c[d>>>3]|=parseInt(a.substr(d,2),16)<<24-4*(d%8);return new g.init(c,b/2)}},j=h.Latin1={stringify:function(a){var b=a.words;a=a.sigBytes;for(var c=[],d=0;a>d;d++)c.push(String.fromCharCode(b[d>>>2]>>>24-8*(d%4)&255));return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;b>d;d++)c[d>>>2]|=(255&a.charCodeAt(d))<<24-8*(d%4);return new g.init(c,b)}},k=h.Utf8={stringify:function(a){try{return decodeURIComponent(escape(j.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data")}},parse:function(a){return j.parse(unescape(encodeURIComponent(a)))}},l=d.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new g.init,this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=k.parse(a)),this._data.concat(a),this._nDataBytes+=a.sigBytes},_process:function(b){var c=this._data,d=c.words,e=c.sigBytes,f=this.blockSize,h=e/(4*f),h=b?a.ceil(h):a.max((0|h)-this._minBufferSize,0);if(b=h*f,e=a.min(4*b,e),b){for(var i=0;b>i;i+=f)this._doProcessBlock(d,i);i=d.splice(0,b),c.sigBytes-=e}return new g.init(i,e)},clone:function(){var a=f.clone.call(this);return a._data=this._data.clone(),a},_minBufferSize:0});d.Hasher=l.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a),this.reset()},reset:function(){l.reset.call(this),this._doReset()},update:function(a){return this._append(a),this._process(),this},finalize:function(a){return a&&this._append(a),this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,c){return new a.init(c).finalize(b)}},_createHmacHelper:function(a){return function(b,c){return new m.HMAC.init(a,c).finalize(b)}}});var m=c.algo={};return c}(Math);!function(){var a=CryptoJS,b=a.lib,c=b.WordArray,d=b.Hasher,e=[],b=a.algo.SHA1=d.extend({_doReset:function(){this._hash=new c.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(a,b){for(var c=this._hash.words,d=c[0],f=c[1],g=c[2],h=c[3],i=c[4],j=0;80>j;j++){if(16>j)e[j]=0|a[b+j];else{var k=e[j-3]^e[j-8]^e[j-14]^e[j-16];e[j]=k<<1|k>>>31}k=(d<<5|d>>>27)+i+e[j],k=20>j?k+((f&g|~f&h)+1518500249):40>j?k+((f^g^h)+1859775393):60>j?k+((f&g|f&h|g&h)-1894007588):k+((f^g^h)-899497514),i=h,h=g,g=f<<30|f>>>2,f=d,d=k}c[0]=c[0]+d|0,c[1]=c[1]+f|0,c[2]=c[2]+g|0,c[3]=c[3]+h|0,c[4]=c[4]+i|0},_doFinalize:function(){var a=this._data,b=a.words,c=8*this._nDataBytes,d=8*a.sigBytes;return b[d>>>5]|=128<<24-d%32,b[(d+64>>>9<<4)+14]=Math.floor(c/4294967296),b[(d+64>>>9<<4)+15]=c,a.sigBytes=4*b.length,this._process(),this._hash},clone:function(){var a=d.clone.call(this);return a._hash=this._hash.clone(),a}});a.SHA1=d._createHelper(b),a.HmacSHA1=d._createHmacHelper(b)}(),function(){var a=CryptoJS,b=a.enc.Utf8;a.algo.HMAC=a.lib.Base.extend({init:function(a,c){a=this._hasher=new a.init,"string"==typeof c&&(c=b.parse(c));var d=a.blockSize,e=4*d;c.sigBytes>e&&(c=a.finalize(c)),c.clamp();for(var f=this._oKey=c.clone(),g=this._iKey=c.clone(),h=f.words,i=g.words,j=0;d>j;j++)h[j]^=1549556828,i[j]^=909522486;f.sigBytes=g.sigBytes=e,this.reset()},reset:function(){var a=this._hasher;a.reset(),a.update(this._iKey)},update:function(a){return this._hasher.update(a),this},finalize:function(a){var b=this._hasher;return a=b.finalize(a),b.reset(),b.finalize(this._oKey.clone().concat(a))}})}(),function(){var a=CryptoJS,b=a.lib.WordArray;a.enc.Base64={stringify:function(a){var b=a.words,c=a.sigBytes,d=this._map;a.clamp(),a=[];for(var e=0;c>e;e+=3)for(var f=(b[e>>>2]>>>24-8*(e%4)&255)<<16|(b[e+1>>>2]>>>24-8*((e+1)%4)&255)<<8|b[e+2>>>2]>>>24-8*((e+2)%4)&255,g=0;4>g&&c>e+.75*g;g++)a.push(d.charAt(f>>>6*(3-g)&63));if(b=d.charAt(64))for(;a.length%4;)a.push(b);return a.join("")},parse:function(a){var c=a.length,d=this._map,e=d.charAt(64);e&&(e=a.indexOf(e),-1!=e&&(c=e));for(var e=[],f=0,g=0;c>g;g++)if(g%4){var h=d.indexOf(a.charAt(g-1))<<2*(g%4),i=d.indexOf(a.charAt(g))>>>6-2*(g%4);e[f>>>2]|=(h|i)<<24-8*(f%4),f++}return b.create(e,f)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),window.url=function(){function a(a){return!isNaN(parseFloat(a))&&isFinite(a)}return function(b,c){var d=c||window.location.toString();if(!b)return d;b=b.toString(),"//"===d.substring(0,2)?d="http:"+d:1===d.split("://").length&&(d="http://"+d),c=d.split("/");var e={auth:""},f=c[2].split("@");1===f.length?f=f[0].split(":"):(e.auth=f[0],f=f[1].split(":")),e.protocol=c[0],e.hostname=f[0],e.port=f[1]||("https"===e.protocol.split(":")[0].toLowerCase()?"443":"80"),e.pathname=(c.length>3?"/":"")+c.slice(3,c.length).join("/").split("?")[0].split("#")[0];var g=e.pathname;"/"===g.charAt(g.length-1)&&(g=g.substring(0,g.length-1));var h=e.hostname,i=h.split("."),j=g.split("/");if("hostname"===b)return h;if("domain"===b)return/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(h)?h:i.slice(-2).join(".");if("sub"===b)return i.slice(0,i.length-2).join(".");if("port"===b)return e.port;if("protocol"===b)return e.protocol.split(":")[0];if("auth"===b)return e.auth;if("user"===b)return e.auth.split(":")[0];if("pass"===b)return e.auth.split(":")[1]||"";if("path"===b)return e.pathname;if("."===b.charAt(0)){if(b=b.substring(1),a(b))return b=parseInt(b,10),i[0>b?i.length+b:b-1]||""}else{if(a(b))return b=parseInt(b,10),j[0>b?j.length+b:b]||"";if("file"===b)return j.slice(-1)[0];if("filename"===b)return j.slice(-1)[0].split(".")[0];if("fileext"===b)return j.slice(-1)[0].split(".")[1]||"";if("?"===b.charAt(0)||"#"===b.charAt(0)){var k=d,l=null;if("?"===b.charAt(0)?k=(k.split("?")[1]||"").split("#")[0]:"#"===b.charAt(0)&&(k=k.split("#")[1]||""),!b.charAt(1))return k;b=b.substring(1),k=k.split("&");for(var m=0,n=k.length;n>m;m++)if(l=k[m].split("="),l[0]===b)return l[1]||"";return null}}return""}}(),"undefined"!=typeof jQuery&&jQuery.extend({url:function(a,b){return window.url(a,b)}}),function(){"use strict";function a(){}function b(a,b,h){h=new f(h).get(),this._httpMethod=new c(a).get(),this._url=new d(b).get(),this._parameters=new e(h).get(),this._rfc3986=new g}function c(a){this._httpMethod=a||""}function d(a){this._url=a||""}function e(a){this._parameters=a||{},this._sortedKeys=[],this._normalizedParameters=[],this._rfc3986=new g,this._sortParameters(),this._concatenateParameters()}function f(a){this._parameters={},this._loadParameters(a||{})}function g(){}function h(a,b,c){this._rfc3986=new g,this._text=a,this._key=this._rfc3986.encode(b)+"&"+this._rfc3986.encode(c),this._base64EncodedHash=new i(this._text,this._key).getBase64EncodedHash()}function i(a,b){this._cryptoJS=j?require("crypto-js"):CryptoJS,this._text=a||"",this._key=b||"",this._hash=this._cryptoJS.HmacSHA1(this._text,this._key)}var j="undefined"!=typeof module&&"undefined"!=typeof module.exports;a.prototype.generate=function(a,c,d,e,f,g){var i=new b(a,c,d).generate(),j=!0;return g&&(j=g.encodeSignature),new h(i,e,f).generate(j)},b.prototype={generate:function(){return this._rfc3986.encode(this._httpMethod)+"&"+this._rfc3986.encode(this._url)+"&"+this._rfc3986.encode(this._parameters)}},c.prototype={get:function(){return this._httpMethod.toUpperCase()}},d.prototype={get:function(){if(!this._url)return this._url;-1==this._url.indexOf("://")&&(this._url="http://"+this._url);var a=j?this.parseInNode():this.parseInBrowser(),b=(a.scheme||"http").toLowerCase(),c=(a.authority||"").toLocaleLowerCase(),d=a.path||"",e=a.port||"";(80==e&&"http"==b||443==e&&"https"==b)&&(e="");var f=b+"://"+c;return f+=e?":"+e:"","/"==d&&-1===this._url.indexOf(f+d)&&(d=""),this._url=(b?b+"://":"")+c+(e?":"+e:"")+d,this._url},parseInBrowser:function(){return{scheme:url("protocol",this._url).toLowerCase(),authority:url("hostname",this._url).toLocaleLowerCase(),port:url("port",this._url),path:url("path",this._url)}},parseInNode:function(){var a=require("uri-js"),b=a.parse(this._url),c=b.scheme;return":"==c.charAt(c.length-1)&&(c=c.substring(0,c.length-1)),{scheme:c,authority:b.host,port:b.port,path:b.path}}},e.prototype={_sortParameters:function(){var a,b;for(a in this._parameters)this._parameters.hasOwnProperty(a)&&(b=this._rfc3986.encode(a),this._sortedKeys.push(b));this._sortedKeys.sort()},_concatenateParameters:function(){var a;for(a=0;a<this._sortedKeys.length;a++)this._normalizeParameter(this._sortedKeys[a])},_normalizeParameter:function(a){var b,c,d=this._rfc3986.decode(a),e=this._parameters[d];for(e.sort(),b=0;b<e.length;b++)c=this._rfc3986.encode(e[b]),this._normalizedParameters.push(a+"="+c)},get:function(){return this._normalizedParameters.join("&")}},f.prototype={_loadParameters:function(a){a instanceof Array?this._loadParametersFromArray(a):"object"==typeof a&&this._loadParametersFromObject(a)},_loadParametersFromArray:function(a){var b;for(b=0;b<a.length;b++)this._loadParametersFromObject(a[b])},_loadParametersFromObject:function(a){var b;for(b in a)a.hasOwnProperty(b)&&this._loadParameterValue(b,a[b]||"")},_loadParameterValue:function(a,b){var c;if(b instanceof Array){for(c=0;c<b.length;c++)this._addParameter(a,b[c]);0==b.length&&this._addParameter(a,"")}else this._addParameter(a,b)},_addParameter:function(a,b){this._parameters[a]||(this._parameters[a]=[]),this._parameters[a].push(b)},get:function(){return this._parameters}},g.prototype={encode:function(a){return a?encodeURIComponent(a).replace(/[!'()]/g,escape).replace(/\*/g,"%2A"):""},decode:function(a){return a?decodeURIComponent(a):""}},h.prototype={generate:function(a){return a===!1?this._base64EncodedHash:this._rfc3986.encode(this._base64EncodedHash)}},i.prototype={getBase64EncodedHash:function(){return this._hash.toString(this._cryptoJS.enc.Base64)}};var k=new a;k.SignatureBaseString=b,k.HttpMethodElement=c,k.UrlElement=d,k.ParametersElement=e,k.ParametersLoader=f,k.Rfc3986=g,k.HmacSha1Signature=h,k.HmacSha1=i,j?module.exports=k:window.oauthSignature=k}();/**
 * Components taken from Refills: http://refills.bourbon.io/
 */

/**
 * Sliding Panel
 */

$('.sliding-panel-button,.sliding-panel-fade-screen,.sliding-panel-close').on('click touchstart',function (e) {
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


  }

  self.filterList = ko.observable('test');

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


(function ($) {

  $(document).ready(function () {

    /**
     * Build the map
     */

    // initMap();
    ko.applyBindings(new ViewModel());

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

}(jQuery));(function ($) {
  $(document).ready(function () {

    /**
     * Wikipedia API Call
     */


//Set the variables and URL string


// Make the AJAX request


    $('.bcn-list-links').on('click', function () {
      var clicked = $(this).text();
      console.log(clicked);

      var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=';
      var searchTerm = clicked;
      var callback = '&prop=revisions&rvprop=content&format=json&callback=?';
      wikiURL = wikiURL + searchTerm + callback;

// Set the timeout if no response is received.
      var wikiRequestTimeout = setTimeout(function () {
        $wikiElem.text('Bummer! No results could be found to match that address...:-(');
      }, 5000);


      $.ajax({
        url: wikiURL,
        dataType: 'json',
        success: function (response) {
          console.log(response);

          var wikiTitles = response[1];
          var wikiLinks = response[3];

          for (var i = 0; i < wikiTitles.length; i++) {
            var wikiTitle = wikiTitles[i];
            var wikiLink = wikiLinks[i];
            $wikiElem.append('<li>' +
              '<a href="' + wikiLink + '">' + wikiTitle + '</a>' +
              '</li>');
          }
          ;

          clearTimeout(wikiRequestTimeout);
        }
      });


    });


    /*
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


    /**
     * Get Hotwire calls
     */

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





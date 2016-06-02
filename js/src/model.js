/**
 * Contains the Model Data for the app
 */


class BCN {
  constructor(name, lat, lon, info) {
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.info = info;
  }
}

var base = new BCN( 'Barcelona', '41.3907242', '2.1773645', 'Nice place!' );
var sagradaFamilia = new BCN( 'Sagrada Familia', '41.4070131', '2.1598087', 'Nice place!' );
var parcGuell = new BCN( 'Parc Güell', '41.418322', '2.1455776,13', 'Nice place!' );
var ovejaNegra = new BCN( 'L\'Ovella Negra', '41.3831457', '2.1682898', 'Nice place!' );
var bonMercat = new BCN( 'Bon Mercat Roasters', '41.3835709', '2.1777242', 'Nice place!' );
var boqueria = new BCN( 'Mercado de la Boqueria', '41.3813886', '2.1718393', 'Nice place!' );



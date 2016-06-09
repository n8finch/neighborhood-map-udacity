/**
 * Contains the Model Data for the app
 */


// base is the center of the map, and also used to fetch and populate the initial data in the app.js file
var base = {
  name: 'Barcelona',
  lat: 41.394845,
  lon: 2.175476,
  wiki: 'barcelona'
};

//bcnArr is the primary array the data is pulled from. New objects can be added to this array.
var bcnArr = [
  {
    name: 'Sagrada Familia',
    lat: 41.403123,
    lon: 2.173728,
    info: 'A must see! This is Gaudi\'s enduring legacy, still under construction.',
    wiki: 'sagrada familia'

  },
  {
    name: 'Parc Güell',
    lat: 41.413610,
    lon: 2.153136,
    info: 'An amazing place to walk around, mystical, and, unless things have changed, free to the public!',
    wiki: 'parc güell'
  },
  {
    name: 'L\'Ovella Negra',
    lat: 41.3831457,
    lon: 2.1682898,
    info: 'This is the best place to get sangria in... all Spain!',
    wiki: 'el raval'
  },
  {
    name: 'Bon Mercat Roasters',
    lat: 41.3835709,
    lon: 2.1777242,
    info: 'This is the best coffee and drinking chocolate in Barcelona, and probably the world.',
    wiki: 'gothic quarter barcelona'
  },
  {
    name: 'La Boqueria',
    lat: 41.3813886,
    lon: 2.1718393,
    info: 'This is the classic outdoor market place, fresh fruits, food stands, etc. So fun!',
    wiki: 'la rambla barcelona'
  }
];
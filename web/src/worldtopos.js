const country = require('./country.json');
const topojson = require('topojson');
const oceanjson = require('./ocean.json')

var exports = module.exports = {};

exports.addCountryTopos = (countries) => {
  Object.keys(country.objects).forEach((k) => {
    if (!country.objects[k].arcs) { return; }
    let geo;
    // Do merge inner arcs for those
    if (['US'].indexOf(k.split('-')[0]) !== -1) {
      geo = topojson.feature(country, country.objects[k]);
    } else {
      geo = { geometry: topojson.merge(country, [country.objects[k]]) };
    }
    // Exclude countries with null geometries.
    if (geo.geometry) {
      countries[k] = geo;
    }
  });

  return countries;
};

exports.addOceanTopos = function() {
  return oceanjson;
};

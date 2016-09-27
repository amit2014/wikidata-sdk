// Generated by CoffeeScript 1.10.0
(function() {
  var getLatLngFromCoordinates, helpers, nonNull, simplifyClaim, simplifyClaims, simplifyPropertyClaims;

  helpers = require('./helpers');

  simplifyClaims = function(claims) {
    var id, propClaims, simpleClaims;
    simpleClaims = {};
    for (id in claims) {
      propClaims = claims[id];
      simpleClaims[id] = simplifyPropertyClaims(propClaims);
    }
    return simpleClaims;
  };

  simplifyPropertyClaims = function(propClaims) {
    return propClaims.map(simplifyClaim).filter(nonNull);
  };

  nonNull = function(obj) {
    return obj != null;
  };

  simplifyClaim = function(claim) {
    var datatype, datavalue, mainsnak;
    mainsnak = claim.mainsnak;
    if (mainsnak == null) {
      return null;
    }
    datatype = mainsnak.datatype, datavalue = mainsnak.datavalue;
    if (datavalue == null) {
      return null;
    }
    switch (datatype) {
      case 'string':
      case 'commonsMedia':
      case 'url':
      case 'external-id':
        return datavalue.value;
      case 'monolingualtext':
        return datavalue.value.text;
      case 'wikibase-item':
      case 'wikibase-property':
        return datavalue.value.id;
      case 'time':
        return helpers.normalizeWikidataTime(datavalue.value.time);
      case 'quantity':
        return parseFloat(datavalue.value.amount);
      case 'globe-coordinate':
        return getLatLngFromCoordinates(datavalue.value);
      default:
        return null;
    }
  };

  getLatLngFromCoordinates = function(value) {
    var latitude, longitude;
    latitude = value.latitude, longitude = value.longitude;
    return [latitude, longitude];
  };

  module.exports = {
    simplifyClaims: simplifyClaims,
    simplifyPropertyClaims: simplifyPropertyClaims,
    simplifyClaim: simplifyClaim
  };

}).call(this);

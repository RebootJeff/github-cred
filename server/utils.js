'use strict';

// External dependencies
var R = require('ramda');

var Utils = {};

Utils.getBodyProps = R.map(R.prop('body'));
Utils.combineReponsesBodies = R.compose(R.unnest, Utils.getBodyProps);

Utils.getNumbersFromStringHead = function(string) {
  // parseInt will stop converting chars to integers once it hits a non-numeric char
  return parseInt(string, 10);
};

Utils.convertToArray = function(input) {
  return [].concat(input);
};

module.exports = Utils;

'use strict';

// External dependencies
var R = require('ramda');

var utils = {};

utils.preventDefaultFormBehavior = function() {
  document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault();
  }, true);
};

var isNotNil = R.compose(R.not, R.isNil);
var pickTimestamps = R.compose(
  R.filter(isNotNil),
  R.values,
  R.pick(['createdAt', 'modifiedAt', 'mergedAt', 'closedAt'])
);
function convertTimestampToDate(timestamp) {
  return new Date(timestamp);
}

var convertTimestampsToDates = R.map(convertTimestampToDate);

utils.getLatestDateString = function(pullRequest) {
  var timestamps = pickTimestamps(pullRequest);
  var dates = convertTimestampsToDates(timestamps);
  var latestDate = Math.max.apply(Math, dates);
  // Math.max will yield UNIX timestamp (integer), so we must re-convert.
  latestDate = convertTimestampToDate(latestDate);
  return latestDate.toLocaleDateString();
};

module.exports = utils;

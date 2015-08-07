'use strict';

// External dependencies
var R = require('ramda');

// Internal dependencies
var TOKEN = process.env.PAT || require('./PAT');

var Utils = {};

var BASE_REQUEST_OPTIONS = {
  headers: {
    Authorization: 'token ' + TOKEN,
    'User-Agent': 'just some app by RebootJeff' // GitHub API doesn't care
  },
  json: true,
  resolveWithFullResponse: true
};

// Perform deep merge for known conflicts
Utils.makeRequestOptions = function(moreOptions) {
  var options = R.merge(BASE_REQUEST_OPTIONS, moreOptions);

  // TODO: Find a more programmatic way to handle conflicts
  if(moreOptions.headers) {
    options.headers = R.merge(BASE_REQUEST_OPTIONS.headers, moreOptions.headers);
  }

  return options;
};

Utils.getUrlProps = R.map(R.prop('url'));
Utils.getParentProps = R.map(R.prop('parent'));
Utils.getFull_NameProps = R.map(R.prop('full_name'));
Utils.getBodyProps = R.map(R.prop('body'));
Utils.combineReponsesBodies = R.compose(R.unnest, Utils.getBodyProps);

Utils.getNumbersFromStringHead = function(string) {
  // parseInt will stop converting chars to integers once it hits a non-numeric char
  return parseInt(string, 10);
};

Utils.hasFork = R.compose(R.equals(true), R.prop('fork'));
Utils.filterByFork = R.filter(Utils.hasFork);


module.exports = Utils;

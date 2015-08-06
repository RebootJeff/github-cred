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
  qs: {
    'per_page': 100
  },
  resolveWithFullResponse: true
};

// Perform deep merge for known conflicts
Utils.makeRequestOptions = function(moreOptions) {
  var options = R.merge(BASE_REQUEST_OPTIONS, moreOptions);

  if(moreOptions.headers) {
    options.headers = R.merge(BASE_REQUEST_OPTIONS.headers, moreOptions.headers);
  }

  if(moreOptions.qs) {
    options.qs = R.merge(BASE_REQUEST_OPTIONS.qs, moreOptions.qs);
  }
  return options;
};

Utils._mergeConflictingProps = function(obj1, obj2) {
  // find all conflicting keys
  // for each conflicting key, check if both values for the same key are objects
  // if so, merge the objects
};

Utils.getBodyProp = R.prop('body');

module.exports = Utils;

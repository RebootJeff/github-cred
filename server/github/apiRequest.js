'use strict';

// External dependencies
var R = require('ramda');
var request = require('request-promise');

// Internal dependencies
var PAT = require('../config').PAT;

var BASE_REQUEST_OPTIONS = {
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: 'token ' + PAT,
    'User-Agent': 'just some app by RebootJeff' // GitHub API doesn't care
  },
  json: true,
  resolveWithFullResponse: true
};

// Perform deep merge for known conflicts
function prepRequestOptions(moreOptions) {
  var options = R.merge(BASE_REQUEST_OPTIONS, moreOptions);

  // TODO: Find a more programmatic way to handle conflicts
  if(moreOptions.headers) {
    options.headers = R.merge(BASE_REQUEST_OPTIONS.headers, moreOptions.headers);
  }

  return options;
}

function sendApiRequest(options) {
  options = prepRequestOptions(options);
  return request(options).promise();
}


module.exports = {
  prepRequestOptions: prepRequestOptions,
  sendApiRequest: sendApiRequest
};

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

Utils.makeRequestOptions = R.merge(BASE_REQUEST_OPTIONS);
Utils.getBodyProp = R.prop('body');

module.exports = Utils;

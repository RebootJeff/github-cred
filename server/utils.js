'use strict';

// External dependencies
var R = require('ramda');

// Internal dependencies
var config = require('./config');

var utils = {};

// FP-friendly version of console.log
utils.log = R.curry(function(tag, x) {
  console.log(tag, x);
  return x;
});

utils.logInDev = R.curry(function(tag, x) {
  if(config.ENV === 'development') {
    console.log(tag, x);
  }
  return x;
});

utils.maybeLogRateLimitFromResponse = function(response) {
  if(config.LOG_RATE_LIMIT) {
    console.log('Rate limit remaining:', response.headers['x-ratelimit-remaining']);
  }
  return response;
};

utils.getBodyProps = R.map(R.prop('body'));
utils.compileResponseBodies = R.compose(R.unnest, utils.getBodyProps);
utils.getItemsProps = R.map(R.prop('items'));
utils.compileItems = R.compose(R.unnest, utils.getItemsProps);

utils.getNumbersFromStringHead = function(string) {
  // parseInt will stop converting chars to integers once it hits a non-numeric char
  return parseInt(string, 10);
};

utils.convertToArray = function(input) {
  return [].concat(input);
};

var getAuthorFromPullRequest = R.compose(R.prop('login'), R.prop('user'));
// TODO: Find a more functional way to implement isPullRequestTo3rdPartyRepo
utils.isPullRequestTo3rdPartyRepo = function(pullRequest) {
  var authorUsername = getAuthorFromPullRequest(pullRequest);
  var index = pullRequest.url.indexOf('repos/' + authorUsername);
  return index === -1;
};
utils.findPullRequestsTo3rdPartyRepos = R.filter(utils.isPullRequestTo3rdPartyRepo);

module.exports = utils;

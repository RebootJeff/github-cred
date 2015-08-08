'use strict';

// External dependencies
var R = require('ramda');

var Utils = {};

// FP-friendly version of console.log
Utils.trace = R.curry(function(tag, x) {
  console.log(tag, x);
  return x;
});

Utils.getBodyProps = R.map(R.prop('body'));
Utils.compileResponseBodies = R.compose(R.unnest, Utils.getBodyProps);
Utils.getItemsProps = R.map(R.prop('items'));
Utils.compileItems = R.compose(R.unnest, Utils.getItemsProps);

Utils.getNumbersFromStringHead = function(string) {
  // parseInt will stop converting chars to integers once it hits a non-numeric char
  return parseInt(string, 10);
};

Utils.convertToArray = function(input) {
  return [].concat(input);
};

var getAuthorFromPullRequest = R.compose(R.prop('login'), R.prop('user'));
// TODO: Find a more functional way to implement isPullRequestTo3rdPartyRepo
Utils.isPullRequestTo3rdPartyRepo = function(pullRequest) {
  var authorUsername = getAuthorFromPullRequest(pullRequest);
  var index = pullRequest.url.indexOf('repos/' + authorUsername);
  return index === -1;
};
Utils.findPullRequestsTo3rdPartyRepos = R.filter(Utils.isPullRequestTo3rdPartyRepo);

module.exports = Utils;

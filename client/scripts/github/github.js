'use strict';

// External dependencies
var Promise = require('bluebird');
var R = require('ramda');

// Internal dependencies
var sendApiRequest = require('./apiRequest').sendApiRequest;
var pagination = require('./pagination');
var utils = require('../utils');

var github = {};

// TODO: For each reasonable chunk of requests to GitHub API write to a log of
// rate-limit, rate-limit-remaining, and rate-limit-reset (as a timestamp).

github.searchPullRequestsByUser = function(username) {
  var queryString = { q: 'type:pr author:' + username };
  return pagination.fetchAllPages({
    url: 'https://api.github.com/search/issues',
    qs: queryString
  })
    .then(utils.compileItems);
};

github.fetchPullRequestDetail = function(searchResult) {
  return sendApiRequest({
    url: searchResult.pull_request.url
  });
};

github.fetchPullRequestDetails = function(searchResults) {
  var requests = R.map(github.fetchPullRequestDetail, searchResults);
  return Promise.all(requests)
    .tap(R.compose(
      utils.maybeLogRateLimitFromResponse,
      R.last)
    )
    .then(utils.getBodyProps);
};

github.fetchPullRequestsTo3rdPartyRepos = R.compose(
  github.fetchPullRequestDetails,
  utils.findPullRequestsTo3rdPartyRepos
);


module.exports = github;

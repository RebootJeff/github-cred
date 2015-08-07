'use strict';

// Internal dependencies
var pagination = require('./pagination');

var github = {};

// TODO: For each reasonable chunk of requests to GitHub API write to a log of
// rate-limit, rate-limit-remaining, and rate-limit-reset (as a timestamp).

github.fetchPullRequestsByUser = function(username) {
  var searchQuery = 'type:pr+author:' + username;
  var options = {
    url: 'https://api.github.com/search/issues',
    qs: { q: searchQuery }
  };
  return pagination.fetchAllPages(options);
};




module.exports = github;

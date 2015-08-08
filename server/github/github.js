'use strict';

// Internal dependencies
var pagination = require('./pagination');

var github = {};

// TODO: For each reasonable chunk of requests to GitHub API write to a log of
// rate-limit, rate-limit-remaining, and rate-limit-reset (as a timestamp).

github.fetchPullRequestsByUser = function(username) {
  // Sadly, I must manually attach the Search query string to the URL because
  // automatic encodeURIcomponent calls (by most Node HTTP libraries) are
  // screwing with the usual approach for query string management.
  // But really, it's weird that the GitHub API doesn't support requests to
  // URLs with partial encoding even though the GitHub website DOES support it.
  return pagination.fetchAllPages({
    url: 'https://api.github.com/search/issues?q=type:pr+author:' + username
  });
};




module.exports = github;

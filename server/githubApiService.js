'use strict';

// External dependencies
var request = require('request-promise');

// Internal dependencies
var Utils = require('./utils');

var githubSvc = {};

// TODO: For each reasonable chunk of requests to GitHub API...
// log rate-limit, rate-limit-remaining, and rate-limit-reset (as a timestamp).

githubSvc.fetchUserForks = function(username, nextPage) {
  var forks;
  var url = nextPage || 'https://api.github.com/users/' + username + '/repos';
  var options = Utils.makeRequestOptions({
    qs: { fork: true },
  });

  return request(url, options).promise()
    .tap(function(response) {
      console.log(response.headers.link);
    })
    .then(Utils.getBodyProp)
    .then(function(result) {
      result.forEach(function(repo) {
        console.log(repo.id, repo.name);
      });
    });
};


module.exports = githubSvc;

githubSvc.fetchUserForks('RebootJeff');

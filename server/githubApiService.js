'use strict';

// External dependencies
var request = require('request-promise');

// Internal dependencies
var Utils = require('./utils');

var githubSvc = {};

/*
- Fetch user's forks.
  - Get 1st page of forks.
  - Get all other pages of forks based on 1st page's pagination metadata.
- For each fork, fetch repo details.
  - Find parent repo of each fork.
- For each parent repo, find commits by user.
  - Find count of additions, count of deletions, timestamp, etc. for each commit.
- Compile desired data into a simple array of mostly flat objects.
- Send compiled data to client.
*/

githubSvc.fetchUserForks = function(username, nextPage) {
  var forks = [];
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

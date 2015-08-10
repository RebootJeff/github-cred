'use strict';

// Internal dependencies
var github = require('./github/github');
var serializePullRequests = require('./github/serialization').serializePullRequests;

var ctrl = {};

ctrl.findUserPullRequests = function(req, res) {
  var username = req.params.username;

  github.searchPullRequestsByUser(username)
    .then(github.fetchPullRequestsTo3rdPartyRepos)
    .then(function(pullRequests) {
      var responseBody = serializePullRequests(pullRequests);
      res.send(responseBody);
    })
    .catch(function(err) {
      console.error('\nctrl.findUserPullRequests error:\n', JSON.stringify(err));
      res.status(500).send(err.message);
    });
};


module.exports = ctrl;

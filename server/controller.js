'use strict';

// External dependencies
var R = require('ramda');

// Internal dependencies
var github = require('./github/github');
var Utils = require('./utils');

var ctrl = {};

ctrl.findUserPullRequests = function(req, res) {
  var username = req.params.username;

  github.searchPullRequestsByUser(username)
    .tap(R.compose(Utils.trace('search results:'), R.head))
    .then(github.fetchPullRequestsTo3rdPartyRepos)
    .then(function(pullRequests) {
      var responseBody = github.serializePullRequestData(pullRequests);
      res.send(responseBody);
    })
    .catch(function(err) {
      console.error('\nctrl.findUserData error:\n', JSON.stringify(err));
      res.status(500).send(err.message);
    });
};


module.exports = ctrl;

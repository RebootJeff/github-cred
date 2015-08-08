'use strict';

// Internal dependencies
var github = require('./github/github');

var ctrl = {};

ctrl.findUserData = function(req, res) {
  var username = req.params.username;

  github.searchPullRequestsByUser(username)
    .then(github.fetchPullRequestsTo3rdPartyRepos)
    .then(function(pullRequestData) {
      // TODO: Serialize/organize pullRequestData before sending to client
      res.send(pullRequestData);
    })
    .catch(function(err) {
      console.error('\nctrl.findUserData error:\n', JSON.stringify(err));
      res.status(500).send(err.message);
    });
};


module.exports = ctrl;

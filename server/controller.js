'use strict';

// Internal dependencies
var github = require('./github/github');

var ctrl = {};

ctrl.findUserData = function(req, res) {
  var username = req.params.username;

  github.fetchPullRequestsByUser(username)
    .then(function(result) {
      console.log('\nsend result:', result);
      res.send(result);
    });
};


module.exports = ctrl;

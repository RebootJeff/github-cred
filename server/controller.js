'use strict';

// Internal dependencies
var github = require('./github');
var Utils = require('./utils');

var ctrl = {};

ctrl.findUserData = function(req, res) {
  var username = req.params.username;

  github.fetchForksByUser(username)
    .then(Utils.getUrlProps)
    .then(github.fetchReposByUrls)
    .then(github.fetchParentsPullRequests)
    .then(function(result) {
      console.log('\nsend result:', result);
      res.send(result);
    });
};


module.exports = ctrl;

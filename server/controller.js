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
    .then(Utils.getParentProps)
    .then(function(result) {
      console.log(result);
      res.send(result);
    });
};


module.exports = ctrl;

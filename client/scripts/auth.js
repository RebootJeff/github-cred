'use strict';

// External dependencies
var Firebase = require('firebase');

var auth = {};

var ref = new Firebase('https://github-cred.firebaseio.com');

auth.getGithubToken = function() {
  var authData = ref.getAuth();

  if(authData === null) {
    return false;
  } else {
    return authData.github.accessToken;
  }
};

auth.login = function() {
  ref.authWithOAuthPopup('github', loginHandler);
};

function loginHandler(error) {
  if(error) {
    console.log('Login Failed!', error);
  } else {
    console.log('Login succes:', ref.getAuth());
    // We'll never get here, as the page will redirect on success.
  }
}

module.exports = auth;

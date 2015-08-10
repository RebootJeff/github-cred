'use strict';

// Internal dependencies
var utils = require('./utils');

var input = document.querySelector('input');
var overlay = document.querySelector('.overlay');
var tableHead = document.querySelector('thead');
var tableBody = document.querySelector('tbody');

utils.preventDefaultFormBehavior();

window.getPullRequests = function() {
  var username = input.value;

  if(username !== '') {
    toggleSpinner(overlay);
    getData(username);
  }

  return false;
};

function getData(username) {
  var url = '/api/' + username;
  var request = new XMLHttpRequest();

  request.open('GET', url, true);

  request.onload = function() {
    toggleSpinner(overlay);
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      tableHead.classList.remove('hide');
      renderPullRequests(data);
    } else {
      // We reached our target server, but it returned an error
    }
  };
  request.onerror = function() {
    // There was a connection error of some sort
    toggleSpinner(overlay);
  };

  request.send();
}

function toggleSpinner(overlay) {
  if(overlay.classList.contains('hide')) {
    overlay.classList.remove('fadeOut');
    overlay.classList.remove('hide');
    overlay.classList.add('fadeIn');
  } else {
    overlay.classList.remove('fadeIn');
    overlay.classList.add('fadeOut');
    setTimeout(function() {
      overlay.classList.add('hide');
    }, 1000); // delay must be equal to fadeOut CSS animation duration
  }
}

function renderPullRequests(pullRequests) {
  var newHtml = pullRequests.map(makePullRequestHtml)
    .join('');
  tableBody.innerHTML = newHtml;
}

function makePullRequestHtml(pullRequest) {
  return '<tr>' +
    '<td><img class="avatar" src="' + pullRequest.parentAvatar + '"></td>' +
    '<td><a href="' + pullRequest.parentUrl + '">' + pullRequest.parentName + '</a></td>' +
    '<td class="title-col">' + pullRequest.title + '</td>' +
    '<td class="centered-col">' + (pullRequest.merged ? '<span class="merged">merged</span>' : pullRequest.state) + '</td>' +
    '<td class="centered-col"><a href="' + pullRequest.url + '">' + utils.getLatestDateString(pullRequest) + '</a></td>' +
    '<td class="centered-col">+' + pullRequest.additions + '/-' + pullRequest.deletions + '</td>' +
    '<td class="centered-col">' + pullRequest.commits + '</td>' +
    '<td class="centered-col">' + pullRequest.changedFiles + '</td>' +
    // '<td>' + pullRequest.foo + '</td>' +
    '</tr>';
}

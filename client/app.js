function ready(fn) {
  'use strict';
  if(document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function() {
  'use strict';

  var input = document.querySelector('input');
  var overlay = document.querySelector('.overlay');
  var tableBody = document.querySelector('tbody');

  document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault();
  }, true);

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
      '<td>' + pullRequest.title + '</td>' +
      '<td><a href="' + pullRequest.url + '">' + (pullRequest.merged ? 'merged' : pullRequest.state) + '</a></td>' +
      '<td>' + createLatestDateString(pullRequest) + '</td>' +
      // '<td>' + pullRequest.foo + '</td>' +
      '</tr>';
  }

  function createLatestDateString(pullRequest) {
    var timestamps = [
      new Date(pullRequest.createdAt),
      new Date(pullRequest.modifiedAt),
      new Date(pullRequest.mergedAt),
      new Date(pullRequest.closedAt)
    ];
    timestamps = timestamps.filter(function(timestamp) {
      return typeof timestamp === 'number';
    });
    var latestDate = Math.max.apply(Math, timestamps);
    latestDate = new Date(latestDate);
    return latestDate.toLocaleDateString();
  }

});

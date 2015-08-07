'use strict';

// External dependencies
var request = require('request-promise');
var R = require('ramda');
var Bluebird = require('bluebird');

// Internal dependencies
var Utils = require('./utils');

var github = {};

// TODO: For each reasonable chunk of requests to GitHub API...
// log rate-limit, rate-limit-remaining, and rate-limit-reset (as a timestamp).

github.fetchUserRepos = function(username) {
  var options = Utils.makeRequestOptions({
    url: 'https://api.github.com/users/' + username + '/repos'
  });

  return fetchAllPages(options);
};

github.fetchForksByUser = function(username) {
  return github.fetchUserRepos(username)
    .then(Utils.filterByFork);
};

github.fetchReposByUrls = function(repoUrls) {
  var requests = R.map(github.fetchRepoByUrl, repoUrls);
  return Bluebird.all(requests)
    .then(Utils.getBodyProps);
};

github.fetchRepoByUrl = function(url) {
  var options = Utils.makeRequestOptions({ url: url });
  return request(options).promise();
}

function fetchAllPages(options) {
  var firstPageData;

  return fetchFirstPage(options)
    .tap(function(response) {
      firstPageData = response.body;
    })
    .then(fetchPagesAfterFirst(options))
    .then(function(responses) {
      var remainingPagesData = Utils.combineReponsesBodies(responses);
      return firstPageData.concat(remainingPagesData);
    });
}

var fetchPage = R.curry(function(pageNumber, options) {
  options.qs = R.merge(options.qs, {
    page: pageNumber,
    per_page: 100
  });

  return request(options).promise();
});

var fetchFirstPage = fetchPage(1);

function fetchPages(options, startPage, endPage) {
  var requests = [];

  for(var i = startPage; i <= endPage; i++) {
    requests.push(fetchPage(i, options));
  }

  return requests;
}

var fetchPagesAfterFirst = R.curry(function(options, firstPageResponse) {
  var lastPageNumber;
  var requestsForRemainingPages = [];

  if(firstPageResponse.headers.link) {
    lastPageNumber = github._parseLastPageNumber(firstPageResponse.headers.link);
    requestsForRemainingPages = fetchPages(options, 2, lastPageNumber);
  }

  return Bluebird.all(requestsForRemainingPages);
});

github._parseLastPageNumber = function(linkHeader) {
  var PAGE_QS1 = '?page=';
  var PAGE_QS2 = '&page=';
  var parts = linkHeader.split('last');
  var partToSearch = parts[0]; // desired page num will be found to the left of 'last'
  var startIndex = partToSearch.lastIndexOf(PAGE_QS1);
  startIndex = (startIndex === -1) ? partToSearch.lastIndexOf(PAGE_QS2) : startIndex;
  var substringToSearch = partToSearch.substring(startIndex);
  var substringToParse = substringToSearch.substring(PAGE_QS1.length);
  var lastPageNumber = Utils.getNumbersFromStringHead(substringToParse);
  return lastPageNumber;
};

module.exports = github;

'use strict';

// External dependencies
var request = require('request-promise');
var R = require('ramda');

// Internal dependencies
var Utils = require('./utils');

var github = {};

// TODO: For each reasonable chunk of requests to GitHub API...
// log rate-limit, rate-limit-remaining, and rate-limit-reset (as a timestamp).

github.fetchUserForks = function(username) {
  var options = Utils.makeRequestOptions({
    qs: { fork: true },
    url: 'https://api.github.com/users/' + username + '/repos'
  });

  console.log(options);

  return request(options).promise()
    .tap(function(response) {
      console.log(response.headers.link);
    })
    .then(Utils.getBodyProp)
    .then(function(result) {
      result.forEach(function(repo) {
        console.log(repo.id, repo.name);
      });
    });
};

// function fetchAllPages(options) {
//   return fetchFirstPage(options)
//     .then(figureOutPagination)
//     .then(fetchAndCombineRemainingPages(options))
// }

function fetchAllPages(options) {
  var firstPageData;

  options.qs = R.merge(options.qs, {
    page: 1,
    per_page: 100
  });

  return request(options).promise()
    .then(function(response) {
      var lastPageNumber;
      var requestsForRemainingPages = [];

      firstPageData = response.body;

      if(response.headers.link) {
        lastPageNumber = github._parseLastPageNumber(response.headers.link);
        requestsForRemainingPages = makeRequestsForPages(2, lastPageNumber);
      }

      return requestsForRemainingPages;
    })
    .then(function(responses) {
      var remainingPagesData = Utils.getBodyProps(responses);
      return firstPageData.concat(remainingPagesData);
    });
}

github._parseLastPageNumber = function(linkHeader) {
  var PAGE_QS = '&page=';
  var parts = linkHeader.split('last');
  var partToSearch = parts[0];
  var startIndex = partToSearch.lastIndexOf(PAGE_QS);
  var substringToSearch = partToSearch.substring(startIndex);
  var substringToParse = substringToSearch.substring(PAGE_QS.length);
  var lastPageNumber = Utils.getFirstNumbersFromString(substringToParse);
  return lastPageNumber;
};



module.exports = github;

// github.fetchUserForks('RebootJeff');

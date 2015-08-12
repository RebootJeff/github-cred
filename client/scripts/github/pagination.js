'use strict';

// External dependencies
var R = require('ramda');
var Promise = require('bluebird');

// Internal dependencies
var sendApiRequest = require('./apiRequest').sendApiRequest;
var Utils = require('../utils');

function fetchAllPages(options) {
  var firstPageData;

  return fetchFirstPage(options)
    .tap(function(response) {
      Utils.maybeLogRateLimitFromResponse(response);
      firstPageData = Utils.convertToArray(response.body);
    })
    .then(fetchPagesAfterFirst(options))
    .then(function(responses) {
      // TODO: Refactor this anonymous func by using R.concat()
      var remainingPagesData = Utils.compileResponseBodies(responses);
      return firstPageData.concat(remainingPagesData);
    });
}

var fetchPage = R.curry(function(options, pageNumber) {
  options.qs = R.merge(options.qs, {
    page: pageNumber,
    per_page: 100
  });

  return sendApiRequest(options);
});

var fetchFirstPage = fetchPage(R.__, 1);

function fetchPages(options, startPage, endPage) {
  var pageNumbers = R.range(startPage, endPage + 1);
  return R.map(fetchPage(options), pageNumbers);
}

var fetchPagesAfterFirst = R.curry(function(options, firstPageResponse) {
  var lastPageNumber;
  var requestsForRemainingPages = [];

  if(firstPageResponse.headers.link) {
    lastPageNumber = parseLastPageNumber(firstPageResponse.headers.link);
    requestsForRemainingPages = fetchPages(options, 2, lastPageNumber);
  }

  return Promise.all(requestsForRemainingPages);
});

function parseLastPageNumber(linkHeader) {
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
}

module.exports = {
  fetchAllPages: fetchAllPages,
  parseLastPageNumber: parseLastPageNumber
};

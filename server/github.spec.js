'use strict';

describe('GitHub API Service', function() {
  var github = require('./github');

  describe('_parseLastPageNumber', function() {
    it('should get the final page number from a GitHub API Response Link header' +
       ' when it is part of the first query string field', function() {
      var sampleLinkHeader = '<https://api.github.com/user/4919808/repos?page=2&per_page=10>; rel="next", <https://api.github.com/user/4919808/repos?page=7&per_page=10>; rel="last"';
      var lastPageNumber = github._parseLastPageNumber(sampleLinkHeader);
      expect(lastPageNumber).toBe(7);
    });

    it('should get the final page number from a GitHub API Response Link header' +
       ' when it is NOT part of the first query string field', function() {
      var sampleLinkHeader = '<https://api.github.com/repositories/10634962/pulls?state=all&per_page=10&page=2>; rel="next", <https://api.github.com/repositories/10634962/pulls?state=all&per_page=10&page=4>; rel="last"';
      var lastPageNumber = github._parseLastPageNumber(sampleLinkHeader);
      expect(lastPageNumber).toBe(4);
    });
  });

});

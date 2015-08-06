'use strict';

describe('GitHub API Service', function() {
  var github = require('./github');

  describe('_parseLastPageNumber', function() {
    it('should get the final page number from a GitHub API Response Link header', function() {
      var fakeLinkHeader = '<https://api.github.com/repositories/14604649/pulls?state=all&page=2&per_page=3>; rel="next", <https://api.github.com/repositories/14604649/pulls?state=all&page=17&per_page=3>; rel="last"';
      var lastPageNumber = github._parseLastPageNumber(fakeLinkHeader);
      expect(lastPageNumber).toBe(17);
    });
  });

});

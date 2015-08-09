'use strict';

describe('Serialization', function() {
  var serialization = require('./serialization');

  describe('parseRepoFullName method', function() {
    it('should get the repo owner and name from the url', function() {
      var fakeUrl = 'https://github.com/ExpedientSlow-Lorris/CoinStreamClient/pull/15';
      var result = serialization.parseRepoFullName(fakeUrl);
      expect(result).toBe('ExpedientSlow-Lorris/CoinStreamClient');
    });
  });

});

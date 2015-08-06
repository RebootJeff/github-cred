'use strict';

describe('Utilities', function() {
  var Utils = require('./utils');

  describe('getNumbersFromStringHead method', function() {
    it('should get the first numeric chars from a string', function() {
      var fakeInput = '1 asdf 234';
      var result = Utils.getNumbersFromStringHead(fakeInput);
      expect(result).toBe(1);
    });

    it('should get the first numeric chars as a single number', function() {
      var fakeInput = '123asdf456';
      var result = Utils.getNumbersFromStringHead(fakeInput);
      expect(result).toBe(123);
    });
  });

});

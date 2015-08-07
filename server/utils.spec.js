'use strict';

describe('Utilities', function() {
  var Utils = require('./utils');

  describe('combineReponsesBodies method', function() {
    it('should extract body arrays from multiple objects into one partially flattened array', function() {
      var fakeResponses = [
        { body: [1, 2] },
        { body: [3, 4] },
        { body: [5, [6, 7]] }
      ];
      var result = Utils.combineReponsesBodies(fakeResponses);
      expect(result).toEqual([1, 2, 3, 4, 5, [6, 7]]);
    });
  });

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

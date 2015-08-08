'use strict';

describe('Utilities', function() {
  var Utils = require('./utils');

  describe('compileResponseBodies method', function() {
    it('should extract body arrays from multiple objects into one partially flattened array', function() {
      var fakeResponses = [
        { body: [1, 2] },
        { body: [3, 4] },
        { body: [5, [6, 7]] }
      ];
      var result = Utils.compileResponseBodies(fakeResponses);
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

  describe('isPullRequestTo3rdPartyRepo method', function() {
    it('should return false for PRs to user\'s own repo', function() {
      var fakePullRequests = {
        url: 'https://api.github.com/repos/RebootJeff/test/issues/1',
        user: { login: 'RebootJeff' }
      };
      var result = Utils.isPullRequestTo3rdPartyRepo(fakePullRequests);
      expect(result).toBe(false);
    });

    it('should return true for PRs to repo not owned by user', function() {
      var fakePullRequests = {
        url: 'https://api.github.com/repos/sequelize/express-example/issues/26',
        user: { login: 'RebootJeff' }
      };
      var result = Utils.isPullRequestTo3rdPartyRepo(fakePullRequests);
      expect(result).toBe(true);
    });

    it('should return true for PRs to repo named after but not owned by user', function() {
      var fakePullRequests = {
        url: 'https://api.github.com/repos/fakeOwner/RebootJeff/issues/1',
        user: { login: 'RebootJeff' }
      };
      var result = Utils.isPullRequestTo3rdPartyRepo(fakePullRequests);
      expect(result).toBe(true);
    });
  });

});

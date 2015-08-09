'use strict';

// External dependencies
var R = require('ramda');

var serialization = {};

serialization.parseRepoFullName = function(repoUrl) {
  var parts = repoUrl.split('/');
  return parts[3] + '/' + parts[4];
};

function serializePullRequest(pullRequest) {
  return {
    // Main info
    url:          pullRequest.html_url,
    parentRepo:   serialization.parseRepoFullName(pullRequest.html_url),
    title:        pullRequest.title,
    body:         pullRequest.body,
    merged:       pullRequest.merged,
    state:        pullRequest.state,
    parentAvatar: pullRequest.base.user.avatar_url,
    // Stats
    additions:    pullRequest.additions,
    deletions:    pullRequest.deletions,
    commits:      pullRequest.commits,
    changedFiles: pullRequest.changedFiles,
    comments:     pullRequest.comments,
    // Timestamps
    createdAt:  pullRequest.created_at,
    modifiedAt: pullRequest.modified_at,
    mergedAt:   pullRequest.merged_at,
    closedAt:   pullRequest.closed_at
  };
}

serialization.serializePullRequests = R.map(serializePullRequest);

// var COOLEST_PR_PROPS = [
//    // Main info
//   'title', 'body', 'state', 'merged', 'html_url',
//   // Stats
//   'additions', 'deletions', 'changed_files', 'commits', 'comments',
//   // Timestamps
//   'created_at', 'modified_at', 'merged_at', 'closed_at'
// ];
// var getNestedAvatar = R.compose(R.prop('avatar_url'), R.prop('user'), R.prop('base'));
// var createAvatarObj = R.compose(R.createMapEntry('parentAvatarUrl'), getNestedAvatar);
// var pickTopLevelProps = R.pick(COOLEST_PR_PROPS);

// TODO: Refactor to use applicative methods instead of wrapping function
// serialization.serializePullRequest = function(pullRequest) {
//   return R.merge(pickTopLevelProps(pullRequest), createAvatarObj(pullRequest));
// };


module.exports = serialization;

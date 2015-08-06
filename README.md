[![Circle CI](https://circleci.com/gh/RebootJeff/github-cred.svg?style=svg)](https://circleci.com/gh/RebootJeff/github-cred)

# GitHub Cred

Prototype is **_not_** ready yet. Please hold your breath accordingly.

Steps:

1. Enter a GitHub username; receive a list contributions to others' repos.
2. Scrutinize contributions.
3. Be super ~~judgemental~~ encouraging to the GitHub user.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Screenshots](#screenshots)
- [Development](#development)
  - [Tech](#tech)
  - [Challenges](#challenges)
  - [Credits](#credits)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Screenshots

*Work In Progress*

## Development

The app will use the GitHub API (v3) to find a given user's contributions through the following convoluted process:

0. Fetch user's forks.
  0. Deal with GitHub API's pagination to make sure *all* forks are truly found.
0. For each fork, fetch repo details.
  0. Use details to find parent (aka original) repo of each fork.
0. For each parent repo, get list of pull requests.
  0. Find pull requests by user in question.
    0. Deal with GitHub API's pagination to get *all* PRs.
    0. For each pull requests, find count of additions, count of deletions, timestamp, etc.
0. Compile desired data into an array of objects.
0. Do a little dance to celebrate compilation of desired data. Send array as JSON to client.

GitHub API interactions will take place on the server side to make use of a rate-limit-conquering (well, kinda) personal access token. Read the Challenges section of this README for more details. You know you wanna.

### Tech

*Work In Progress*

- GitHub API v3
- Node.js
  - Express
- Ramda.js
- CircleCI

### Challenges

**Problem:** Dealing with [GitHub API rate limits](https://developer.github.com/v3/#rate-limiting).
The rate limit on vanilla requests to the GitHub API is 60 requests/hour. I burn through that limit like nobody's business because I gotta send roughly 2 bajillion test requests/hour during development.
**Solution:** Use an access token with each request.
Using a valid access token increases the rate limit to 5,000 requests/hour/token. For prototyping speed's sake, I will rely on a [Personal Access Token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/). The "proper" solution would involve requiring visitors to log into the app via GitHub OAuth. Then I would use their access token.

**Problem:** Hiding my Personal Access Token. You can't expose that shit within a public codebase.
**Solution:** Use an environment variable.
Any reliance on the token must take place on the private server. The token is stored in an environment variable. When developing locally, the token is stored in a file that is never committed as part of this repo's public codebase.

**Problem:** Coming to terms with the fact that I must go through a convoluted set of GitHub API requests.
**Solution:** Venting to my fellow coding friends.

**Problem:** Friends get tired of hearing me complain about public REST APIs.
**Solution:** Unknown.

### Credits
- Author: [RebootJeff](https://twitter.com/RebootJeff)

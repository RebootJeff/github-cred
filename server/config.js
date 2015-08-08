'use strict';

var config = {
  ENV:  process.env.NODE_ENV || 'development',
  PAT:  process.env.PAT || require('./github/PAT'),
  PORT: process.env.PORT || 3000
};

config.LOG_RATE_LIMIT = (config.ENV === 'development') || process.env.LOG_RATE_LIMIT;

module.exports = config;

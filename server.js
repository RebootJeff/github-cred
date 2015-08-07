'use strict';

// External dependencies
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var helmet = require('helmet');

// Internal dependencies
var ctrl = require('./server/controller');

var app = express();


// Middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
if(process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev')); // log request/response info to console
}
app.use(helmet.xssFilter());
app.use(helmet.frameguard('deny'));
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());


// Basic routes
app.route('/api/:username')
  .get(ctrl.findUserData);

// Default to home page
// TODO: Fix this to serve 404 page as appropriate
// app.get('/*', function(req, res, next) {
//   res.sendFile('index.html', {
//     root: __dirname + '/public'
//   });
// });


// Start server
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port ' + port + '...');

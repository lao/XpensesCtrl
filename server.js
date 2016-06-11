'use strict';

var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    routes = require('./server_src/routes'),
    jwt = require('jsonwebtoken'),
    expressValidator = require('express-validator');

global.PUBLIC_PATH = __dirname + '/public';

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//TODO: authentication middleware

routes.load(app);

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
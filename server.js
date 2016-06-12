'use strict';

var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    routes = require('./server_src/routes'),
    jwt = require('jsonwebtoken'),
    expressValidator = require('express-validator'),
    models = require('./server_src/models');

global.PUBLIC_PATH = __dirname + '/public';
global.TOKEN_SECRET = 'c4d6c286ce7736ac88684306e9f3123f6f59811167dea4950aff595e67aa29ea';

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {

    req.isAuthenticated = function () {
        var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
        try {
            return jwt.verify(token, global.TOKEN_SECRET);
        } catch (err) {
            return false;
        }
    };

    if (req.isAuthenticated()) {
        var payload = req.isAuthenticated();
        models.User
            .findById(payload.sub)
            .then(function (user) {
                req.user = user;
                next();
            });
    } else {
        next();
    }

});

routes.load(app);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
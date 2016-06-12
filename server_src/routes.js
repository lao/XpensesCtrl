'use strict';

var path = require('path'),
    UserCtrl = require('./controllers/user');

function load(app) {

    app.post('/login', UserCtrl.login);
    app.post('/create', UserCtrl.create);

    app.get('/', function (req, res) {
        res.sendFile(path.join(global.PUBLIC_PATH, 'app', 'index.html'));
    });

}

module.exports.load = load;
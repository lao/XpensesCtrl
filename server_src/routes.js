'use strict';

var path = require('path');

function load(app) {

    app.get('/', function (req, res) {
        res.sendFile(path.join(global.PUBLIC_PATH, 'app', 'index.html'));
    });

}

module.exports.load = load;
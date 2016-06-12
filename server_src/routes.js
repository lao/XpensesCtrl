'use strict';

var path = require('path'),
    EntryCtrl = require('./controllers/entry'),
    UserCtrl = require('./controllers/user');

function load(app) {

    //Post methods
    app.post('/login', UserCtrl.login);
    app.post('/user', UserCtrl.create);
    app.post('/entry', EntryCtrl.create);

    //Put Methods
    //app.put('/entry/:id', UserCtrl.update);

    //Delete Methods
    //app.delete('/entry/:id', UserCtrl.remove);

    app.get('/', function (req, res) {
        res.sendFile(path.join(global.PUBLIC_PATH, 'app', 'index.html'));
    });

}

module.exports.load = load;
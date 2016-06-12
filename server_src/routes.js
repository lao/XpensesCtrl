'use strict';

var path = require('path'),
    EntryCtrl = require('./controllers/entry'),
    UserCtrl = require('./controllers/user');

function load(app) {

    //Post methods
    app.post('/login', UserCtrl.login);
    app.post('/user', UserCtrl.create);

    app.post('/entry', isAuthenticated, EntryCtrl.create);

    //Get methods
    app.get('/entry', isAuthenticated, EntryCtrl.getAll);

    //Put Methods
    //app.put('/entry/:id', isAuthenticated, EntryCtrl.update); //TODO: this

    //Delete Methods
    app.delete('/entry/:id', isAuthenticated, EntryCtrl.remove);

    app.get('/', function (req, res) {
        res.sendFile(path.join(global.PUBLIC_PATH, 'app', 'index.html'));
    });

}

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
}

module.exports.load = load;
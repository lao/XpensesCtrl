var models = require('../models'),
    jwt = require('jsonwebtoken'),
    moment = require('moment');

var UserCtrl = {};

UserCtrl.create = function (req, res) {

    req.assert('username', 'Username cannot be blank').notEmpty();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.assert('firstname', 'First name cannot be blank').notEmpty();
    req.assert('familyname', 'Family name cannot be blank').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    models
        .Family
        .findOrCreate({ where: { name: req.body.familyname } })
        .then(function (familyInstance) {

            //findOrCreate sequelize method return results in an array
            familyInstance = familyInstance[0];

            var userData = {
                firstname: req.body.firstname,
                username: req.body.username,
                password: req.body.password,
                familyId: familyInstance.id
            };

            return models.User
                .create(userData)
                .then(function () {
                    res.send({ msg: 'User created' });
                })
        })
        .catch(function () {
            res.status(400).send(errors);
        });

};

UserCtrl.login = function (req, res) {

    req.assert('username', 'Username cannot be blank').notEmpty();
    req.assert('password', 'Password cannot be blank').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    var loginErrorMsg = 'Invalid email or password';

    return models
        .User
        .find({ where: { username: req.body.username } })
        .then(function (user) {
            if (!user) {
                return res.status(401).send({ msg: loginErrorMsg });
            }
            user.checkPassword(req.body.password)
                .then(function (isMatch) {
                    if (!isMatch) {
                        return res.status(401).send({ msg: loginErrorMsg });
                    }
                    res.send({ token: generateToken(user), user: user });
                })
        });

};

function generateToken(user) {
    var payload = {
        iss: 'xpensesctrl.domain.com',
        sub: user.id,
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix()
    };
    return jwt.sign(payload, global.TOKEN_SECRET);
}

module.exports = UserCtrl;

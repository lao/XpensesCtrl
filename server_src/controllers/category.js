var models = require('../models');

var CategoryCtrl = {};

CategoryCtrl.getAll = function (req, res) {

    models
        .Category
        .findAll()
        .then(function (categories) {
            res.send(categories);
        })
        .catch(function (error) {
            res.status(400).send(error);
        });

};

CategoryCtrl.remove = function (req, res) {

    req.assert('id', 'Entry id cannot be blank').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    models.Category
        .destroy({ where: { id: req.params.id } })
        .then(function () {
            res.send();
        })
        .catch(function () {
            res.status(400).send(error);
        });

};

module.exports = CategoryCtrl;

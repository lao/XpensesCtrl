var models = require('../models'),
    moment = require('moment');

var EntryCtrl = {};

EntryCtrl.create = function (req, res) {

    req.assert('name', 'Entry name cannot be blank').notEmpty();
    req.assert('value', 'Entry value cannot be blank').notEmpty();
    req.assert('date', 'Entry date cannot be blank').notEmpty();
    req.assert('categoryname', 'Category name cannot be blank').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    models
        .Category
        .findOrCreate({ where: { name: req.body.categoryname } })
        .then(function (categoryInstance) {

            categoryInstance = categoryInstance[0];

            var entryData = {
                name: req.body.name,
                value: req.body.value,
                date: req.body.date,
                categoryId: categoryInstance.id
            };

            return models.Entry
                .create(entryData)
                .then(function () {
                    res.send({ msg: 'Entry created' });
                })
        })
        .catch(function () {
            res.status(400).send(errors);
        });

};

module.exports = EntryCtrl;

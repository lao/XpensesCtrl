var models = require('../models'),
    moment = require('moment');

var EntryCtrl = {};

EntryCtrl.getAll = function (req, res) {

    models
        .Entry
        .findAll({
            where: { userId: req.user.id },
            include: [{ model: models.Category, as: 'category' }]
        })
        .then(function (entries) {
            res.send(entries);
        })
        .catch(function (error) {
            res.status(400).send(error);
        });

};

EntryCtrl.remove = function (req, res) {

    req.assert('id', 'Entry id cannot be blank').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    models.Entry
        .destroy({ where: { id: req.params.id } })
        .then(function () {
            res.send();
        })
        .catch(function () {
            res.status(400).send(error);
        });

};

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
        .findOrCreate({ where: { name: req.body.categoryname, userId: req.user.id } })
        .then(function (categoryInstance) {

            categoryInstance = categoryInstance[0];

            var entryData = {
                name: req.body.name,
                value: req.body.value,
                date: req.body.date,
                categoryId: categoryInstance.id,
                userId: req.user.id
            };

            return models.Entry
                .create(entryData)
                .then(function () {
                    res.send({ msg: 'Entry created' });
                })
        })
        .catch(function (error) {
            res.status(400).send(error);
        });

};

EntryCtrl.userWeekSum = function (req, res) {

    //NOTE: Postgres weeks starts on mondays, adding 1 day to now to correct the problem
    var selectSqlStr = 'SELECT sum(value), date_part(\'day\', "Entries".date)' +
        '   FROM "Entries" ' +
        '   WHERE "Entries"."userId" = :userId AND ' +
        '   to_char(now() + interval \'1 day\', \'IYYY_IW\') = to_char( "Entries".date, \'IYYY_IW\') ' +
        '   GROUP BY date_part(\'day\', "Entries".date)';

    models
        .sequelize
        .query(selectSqlStr, { type: models.sequelize.QueryTypes.SELECT, replacements: { userId: req.user.id } })
        .then(function (result) {
            res.send(result);
        })
        .catch(function (error) {
            res.status(400).send(error);
        });

};


EntryCtrl.familyWeekSum = function (req, res) {

    //NOTE: Postgres weeks starts on mondays, adding 1 day to now to correct the problem
    var selectSqlStr = 'SELECT sum(value), date_part(\'day\', "Entries".date) ' +
        '   FROM "Entries" ' +
        '   LEFT JOIN "Users" on "Users".id = "Entries"."userId" ' +
        '   LEFT JOIN "Families" on "Families".id = "Users"."familyId" ' +
        '   WHERE "Users"."familyId" = :familyId AND to_char(now() + interval \'1 day\', \'IYYY_IW\') = to_char( "Entries".date, \'IYYY_IW\') ' +
        '   GROUP BY date_part(\'day\', "Entries".date)';

    models
        .sequelize
        .query(selectSqlStr, { type: models.sequelize.QueryTypes.SELECT, replacements: { familyId: req.user.familyId } })
        .then(function (result) {
            res.send(result);
        })
        .catch(function (error) {
            res.status(400).send(error);
        });

};

EntryCtrl.reportByFamily = function () {

};

module.exports = EntryCtrl;

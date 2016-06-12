'use strict';

var Sequelize = require('sequelize'),
    fs = require('fs'),
    path = require('path');

var DATABASE_NAME = 'xpensesdb';
var DATABASE_USER = 'xadmin';
var DATABASE_USER_PASSWORD = '246temp_password135';

//Initializing database connection
var sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_USER_PASSWORD, {
    host: 'localhost',
    dialect: 'postgresql',
    maxConcurrentQueries: 50,
    pool: { maxConnections: 5, maxIddleTime: 30 },
    logging: false
});

var models = {};

//Reading all files in models and loading using import function
// (http://docs.sequelizejs.com/en/latest/docs/models-definition/#import)
fs
    .readdirSync(__dirname)
    .filter(function (filename) {
        return filename !== 'index.js';
    })
    .forEach(function (filename) {
        var model = sequelize.import(path.join(__dirname, filename));
        models[model.name] = model;
    });

//Running all associate functions for all models.
Object.keys(models).forEach(function (modelName) {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
    if ('setHooks' in models[modelName]) {
        models[modelName].setHooks(models);
    }
});

//Creating all the tables.
// Personal note: I prefere creating all the tables manually, but in this case, the sync will do the job
sequelize
    //.sync({ force: true })//TODO: Sync with force will delete and recreate all tables. REMOVE AFTER.
    .sync()
    .error(function (error) {
        console.error(error);
        throw error;
    });

/**
 * Sequelize instance works as a db connection object, for raw queries and etc...
 * @name sequelize
 * @type {object}
 */
models.sequelize = sequelize;
/**
 * Sequelize lib Object, used to access Promise (bluebird Promise class), queryTypes, Validator, etc..
 * @name Sequelize
 * @type {object}
 */
models.Sequelize = Sequelize;
/**
 * Object with all the aplication models.
 * @name models
 * @type {object}
 */
module.exports = models;
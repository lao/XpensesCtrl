'use strict';

var bcrypt = require('bcrypt-nodejs'),
    Promise = require('sequelize').Promise,
    genSalt = Promise.promisify(bcrypt.genSalt),
    hash = Promise.promisify(bcrypt.hash);

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('User', {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set: function (password) {

                return genSalt(5)
                    .then(function (salt) {
                        return hash(password, salt, null);
                    })
                    .then(function (hash) {
                        this.setDataValue('password', hash);
                    });

            }
        }
    }, {
        classMethods: {
            associate: function (models) {
                models.User.belongsTo(models.Family, { foreignKey: 'familyId', as: 'family' });
                models.User.hasMany(models.Entry, { foreignKey: 'userId', as: 'entries' });
            }
        }
    });
};
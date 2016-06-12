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
            allowNull: false
        }
    }, {
        instanceMethods: {
            checkPassword: function (passwordToCheck) {
                var self = this;
                return new Promise(function (resolve, reject) {
                    bcrypt.compare(passwordToCheck, self.getDataValue('password'), function (err, res) {
                        if (err) {
                            return reject(err);
                        }
                        resolve(res);
                    });
                });
            },
            //Overriding toJSON method to avoid exposing the hashed password
            toJSON: function () {
                var values = this.get();
                delete values.password;
                return values;
            }
        },
        classMethods: {
            associate: function (models) {
                models.User.belongsTo(models.Family, { foreignKey: 'familyId', as: 'family' });
                models.User.hasMany(models.Entry, { foreignKey: 'userId', as: 'entries' });
            },
            setHooks: function (models) {

                function hashPasswordHook(instance) {

                    if (!instance.changed('password')) {
                        return;
                    }

                    return genSalt(5)
                        .then(function (salt) {
                            return hash(instance.get('password'), salt, null);
                        })
                        .then(function (hash) {
                            instance.set('password', hash);
                        });

                }

                models.User.beforeCreate(hashPasswordHook);
                models.User.beforeUpdate(hashPasswordHook);

            }
        }
    });
};
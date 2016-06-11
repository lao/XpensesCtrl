'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Family', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                models.Family.hasMany(models.User, { foreignKey: 'familyId', as: 'users', onDelete: 'RESTRICT' });
            }
        }
    });
};
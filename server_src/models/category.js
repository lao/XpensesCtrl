'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        classMethods: {
            associate: function (models) {
                models.Category.hasMany(models.Entry, { foreignKey: 'categoryId', as: 'entries', onDelete:'SET NULL'});
            }
        }
    });
};
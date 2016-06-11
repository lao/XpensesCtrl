'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Entry', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                models.Entry.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
                models.Entry.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            }
        }
    });
};
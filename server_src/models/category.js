'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        indexes:[
            {
                name: 'category_userId_unique',
                unique: true,
                method: 'BTREE',
                fields: ['userId', 'name']
            }
        ],
        classMethods: {
            associate: function (models) {
                models.Category.hasMany(models.Entry, { foreignKey: 'categoryId', as: 'entries', onDelete:'SET NULL'});
                models.Category.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            }
        }
    });
};
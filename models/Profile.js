const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Profile extends Model {}

Profile.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        display_name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'User',
            validate: {
                len: [1],
            },
        },
        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: '2000-01-01',
            validate: {
                isDate: true,
            },
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Davis, CA',
        },
        bio: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'profile',
    }
);

module.exports = Profile;
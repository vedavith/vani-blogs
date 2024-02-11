// Import Sequelize and DataTypes
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define(
        'User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        }
    });
    return User;
}
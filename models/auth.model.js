// Import Sequelize and DataTypes
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const auth = sequelize.define(
        'userAuth', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.STRING,
            unique: true
        },
        token: {
            type: DataTypes.STRING,
        }
    });
    return auth;
}
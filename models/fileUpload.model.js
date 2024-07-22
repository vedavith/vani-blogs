// Import Sequelize and DataTypes
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const fileUploads = sequelize.define('fileUploads', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fileLocation: {
            type: DataTypes.STRING(2000),
        },
        isDeleted : {
            type: DataTypes.BOOLEAN,
            default: false
        }
    });
    
    return fileUploads;
}
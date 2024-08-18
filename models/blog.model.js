// Import Sequelize and DataTypes
const { DataTypes } = require('sequelize');

module.exports = (sequelize, FileUploads, Users) => {
    const blog = sequelize.define('blog', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        title: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.INTEGER,
        },
        content: {
            type: DataTypes.STRING(2000),
        }
    });

    // Forign Keys
    blog.belongsTo(FileUploads, { foreignKey: 'image', targetKey: 'id'});
    blog.belongsTo(Users, { foreignKey: 'userId', targetKey: 'id'});
    blog.addScope('withoutUserId', {
        attributes: { exclude: ['userId'] }
    });
    return blog;
}
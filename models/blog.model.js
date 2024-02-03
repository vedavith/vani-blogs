 module.exports = (sequelize, DataTypes) => {
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
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.STRING(2000),
        }
    });

    blog.associate = function(models) {
        blog.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };
    return blog;
}
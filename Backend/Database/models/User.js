module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nationalId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        workId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("engineer", "admin"),
            allowNull: false,
            defaultValue: "engineer"
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Permit, {
            foreignKey: "userId",
            onDelete: "CASCADE"
        });
    };

    return User;
};

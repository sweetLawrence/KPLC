module.exports = (sequelize, DataTypes) => {
    const EarthPoint = sequelize.define("EarthPoint", {
        point: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    EarthPoint.associate = (models) => {
        EarthPoint.belongsTo(models.Permit, {
            foreignKey: "permitId",
            onDelete: "CASCADE"
        });
    };

    return EarthPoint;
};

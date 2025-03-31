module.exports = (sequelize, DataTypes) => {
    const WorkDetail = sequelize.define("WorkDetail", {
        detail: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    WorkDetail.associate = (models) => {
        WorkDetail.belongsTo(models.Permit, {
            foreignKey: "permitId",
            onDelete: "CASCADE"
        });
    };

    return WorkDetail;
};

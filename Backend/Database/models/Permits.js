module.exports = (sequelize, DataTypes) => {
    const Permit = sequelize.define("Permit", {
        permitNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        issuedTo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        workDescription: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        mvlvEquipment: {
            type: DataTypes.STRING
        },
        additionalEarthConnections: {
            type: DataTypes.STRING
        },
        consentPerson: {
            type: DataTypes.STRING
        },
        issueDate: {
            type: DataTypes.DATE
        },
        issueTime: {
            type: DataTypes.TIME
        },
        receiptSignature: {
            type: DataTypes.STRING
        },
        receiptDate: {
            type: DataTypes.DATE
        },
        receiptTime: {
            type: DataTypes.TIME
        },
        clearanceSignature: {
            type: DataTypes.STRING
        },
        clearanceDate: {
            type: DataTypes.DATE
        },
        clearanceTime: {
            type: DataTypes.TIME
        },
        cancellationEarthConnections: {
            type: DataTypes.STRING
        },
        cancellationConsentPerson: {
            type: DataTypes.STRING
        },
        cancellationSignature: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.ENUM("pending", "approved", "rejected"),
            allowNull: false,
            defaultValue: "pending"
        }
    });

    Permit.associate = (models) => {
        Permit.belongsTo(models.User, {
            foreignKey: "userId",
            onDelete: "CASCADE"
        });

        Permit.hasMany(models.EarthPoint, {
            foreignKey: "permitId",
            onDelete: "CASCADE"
        });

        Permit.hasMany(models.WorkDetail, {
            foreignKey: "permitId",
            onDelete: "CASCADE"
        });
    };

    return Permit;
};

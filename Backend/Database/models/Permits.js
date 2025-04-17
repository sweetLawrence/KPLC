module.exports = (sequelize, DataTypes) => {
  const Permit = sequelize.define('Permit', {
    permitNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      
    },
    issuedTo: {
      //!
      type: DataTypes.STRING,
      allowNull: false
    },
    approverName:{
      type: DataTypes.STRING,

    },
    workDetails: {
      //!
      type: DataTypes.JSON,
      allowNull: false
    },
    earthPoints: {
      //!
      type: DataTypes.JSON,
      allowNull: false
    },
    // workDescription: {
    //   type: DataTypes.TEXT,
    //   allowNull: false
    // },
    // mvlvEquipment: {
    //   //!
    //   type: DataTypes.STRING
    // },
    additionalEarthConnections: {
      //!
      type: DataTypes.STRING
    },
    consentPerson: {
      type: DataTypes.STRING
    },
    issueDate: {
      type: DataTypes.STRING
    },
    issueTime: {
      type: DataTypes.STRING
    },
    // receiptSignature: {
    //   type: DataTypes.STRING
    // },
    receiptDate: {
      type: DataTypes.DATE
    },
    receiptTime: {
      type: DataTypes.TIME
    },
    comments: {
      //!
      type: DataTypes.STRING
    },

    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    },

    // status: {
    //   type: DataTypes.ENUM('active','cancelled'),
    //   allowNull: false,
    //   defaultValue: 'inactive'
    // },
    // completedStatus: {
    //   type: DataTypes.ENUM('completed', 'in-progress', 'neutral'),
    //   allowNull: false,
    //   defaultValue: 'neutral'
    // }
  })

  Permit.associate = models => {
    Permit.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })

    // Permit.hasMany(models.EarthPoint, {
    //   foreignKey: 'permitId',
    //   onDelete: 'CASCADE'
    // })

    // Permit.hasMany(models.WorkDetail, {
    //   foreignKey: 'permitId',
    //   onDelete: 'CASCADE'
    // })
  }

  return Permit
}

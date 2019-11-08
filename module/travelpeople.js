/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('travelpeople', {
    id: {
      type: DataTypes.INTEGER(12),
        allowNull: false,
        autoIncrement:true,
      primaryKey: true
    },
    orderId: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    peopleName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    peopleCardType: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '1'
    },
    peopleCardId: {
      type: DataTypes.INTEGER(18),
      allowNull: true
    },
    peoplePhone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updataTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'travelpeople',
      timestamps: false,
  });
};

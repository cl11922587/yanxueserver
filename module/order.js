/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
      primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    num: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },pimg: {
          type: DataTypes.STRING(255),
          allowNull: true
      },
    pname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    pid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    payStyle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    payPrice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    payid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    concatName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    concatPhone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    remarke: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    payTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    travelTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    orderComTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    blackTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    blacId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'order',timestamps: false,
  });
};

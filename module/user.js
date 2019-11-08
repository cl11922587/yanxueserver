/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    userid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    passWord: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tel: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    realName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    iconUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nikeName: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'user',timestamps: false,
  });
};

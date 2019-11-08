
//表信息配置
var Sequelize = require("sequelize");
var sequelize = new Sequelize('yanxue','root','12345678',{
  host:'localhost',
  dialect:'mysql',
  operatorsAliases:false,
  dialectOptions:{
    //字符集
    charset:'utf8mb4',
    collate:'utf8mb4_unicode_ci',
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  pool:{
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00'  //东八时区
});

module.exports = {
  sequelize
};

//引入db配置
const db = require('../config/db');

//引入sequelize对象
const Sequelize = db.sequelize;

//引入数据表模型
const publics = Sequelize.import('../module/publics')
const banner = Sequelize.import('../module/banner')
//自动创建表
publics.sync({ force: false });
banner.sync({ force: false });

class publicMoudel{
  static async getbannerData(){
    return await banner.findAll({

    })
  }
}

class publicController {
    static async getbanner(ctx,next){
    const  query = await publicMoudel.getbannerData();
    if(query){
      ctx.response.status = 200;
      ctx.body = {
        code: 1,
        data: query,
          msg:' 查询成功'
      }
    }else{
      ctx.response.status = 200;
      ctx.body = {
        code: 1,
          data: [],
        msg:' 查询出错'
      }
    }

  }

}
module.exports = publicController;

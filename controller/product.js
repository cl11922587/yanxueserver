//引入db配置
const db = require('../config/db');

//引入sequelize对象
const Sequelize = db.sequelize;

//引入数据表模型
const product = Sequelize.import('../module/product')

//自动创建表
product.sync({ force: false });



//数据库操作类
class productModule {
  static async getproductdata(id) {
    return await product.findOne({
      where: {
        id:id
      }
    })
  }
  static async getproductdatalist(limit,page,type) {
    return await product.findAndCountAll({
      where:{type},
      limit: [page*limit-limit,parseInt(limit)]

    })
  }
}
class productController {
  static async getproductOne(ctx,next,type) {
    const req = ctx.request.query;
    if(req.id){
        const  query = await productModule.getproductdata(req.id);
          if(query){
            ctx.response.status = 200;
            ctx.body = {
              code: 1,
                desc: '获取成功',
              data: query
            }
          }else{
            ctx.response.status = 200;
            ctx.body = {
              code: 1,
                desc: '未找到数据',
              data: []
            }
          }

    }
  }
  static async getproductlist(ctx,next) {
    const req = ctx.request.query;
      const  query = await productModule.getproductdatalist(req.limit,req.page,req.type);
      if(query){
        ctx.response.status = 200;
        ctx.body = {
          code: 1,
          data: query
        }
    }
  }
}
module.exports = productController;

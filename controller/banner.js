//引入db配置
const db = require('../config/db');

//引入sequelize对象
const Sequelize = db.sequelize;

//引入数据表模型
const banner = Sequelize.import('../module/banner');

class bannerMoudel {
    static async getbannerData() {
        return await banner.findAll({})
    }
}

class bannerController {
    static async getbanner(ctx, next) {
        const query = await bannerMoudel.getbannerData();
        if (query) {
            ctx.response.status = 200;
            ctx.body = {
                code: 1,
                bannerList: query,
                msg: ' 查询成功'
            }
        } else {
            ctx.response.status = 200;
            ctx.body = {
                code: -1,
                product: [],
                msg: ' 查询出错'
            }
        }

    }

}

module.exports = bannerController;

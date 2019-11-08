//引入db配置
const db = require('../config/db');

//引入sequelize对象
const Sequelize = db.sequelize;

//解析token
const tools = require('../public/tool')

//引入数据表模型
const news = Sequelize.import('../module/new')
//自动创建表
//banner.sync({ force: false });

class newListMoudel {
    static async getNewListData(limit, page, type) {
        return await news.findAll({
            where: {type},
            limit: [page * limit - 10, 10]
        })
    }

    static async getNewDetailData(id) {
        return await news.findOne({
            where: {
                id
            }

        })

    }
}

class newListController {
    static async getNewList(ctx, next) {
        const req = ctx.request.query;
        const query = await newListMoudel.getNewListData(req.limit, req.page, req.type);
        if (query) {
            ctx.response.status = 200;
            ctx.body = {
                code: 1,
                desc: '获取数据成功',
                data: query
            }
        }
    }

    static async getNewDetail(ctx, next) {
        const req = ctx.request.query;
        const query = await newListMoudel.getNewDetailData(req.id);
        if (query) {
            ctx.response.status = 200;
            ctx.body = {
                code: 1,
                msg: '查询成功',
                data: query
            }
        } else {
            ctx.response.status = 200;
            ctx.body = {
                code: -1,
                data: [],
                msg: ' 查询出错'
            }
        }
    }
}

module.exports = newListController;

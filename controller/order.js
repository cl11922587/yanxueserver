//引入db配置
const db = require('../config/db');

//引入sequelize对象
const Sequelize = db.sequelize;

//引入数据表模型
const order = Sequelize.import('../module/order');
const travelpeople = Sequelize.import('../module/travelpeople');

//自动创建表
order.sync({force: false});

//解析token
const tools = require('../public/tool');

//数据库操作类
class orderModule {
    static async creatOrder(orderInfo, productInfo, userid) {
        const num = orderInfo.student.length;
        const price = productInfo.price;
        return await order.create({
            total: num * price,
            num: num,
            pname: productInfo.name,
            pimg: productInfo.img,
            price: price,
            pid: productInfo.id,
            state: 1,
            concatName: orderInfo.teacher.name,
            concatPhone: orderInfo.teacher.phone,
            remarke: orderInfo.teacher.remark,
            createTime: new Date(),
            userId: userid,

        })
    };

    static async creatTravel(perInfo, orderId) {
        return await travelpeople.create({
            orderId: orderId,
            peopleName: perInfo.name || "1",
            peopleCardType: 1,
            peopleCardId: perInfo.cardId || "1",
            peoplePhone: perInfo.phone || "1",
            createTime: new Date()

        })
    };

    static async OrderList(userid,limit,page){
            return await order.findAndCountAll({
            where :{userId:userid},
            limit: [page*limit-limit,parseInt(limit)],
          order: [['id','DESC']]
        })
    };

    static async OrderDetail(id){
         return await order.findOne({
            where: {
                id:id
            }
        })

    }

    static async getTravelList(id){
        return await travelpeople.findAndCountAll({
            where: {
                orderId:id
            }
        })

    }
}

class orderController {
    static async createOrder(ctx, next, type) {
        const req = ctx.request.body;
        const token = ctx.headers.authorization;
        if (token) {
            try {
                const userinfo = await tools.verToken(token);

                //生成订单
                const query = await orderModule.creatOrder(req.orderInfo, req.productInfo, userinfo.userid);

                //生成出行表
                if (query.id) {
                    for (var item of req.orderInfo.student) {
                        var queryTravel = await orderModule.creatTravel(item, query.id);
                    }
                }

                if (query.id && queryTravel.id) {
                    ctx.response.status = 200;
                    ctx.body = {
                        msg: '订单创建成功',
                        code: 1,
                        data: query
                    }
                }
            } catch (error) {
                ctx.response.status = 401;
                return ctx.body = {
                    code: -2,
                    msg: '登陆过期，请重新登陆'
                }
            }
        } else {
            ctx.response.status = 401;
            ctx.body = {
                msg: '请登录',
                code: -1,
                data: {}

            }
        }
    };

    static async getOrderList(ctx, next, type) {
        const req = ctx.request.query;
        const token = ctx.headers.authorization;
        if (token) {
            try {
                const userinfo = await tools.verToken(token);
                //获取订单列表
                const query = await orderModule.OrderList(userinfo.userid,req.limit,req.page);
                if(query){
                    ctx.response.status = 200;
                    ctx.body = {
                        msg: '获取数据成功',
                        code: 1,
                        data: query
                    }
                }}
            catch (error) {
                ctx.response.status = 401;
                return ctx.body = {
                    code: -2,
                    msg: '登陆过期，请重新登陆'
                }
            }

        } else {
            ctx.response.status = 401;
            ctx.body = {
                msg: '请登录',
                code: -2,
                data: []
            }
        }
    }

    static async getOrderDetail(ctx, next, type) {
        const req = ctx.request.query;
        const token = ctx.headers.authorization;
        if (token) {
            try {
                const userinfo = await tools.verToken(token);
                //获取订单详情
                const query = await orderModule.OrderDetail(req.id);
                //获取去出行人
                const queryList = await orderModule.getTravelList(req.id) ;

                if(query&&queryList){
                    ctx.response.status = 200;
                    ctx.body = {
                        msg: '获取数据成功',
                        code: 1,
                        data: {
                          orderInfo:  query,
                            travelList:queryList
                        }
                    }
                }}
            catch (error) {
                ctx.response.status = 401;
                return ctx.body = {
                    code: -2,
                    msg: '登陆过期，请重新登陆'
                }
            }

        } else {
            ctx.response.status = 401;
            ctx.body = {
                msg: '请登录',
                code: -2,
                data: []
            }
        }
    }
}

module.exports = orderController;

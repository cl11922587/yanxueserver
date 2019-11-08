const Router = require('koa-router');
const orderController = require('../controller/order');

const router = new Router({
    prefix: '/order'
});
//提交订单
router.post('/create',orderController.createOrder);

//获取订单列表
router.get('/orderList',orderController.getOrderList);

//获取订单详情
router.get('/orderDetail',orderController.getOrderDetail);

module.exports = router;

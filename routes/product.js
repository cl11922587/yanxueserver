const Router = require('koa-router');
const productController = require('../controller/product')

const router = new Router({
  prefix: '/product'
});
//获取产品信息
router.get('/product',productController.getproductOne);
router.get('/productlist',productController.getproductlist);

module.exports = router;

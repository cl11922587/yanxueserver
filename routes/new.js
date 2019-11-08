const Router = require('koa-router');
const newController = require('../controller/new')

const router = new Router({
  prefix: '/new'
});
//获取产品信息
router.get('/newList',newController.getNewList);
router.get('/newDetail',newController.getNewDetail);

module.exports = router;

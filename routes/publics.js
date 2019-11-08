const Router = require('koa-router');
const publicController = require('../controller/publics')
const bannerController = require('../controller/banner')
const router = new Router({
  prefix: '/publics'
});
//获取产品信息
router.get('/banner',bannerController.getbanner);

module.exports = router;

const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors')
const index = require('./routes/index')
const users = require('./routes/users')
const publics = require('./routes/publics')
const koajwt = require('koa-jwt')
const product = require('./routes/product')
const news = require('./routes/new')
const order = require('./routes/order')
// middlewares
app.use(bodyparser())
app.use(cors());



// // logger
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if(err.status === 401){
  ctx.status = 401;
  ctx.body = {
    code: '-2000',
    status:'401',
    desc: '登陆过期，请重新登陆'
  };
}else{
  throw err;
}
})
})
// //
app.use(koajwt({
  secret: '123456'
}).unless({
  path: [/^\/user\/regist/,/^\/user\/login/,/^\/product\/product/,/^\/publics\/publics/,/^\/publics\/banner/,/^\/new\/newList/,/^\/new\/newDetail/,/^\/order\/create/,/^\/order\/orderList/,/^\/order\/orderDetail/]
}))

// error handler
onerror(app)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(),index.allowedMethods())
app.use(product.routes(),product.allowedMethods())
app.use(users.routes(),users.allowedMethods())
app.use(publics.routes(),publics.allowedMethods())
app.use(news.routes(),news.allowedMethods())
app.use(order.routes(),order.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

//引入db配置
const db = require('../config/db');

//引入sequelize对象
const Sequelize = db.sequelize;

//引入数据表模型
const user = Sequelize.import('../module/user')

//自动创建表
user.sync({ force: false });


//引入jwt做token验证
const jwt = require('jsonwebtoken')

//解析token
const tools = require('../public/tool')

//统一设置token有效时间  为了方便观察，设为10s
const expireTime = '100000s'

//数据库操作类
class userModule {
  static async userRegist(data) {
    return await user.create({
            passWord: data.pwd,
            userName: data.userName
        })
  }

  static async getUserInfo(userName) {
    return await user.findOne({
      where: {
          userName:userName
      }
    })
  }
}
class userController {
  static async create(ctx) {
    const req = ctx.request.body;
    if (req.userName && req.pwd) {
      try {
        const query = await userModule.getUserInfo(req.userName);
        if (query) {
          ctx.response.status = 200;
          ctx.body = {
            code: -1,
            msg: '用户已存在'
          }
        } else {
          const param = {
            passWord: req.pwd,
            userName: req.userName
          }
          const data = await userModule.userRegist(param);

          ctx.response.status = 200;
          ctx.body = {
            code: 1,
              msg: '用户注册成功',
              info: {
              mobileNo: req.mobileNo
            }
          }
        }

      } catch (error) {
        ctx.response.status = 416;
        ctx.body = {
          code: -1,
            msg: '参数不齐全'
        }
      }
    }
  };
  static async login(ctx) {
    const req = ctx.request.body;
    if (!req.userName || !req.pwd) {
      return ctx.body = {
        code: '-1',
          msg: '用户名或密码不能为空'
      }
    } else {
      const data = await userModule.getUserInfo(req.userName);

      if (data) {
        if (data.passWord === req.pwd) {
          //生成token，验证登录有效期
          const token = jwt.sign({
            userid: data.userid,
            userName: req.userName,
          }, '123456', { expiresIn: expireTime });
          const info = {
              real_name:data.realName,
              icon_url:data.iconUrl,
              phone: data.phone,
              userId: data.userId
          }
          return ctx.body = {
            code: 1,
              data:{
              token: token,
              info: JSON.stringify(info)
              },
              msg: '登陆成功'
          }
        } else {
          return ctx.body = {
            code: '-1',
              msg: '用户名或密码不能为空'
          }
        }
      } else {
        return ctx.body = {
          code: '-1',
            msg: '该用户尚未注册'
        }
      }
    };
  }
  static async getUserInfo(ctx){
    const req = ctx.request.body;
    const token = ctx.headers.authorization;
    if(token){
      try {
        const result = await tools.verToken(token);
        if (!req.userName) {
          return ctx.body = {
            code: '-1',
              msg: '参数错误'
          }
        } else {
          let data = await userModule.getUserInfo(req.userName);
          if (req.userName == data.userName) {
            const info = {
                real_name:data.realName,
                icon_url:data.iconUrl,
                phone: data.phone,
                userId: data.userId
            };
            return ctx.body = {
              code: 1,
                data:{
                    info: JSON.stringify(info),},
                msg: '获取用户信息成功'
            }
          }
        }
      } catch (error) {
            ctx.status = 401;
            return ctx.body = {
                code: '-1',
                msg: '登陆过期，请重新登陆'
            }
        }
    }else{
      ctx.status = 401;
      return ctx.body = {
        code: '-1',
          msg: '登陆过期，请重新登陆'
      }
    }
  }
}
module.exports = userController;

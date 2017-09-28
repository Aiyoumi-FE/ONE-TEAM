const fs = require('fs')
const path = require('path')
const User = require('../models/user.js')
const online = require('../models/online.js')

const index = async(ctx, next) => {
  ctx.response.type = 'html'
  ctx.response.body = fs.createReadStream(path.join(__dirname, '..', '..', '/client/dist/index.html'));
}
// const init = async(ctx, next) => {
//   console.log(ctx)
//   let result = {
//     success: false,
//     result: {}
//   }
//   result.result.name = 'Doris'
//   ctx.response.body = result
// }

const login = async(ctx, next) => {
  let username = ctx.request.body.username
  let password = ctx.request.body.password
  let user = await User.findOne({
    'username': username
  }).exec()
  let result = {
    success: false
  }
  if (user) {
    if (user.userpwd == password) {
      result.success = true
      ctx.set(
        'Set-Cookie', ['id=' + user._id, 'name=' + user.username]
      )
    } else {
      result.resultDes = '用户密码错误'
    }
  } else {
    result.resultDes = '用户名不存在'
  }
  ctx.response.body = result
}

const register = async(ctx, next) => {
  let username = ctx.request.body.username
  let password = ctx.request.body.password
  let user = await User.findOne({
    'username': username,
  }).exec()
  let result = {
    success: false
  }
  console.log(user)
  if (!user) {
    let userReg = new User({
      username: username, //用户账号
      userpwd: password, //密码
      photo: '', // 头像
      logindate: new Date() //注册时间
    });
    let userRegRes = await userReg.save((err, res) => {
      if (err) {
        console.log("Error:" + err)
      } else {
        ctx.set(
          'Set-Cookie', ['id=' + res._id, 'name=' + res.username]
        )
        result.success = true
      }
    })
  } else {
    result.resultDes = '用户名已存在'
  }
  ctx.response.body = result
}

const signout = async(ctx, next) => {
  ctx.set(
    'Set-Cookie', ['id=', 'name=']
  )
  let result = {
    success: true
  }
  ctx.response.body = result
}

module.exports = {
  'GET /page/**': index,
  'POST /login': login,
  'POST /register': register,
  'POST /signout': signout
}

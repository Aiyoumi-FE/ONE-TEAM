const fs = require('fs')
const path = require('path')
const User = require('../models/user.js')

const index = async(ctx, next) => {
  ctx.response.type = 'html'
  console.log(__dirname + '==============')
  ctx.response.body = fs.createReadStream(path.join(__dirname, '..', '..', '/client/dist/index.html'));
}

const login = async(ctx, next) => {
  let name = ctx.request.body.name
  let password = ctx.request.body.password
  let user = await User.findOne({
    'username': name,
  }).exec()
  let result = {
    success: false
  }
  if (user) {
    if (user.userpwd == password) {
      result.success = true
    } else {
      result.resultDes = '用户密码错误'
    }
  } else {
    result.resultDes = '用户名不存在'
  }
  ctx.response.body = result
}

const register = async(ctx, next) => {
  let name = ctx.request.body.name
  let password = ctx.request.body.password
  let user = await User.findOne({
    'username': name,
  }).exec()
  let result = {
    success: false
  }
  if (!user) {
    let userReg = new User({
      username: name, //用户账号
      userpwd: password, //密码
      logindate: new Date() //注册时间
    });
    let userRegRes = await userReg.save((err, res) => {
      if (err) {
        console.log("Error:" + err)
      } else {
        result.success = true
      }
    })
  } else {
    result.resultDes = '用户名已存在'
  }
  ctx.response.body = result
}

module.exports = {
  'GET /': index,
  'POST /login': login,
  'POST /register': register
}

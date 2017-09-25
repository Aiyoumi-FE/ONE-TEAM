const Weekly = require('../models/weekly.js')
const User = require('../models/user.js')
// 周报列表
const getWeekList = async(ctx, next) => {
  let req = ctx.request.body,
    year,
    weeknum,
    uid = getUserId(ctx.request)
  if (!req.weeknum) {
    let dataNow = new Date()
    year = dataNow.getFullYear()
    weeknum = getYearWeek(year, dataNow.getMonth(), dataNow.getDate())
  }
  let result = {
    result: {
      year: year,
      weeknum: weeknum,
      list: []
    },
    success: true
  }
  result.result.weeknum = weeknum
  let weeklyList = await Weekly.find({
    'year': year,
    'weeknum': weeknum
  }).exec()
  let list = JSON.parse(JSON.stringify(weeklyList))
  for (let item of list) {
    if (item.userid == uid) {
      item['isUser'] = true
    }
    let user = await User.findOne({
      '_id': item.userid
    }).exec()
    item['username'] = user.username
  }
  result.result.list = list
  ctx.response.body = result
}
// 周报详情
const getWeekDetail = async(ctx, next) => {
  let req = ctx.request.body,
    year,
    weeknum,
    uid = getUserId(ctx.request)
  if (!req.weeknum) {
    let dataNow = new Date()
    year = dataNow.getFullYear()
    weeknum = getYearWeek(year, dataNow.getMonth(), dataNow.getDate())
  }
  let result = {
    result: {
      year: year,
      weeknum: weeknum,
      content: ''
    },
    success: false
  }
  if (!uid) {
    result.resultDes = '用户未登录'
    ctx.response.body = result
    return
  }
  if (req.id) {
    let weeklyDetail = await Weekly.findOne({
      '_id': req.id
    }).exec()
    if (weeklyDetail) {
      result.result = weeklyDetail
    }
  }
  result.success = true
  ctx.response.body = result
}
// 保存
const saveWeekDetail = async(ctx, next) => {
  let req = ctx.request.body,
    uid = getUserId(ctx.request)
  let weekDetail = await Weekly.findOne({
    '_id': req._id,
  }).exec()
  let result = {
    success: true
  }
  if (!weekDetail) {
    let weekSave = new Weekly({
      userid: uid, //用户账号
      content: req.content, // 周报内容
      year: req.year, // 年份
      weeknum: req.weeknum, // 第几周
      weekdata: req.weekdata, // 周报时间
      savedata: new Date() //保存时间
    });
    let weeklyDetail = await weekSave.save((err, res) => {
      if (err) {
        console.log("Error:" + err)
      } else {
        result.success = true
      }
    })
  } else {
    var oldValue = { _id: weekDetail._id }
    var newData = { $set: { content: req.content } }
    let weeklyUpdate = await Weekly.update(oldValue, newData, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        result.success = true
      }
    });
  }
  ctx.response.body = result
}

const getYearWeek = function(a, b, c) {
  let date1 = new Date(a, parseInt(b), c),
    date2 = new Date(a, 0, 1),
    d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
  return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
}

const getUserId = function(req) {
  if (req.header.cookie) {
    let arr = req.header.cookie.split('; ')
    let res = ''
    arr.forEach((item) => {
      let arrName = item.split('=')
      if (arrName[0] === 'id') {
        res = arrName[1]
      }
    })
    return res
  }
}
module.exports = {
  'POST /getWeekList': getWeekList,
  'POST /getWeekDetail': getWeekDetail,
  'POST /saveWeekDetail': saveWeekDetail
}

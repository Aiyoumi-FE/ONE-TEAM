// 工具库
const { serviceUtil, dataFormat } = require('../util')
// 数据库
const userModel = require('../models/user.js')
const weeklyModel = require('../models/weekly.js')

class Weekly {
    constructor() {
        // super()
    }

    // 获取周报列表，
    // 请求参数：beginDate（开始日期）
    // 返回参数：list(周报列表)
    async getWeeklyList(ctx, next) {
        let requestData = ctx.request.body
        let teamId = serviceUtil.getCookie(ctx, 'team')

        let beginDate = requestData.beginDate || serviceUtil.getDayOfWeek(new Date(), 1),
            endDate = serviceUtil.getDayOfWeek(beginDate, 7)

        let weeklyList = await weeklyModel
            .find({ 'creatTime': { $gte: beginDate, $lte: endDate }, 'teamId': teamId })
            .populate('userId')
            .exec()

        // 返回数据
        let result = {
            result: {
                list: weeklyList
            },
            success: true
        }
        ctx.response.body = result
    }

    // 获取周报详情
    // 请求参数：beginDate（开始日期）
    // 返回参数: content(周报内容)
    async getWeeklyDetail(ctx, next) {
        let requestData = ctx.request.body
        let userId = serviceUtil.getCookie(ctx, 'id')
        let teamId = serviceUtil.getCookie(ctx, 'team')

        let beginDate = requestData.beginDate || serviceUtil.getDayOfWeek(new Date(), 1),
            endDate = serviceUtil.getDayOfWeek(beginDate, 7)

        let weeklyDetail = await weeklyModel.findOne({ "creatTime": { $gte: beginDate, $lte: endDate } }, { 'teamId': teamId }, { 'userId': userId }).exec()

        // 返回数据
        let result = {
            result: weeklyDetail,
            success: true
        }
        ctx.response.body = result
    }

    // 保存周报
    async saveWeekly(ctx, next) {
        let requestData = ctx.request.body
        let result = {
            success: true
        }

        // 修改
        if (requestData.weeklyId) {
            let oldValue = { _id: requestData.teamId }
            let newData = { $set: { content: requestData.content } }
            let weeklyUpdate = await Weekly.update(oldValue, newData, (err, res) => {
                if (err) {
                    serviceUtil.sendErrMsg(ctx, err)
                    console.log("Error:" + err)
                } else {
                    result.success = true
                }
            })
            ctx.response.body = result
            return
        }

        // 创建
        let userId = serviceUtil.getCookie(ctx, 'id')
        let teamId = serviceUtil.getCookie(ctx, 'team')

        let createWeekly = new weeklyModel({
            userId: userId,
            teamId: teamId,
            content: requestData.content,
            creatTime: new Date() // 创建时间
        })
        let createWeeklyRes = await createWeekly.save((err, res) => {
            if (err) {
                serviceUtil.sendErrMsg(ctx, err)
                console.log("Error:" + err)
            }
        })
        ctx.response.body = result
    }
}

module.exports = new Weekly()

// const Weekly = require('../models/weekly.js')
// const User = require('../models/user.js')
// import result from './util.js'
// // 周报列表
// const getWeekList = async(ctx, next) => {
//     let req = ctx.request.body,
//         year = req.year,
//         weeknum = req.weeknum,
//         goType = req.goType
//     uid = getUserId(ctx.request)
//     //直接打开页面，显示当前周
//     if (goType == 0) {
//         let dataNow = new Date()
//         year = dataNow.getFullYear()
//         weeknum = getYearWeek(year, dataNow.getMonth(), dataNow.getDate())
//     } else {
//         weeknum = weeknum + goType
//     }
//     // 返回值
//     let result = {
//         result: {
//             year: year,
//             weeknum: weeknum,
//             list: []
//         },
//         success: true
//     }
//     result.result.weeknum = weeknum

//     let weeklyList = await Weekly.find({
//         'year': year,
//         'weeknum': weeknum
//     }).exec()

//     let list = JSON.parse(JSON.stringify(weeklyList))
//     for (let item of list) {
//         if (item.userid == uid) {
//             item['isUser'] = true
//         }
//         let user = await User.findOne({
//             '_id': item.userid
//         }).exec()
//         item['username'] = user.username
//     }

//     result.result.list = list
//     ctx.response.body = result
// }
// // 周报详情
// const getWeekDetail = async(ctx, next) => {
//     let req = ctx.request.body,
//         year,
//         weeknum,
//         uid = getUserId(ctx.request)
//     if (!req.weeknum) {
//         let dataNow = new Date()
//         year = dataNow.getFullYear()
//         weeknum = getYearWeek(year, dataNow.getMonth(), dataNow.getDate())
//     }
//     let result = {
//         result: {
//             year: year,
//             weeknum: weeknum,
//             content: ''
//         },
//         success: false
//     }
//     if (!uid) {
//         result.resultDes = '用户未登录'
//         ctx.response.body = result
//         return
//     }
//     if (req.id) {
//         let weeklyDetail = await Weekly.findOne({
//             '_id': req.id
//         }).exec()
//         if (weeklyDetail) {
//             result.result = weeklyDetail
//         }
//     }
//     result.success = true
//     ctx.response.body = result
// }
// // 保存
// const saveWeekDetail = async(ctx, next) => {
//     let req = ctx.request.body,
//         uid = getUserId(ctx.request)
//     let weekDetail = await Weekly.findOne({
//         '_id': req._id,
//     }).exec()
//     let result = {
//         success: true
//     }
//     if (!weekDetail) {
//         let weekSave = new Weekly({
//             userid: uid, //用户账号
//             content: req.content, // 周报内容
//             year: req.year, // 年份
//             weeknum: req.weeknum, // 第几周
//             weekdata: req.weekdata, // 周报时间
//             savedata: new Date() //保存时间
//         });
//         let weeklyDetail = await weekSave.save((err, res) => {
//             if (err) {
//                 console.log("Error:" + err)
//             } else {
//                 result.success = true
//             }
//         })
//     } else {
//         var oldValue = { _id: weekDetail._id }
//         var newData = { $set: { content: req.content } }
//         let weeklyUpdate = await Weekly.update(oldValue, newData, (err, res) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 result.success = true
//             }
//         });
//     }
//     ctx.response.body = result
// }

// const getYearWeek = function(a, b, c) {
//     let date1 = new Date(a, parseInt(b), c),
//         date2 = new Date(a, 0, 1),
//         d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
//     return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
// }

// const getUserId = function(req) {
//     if (req.header.cookie) {
//         let arr = req.header.cookie.split('; ')
//         let res = ''
//         arr.forEach((item) => {
//             let arrName = item.split('=')
//             if (arrName[0] === 'id') {
//                 res = arrName[1]
//             }
//         })
//         return res
//     }
// }
// module.exports = {
//     'POST /getWeekList': getWeekList,
//     'POST /getWeekDetail': getWeekDetail,
//     'POST /saveWeekDetail': saveWeekDetail
// }

// 工具库
const { serviceUtil, businessUtil } = require('../util')
// 数据库
const userModel = require('../models/user.js')
const weeklyModel = require('../models/weekly.js')
// const markdown = require( "markdown" ).markdown;

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

        if (!teamId) {
            serviceUtil.sendErrMsg(ctx, '未加入团队')
            return
        }

        let beginDate = new Date(requestData.beginDate) || serviceUtil.getDayOfWeek(new Date(), 1),
            endDate = serviceUtil.getDayOfWeek(beginDate, 7)

        let weeklyList = await weeklyModel
            .find({ 'creatTime': { $gte: beginDate, $lte: endDate }, 'teamId': teamId}, 'content userId')
            .populate('userId', 'nickName')
            .exec()

        // weeklyList.forEach((item) => {
        //     item.content = markdown.toHTML(item.content )
        // })
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
        let userId = businessUtil.getStatus(ctx)
        let teamId = serviceUtil.getCookie(ctx, 'team')

        let beginDate = new Date(requestData.beginDate) || serviceUtil.getDayOfWeek(new Date(), 1),
            endDate = serviceUtil.getDayOfWeek(beginDate, 7)

        let weeklyDetail = await weeklyModel.findOne({ "creatTime": { $gte: beginDate, $lte: endDate }, 'teamId': teamId, 'userId': userId }).exec()

        if (!weeklyDetail) {
            weeklyDetail = {
                content: ''
            }
        }
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
        if (requestData._id) {
            let oldValue = { _id: requestData._id }
            let newData = { $set: { content: requestData.content } }
            let weeklyUpdate = await weeklyModel.update(oldValue, newData, (err, res) => {
                err ? serviceUtil.sendErrMsg(ctx, err) : result.success = true
            })
            ctx.response.body = result
            return
        }

        // 创建
        let userId = businessUtil.getStatus(ctx)
        let teamId = serviceUtil.getCookie(ctx, 'team')

        let createWeekly = new weeklyModel({
            userId: userId,
            teamId: teamId,
            content: requestData.content,
            creatTime: requestData.beginDate // 创建时间
        })
        let createWeeklyRes = await createWeekly.save((err, res) => {
            err ? serviceUtil.sendErrMsg(ctx, err) : result.success = true
        })
        ctx.response.body = result
    }
}

module.exports = new Weekly()

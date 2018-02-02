// 工具库
import { serviceUtil, businessUtil } from '../util'
// 数据库
import userModel from '../models/user.js'
import teamModel from '../models/team.js'
import weeklyModel from '../models/weekly.js'

class Weekly {

    // 获取周报列表，
    // 请求参数：beginDate（开始日期）
    // 返回参数：list(周报列表)
    async getWeeklyList(ctx, next) {
        // let requestData = ctx.request.body
        let beginDate = ctx.request.body.beginDate || null
        let tarUserId = ctx.request.body.tarUserId || ''
        let userId = businessUtil.getStatus(ctx)
        let teamId = serviceUtil.getCookie(ctx, 'team')
        let fiterRule = {}

        if (!teamId) {
            serviceUtil.sendErrMsg(ctx, '未加入团队')
            return
        }

        if (beginDate) {
            beginDate = new Date(beginDate)
        } else {
            beginDate = serviceUtil.getDayOfWeek(new Date(), 1)
        }
        let endDate = serviceUtil.getDayOfWeek(beginDate, 7)
        if (tarUserId) {
            fiterRule = { 'creatTime': { $gte: beginDate, $lte: endDate }, 'teamId': teamId , userId: tarUserId, 'type': { '$ne': 'summary'} }
        } else {
            fiterRule = { 'creatTime': { $gte: beginDate, $lte: endDate }, 'teamId': teamId, 'type': { '$ne': 'summary'} }
        }
        let weeklyList = await weeklyModel
            .find(fiterRule, 'content userId')
            .populate('userId', 'nickName')
            .exec()

        let teamInfo = await teamModel
            .findOne({ '_id': teamId })
        let isAdmin = userId == teamInfo.administrator

        // 返回数据
        let result = {
            result: {
                isAdmin: isAdmin,
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
            endDate = serviceUtil.getDayOfWeek(beginDate, 7),
            type = requestData.type == 'summary' ? 'summary' : null

        let weeklyDetail = await weeklyModel.findOne({
            'creatTime': { $gte: beginDate, $lte: endDate },
            'teamId': teamId,
            'userId': userId,
            'type': type
        }).exec()

        if (!weeklyDetail) {
            type = type ? 'summary' : 'weekly'
            let typeTemplate = type + 'Template'
            let res = await teamModel
                .findOne({ '_id': teamId }, typeTemplate)
                .populate(typeTemplate)
            weeklyDetail = {
                content: res[typeTemplate].template || ''
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
            creatTime: requestData.beginDate, // 创建时间
            type: requestData.type
        })
        let createWeeklyRes = await createWeekly.save((err, res) => {
            err ? serviceUtil.sendErrMsg(ctx, err) : result.success = true
        })
        ctx.response.body = result
    }
}

module.exports = new Weekly()

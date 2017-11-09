// 工具库
const { serviceUtil } = require('../util')
// 数据库
const teamModel = require('../models/team.js')

class Team {
    constructor() {
        // super()
    }

    // 获取周报列表，
    // 请求参数：beginDate（开始日期）
    // 返回参数：list(周报列表)
    async getTeamInfo(ctx, next) {
        let teamId = serviceUtil.getCookie(ctx, 'team')
        let teamInfo = await teamModel
            .findOne({ '_id': teamId })
            .populate('memberList')
            .exec()
        let result = {
            result: teamInfo,
            success: true
        }
        ctx.response.body = result
    }
}

module.exports = new Team()

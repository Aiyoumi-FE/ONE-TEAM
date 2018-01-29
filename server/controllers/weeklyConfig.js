// 工具库
const { serviceUtil, businessUtil } = require('../util')
// 数据库
const userModel = require('../models/user.js')
const teamModel = require('../models/team.js')
const weeklyConfigModel = require('../models/weeklyConfig.js')

class weeklyConfig {
    constructor() {
        // super()
    }

    // 获取设置周报模版
    // 返回参数：id(周报id), template(周报模板)
    async getweeklyTemplate(ctx, next) {
        let formData = ctx.request.body
        let teamId = serviceUtil.getCookie(ctx, 'team')

        if (!teamId) {
            serviceUtil.sendErrMsg(ctx, '未加入团队')
            return
        }
        let res = await teamModel
            .findOne({'_id': teamId })
            .populate('template')
            .exec()

        // 返回数据
        let result = {
            result: res.template,
            success: true
        }
        ctx.response.body = result
    }

    // 保存周报模板，
    // 请求参数：template(周报模板) id（模板id） 
    // 返回参数：true/false
    async saveWeeklyTemplate(ctx, next) {
        let formData = ctx.request.body
        let teamId = serviceUtil.getCookie(ctx, 'team')

        if (!formData.id) { // 新增模板
            let template = new weeklyConfigModel({
                template: formData.template
            })
            let templateSave = await template.save()
            console.log(templateSave)
            let templateId = templateSave._id
            let teamUpdate = await teamModel.update({ _id: teamId }, {$set: { template: templateId }})
        } else {
        	let templateUpdate = await weeklyConfigModel.update({ _id: formData.id }, {$set: { template: formData.template }})
        }

        // 返回数据
        let result = {
            success: true
        }
        ctx.response.body = result
    }

}

module.exports = new weeklyConfig()
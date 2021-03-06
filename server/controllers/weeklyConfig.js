// 工具库
import { serviceUtil, businessUtil } from '../util'
// 数据库
import userModel from '../models/user.js'
import teamModel from '../models/team.js'
import weeklyTemplateModel from '../models/weeklyTemplate.js'
import summaryTemplateModel from '../models/summaryTemplate.js'

class weeklyConfig {

    // 获取设置周报模版
    // 返回参数：id(周报id), template(周报模板)
    async getWeeklyConfig(ctx, next) {
        let formData = ctx.request.body
        let teamId = serviceUtil.getCookie(ctx, 'team')

        if (!teamId) {
            serviceUtil.sendErrMsg(ctx, '未加入团队')
            return
        }
        let res = await teamModel
            .findOne({'_id': teamId }, 'weeklyTemplate summaryTemplate')
            .populate('weeklyTemplate')
            .populate('summaryTemplate')
            .exec()

        // 返回数据
        let result = {
            result: res,
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

        if (!formData._id) { // 新增模板
            let template = new weeklyTemplateModel({
                template: formData.template
            })
            let templateSave = await template.save()
            let templateId = templateSave._id
            let teamUpdate = await teamModel.update({ _id: teamId }, {$set: { weeklyTemplate: templateId }})
        } else {
        	let templateUpdate = await weeklyTemplateModel.update({ _id: formData._id }, {$set: { template: formData.template }})
        }

        // 返回数据
        let result = {
            success: true
        }
        ctx.response.body = result
    }

    // 保存周报模板，
    // 请求参数：template(周报模板) id（模板id） 
    // 返回参数：true/false
    async saveSummaryTemplate(ctx, next) {
        let formData = ctx.request.body
        console.log(formData)
        let teamId = serviceUtil.getCookie(ctx, 'team')

        if (!formData._id) { // 新增模板
            let template = new summaryTemplateModel({
                template: formData.template
            })
            let templateSave = await template.save()
            let templateId = templateSave._id
            let teamUpdate = await teamModel.update({ _id: teamId }, {$set: { summaryTemplate: templateId }})
        } else {
            let templateUpdate = await summaryTemplateModel.update({ _id: formData._id }, {$set: { template: formData.template }})
        }

        // 返回数据
        let result = {
            success: true
        }
        ctx.response.body = result
    }
}

module.exports = new weeklyConfig()
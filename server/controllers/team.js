// 工具库
const { serviceUtil, businessUtil } = require('../util')
// 数据库
const teamModel = require('../models/team.js')
const userModel = require('../models/user.js')

class Team {
    constructor() {}
    // 创建团队
    // 请求参数：teamName（团队名称）
    // 返回参数：操作后的数据库返回
    async create(teamName) {
        let team = new teamModel({
            teamName: teamName,
            createTime: new Date()
        })
        return teamSave = team.save()
    }

    // 加入团队
    // 请求参数：teamId（团队Id），userId（成员id），isAdmin（是否管理员）
    // 返回参数：操作后的数据库返回
    async join(teamId, userId, isAdmin) {
        let oldTeamValue = { _id: teamId }
        let newTeamData = { $push: { memberList: userId } }
        if (isAdmin) {
            Object.assign(newTeamData, {
                $set: { administrator: userRegRes.id }
            })
        }
        return teamUpdate = await teamModel.update(oldTeamValue, newTeamData)
    }

    // 获取周报列表，
    // 请求参数：beginDate（开始日期）
    // 返回参数：list(周报列表)
    async getTeamInfo(ctx, next) {
        let userId = businessUtil.getStatus(ctx)
        let teamId = serviceUtil.getCookie(ctx, 'team')
        let result = {
            result: {},
            success: true
        }

        if (teamId) {
            let teamInfo = await teamModel
                .findOne({ '_id': teamId })
                .populate('memberList')
                .exec()

            let res = Object.assign(JSON.parse(JSON.stringify(teamInfo)), { isAdmin: userId == teamInfo.administrator })
            result.result = res
        } else {
            result.success = false
            result.resultDes = '未加入团队'
        }

        ctx.response.body = result
    }

    // 任免成员
    // 请求参数：opera（操作方式），userId（若为删除成员，此项为成员id）
    // 返回参数：list(周报列表)
    async chengeMemberStatus(ctx, next) {
        let formData = ctx.request.body
        let userId = businessUtil.getStatus(ctx)
        let teamId = serviceUtil.getCookie(ctx, 'team')
        let oldTeamValue = { _id: teamId }
        let oldUserValue = { _id: userId }
        let newTeamValue
        let newUserValue
        let oldTeam = await teamModel.findOne({ '_id': teamId })
        if (formData.opera == 'out') { // 退出
            newTeamValue = { $pull: { memberList: userId } }
            newUserValue = { $set: { teamId: null } }
            let userUpdate = await userModel.update(oldUserValue, newUserValue)
            ctx.set(
                'Set-Cookie', ['team=']
            )
        }
        if (formData.opera == 'del') { // 删除
            newTeamValue = { $pull: { memberList: formData.userId } }
            newUserValue = { $set: { teamId: null } }
            let userUpdate = await userModel.update(oldUserValue, newUserValue)
        }
        if (formData.opera == 'admin') { // 任职
            newTeamValue = { $set: { administrator: formData.userId } }
        }

        let teamUpdate = await teamModel.update(oldTeamValue, newTeamValue)


        let result = {
            success: true
        }
        ctx.response.body = result
    }

    // 加入/创建团队
    // 请求参数：teamName（团队名称），teamId（团队id）
    // 返回参数：操作后的数据库返回
    async teamOpera(ctx, next) {
        let formData = ctx.request.body
        let userId = businessUtil.getStatus(ctx)

        let oldUserValue = { _id: userId }
        let teamId = formData.teamId

        if (formData.teamName) {
            let team = new teamModel({
                teamName: formData.teamName,
                createTime: new Date()
            })
            let teamSave = await team.save()
            teamId = teamSave._id

            let oldTeamValue = { _id: teamId }
            let newTeamData = { $push: { memberList: userId }, $set: { administrator: userId } }
            let newUserValue = { $set: { teamId: teamId } }

            let teamUpdate = await teamModel.update(oldTeamValue, newTeamData)
            let userUpdate = await userModel.update(oldUserValue, newUserValue)
        }
        if (formData.teamId) {
            let oldTeamValue = { _id: teamId }

            let newTeamData = { $push: { memberList: userId } }
            let newUserValue = { $set: { teamId: teamId } }

            let teamUpdate = await teamModel.update(oldTeamValue, newTeamData)
            let userUpdate = await userModel.update(oldUserValue, newUserValue)
        }

        ctx.cookies.set('team', teamId)
        let result = {
            success: true
        }
        ctx.response.body = result
    }

    async joinUrl(ctx, next) {
        let teamId = serviceUtil.getCookie(ctx, 'team')
        let result = {
            success: true,
            result: {
                url: `http://${ctx.request.header.host}/page/user/register?id=${teamId}`
            }
        }
        ctx.response.body = result
    }
}
/**
 * @Author   dongyusi
 * @DateTime 2017-12-27
 * @param    {String}   teamName [团队名称]
 * @return   {Object}            [操作后的数据库返回]
 */
const create = async(teamName) => {
    let team = new teamModel({
        teamName: teamName,
        createTime: new Date()
    })
    team.save()
}

/**
 * @Author   dongyusi
 * @DateTime 2017-12-27
 * @param    {id}   teamId  [团队id]
 * @param    {id}   userId  [用户id]
 * @param    {Boolean}  isAdmin [是否管理员]
 * @return   {Object}           [操作后的数据库返回]
 */
const join = async(teamId, userId, isAdmin) => {
    console.log(userId)
    let oldTeamValue = { _id: teamId }
    let newTeamData = { $push: { memberList: userId } }
    if (isAdmin) {
        Object.assign(newTeamData, {
            $set: { administrator: userRegRes.id }
        })
    }
    await teamModel.update(oldTeamValue, newTeamData)
}

module.exports = new Team()

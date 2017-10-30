// 工具库
const { validatorUtil, serviceUtil } = require('../util')
// 数据库
const userModel = require('../models/user.js')
const teamModel = require('../models/team.js')

function checkFormData(formData) {
    if (!validatorUtil.checkEmail(formData.eMail)) {
        return '请填写正确的邮箱!'
    }
    if (!validatorUtil.checkNickName(formData.nickName)) {
        return '请输入2-12位中文，字母，数字，下划线组合昵称'
    }
    if (!formData.userPassword) {
        return '请输入6-12位字母数字符号组合密码'
    }
    if (formData.userPassword !== formData.confirmPassword) {
        return '两次输入密码不一致'
    }
    if (formData.phoneNumber && !validatorUtil.checkPhoneNum(formData.phoneNumber)) {
        return '请填写正确的手机号码!'
    }
    if (formData.teamName && !validatorUtil.checkTeamName(formData.teamName)) {
        return '请输入正确的团队名称'
    }
}

class User {
    constructor() {
        // super()
    }

    // 登录操作
    // 请求参数：邮箱，密码
    async loginAction(ctx, next) {
        let formData = ctx.request.body
        let result = {}

        try {
            // 校验
            let errMsg = ''
            if (!validatorUtil.checkEmail(formData.eMail)) {
                errMsg = '请填写正确的邮箱'
            } else if (!formData.userPassword) {
                errMsg = '请输入6-12位字母数字符号组合密码'
            }
            if (errMsg) {
                serviceUtil.sendErrMsg(ctx, errMsg)
                return
            }

            // 查询
            let user = await userModel.findOne({
                'eMail': formData.eMail
            }).exec()

            if (user) {
                let password = serviceUtil.encrypt(formData.userPassword)
                if (user.userPassword == password) {
                    result.success = true
                    ctx.cookies.set('name', new Buffer(user.nickName).toString('base64'), { httpOnly: false })
                    ctx.cookies.set('id', user._id)
                    ctx.cookies.set('team', user.teamId)
                    // ctx.set(
                    //     'Set-Cookie', ['id=' + user._id, 'name=' + user.nickName]
                    // )
                } else {
                    result.resultDes = '用户密码错误'
                }
            } else {
                result.resultDes = '用户名不存在'
            }
            ctx.response.body = result
        } catch (err) {
            serviceUtil.sendErrMsg(ctx, err.message)
        }
    }

    // 注册操作
    // 请求参数：邮箱，昵称，密码，确认密码，团队名称/id
    async regAction(ctx, next) {
        let formData = ctx.request.body
        let result = {}
        let teamId = formData.teamId
        // let userId = serviceUtil.getCookie(ctx, 'id')

        try {
            // 校验数据格式
            let check = checkFormData(formData)
            if (check) {
                serviceUtil.sendErrMsg(ctx, check)
                return
            }
            // 用户是否已存在
            let user = await userModel.findOne({
                'eMail': formData.eMail
            }).exec()

            if (!user) {
                // 团队
                if (formData.teamName) {
                    let team = new teamModel({
                        teamName: formData.teamName,
                        createTime: new Date()
                    })
                    let teamSave = await team.save()
                    teamId = teamSave.id
                }
                if (formData.teamId) {
                    let team = await teamModel.findOne({
                        '_id': formData.teamId
                    }).exec()
                    if (!team) {
                        serviceUtil.sendErrMsg(ctx, '团队邀请码错误')
                        return
                    }
                }
                // 新增用户
                let userReg = new userModel({
                    eMail: formData.eMail,
                    nickName: formData.nickName,
                    userPassword: serviceUtil.encrypt(formData.userPassword),
                    teamId: teamId, // 团队id
                    creatTime: new Date() // 创建时间
                })
                let userRegRes = await userReg.save((err, res) => {
                    if (err) {
                        console.log("Error:" + err)
                    } else {
                        ctx.cookies.set('name', new Buffer(res.nickName).toString('base64'), { httpOnly: false })
                        ctx.cookies.set('id', res._id)
                        ctx.cookies.set('team', user.teamId)
                    }
                })
                let teamUpdate = await teamModel.update({ _id: teamId }, {
                    $push: {
                        memberList: userRegRes.id
                    }
                })
                result.success = true
                ctx.response.body = result

            } else {
                result.resultDes = '该邮箱已被注册'
                result.success = false
                ctx.response.body = result
            }

        } catch (err) {
            serviceUtil.sendErrMsg(ctx, err.message)
        }
    }

    // 退出操作
    async signOutAction(ctx, next) {
        try {
            ctx.set(
                'Set-Cookie', ['id=', 'name=', 'team=']
            )
            ctx.response.body = {
                success: true
            }
        } catch (err) {
            serviceUtil.sendErrMsg(ctx, err.message)
        }
    }

    // 获得用户信息
    async getUserInfo(req, res, next) {


    }

    // 保存用户信息
    async saveUserInfo(req, res, next) {


    }

    // 删除用户
    async delUserInfo(req, res, next) {


    }
}

module.exports = new User()
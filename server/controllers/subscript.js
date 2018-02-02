// 工具库
const { serviceUtil, businessUtil } = require('../util')
// 数据库
const subscriptModel = require('../models/subscription.js')
const user = require('../models/user.js')

class Subscript {
    constructor() {}

    async addRecord(ctx, next) {
        let userId = businessUtil.getStatus(ctx)
        let subUserId = ctx.request.body.subUserId
        let subUserTeam = ctx.request.body.subUserTeamName
        let subUserName = ctx.request.body.subUserName
        let record = new subscriptModel({
            userId,
            subUserId,
            subUserTeam,
            subUserName
        })

        let historyRecord = await subscriptModel.find({
            userId,
            subUserId
        })
        console.log(historyRecord)
        if (historyRecord.length) {
            ctx.response.body = {
                success: false,
                resultDes: '用户已关注'
            }
        } else {
            try {
                record.save()

                ctx.response.body = {
                    success: true
                }
            } catch (e) {
                ctx.response.body = {
                    success: false,
                    resultDes: e.message
                }
            }
        }
    }

    async deleteRecord(ctx, next) {
        let userId = businessUtil.getStatus(ctx)
        let subUserId = ctx.request.body.subUserId

        try {
            subscriptModel
                .remove({
                    userId,
                    subUserId
                })
                .exec()

            ctx.response.body = {
                success: true
            }
        } catch (e) {
            ctx.response.body = {
                success: false,
                resultDes: e.message
            }
        }
    }

    async getRecordList(ctx, next) {
        let userId = businessUtil.getStatus(ctx)

        try {
            let subList = await subscriptModel
                .find({
                    userId
                })
                .exec()
                // .populate('subUserId')

            ctx.response.body = {
                success: true,
                result: subList
            }
        } catch (e) {
            ctx.response.body = {
                success: false,
                resultDes: e.message
            }
        }
    }

    async getUserByName(ctx, next) {
        let userName = ctx.request.body.userName

        try {
            let userList = await user
                .find({
                    nickName: userName
                })
                .populate('teamId')
                .exec()

            ctx.response.body = {
                success: true,
                result: userList
            }
        } catch (e) {
            ctx.response.body = {
                success: false,
                resultDes: e.message
            }
        }
    }

    async getMySubList(ctx, next) {
        let userId = businessUtil.getStatus(ctx)

        try {
            let subList = await subscriptModel
                .find({
                    userId
                })
                .exec()

            ctx.response.body = {
                success: true,
                result: subList
            }
        } catch (e) {
            ctx.response.body = {
                success: false,
                resultDes: e.message
            }
        }
    }
}

module.exports = new Subscript()

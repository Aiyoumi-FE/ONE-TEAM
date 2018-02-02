// 工具库
const { serviceUtil, businessUtil } = require('../util')
// 数据库
const subscriptModel = require('../models/subscription.js')

class Subscript {
    constructor() {}

    async addRecord(ctx, next) {
        let userId = businessUtil.getStatus(ctx)
        let subUserId = ctx.request.body.subUserId
        let record = new subscriptModel({
            userId,
            subUserId
        })

        return record.save()
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
                .populate('subUserId')
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

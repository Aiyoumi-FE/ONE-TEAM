const mongoose = require('./db.js'),
    Schema = mongoose.Schema

const teamSchema = new Schema({
    teamName: { type: String }, // 团队名称
    administrator: { type: Schema.Types.ObjectId, ref: 'user' }, // 超级管理员
    memberList: [{ type: Schema.Types.ObjectId, ref: 'user' }], // 成员列表
    weeklyTemplate: { type: Schema.Types.ObjectId, ref: 'weeklyTemplate' }, //周报模版
    summaryTemplate: { type: Schema.Types.ObjectId, ref: 'summaryTemplate' }, //总结模版
    createTime: { type: Date }, // 创建时间,
    pid: { type: Schema.Types.ObjectId, ref: 'team' }, // 团队pid
    children: [{ type: Schema.Types.ObjectId, ref: 'team' }] // 团队child id
})

module.exports = mongoose.model('team', teamSchema)

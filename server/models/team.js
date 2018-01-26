const mongoose = require('./db.js'),
    Schema = mongoose.Schema

const teamSchema = new Schema({
    teamName: { type: String }, // 团队名称
    administrator: { type: Schema.Types.ObjectId, ref: 'user' }, // 超级管理员
    memberList: [{ type: Schema.Types.ObjectId, ref: 'user' }], // 成员列表
    template: { type: Schema.Types.ObjectId, ref: 'weeklyTemplate' }, //周报模版
    createTime: { type: Date } // 创建时间
})

module.exports = mongoose.model('team', teamSchema)

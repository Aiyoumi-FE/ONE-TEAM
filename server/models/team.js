const mongoose = require('./db.js'),
    Schema = mongoose.Schema

const teamSchema = new Schema({
    teamName: { type: String }, // 团队名称
    memberList: [{ type: Schema.Types.ObjectId, ref: 'user' }], // 成员列表
    createTime: { type: Date } // 创建时间
})

module.exports = mongoose.model('team', teamSchema)

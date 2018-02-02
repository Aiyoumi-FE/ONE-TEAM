import mongoose from './db.js'

const Schema = mongoose.Schema

const weeklySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' }, // 用户id
    teamId: { type: Schema.Types.ObjectId, ref: 'team' }, // 团队id
    content: { type: String }, // 周报内容
    type: { type: String }, // 周报类型
    creatTime: { type: Date }, // 创建时间
})

module.exports = mongoose.model('weekly', weeklySchema)

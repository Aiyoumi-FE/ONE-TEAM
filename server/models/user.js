const teamModel = require('../models/team.js')
const mongoose = require('./db.js'),
    Schema = mongoose.Schema

const userSchema = new Schema({
    eMail: { type: String }, // 邮箱
    nickName: { type: String }, // 用户昵称
    userPassword: { type: String }, // 密码
    headPortrait: { type: String }, // 头像
    phoneNumber: { type: String }, // 电话号码
    loginTime: { type: Date }, // 注册时间
    teamId: { type: Schema.Types.ObjectId, ref: 'team' }, // 团队id
    creatTime: { type: Date, default: Date.now } // 创建时间
})

module.exports = mongoose.model('user', userSchema)

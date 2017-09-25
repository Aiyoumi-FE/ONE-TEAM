const mongoose = require('./db.js'),
  Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { type: String }, //用户账号
  userpwd: { type: String }, //密码
  photo: { type: String }, // 头像
  userage: { type: String }, // 年龄
  logindate: { type: Date } //最近登录时间
});
module.exports = mongoose.model('user', userSchema);

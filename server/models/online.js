const mongoose = require('./db.js'),
  Schema = mongoose.Schema;
const onlineSchema = new Schema({
  sessionId: { type: String },
  username: { type: String }, //用户账号                       //年龄
  logindate: { type: Date } //最近登录时间
});
module.exports = mongoose.model('online', onlineSchema);

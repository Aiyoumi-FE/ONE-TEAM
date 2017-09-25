const mongoose = require('./db.js'),
  Schema = mongoose.Schema;
const weeklySchema = new Schema({
  userid: { type: String }, //用户id
  content: { type: String }, // 周报内容
  year: { type: Number }, // 年份
  weeknum: { type: Number }, // 第几周
  weekdata: { type: Date }, // 周报时间
  savedata: { type: Date } //保存时间
});
module.exports = mongoose.model('weekly', weeklySchema);

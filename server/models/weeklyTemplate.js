const mongoose = require('./db.js'),
    Schema = mongoose.Schema

const weeklyTemplateSchema = new Schema({
    template: { type: String } // 周报内容
},{
    versionKey: false, //去掉版本锁 _v
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' } //自动管理修改时间
})

module.exports = mongoose.model('weeklyTemplate', weeklyTemplateSchema)

const mongoose = require('./db.js'),
    Schema = mongoose.Schema

const summaryTemplateSchema = new Schema({
    template: { type: String } // 总结模版
},{
    versionKey: false, //去掉版本锁 _v
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' } //自动管理修改时间
})

module.exports = mongoose.model('summaryTemplate', summaryTemplateSchema)

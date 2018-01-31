const mongoose = require('./db.js'),
    Schema = mongoose.Schema

const subscriptSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    subUserId: { type: Schema.Types.ObjectId, ref: 'user' }
})

module.exports = mongoose.model('subscript', subscriptSchema)

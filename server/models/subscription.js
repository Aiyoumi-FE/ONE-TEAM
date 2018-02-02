import mongoose from './db.js'

const Schema = mongoose.Schema

const subscriptSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    subUserId: { type: Schema.Types.ObjectId, ref: 'user' }
})

module.exports = mongoose.model('subscript', subscriptSchema)

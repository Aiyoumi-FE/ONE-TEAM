import mongoose from './db.js'

const Schema = mongoose.Schema

const subscriptSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    subUserId: { type: Schema.Types.ObjectId, ref: 'user' },
    subUserTeam: { type: String },
    subUserName: { type: String}
})

module.exports = mongoose.model('subscript', subscriptSchema)

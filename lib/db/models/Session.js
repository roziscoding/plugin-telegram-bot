module.exports = function ({ database: db }) {
  const Schema = db.mongoose.Schema
  const sessionSchema = new Schema({
    chat_id: {
      type: Number,
      required: true
    },
    user_id: {
      type: Number,
      required: true
    },
    command: {
      type: String,
      required: true
    },
    step: {
      type: Number,
      required: true,
      default: 0
    },
    group: {
      type: Boolean,
      required: true,
      default: false
    }
  })

  return db.mongoose.model('Session', sessionSchema, 'sessions')
}

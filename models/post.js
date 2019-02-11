const db = require('../utils/mongoDb')
const Schema = db.Schema

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    unique: true,
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'Blog'
  },
  share: {
    type: Boolean,
    default: true
  }
})

module.exports = db.model('Post', postSchema)

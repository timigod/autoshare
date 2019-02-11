const db = require('../utils/mongoDb')
const Schema = db.Schema
const { platforms } = require('../utils/settings')

const blogSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true
  },
  slugSuffix: {
    type: String
  },
  platform: {
    type: String,
    enum: platforms,
    default: 'medium',
    required: true
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  sharePrefix: {
    type: String
  }
})

blogSchema.index({ url: 1, slugSuffix: 1 }, { unique: true })
module.exports = db.model('Blog', blogSchema)

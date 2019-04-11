const db = require('../utils/mongoDb')
const Blog = require('./blog')
const Schema = db.Schema

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'Blog'
  },
  share: {
    type: Boolean,
    default: true
  },
  lastSharedAt: {
    type: Date
  }
})

postSchema.virtual('shareText').get(() => {
  const blog = Blog.findOne({ _id: this._id })
  let shareText = ''
  if (blog.sharePrefix) shareText = shareText + blog.sharePrefix + ' '
  shareText = shareText + this.title + ' ' + this.link
  return shareText
})

module.exports = db.model('Post', postSchema)

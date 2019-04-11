const db = require('../utils/mongoDb')
const Blog = require('./blog')
const moment = require('moment')
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

postSchema.statics.randomShareable = async function()  {
  let randomPost
  const count = await this.countDocuments({share: true})
  const daysBeforeRepeat = count/2
  let daysPassed = 0

  while (daysBeforeRepeat > daysPassed) {
    let rand = Math.floor(Math.random() * count)
    randomPost = await this.findOne({share: true}).skip(rand)
    if (randomPost.lastSharedAt){
      const now = moment()
      const lastSharedMoment = moment(randomPost.lastSharedAt)
      daysPassed = now.diff(lastSharedMoment, 'days')
    } else {
      break
    }
  }

  return randomPost
}

module.exports = db.model('Post', postSchema)

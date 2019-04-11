const Twit = require('twit')
const Post = require('../models/post')

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  strictSSL: true
})

module.exports = async (post) => {
  if (post.share) {
    const result = await T.post('statuses/update', { status: post.shareText })
    Post.update({ _id: post._id }, { lastSharedAt: Date.now() })
    console.log(result)
  }
}
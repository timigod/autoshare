const share = require('../share')
const Post = require('../../models/post')

module.exports = {
  key: 'share posts',
  jobFunction: async (job, done) => {
    await share(Post.randomShareable)
    done()
  }
}

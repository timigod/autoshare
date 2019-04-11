const share = require('../share')

module.exports = {
  key: 'share posts',
  jobFunction: async (job, done) => {
    share(Post.randomShareable)
    done()
  }
}

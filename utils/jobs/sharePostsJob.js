const Blog = require('../../models/blog')
const medium = require('../posts-getters/medium')

module.exports = {
  key: 'sync posts',
  jobFunction: async (job, done) => {
    const blogs = await Blog.find({})
    blogs.forEach((blog) => {
      switch (blog.platform) {
        case 'medium':
          medium(blog)
          break
      }
    })
    done()
  }
}

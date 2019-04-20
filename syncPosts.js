const Blog = require('./models/blog')
const medium = require('./utils/posts-getters/medium')

(async () => {
    const blogs = await Blog.find({})
    blogs.forEach((blog) => {
        switch (blog.platform) {
            case 'medium':
                medium(blog)
                break
        }
    })
})

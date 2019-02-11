if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const Agenda = require('agenda');
const medium = require('./utils/posts-getters/medium');
const createSeedBlogs = require('./utils/createSeedBlogs');
const Blog = require('./models/blog');

(async () => {
  await createSeedBlogs();
  const blog = await Blog.findOne();
  medium(blog);
})()

const { useSeeds } = require('./settings')
const Blog = require('../models/blog')
const fs = require('fs')
const path = require('path')

module.exports = async () => {
  if (useSeeds) {
    const blogsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './blogs-seed.json'), 'utf8'))
    try {
      const blogs = await Blog.insertMany(blogsData)
      console.log(`Sucessfully created ${blogs.length} blogs`)
    } catch (e) {
      if (e.code === 11000) {
        // do nothing to ignore duplicate errors as this will run everytime server is started
      } else {
        console.log('Error creating seed blogs', e)
      }
    }
  }
}

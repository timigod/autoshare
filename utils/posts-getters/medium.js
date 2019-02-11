const Post = require('../../models/post')
const axios = require('axios')
const _ = require('lodash')

module.exports = async (blog) => {
  if (blog.platform !== 'medium') {
    throw `Invalid Blog: ${blog.name} is not hosted on medium`
  }

  const limit = await isFirstFetch(blog) ? 100 : 10
  console.log(limit);
  try {
    const response = await axios.get(`${blog.url}/${blog.slugSuffix}/latest?format=json&limit=${limit}`)
    const jsonData = JSON.parse(response.data.replace('])}while(1);</x>', ''))
    const payload = jsonData.payload

    if (isPublication(payload)) {
      const postsData = payload.posts
      console.log(postsData.length)
      await _.forEach(postsData, async (postData) => {
        await Post.create({
          title: postData.title,
          link: `${blog.url}/${blog.slugSuffix}/${postData.uniqueSlug}`,
          blog: blog._id
        })
      })
    }

  } catch (e) {
    if (e.code === 11000) {
      // do nothing to ignore duplicate errors as this will run everytime server is started
    } else {
      console.log('Error fetching posts blogs', e)
    }
  }

}

const isPublication = (payload) => {
  return payload['posts'] && !payload['user']
}

const isFirstFetch = async (blog) => {
  const post = await Post.findOne().populate({
    path: 'blog',
    select: '_id',
    match: {_id: blog._id},
  })
  console.log(post)
  console.log(!!!post)
  return !!!post
}
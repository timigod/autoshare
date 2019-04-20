const share = require('./utils/share')
const Post = require('./models/post')

(async () => {
    await share(Post.randomShareable)
})()


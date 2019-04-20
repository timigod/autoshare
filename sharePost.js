const share = require('./utils/share');
const Post = require('./models/post');

(async () => {
    await share(await Post.randomShareable())
})();

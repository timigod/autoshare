if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const createSeedBlogs = require('./utils/createSeedBlogs');

(async () => {
    await createSeedBlogs()
})()

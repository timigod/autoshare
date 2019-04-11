if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Agenda = require('agenda')
const syncPostsJob = require('./utils/jobs/syncPostsJob')
const sharePostsJob = require('./utils/jobs/sharePostsJob')
const createSeedBlogs = require('./utils/createSeedBlogs');

(async () => {
  await createSeedBlogs()
  const agenda = new Agenda({ db: { address: process.env.MONGODB_URI } })

  agenda.define(syncPostsJob.key, syncPostsJob.jobFunction)
  agenda.define(sharePostsJob.key, sharePostsJob.jobFunction)
  await agenda.start()

  await agenda.every('1 day', syncPostsJob.key)
})()

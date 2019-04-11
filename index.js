if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Agenda = require('agenda')
const syncPostsJob = require('./utils/jobs/syncPostsJob')
const scheduleNextDayPostsJob = require('./utils/jobs/scheduleNextDayPostsJob')
const createSeedBlogs = require('./utils/createSeedBlogs');

(async () => {
  await createSeedBlogs()
  const agenda = new Agenda({ db: { address: process.env.MONGODB_URI } })

  agenda.define(syncPostsJob.key, syncPostsJob.jobFunction)
  agenda.define(scheduleNextDayPostsJob.key, scheduleNextDayPostsJob.jobFunction)

  await agenda.start()

  await agenda.every('1 day', syncPostsJob.key)
  await agenda.every('1 day', scheduleNextDayPostsJob.key)
})()

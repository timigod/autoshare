const sharePostsJob = require('./sharePostsJob')

const Agenda = require('agenda')
const agenda = new Agenda({db: {address: process.env.MONGODB_URI}})

agenda.define(sharePostsJob.key, sharePostsJob.jobFunction)

module.exports = {
  key: 'schedule next day posts',
  jobFunction: async (job, done) => {
    await agenda.schedule('tomorrow at 1pm', sharePostsJob.key)
    await agenda.schedule('tomorrow at 9pm', sharePostsJob.key)
    done()
  }
}

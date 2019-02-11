module.exports = {
  useSeeds: process.env.USE_SEEDS === 'true',
  platforms: process.env.PLATFORMS ? process.env.PLATFORMS.split(',') : ['medium']
}

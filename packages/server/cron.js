const cron = require('node-cron')
const fs = require('fs')

cron.schedule('*/1 * * * *', () => {
  const directoryPath = './screenshots'
  const files = fs.readdirSync(directoryPath)
  for (const file of files) {
    const path = `./screenshots/${file}`
    const stats = fs.statSync(path)

    const currentTime = new Date().getTime()
    const folderCreationTime = stats.birthtime.getTime()
    const elapsedTimeInMilliseconds = currentTime - folderCreationTime
    const elapsedTimeInMinutes = elapsedTimeInMilliseconds / (1000 * 60)

    if (elapsedTimeInMinutes > 1) {
      fs.rm(path, { recursive: true, force: true }, (error) => {
        console.log(error)
      })
    }
  }
})

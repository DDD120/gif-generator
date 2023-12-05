const express = require('express')
const cors = require('cors')
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const { v4: uuid } = require('uuid')
const Canvas = require('canvas')
const GIFEncoder = require('gifencoder')
const pngFileStream = require('png-file-stream')
const sharp = require('sharp')
const input = require('sharp/lib/input')

sharp.cache(false)
const app = express()

app.use(express.json())
app.use(
  cors({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200,
  })
)

function toBase64(filePath) {
  const img = fs.readFileSync(filePath)
  return Buffer.from(img).toString('base64')
}

app.post('/screenshots', (req, res) => {
  const { url, startTime } = req.body
  const id = uuid()
  const dir = `./screenshots/${id}`

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  ffmpeg(url)
    .screenshots({
      timestamps: [startTime],
      folder: `screenshots/${id}`,
    })
    .on('end', () => {
      const files = fs.readdirSync(dir)
      return res.json({
        id,
        state: 'success',
        image: toBase64(`${dir}/${files[0]}`),
      })
    })
})

app.post('/gif', async (req, res) => {
  const {
    cropData: { x, y, width, height },
    url,
    time,
    resizeWidth,
    id,
    speed,
  } = req.body
  const [startTime, duration] = time

  ffmpeg(url)
    .complexFilter(
      `[0:v] setpts=${speed}*PTS,fps=30,crop=${width}:${height}:${x}:${y},scale=${resizeWidth}:-1, split [a][b];[a] palettegen=stats_mode=single [p];[b][p] paletteuse=new=1`
    )
    .seekInput(startTime)
    .duration(duration * speed)
    .save(`screenshots/${id}/animated.gif`)
    .on('start', (commandLine) => {
      console.log(commandLine)
    })
    .on('end', () => {
      return res.json({ success: true })
    })
})
//setpts=3*PTS,
app.get('/gif/:id', (req, res) => {
  const { id } = req.params
  console.log(id)
  return res.download(`screenshots/${id}/animated.gif`, 'animated.gif')
})

app.listen(4000, () => {
  console.log('server is running')
})

const express = require('express')
const cors = require('cors')
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const { v4: uuid } = require('uuid')
const sharp = require('sharp')
const WebSocket = require('ws')

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

const server = app.listen(4000, () => {
  console.log('server is running')
})

app.post('/screenshots', (req, res) => {
  const { requestUrl, startTime } = req.body
  const id = uuid()
  const dir = `./screenshots/${id}`

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  ffmpeg(requestUrl)
    .screenshots({
      timestamps: [startTime],
      folder: `screenshots/${id}`,
    })
    .on('end', () => {
      const files = fs.readdirSync(dir)
      return res.status(200).json({
        state: 'success',
        data: {
          id,
          screenshotSrc: `data:image/png;base64,${toBase64(
            `${dir}/${files[0]}`
          )}`,
        },
      })
    })
    .on('error', () => {
      return res.status(400).json({
        state: 'failure',
      })
    })
})

const clients = new Map()
const wss = new WebSocket.Server({ server })
wss.on('connection', (ws) => {
  const clientId = uuid()
  ws.send(clientId)
  clients.set(clientId, ws)

  ws.on('close', () => {
    clients.delete(clientId)
  })
})

app.post('/gif', async (req, res) => {
  const {
    cropData: { x, y, width, height },
    requestUrl,
    startTime,
    duration,
    resizeWidth,
    id,
    speed,
    wsClientId,
  } = req.body

  ffmpeg(requestUrl)
    .complexFilter(
      `[0:v] setpts=${speed}*PTS,fps=30,crop=${width}:${height}:${x}:${y},scale=${resizeWidth}:-1, split [a][b];[a] palettegen=stats_mode=single [p];[b][p] paletteuse=new=1`
    )
    .seekInput(startTime)
    .duration(duration * speed)
    .on('progress', (progress) => {
      const ws = clients.get(wsClientId)
      ws.send(progress.frames)
    })
    .save(`screenshots/${id}/animated.gif`)
    .on('end', () => {
      res.json({ state: 'success' })
    })
})

app.get('/gif/:id', (req, res) => {
  const { id } = req.params
  return res.download(`screenshots/${id}/animated.gif`, 'animated.gif')
})

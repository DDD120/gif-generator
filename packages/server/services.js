const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const { v4: uuid } = require('uuid')

const clients = new Map()

const services = {
  connectWs: (ws) => {
    const clientId = uuid()
    ws.send(clientId)
    clients.set(clientId, ws)

    ws.on('close', () => {
      clients.delete(clientId)
    })
  },
  createScreenshots: (req, res) => {
    const { requestUrl, startTime } = req.body

    const id = uuid()
    const dir = `./screenshots/${id}`

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const toBase64 = (filePath) => {
      const img = fs.readFileSync(filePath)
      return Buffer.from(img).toString('base64')
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
  },
  createGif: async (req, res) => {
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
        if (!ws) {
          return res.status(400).json({
            state: 'failure',
          })
        }
        ws.send(progress.frames)
      })
      .save(`screenshots/${id}/animated.gif`)
      .on('end', () => {
        return res.status(200).json({ state: 'success' })
      })
      .on('error', () => {
        return res.status(400).json({
          state: 'failure',
        })
      })
  },
  getGif: (req, res) => {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({
        state: 'failure',
      })
    }
    return res.download(`screenshots/${id}/animated.gif`, 'animated.gif')
  },
}

module.exports = services

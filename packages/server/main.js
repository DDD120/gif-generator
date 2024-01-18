const express = require('express')
const cors = require('cors')
const services = require('./services')
const WebSocket = require('ws')
const app = express()
require('./cron.js')

app.use(express.json())
app.use(
  cors({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200,
  })
)

const server = app.listen(4000, () => {
  console.log('server is running')
})

const wss = new WebSocket.Server({ server })

wss.on('connection', services.connectWs)

app.post('/screenshots', services.createScreenshots)

app.post('/gif', services.createGif)

app.get('/gif/:id', services.getGif)

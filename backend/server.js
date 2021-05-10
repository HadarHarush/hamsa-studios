const express = require('express')
const cors = require('cors')
const path = require('path')
const expressSession = require('express-session')
const socketService = require('./services/socket.service')
const bodyParser = require('body-parser')
const tinify = require('tinify')
const dataUriToBuffer = require('data-uri-to-buffer')

const app = express()
const http = require('http').createServer(app)

// const io = require('socket.io')(http)
// app.use(express.static(`${__dirname}/public`))

const session = expressSession({
  secret: 'coding is amazing',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
})

// Express App Config
app.use(express.json({ limit: '50mb' }))
app.use(session)
// app.use(bodyParser({ limit: '50mb' }))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: [
      'http://127.0.0.1:8080',
      'http://localhost:8080',
      'http://127.0.0.1:3000',
      'http://localhost:3000',
    ],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

const orderRouter = require('./api/order/orderRoutes')

const { connectSockets } = require('./services/socket.service')

// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

app.use('/api/order', orderRouter)

//img-compression:
tinify.key = '0MgQFGmchV6LW9vwcQmK6w8M9kVH4YtY'
app.use('/api/img-compression', async (req, res) => {
  const { srcData } = req.body
  const buffer = dataUriToBuffer(srcData)

  tinify.fromBuffer(buffer).toBuffer(function (err, resultData) {
    if (err) throw err
    res.json(`data:png;base64,${Buffer.from(resultData).toString('base64')}`)
  })
})

connectSockets(http, session)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.post('/**', (req, res) => {
  res.json('error: post request didnt match any middleware...')
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
  logger.info('Server is running on port: ' + port, 15, 'popo')
})

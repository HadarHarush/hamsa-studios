const asyncLocalStorage = require('./als.service')
const logger = require('./logger.service')

var gIo = null
var gSocketBySessionIdMap = {}

function connectSockets(http, session) {
  gIo = require('socket.io')(http)

  const sharedSession = require('express-socket.io-session')

  gIo.use(
    sharedSession(session, {
      autoSave: true,
    })
  )
  gIo.on('connection', (socket) => {
    console.log('connected')

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })

    socket.on('join', (channel) => {
      console.log('joining from server...', channel)
      socket.join(channel)
    })

    emit('check', 'event emitted from servefgfgr')

    //     socket.on('fr chat-new-msg', (msg) => {
    //       const msgObj = {
    //         txt: msg,
    //         senterId: socket.handshake.session.user._id,
    //         senterUsername: socket.handshake.session.user.username,
    //       }
    //       emitAndSaveToDb('bk chat-new-msg', msgObj, 'chat')
    //     })
    //
    //     socket.on('fr change-room', (room) => {
    //       if (socket.myRoom === room) return
    //       if (socket.myRoom) {
    //         socket.leave(socket.myRoom)
    //       }
    //       socket.join(room)
    //       socket.myRoom = room
    //     })
  })
}

function emit(type, data) {
  gIo.emit(type, data)
}

// TODO: Need to test emitToUser feature
function emitToRoom(type, data, roomId) {
  gIo.to(roomId).emit(type, data)
}

// Send to all sockets BUT not the current socket
function broadcast({ type, data }) {
  const store = asyncLocalStorage.getStore()
  const { sessionId } = store
  if (!sessionId)
    return logger.debug(
      'Shoudnt happen, no sessionId in asyncLocalStorage store'
    )
  const excludedSocket = gSocketBySessionIdMap[sessionId]
  if (!excludedSocket)
    return logger.debug(
      'Shouldnt happen, No socket in map',
      gSocketBySessionIdMap
    )
  excludedSocket.broadcast.emit(type, data)
}

module.exports = {
  connectSockets,
  emit,
  emitToRoom,
  broadcast,
}

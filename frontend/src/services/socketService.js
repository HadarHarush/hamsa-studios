import io from 'socket.io-client'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3030'
export const socketService = createSocketService()

function createSocketService() {
  var socket
  const socketService = {
    setup() {
      socket = io(baseUrl)
      return socket
    },
    on(eventName, cb) {
      socket.off(eventName, cb).on(eventName, cb)
    },
    off(eventName, cb) {
      socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    join(channel) {
      socketService.emit('join', channel)
    },
    terminate() {
      socket?.disconnect()
      socket = null
    },
  }
  return socketService
}

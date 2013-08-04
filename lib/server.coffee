log = require('../util/debug').log('Server')
log2 = require('../util/debug').log('Server', 2)
error = require('../util/debug').error('Server')
Event = require('./event')
WS = require('ws')

class Server

  socket: null
  connected: false

  option:
    port: 0

  status:
    protocol: 'LR'
    version: '1.0'

  constructor: (port = 35730)->
    @option.port = port
    Event.attachTo @
    server = @listen @option.port
    server.on 'connection', @onConnection

  listen: (port)->
    log2 'listen on', port
    new WS.Server port: port

  sendMessage: (message)->
    return error 'disconnected' unless @connected
    return error 'invalid socket' unless @socket
    message = JSON.stringify message
    @socket.send message
    log2 'sendMessage', message

  onConnection: (socket)=>
    log2 'on connection'
    @connected = true
    @socket = socket
    @socket.on 'message', @onMessage
    @socket.on 'close', @onClose
    @socket.on 'error', @onError
    @trigger 'connected'

  onClose: =>
    log2 'on close'
    @connected = false
    @trigger 'disconnected'

  onMessage: (message)=>
    log 'onMessage', message, typeof message
    message = JSON.parse message
    switch message.type
      when 'handshake' then @onMessageHandshake message

  onError: =>
    log2 'on rrror', arguments
    @trigger 'error'

  onMessageHandshake: (message)=>
    log 'on handshake protocol', message.protocol
    log 'on handshake version', message.version
    @sendMessage
      type: 'handshake'
      protocol: @status.protocol
      version: @status.version

module.exports = Server

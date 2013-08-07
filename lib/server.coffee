WebsocketServer = require('ws').server
Event = require('./event')
Port = require('../util/port')
log = require('../util/debug').log('Server')
log2 = require('../util/debug').log('Server', 2)
warn = require('../util/debug').warn('Server')
error = require('../util/debug').error('Server')

class Server

  socket: null
  connected: false

  option:
    port: 35730

  status:
    protocol: 'LR'
    version: '1.0'

  constructor: (port)->
    @option.port = port if port?
    Event.attachTo @
    @listen @option.port, (server)=>
      server.on 'connection', @onConnection
      log2 'listen on', @option.port

  listen: (port, callback)->
    Port.isTaken port, (taken)=>
      return error "port #{port} is taken" if taken
      callback(new WebsocketServer port: port)

  sendMessage: (message)->
    return error 'disconnected' unless @connected
    return error 'invalid socket' unless @socket
    message = JSON.stringify message
    @socket.send message
    log2 'sendMessage', message

  onConnection: (socket)=>
    log2 'on connection'
    @socket = socket
    @socket.on 'message', @onMessage
    @socket.on 'close', @onClose
    @socket.on 'error', @onError
    @trigger 'connecting'

  onConnected: ->
    @connected = true
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

  mismatchProtocol: (protocol)->
    @trigger 'mismatch-protocol'
    log2 'protocol does not match', protocol

  onMessageHandshake: (message)=>
    if message.protocol isnt @status.protocol
      return @mismatchProtocol message.protocol    
    log 'on handshake version', message.version
    @onConnected()
    @sendMessage
      type: 'handshake'
      protocol: @status.protocol
      version: @status.version

module.exports = Server

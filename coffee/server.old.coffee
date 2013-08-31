info = require('dever').debug('Server')
debug = require('dever').debug('Server')
error = require('dever').error('Server')
eventy = require('eventy')
WebsocketServer = require('ws').Server
Port = require('../util/port')

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
    eventy @
    @listen @option.port, (server)=>
      server.on 'connection', @onConnection
      info 'listen on', @option.port

  listen: (port, callback)->
    Port.isTaken port, (taken)=>
      return error "port #{port} is taken" if taken
      callback(new WebsocketServer port: port)

  sendMessage: (message)->
    return error 'disconnected' unless @connected
    return error 'invalid socket' unless @socket
    message = JSON.stringify message
    @socket.send message
    info 'sendMessage', message

  onConnection: (socket)=>
    info 'on connection'
    @socket = socket
    @socket.on 'message', @onMessage
    @socket.on 'close', @onClose
    @socket.on 'error', @onError
    @trigger 'connecting'

  onConnected: ->
    @connected = true
    @trigger 'connected'

  onClose: =>
    info 'on close'
    @connected = false
    @trigger 'disconnected'

  onMessage: (message)=>
    debug 'onMessage', message, typeof message
    message = JSON.parse message
    switch message.type
      when 'handshake' then @onMessageHandshake message

  onError: =>
    info 'on rrror', arguments
    @trigger 'error'

  mismatchProtocol: (protocol)->
    @trigger 'mismatch-protocol'
    info 'protocol does not match', protocol

  onMessageHandshake: (message)=>
    if message.protocol isnt @status.protocol
      return @mismatchProtocol message.protocol    
    debug 'on handshake version', message.version
    @onConnected()
    @sendMessage
      type: 'handshake'
      protocol: @status.protocol
      version: @status.version

module.exports = Server

Server = require('../lib/server')
debug = require('../util/debug')
port = require('../util/port')
WebSocket = require('ws')

debug.output[1] = false
debug.output[2] = false
debug.output[3] = false
debug.output[4] = false

log = debug.log('Server Test:', 2)

server = null
defaultPort = 35730

describe 'Server construction:', ->
  it 'should listen on port 35730 by default', (done)->
    server = new Server
    server.option.port.should.eql defaultPort
    port.isTaken defaultPort, (taken, takenCode)->
      taken.should.be.true
      done()

describe 'Server connection:', ->
  socket = null

  it 'should trigger an event when socket connecting', (done)->
    server.bind 'connecting', ->
      done()

    socket = new WebSocket 'ws://localhost:35730/'

  it 'should decline a wrong handshake protocol', (done)->
    server.bind 'mismatch-protocol', ->
      done()

    socket.send JSON.stringify
      type: 'handshake'
      protocol: 'wrong-protocol'
      version: '1.0'

  it 'should trigger "connected" fater received a correct handshake message', (done)->
    server.bind 'connected', ->
      done()

    socket.send JSON.stringify
      type: 'handshake'
      protocol: 'LR'
      version: '1.0'

  it 'should be able to send message after connected', (done)->
    socket.on 'message', (message)->
      message = JSON.parse message
      message.type.should.eql 'status'
      message.status.should.eql 'rename'
      message.file.should.eql 'test.css'
      done()

    server.sendMessage {type: 'status', status: 'rename', file: 'test.css'}

  it 'should trigger "disconnected" when socket closed', (done)->
    server.bind 'disconnected', ->
      done()

    socket.close()

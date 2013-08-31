debug = require('dever').debug('test/server')
Server = require('../lib/server')
porter = require('../util/porter')
WebSocket = require('ws')

server = null
defaultPort = 35730

describe 'Server construction:', ->
  it 'should listen on port 35730 by default'

describe 'Server connection:', ->
  socket = null

  it 'should trigger "connecting" when a socket is connecting'

  it 'should decline a wrong protocol on handshake'

  it 'should trigger "connected" fater received a correct message on handshake'

  it 'should be able to send message after connected'

  it 'should trigger "disconnected" when socket closed'

Event = require('./event')
Server = require('./server')
Scanner = require('./scanner')
Port = require('../util/port')
log = require('../util/debug').log('Liverefresh')
warn = require('../util/debug').warn('Liverefresh')
error = require('../util/debug').error('Liverefresh')
ScannerAndServerBinder = require('../binder/scanner-server')

class Liverefresh

  @option:
    port: 35730
    path: './'

  @refresh: (path = @option.path, port = @option.port)->
    @listen port, (server)=>
      @watch path, (scanner)=>
        ScannerAndServerBinder scanner, server

  @listen: (port, callback)->
    Port.isTaken port, (taken)=>
      return warn "port #{port} is taken" if taken
      callback(new Server port)

  @watch: (path, callback)->
    callback(new Scanner path)

module.exports = Liverefresh

Server = require('./server')
Scanner = require('./scanner')
Event = require('./event')
log = require('../util/debug').log('Liverefresh')
error = require('../util/debug').error('Liverefresh')
ScannerAndServerBinder = require('../binder/scanner-server')

class Liverefresh

  @option:
    port: 35730
    path: './'

  @refresh: (path = @option.path, port = @option.port)->
    @server = @listen port
    @scanner = @watch path
    @bindScannerAndServer @scanner, @server

  @listen: (port)->
    new Server port

  @watch: (path)->
    new Scanner path

  @bindScannerAndServer: (scanner, server)->
    ScannerAndServerBinder @scanner, @server

exports.refresh = (path, port)->
  Liverefresh.refresh path, port

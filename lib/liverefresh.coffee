Server = require('./server')
Scanner = require('./scanner')
Event = require('./event')
log = require('../util/debug').log('Liverefresh')
error = require('../util/debug').error('Liverefresh')
ScannerAndServerBinder = require('../binder/scanner-server')

class Liverefresh

  option:
    serverPort: 35730
    scanPath: './'

  constructor: (path = './')->
    @option.scanPath = path
    @server = new Server @option.serverPort
    @scanner = new Scanner @option.scanPath
    ScannerAndServerBinder @scanner, @server


module.exports = Liverefresh

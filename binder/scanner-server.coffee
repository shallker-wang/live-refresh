log = require('../util/debug').log('ScannerAndServer')
error = require('../util/debug').error('ScannerAndServer')

class ScannerAndServer

  constructor: (@scanner, @server)->
    log 'constructor'
    @server.bind 'connected', @bind
    @server.bind 'disconnected', @unbind

  bind: =>
    @scanner.bind 'update', @onScannerUpdate
    @scanner.bind 'create', @onScannerCreate
    @scanner.bind 'delete', @onScannerDelete
    @scanner.bind 'change', @onScannerChange
    @scanner.bind 'rename', @onScannerRename

  unbind: =>
    @scanner.unbind 'update', @onScannerUpdate
    @scanner.unbind 'create', @onScannerCreate
    @scanner.unbind 'delete', @onScannerDelete
    @scanner.unbind 'change', @onScannerChange
    @scanner.unbind 'rename', @onScannerRename

  onScannerDelete: (file)=>
    message =
      type: 'status'
      status: 'delete'
      file: file
    @server.sendMessage message

  onScannerCreate: (file)=>
    message =
      type: 'status'
      status: 'create'
      file: file
    @server.sendMessage message

  onScannerUpdate: (file)=>
    message =
      type: 'status'
      status: 'update'
      file: file
    @server.sendMessage message

  onScannerChange: (file)=>
    message =
      type: 'status'
      status: 'change'
      file: file
    @server.sendMessage message

  onScannerRename: (file)=>
    message =
      type: 'status'
      status: 'rename'
      file: file
    @server.sendMessage message


module.exports = (scanner, server)->
  new ScannerAndServer scanner, server

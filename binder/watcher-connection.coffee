dever = require('dever')
info = dever.info('WatcherAndConnectionBinder')
warn = dever.warn('WatcherAndConnectionBinder')
debug = dever.debug('WatcherAndConnectionBinder')
error = dever.error('WatcherAndConnectionBinder')

class WatcherAndConnectionBinder

  constructor: (@watcher, @connection)->
    @bind()
    @connection.on 'close', @unbind

  bind: =>
    @watcher.on 'update', @onWatcherUpdate
    @watcher.on 'create', @onWatcherCreate
    @watcher.on 'delete', @onWatcherDelete
    @watcher.on 'change', @onWatcherChange
    @watcher.on 'rename', @onWatcherRename

  unbind: =>
    @watcher.off 'update', @onWatcherUpdate
    @watcher.off 'create', @onWatcherCreate
    @watcher.off 'delete', @onWatcherDelete
    @watcher.off 'change', @onWatcherChange
    @watcher.off 'rename', @onWatcherRename

  onWatcherDelete: (file)=>
    message =
      type: 'status'
      status: 'delete'
      file: file
    @connection.sendMessage message

  onWatcherCreate: (file)=>
    message =
      type: 'status'
      status: 'create'
      file: file
    @connection.sendMessage message

  onWatcherUpdate: (file)=>
    message =
      type: 'status'
      status: 'update'
      file: file
    @connection.sendMessage message

  onWatcherChange: (file)=>
    message =
      type: 'status'
      status: 'change'
      file: file
    @connection.sendMessage message

  onWatcherRename: (file)=>
    message =
      type: 'status'
      status: 'rename'
      file: file
    @connection.sendMessage message


module.exports = WatcherAndConnectionBinder

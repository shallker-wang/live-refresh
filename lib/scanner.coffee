log = require('../util/debug').log('Scanner')
error = require('../util/debug').error('Scanner')
Event = require('./event')
fs = require('fs')
Notify = require('fs.notify')

class Scanner

  extensions: [
    'jpg',
    'jpeg',
    'css',
    'js',
    'html'
  ]

  foldersWatched: []
  foldersIgnored: [
    '.git',
    'node_modules'
  ]

  option:
    deepScan: true

  constructor: (path = './')->
    log 'constructor'
    Event.attachTo @
    @root = path.replace(/\/$/, '') + '/'
    @watch @root

  watch: (folder)->
    log 'watch', folder
    folder = folder.replace(/\/$/, '') + '/'
    files = fs.readdirSync folder
    files.forEach (file, index)=>
      if fs.statSync(folder + file).isDirectory()
        return if ~@foldersIgnored.indexOf(file)
        # ignore hidden folder
        return if file.match(/^\./) isnt null
        if @option.deepScan then @watch folder + file
      else
        return unless @isScanableFile file
        return if ~@foldersWatched.indexOf(folder)
        @foldersWatched.push folder
        fs.watch folder, (eventName, fileName)=>
          @onWatch eventName, folder + fileName

  notifyWatch: (path, notify = null)->
    log 'watch', path
    path = path.replace(/\/$/, '') + '/'
    if notify is null
      notify = new Notify
      notify.on 'change', @onChange
    files = fs.readdirSync path
    files.forEach (file, index)=>
      if fs.statSync(path + file).isDirectory()
        if @deepScan then @watch path + file, notify
      else
        return unless @isScanableFile file
        notify.add file

  onWatch: (eventName, filePath)=>
    log 'onWatch', eventName, filePath
    return unless @isScanableFile filePath
    switch eventName
      when 'change' then @onChange filePath
      when 'rename' then @onRename filePath

  isScanableFile: (fileName)->
    ~@extensions.indexOf fileName.split('.').pop()

  onChange: (filePath)=>
    log 'onChange', filePath
    @trigger 'change', [filePath]

  onRename: (filePath)=>
    log 'onRename', filePath
    @trigger 'rename', [filePath]


module.exports = Scanner

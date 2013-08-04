log = require('../util/debug').log('Scanner')
error = require('../util/debug').error('Scanner')
Event = require('./event')
fs = require('fs')

class Scanner

  extensions: [
    'jpg',
    'jpeg',
    'css',
    'js',
    'html',
    'jade',
    'coffee',
    'stylus'
  ]

  option:
    deepScan: true

  constructor: (path = './')->
    log 'constructor'
    @path = path.replace(/\/$/, '') + '/'
    Event.attachTo @
    @watch @path

  watch: (path)->
    log 'watch', path
    path = path.replace(/\/$/, '') + '/'
    fs.watch path, {interval: 1000}, @onWatch

    # deep watch
    if @option.deepScan
      files = fs.readdirSync path
      files.forEach (file, index)=>
        if fs.statSync(path + file).isDirectory()
          @watch(path + file)

  onWatch: (eventName, fileName)=>
    log 'onWatch', eventName, fileName
    return unless @isScanableFile fileName
    switch eventName
      when 'change' then @onChange fileName
      when 'rename' then @onRename fileName

  isScanableFile: (fileName)->
    ~@extensions.indexOf fileName.split('.').pop()

  onChange: (fileName)=>
    log 'onChange', fileName
    @trigger 'change', [fileName]

  onRename: (fileName)=>
    log 'onRename', fileName
    @trigger 'rename', [fileName]


module.exports = Scanner

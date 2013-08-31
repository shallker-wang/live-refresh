debug = require('dever').debug('Scanner')
error = require('dever').error('Scanner')
eventy = require('eventy')
fs = require('fs')

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
    debug 'constructor'
    eventy @
    @root = path.replace(/\/$/, '') + '/'
    @watch @root

  watch: (folder)->
    debug 'watch', folder
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

  onWatch: (eventName, filePath)=>
    debug 'onWatch', eventName, filePath
    return unless @isScanableFile filePath
    switch eventName
      when 'change' then @onChange filePath
      when 'rename' then @onRename filePath

  isScanableFile: (fileName)->
    ~@extensions.indexOf fileName.split('.').pop()

  onChange: (filePath)=>
    debug 'onChange', filePath
    @trigger 'change', [filePath]

  onRename: (filePath)=>
    debug 'onRename', filePath
    @trigger 'rename', [filePath]


module.exports = Scanner

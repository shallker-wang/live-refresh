Scanner = require('../lib/scanner')
fs = require('fs')

scanner = null
scanPath = './test'

describe 'Scanner construction:', ->
  it 'should watch the path of given', ->
    scanner = new Scanner scanPath

describe 'Scanner.isScanableFile():', ->
  it 'should scan .js file', ->
    scanner.isScanableFile('test.js').should.be.ok

  it 'should scan .css file', ->
    scanner.isScanableFile('test.css').should.be.ok

  it 'should scan .html file', ->
    scanner.isScanableFile('test.html').should.be.ok

  it 'should not scan .mp3 file', ->
    scanner.isScanableFile('test.mp3').should.not.be.ok

describe 'Scanner events:', ->
  testFile = scanPath + '/test.css'

  it 'should trigger "rename" when a css file is created', (done)->
    onRename = ->
      done()
      scanner.unbind 'rename', onRename
      
    scanner.bind 'rename', onRename
    fs.writeFileSync testFile, 'body {color: green;}'

  it 'should trigger "rename" when a css file is deleted', (done)->
    onRename = ->
      done()
      scanner.unbind 'rename', onRename
      
    scanner.bind 'rename', onRename
    fs.unlinkSync testFile

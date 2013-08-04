Scanner = require('../lib/scanner')
fs = require('fs')

scanner = null

describe 'Scanner construction:', ->
  it 'should watch the path of given', ->
    scanner = new Scanner './'

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
  it 'should trigger rename event when a new file created', ->
    onRename = (fileName)=>
      console.log 'rename'
      # fileName.should.eql 'test.css'
      throw 'test'
    
    scanner.bind 'rename', onRename

    createFile = ->
      fs.writeFileSync 'test.css', 'body {color: green;}'
    
    deleteFile = ->
      fs.unlinkSync 'test.css'

    createFile()
    deleteFile()
    # createFile.should.throw()
    # deleteFile().should.throw()

Watcher = require('../lib/watcher')
fs = require('fs')

scanner = null
scanPath = './test'

describe 'Scanner construction:', ->
  it 'should watch the path of given'

describe 'Scanner.isScanableFile():', ->
  it 'should scan .js file'

  it 'should scan .css file'

  it 'should scan .html file'

  it 'should not scan .mp3 file'

describe 'Scanner events:', ->
  testFile = scanPath + '/test.css'

  it 'should trigger "rename" when a css file is created'

  it 'should trigger "rename" when a css file is deleted'
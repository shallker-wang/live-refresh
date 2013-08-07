index = require('../index')

describe 'Require index', ->
  it 'should export .version', ->
    index.version.should.be.a('string')

  it 'should export .refresh()', ->
    index.refresh.should.be.a('function')

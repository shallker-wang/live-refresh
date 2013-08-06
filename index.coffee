Liverefresh = require('./lib/liverefresh')

exports.version = '1.1.0'

exports.refresh = (path = './')->
  Liverefresh.refresh path

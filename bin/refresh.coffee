command = require('commander')
Liverefresh = require('../lib/liverefresh')

command
  .version('0.1.0')
  .parse(process.argv)

if command.args.length
  path = command.args.shift()
  return new Liverefresh(path)

command.help()

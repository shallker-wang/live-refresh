/* concept

var liverefresh = require('live-refresh');


.set('watch.deep', false)
.set('watch.interval', 500)
.set('watch.persistent', true)
.set('watch.extensions', ['js', 'css', 'html'])
.set('ignore.files', [/^\./])
.set('ignore.directories', [/node_modules/, /^\.\S/])
.set(port', 2345)
.get(port')

.watch('./build/js')
.watch('./build/css')
.unwatch('./build/css')
.stop()

.on('connect', function(connection) {
  // send a refresh signal to chrome extension
  .refresh()
  .close()
  .on('close')
})

.on('stop', function() {})


*/

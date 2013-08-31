/* concept

var Watcher = require('./watcher');
var watcher = new Watcher

.set('watch.deep', false)
.set('watch.interval', 500)
.set('watch.persistent', true)
.set('watch.extensions', ['js', 'css', 'html'])
.set('ignore.files', [/^\./])
.set('ignore.directories', [/node_modules/, /^\.\S/])
.get('watch.interval', 500)
.watch('./build/js')
.path
.stop()

.on('change', function(file) {})
.on('rename', function(file) {})
.on('stop', function() {})
.off('stop', function() {})

*/


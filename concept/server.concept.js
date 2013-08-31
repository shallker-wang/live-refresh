/* conpcept
var Server = require('./server');

var server = new Server

.set('port', 5634)
.get('port', 2342)
.run()
.stop()

.on('connect', function(connection) {
  .sendMessage()
  .sendRefresh()
  .close()
  .on('close', function() {})
  .off()
})
.off()

*/

var net = require('net');

exports.isTaken = function(port, callback) {
  var host = null,
      server = net.createServer(function() {});

  function onError(err) {
    server.removeListener('listening', onListen);
    // if (err.code !== 'EADDRINUSE' && err.code !== 'EACCES') {}
    callback(true, err.code);
  }

  function onListen() {
    server.removeListener('error', onError);
    server.close();
    callback(false);
  }

  server.once('error', onError);
  server.once('listening', onListen);
  server.listen(port, host);
}

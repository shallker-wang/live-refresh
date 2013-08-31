var info = require('dever').info('Liverefresh', 'Server'),
    warn = require('dever').warn('Liverefresh', 'Server'),
    error = require('dever').error('Liverefresh', 'Server'),
    debug = require('dever').debug('Liverefresh', 'Server'),
    eventy = require('eventy'),
    porter = require('../util/porter'),
    Connector = require('./connector'),
    WebsocketServer = require('ws').Server;


module.exports = function Server() {
  var websocketServer;

  var option = {
    port: 35730
  }

  var server = function() {
    return this;
  }.call(eventy({}));

  function listen(port) {
    porter.isTaken(port, function(yes) {
      if (yes) {
        warn('port ' + port + ' is already taken');
        info('maybe another liverefresh is running');
        return;
      }
      websocketServer = new WebsocketServer({port: port});
      websocketServer.on('connection', function(socket) {
        var connector = new Connector(socket);
        connector.on('connected', function(connection) {
          server.trigger('connect', connection);
        });
      })
      info('listen on', port);
    })
  }

  function setter(option, names, value) {
    var name = names.shift();
    if (!option[name]) {
      return;
    }
    if (names.length) {
      return setter(option[name], names, value);
    }
    return option[name] = value;
  }

  function getter(option, names) {
    var name = names.shift();
    if (!option[name]) {
      return;
    }
    if (names.length) {
      return getter(option[name], names);
    }
    return option[name];
  }

  server.set = function(chain, value) {
    setter(option, chain.split('.'), value);
    return this;
  }

  server.get = function(chain) {
    return getter(option, chain.split('.'));
  }

  server.run = function() {
    listen(option.port);
    return this;
  }

  /* not that useful in async world */
  server.stop = function() {
    websocketServer && websocketServer.close() && (websocketServer = null)
    this.trigger('stop');
  }
  
  return server;  
}

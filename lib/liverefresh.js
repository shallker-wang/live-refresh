var info = require('dever').info('Liverefresh'),
    warn = require('dever').warn('Liverefresh'),
    error = require('dever').error('Liverefresh'),
    debug = require('dever').debug('Liverefresh'),
    pkg = require('../package'),
    eventy = require('eventy'),
    Server = require('./server'),
    Watcher = require('./watcher'),
    WatcherAndConnectionBinder = require('./binder/watcher-connection');


var server,
    watchers = [],
    option = {};

var liverefresh = function () {
  this.version = pkg.version;
  return this;
}.call(eventy({}));

function reset() {
  server = null;
  watchers = [];
  option = {};
}

liverefresh.set = function (name, value) {
  option[name] = value;
  return this;
}

liverefresh.get = function (name) {
  return option[name];
}

liverefresh.watch = function (path) {
  if (!server) {
    server = new Server;
    for (var name in option) {
      server.set(name, option[name]);
    }
    server.on('connect', function (connection) {
      connection.refresh = connection.sendRefresh;
      watchers.forEach(function (watcher, index) {
        new WatcherAndConnectionBinder(watcher, connection);
      });
      liverefresh.trigger('connect', connection);
    });
    server.run();
  }
  var watcher = new Watcher;
  for (var name in option) {
    watcher.set(name, option[name]);
  }
  watcher.watch(path);
  watchers.push(watcher);
  return this;
}

liverefresh.unwatch = function (path) {
  for (var i in watchers) {
    if (watchers[i].path === path) {
      watchers[i].stop();
    }
  }
  return this;
}

liverefresh.stop = function () {
  info('stop');
  for (var i in watchers) {
    watchers[i].stop();
  }
  server.stop();
  reset();
  this.trigger('stop');
  return this;
}

module.exports = liverefresh;

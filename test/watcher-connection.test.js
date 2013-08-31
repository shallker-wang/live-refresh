var debug = require('dever').debug('watcher-connection.test'),
    error = require('dever').error('watcher-connection.test'),
    toString = Object.prototype.toString,
    ok = require('assert').ok,
    eq = require('assert').strictEqual,
    s = function(data) { eq(toString.call(data), '[object String]') },
    f = function(data) { eq(toString.call(data), '[object Function]') },
    a = function(data) { eq(toString.call(data), '[object Array]') },
    o = function(data) { eq(toString.call(data), '[object Object]') };


var WatcherAndConnection = require('../lib/binder/watcher-connection')

var event = {
  on: function() {},
  off: function() {},
  trigger: function() {}  
}

var watcher = event,
    connection = event;

new WatcherAndConnection(watcher, connection)


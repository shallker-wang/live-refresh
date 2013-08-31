var debug = require('dever').debug('connector.test'),
    error = require('dever').error('connector.test'),
    ok = require('assert').ok,
    eq = require('assert').strictEqual,
    s = function (data) {eq(Object.prototype.toString.call(data), '[object String]')},
    f = function (data) {eq(Object.prototype.toString.call(data), '[object Function]')},
    a = function (data) {eq(Object.prototype.toString.call(data), '[object Array]')},
    b = function (data) {eq(Object.prototype.toString.call(data), '[object Boolean]')},
    o = function (data) {eq(Object.prototype.toString.call(data), '[object Object]')};

var Connector = require('../lib/connector')
var socket = {
  on: function() {},
  send: function() {}
}
var connector = new Connector(socket)

s(connector.version)
f(connector.on)
f(connector.off)
f(connector.close)

connector.on('connected', function(connection) {
  s(connection.version)
  s(connection.client)
  f(connection.sendMessage)
  f(connection.sendRefresh)
  f(connection.close)
  f(connection.on)
  f(connection.off)

  // connection.sendMessage()
  // connection.sendRefresh()
  // connection.close()
  // connection.on('close', function() {})
  // connection.on('error', function() {})
  // connection.off()  
})

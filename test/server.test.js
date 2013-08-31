var debug = require('dever').debug('server.test'),
    error = require('dever').error('server.test'),
    ok = require('assert').ok,
    eq = require('assert').strictEqual,
    s = function (data) {eq(Object.prototype.toString.call(data), '[object String]')},
    f = function (data) {eq(Object.prototype.toString.call(data), '[object Function]')},
    a = function (data) {eq(Object.prototype.toString.call(data), '[object Array]')},
    b = function (data) {eq(Object.prototype.toString.call(data), '[object Boolean]')},
    o = function (data) {eq(Object.prototype.toString.call(data), '[object Object]')};

var Server = require('../lib/server')
var server = new Server

f(server.set)
f(server.get)
f(server.run)
f(server.stop)

ok(server.set('port', 35731))
eq(server.get('port'), 35731)

server.on('connect', function(connection) {
  connection.sendMessage('hello');
  connection.sendRefresh()
  connection.on('close',function(){
    console.log('on close');
  })
  connection.close()
})

server.run();

setTimeout(function() {
  server.stop();
}, 1000)

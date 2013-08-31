var debug = require('dever').debug('liverefresh.test'),
    error = require('dever').error('liverefresh.test'),
    ok = require('assert').ok,
    eq = require('assert').strictEqual,
    s = function (data) {eq(Object.prototype.toString.call(data), '[object String]')},
    f = function (data) {eq(Object.prototype.toString.call(data), '[object Function]')},
    a = function (data) {eq(Object.prototype.toString.call(data), '[object Array]')},
    b = function (data) {eq(Object.prototype.toString.call(data), '[object Boolean]')},
    o = function (data) {eq(Object.prototype.toString.call(data), '[object Object]')};


var liverefresh = require('../lib/liverefresh')

f(liverefresh.set)
f(liverefresh.get)
f(liverefresh.watch)
f(liverefresh.unwatch)
f(liverefresh.stop)
f(liverefresh.on)
f(liverefresh.off)

ok(liverefresh.set('watch.deep', false))
eq(liverefresh.get('watch.deep'), false)
ok(liverefresh.set('watch.interval', 500))
eq(liverefresh.get('watch.interval'), 500)

ok(liverefresh.set('watch.extensions', ['js', 'html']))
eq(liverefresh.get('watch.extensions').length, 2)

// ok(liverefresh.set('port', 35732))
// eq(liverefresh.get('port'), 35732)

liverefresh.on('connect', function (connection) {
  ok(connection)
  s(connection.version)
  f(connection.on)
  f(connection.off)
  f(connection.refresh)
  f(connection.close)
  
  connection.on('close', function () {
    debug('on close')
  })

  setTimeout(function () {
    connection.refresh()
    setTimeout(function () {
      ok(liverefresh.unwatch('./lib'))
      setTimeout(function () {
        connection.close()
        setTimeout(function() {
          ok(liverefresh.stop())
        }, 3000)
      }, 3000)
    }, 3000)
  }, 3000)

})

liverefresh.on('stop', function() {
  debug('stop')
})

ok(liverefresh.watch('./'))
ok(liverefresh.watch('./lib'))

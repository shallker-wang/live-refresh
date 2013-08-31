var debug = require('dever').debug('watcher.test'),
    error = require('dever').error('watcher.test'),
    ok = require('assert').ok,
    eq = require('assert').strictEqual,
    s = function (data) {eq(Object.prototype.toString.call(data), '[object String]')},
    f = function (data) {eq(Object.prototype.toString.call(data), '[object Function]')},
    a = function (data) {eq(Object.prototype.toString.call(data), '[object Array]')},
    o = function (data) {eq(Object.prototype.toString.call(data), '[object Object]')};

var Watcher = require('../lib/watcher')
var watcher = new Watcher;

f(watcher.set)
f(watcher.get)
f(watcher.watch)
f(watcher.stop)
f(watcher.on)
f(watcher.off)

watcher.set('watch.interval', 500)
eq(watcher.get('watch.interval'), 500)

watcher.set('watch.extensions', ['js', 'css', 'html', 'png'])
eq(watcher.get('watch.extensions').length, 4)

watcher.on('change', function (filename) {
  debug('on change', filename)
})

watcher.on('rename', function (filename) {
  debug('on rename', filename)
})

watcher.on('stop', function () {
  debug('on stop')
})

watcher.watch('./')

eq(watcher.path, './')

setTimeout(function() {
  watcher.stop()
}, 100000)


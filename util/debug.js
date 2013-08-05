var debug = new Object;

debug.output = {
  1: false,
  2: true,
  3: true
}

module.exports = exports = debug;

exports.log = function(masterName, outputLevel) {
  if (typeof outputLevel === 'undefined') {
    outputLevel = 1;
  }
  return function() {
    if (!debug.output[outputLevel]) return;
    var args = Array.prototype.slice.call(arguments);
    args.unshift(masterName);
    console.log.apply(console, args);
  }
}

exports.error = function(masterName) {
  return function(message) {
    err = new Error(message)
    err.from = masterName
    throw err
  }
}

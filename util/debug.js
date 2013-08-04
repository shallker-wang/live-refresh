var debug = new Object;

debug.output = {
  level: {
    1: false,
    2: true,
    3: true
  }
}

debug.log = function(masterName, level) {
  if (typeof level === 'undefined') {
    level = 1;
  }
  return function() {
    if (!debug.output.level[level]) return;
    var argumentsArray = Array.prototype.slice.call(arguments);
    argumentsArray.unshift(masterName);
    console.log.apply(console, argumentsArray);    
  }
}

debug.set = function(name, value) {
  if (typeof debug.set[name] === 'function') return debug.set[name](value);
  debug[name] = value;
  return debug;
}

debug.get = function(name) {
  if (typeof debug.get[name] === 'function') return debug.get[name](name);
  return debug[name];
}

debug.error = function(masterName) {
  return function(message) {
    err = new Error(message)
    err.from = masterName
    throw err
  }
}

module.exports = debug;

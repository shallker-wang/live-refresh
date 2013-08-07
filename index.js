require("coffee-script")
var liverefresh = require('./lib/liverefresh')

exports.version = '1.1.1';

exports.refresh = function(path) {
  path = path || './';
  liverefresh.refresh(path);  
}

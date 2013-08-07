require("coffee-script")
var liverefresh = require('./lib/liverefresh')

exports.version = '1.1.0';

exports.refresh = function(path) {
  path = path || './';
  liverefresh.refresh(path);  
}

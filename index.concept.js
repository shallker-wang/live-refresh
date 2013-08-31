/* concept

var liverefresh = require('live-refresh');

liverefresh
  .set('delay', 200)
  .set('extensions', ['js', 'css', 'html'])
  .watch('./path')

// send a refresh signal to chrome extension
liverefresh.refresh()

liverefresh.version

*/
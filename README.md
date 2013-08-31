live-refresh
==========

LiveReload was too hard for me to understand, so I wrote LiveRefresh.

[![Build Status](https://drone.io/github.com/shallker-wang/live-refresh/status.png)](https://drone.io/github.com/shallker-wang/live-refresh/latest)

## Installation
```
sudo npm install live-refresh -g
```

## Quick Start
Go to project and live refresh current directory:
```bash
cd project-x
refresh .
```

## Features
* Refresh the page when .jpg .jpeg .js .html files changed, created or deleted
* CSS styles auto reload when .css file changed without refreshing the page

## Module API
```javascript
var liverefresh = require('live-refresh');
```

### set(option, value)
Liverefresh option setter.

```javascript
liverefresh.set('watch.deep', true);
liverefresh.set('watch.interval', 500);
liverefresh.set('watch.persistent', true);
liverefresh.set('watch.extensions', ['js', 'css', 'html']);
liverefresh.set('ignore.files', [/^\./]);
liverefresh.set('ignore.directories', [/node_modules/, /^\.\S/]);
```

### watch(path)
Create a Liverefresh server and watch file changes on the given path.

```javascript
liverefresh.watch('project/x');
liverefresh.watch('./build/html').watch('./build/css');
```

### unwatch(path)
Remove watched path.

```javascript
liverefresh.unwatch('./build/css');
```

### stop()
Stop liverefresh server and file watchers.

```javascript
liverefresh.stop();
```

### on(event, callback)
Add event listener.

```javascript
liverefresh.on('connect', function(connection) {)
liverefresh.on('stop', function() {})
```

### off(event, callback)
Remove event listener.

```javascript
function onConnect() {}
liverefresh.on('connect', onConnect);
liverefresh.off('connect', onConnect);
```

### connection.refresh()
Send a refresh command to the connected client.

```javascript
liverefresh.on('connect', function(connection) {
  connection.refresh();
})
```

### connection.close()
Close the connection from client.

```javascript
connection.close()
```

### connection.on(event, callback)
Add event listener on connection.

```javascript
connection.on('close', function() {})
```


## Install Chrome extension
[LiveRefresh Chrome Extension](https://github.com/shallker-wang/live-refresh-chrome-extension)

## License (MIT)

Copyright (c) 2013 Shallker Wang

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

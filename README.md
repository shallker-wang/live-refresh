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
### refresh(path = './')
Create a Liverefresh server and watch file changes on the given path.

```javascript
var liverefresh = require('live-refresh');
liverefresh.refresh('project/x');
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

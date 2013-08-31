/*jslint indent: 2 */
var info = require('dever').info('Liverefresh', 'Watcher'),
    warn = require('dever').warn('Liverefresh', 'Watcher'),
    error = require('dever').error('Liverefresh', 'Watcher'),
    debug = require('dever').debug('Liverefresh', 'Watcher'),
    eventy = require('eventy'),
    fs = require('fs');

module.exports = function Watcher() {
  var option = {
    watch: {
      deep: true,
      interval: 100,
      persistent: true,
      extensions: ['js', 'css', 'html']
    },
    ignore: {
      files: [/^\./],
      directories: [/node_modules/, /^\.\S/]
    }
  }

  var watch = {
    files: [],
    directories: []
  }

  var fsWatchers = [];

  /* start watcher object */
  var watcher = function () {
    this.path = '';

    this.on('add-watch-file', function (filepath) {
      debug('on add-watch-file', filepath);
      // fsWatch(filepath);
    });

    this.on('add-watch-folder', function (folderpath) {
      debug('on add-watch-folder', folderpath);
      fsWatch(folderpath);
    });

    return this;
  }.call(eventy({}));

  function fsWatch(path) {
    debug('fsWatch', path);
    fsWatchers.push(fs.watch(path, {
        persistent: option.watch.persistent,
        interval: option.watch.interval
      }, function (eventName, fileName) {
        debug(eventName, fileName);
        switch (eventName) {
          case 'change':
            watcher.trigger('change', fileName);
            break;
          case 'rename':
            watcher.trigger('rename', fileName);
            break;
          default:
            watcher.trigger(eventName, fileName);
        }
      }
    ))
  }

  function validFilename(filename) {
    for (var i in option.ignore.files) {
      if (filename.match(option.ignore.files[i])) {
        return false;
      }
    }
    if (~option.watch.extensions.indexOf(filename.split('.').pop())) {
      return true;
    }
    return false;
  }

  function validFoldername(foldername) {
    for (var i in option.ignore.directories) {
      if (foldername.match(option.ignore.directories[i])) {
        return false;
      }
    }
    return true;
  }

  function watchableFolder(folderfiles) {
    for (var i in folderfiles) {
      if (validFilename(folderfiles[i])) {
        return true;
      }
    }
    return false;
  }

  /* parse folder recursively, and list out watchable folders and files */
  function parseFolder(path) {
    path = path.replace(/\/$/, '');

    fs.readdir(path, function (err, files) {
      if (err) {return error(err)}
      if (watchableFolder(files)) {
        watch.directories.push(path);
        watcher.trigger('add-watch-folder', path);
      }
      if (!option.watch.deep) {return;}
      files.forEach(function (file, index) {
        fs.stat(path + '/' + file, function (err, stats) {
          if (err) {return error(err)}
          if (stats.isDirectory() && validFoldername(file)) {
            return parseFolder(path + '/' + file);
          }
          // list out valid files
          if (validFilename(file)) {
            watch.files.push(path + '/' + file);
            watcher.trigger('add-watch-file', path + '/' + file);
          }
        });
      });
    });
  }

  function setter(option, names, value) {
    var name = names.shift();
    if (!option[name]) {
      return;
    }
    if (names.length) {
      return setter(option[name], names, value);
    }
    return option[name] = value;
  }

  function getter(option, names) {
    var name = names.shift();
    if (!option[name]) {
      return;
    }
    if (names.length) {
      return getter(option[name], names);
    }
    return option[name];
  }

  watcher.set = function (chain, value) {
    setter(option, chain.split('.'), value);
    return this;
  }

  watcher.get = function(chain) {
    return getter(option, chain.split('.'));
  }

  watcher.watch = function (path) {
    this.path = path;

    fs.stat(path, function (err, stats) {
      if (err) {return error(err)}
      if (stats.isDirectory()) {
        parseFolder(path);
      } else {
        fsWatch(path);
      }
    })
    return this;
  }

  /* call this immediately after the watch means nothing, this is async world */
  watcher.stop = function () {
    fsWatchers.forEach(function (watcher, index) {
      debug('close watcher', watcher);
      watcher.close();
    });
    watch.files = [];
    watch.directories = [];
    this.trigger('stop');
  }

  return watcher;
}

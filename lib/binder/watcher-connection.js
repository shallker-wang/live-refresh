var debug = require('dever').debug('WatcherAndConnectionBinder'),
    error = require('dever').error('WatcherAndConnectionBinder');

module.exports = function WatcherAndConnectionBinder(watcher, connection) {
  var binder = function() {
    this.bind = function() {
      watcher.on('update', onWatcherUpdate);
      watcher.on('create', onWatcherCreate);
      watcher.on('delete', onWatcherDelete);
      watcher.on('change', onWatcherChange);
      watcher.on('rename', onWatcherRename);
    }

    this.unbind = function() {
      debug('unbind');
      watcher.off('update', onWatcherUpdate);
      watcher.off('create', onWatcherCreate);
      watcher.off('delete', onWatcherDelete);
      watcher.off('change', onWatcherChange);
      watcher.off('rename', onWatcherRename);
    }

    this.bind();
    connection.on('close', this.unbind);
    watcher.on('stop', this.unbind);

    return this;
  }.call({});

  function onWatcherUpdate(file) {
    connection.sendMessage({
      type: 'status',
      status: 'update',
      file: file
    })
  }

  function onWatcherCreate(file) {
    connection.sendMessage({
      type: 'status',
      status: 'create',
      file: file
    })
  }

  function onWatcherDelete(file) {
    connection.sendMessage({
      type: 'status',
      status: 'delete',
      file: file
    })
  }

  function onWatcherChange(file) {
    connection.sendMessage({
      type: 'status',
      status: 'change',
      file: file
    })
  }

  function onWatcherRename(file) {
    connection.sendMessage({
      type: 'status',
      status: 'rename',
      file: file
    })
  }

  return binder;
}

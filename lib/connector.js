var info = require('dever').info('Liverefresh', 'Connector'),
    warn = require('dever').warn('Liverefresh', 'Connector'),
    error = require('dever').error('Liverefresh', 'Connector'),
    debug = require('dever').debug('Liverefresh', 'Connector'),
    eventy = require('eventy');

module.exports = function Connector(socket) {
  var version = '1.0',
      protocol = 'LR';

  var connector = function () {
    info('connecting');
    this.version = version;
    this.protocol = protocol;
    this.client = 'unknown';
    this.trigger('connecting');

    socket.on('message', onMessage);
    socket.on('close', onClose);
    socket.on('error', onError);

    return this;
  }.call(eventy({}));

  function onClose() {
    info('closed')
    connector.trigger('close');
  }

  function onError(err) {
    error(err)
    connector.trigger('error');
  }

  function onMessage(mesg) {
    debug('onMessage', mesg);
    mesg = JSON.parse(mesg);
    switch (mesg.type) {
      case 'handshake':
        onMessageHandshake(mesg);
    }
  }

  function sendMessage(mesg) {
    info('send message', mesg);
    socket.send(JSON.stringify(mesg));
  }
  
  function onMessageHandshake(mesg) {
    if (mesg.protocol !== protocol) {
      warn('protocol ' + mesg.protocol + ' does not match' + protocol);
      return connector.trigger('mismatch-protocol');
    }

    sendMessage({
      type: 'handshake',
      protocol: protocol,
      version: version
    })

    info('connected')
    debug('client version', mesg.version);

    var connection = function() {
      this.client = mesg.version;
      return this;
    }.call(connector);

    connection.sendMessage = sendMessage;

    connection.sendRefresh = function() {
      debug('sendRefresh');
      this.sendMessage({
        type: 'command',
        command: 'refresh-page'
      })
    }

    connector.trigger('connected', connection);
  }

  connector.close = function() {
    socket.close();
  }

  return connector;
}

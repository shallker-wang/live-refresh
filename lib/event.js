var log = require('../util/debug').log('Event');

function error(message) {
  var err = new Error(message);
  err.from = 'Event';
  throw err;
}

function Event() {

  var self = this;

  /* Check if this is the first time binding an event */
  function isRegistered(eventName) {
    if (typeof self._eventStack[eventName] === 'undefined') {
      return false;
    }
    return true;
  }

  /**
   * Take a position in the event stack.
   * @param {String} eventName
   * @return {Array} event callback list
   */
  function registerEvent(eventName) {
    log('register', eventName);
    if (typeof self._eventStack[eventName] !== 'undefined') {
      return error('event ' + eventName + ' already registered');
    }
    return self._eventStack[eventName] = [];
  }

  /* Remove event from event stack */
  function unregisterEvent(eventName) {
    return delete self._eventStack[eventName];
  }

  /* Append a listener into event callback list */
  function appendEventListener(eventName, eventCallback) {
    return self._eventStack[eventName].push(eventCallback);
  }

  /* Delete one callback from event callback list */
  function deleteEventListener(eventName, eventListener) {
    var callbacks = getEventCallbacks(eventName);
    callbacks.forEach(function(callback, index) {
      if (callback === eventListener) {
        callbacks.splice(index, 1);
      }
    })
    return resetEventCallbacks(eventName, callbacks);
  }

  /* Return the callback list of the event */
  function getEventCallbacks(eventName) {
    if (!isRegistered(eventName)) {
      return error('event ' + eventName + 'is not registered');
    }
    return self._eventStack[eventName];
  }

  /* Overwrite event callback list */
  function resetEventCallbacks(eventName, eventCallbacks) {
    return self._eventStack[eventName] = eventCallbacks;
  }

  this._eventStack = {};

  /**
   * Append a listener into event's callback list
   * @param {String} eventName
   * @param {Function} eventCallback
   * @return {Object} event object itself
   */
  this.bind = function(eventName, eventCallback) {
    if (!isRegistered(eventName)) {
      registerEvent(eventName);
    }
    appendEventListener(eventName, eventCallback);
    return this;
  }

  /**
   * Calling every listeners of the event.
   * @param {String} eventName
   * @param {Array} callbackArguments
   * @return {Object} event object itself
   */
  this.trigger = function(eventName, callbackArguments) {
    log('trigger', eventName);
    if (!isRegistered(eventName)) {
      return this;
    }
    if (typeof callbackArguments === 'undefined') {
      callbackArguments = [];
    }
    var callbacks = this._eventStack[eventName];
    callbacks.forEach(function(callback, index) {
      if (typeof callback !== 'function') {
        return error('event ' + eventName + ' callback is not a function');
      }
      callback.apply({}, callbackArguments);
    })
    return this;
  }

  /**
   * Remove one callback from event callback list
   * @param {String} eventName
   * @param {Function} eventCallback
   * @return {Boolean} result of the deletion of the event callback
   */
  this.unbind = function(eventName, eventCallback) {
    if (!isRegistered(eventName)) {
      return this;
    }
    if (typeof eventCallback === 'undefined') {
      return unregisterEvent(eventName);
    }
    return deleteEventListener(eventName, eventCallback);
  }
}

module.exports = exports = new Event;

/* Instsall event to an object */
exports.attachTo = function(object) {
  Event.call(object);
}

/* Enable debug output */
exports.debug = function(enable) {
  logger.output = enable;
}

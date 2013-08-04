var Event = require('../lib/event');

// Event.debug(true);

describe('Event bind and trigger:', function() {
  it('should bind event listener to event and able to trigger the event', function() {
    Event.bind('test-bind-and-trigger', function() {throw 'done'});
    (function() {
      Event.trigger('test-bind-and-trigger');
    }).should.throw();
  })

  it('should bind multiple listeners to one event', function() {
    var fruits = ['apple'];
    Event.bind('test-multiple-listeners', function(arr) {arr.push('pear')});
    Event.bind('test-multiple-listeners', function(arr) {arr.push('banana')});
    Event.trigger('test-multiple-listeners', [fruits]);
    fruits.should.eql(['apple', 'pear', 'banana']);
  })

  it('should pass arguments to the event callback', function() {
    var fruits = ['apple'];
    Event.bind('test-arguments', function(arg) {arg.push('pear')});
    Event.trigger('test-arguments', [fruits]);
    fruits.should.eql(['apple', 'pear']);
  })

  it('should throw an error if event callback is not a function', function() {
    Event.bind('callback-is-not-a-function', 'callback');
    (function() {
      Event.trigger('callback-is-not-a-function');
    }).should.throw();
  })
})

describe('Event unbind:', function() {
  it('should unbind listener of the event', function() {
    function throwError() {
      throw 'error';
    }

    Event.bind('test-unbind', throwError);
    (function() {
      Event.trigger('test-unbind');
    }).should.throw()
    Event.unbind('test-unbind', throwError);
    (function() {
      Event.trigger('test-unbind');
    }).should.not.throw();
  })
})

describe('Event attach:', function() {
  it('should attach itself to an object', function() {
    var object = new Object;
    Event.attachTo(object);
    object.bind.should.be.a('function');
    object.trigger.should.be.a('function');
    object.bind('change', function() {throw 'change'});
    (function() {
      object.trigger('change');
    }).should.throw();
  })
})

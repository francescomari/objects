var crypto = require('crypto');

var hash = require('../lib/hash');

function values() {
  var sum = crypto.createHash('sha1');

  for (var i = 0; i < arguments.length; i++) {
    sum.update(arguments[i], 'utf8');
  }

  return sum.digest('hex');
}

module.exports = {
  testEmptyObject: function (test) {
    test.deepEqual(hash({}), values('object'));
    test.done();
  },

  testNullProperty: function (test) {
    test.deepEqual(hash({p: null}), values('object', 'p', 'null'));
    test.done();
  },

  testTrueProperty: function (test) {
    test.deepEqual(hash({p: true}), values('object', 'p', 'boolean', 'true'));
    test.done();
  },

  testFalseProperty: function (test) {
    test.deepEqual(hash({p: false}), values('object', 'p', 'boolean', 'false'));
    test.done();
  },

  testNumberProperty: function (test) {
    test.deepEqual(hash({p: 1}), values('object', 'p', 'number', '1'));
    test.done();
  },

  testStringProperty: function (test) {
    test.deepEqual(hash({p: 's'}), values('object', 'p', 'string', 's'));
    test.done();
  }
};

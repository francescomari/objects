var levelup = require('levelup');
var memdown = require('memdown');

var object = require('../lib/object');

module.exports = {
  setUp: function (done) {
    var self = this;

    levelup('mem', {db: memdown}, onDatabase);

    function onDatabase(error, db) {
      if (error) {
        return done(error);
      }

      self.db = db;

      done();
    }
  },

  testPut: function (test) {
    var db = this.db;

    object.put(db, {p: 1}, onPut);

    function onPut(error, id) {
      test.ifError(error);
      test.notStrictEqual(id, null);
      test.notStrictEqual(id, undefined);
      test.done();
    }
  },

  testNotFound: function (test) {
    var db = this.db;

    object.get(db, 'id', onGet);

    function onGet(error, found) {
      test.ifError(error);
      test.strictEqual(found, false);
      test.done();
    }
  },

  testGet: function (test) {
    var db = this.db;

    object.put(db, {p: 1}, onPut);

    function onPut(error, id) {
      object.get(db, id, onGet);
    }

    function onGet(error, found, data) {
      test.ifError(error);
      test.strictEqual(found, true);
      test.deepEqual(data, {p: 1});
      test.done();
    }
  },

  testDel: function (test) {
    var db = this.db;

    object.put(db, {p: 1}, onPut);

    function onPut(error, id) {
      object.del(db, id, onDel);

      function onDel(error) {
        test.ifError(error);
        object.get(db, id, onGet);
      }

      function onGet(error, found) {
        test.strictEqual(found, false);
        test.done();
      }
    }
  }
};

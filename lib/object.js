var hash = require('./hash');
var operations = require('./operations');

exports.put = put;
exports.get = get;
exports.del = del;

function put(db, object, done) {
  var id = hash(object);

  operations.put(db, id, object, onOperations);

  function onOperations(error, operations) {
    if (error) {
      return done(error);
    }

    db.batch(operations, onBatch);
  }

  function onBatch(error) {
    if (error) {
      return done(error);
    }

    done(null, id);
  }
}

function get(db, id, done) {
  db.get(id, {valueEncoding: 'json'}, onGet);

  function onGet(error, value) {
    if (error && error.notFound) {
      return done(null, false);
    }

    if (error) {
      return done(error);
    }

    done(null, true, value);
  }
}

function del(db, id, done) {
  operations.del(db, id, onOperations);

  function onOperations(error, operations) {
    db.batch(operations, onBatch);
  }

  function onBatch(error) {
    if (error) {
      return done(error);
    }

    done(null);
  }
}

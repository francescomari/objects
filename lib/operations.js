exports.put = put;
exports.del = del;

function put(db, id, object, done) {
  var operation = {
    type: 'put',
    key: id,
    value: object,
    valueEncoding: 'json'
  };

  setImmediate(done, null, [operation], id);
}

function del(db, id, done) {
  var operation = {
    type: 'del',
    key: id
  };

  setImmediate(done, null, [operation]);
}

var operations = require('../lib/operations');

module.exports = {
  testPut: function (test) {
    operations.put(null, 'id', {p: 1}, onOperations);

    function onOperations(error, operations) {
      test.strictEqual(operations.length, 1);

      var operation = operations[0];

      test.strictEqual(operation.type, 'put');
      test.strictEqual(operation.key, 'id');
      test.deepEqual(operation.value, {p: 1});
      test.strictEqual(operation.valueEncoding, 'json');

      test.done();
    }
  },

  testDel: function (test) {
    operations.del(null, 'id', onOperations);

    function onOperations(error, operations) {
      test.strictEqual(operations.length, 1);

      var operation = operations[0];

      test.strictEqual(operation.type, 'del');
      test.strictEqual(operation.key, 'id');

      test.done();
    }
  }
};

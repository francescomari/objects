var crypto = require('crypto');

module.exports = hash;

function hash(value) {
  var sum = crypto.createHash('sha1');

  hashObject(sum, value);
  
  return sum.digest('hex');
}

function hashObject(sum, value) {
  getProperties(value).forEach(hashProperty(sum.update('object', 'utf8')));
}

function getProperties(object) {
  var properties = Object.keys(object).sort().map(toProperty);

  function toProperty(name) {
    return {name: name, value: object[name], type: typeof object[name]};
  }

  return properties;
}

function hashProperties(sum, properties) {
  properties.forEach(hashProperty.bind(null, sum));
}

function hashProperty(sum, property) {
  return function (property) {
    var name = property.name;
    var value = property.value;
    var type = property.type;

    if (type === 'function') {
      return;
    }

    sum.update(name, 'utf8');

    if (value === null) {
      return hashNull(sum);
    }

    if (type === 'number') {
      return hashNumber(sum, value);
    }

    if (type === 'boolean') {
      return hashBoolean(sum, value);
    }

    if (type === 'string') {
      return hashString(sum, value);
    }

    if (type === 'object') {
      return hashObject(sum, value);
    }
  };
}

function hashNumber(sum, value) {
  sum.update('number', 'utf8').update(value.toString(), 'utf8');
}

function hashBoolean(sum, value) {
  sum.update('boolean', 'utf8').update(value.toString(), 'utf8');
}

function hashString(sum, value) {
  sum.update('string', 'utf8').update(value, 'utf8');
}

function hashNull(sum) {
  sum.update('null', 'utf8');
}

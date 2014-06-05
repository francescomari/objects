# Objects

This is a minimal object store persisted in LevelDB. For each stored object, an ID is computed based on the contents of the object itself. This ID is then used as the key of the object into LevelDB.

## Import the module

To import the module, require it as usual:

```js
var objects = require('objects');
```

## Store an object

```js
objects.put(db, object, done);
```

Store an object into the database. The first parameter `db` is a LevelDB database object. The second parameter `object` is an arbitrary object to be stored into the database. The third callback `done` is a `function (error, id)`, where `error` is an optional error and `id` is the ID of the persisted object.

The ID returned by the `done` callback is actually a `String` object, but from the point of view of the users of this library it should be trated as an opaque value.

## Find an object

```js
objects.get(db, id, done);
```

Find an object in the database given its ID. The first parameter `db` is a LevelDB database object. The second parameter `id` is the ID of the object to find. The third parameter `done` is a callback function.

The callback is a `function (error, found, object)`. The first parameter `error` is an optional error object. The second parameter `found` is a boolean which is `true` if the object is stored in the database and false otherwise. The third parameter `object` is the data of the stored object and it is valid only if `found` is `true`.

## Delete an object

```js
objects.del(db, id, done);
```

Delete an object from the database given its ID. The first parameter `db` is a LevelDB database object. The second parameter `id` is the ID of the object to delete. The third parameter `done` is a callback function.

The callback function is a `function (error)`. The first and only parameter `error` is an optional error object.

## Run the tests

To run the tests for this module, execute the following command:

```
npm test
```

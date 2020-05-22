/*
  This "resolve" function walks through an object with
  nested objects, arrays and functions. Given the deeply
  nested structure, it returns a similar structure 
  but where all the functions have been envoked and
  replaced with their returned values.
*/

resolve({
  user: {
    firstName: 'Dmitry',
    lastName: 'White',
    favoritePlaces: () => [
      'Hogwarts',
      'Hogsmeade'
    ]
  }
});

/*
  user: {
    firstName: 'Dmitry',
    lastName: 'White',
    favoritePlaces: [
      'Hogwarts',
      'Hogsmeade'
    ]
  }
*/

/* --------------------------------------------------------------------- */

// If-else-based resolve function
const resolve = (node) => {
  if (isFunction(node)) {
    return resolve(node())
  } else if (isArray(node)) {
    return node.map(resolve);
  } else if (isObject(node)) {
    return mapValues(node, resolve);
  }
  return node;
}

// Ternary-based resolve function
const resolve = (node) =>
  isFunction(node) ?
    resolve(node())
: isArray(node) ?
    node.map(resolve)
: isObject(node) ?
    mapValues(node, resolve)
:
    node;
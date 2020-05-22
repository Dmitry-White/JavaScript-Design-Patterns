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

/*
  Typically, if-else statements could be described with
  switch statements, except for the cases where test conditions
  could not be described with strict equality.

  Ternary operator is essentially an if-else "expression".
  While "if-else statement" runs statements but doesn't return anything,
  a "ternary expression" evaluates and returns a value of one of the
  two expressions.

  Syntax of "ternary expression" is just a side benefit.
  The real benefit:
     - "if-else statements" are popular in imperative programming
    which is build on conrol flow. Such code tends to have several
    entry and exit points.
     - "ternary expressions" help us think about data flow
    and produce more declarative code. Such code tends to flow
    in the same way for any inputs.
*/

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
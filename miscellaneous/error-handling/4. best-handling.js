/*
  The problem with rescue() is that it only helps us
  catch one type of error at a time. 

  If we were to reuse try…catch in another part of the codebase,
  all that changes is the function to invoke,
  what type of error to rescue, and what to return if there is an error.

  Break down the parent function until you can 
  replace the try…catch altogether with swallow().
  And if you need to handle multiple error types, just layer them with compose().
*/

(() => {
  class NotFound extends Error {
    constructor(message) {
      super(message);
      this.name = 'Not Found';
    }
  }

  class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationError';
    }
  }

  const raise = (error) => { throw error; }

  const viewHike = (message) => {
    const match = /^view hike (.+)$/.exec(message);
    const hike = match && match[1];

    return (
      !hike ?
        raise(new ValidationError(message))
        : hike.includes('lost') ?
          raise(new NotFound(hike))
          :
          `Details about <${hike}>`
    )
  }

  const resque = (error, type) =>
    error instanceof type
      ? error
      : raise(error);

  const swallow = (type) => (fail) => (fn) => (...args) => {
    try {
      return fn(...args);
    } catch (error) {
      resque(error, type);
      return fail(error);
    }
  }

  const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

  const chatbot = compose(
    swallow(ValidationError)(() => 'Invalid format.'),
    swallow(NotFound)(() => 'No such hike.')
  )(viewHike);

  console.log('-------------------------------------');
  console.log('Best Error Handling: ');

  console.log(chatbot('view hike mirror lake'));
  // => Details about <mirror lake>

  console.log(chatbot('view hike lost lake'));
  // => NotFound: lost lake

  console.log(chatbot('show hike blue ridge'));
  // => ValidationError: show hike blue ridge
  console.log('-------------------------------------');
})();
/*
  To avoid "catch-all" problem, it’s up to us to whitelist 
  the type of error we want to handle, and otherwise rethrow it.

  The chatbot is behaving well and not blowing up,
  but handling an error correctly looks awful.
  We definitely can’t leave these checks out,
  but a try…catch is a branching construct just like an if…else,
  so these are essentially nested, cascading if…else statements all over again.

  Because throw statements are fundamentally a control flow construct,
  you should never be too quick to sprinkle custom errors throughout your codebase.

  There's an alternative name “Custom Exceptions” because
  it tells us exactly when to use them: for unusual,
  exceptional cases that most of our codebase shouldn’t care about, like a NetworkError.
  These are cases that one or two functions in the codebase
  will handle with the same response:
  on the backend, a NotFound error thrown from any route
  should just generate a 404 response.

  Custom exceptions can actually eliminate branching logic:
  since the rest of our functions can assume the happy path,
  they don’t need an if…else statement to check for an unusual return value,
  like a null check.
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

  const chatbot = (message) => {
    try {
      return viewHike(message);
    } catch (error) {
      if (error instanceof NotFound) {
        return 'No such hike.'
      } else if (error instanceof ValidationError) {
        return 'Invalid format.'
      } else {
        throw error;
      }
    }
  }

  console.log('-------------------------------------');
  console.log('Better Error Handling: ');

  console.log(chatbot('view hike mirror lake'));
  // => Details about <mirror lake>

  console.log(chatbot('view hike lost lake'));
  // => NotFound: lost lake

  console.log(chatbot('show hike blue ridge'));
  // => ValidationError: show hike blue ridge
  console.log('-------------------------------------');
})();
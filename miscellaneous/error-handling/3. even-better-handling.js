/*
  If we shuffle the error checking code so it looks more like a guard clause,
  nothing stopping us from extracting this entire guard clause
  into a separate function "rescue".

  Now when using a try…catch, we just need to make sure 
  we precede the catch code with rescue(). 
  This behaves much better than what we started with,
  and it only added one line to our naive catch-all version.

  Unfortunately, we can’t just stack invocations of rescue(),
  so how do we also handle a ValidationError?
  Using function composition.
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

  const chatbot = (message) => {
    try {
      return viewHike(message);
    } catch (error) {
      resque(error, NotFound);
      return 'No such hike.'
    }
  }

  console.log('-------------------------------------');
  console.log('Even Better Error Handling: ');

  console.log(chatbot('view hike mirror lake'));
  // => Details about <mirror lake>

  console.log(chatbot('view hike lost lake'));
  // => NotFound: lost lake

  console.log(chatbot('show hike blue ridge'));
  // => ValidationError: show hike blue ridge
  console.log('-------------------------------------');
})();
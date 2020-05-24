/*
  Our chatbot is terse, but it already has some issues.
  We definitely don’t want the chatbot to blow up and
  stop running if a NotFound error is thrown, 
  so let’s wrap the call with a try…catch statement to instead
  return a safe fallback message.

  Errors are just another feedback mechanism for a program,
  and unlike returning a value, throwing an Error has a peculiar superpower:
  it automatically propagates up the caller stack —
  interrupting the caller functions as it propagates — until it’s caught. 
  This propagation behavior makes throw and try…catch statements
  a powerful control flow construct.

  We just made the cardinal mistake of error handling: a catch all.
  The try…catch statement will swallow any error — 
  including errors we didn’t mean to catch.
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
      return viewHIke(message);
    } catch (error) {
      return 'No such hike.'
    }
  }

  console.log('-------------------------------------');
  console.log('Naive Error Handling: ');

  console.log(chatbot('view hike mirror lake'));
  // => Details about <mirror lake>

  console.log(chatbot('view hike lost lake'));
  // => NotFound: lost lake

  console.log(chatbot('show hike blue ridge'));
  // => ValidationError: show hike blue ridge
  console.log('-------------------------------------');
})();
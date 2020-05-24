/*
  Here's a tiny version of the chatbot that 
  helps outdoor enthusiasts find great trails to hike.
  It only understands one command, "view hike", which shows details about a hike.
  But sometimes users ask for a hike that isn’t in the database or
  their syntax is a bit off. To simulate these edge cases,
  the viewHike() function uses a few custom error types.
  viewHike() throws a NotFound error if the hike has the word “lost”,
  and a ValidationError if the format of the message is off.
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
    return viewHike(message);
  }

  console.log('-------------------------------------');
  console.log('Default Error Handling: ');

  console.log(chatbot('view hike mirror lake'));
  // => Details about <mirror lake>

  console.log(chatbot('view hike lost lake'));
  // => NotFound: lost lake

  console.log(chatbot('show hike blue ridge'));
  // => ValidationError: show hike blue ridge
  console.log('-------------------------------------');
})();
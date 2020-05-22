/*
  When you hear the word “behavior” or “trait”, we’re referring to
  a cross-cutting concern that can be shared across several functions,
  even if they do completely different things.

  A great way to share behavior in a language that supports FP
  is through function composition.

  Suppose we had a function, called adminOnly(), 
  that receives an unprotected function like addHike(),
  and returns a new version of addHike() that enforces the use of the “sudo” keyword.
*/

(() => {
  const hikes = ['Lost Lake', 'Canyon Creek Meadows'];

  // --------------- Enforcer -------------------
  const enforcerFactory = (check, fail) => (route) => (request) =>
    request.message.split(' ').includes(check)
      ? route(request)
      : fail
    ;

  const adminOnly = enforcerFactory('sudo', 'Not allowed!');
  // --------------------------------------------

  const listHikes = () => hikes.join('\n');

  const addHike = ({ match: [hike] }) => {
    hikes.push(hike);
    return `Added ${hike}!`;
  };

  const deleteHike = ({ match: [hike] }) => {
    hikes.splice(hikes.indexOf(hike), 1);
    return `Removed ${hike}!`;
  };

  const defaultFallback = () => "Sorry, I don't understand that";

  const responses = [
    {
      command: /^list hikes$/,
      response: listHikes,
    },
    {
      command: /add hike (.*)$/,
      response: adminOnly(addHike),
    },
    {
      command: /delete hike (.*)$/,
      response: adminOnly(deleteHike),
    },
    {
      command: /^(.*)$/,
      response: defaultFallback,
    },
  ];

  const responder = (message) => {
    const { command, response } = responses
      .find(({ command, response }) => command.test(message));

    return response(
      {
        message,
        match: command.exec(message).slice(1)
      }
    );
  }

  console.log('-------------------------------------');
  console.log('Best Enforcer: ');

  console.log(responder('list hikes'));
  // => Lost Lake
  // => Canyon Creek Meadows

  console.log(responder('sudo add hike Mirror Lake'));
  // => Added Mirror Lake!

  console.log(responder('sudo delete hike Mirror Lake'));
  // => Removed Mirror Lake!

  console.log(responder('where is Mirror Lake'));
  // => Sorry, I don't understand that.
  console.log('-------------------------------------');
})();
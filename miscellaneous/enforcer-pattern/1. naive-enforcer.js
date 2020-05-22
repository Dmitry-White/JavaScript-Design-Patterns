/*
  But how should we enforce the use of sudo for these admin commands?
  One tempting way to support a new, shared behavior like this is
  to add a new property to each response object: we’ll call it "adminOnly".

  When faced with the feature request of supporting a new behavior
  that can be generalized for related functions — 
  many developers would probably do what we did and insert that 
  behavior logic into the responder function.

  It’s quick, keeps the code DRY, and it just feels nice.
  But it’s also a premature abstraction that conflates responsibilities:
  the responder function has become responsible for routing and authorization logic.

  From a testing perspective, we can’t unit test the authorization logic
  for individual chat commands without going through the responder.
  We can only write integration tests for authorization.
*/

(() => {
  const hikes = ['Lost Lake', 'Canyon Creek Meadows'];

  const listHikes = () => hikes.join('\n');
  const addHike = ([hike]) => {
    hikes.push(hike);
    return `Added ${hike}!`;
  };
  const deleteHike = ([hike]) => {
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
      adminOnly: true,
      response: addHike
    },
    {
      command: /delete hike (.*)$/,
      adminOnly: true,
      response: deleteHike,
    },
    {
      command: /^(.*)$/,
      response: defaultFallback
    },
  ];

  const responder = (message) => {
    const { command, adminOnly, response } = responses
      .find(({ command, response }) => command.test(message));

    if (adminOnly && !message.startsWith('sudo')) {
      return 'Not allowed!';
    }

    return response(
      command.exec(message).slice(1)
    );
  }

  console.log('-------------------------------------');
  console.log('Naive Enforcer: ');

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
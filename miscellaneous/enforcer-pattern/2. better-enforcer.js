/*
  What if we added this admin enforcement logic directly
  to the addHike() and deleteHike() response functions instead of the responder.

  In addHike(), we can add a guard clause that checks 
  if the message starts with “sudo” and returns “Not allowed” if it doesn’t.
  We can copy-paste this guard clause to deleteHike().

  This naive solution is feature complete and leaves
  the responder function focused on one responsibility.
  But now one if-else statement has multiplied into two in our response functions. 
*/

(() => {
  const hikes = ['Lost Lake', 'Canyon Creek Meadows'];

  const listHikes = () => hikes.join('\n');

  const addHike = ({ match: [hike], message }) => {
    if (!message.startsWith('sudo')) {
      return 'Not allowed!';
    }

    hikes.push(hike);
    return `Added ${hike}!`;
  };

  const deleteHike = ({ match: [hike], message }) => {
    if (!message.startsWith('sudo')) {
      return 'Not allowed!';
    }

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
      response: addHike
    },
    {
      command: /delete hike (.*)$/,
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

    return response(
      {
        message,
        match: command.exec(message).slice(1)
      }
    );
  }

  console.log('-------------------------------------');
  console.log('Better Enforcer: ');

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
/*
  Here's a chatbot that helps outdoor enthusiasts find great trail to hike.
  So far it can respond to a few basic commands. If it doesn't know the command,
  it falls back to a default one.
  We want to enforce that the add hike and delete hike commands are executed 
  with the word “sudo” to prevent any accidental changes.
  Only some commands need sudo, and if the user forgets sudo,
  we want to provide feedback.
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
      command: /^add hike (.*)$/,
      response: addHike
    },
    {
      command: /^delete hike (.*)$/,
      response: deleteHike,
    },
    {
      command: /^(.*)$/,
      response: defaultFallback
    },
  ];

  const responder = (message) => {
    const { command, response } = responses
      .find(({ command, response }) => command.test(message));
    return response(
      command.exec(message).slice(1)
    );
  }

  console.log('Default: ');

  console.log(responder('list hikes'));
  // => Lost Lake
  // => Canyon Creek Meadows

  console.log(responder('add hike Mirror Lake'));
  // => Added Mirror Lake!

  console.log(responder('delete hike Mirror Lake'));
  // => Removed Mirror Lake!

  console.log(responder('where is Mirror Lake'));
  // => Sorry, I don't understand that.
})();

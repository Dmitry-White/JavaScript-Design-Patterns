/*
  Here's a chatbot that helps outdoor enthusiasts find great trail to hike.
  So far it can respond to a few basic commands. If it doesn't know the command,
  it falls back to a default one.
*/

const hikes = ['Lost Lake', 'Canyon Creek Meadows'];
const randomHike = () => hikes[Math.floor(Math.random() * hikes.length)];

// if-else-based responder
const responder_IfElse = (message) => {
  if (message === 'list hikes') {
    return hikes.join('\n');
  } else if (message === 'recommend hike') {
    return `I recommend ${randomHike()}!`;
  } else if (message.startsWith('add hike')) {
    const hike = message.slice(9);
    hikes.push(hike);
    return `Added ${hike}!`;
  }
  return "Sorry, I don't understand that."
}

console.log('Before: ');

console.log(responder_IfElse('list hikes'));
// => Lost Lake
// => Canyon Creek Meadows

console.log(responder_IfElse('recommend hike'));
// => I recommend Mirror Lake!

console.log(responder_IfElse('add hike Mirror Lake'));
// => Added Mirror Lake!

console.log(responder_IfElse('where is Mirror Lake'));
// => Sorry, I don't understand that.

/* --------------------------------------------------------------------- */

/*
  Sometimes the number of if-else statements (or ternaries) just gets
  longer and longer which promotes a sloppy inconsistent boundary between
  the individual cases and the mapping logic that decides which case to run.

  Router pattern helps us turn a giant if-else/switch statement inside out
  by decoupling the responsibility of routing logic from the business
  logic of the individual cases.
  In backend terminology, "responses" are "routes" and "responder" is "router".
  With "Router pattern" the control flow is replaced with a data structure -
  many problems that traditionally solved algorithmically can be described much more
  elegantly with a data structure.
  Mapping data structure "responses" doesn't have to be an object, it could be an array of
  object with one object per command - which gives us flexibility.
  "Router pattern" helps us discover common needs across if-else/switch cases and
  provides a flexible interface to DRY them up.
  With each case extracted into a function, we could unit test each response without
  going through routing logic first.
  "Router pattern" helps solve the same problems in FP that polymorphism does in OOP.
*/

const defaultFallback = () => "Sorry, I don't understand that";

const responses_object = {
  'list hikes': () => hikes.join('\n'),
  'recommend hike': () => `I recommend ${randomHike()}!`,
  'add hike': (message) => {
    const hike = message.slice(9);
    hikes.push(hike);
    return `Added ${hike}!`;
  },
  '': defaultFallback,
}

const responses_array = [
  {
    command: /^list hikes$/,
    response: () => hikes.join('\n'),
  },
  {
    command: /^recommend hike$/,
    response: () => `I recommend ${randomHike()}!`
  },
  {
    command: /^add hike (.*)$/,
    response: ([hike]) => {
      hikes.push(hike);
      return `Added ${hike}!`;
    }
  },
  {
    command: /^(.*)$/,
    response: defaultFallback
  },
];

const responder_RouterSimple = (message) => {
  const response = responses_object[message] || defaultFallback;
  return response(message);
}

const responder_RouterComplex_Object = (message) => {
  const [command, response] = Object.entries(responses_object)
    .find(([command, response]) => message.startsWith(command));
  return response(message);
}

const responder_RouterComplex_Array = (message) => {
  const { command, response } = responses_array
    .find(({ command, response }) => command.test(message));
  return response(
    command.exec(message).slice(1)
  );
}

console.log('After: ');

console.log(responder_RouterComplex_Array('list hikes'));
// => Lost Lake
// => Canyon Creek Meadows

console.log(responder_RouterComplex_Array('recommend hike'));
// => I recommend Mirror Lake!

console.log(responder_RouterComplex_Array('add hike Mirror Lake'));
// => Added Mirror Lake!

console.log(responder_RouterComplex_Array('where is Mirror Lake'));
// => Sorry, I don't understand that.

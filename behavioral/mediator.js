const Participant = {
  init(name) {
    this.name = name;
    this.chatroom = null;
  },
  send(message, to) {
    this.chatroom.send(message, this, to);
  },
  receive(message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);
  },
};

const Chatroom = {
  init() {
    this.participants = {};
  },
  register(participant) {
    this.participants[participant.name] = participant;
    participant.chatroom = this;
  },
  send(message, from, to) {
    if (to) {
      console.log(`[Private Message to ${to.name}]`);
      to.receive(message, from);
    } else {
      console.log('[Public Message]');
      Object.values(this.participants).forEach((participant) => {
        if (participant !== from) {
          participant.receive(message, from);
        }
      });
    }
  },
};

const matt = Object.create(Participant);
matt.init('Mike');
const will = Object.create(Participant);
will.init('Will');
const paul = Object.create(Participant);
paul.init('Paul');

const chatroom = Object.create(Chatroom);
chatroom.init();

chatroom.register(matt);
chatroom.register(will);
chatroom.register(paul);

matt.send('All you need is love.');
matt.send('I love you John.');
will.send('Hey, no need to broadcast', matt);
paul.send('Ha, I heard that!');

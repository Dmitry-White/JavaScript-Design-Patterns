const Originator = {
  init({
    name,
    street,
    city,
    state,
  }) {
    this.name = name;
    this.street = street;
    this.city = city;
    this.state = state;
  },
  hydrate() {
    const memento = JSON.stringify(this);
    return memento;
  },

  dehydrate(memento) {
    const restored = JSON.parse(memento);
    this.init(restored);
  },
};

const CareTaker = {
  mementos: {},
  add(key, memento) {
    this.mementos[key] = memento;
  },
  get(key) {
    return this.mementos[key];
  },
};

const mike = Object.create(Originator);
mike.init({
  name: 'Mike Foley',
  street: '1112 Main',
  city: 'Dallas',
  state: 'TX',
});

const caretaker = Object.create(CareTaker);

console.log('Init: ', mike);

// save state

caretaker.add(1, mike.hydrate());

// mess up their names

mike.name = 'King Kong';
console.log('Changed: ', mike);

// restore original state

mike.dehydrate(caretaker.get(1));
console.log('Restored: ', mike);

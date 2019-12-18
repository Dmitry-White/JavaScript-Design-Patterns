const Originator = {
  init({
    name, street, city, state,
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

const john = Object.create(Originator);
john.init({
  name: 'John Wang',
  street: '48th Street',
  city: 'San Jose',
  state: 'CA',
});

const caretaker = Object.create(CareTaker);

console.log('Init: ', mike, john);

// save state

caretaker.add(1, mike.hydrate());
caretaker.add(2, john.hydrate());

// mess up their names

mike.name = 'King Kong';
john.name = 'Superman';
console.log('Changed: ', mike, john);

// restore original state

mike.dehydrate(caretaker.get(1));
john.dehydrate(caretaker.get(2));
console.log('Restored: ', mike, john);

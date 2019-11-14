// ---------------- Class way --------------------
class Car {
  constructor(doors, engine, color) {
    this.doors = doors;
    this.engine = engine;
    this.color = color;
  }

  drive() {
    return `${this.engine} noises...`;
  }
}

const civic = new Car(4, 'V6', 'grey');

console.log('Class Entity: ', civic);
console.log('Class Method: ', civic.drive());
// -------------------------------------------------

// ------- Prototype way, no Object.create ---------
function Human(sex, name, age) {
  this.sex = sex;
  this.name = name;
  this.age = age;
}

Human.prototype.say = function say() {
  return `${this.name} says Hi.`;
};

const person = new Human('male', 'Mark', 32);

console.log('Prototype Entity: ', person);
console.log('Prototype Method: ', person.say());
// -------------------------------------------------

// ------- Prototype way, with Object.create ---------
const Alien = {
  init(sex, name, age) {
    this.sex = sex;
    this.name = name;
    this.age = age;
  },
  say() {
    return `${this.name} vocalizes 🎶.`;
  },
};

const entity = Object.create(Alien);
entity.init('male', 'Clark', 18);

console.log('OLOO Entity: ', entity);
console.log('OLOO Method: ', entity.say());
// -------------------------------------------------

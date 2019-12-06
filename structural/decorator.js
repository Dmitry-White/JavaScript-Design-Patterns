// ------------------- Decorating Constructors ------------------
class CarDecorate {
  constructor(doors, engine, color) {
    this.doors = doors;
    this.engine = engine;
    this.color = color;
  }

  drive() {
    return `${this.engine} noises...`;
  }
}

const carUndecorated = new CarDecorate(4, 'V6', 'grey');
const carDecorated = new CarDecorate(4, 'V6', 'grey');

carDecorated.changeEngine = function changeEngine(engine) {
  this.engine = engine;
};

console.log('Undecorated Class Entity: ', carUndecorated);
console.log('Decorated Class Entity: ', carDecorated);
// --------------------------------------------------------------

// ------------------- Decorating Objects -----------------------
function MacBook() {
  this.cost = () => 997;
  this.screenSize = () => 11.6;
}

const changeCost = (pc) => (addition) => {
  const value = pc.cost();
  pc.cost = () => value + addition;
};

const Memory = (macbook) => changeCost(macbook)(75);
const Engraving = (macbook) => changeCost(macbook)(200);
const Insurance = (macbook) => changeCost(macbook)(250);

const macbook = new MacBook();
Memory(macbook);
Engraving(macbook);
Insurance(macbook);

console.log('Final Mackbook Cost: ', macbook.cost());
// --------------------------------------------------------------

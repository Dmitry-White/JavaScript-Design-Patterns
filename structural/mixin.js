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

const myMixin = {
  accelerate() {
    return `${this.engine} gives hell to Greta!`;
  },
};

const civic = new Car(4, 'V6', 'grey');
Object.assign(Car.prototype, myMixin);

console.log('Class Entity: ', civic);
console.log('Class Mixin: ', civic.accelerate());

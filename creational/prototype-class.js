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

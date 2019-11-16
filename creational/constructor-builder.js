class BuilderCar {
  constructor(doors, engine, color) {
    this.doors = doors;
    this.engine = engine;
    this.color = color;
  }

  drive() {
    return `${this.engine} noises...`;
  }
}

class SUV extends BuilderCar {
  constructor(doors, engine, color) {
    super(doors, engine, color);
    this.wheels = 4;
  }
}

const buiderCivic = new BuilderCar(4, 'V6', 'grey');
const cx5 = new SUV(4, 'V6', 'grey');

console.log('Class Entity: ', buiderCivic);
console.log('Class Method: ', buiderCivic.drive());

console.log('SubClass Entity: ', cx5);
console.log('SubClass Method: ', cx5.drive());

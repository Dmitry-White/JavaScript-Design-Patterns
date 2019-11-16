class CoolCar {
  constructor(doors, engine, color) {
    this.doors = doors;
    this.engine = engine;
    this.color = color;
  }

  drive() {
    return `${this.engine} noises...`;
  }
}

class CarFactory {
  createCar(type) {
    switch (type) {
      case 'mazda':
        return new CoolCar(4, 'V5', 'red');
      case 'bmw':
        return new CoolCar(4, 'V10', 'black');
      default:
        return null;
    }
  }
}

const factory = new CarFactory();
const mazda = factory.createCar('mazda');
const bmw = factory.createCar('bmw');

console.log('Factory-made Class Entity: ', mazda);
console.log('Factory-made Class Method: ', mazda.drive());

console.log('Factory-made Class Entity: ', bmw);
console.log('Factory-made Class Method: ', bmw.drive());

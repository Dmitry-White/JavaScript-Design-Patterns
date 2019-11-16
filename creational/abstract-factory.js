class WarCar {
  constructor(doors, engine, color) {
    this.doors = doors;
    this.engine = engine;
    this.color = color;
  }

  drive() {
    return `${this.engine} noises...`;
  }
}

class WarCarFactory {
  createWarCar(type) {
    switch (type) {
      case 'bmp':
        return new WarCar(10, 'V50', 'haki');
      case 'tank':
        return new WarCar(12, 'V100', 'green');
      default:
        return null;
    }
  }
}

class PieceCar {
  constructor(doors, engine, color) {
    this.doors = doors;
    this.engine = engine;
    this.color = color;
  }

  drive() {
    return `${this.engine} noises...`;
  }
}

class PieceCarFactory {
  createPieceCar(type) {
    switch (type) {
      case 'mazda':
        return new PieceCar(4, 'V5', 'red');
      case 'bmw':
        return new PieceCar(4, 'V10', 'black');
      default:
        return null;
    }
  }
}

const warFactory = new WarCarFactory();
const pieceFactory = new PieceCarFactory();

const AbstractVehicleFactory = (type, car) => {
  switch (type) {
    case 'war':
      return warFactory.createWarCar(car);
    case 'piece':
      return pieceFactory.createPieceCar(car);
    default:
      return null;
  }
};

const tank = AbstractVehicleFactory('war', 'tank');

console.log('Abstract-Factory-made Class Entity: ', tank);
console.log('Abstract-Factory-made Class Method: ', tank.drive());

let _instance = null;

class SingletonCar {
  constructor(doors, engine, color) {
    if(!_instance) {
      this.doors = doors;
      this.engine = engine;
      this.color = color;
      _instance = this;
    } else {
      return _instance;
    }
    
  }

  drive() {
    return `${this.engine} noises...`;
  }
}

const singletonCivic = new SingletonCar(4, 'V6', 'grey');
const singletonHonda = new SingletonCar(2, 'V8', 'blue');

console.log('Singleton Class Entity: ', singletonCivic);
console.log('Singleton Class Method: ', singletonCivic.drive());

console.log('Singleton Class Entity: ', singletonHonda);
console.log('Singleton Class Method: ', singletonHonda.drive());
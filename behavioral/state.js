// --------------------- Class version -----------------------------

class Light {
  constructor(light) {
    this.light = light;
  }
}

class RedLight extends Light {
  constructor() {
    super('red');
  }

  sign() {
    return 'STOP';
  }
}

class YellowLight extends Light {
  constructor() {
    super('yellow');
  }

  sign() {
    return 'STEADY';
  }
}

class GreenLight extends Light {
  constructor() {
    super('green');
  }

  sign() {
    return 'GO';
  }
}

class TrafficLight {
  constructor() {
    this.states = [new YellowLight(), new GreenLight(), new RedLight()];
    [this.current] = this.states;
  }

  change() {
    const currentIndex = this.states.findIndex((light) => light === this.current);
    const totalStates = this.states.length;

    this.current = currentIndex + 1 < totalStates
      ? this.states[currentIndex + 1]
      : this.states[0];
  }

  sign() {
    return this.current.sign();
  }
}
// -----------------------------------------------------------------

// -------------------- Object version -----------------------------
const greenStatelessObj = {
  light: 'green',
  sign() {
    return 'GO';
  },
};

const yellowStatelessObj = {
  light: 'yellow',
  sign() {
    return 'STEADY';
  },
};

const redStatelessObj = {
  light: 'red',
  sign() {
    return 'STOP';
  },
};

const statefullObj = {
  states: [
    Object.create(yellowStatelessObj),
    Object.create(greenStatelessObj),
    Object.create(redStatelessObj),
  ],
  init() {
    [this.current] = this.states;
  },
  change() {
    const currentIndex = this.states.findIndex((light) => light === this.current);
    const totalStates = this.states.length;

    this.current = currentIndex + 1 < totalStates
      ? this.states[currentIndex + 1]
      : this.states[0];
  },
  sign() {
    return this.current.sign();
  },
};
// -----------------------------------------------------------------

// Class Usage
const trafficLight = new TrafficLight();

console.log('Class Method: ', trafficLight.sign()); // 'STEADY'
trafficLight.change();
console.log('Class Method: ', trafficLight.sign()); // 'GO'

trafficLight.change();
console.log('Class Method: ', trafficLight.sign()); // 'STOP'

trafficLight.change();
console.log('Class Method: ', trafficLight.sign()); // 'STEADY'

// Object Usage
statefullObj.init();

console.log('Object Method: ', statefullObj.sign()); // 'STEADY'
statefullObj.change();
console.log('Object Method: ', statefullObj.sign()); // 'GO'
statefullObj.change();
console.log('Object Method: ', statefullObj.sign()); // 'STOP'
statefullObj.change();
console.log('Object Method: ', statefullObj.sign()); // 'STEADY'

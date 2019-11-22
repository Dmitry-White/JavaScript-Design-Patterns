// --------------- Using Object Literal ------------------
const objectModule = {
  name: 'Object Literal Module',
  config: {
    useCaching: true,
    language: 'en',
  },

  character: 'fox',

  getName() {
    console.log(`\n ------ ${this.name} ------\n`);
  },
  ask() {
    console.log(`What does the ${this.character} say?`);
  },
  getCachingState() {
    console.log(`Caching is ${this.config.useCaching ? 'enabled' : 'disabled'}`);
  },
  configure(newConfig) {
    if (typeof newConfig === 'object') {
      this.config = newConfig;
      console.log(this.config.language);
    }
  },
};

objectModule.getName();
objectModule.ask();
objectModule.getCachingState();
objectModule.configure({
  language: 'fr',
  useCaching: false,
});
objectModule.getCachingState();

// -------------------------------------------------------


// -------------------- Using IIFE -----------------------
const iifeModule = (() => {
  const name = 'IIFE Module';
  let config = {
    useCaching: true,
    language: 'en',
  };

  const character = 'fox';

  const getName = () => {
    console.log(`\n ------ ${name} ------\n`);
  };
  const ask = () => {
    console.log(`What does the ${character} say?`);
  };

  const getCachingState = () => {
    console.log(`Caching is ${config.useCaching ? 'enabled' : 'disabled'}`);
  };

  const configure = (newConfig) => {
    if (typeof newConfig === 'object') {
      config = newConfig;
      console.log(config.language);
    }
  };

  return {
    getName,
    ask,
    getCachingState,
    configure,
  };
})();

iifeModule.getName();
iifeModule.ask();
iifeModule.getCachingState();
iifeModule.configure({
  language: 'fr',
  useCaching: false,
});
iifeModule.getCachingState();

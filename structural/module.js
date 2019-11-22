// --------------- Using Object Literal ------------------
const objectModule = {
  config: {
    useCaching: true,
    language: 'en',
  },

  character: 'fox',

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

objectModule.ask();
objectModule.getCachingState();
objectModule.configure({
  language: 'fr',
  useCaching: false,
});
objectModule.getCachingState();

// -------------------------------------------------------


// Using IIFE

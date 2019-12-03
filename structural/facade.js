// ------------ Standalone --------------
const addEventFacade = (el, ev, fn) => {
  if (el.addEventListener) {
    el.addEventListener(ev, fn, { once: true });
  } else if (el.attachEvent) {
    el.attachEvent(`on${ev}`, fn);
  } else {
    el[`on${ev}`] = fn;
  }
};

addEventFacade(document, 'click', () => console.log("Don't touch me!"));

// --------------------------------------

// ---- Combined with Module pattern ----
const facadedModule = (() => {
  const privateMethods = {
    i: 5,
    get() {
      console.log(`Facaded Module: current value = ${this.i}`);
    },
    set(val) {
      this.i = val;
    },
    run() {
      console.log('Facaded Module: running');
    },
    jump() {
      console.log('Facaded Module: jumping');
    },
  };

  return {
    facade(args) {
      privateMethods.set(args.val);
      privateMethods.get();
      if (args.run) {
        privateMethods.run();
      }
    },
  };
})();


// Outputs: "current value: 10" and "running"
facadedModule.facade({ run: true, val: 10 });
// --------------------------------------

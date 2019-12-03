// ------------ Standalone --------------
const addEventFacade = (el, ev, fn) => {
  if (el.addEventListener) {
    el.addEventListener(ev, fn, { once: true });
  } else if (el.attachEvent) {
    el.attachEvent("on" + ev, fn);
  } else {
    el["on" + ev] = fn;
  }
};

addEventFacade(document, 'click', () => console.log("Don't touch me!"));

// --------------------------------------

// ---- Combined with Module pattern ----

// --------------------------------------
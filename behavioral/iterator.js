const iterable = {
  [Symbol.iterator]() {
    let step = 0;
    const length = 3;
    const iterator = {
      next() {
        step += 1;
        return step < length
          ? { value: step, done: false }
          : { value: null, done: true };
      },
    };
    return iterator;
  },
};

const iterableObj = iterable[Symbol.iterator]();

console.log('Iterable: ', iterableObj);
console.log('Next iteration: ', iterableObj.next());
console.log('Next iteration: ', iterableObj.next());

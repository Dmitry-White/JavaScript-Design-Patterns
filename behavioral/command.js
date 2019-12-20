const CarManager = {
  execute(action) {
    const { type: name, payload } = action;
    return this[name] && this[name](payload);
  },
  requestInfo({ model, id }) {
    console.log(`The information for ${model} with ID ${id} is foobar.`);
  },
  buyVehicle({ model, id }) {
    console.log(`You have successfully purchased Item ${id}:${model}.`);
  },
  arrangeViewing({ model, id }) {
    console.log(`You have successfully booked a viewing of ${model}(${id}).`);
  },

};

CarManager.execute({
  type: 'arrangeViewing',
  payload: {
    model: 'Ferrari',
    id: '14523',
  },
});
CarManager.execute({
  type: 'requestInfo',
  payload: {
    model: 'Ford Mondeo',
    id: '54323',
  },
});
CarManager.execute({
  type: 'requestInfo',
  payload: {
    model: 'Ford Escort',
    id: '34232',
  },
});
CarManager.execute({
  type: 'buyVehicle',
  payload: {
    model: 'Ford Escort',
    id: '34232',
  },
});

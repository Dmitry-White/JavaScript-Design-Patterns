const config = {
  priorities: ['Low', 'Medium', 'High', 'Urgent'],
  sections: ['Todo', 'In progress', 'Done'],
  projects: ['None', 'Frontend', 'Backend', 'Mobile'],
  members: ['None', 'Dmitry', 'Victoria'],
  completions: [true, false],
};

// --------------------------- UTILS -----------------------------------
const randomElement = (arr = []) => arr[Math.floor(Math.random() * arr.length)];
// ---------------------------------------------------------------------

// ----------------------- BUSINESS LAYER ------------------------------
function TodoFlyweight(data) {
  const {
    priority,
    section,
    project,
    assignTo,
    complete,
  } = data;

  this.priority = priority;
  this.section = section;
  this.project = project;
  this.assignTo = assignTo;
  this.complete = complete;
}

const TodoFlyweightFactory = (() => {
  const todos = {};
  let count = 0;

  const getFlyweight = (data) => {
    const {
      priority,
      section,
      project,
      assignTo,
      complete,
    } = data;

    const id = priority + section + project + assignTo + complete;

    if (!todos[id]) {
      todos[id] = new TodoFlyweight(data);
      count += 1;
    }

    return todos[id];
  };
  const getFlyweightCount = () => count;

  return {
    getFlyweight,
    getFlyweightCount,
  };
})();

function Todo(data) {
  const {
    name,
    priority,
    section,
    project,
    assignTo,
    complete,
  } = data;

  this.name = name;
  this.flyweight = TodoFlyweightFactory.getFlyweight({
    priority,
    section,
    project,
    assignTo,
    complete,
  });
}
// -------------------------------------------------------------

// ---------------------- USAGE --------------------------------
const initialMemory = performance.memory.usedJSHeapSize;

for (let i = 0; i < 1000000; i += 1) {
  // eslint-disable-next-line
  new Todo({
    name: `Todo Name ${i}`,
    priority: randomElement(config.priorities),
    section: randomElement(config.sections),
    project: randomElement(config.projects),
    assignTo: randomElement(config.members),
    complete: randomElement(config.completions),
  });
}

const finalMemory = performance.memory.usedJSHeapSize;

const usedMemory = (finalMemory - initialMemory) / 1000000;

console.log(`Todo memory used: ${usedMemory} MB.`);
console.log(`Todo object count: ${TodoFlyweightFactory.getFlyweightCount()}`);
// -------------------------------------------------------------

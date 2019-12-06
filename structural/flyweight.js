function Todo(data) {
  const {
    name, priority, section, project, assignTo, complete,
  } = data;

  this.name = name;
  this.priority = priority;
  this.section = section;
  this.project = project;
  this.assignTo = assignTo;
  this.complete = complete;
}

function TodoCollection() {
  const todos = {};
  let count = 0;

  const add = (todo) => {
    todos[todo.name] = new Todo(todo);
    count += 1;
  };
  const get = (name) => todos[name];
  const getCount = () => count;

  return {
    add,
    get,
    getCount,
  };
}

const randomElement = (arr = []) => arr[Math.floor(Math.random() * arr.length)];

const config = {
  priorities: ['Low', 'Medium', 'High', 'Urgent'],
  sections: ['Todo', 'In progress', 'Done'],
  projects: ['None', 'Frontend', 'Backend', 'Mobile'],
  members: ['None', 'Dmitry', 'Victoria'],
  completions: [true, false],
};

const todos = new TodoCollection();

const initialMemory = performance.memory.usedJSHeapSize;

for (let i = 0; i < 1000000; i += 1) {
  todos.add({
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
console.log(`Todo object count: ${todos.getCount()}`);

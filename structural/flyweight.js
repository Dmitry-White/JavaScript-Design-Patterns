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

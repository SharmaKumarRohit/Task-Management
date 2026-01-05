class TodoDTO {
  _id;
  title;
  completed;
  priority;
  createdAt;
  constructor(todo) {
    this._id = todo._id;
    this.title = todo.title;
    this.completed = todo.completed;
    this.priority = todo.priority;
    this.createdAt = todo.createdAt;
  }
}

module.exports = TodoDTO;

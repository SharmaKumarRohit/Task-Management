const Todo = require("../models/todoModel");

const getAllTodos = () => Todo.find();

const getTodo = (id) => Todo.findById(id);

const createTodo = (data) => Todo.create(data);

const toggle_Todo = async (id) => {
  const todo = await Todo.findById(id);
  if (!todo) throw new Error("Todo not found!");
  todo.completed = !todo.completed;
  return todo.save();
};

const update_Todo = (id, data) =>
  Todo.findByIdAndUpdate(id, data, { new: true, runValidators: true });

const delete_Todo = (id) => Todo.findByIdAndDelete(id);

module.exports = {
  getAllTodos,
  getTodo,
  createTodo,
  toggle_Todo,
  update_Todo,
  delete_Todo,
};

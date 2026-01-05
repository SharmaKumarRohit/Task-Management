const Todo = require("../models/todoModel");

const getAllTodos = (searchQuery) => {
  let query = {}; // Empty query means "get all documents"
  if (searchQuery) {
    query = { title: { $regex: searchQuery, $options: "i" } }; // searching title case-in-sensitive
  }
  return Todo.find(query).sort({ createdAt: -1 });
};
// $regex: search -> matches titles that contain the search text
//$options: "i" -> case-insensitive
//.sort({createdAt: -1}) -> sorts results by newest first

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

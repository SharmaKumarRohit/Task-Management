const {
  getAllTodos,
  getTodo,
  createTodo,
  toggle_Todo,
  update_Todo,
  delete_Todo,
} = require("../services/todo.service");
const TodoDTO = require("../dtos/todoDto");

// next() => Movies the request to the next middleware
// next(error) => Sends the error to the error handling middleware
// Middleware flow
// Request -> Middleware -> Route -> Controller -> Error middleware -> Response
exports.getTodos = async (req, res, next) => {
  try {
    const { search } = req.query; // Gets search value from URL query
    const todos = await getAllTodos(search);
    const newTodos = todos.map((todo) => new TodoDTO(todo));
    res.status(200).json({ success: true, data: newTodos });
  } catch (error) {
    next(error);
  }
};

exports.getSingleTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await getTodo(id);
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: `Task not found for Id: ${id}` });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

exports.addTodo = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const todo = await createTodo(data);
    res
      .status(201)
      .json({ success: true, message: "Todo added successfully", data: todo });
  } catch (error) {
    next(error);
  }
};

exports.toggleTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await toggle_Todo(id);
    res
      .status(200)
      .json({ success: true, message: "Task completed!", data: todo });
  } catch (error) {
    next(error);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide data to update" });
    }
    const todo = await update_Todo(id, data);
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: `Task not found for Id: ${id}` });
    }
    res
      .status(200)
      .json({ success: true, message: "Task updated!", data: todo });
  } catch (error) {
    next(error);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await delete_Todo(id);
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: `Task not found for Id: ${id}` });
    }
    res.status(200).json({ success: true, message: "Task deleted!" });
  } catch (error) {
    next(error);
  }
};

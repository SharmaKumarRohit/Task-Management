const express = require("express");
const router = express.Router();
const {
  getTodos,
  getSingleTodo,
  addTodo,
  toggleTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller");

router.get("/", getTodos);
router.get("/:id", getSingleTodo);
router.post("/", addTodo);
router.put("/toggle/:id", toggleTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;

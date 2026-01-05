import { useState } from "react";
import { addTodo } from "../utils/todoApi";
import { useTodos } from "../provider/TodoProvider";
import { ChevronDown } from "lucide-react";

function TodoForm() {
  const { todos, setTodos, setError } = useTodos();
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
  });
  const { title, description, priority } = formData;
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setPending(true);
    const newTask = { title, description, priority };
    try {
      const {
        data: { data },
      } = await addTodo(newTask);
      setTodos([data, ...todos]);
      setFormData({ title: "", description: "", priority: "medium" });
    } catch (error) {
      setError(`Failed to create task with status code ${error.status}`);
    } finally {
      setPending(false);
    }
  };
  return (
    <div className="bg-white p-6 mb-8 rounded-xl border border-neutral-200 shadow-sm">
      <h2 className="text-lg font-medium mb-4">Drop Your Idea</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Write your task..."
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description (optional)"
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={description}
          onChange={handleChange}
        />
        <div className="flex sm:justify-end gap-4">
          <div className="w-32 relative shrink-0">
            <select
              id="priority"
              value={priority}
              onChange={handleChange}
              className=" appearance-none w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className="absolute right-0 top-1/2 -translate-1/2 pointer-events-none text-gray-600">
              <ChevronDown />
            </div>
          </div>
          <button
            type="submit"
            disabled={!title.trim() || pending}
            className="font-medium px-6 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors cursor-pointer w-full sm:w-1/6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;

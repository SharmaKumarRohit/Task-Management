import { useState } from "react";
import { addTodo } from "../utils/todoApi";
import { useTodos } from "../provider/TodoProvider";
import { ChevronDown, ChevronLeft, LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Create() {
  const { todos, setTodos, setError } = useTodos();
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
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
      navigate("/", { replace: true });
    } catch (error) {
      setError(`Failed to create task with status code ${error.status}`);
      navigate("/");
    } finally {
      setPending(false);
    }
  };
  return (
    <div className="bg-white p-6 mb-8 rounded-xl border border-neutral-200 shadow-sm">
      <div className="relative flex items-center justify-center">
        <Link
          to="/"
          className="absolute left-0 px-3 py-1 rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors inline-block"
        >
          <ChevronLeft size={18} />
        </Link>
        <h2 className="text-lg font-medium">Add New Task</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Write your task..."
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="font-medium">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description (optional)"
            className="h-50 resize-none w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex sm:justify-end gap-4 mt-2">
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
            className="font-medium px-6 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors cursor-pointer w-full sm:w-1/6 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {pending ? <LoaderCircle className="animate-spin" /> : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;

import { ChevronDown, ChevronLeft, LoaderCircle } from "lucide-react";
import { useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
  Link,
} from "react-router-dom";
import { updateTodo } from "../utils/todoApi";
import { useTodos } from "../provider/TodoProvider";

function Edit() {
  const { setError, todos, setTodos } = useTodos();
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [editForm, setEditForm] = useState({
    title: searchParams.get("title") || "",
    description: searchParams.get("description") || "",
    priority: searchParams.get("priority") || "medium",
  });
  const { title, description, priority } = editForm;
  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditForm((prevData) => ({ ...prevData, [id]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsPending(true);
    const prevTasks = [...todos];
    setTodos((prevTodo) =>
      prevTodo.map((todo) =>
        todo._id === id ? { ...todo, ...editForm } : todo
      )
    );
    try {
      await updateTodo(id, editForm);
      navigate(`/todos/${id}`, { replace: true });
    } catch (error) {
      setTodos(prevTasks);
      setError("Failed to update task.");
      navigate("/");
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
      <div className="relative flex items-center justify-center">
        <Link
          to={`/todos/${id}`}
          className="absolute left-0 px-3 py-1 rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors inline-block"
        >
          <ChevronLeft size={18} />
        </Link>
        <h2 className="text-lg font-medium">Edit Task</h2>
      </div>
      <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Edit title"
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
            placeholder="Edit description"
            className="h-50 resize-none w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex sm:justify-end gap-4 mt-2">
          <div className="w-32 relative shrink-0">
            <select
              id="priority"
              className=" appearance-none w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={priority}
              onChange={handleChange}
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
            disabled={!title.trim() || isPending}
            className="font-medium px-6 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors cursor-pointer w-full sm:w-1/6 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? <LoaderCircle className="animate-spin" /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;

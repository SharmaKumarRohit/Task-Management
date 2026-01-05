import { useEffect, useState } from "react";
import { getSingleTodo } from "../utils/todoApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Calendar, FilePenLine, Trash, ChevronLeft } from "lucide-react";
import { formateDateFull } from "../utils/formateDate";
import { getPriorityColors } from "../utils/getPriorityColor";
import { useTodos } from "../provider/TodoProvider";
import Loader from "../components/UI/Loader";
import Model from "../components/Model";
import DeleteTodoModel from "../components/DeleteTodoModel";

function SingleTodo() {
  const { id } = useParams();
  const { setError, isModelOpen, setIsModelOpen } = useTodos();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  useEffect(() => {
    setIsLoader(true);
    async function fetchSingleTodo() {
      try {
        const {
          data: { data },
        } = await getSingleTodo(id);
        setTodo(data);
      } catch (error) {
        navigate("/");
        setError("Failed connection to backend.");
      } finally {
        setIsLoader(false);
      }
    }

    fetchSingleTodo();
  }, []);
  if (!todo || isLoader) {
    return <Loader />;
  }
  return (
    <>
      {isModelOpen && (
        <Model>
          <DeleteTodoModel />
        </Model>
      )}
      {todo && (
        <div className="border border-neutral-200 rounded-lg shadow-sm p-6">
          <Link
            to="/"
            className="px-3 py-1 mb-4 rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors inline-block"
          >
            <ChevronLeft size={18} />
          </Link>
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between items-end gap-2">
            <p className="flex items-center gap-2 text-neutral-500 font-medium">
              <Calendar size={20} />
              <span className="text-sm">{formateDateFull(todo.createdAt)}</span>
            </p>
            <h3
              className={`uppercase text-xs font-semibold tracking-wider border px-2 py-1 rounded-full ${getPriorityColors(
                todo.priority
              )}`}
            >
              {todo.priority} Priority
            </h3>
          </div>
          <h2 className="mb-4 text-2xl font-semibold">{todo.title}</h2>
          <p className="text-neutral-500 mb-6">{todo?.description || "N/A"}</p>
          <div className="border-t border-neutral-200 pt-6 flex flex-col sm:flex-row sm:justify-between gap-2 items-center">
            <Link
              to={`/edit/${id}?title=${todo.title}&description=${todo?.description}&priority=${todo.priority}`}
              className="bg-teal-600 sm:w-fit w-full px-4 py-2 rounded-md text-white flex items-center justify-center gap-2 font-medium hover:bg-teal-700 transition-colors"
            >
              <FilePenLine size={20} /> Edit Task
            </Link>
            <button
              className="sm:w-fit w-full px-4 py-2 rounded-md flex items-center justify-center gap-2 font-medium border border-red-200 bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
              onClick={() => setIsModelOpen(true)}
            >
              <Trash size={20} /> Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleTodo;

import { useTodos } from "../provider/TodoProvider";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTodo } from "../utils/todoApi";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

function DeleteTodoModel() {
  const { setIsModelOpen, setTodos, setError } = useTodos();
  const { id } = useParams();
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    setIsPending(true);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    try {
      await deleteTodo(id);
      setIsModelOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      setError("Failed to delete task.");
      navigate("/");
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-lg font-medium mb-4 leading-0">Delete Task</h3>
      <p className="text-neutral-500 mb-4">
        Are you sure you want to delete this tasks?
      </p>
      <div className="flex justify-end gap-3">
        <button
          type="submit"
          className="font-medium px-6 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors cursor-pointer w-full sm:w-1/6 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPending}
          onClick={() => setIsModelOpen(false)}
        >
          No
        </button>
        <button
          type="submit"
          className="font-medium px-6 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors cursor-pointer w-full sm:w-1/6 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPending}
          onClick={handleDelete}
        >
          {isPending ? (
            <LoaderCircle size={20} className="animate-spin" />
          ) : (
            "Yes"
          )}
        </button>
      </div>
    </div>
  );
}

export default DeleteTodoModel;

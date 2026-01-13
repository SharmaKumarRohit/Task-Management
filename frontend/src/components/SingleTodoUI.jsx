import { Calendar, FilePenLine, Trash2, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { formateDateFull } from "../utils/formateDate";
import { getPriorityColors } from "../utils/getPriorityColor";

function SingleTodoUI({ id, todo, setIsModelOpen }) {
  return (
    <>
      {todo && (
        <div className="main_container">
          <Link to="/" className="mb-4 arrow_back">
            <ChevronLeft size={18} />
          </Link>
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between items-end gap-2">
            <p className="flex items-center gap-2 text-neutral-500 font-medium">
              <Calendar size={20} />
              <span className="text-sm">{formateDateFull(todo.createdAt)}</span>
            </p>
            <h3 className={`priority_tag ${getPriorityColors(todo.priority)}`}>
              {todo.priority} Priority
            </h3>
          </div>
          <h2 className="mb-4 text-2xl font-semibold">{todo.title}</h2>
          <p className="text-neutral-500 mb-6">{todo?.description || "N/A"}</p>
          <div className="border-t border-neutral-200 pt-6 flex flex-col sm:flex-row sm:justify-between gap-2 items-center">
            <Link
              to={`/edit/${id}?title=${todo.title}&description=${todo?.description}&priority=${todo.priority}`}
              className="btn bg-teal-600 text-white hover:bg-teal-700"
            >
              <FilePenLine size={20} /> Edit Task
            </Link>
            <button
              className="btn border border-red-200 bg-red-100 text-red-700 hover:bg-red-200"
              onClick={() => setIsModelOpen(true)}
            >
              <Trash2 size={20} /> Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleTodoUI;

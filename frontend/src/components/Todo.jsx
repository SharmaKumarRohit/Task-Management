import { Link } from "react-router-dom";
import { Calendar, Circle, CircleCheck } from "lucide-react";
import { getPriorityColors, getBorderColors } from "../utils/getPriorityColor";
import { formateDateShort } from "../utils/formateDate";
import ToggleButton from "../components/UI/ToggleButton";

function Todo({ _id, title, completed, priority, createdAt }) {
  return (
    <div
      className={`group bg-white border border-neutral-200 rounded-lg hover:shadow-md transition-all ${
        !completed && `border-l-4 ${getBorderColors(priority)}`
      }`}
    >
      <div className="p-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h3
            className={`w-fit uppercase text-xs font-semibold tracking-wider border px-2 py-1 rounded-full ${getPriorityColors(
              priority
            )}`}
          >
            {priority} Priority
          </h3>
          <ToggleButton id={_id} completed={completed} />
        </div>
        <h2 className="leading-relaxed line-clamp-1 text-lg font-medium text-neutral-800">
          {title}
        </h2>
        <p className="flex items-center gap-2 text-neutral-500 font-medium">
          <Calendar size={20} />
          <span className="text-sm">{formateDateShort(createdAt)}</span>
        </p>
      </div>
      <div className="border-t border-t-neutral-200 p-4 flex items-center justify-between">
        <p className="font-medium flex items-center gap-2">
          <span>
            {completed ? (
              <CircleCheck className="text-teal-500" size={20} />
            ) : (
              <Circle className="text-neutral-500" size={20} />
            )}
          </span>
          <span className="text-neutral-500 text-sm">
            {completed ? "Completed" : "Not Completed"}
          </span>
        </p>
        <Link
          to={`todos/${_id}`}
          className="bg-teal-100 border border-teal-200 text-teal-700 hover:bg-teal-200 transition-colors font-medium text-sm px-4 py-2 rounded-lg"
        >
          More Info
        </Link>
      </div>
    </div>
  );
}

export default Todo;

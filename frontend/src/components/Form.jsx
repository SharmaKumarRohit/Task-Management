import { ChevronDown, ChevronLeft, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";

function Form({
  title,
  description,
  priority,
  handleChange,
  handleSubmit,
  isPending,
  linkData,
  buttonText,
  formTitle,
}) {
  return (
    <div className="main_container">
      <div className="relative flex items-center justify-center">
        <Link to={linkData} className="arrow_back absolute left-0">
          <ChevronLeft size={18} />
        </Link>
        <h2 className="form_title">{formTitle}</h2>
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
            className="input_control"
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
            className="input_control h-50 resize-none"
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
              className="appearance-none input_control"
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
            className="form_btn"
          >
            {isPending ? <LoaderCircle className="animate-spin" /> : buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;

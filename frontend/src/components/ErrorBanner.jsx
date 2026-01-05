import { OctagonAlert, X } from "lucide-react";
import { useTodos } from "../provider/TodoProvider";

function ErrorBanner() {
  const { error, setError } = useTodos();
  return (
    <>
      {error && (
        <div className="mb-6 p-3.5 bg-red-100 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
          <OctagonAlert className="shrink-0" size={20} />
          <span>{error || "Something unexpected wrong!"}</span>
          <button
            className="ml-auto p-1 cursor-pointer hover:bg-red-200 rounded-full hover:text-red-900"
            onClick={() => setError(null)}
          >
            <X size={20} />
          </button>
        </div>
      )}
    </>
  );
}

export default ErrorBanner;

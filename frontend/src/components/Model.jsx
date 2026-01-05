import { createPortal } from "react-dom";
import { useTodos } from "../provider/TodoProvider";

function Model({ children }) {
  const { setIsModelOpen } = useTodos();
  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-xs z-10"
        onClick={() => setIsModelOpen(false)}
      ></div>
      <div className="fixed top-2/5 left-1/2 -translate-x-1/2 max-w-lg w-full px-4 z-20">
        {children}
      </div>
    </>,
    document.getElementById("model")
  );
}

export default Model;

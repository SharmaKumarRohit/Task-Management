import { useTodos } from "../provider/TodoProvider";
import Todo from "./Todo";
import Loader from "./UI/Loader";

function Todos() {
  const { todos, isLoading } = useTodos();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {todos.length === 0 ? (
        <div className="text-center py-10 text-neutral-400 text-lg">
          <p>No tasks found!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {todos.map((todo) => (
            <Todo key={todo._id} {...todo} />
          ))}
        </div>
      )}
    </>
  );
}

export default Todos;

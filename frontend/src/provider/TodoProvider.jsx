import { createContext, useContext, useEffect, useState } from "react";
import { getTodos, toggleTodo } from "../utils/todoApi";

const TodoContext = createContext();

function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  useEffect(() => {
    async function fetchTodos() {
      setIsLoading(true);
      try {
        const {
          data: { data },
        } = await getTodos(searchQuery);
        setTodos(data);
        setError(null);
      } catch (error) {
        setError("Failed connection to backend.");
      } finally {
        setIsLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchTodos();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);
  const handleToggle = async (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    try {
      await toggleTodo(id);
    } catch (error) {
      setError("Failed completed to task.");
    }
  };
  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        handleToggle,
        error,
        setError,
        searchQuery,
        setSearchQuery,
        isLoading,
        isModelOpen,
        setIsModelOpen,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}

export default TodoProvider;

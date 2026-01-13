import Form from "../components/Form";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
    <Form
      title={title}
      description={description}
      priority={priority}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isPending={isPending}
      linkData={`/todos/${id}`}
      buttonText="Save"
      formTitle="Edit Task"
    />
  );
}

export default Edit;

import { useState } from "react";
import Form from "../components/Form";
import { addTodo } from "../utils/todoApi";
import { useTodos } from "../provider/TodoProvider";
import { useNavigate } from "react-router-dom";

function Create() {
  const { todos, setTodos, setError } = useTodos();
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
  });
  const { title, description, priority } = formData;
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsPending(true);
    const newTask = { title, description, priority };
    try {
      const {
        data: { data },
      } = await addTodo(newTask);
      setTodos([data, ...todos]);
      setFormData({ title: "", description: "", priority: "medium" });
      navigate("/", { replace: true });
    } catch (error) {
      setError(`Failed to create task with status code ${error.status}`);
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
      linkData="/"
      buttonText="Add"
      formTitle="Add New Task"
    />
  );
}

export default Create;

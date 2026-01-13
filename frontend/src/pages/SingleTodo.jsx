import { useEffect, useState } from "react";
import { getSingleTodo } from "../utils/todoApi";
import SingleTodoUI from "../components/SingleTodoUI";
import { useNavigate, useParams } from "react-router-dom";
import { useTodos } from "../provider/TodoProvider";
import Loader from "../components/UI/Loader";
import Model from "../components/Model";
import DeleteTodoModel from "../components/DeleteTodoModel";

function SingleTodo() {
  const { setError, isModelOpen, setIsModelOpen } = useTodos();
  const navigate = useNavigate();
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    setIsPending(true);
    async function fetchSingleTodo() {
      try {
        const {
          data: { data },
        } = await getSingleTodo(id);
        setTodo(data);
      } catch (error) {
        navigate("/");
        setError("Failed connection to backend.");
      } finally {
        setIsPending(false);
      }
    }
    fetchSingleTodo();
  }, []);
  if (!todo || isPending) {
    return <Loader />;
  }
  return (
    <>
      <SingleTodoUI todo={todo} id={id} setIsModelOpen={setIsModelOpen} />
      {isModelOpen && (
        <Model>
          <DeleteTodoModel />
        </Model>
      )}
    </>
  );
}

export default SingleTodo;

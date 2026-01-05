import styles from "./ToggleButton.module.css";
import { useTodos } from "../../provider/TodoProvider";

function ToggleButton({ id, completed }) {
  const { handleToggle } = useTodos();
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => handleToggle(id)}
      />
      <span className={styles.slider}></span>
    </label>
  );
}

export default ToggleButton;

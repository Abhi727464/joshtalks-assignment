import { useState } from "react";
import styles from "./taskForm.module.css";

export default function TaskForm({ addTask }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "low",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask({ title: "", description: "", priority: "low" });
  };

  return (
    <form onSubmit={handleSubmit} className={styles["task-form"]}>
      <input
        type="text"
        placeholder="Task Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        className={styles["task-input"]}
        required
      />
      <input
        type="text"
        placeholder="Task Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        className={styles["task-description"]}
        required
      />
      <select
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
        className={styles["task-select"]}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit" className={styles["task-button"]}>
        Add Task
      </button>
    </form>
  );
}

import { useState } from "react";
import styles from "./task.module.css";

export default function Task({
  task,
  isEditing, // Whether the task is currently being edited
  editTask,
  updateTask,
  toggleTaskCompletion,
  deleteTask,
}) {
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTask({ ...task, ...updatedTask }); // Update task with new values
  };

  if (isEditing) {
    return (
      <tr className={styles["task-editing"]}>
        <td>
          <input
            type="text"
            value={updatedTask.title}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, title: e.target.value })
            }
            className={styles.inputField}
          />
        </td>
        <td>
          <input
            type="text"
            value={updatedTask.description}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, description: e.target.value })
            }
            className={styles.textareaField}
          />
        </td>
        <td>
          <select
            value={updatedTask.priority}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, priority: e.target.value })
            }
            className={styles.selectField}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </td>
        <td>{task.completed ? "Completed" : "Pending"}</td>
        <td>
          <button onClick={handleUpdate} className={styles.button}>
            Save
          </button>
          <button onClick={() => editTask(null)} className={styles.button}>
            Cancel
          </button>
        </td>
      </tr>
    );
  }

  return (
    <tr className={`${styles.task} ${styles[task.priority]}`}>
      <td>{task.title}</td>
      <td style={{ maxWidth: "200px", wordBreak: "break-all" }}>
        {task.description}
      </td>
      <td>{task.priority.toUpperCase()}</td>
      <td>{task.completed ? "Completed" : "Pending"}</td>
      <td>
        <button
          onClick={() => toggleTaskCompletion(task.id)}
          className={styles.button}
          style={{
            background: "#009129",
          }}
        >
          {task.completed ? "Mark as Pending" : "Mark as Completed"}
        </button>
        <button onClick={() => editTask(task.id)} className={styles.button}>
          Edit
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className={styles.button}
          style={{ background: "#D11A2A" }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

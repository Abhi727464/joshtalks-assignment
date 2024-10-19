"use client";

import { useState, useEffect } from "react";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";
import styles from "./home.module.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const sortTasks = (tasks) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return [...tasks].sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;
      return (priorityOrder[a.priority] - priorityOrder[b.priority]) * order;
    });
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const addTask = (task) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...task, id: Date.now(), completed: false },
    ]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTaskId(null);
  };

  const handleEditTask = (id) => {
    setEditingTaskId(id);
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update local storage
      return updatedTasks; // Return the new state
    });
  };

  const filterTasks = (tasks) => {
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        task.description
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase())
    );
  };

  const sortedTasks = sortTasks(tasks);
  const filteredTasks = filterTasks(sortedTasks);

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1>Task Manager</h1>
        <input
          type="search"
          placeholder="Search tasks..."
          className={styles.searchContainer}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <TaskForm addTask={addTask} />

      <table className={styles["task-table"]}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th onClick={toggleSortOrder} style={{ cursor: "pointer" }}>
              Priority{" "}
              {sortOrder === "asc" ? (
                <span
                  style={{
                    width: "25px",
                    display: "inline-block",
                    background: "gray",
                    color: "white",
                    borderRadius: "2px",
                  }}
                >
                  ↑
                </span>
              ) : (
                <span
                  style={{
                    width: "25px",
                    display: "inline-block",
                    background: "gray",
                    color: "white",
                    borderRadius: "2px",
                  }}
                >
                  ↓
                </span>
              )}
            </th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  height: "100px",
                }}
              >
                Loading tasks...
              </td>
            </tr>
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                isEditing={task.id === editingTaskId}
                editTask={handleEditTask}
                updateTask={updateTask}
                toggleTaskCompletion={toggleTaskCompletion}
                deleteTask={deleteTask}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  height: "100px",
                }}
              >
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

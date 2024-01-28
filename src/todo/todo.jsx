import React, { useState } from 'react';
import styles from "../todo/todo.module.css"


function TodoApp() {
  const [taskName, setTaskName] = useState("Todo Name");
  const [taskDesc, setTaskDesc] = useState("Todo Description");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (taskName.trim() !== "") {
      const newTask = {
        name: taskName,
        desc: taskDesc,
        status: "false",
      };

      setTasks([...tasks, newTask]);
      setTaskName("");
      setTaskDesc("");
    }
  };

  const handleStatusChange = (index, event) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = event.target.value;
    setTasks(updatedTasks);
  };
  const getStatusColor = (status) => {

    return status === "true" ? styles.completed : styles.notcompleted;
  
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2>My Todo</h2>
      <div id="todo-add-box">
        <input
          type="text"
          className={styles["task-name"]}
          id="task-name"
          name="Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          className={styles["task-desc"]}
          id="task-desc"
          name="Desc"
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
        />
        <button onClick={addTask} className={styles["task-add-bt"]} >Add Todo</button>
      </div>
      <div id="task-list-box">
        <h3>My Todos</h3>
        <ul className={styles["task-list"]} id="task-list">
          {tasks.map((task, index) => (
            <li key={index} className={styles["task"]}>
              <label>Name : </label>
              <span>{task.name}</span>
              <br />
              <label>Description : </label>
              <span>{task.desc}</span>
              <br />
              <label>Status : </label>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(index, e)}  
                className={getStatusColor(task.status)}
              >
                <option value="false">Not Completed</option>
                <option value="true">Completed</option>
              </select>
              <br/>
              <button onClick={() => handleDeleteTask(index)} className={styles["task-delete"]}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "../UI/Line/Line";
import AddTask from "./AddTask/AddTask";
import "./todoTasks.scss";

const TodoTasks = ({ list, onEditTitle }) => {
  const [tasks, setTasks] = useState(list.tasks);

  useEffect(() => {
    setTasks(list.tasks);
  }, [list.tasks]);

  const completeTask = (id) => {
    let completed = null;
    let newTasks = tasks.map((task) => {
      if (task.id === id) {
        completed = !task.completed;
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(newTasks);
    axios.patch(`http://localhost:3001/tasks/${id}`, { completed });
  };

  const deleteTaskHandler = async (id) => {
    let newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    await axios.delete(`http://localhost:3001/tasks/${id}`);
  };

  const editTaskHandler = async (id, txt) => {
    let text = prompt("Название задачи", txt);
    if (!text || text === "" || txt === text) {
      return;
    }
    let task = tasks.find((task) => task.id === id);
    let newTask = { ...task, text };
    let newTasks = [
      ...tasks.filter((task) => task.id !== newTask.id),
      newTask,
    ].sort((a, b) => a.id - b.id);
    setTasks(newTasks);
    await axios.put(`http://localhost:3001/tasks/${id}`, newTask);
  };
  return (
    <div>
      <h1>
        {list.name}
        <i
          onClick={() => onEditTitle(list)}
          className="fa-solid fa-pen todo__tasks-icon"
        />
      </h1>
      <Line />
      {!tasks.length && <h2>Задачи отсутствуют</h2>}
      {tasks.map((task) => {
        return (
          <div key={task.id} className="todo__tasks-row">
            <div className="checkbox">
              <input
                onChange={() => completeTask(task.id)}
                checked={task.completed}
                type="checkbox"
                id={`check-${task.id}`}
              />
              <label htmlFor={`check-${task.id}`}>
                <i className="fa-solid fa-check" />
              </label>
            </div>
            <p>{task.text}</p>
            <i
              onClick={() => editTaskHandler(task.id, task.text)}
              className="fa-solid fa-pen"
            ></i>
            <i
              onClick={() => deleteTaskHandler(task.id)}
              className="fa-solid fa-xmark"
            />
          </div>
        );
      })}
      <AddTask tasks={tasks} setTasks={setTasks} listId={list.id} />
    </div>
  );
};

export default TodoTasks;

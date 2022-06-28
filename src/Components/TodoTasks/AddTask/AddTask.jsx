import axios from "axios";
import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import "./addTask.scss";

const AddTask = ({ listId, setTasks, tasks }) => {
  const [formActive, setFormActive] = useState(false);
  const [text, setText] = useState("");
  const addTaskHandler = async () => {
    if (!text) {
      alert("Пожалуйста, Введите задание!");
      return;
    }
    setFormActive(false);
    await axios
      .post("http://localhost:3001/tasks", {
        listId,
        text,
        completed: false,
      })
      .then(({ data }) => {
        setTasks([...tasks, data]);
      });
    setText("");
  };
  return (
    <div className="add_task">
      {!formActive ? (
        <div onClick={() => setFormActive(true)} className="add_task-btn">
          <i className="fa-solid fa-plus"></i>
          <p>Новая задача</p>
        </div>
      ) : (
        <div className="add_task-form">
          <Input
            onKeyPress={(e) => e.which === 13 && addTaskHandler()}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Текст задачи"
          />
          <Button onClick={addTaskHandler}>Добавить задачу</Button>
          <Button
            onClick={() => setFormActive(false)}
            style={{
              marginLeft: 10,
              background: "#F4F6F8",
              color: "#9C9C9C",
            }}
          >
            Отмена
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddTask;

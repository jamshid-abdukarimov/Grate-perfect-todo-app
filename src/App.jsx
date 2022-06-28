import axios from "axios";
import React, { useState } from "react";
import "./App.scss";
import { TodoTasks, Sidebar } from "./exports";

function App() {
  const [lists, setLists] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [sidebarActive, setSidebarActive] = useState(false);

  const editTitle = async (list) => {
    let { id, name } = list;
    let newTitle = prompt("Название списка", name);
    if (newTitle) {
      let newLists = lists.map((llist) => {
        if (llist.id === id) {
          llist.name = newTitle;
        }
        return llist;
      });
      list.name = newTitle;
      setLists(newLists);
      setActiveItem(list);
      await axios.patch(`http://localhost:3001/lists/${id}`, {
        name: newTitle,
      });
    }
  };
  return (
    <div className="todo-wrapper">
      <div className="todo">
        <i
          onClick={() => setSidebarActive(true)}
          className="fa-solid fa-bars menu"
        ></i>
        <div
          onClick={() => setSidebarActive(false)}
          className={`blur ${sidebarActive ? "active" : ""}`}
        ></div>
        <Sidebar
          sidebarActive={sidebarActive}
          setSidebarActive={setSidebarActive}
          setActiveItem={setActiveItem}
          activeItem={activeItem}
          lists={lists}
          setLists={setLists}
        />
        {activeItem ? (
          <div className="todo__tasks">
            <TodoTasks
              setActiveItem={setActiveItem}
              onEditTitle={editTitle}
              list={activeItem}
            />
          </div>
        ) : (
          Array.isArray(lists) && (
            <div className="todo__tasks">
              {lists.map((list) => {
                return (
                  list.tasks.length > 0 && (
                    <TodoTasks
                      key={list.id}
                      onEditTitle={editTitle}
                      list={list}
                    />
                  )
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;

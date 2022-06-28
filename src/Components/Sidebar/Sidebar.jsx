import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import AddNewListBlock from "../AddNewListBlock/AddNewListBlock";
import List from "../List/List";
import DB from "../../assets/db.json";
import axios from "axios";
import Loader from "../UI/Loader/Loader";

const Sidebar = ({
  lists,
  setLists,
  setActiveItem,
  activeItem,
  sidebarActive,
  setSidebarActive,
}) => {
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    let { data } = await axios.get(
      "http://localhost:3001/lists?_expand=color&_embed=tasks"
    );
    data.map((item) => {
      item.color = DB.colors.filter(
        (color) => color.id === item.colorId
      )[0].name;
      return item;
    });
    setLists(data);
  };

  useEffect(() => {
    fetchData(null);
  }, []);

  const onAddList = () => {
    fetchData();
  };

  return (
    <div className={`todo__sidebar ${sidebarActive ? "active" : ""}`}>
      <List
        items={[
          {
            id: v4(),
            name: "Все задачи",
            icon: <i className="fa-solid fa-list" />,
            active: !activeItem,
          },
        ]}
        onClick={() => setActiveItem(null)}
      />
      {!Array.isArray(lists) ? (
        <Loader />
      ) : (
        <>
          <List
            setSidebarActive={setSidebarActive}
            setActiveItem={setActiveItem}
            setLoading={setLoading}
            setLists={setLists}
            isRemovable
            items={lists}
            onClickItem={(item) => setActiveItem(item)}
            activeItem={activeItem}
          />
          {loading ? (
            <h3>Deleting...</h3>
          ) : (
            <AddNewListBlock onAddList={onAddList} />
          )}
        </>
      )}
    </div>
  );
};

export default Sidebar;

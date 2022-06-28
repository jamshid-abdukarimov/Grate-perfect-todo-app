import axios from "axios";
import React from "react";
import { Badge } from "../UI/Badge/Badge";
import "./list.scss";

const List = ({
  items,
  isRemovable,
  onClick,
  setLoading,
  onClickItem,
  activeItem,
  setActiveItem,
  setSidebarActive,
}) => {
  const deleteItemFromList = (id) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      setLoading(true);
      axios.delete(`http://localhost:3001/lists/${id}`).finally(() => {
        setLoading(false);
        activeItem && activeItem.id === id
          ? setActiveItem(null)
          : setActiveItem(activeItem);
      });
    }
  };
  return (
    <>
      <ul onClick={onClick} className="list">
        {items.map((item) => {
          return (
            <li
              id={item.id}
              key={item.id}
              className={`${
                activeItem
                  ? item.id === activeItem.id
                    ? "active"
                    : ""
                  : item.active
                  ? "active"
                  : ""
              } ${item.className ? item.className : ""}`}
              onClick={
                onClickItem
                  ? () => {
                      onClickItem(item);
                      if (window.innerWidth <= 780) setSidebarActive(false);
                    }
                  : null
              }
            >
              {item.icon ? (
                item.icon
              ) : (
                <Badge key={item.id} color={item.color} />
              )}
              <span>
                {item.name.length > 10
                  ? item.name.slice(0, 10) + ".."
                  : item.name}
                {item.tasks && ` (${item.tasks.length})`}
              </span>
              {isRemovable ? (
                <i
                  className="remove-icon fa-solid fa-xmark"
                  onClick={() => deleteItemFromList(item.id)}
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default List;

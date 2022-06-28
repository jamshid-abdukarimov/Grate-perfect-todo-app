import React, { useEffect, useState } from "react";
import { Badge } from "../../UI/Badge/Badge";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import axios from "axios";

const AddList = ({ onAddList, setCreateFolder, setFetching }) => {
  const [colorId, setColorId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [colors, setColors] = useState([]);

  const onClose = () => {
    setInputValue("");
    setCreateFolder(false);
  };
  const fetchColors = async () => {
    await axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColorId(data[0].id);
      setColors(data);
    });
  };
  useEffect(() => {
    fetchColors();
  }, []);
  const addList = () => {
    if (!inputValue) {
      alert("Пожалуйста, Введите название списка");
      return;
    }
    setFetching(true);
    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        colorId,
      })
      .then(({ data }) => {
        onAddList(data);
        setFetching(false);
      });
    onClose();
  };

  return (
    <div className="add__folder-block">
      <i onClick={onClose} className="fas fa-times" />
      <Input
        onKeyPress={(e) => e.which === 13 && addList()}
        placeholder="Название папки"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <ul className="circles">
        {colors.map((circle) => (
          <Badge
            key={circle.id}
            color={circle.name}
            onClick={() => setColorId(circle.id)}
            classNames={`circle ${colorId === circle.id ? "active" : ""}`}
          />
        ))}
      </ul>
      <Button onClick={addList}>Добавить</Button>
    </div>
  );
};

export default AddList;

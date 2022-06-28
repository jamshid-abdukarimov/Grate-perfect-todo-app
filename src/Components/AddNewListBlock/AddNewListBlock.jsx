import React, { useState } from "react";
import { v4 } from "uuid";
import { AddList, List } from "../../exports";
import "./addlistbutton.scss";

const AddNewListBlock = ({ onAddList }) => {
  const [createFolder, setCreateFolder] = useState(false);
  const [isFetching, setFetching] = useState(false);

  return isFetching ? (
    <h3 style={{ marginLeft: 10 }}>Loading...</h3>
  ) : (
    <div className="add__folder-wrapper">
      <List
        onClick={() => setCreateFolder(true)}
        items={[
          {
            id: v4(),
            className: "list__add-btn",
            name: "Добавить папку",
            icon: <i className="fas fa-folder-plus"></i>,
            active: createFolder,
          },
        ]}
      />

      {createFolder && (
        <AddList
          setFetching={setFetching}
          onAddList={onAddList}
          setCreateFolder={setCreateFolder}
        />
      )}
    </div>
  );
};
export default AddNewListBlock;

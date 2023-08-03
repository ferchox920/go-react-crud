import React, { useState } from "react";
import style from "./UserItems.module.css";

const UserItem = ({ user, handleUpdate, handleDelete }) => {
  const [editing, setEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(user.name);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    setEditing(false);
    if (user.name !== updatedName) {
      // Call the handleUpdate function and pass the updatedName to it
      await handleUpdate(user._id, updatedName);
    }
  };

  return (
    <li className={style.item}>
      {editing ? (
        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          className={style.editInput}
        />
      ) : (
        <span className={style.name}>{user.name}</span>
      )}

      {!editing && (
        <button onClick={handleEdit}>Actualizar</button>
      )}

      {editing && (
        <button onClick={handleSave}>Guardar</button>
      )}

      <button onClick={() => handleDelete(user._id)}>Eliminar</button>
    </li>
  );
};

export default UserItem;

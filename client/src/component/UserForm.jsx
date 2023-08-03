import React, { useState } from "react";
import style from "./UserForm.module.css";

const UserForm = ({ loadUsers }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/users", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    loadUsers();
    setName(""); // Clear the input after submitting
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="text"
          placeholder="Coloca tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button>Guardar</button>
      </form>
    </div>
  );
};

export default UserForm;

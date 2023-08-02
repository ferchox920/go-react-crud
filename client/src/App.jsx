import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    const response = await fetch("/users");
    const data = await response.json();
    console.log(data);
    setUsers(data.users);
  }

  useEffect(() => {
    loadUsers();
  }, []);

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

  const handleUpdate = async (userId) => {
    const newName = prompt("Enter the new name:");
    if (newName) {
      const response = await fetch(`/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify({ name: newName }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      loadUsers();
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      const response = await fetch(`/users/${userId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      loadUsers();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="name"
          placeholder="Coloca tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button>Guardar</button>
      </form>

      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name}{" "}
            <button onClick={() => handleUpdate(user._id)}>Actualizar</button>{" "}
            <button onClick={() => handleDelete(user._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

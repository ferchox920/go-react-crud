import React, { useEffect, useState } from "react";
import UserForm from "./component/UserForm";
import UserList from "./component/UserList";


function App() {
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

  const handleUpdate = async (userId,updatedName) => {

    if (updatedName) {
      const response = await fetch(`/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify({ name: updatedName }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      loadUsers();
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
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
      <UserForm loadUsers={loadUsers} />
      <UserList
        users={users}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;

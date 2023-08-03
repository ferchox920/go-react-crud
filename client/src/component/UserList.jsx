import React from "react";
import UserItem from "./UserItems";


const UserList = ({ users, handleUpdate, handleDelete }) => {
  return (
    <ul>
      {users?.map((user) => (
        <UserItem
          key={user._id}
          user={user}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
        
      ))}
    </ul>
  );
};

export default UserList;

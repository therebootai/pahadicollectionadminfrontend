import React, { useState } from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import AddNewUsers from "../../components/masters/users/AddNewUsers";
import UserTable from "../../components/masters/users/UserTable";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/users`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching Pickup Data:", error);
    }
  };
  return (
    <MainPageTemplate>
      <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4"></div>
      <div className="m-6 p-6 flex flex-col gap-6 bg-white rounded border border-custom-gray-border">
        <h1 className="text-2xl font-medium text-custom-black">User Manage</h1>
        <AddNewUsers />
        <UserTable fetchUsers={fetchUsers} users={users} setUsers={setUsers} />
      </div>
    </MainPageTemplate>
  );
};

export default Users;

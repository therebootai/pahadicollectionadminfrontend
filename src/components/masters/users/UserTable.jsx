import axios from "axios";
import React, { useEffect, useState } from "react";
import DisplayTable from "../../global/DisplayTable";

const UserTable = ({ fetchUsers, users, setUsers }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggle = async (userId, activeState) => {
    try {
      const updatedUser = { activeState: !activeState };
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/users/update/${userId}`,
        updatedUser
      );

      setUsers(
        users.map((user) =>
          user.userId === userId
            ? { ...user, activeState: !user.activeState }
            : user
        )
      );
    } catch (error) {
      console.error("Error updating User status", error);
      alert("Failed to update User status. Please try again.");
    }
  };

  const handleDeleteConfirm = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/users/delete/${userId}`
      );

      setUsers(users.filter((user) => user.userId !== userId));
    } catch (error) {
      console.error("Error deleting User", error);
      alert("Failed to delete User. Please try again.");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.userId);
    setUpdatedUser({ ...user });
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = async () => {
    const errors = {};
    if (!updatedUser.name) errors.name = "Name is required";
    if (!updatedUser.email) errors.email = "Email is required";
    if (!updatedUser.phone) errors.phone = "Phone is required";
    if (updatedUser.phone.length !== 10)
      errors.phone = "Mobile number must be 10 digits";
    if (isNaN(updatedUser.phone)) errors.phone = "Phone number must be numeric";
    if (!updatedUser.role) errors.role = "Role is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    const isValid = await validateForm();
    if (!isValid) return;
    setLoading(true);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/users/update/${editingUser}`,
        updatedUser
      );

      setUsers(
        users.map((user) =>
          user.userId === editingUser ? { ...user, ...updatedUser } : user
        )
      );

      setEditingUser(null);
      setFormErrors({});
    } catch (error) {
      console.error("Error updating User", error);
      alert("Failed to save User. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setUpdatedUser({});
    setFormErrors({});
  };

  const handleMobileInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
  };

  const handleTextInput = (e) => {
    const value = e.target.value;
    e.target.value = value.charAt(0).toUpperCase() + value.slice(1);
  };

  const tableHeader = ["Name", "Email", "Phone", "Role", "Status", "Action"];

  return (
    <div className="flex flex-col gap-6">
      <DisplayTable tableData={{ tableHeader }}>
        <div className="p-2 bg-white rounded-b-md">
          {users && users.length > 0 ? (
            users.map((user) => (
              <div
                className="flex flex-row p-2 border-b border-custom-gray-border text-base"
                key={user.userId}
              >
                <div className="flex-1">
                  {editingUser === user.userId ? (
                    <input
                      type="text"
                      name="name"
                      value={updatedUser.name}
                      onChange={handleInputChange}
                      onInput={handleTextInput}
                      className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md w-full"
                    />
                  ) : (
                    user.name
                  )}
                  {formErrors.name && (
                    <p className="text-red-500 text-sm">{formErrors.name}</p>
                  )}
                </div>

                <div className="flex-1">
                  {editingUser === user.userId ? (
                    <input
                      type="text"
                      name="email"
                      value={updatedUser.email}
                      onChange={handleInputChange}
                      className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md w-full"
                    />
                  ) : (
                    user.email
                  )}
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">{formErrors.email}</p>
                  )}
                </div>

                <div className="flex-1">
                  {editingUser === user.userId ? (
                    <input
                      type="text"
                      name="phone"
                      value={updatedUser.phone}
                      onChange={handleInputChange}
                      onInput={handleMobileInput}
                      className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md w-full"
                    />
                  ) : (
                    user.phone
                  )}
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm">{formErrors.phone}</p>
                  )}
                </div>

                <div className="flex-1">
                  {editingUser === user.userId ? (
                    <select
                      type="text"
                      name="role"
                      value={updatedUser.role}
                      onChange={handleInputChange}
                      className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md w-full"
                    >
                      <option value="">Choose Role</option>
                      <option value="Admin">Admin</option>{" "}
                      <option value="Manager">Manager</option>
                      <option value="Product Manager">Product Manager</option>
                    </select>
                  ) : (
                    user.role
                  )}
                  {formErrors.role && (
                    <p className="text-red-500 text-sm">{formErrors.role}</p>
                  )}
                </div>

                <div className="flex-1">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={user.activeState}
                      onChange={() =>
                        handleToggle(user.userId, user.activeState)
                      }
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="flex-1">
                  <div className="flex flex-row gap-3 items-center">
                    {editingUser === user.userId ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="text-base font-medium text-custom-blue"
                        >
                          {loading ? "Saving...." : "Save"}
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-base font-medium text-red-500"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-base font-medium text-custom-blue"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteConfirm(user.userId)}
                          className="text-base font-medium text-red-500"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-2xl">No Data</div>
          )}
        </div>
      </DisplayTable>
    </div>
  );
};

export default UserTable;

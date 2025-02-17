import React, { useRef, useState } from "react";
import DisplayTable from "../global/DisplayTable";
import axios from "axios";

const ComponentTable = ({ components, fetchComponents, setComponents }) => {
  const [editIndex, setEditIndex] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedCover, setEditedCover] = useState(null);

  const editable = useRef(false);

  const tableHeader = [
    "Component Name",
    "Cover",
    "Created",
    "Status",
    "Action",
  ];

  const handleDeleteConfirm = async (componentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this component?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/component/${componentId}`
      );
      fetchComponents();
    } catch (error) {
      console.error("Error deleting component", error);
      alert("Failed to delete component. Please try again.");
    }
  };

  const handleToggle = async (componentId, isActive) => {
    try {
      const updatedComponent = { status: !isActive };
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/component/${componentId}`,
        updatedComponent
      );
      setComponents((prevComponents) =>
        prevComponents.map((component) => {
          return component.componentId === componentId ||
            component._id === componentId
            ? { ...component, status: !isActive }
            : component;
        })
      );
    } catch (error) {
      console.error("Error updating component status", error);
      alert("Failed to update component status. Please try again.");
    }
  };

  const handelUpdate = async (e, componentId) => {
    e.preventDefault();
    const formData = new FormData();
    if (editedCover) {
      formData.append("component_image", editedCover);
    }
    formData.append("name", editedName);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/component/${componentId}`,
        formData
      );
      const result = response.data;
      if (!result) {
        alert("Failed to update component. Please try again.");
        return;
      }
      await fetchComponents();
    } catch (error) {
      console.error("Error adding component:", error);
    }
  };

  const startEdit = (component) => {
    editable.current = true;
    setEditIndex(component.componentId);
    setEditedName(component.name);
  };

  const stopEdit = () => {
    editable.current = false;
    setEditIndex("");
    setEditedName("");
    setEditedCover(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <DisplayTable tableData={{ tableHeader }}>
        <div className="p-2 bg-white rounded-b-md">
          {components.length === 0 ? (
            <div className="text-center text-2xl">No Data</div>
          ) : (
            components.map((component, index) => (
              <div
                className="border-b border-custom-gray-border p-2"
                key={index}
              >
                <div className="flex flex-row text-base">
                  <div className="flex flex-col flex-1">
                    <h1 className="flex-1">{component.name}</h1>
                  </div>
                  <div className="flex flex-1 items-center">
                    <img
                      src={component.component_image.secure_url}
                      alt={component.name}
                      className="w-[15vmax] rounded-md"
                    />
                  </div>
                  <h1 className="flex-1">
                    {new Date(component.createdAt).toDateString()}
                  </h1>
                  <div className="flex-1">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={component.status}
                        onChange={() =>
                          handleToggle(
                            component._id,
                            component.status,
                            component.type
                          )
                        }
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="flex-1">
                    <div className="flex  items-center gap-3">
                      <button
                        onClick={() => startEdit(component)}
                        className="text-base font-medium text-custom-blue"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteConfirm(component._id)}
                        className="text-base font-medium text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                {editable.current && editIndex === component.componentId && (
                  <form
                    onSubmit={(e) => handelUpdate(e, component._id)}
                    className="flex flex-row gap-2 text-base my-4 "
                  >
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="px-2 h-8 border border-custom-gray-border outline-none placeholder:text-custom-gray rounded-md flex-1"
                    />
                    <div className="relative flex-1 h-8 border border-custom-gray-border rounded-md">
                      <label
                        htmlFor="file-input"
                        className="absolute capitalize top-1/2 left-2 transform -translate-y-1/2 text-custom-gray cursor-pointer"
                      >
                        Choose updated Image...
                      </label>
                      <input
                        id="file-input"
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => setEditedCover(e.target.files[0])}
                      />
                    </div>
                    <button
                      className="h-8 flex justify-center items-center flex-1 bg-custom-blue text-base font-medium text-white rounded-md"
                      type="submit"
                    >
                      Submit
                    </button>
                    <button
                      className="h-8 flex justify-center items-center flex-1 bg-custom-black text-base font-medium capitalize text-white rounded-md"
                      type="cancel"
                      onClick={stopEdit}
                    >
                      cancel
                    </button>
                  </form>
                )}
              </div>
            ))
          )}
        </div>
      </DisplayTable>
    </div>
  );
};

export default ComponentTable;

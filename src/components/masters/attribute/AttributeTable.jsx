import React, { useState } from "react";
import DisplayTable from "../../global/DisplayTable";
import axiosFetch from "../../../config/axios.config";
import { set, useForm } from "react-hook-form";

const AttributeTable = ({ attributes, setAttributes, fetchAttributes }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [editedAttribute, setEditedAttribute] = useState({});
  const tableHeader = [
    "Attribute",
    "Included Product Count",
    "Created At",
    "is active",
    "Action",
  ];

  const handleToggle = async (attributeId, isActive) => {
    try {
      const updatedAttribute = { is_active: !isActive };
      await axiosFetch.put(`/attributes/${attributeId}`, updatedAttribute);

      setAttributes(
        attributes.map((attribute) =>
          attribute._id === attributeId
            ? { ...attribute, is_active: !attribute.is_active }
            : attribute
        )
      );
    } catch (error) {
      console.error("Error updating Attribute status", error);
      alert("Failed to Attribute status. Please try again.");
    }
  };

  const handleDeleteConfirm = async (attributeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      await axiosFetch.delete(`/attributes/delete/${attributeId}`);

      setAttributes(
        attributes.filter((attribute) => attribute.attributeId !== attributeId)
      );
    } catch (error) {
      console.error("Error deleting Attribute", error);
      alert("Failed to delete Attribute. Please try again.");
    }
  };

  function handleCancel() {
    setEditedAttribute({});
    reset();
  }

  function handleEdit(attribute) {
    setEditedAttribute(attribute);
    reset({
      attribute_title: attribute.attribute_title,
    });
  }

  async function handelUpdate(data) {
    if (data.attribute_title.trim() === "") {
      alert("Please enter a valid attribute title.");
      return;
    }
    try {
      const response = await axiosFetch.put(
        `/attributes/${editedAttribute.attributeId}`,
        { ...data }
      );
      if (response.status === 200) {
        alert("Attribute updated successfully!");
        handleCancel();
        await fetchAttributes();
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update Attribute. Please try again.");
    }
  }

  return (
    <DisplayTable tableData={{ tableHeader }}>
      {attributes && attributes.length > 0 ? (
        attributes.map((attribute) => (
          <div
            key={attribute._id}
            className="flex flex-row p-2 border-b border-custom-gray-border text-base last:border-none"
          >
            <div className="flex-1">
              {editedAttribute.attributeId === attribute.attributeId ? (
                <input
                  type="text"
                  name="attribute_title"
                  {...register("attribute_title", {
                    required: "Attribute title is required",
                  })}
                  className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md w-full"
                />
              ) : (
                <h1 className="capitalize font-medium">
                  {attribute.attribute_title}
                </h1>
              )}
              {errors.attribute_title && (
                <p className="text-red-500 text-sm">
                  {errors.attribute_title.message}
                </p>
              )}
            </div>
            <div className="flex-1"> {attribute.products.length}</div>
            <div className="flex-1">
              {new Date(attribute.createdAt).toDateString()}
            </div>
            <div className="flex-1">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={attribute.is_active}
                  onChange={() =>
                    handleToggle(attribute._id, attribute.is_active)
                  }
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="flex-1">
              <div className="flex gap-3 items-center">
                {editedAttribute.attributeId === attribute.attributeId ? (
                  <>
                    <button
                      onClick={handleSubmit(handelUpdate)}
                      className="text-base font-medium text-custom-blue"
                    >
                      {/* {loading ? "Saving...." : "Save"} */}
                      Save
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
                      onClick={() => handleEdit(attribute)}
                      className="text-base font-medium text-custom-blue"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteConfirm(attribute._id)}
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
    </DisplayTable>
  );
};

export default AttributeTable;

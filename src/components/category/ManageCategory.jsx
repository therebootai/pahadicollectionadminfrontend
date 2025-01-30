import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayTable from "../global/DisplayTable";

const ManageCategory = ({ categories, setCategories, fetchCategories }) => {
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteConfirm = async (categoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/category/delete/${categoryId}`
      );

      setCategories(
        categories.filter((category) => category.categoryId !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category", error);
      alert("Failed to delete category. Please try again.");
    }
  };

  const handleToggleActive = async (
    categoryId,
    subcategoryId,
    subsubcategoryId,
    isActive
  ) => {
    try {
      let payload = {};

      if (subsubcategoryId) {
        payload = {
          categoryId,
          subcategories: [
            {
              _id: subcategoryId,
              subsubcategories: [
                { _id: subsubcategoryId, isActive: !isActive },
              ],
            },
          ],
        };
      } else if (subcategoryId) {
        payload = {
          categoryId,
          subcategories: [{ _id: subcategoryId, isActive: !isActive }],
        };
      } else {
        payload = {
          categoryId,
          isActive: !isActive,
        };
      }

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/category/update`,
        payload
      );

      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.categoryId === categoryId
            ? {
                ...category,
                isActive:
                  subcategoryId || subsubcategoryId
                    ? category.isActive
                    : !isActive,
                subcategories: category.subcategories.map((sub) =>
                  sub._id === subcategoryId
                    ? {
                        ...sub,
                        isActive: subsubcategoryId ? sub.isActive : !isActive,
                        subsubcategories: sub.subsubcategories.map((ssc) =>
                          ssc._id === subsubcategoryId
                            ? { ...ssc, isActive: !isActive }
                            : ssc
                        ),
                      }
                    : sub
                ),
              }
            : category
        )
      );
    } catch (error) {
      console.error("Error updating category", error);
      alert("Failed to update category. Please try again.");
    }
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex flex-col border border-custom-gray-border rounded-md shadow-custom-lite">
        <div className="flex flex-row p-2 bg-custom-offwhite rounded-t-md text-base font-medium">
          <div className="w-[25%]">Main Category Name</div>
          <div className="w-[25%]">Sub Category Name</div>
          <div className="w-[25%]">Sub-Sub Category Name</div>
          <div className="w-[15%]">Action</div>
        </div>
        {/* Table Body */}
        <div className="p-2 bg-white rounded-b-md">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category._id}
                className="flex flex-col p-2 border-b border-custom-gray-border"
              >
                <div className="flex flex-row p-2">
                  <div className="w-[25%] flex flex-row gap-2 items-center">
                    {category.mainCategory}
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={category.isActive}
                        onChange={() =>
                          handleToggleActive(
                            category.categoryId,
                            null,
                            null,
                            category.isActive
                          )
                        }
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="w-[50%]">
                    {category.subcategories.map((sub) => (
                      <div
                        key={sub._id}
                        className="flex flex-row border-b py-2"
                      >
                        <div className="font-semibold w-[50%] flex items-center gap-2">
                          {sub.subcategoriesname}
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={sub.isActive}
                              onChange={() =>
                                handleToggleActive(
                                  category.categoryId,
                                  sub._id,
                                  null,
                                  sub.isActive
                                )
                              }
                            />
                            <span className="slider"></span>
                          </label>
                        </div>

                        <div className="w-[50%] ">
                          <div className="flex flex-col gap-4">
                            {sub.subsubcategories.map((ssc) => (
                              <div
                                key={ssc._id}
                                className="flex gap-2 items-center"
                              >
                                {ssc.subsubcategoriesname}{" "}
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    checked={ssc.isActive}
                                    onChange={() =>
                                      handleToggleActive(
                                        category.categoryId,
                                        sub._id,
                                        ssc._id,
                                        ssc.isActive
                                      )
                                    }
                                  />
                                  <span className="slider"></span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Empty column for Sub-Sub Category Name */}
                  <div className="w-[15%] flex flex-row gap-2 font-medium">
                    <button className="text-custom-blue rounded-md">
                      Edit
                    </button>
                    <button
                      className="text-red-700 rounded-md"
                      onClick={() => handleDeleteConfirm(category.categoryId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-2xl">Not found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;

import React, { useState, useEffect } from "react";
import axiosFetch from "../../config/axios.config";

const ManageCategory = ({ categories, setCategories, fetchCategories }) => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteConfirm = async (categoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      await axiosFetch.delete(`/category/delete/${categoryId}`);

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

      await axiosFetch.put(`/category/update`, payload);

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

  const handleEdit = (categoryId) => {
    const categoryToEdit = categories.find(
      (category) => category.categoryId === categoryId
    );
    setEditingCategory({ ...categoryToEdit });
  };

  const handleImageChange = (e, categoryId) => {
    const file = e.target.files[0];
    if (file) {
      setEditingCategory((prev) => ({
        ...prev,
        categoryImageFile: file,
      }));
    }
  };

  const handleSave = async () => {
    if (editingCategory.mainCategory === "") {
      alert("Please enter a main category name.");
      return;
    }
    if (
      editingCategory.subcategories.some((sub) => sub.subcategoriesname === "")
    ) {
      alert("Please enter a subcategory name.");
      return;
    }
    if (
      editingCategory.subcategories.some((sub) =>
        sub.subsubcategories.some((ssc) => ssc.subsubcategoriesname === "")
      )
    ) {
      alert("Please enter a sub-subcategory name.");
      return;
    }
    setLoading(true);
    try {
      const categoryPayload = {
        categoryId: editingCategory.categoryId,
        mainCategory: editingCategory.mainCategory,
        subcategories: editingCategory.subcategories,
        isActive: editingCategory.isActive,
      };

      let categoryImageUrl = editingCategory.categoryImage;
      if (editingCategory.categoryImageFile) {
        const imageFormData = new FormData();
        imageFormData.append(
          "categoryImage",
          editingCategory.categoryImageFile
        );
        imageFormData.append("categoryId", editingCategory.categoryId);

        const imageResponse = await axiosFetch.put(
          `/category/upload-image`,
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        categoryImageUrl = imageResponse.data.categoryImage.secure_url;
      }

      const finalPayload = {
        ...categoryPayload,
        categoryImage: categoryImageUrl,
      };

      const response = await axiosFetch.put(`/category/update`, finalPayload);

      setCategories((prevCategories) => {
        return prevCategories.map((category) =>
          category.categoryId === editingCategory.categoryId
            ? { ...category, ...editingCategory }
            : category
        );
      });

      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Error saving category", error);
      if (error.response) {
        alert(`Failed to save category: ${error.response.data.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingCategory(null);
  };

  const handleInputChange = (
    e,
    level,
    categoryId,
    subcategoryId,
    subsubcategoryId
  ) => {
    const { value } = e.target;

    if (level === "main") {
      setEditingCategory({
        ...editingCategory,
        mainCategory: value.trimStart(),
      });
    } else if (level === "subcategory") {
      setEditingCategory({
        ...editingCategory,
        subcategories: editingCategory.subcategories.map((sub) =>
          sub._id === subcategoryId
            ? { ...sub, subcategoriesname: value.trimStart() }
            : sub
        ),
      });
    } else if (level === "subsubcategory") {
      setEditingCategory({
        ...editingCategory,
        subcategories: editingCategory.subcategories.map((sub) =>
          sub._id === subcategoryId
            ? {
                ...sub,
                subsubcategories: sub.subsubcategories.map((ssc) =>
                  ssc._id === subsubcategoryId
                    ? { ...ssc, subsubcategoriesname: value.trimStart() }
                    : ssc
                ),
              }
            : sub
        ),
      });
    }
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex flex-col border border-custom-gray-border rounded-md shadow-custom-lite">
        <div className="flex flex-row p-4 bg-custom-offwhite rounded-t-md text-base font-medium">
          <div className="w-[35%]">Main Category Name</div>
          <div className="w-[25%]">Sub Category Name</div>
          <div className="w-[25%]">Sub-Sub Category Name</div>
          <div className="w-[15%]">Action</div>
        </div>
        <div className="p-2 bg-white rounded-b-md">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={`${category.categoryId}-${category._id}`} // Ensuring unique key
                className="flex flex-col p-2 border-b border-custom-gray-border"
              >
                <div className="flex flex-row p-2">
                  <div className="w-[35%] flex flex-row gap-4">
                    <div className="w-[50%] flex flex-row gap-2">
                      {editingCategory &&
                      editingCategory.categoryId === category.categoryId ? (
                        <input
                          type="text"
                          value={editingCategory.mainCategory}
                          onChange={(e) =>
                            handleInputChange(e, "main", category.categoryId)
                          }
                          className="bg-custom-lite-gray rounded-md border border-custom-gray-border h-[2.5rem] px-2"
                        />
                      ) : (
                        category.mainCategory
                      )}
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
                    <div className="">
                      {editingCategory &&
                      editingCategory.categoryId === category.categoryId ? (
                        <div className="flex flex-col gap-2">
                          <img
                            src={
                              editingCategory?.categoryImageFile
                                ? URL.createObjectURL(
                                    editingCategory.categoryImageFile
                                  )
                                : category.categoryImage.secure_url
                            }
                            alt="Selected Thumbnail"
                            className="w-full h-[6rem] object-cover rounded-md"
                          />

                          <div className="relative w-full h-[3rem] border border-[#CCCCCC] rounded-md truncate">
                            <label
                              htmlFor="file-input"
                              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-custom-gray cursor-pointer"
                            >
                              Choose Thumbnail...
                            </label>
                            <input
                              id="file-input"
                              type="file"
                              accept="image/*"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer truncate"
                              onChange={(e) =>
                                handleImageChange(e, category.categoryId)
                              }
                            />
                          </div>
                        </div>
                      ) : (
                        <img
                          src={category.categoryImage.secure_url}
                          alt="Selected Thumbnail"
                          className="w-full h-[6rem] object-cover rounded-md"
                        />
                      )}
                    </div>
                  </div>
                  <div className="w-[50%]">
                    {category.subcategories.map((sub) => (
                      <div
                        key={`${sub._id}-${sub.subcategoriesname}`}
                        className="flex flex-row border-b py-2"
                      >
                        <div className=" w-[50%] flex gap-2 items-center">
                          {editingCategory &&
                          editingCategory.categoryId === category.categoryId ? (
                            <input
                              type="text"
                              value={
                                editingCategory.subcategories.find(
                                  (subEdit) => subEdit._id === sub._id
                                )?.subcategoriesname || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "subcategory",
                                  category.categoryId,
                                  sub._id
                                )
                              }
                              className="bg-custom-lite-gray rounded-md border border-custom-gray-border h-[2.5rem] px-2"
                            />
                          ) : (
                            sub.subcategoriesname
                          )}
                          <label className="switch self-center">
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

                        <div className="w-[50%]">
                          <div className="flex flex-col gap-4">
                            {sub.subsubcategories.map((ssc) => (
                              <div
                                key={`${ssc._id}-${ssc.subsubcategoriesname}`}
                                className="flex gap-2 items-center"
                              >
                                {editingCategory &&
                                editingCategory.categoryId ===
                                  category.categoryId ? (
                                  <input
                                    type="text"
                                    value={
                                      editingCategory.subcategories
                                        .find(
                                          (subEdit) => subEdit._id === sub._id
                                        )
                                        ?.subsubcategories.find(
                                          (sscEdit) => sscEdit._id === ssc._id
                                        )?.subsubcategoriesname || ""
                                    }
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        "subsubcategory",
                                        category.categoryId,
                                        sub._id,
                                        ssc._id
                                      )
                                    }
                                    className="bg-custom-lite-gray rounded-md border border-custom-gray-border h-[2.5rem] px-2"
                                  />
                                ) : (
                                  ssc.subsubcategoriesname
                                )}
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

                  <div className="w-[15%] flex flex-row gap-2 font-medium items-start">
                    {editingCategory &&
                    editingCategory.categoryId === category.categoryId ? (
                      <>
                        <button
                          className="text-green-700 rounded-md"
                          onClick={handleSave}
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save"}
                        </button>
                        <button
                          className="text-gray-700 rounded-md"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-custom-blue rounded-md"
                          onClick={() => handleEdit(category.categoryId)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-700 rounded-md"
                          onClick={() =>
                            handleDeleteConfirm(category.categoryId)
                          }
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
      </div>
    </div>
  );
};

export default ManageCategory;

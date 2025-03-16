import React, { useState, useEffect } from "react";
import axiosFetch from "../../config/axios.config";

const AddCategory = ({ fetchCategories, categories }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [subcategory, setSubcategory] = useState(false);
  const [subsubcategory, setSubSubcategory] = useState(false);
  const [mainCategory, setMainCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subSubCategoryName, setSubSubCategoryName] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
  };

  // Create main category
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fileInput = document.querySelector("#file-input");
      const categoryData = { mainCategory };
      const file = fileInput.files[0];

      const formData = new FormData();
      formData.append("mainCategory", categoryData.mainCategory);
      formData.append("categoryImage", file);

      const response = await axiosFetch.post(`/category/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMainCategory("");
      setThumbnail(null);
      fetchCategories();
      alert("Main Category created successfully!");
      // Optionally, redirect or update UI
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Error creating category.");
    } finally {
      setLoading(false);
    }
  };

  // Add subcategory to the selected main category
  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newSubcategory = {
        subcategoriesname: subCategoryName,
        isActive: true,
      };

      const response = await axiosFetch.put(`/category/update`, {
        categoryId: selectedCategoryId,
        subcategories: [newSubcategory],
      });

      alert("Subcategory added successfully!");
      setSubCategoryName("");
      fetchCategories();
    } catch (error) {
      console.error("Error adding subcategory:", error);
      alert("Error adding subcategory.");
    } finally {
      setLoading(false);
    }
  };

  // Add sub-subcategory to the selected subcategory
  const handleAddSubSubCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newSubSubCategory = {
        subsubcategoriesname: subSubCategoryName,
        isActive: true,
      };

      // Ensure the correct structure for subcategory
      const response = await axiosFetch.put(`/category/update`, {
        categoryId: selectedCategoryId,
        subcategories: [
          {
            _id: subCategoryId,
            subsubcategories: [newSubSubCategory],
          },
        ],
      });

      alert("Sub-Subcategory added successfully!");
      setSubSubCategoryName("");
      fetchCategories();
    } catch (error) {
      console.error("Error adding sub-subcategory:", error);
      alert("Error adding sub-subcategory.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="p-4 bg-white rounded-md flex flex-col gap-8 shadow-custom">
        <h1 className="text-xl font-medium text-custom-black">Add Category</h1>
        <form
          className="flex flex-row gap-3 items-center"
          onSubmit={handleCreateCategory}
        >
          <div className="w-[60%] flex flex-col gap-8">
            <input
              type="text"
              value={mainCategory}
              onChange={(e) => setMainCategory(e.target.value)}
              placeholder="Enter Main Category Name"
              className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
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
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="w-[20%]">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="Selected Thumbnail"
                className="w-full h-[8rem] object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-[8rem] bg-gray-200 rounded-md flex items-center justify-center text-custom-gray"></div>
            )}
          </div>
          <div className="w-[20%]">
            <button
              type="submit"
              disabled={loading}
              className="h-[3rem] flex justify-center items-center w-full bg-custom-blue text-base font-medium text-white rounded-md"
            >
              {loading ? "Saving..." : "Add"}
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-4">
          <div
            onClick={() => setSubcategory(!subcategory)}
            className="text-xl font-semibold cursor-pointer text-custom-blue"
          >
            Add Sub Category
          </div>
          {subcategory && (
            <div className="flex flex-col gap-6">
              <form className="flex flex-row gap-4">
                <div className="flex flex-col gap-4 w-[80%]">
                  <select
                    className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                  >
                    <option>Select Main Category</option>
                    {categories.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.mainCategory}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                    placeholder="Enter Sub Category Name"
                    className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
                  />
                </div>
                <div className="w-[20%]">
                  <button
                    type="button"
                    onClick={handleAddSubCategory}
                    disabled={loading}
                    className="h-[3rem] flex justify-center items-center w-full bg-custom-blue text-base font-medium text-white rounded-md"
                  >
                    {loading ? "Saving..." : "Add"}
                  </button>
                </div>
              </form>
              <div
                onClick={() => setSubSubcategory(!subsubcategory)}
                className="text-xl font-semibold cursor-pointer text-custom-blue"
              >
                Add Sub-Sub Category
              </div>
              {subsubcategory && (
                <form className="flex flex-row gap-4">
                  <div className="flex flex-col gap-4 w-[80%]">
                    <select
                      className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
                      onChange={(e) => setSubCategoryId(e.target.value)}
                    >
                      <option>Select Sub Category</option>
                      {categories
                        .find(
                          (category) =>
                            category.categoryId === selectedCategoryId
                        )
                        ?.subcategories.map((sub) => (
                          <option key={sub._id} value={sub._id}>
                            {" "}
                            {/* Use _id here */}
                            {sub.subcategoriesname}
                          </option>
                        ))}
                    </select>

                    <input
                      type="text"
                      value={subSubCategoryName}
                      onChange={(e) => setSubSubCategoryName(e.target.value)}
                      placeholder="Enter Sub Sub Category Name"
                      className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
                    />
                  </div>
                  <div className="w-[20%]">
                    <button
                      type="button"
                      onClick={handleAddSubSubCategory}
                      disabled={loading}
                      className="h-[3rem] flex justify-center items-center w-full bg-custom-blue text-base font-medium text-white rounded-md"
                    >
                      {loading ? "Saving..." : "Add"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCategory;

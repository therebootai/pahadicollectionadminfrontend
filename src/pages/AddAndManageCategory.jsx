import React, { useState } from "react";
import AddCategory from "../components/category/AddCategory";
import ManageCategory from "../components/category/ManageCategory";
import MainPageTemplate from "../template/MainPageTemplate";
import SidePopUpSlider from "../components/global/SidePopUpSlider";
import axiosFetch from "../config/axios.config";

const AddAndManageCategory = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleAddCategory = () => {
    setShowAddCategory(true);
  };

  const handleClose = () => {
    setShowAddCategory(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosFetch.get(`/category/get`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  return (
    <MainPageTemplate>
      <div className="flex flex-col gap-8 ">
        <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4">
          <button className="h-[3rem] px-8 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white">
            Import Category
          </button>
          <button
            onClick={handleAddCategory}
            className="h-[3rem] px-8 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white"
          >
            Add Category
          </button>
        </div>
        <div>
          <ManageCategory
            categories={categories}
            setCategories={setCategories}
            fetchCategories={fetchCategories}
          />
        </div>

        <SidePopUpSlider handleClose={handleClose} showPopUp={showAddCategory}>
          <div className="p-4">
            <AddCategory
              fetchCategories={fetchCategories}
              categories={categories}
            />
          </div>
        </SidePopUpSlider>
      </div>
    </MainPageTemplate>
  );
};

export default AddAndManageCategory;

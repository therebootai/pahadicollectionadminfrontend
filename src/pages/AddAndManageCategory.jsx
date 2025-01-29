import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import AddCategory from "../components/category/AddCategory";
import ManageCategory from "../components/category/ManageCategory";
import MainPageTemplate from "../template/MainPageTemplate";

const AddAndManageCategory = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);

  const handleAddCategory = () => {
    setShowAddCategory(true);
  };

  const handleClose = () => {
    setShowAddCategory(false);
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
          <ManageCategory />
        </div>

        <div
          className={`fixed top-0 right-0 h-screen w-[60%] overflow-scroll no-scrollbar bg-[#EDF4F7] shadow-lg transform transition-transform duration-300 ease-in-out ${
            showAddCategory ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4 text-custom-violet ">
            <button onClick={handleClose}>
              <AiOutlineCloseCircle size={24} className="text-xl font-bold" />
            </button>
          </div>

          <div className="p-4">
            <AddCategory />
          </div>
        </div>
      </div>
    </MainPageTemplate>
  );
};

export default AddAndManageCategory;

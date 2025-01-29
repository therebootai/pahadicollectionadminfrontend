import React, { useState } from "react";

const AddCategory = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [subcategory, setSubcategory] = useState(false);
  const [subsubcategory, setSubSubcategory] = useState(false);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file)); // Create a URL for the selected file
    }
  };
  const opensubcategory = () => setSubcategory(!subcategory);
  const opensubsubcategory = () => setSubSubcategory(!subsubcategory);
  return (
    <div className="">
      <div className="p-4 bg-white rounded-md flex flex-col gap-8 shadow-custom">
        <h1 className="text-xl font-medium text-custom-black">Add Category</h1>
        <form className="flex flex-row gap-3 items-center">
          <div className="w-[60%] flex  flex-col gap-8 ">
            <input
              type="text"
              placeholder="Enter Main Category Name"
              className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
            />
            <div className="relative w-full h-[3rem] border border-[#CCCCCC] rounded-md">
              <label
                htmlFor="file-input"
                className="absolute top-1/2 left-2 transform -translate-y-1/2 text-custom-gray cursor-pointer"
              >
                Choose Thumbnail...
              </label>
              <input
                id="file-input"
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
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
          <div className="w-[20%] ">
            <button className="h-[3rem] flex justify-center items-center w-full bg-custom-blue text-base font-medium text-white rounded-md">
              Add
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-4">
          <div
            onClick={opensubcategory}
            className="text-xl font-semibold cursor-pointer text-custom-blue"
          >
            Add Sub Category
          </div>
          <div>
            {subcategory && (
              <div className="flex flex-col gap-6">
                <form className="flex flex-row gap-4">
                  <div className="flex flex-col gap-4 w-[80%]">
                    <input
                      type="text"
                      placeholder="Select Main Category Name"
                      className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Enter Sub Category Name"
                      className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
                    />
                  </div>
                  <div className="w-[20%] ">
                    <button className="h-[3rem] flex justify-center items-center w-full bg-custom-blue text-base font-medium text-white rounded-md">
                      Add
                    </button>
                  </div>
                </form>
                <div
                  onClick={opensubsubcategory}
                  className="text-xl font-semibold cursor-pointer text-custom-blue"
                >
                  Add Sub-Sub Category
                </div>
                <div>
                  {subsubcategory && (
                    <form className="flex flex-row gap-4">
                      <div className="flex flex-col gap-4 w-[80%]">
                        <input
                          type="text"
                          placeholder="Select Sub Category Name"
                          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="Enter Sub Sub Category Name"
                          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
                        />
                      </div>
                      <div className="w-[20%] ">
                        <button className="h-[3rem] flex justify-center items-center w-full bg-custom-blue text-base font-medium text-white rounded-md">
                          Add
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;

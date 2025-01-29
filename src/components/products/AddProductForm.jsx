import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const AddProductForm = () => {
  const [productImage, setProductImage] = useState(null);
  const [hoverImage, setHoverImage] = useState(null);
  const [productType, setProductType] = useState("single");

  const handleFileChange = (event, setFunc) => {
    const file = event.target.files[0];
    if (file) {
      setFunc(URL.createObjectURL(file)); // Create a URL for the selected file
    }
  };

  return (
    <form className="flex flex-col gap-12">
      <div className="grid grid-cols-3 gap-8">
        <input
          type="text"
          placeholder="Enter Product Title"
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
        />
        <select
          name=""
          id=""
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
        >
          <option value="">Choose Category</option>
        </select>
        <select
          name=""
          id=""
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
        >
          <option value="">Choose Sub Category</option>
        </select>
        <select
          name=""
          id=""
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
        >
          <option value="">Choose Sub-Sub Category</option>
        </select>
        <select
          name=""
          id=""
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
        >
          <option value="">Choose Pickup Location</option>
        </select>
        <select
          name=""
          id=""
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
        >
          <option value="">Choose Product Type</option>
          <option value="single">Single</option>
          <option value="variable">Variable</option>
        </select>
        <input
          type="number"
          placeholder="Discount"
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
        />
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-medium text-custom-black">Other Details &#40;Product Types&#41;</h2>
        {productType === "single" ? (
          <div className="flex flex-wrap gap-8 w-full">
            <input
              type="number"
              placeholder="In-Stock"
              className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md flex-1"
            />
            <input
              type="number"
              placeholder="MRP"
              className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md flex-1"
            />
            <input
              type="number"
              placeholder="Price"
              className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md flex-1"
            />
            <input
              type="text"
              placeholder="Enter Attribute"
              className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md flex-1"
            />
          </div>
        ) : (
          <div className="flex flex-wrap gap-8 w-full">
            <input
              type="text"
              placeholder="Enter Alternate Product Title"
              className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md flex-1"
            />
            <select
              name=""
              id=""
              className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md flex-1"
            >
              <option value="">Color &#40;Gold/Silver&#41;</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
            </select>
            <input
              type="number"
              placeholder="In-Stock"
              className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md flex-1"
            />
            <input
              type="number"
              placeholder="MRP"
              className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md flex-1"
            />
            <input
              type="number"
              placeholder="Price"
              className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md flex-1"
            />
            <input
              type="number"
              placeholder="Weight (10 G)"
              className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md flex-1"
            />
          </div>
        )}
      </div>
      <textarea
        name=""
        id=""
        rows={5}
        className="p-2 border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
        placeholder="Write Description"
      ></textarea>
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-medium text-custom-black">
          Main Specifications
        </h3>
        <div className="grid grid-cols-3 gap-8">
          <input
            type="text"
            placeholder="Type"
            className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
          />
          <input
            type="text"
            placeholder="Value"
            className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
          />
          <button
            type="button"
            className="bg-custom-lite-gray border border-custom-gray-border text-custom-black h-12 rounded-md"
          >
            Add Specification
          </button>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col gap-8 flex-1">
          <div className="relative w-full h-[3rem] border border-custom-gray-border rounded-md">
            <label
              htmlFor="file-input"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-custom-gray cursor-pointer"
            >
              Choose Product Images...
            </label>
            <input
              id="file-input"
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => handleFileChange(e, setProductImage)}
            />
          </div>
          <div className="w-[20%]">
            {productImage ? (
              <img
                src={productImage}
                alt="Selected Thumbnail"
                className="w-full h-[8rem] object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-[8rem] bg-gray-200 rounded-md flex items-center justify-center text-custom-gray"></div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-8 flex-1">
          <div className="relative w-full h-[3rem] border border-custom-gray-border rounded-md">
            <label
              htmlFor="file-input"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-custom-gray cursor-pointer"
            >
              Choose Hover Image..
            </label>
            <input
              id="file-input"
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => handleFileChange(e, setHoverImage)}
            />
          </div>
          <div className="w-[20%]">
            {hoverImage ? (
              <img
                src={hoverImage}
                alt="Selected Thumbnail"
                className="w-full h-[8rem] object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-[8rem] bg-gray-200 rounded-md flex items-center justify-center text-custom-gray"></div>
            )}
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col gap-3">
        <h3
          className="text-base font-medium text-custom-violet inline-flex items-center gap-2 cursor-pointer"
          onClick={() => setIsVariantAvailable(!isVariantAvailable)}
        >
          If Available Varible{" "}
          <FaChevronRight
            className={`${
              isVariantAvailable ? "rotate-90" : "rotate-0"
            } transition-transform duration-300`}
          />
        </h3>
      </div> */}
      <div className="w-[20%] ">
        <button className="h-[3rem] flex justify-center items-center w-full bg-custom-blue text-base font-medium text-white rounded-md">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;

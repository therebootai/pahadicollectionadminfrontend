import React, { useState } from "react";

const AddNewComponent = ({ pageType }) => {
  const [componentType, setComponentType] = useState(pageType);
  const [componentImage, setComponentImage] = useState(null);
  const handleFileChange = (event, setFunc) => {
    const file = event.target.files[0];
    if (file) {
      setFunc(URL.createObjectURL(file)); // Create a URL for the selected file
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form action="" className="flex gap-2 items-center" onSubmit={handelSubmit}>
      <select
        name=""
        value={componentType}
        onChange={(e) => setComponentType(e.target.value)}
        id=""
        className="px-2 h-[3rem] border border-custom-gray-border outline-none placeholder:text-custom-gray rounded-md flex-1 capitalize"
      >
        <option value="slider">slider</option>
        <option value="banner">banner</option>
        <option value="logo">logo</option>
        <option value="popup">Pop-Up</option>
      </select>
      <input
        type="text"
        name=""
        id=""
        required
        placeholder={`${componentType} Name`}
        className="px-2 h-[3rem] border border-custom-gray-border outline-none placeholder:text-custom-gray rounded-md flex-1 capitalize placeholder:capitalize"
      />
      <div className="relative flex-1 h-[3rem] border border-custom-gray-border rounded-md">
        <label
          htmlFor="file-input"
          className="absolute capitalize top-1/2 left-2 transform -translate-y-1/2 text-custom-gray cursor-pointer"
        >
          Choose {componentType} Images...
        </label>
        <input
          id="file-input"
          type="file"
          required
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => handleFileChange(e, setComponentImage)}
        />
      </div>
      <button
        className="h-[3rem] flex justify-center items-center flex-1 bg-custom-blue text-base font-medium text-white rounded-md"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default AddNewComponent;

import React, { useEffect, useState } from "react";
import axiosFetch from "../../config/axios.config";

const AddNewComponent = ({ pageType, fetchComponents }) => {
  const [componentType, setComponentType] = useState(pageType);
  const [componentImage, setComponentImage] = useState(null);
  const [componentName, setComponentName] = useState("");

  useEffect(() => {
    setComponentType(pageType);
  }, [pageType]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("type", componentType);
    formData.append("component_image", componentImage);
    formData.append("name", componentName);

    try {
      const response = await axiosFetch.post(`/component/create`, formData);
      const result = response.data;
      await fetchComponents();
    } catch (error) {
      console.error("Error adding component:", error);
    }
  };

  return (
    <>
      <form className="flex gap-2 items-center" onSubmit={handelSubmit}>
        <select
          value={componentType}
          onChange={(e) => setComponentType(e.target.value)}
          disabled
          className="px-2 h-[3rem] border border-custom-gray-border outline-none placeholder:text-custom-gray rounded-md flex-1 capitalize cursor-not-allowed"
        >
          <option value="slider">slider</option>
          <option value="banner">banner</option>
          <option value="logo">logo</option>
          <option value="pop-up">Pop-Up</option>
        </select>
        <input
          type="text"
          value={componentName}
          onChange={(e) => setComponentName(e.target.value)}
          required
          placeholder={`${componentType} Name`}
          className="px-2 h-[3rem] border border-custom-gray-border outline-none placeholder:text-custom-gray rounded-md flex-1 capitalize placeholder:capitalize"
        />
        <div className="relative flex-1 h-[3rem] border border-custom-gray-border rounded-md">
          <label
            htmlFor="file-input"
            className="absolute capitalize top-1/2 left-2 transform -translate-y-1/2 text-custom-gray cursor-pointer truncate"
          >
            {componentImage
              ? componentImage.name
              : `Choose ${componentType} Images...`}
          </label>
          <input
            id="file-input"
            type="file"
            required
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => setComponentImage(e.target.files[0])}
          />
        </div>
        <button
          className="h-[3rem] flex justify-center items-center flex-1 bg-custom-blue text-base font-medium text-white rounded-md"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div></div>
    </>
  );
};

export default AddNewComponent;

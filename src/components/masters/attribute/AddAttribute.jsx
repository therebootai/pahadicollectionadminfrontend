import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosFetch from "../../../config/axios.config";

const AddAttribute = ({ fetchAttributes }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    if (data.attribute_title.trim() === "") {
      alert("Please enter a valid attribute title.");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosFetch.post(`/attributes`, data);
      if (response.status === 201) {
        alert("Attribute added successfully!");
      }
      reset();
      fetchAttributes();
    } catch (error) {
      alert("Failed to add attribute. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 w-full ">
      <div className="flex-1">
        <input
          type="text"
          {...register("attribute_title", {
            required: "Attribute title is required",
          })}
          placeholder="Attribute Name"
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md w-full"
        />
        {errors.attribute_title && (
          <p className="text-red-500 text-sm">
            {errors.attribute_title.message}
          </p>
        )}
      </div>
      <button
        className="h-[3rem] px-6 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white min-w-[15vmax]"
        type="submit"
        disabled={loading}
      >
        {loading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
};

export default AddAttribute;

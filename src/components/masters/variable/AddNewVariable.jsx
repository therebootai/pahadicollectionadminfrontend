import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import axios from "axios";
import { useForm } from "react-hook-form";

const AddNewVariable = () => {
  const [variableValues, setVariableValues] = useState([""]);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddValue = () => {
    setVariableValues([...variableValues, ""]);
  };

  const handleRemoveValue = (index) => {
    setVariableValues(variableValues.filter((_, i) => i !== index));
  };

  const handleChangeValue = (index, newValue) => {
    setVariableValues(
      variableValues.map((val, i) => (i === index ? newValue : val))
    );
  };

  const onSubmit = async (data) => {
    const variableData = {
      variableName: data.variableName,
      variableType: variableValues
        .filter((val) => val !== "")
        .map((val) => ({ varType: val })),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/variables/create`,
        variableData
      );

      if (response.status === 200) {
        reset();
        setVariableValues([""]);
      }
    } catch (error) {
      console.error("Error creating variable:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleTextInput = (e) => {
    const value = e.target.value;
    e.target.value = value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <div className="flex flex-col bg-white gap-4 p-4 rounded-md shadow-custom-lite">
      <h1 className="text-xl font-medium text-custom-black">
        Add New Variable
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="w-full flex flex-col ">
          <input
            type="text"
            placeholder="Variable Name"
            {...register("variableName", {
              required: "Variable Name is required",
            })}
            onInput={handleTextInput}
            className="px-2 h-[3rem] border border-custom-gray-border outline-none placeholder:text-custom-gray rounded-md"
          />
          {errors.variableName && (
            <span className="text-red-500">{errors.variableName.message}</span>
          )}
        </div>

        {variableValues.map((value, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={value}
              onChange={(e) => handleChangeValue(index, e.target.value)}
              onInput={handleTextInput}
              placeholder="Enter Variable Value"
              className="px-2 h-[3rem] border border-custom-gray-border outline-none placeholder:text-custom-gray rounded-md flex-1"
            />
            <button
              type="button"
              onClick={handleAddValue}
              className="size-12 border border-custom-gray-border text-xl text-orange-500 rounded-md inline-flex items-center justify-center bg-white"
            >
              <FaPlus />
            </button>
            {variableValues.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveValue(index)}
                className="size-12 border border-custom-gray-border text-xl text-red-500 rounded-md inline-flex items-center justify-center bg-white"
              >
                <FaMinus />
              </button>
            )}
          </div>
        ))}

        {variableValues.filter((val) => val !== "").length === 0 && (
          <span className="text-red-500">
            At least one variable type is required
          </span>
        )}

        <button
          className="h-[3rem] px-6 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewVariable;

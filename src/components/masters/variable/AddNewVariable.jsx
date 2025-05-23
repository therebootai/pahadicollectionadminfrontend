import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axiosFetch from "../../../config/axios.config";

const AddNewVariable = ({ fetchVariables, variableToEdit }) => {
  const [variableValues, setVariableValues] = useState([""]);
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (variableToEdit) {
      setValue("variableName", variableToEdit.variableName);
      setVariableValues(
        variableToEdit.variableType.map((item) => item.varType)
      );
    }
  }, [variableToEdit, setValue]);

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
    if (data.variableName.trim() === "") {
      alert("Please enter a valid variable name.");
      return;
    }
    const variableData = {
      variableName: data.variableName,
      variableType: variableValues
        .filter((val) => val !== "")
        .map((val) => ({ varType: val })),
    };

    setLoading(true);

    try {
      if (variableToEdit) {
        await axiosFetch.put(
          `/variables/update/${variableToEdit.variableId}`,
          variableData
        );
      } else {
        await axiosFetch.post(`/variables/create`, variableData);
      }
      reset();
      setVariableValues([""]);
      fetchVariables();
    } catch (error) {
      console.error("Error saving variable:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTextInput = (e) => {
    const value = e.target.value;
    e.target.value = value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <div className="flex flex-col bg-white gap-4 p-4 rounded-md shadow-custom-lite">
      <h1 className="text-xl font-medium text-custom-black">
        {variableToEdit ? "Edit Variable" : "Add New Variable"}
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
              onChange={(e) =>
                handleChangeValue(index, e.target.value.trimStart())
              }
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
          disabled={loading}
        >
          {loading ? "Saving..." : variableToEdit ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddNewVariable;

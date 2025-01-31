import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const AddNewVariable = () => {
  const [variableName, setVariableName] = useState("");
  const [variableValues, setVariableValues] = useState([""]);

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

  return (
    <div className="flex flex-col bg-white gap-4 p-4 rounded-md shadow-custom-lite">
      <h1 className="text-xl font-medium text-custom-black">Add New Variable</h1>
      <form action="" className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Variable Name"
          value={variableName}
          onChange={(e) => setVariableName(e.target.value)}
          className="px-2 h-[3rem] border border-custom-gray-border outline-none placeholder:text-custom-gray rounded-md"
        />
        {variableValues.map((value, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={value}
              onChange={(e) => handleChangeValue(index, e.target.value)}
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

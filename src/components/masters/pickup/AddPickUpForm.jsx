import React from "react";

const AddPickUpForm = () => {
  return (
    <form action="" className="flex gap-3">
      <input
        type="text"
        placeholder="Name"
        className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
      />
      <input
        type="text"
        placeholder="Pickup Location"
        className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
      />
      <input
        type="number"
        placeholder="Pin Code"
        className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
      />
      <input
        type="tel"
        placeholder="Mobile No.."
        className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
      />
      <button
        className="h-[3rem] px-6 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default AddPickUpForm;

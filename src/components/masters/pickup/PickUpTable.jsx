import React from "react";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const PickUpTable = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col border border-custom-gray-border rounded-md shadow-custom-lite h-80 overflow-hidden overflow-y-scroll">
        <div className="flex flex-row p-2 bg-custom-offwhite  rounded-t-md text-base font-medium">
          <div className="w-[20%]">Name</div>
          <div className="w-[20%]">Address Details</div>
          <div className="w-[20%]">Mobile Number</div>
          <div className="w-[20%]">Action</div>
        </div>
        <div className="p-2 bg-white rounded-b-md"></div>
      </div>
      <div className="p-4 px-6 flex justify-end items-center shadow-custom-lite bg-white border border-custom-gray-border rounded-md">
        <div className="flex flex-row gap-6 items-center justify-end">
          <div className="flex items-center gap-1">
            <MdOutlineKeyboardDoubleArrowLeft /> Prev
          </div>
          <div className="flex flex-row gap-2">
            <div className="size-8 rounded-md bg-custom-violet text-white border-custom-violet border flex justify-center items-center text-base font-medium">
              1
            </div>
            <div className="size-8 rounded-md bg-white hover:bg-custom-violet hover:text-white transition-colors duration-500  text-custom-violet border-custom-violet border flex justify-center items-center text-base font-medium">
              2
            </div>
          </div>
          <div className="flex items-center gap-1">
            next <MdOutlineKeyboardDoubleArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickUpTable;

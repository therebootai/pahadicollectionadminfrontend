import React from "react";

const ProductTable = () => {
  return (
    <div className="flex flex-col border border-custom-gray-border rounded-md shadow-custom-lite h-80 overflow-hidden overflow-y-scroll">
      <div className="flex flex-row p-2 bg-custom-offwhite  rounded-t-md text-base font-medium">
        <div className="w-[25%]">Product Name</div>
        <div className="w-[25%]">Product ID</div>
        <div className="w-[10%]">Price/MRP</div>
        <div className="w-[25%]">Product Category Name</div>
        <div className="w-[10%]">In-Stock</div>
        <div className="w-[10%]">Status</div>
        <div className="w-[10%]">Action</div>
      </div>
      <div className="p-2 bg-white rounded-b-md"></div>
    </div>
  );
};

export default ProductTable;

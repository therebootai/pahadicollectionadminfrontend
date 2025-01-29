import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddCoupon = () => {
  return (
    <div>
      <form action="" className="grid grid-cols-6 gap-4 items-center">
        <input
          type="text"
          placeholder="Coupon Name"
          className="h-[3rem] px-2 border border-custom-gray-border outline-none placeholder:text-custom-gray text-custom-black rounded-md"
        />
        <input
          type="text"
          placeholder="Discount/Coupon"
          className="h-[3rem] px-2 border border-custom-gray-border outline-none placeholder:text-custom-gray text-custom-black rounded-md"
        />
        <input
          type="text"
          placeholder="Minimum Value"
          className="h-[3rem] px-2 border border-custom-gray-border outline-none placeholder:text-custom-gray text-custom-black rounded-md"
        />
        <div className=" relative">
          <DatePicker
            dateFormat="MM/dd/yyyy"
            placeholderText="Start Date"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            className="h-[3rem] w-full px-2 border border-custom-gray-border outline-none placeholder:text-custom-gray text-custom-black rounded-md"
          />
        </div>
        <div className=" relative">
          <DatePicker
            dateFormat="MM/dd/yyyy"
            placeholderText="End Date"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            className="h-[3rem] w-full px-2 border border-custom-gray-border outline-none placeholder:text-custom-gray text-custom-black rounded-md"
          />
        </div>
        <button className="h-[3rem] bg-custom-violet text-white text-center flex items-center justify-center  rounded-md">
          Add Coupon
        </button>
      </form>
    </div>
  );
};

export default AddCoupon;

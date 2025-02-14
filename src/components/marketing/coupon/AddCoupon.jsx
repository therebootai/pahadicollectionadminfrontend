import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";

const AddCoupon = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [products, setProducts] = useState([]);
  const [productInput, setProductInput] = useState("");

  const addProduct = () => {
    if (productInput.trim()) {
      setProducts([...products, productInput.trim()]);
      setProductInput("");
    }
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      startDate,
      endDate,
      products,
    };
    try {
      const response = await axios.post("/api/coupons", payload);
      alert("Coupon created successfully!");
    } catch (error) {
      alert("Failed to create coupon.");
      console.error("Error creating coupon:", error);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Coupon Name"
          {...register("couponName", { required: true })}
          className="h-[3rem] px-2 border border-custom-gray-border outline-none placeholder:text-custom-gray text-custom-black rounded-md"
        />
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Discount/Coupon"
            {...register("discount", { required: true })}
            className="h-[3rem] px-2 border border-custom-gray-border outline-none placeholder:text-custom-gray text-custom-black rounded-md flex-1"
          />
          <input
            type="text"
            placeholder="Minimum Value"
            {...register("minimumAmount", { required: true })}
            className="h-[3rem] px-2 border border-custom-gray-border outline-none placeholder:text-custom-gray text-custom-black rounded-md flex-1"
          />
        </div>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <DatePicker
              dateFormat="MM/dd/yyyy"
              placeholderText="Start Date"
              showMonthDropdown
              showYearDropdown
              selected={startDate}
              onChange={setStartDate}
              dropdownMode="select"
              className="h-[3rem] w-full px-2 border border-custom-gray-border outline-none placeholder:text-custom-gray text-custom-black rounded-md"
            />
          </div>
          <div className="relative flex-1">
            <DatePicker
              dateFormat="MM/dd/yyyy"
              placeholderText="End Date"
              showMonthDropdown
              showYearDropdown
              selected={endDate}
              onChange={setEndDate}
              dropdownMode="select"
              className="h-[3rem] w-full px-2 border border-custom-gray-border outline-none placeholder:text-custom-gray text-custom-black rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <input
              type="text"
              value={productInput}
              className="h-[3rem] px-2 border border-custom-gray-border outline-none placeholder:text-custom-gray text-custom-black rounded-md flex-1"
              onChange={(e) => setProductInput(e.target.value)}
              placeholder="Enter product and press Add"
            />
            <button
              type="button"
              onClick={addProduct}
              className="h-[3rem] bg-custom-violet text-white text-center flex items-center justify-center rounded-md px-2"
            >
              Add Product
            </button>
          </div>
          <ul>
            {products.map((product, index) => (
              <li key={index} className="flex">
                <h1 className="text-custom-black flex-1 capitalize text-lg font-semibold">
                  {product}
                </h1>{" "}
                <button
                  onClick={() => removeProduct(index)}
                  className="text-sm font-medium text-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button className="h-[3rem] bg-custom-violet text-white text-center flex items-center justify-center rounded-md">
          Add Coupon
        </button>
      </form>
    </div>
  );
};

export default AddCoupon;

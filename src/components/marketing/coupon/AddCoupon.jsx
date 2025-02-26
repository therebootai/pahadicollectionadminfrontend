import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import axiosFetch from "../../../config/axios.config";

const AddCoupon = ({ fetchAllCoupons, coupon }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [products, setProducts] = useState([]);
  const [productInput, setProductInput] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    if (coupon) {
      setStartDate(new Date(coupon.startDate));
      setEndDate(new Date(coupon.endDate));
      setProducts(coupon.products);

      // Populate form fields using reset from useForm
      reset({
        couponName: coupon.couponName || "",
        discount: coupon.discount || "",
        minimumAmount: coupon.minimumAmount || "",
        upToAmount: coupon.upToAmount || "",
      });
    }
  }, [coupon, reset]);

  const fetchAllProducts = async (query) => {
    if (!query.trim()) return setAllProducts([]);
    try {
      const response = await axiosFetch.get(
        `/products/find?limit=1000&page=1&search=${query}`
      );
      const { data } = response.data;
      setAllProducts(data);
      setDropdownVisible(true);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const addProduct = (product) => {
    const alreadyAdded = products.find((p) => p.id === product._id);
    if (!alreadyAdded) {
      setProducts([...products, { id: product._id, title: product.title }]);
      setProductInput("");
      setDropdownVisible(false);
    }
  };

  // Remove product from list
  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  // Handle form submission
  const onSubmit = async (data) => {
    const payload = {
      ...data,
      startDate,
      endDate,
      products: products.map((p) => p.id), // Send product IDs only
    };
    try {
      if (coupon) {
        const response = await axiosFetch.put(
          `/coupons/${coupon._id}`,
          payload
        );
        alert("Coupon updated successfully!");
      } else {
        const response = await axiosFetch.post(`/coupons`, payload);
        alert("Coupon created successfully!");
      }
      await fetchAllCoupons();
    } catch (error) {
      alert("Failed to create coupon.");
      console.error("Error creating coupon:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setProductInput(value);
    fetchAllProducts(value);
  };

  const filteredProducts = allProducts.filter(
    (p) => !products.some((added) => added.id === p._id)
  );

  return (
    <div>
      <form
        className="flex flex-col gap-4 bg-white p-4 rounded-md shadow-custom-lite"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-xl font-medium text-custom-black">
          {coupon ? "Update" : "Add"} Coupon
        </h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Coupon Name"
            {...register("couponName", { required: true })}
            className="h-[3rem] px-2 border border-custom-gray-border outline-none placeholder:text-custom-gray text-custom-black rounded-md flex-1"
          />
          <input
            type="text"
            placeholder="Discount"
            {...register("discount", { required: true })}
            className="h-[3rem] px-2 border border-custom-gray-border outline-none placeholder:text-custom-gray text-custom-black rounded-md flex-1"
          />
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Minimum Value"
            {...register("minimumAmount", { required: true })}
            className="h-[3rem] px-2 border border-custom-gray-border outline-none placeholder:text-custom-gray text-custom-black rounded-md flex-1"
          />
          <input
            type="text"
            placeholder="Discount Up To"
            {...register("upToAmount", { required: true })}
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
        {/* Product Search Input and Dropdown */}
        <div className="flex flex-col gap-2 relative">
          <input
            type="text"
            value={productInput}
            className="h-[3rem] px-2 border border-custom-gray-border outline-none placeholder:text-custom-gray text-custom-black rounded-md"
            onChange={handleSearchChange}
            placeholder="Search and select product"
          />
          {dropdownVisible && filteredProducts.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto w-full top-full">
              {filteredProducts.map((product) => (
                <li
                  key={product._id}
                  onClick={() => addProduct(product)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {product.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Selected Products List */}
        <ul className="space-y-2">
          {products.map((product, index) => (
            <li key={index} className="flex items-center justify-between">
              <span className="text-custom-black capitalize font-semibold">
                {product.title}
              </span>
              <button
                onClick={() => removeProduct(index)}
                type="button"
                className="text-sm font-medium text-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button className="h-[3rem] bg-custom-violet text-white text-center flex items-center justify-center rounded-md">
          {coupon ? "Update" : "Add"} Coupon
        </button>
      </form>
    </div>
  );
};

export default AddCoupon;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const EditOrders = ({ fetchOrders, order }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [products, setProducts] = useState([]);
  const [productInput, setProductInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    key: "",
    value: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (order) {
      setProducts(
        order.products.map((p) => ({
          id: p.productId._id,
          title: p.productId.title,
          quantity: p.quantity,
        }))
      );
      setDeliveryAddress(
        Object.keys(order.delivery_location).reduce((acc, key) => {
          acc[key] = order.delivery_location[key] || deliveryAddress[key];
          return acc;
        }, {})
      );
      reset({
        status: order.status || "",
      });
    }
  }, [order]);

  const fetchAllProducts = async (query) => {
    if (!query.trim()) return setAllProducts([]);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/products/find?limit=1000&page=1&search=${query}`
      );
      const { data } = response.data;
      setAllProducts(data);
      setDropdownVisible(true);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setProductInput(product.title);
    setDropdownVisible(false);
  };

  const addProduct = (product) => {
    if (selectedProduct && quantityInput) {
      const alreadyAdded = products.find((p) => p.id === selectedProduct._id);
      if (!alreadyAdded) {
        setProducts([
          ...products,
          {
            id: selectedProduct._id,
            title: selectedProduct.title,
            quantity: quantityInput,
          },
        ]);
        setProductInput("");
        setQuantityInput("");
        setSelectedProduct(null);
      }
    } else {
      alert("Please select a product and enter quantity.");
    }
  };

  // Remove product from list
  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setProductInput(value);
    fetchAllProducts(value);
  };

  const handleAddValue = () => {
    setDeliveryAddress({
      ...deliveryAddress,
      "": "",
    });
  };

  const handleRemoveValue = (key) => {
    const updatedAddress = { ...deliveryAddress };
    delete updatedAddress[key];
    setDeliveryAddress(updatedAddress);
  };

  const handleChangeValue = (oldKey, newKey, newValue) => {
    const updatedAddress = { ...deliveryAddress };
    delete updatedAddress[oldKey];
    updatedAddress[newKey] = newValue;
    setDeliveryAddress(updatedAddress);
  };

  async function onSubmit(data) {
    const payload = {
      ...data,
      products: products.map((p) => ({
        productId: p.id,
        quantity: p.quantity,
      })), // Send product IDs only
      delivery_location: deliveryAddress,
    };
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/orders/${order._id}`,
        payload
      );
      await fetchOrders();
      alert("Order updated successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to update order. Please try again.");
    }
  }

  const filteredProducts = allProducts.filter(
    (p) => !products.some((added) => added.id === p._id)
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-medium text-custom-black">
            Order Status
          </h3>
          <select
            name=""
            id=""
            className="h-[3rem] px-2 border border-custom-gray-border outline-none placeholder:text-custom-gray text-custom-black rounded-md capitalize"
            {...register("status", { required: true })}
          >
            <option value="ordered">ordered</option>
            <option value="shipped">shipped</option>
            <option value="out_for_delivery">Out for delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="refund_generated">Refund Generated</option>
            <option value="refunded">Refunded</option>
            <option value="canceled">canceled</option>
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-medium text-custom-black">
            Delivery Address
          </h3>
          <div className="flex flex-col gap-4">
            {Object.entries(deliveryAddress).map(([key, value], index) => (
              <div key={index} className="grid grid-cols-4 gap-4">
                <input
                  type="text"
                  value={key}
                  onChange={(e) =>
                    handleChangeValue(key, e.target.value, value)
                  }
                  placeholder="Type"
                  className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleChangeValue(key, key, e.target.value)}
                  placeholder="Value"
                  className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
                />
                <button
                  type="button"
                  onClick={handleAddValue}
                  className="bg-custom-lite-gray border border-custom-gray-border text-custom-black h-12 rounded-md"
                >
                  Add more
                </button>

                {Object.keys(deliveryAddress).length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveValue(key)}
                    className="bg-custom-lite-gray border border-custom-gray-border text-custom-black h-12 rounded-md"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-medium text-custom-black">
            Ordered Products
          </h3>
          <div className="flex flex-col gap-4 relative">
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                value={productInput}
                className="h-[3rem] px-2 border border-custom-gray-border outline-none placeholder:text-custom-gray text-custom-black rounded-md"
                onChange={handleSearchChange}
                placeholder="Search and select product"
              />
              <input
                type="text"
                value={quantityInput}
                className="h-[3rem] px-2 border border-custom-gray-border outline-none placeholder:text-custom-gray text-custom-black rounded-md"
                onChange={(e) => setQuantityInput(e.target.value)}
                placeholder="Quantity"
              />
              <button
                type="button"
                onClick={addProduct}
                className="h-12 text-custom-black px-2 bg-custom-lite-gray rounded-md border border-custom-gray-border"
              >
                Add
              </button>
            </div>
            {dropdownVisible && filteredProducts.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto w-full top-full">
                {filteredProducts.map((product) => (
                  <li
                    key={product._id}
                    onClick={() => handleSelectProduct(product)}
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
              <li key={index} className="flex items-center justify-between border border-custom-gray-border p-1">
                <div className="flex flex-col gap-2">
                  <span className="text-custom-black capitalize font-semibold">
                    Product title - {product.title}
                  </span>
                  <span className="text-custom-black capitalize font-semibold">
                    Quantity - {product.quantity}
                  </span>
                </div>
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
        </div>

        <button
          className="h-[3rem] flex justify-center items-center w-full bg-custom-blue text-base font-medium text-white rounded-md"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditOrders;

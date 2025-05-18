import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosFetch from "../../config/axios.config";

const EditOrders = ({ fetchOrders, order }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [products, setProducts] = useState({});
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
      setProducts({
        id: order.products.productId.productId,
        title: order.products.productId.title,
        quantity: order.products.quantity,
        image: order.products.productId.productImage[0].secure_url,
        stock: order.products.productId.in_stock,
        price: order.products.productId.price,
      });

      reset({
        status: order.status || "",
      });
    }
  }, [order]);

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

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setProductInput(product.title);
    setDropdownVisible(false);
  };

  const addProduct = () => {
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

  const handleSearchChange = (e) => {
    const value = e.target.value.trimStart();
    setProductInput(value);
    fetchAllProducts(value);
  };

  // const handleAddValue = () => {
  //   setDeliveryAddress({
  //     ...deliveryAddress,
  //     "": "",
  //   });
  // };

  // const handleRemoveValue = (key) => {
  //   const updatedAddress = { ...deliveryAddress };
  //   delete updatedAddress[key];
  //   setDeliveryAddress(updatedAddress);
  // };

  const handleChangeValue = (oldKey, newKey, newValue) => {
    const updatedAddress = { ...deliveryAddress };
    delete updatedAddress[oldKey];
    updatedAddress[newKey] = newValue;
    setDeliveryAddress(updatedAddress);
  };

  async function onSubmit(data) {
    const payload = {
      ...data,
      products: {
        quantity: products.quantity,
      }, // Send product IDs only
      delivery_location: deliveryAddress,
    };
    try {
      const response = await axiosFetch.put(`/orders/${order._id}`, payload);
      await fetchOrders();
      alert("Order updated successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to update order. Please try again.");
    }
  }

  async function handelCancelation(status) {
    try {
      const payload = {
        status: status,
      };
      const response = await axiosFetch.put(`/orders/${order._id}`, payload);
      await fetchOrders();
      alert("Order Canceled Confirmed!");
    } catch (error) {
      console.log(error);
      alert("Failed to update order. Please try again.");
    }
  }

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
            <option value="ordered">Ordered</option>
            <option value="shipped">Shipped</option>
            <option value="out_for_delivery">Out For Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancel_initiated">Cancel Initiated</option>
            <option value="canceled">Canceled</option>
            <option value="cancel_initiated_and_refund_generated">
              Cancel Initiated and Refund Generated
            </option>
            <option value="canceled_and_refunded">Canceled and Refunded</option>
            <option value="return_and_refunded">Return and Refunded</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-base font-medium text-custom-black">
            Ordered Products
          </h3>
          {/* <div className="flex flex-col gap-4 relative">
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
                onChange={(e) => setQuantityInput(e.target.value.trimStart())}
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
          </div> */}

          {/* Selected Products List */}
          <ul className="space-y-2 flex flex-col gap-3">
            <li className="flex justify-between border border-custom-gray-border p-2 gap-4">
              <img
                src={products.image}
                alt={products.title}
                width={150}
                height={150}
                className="object-cover"
              />
              <div className="flex flex-col gap-2 flex-1">
                <span className="text-custom-black capitalize font-semibold">
                  Product title - {products.title}
                </span>
                <span className="text-custom-black capitalize font-semibold">
                  Product id - {products.id}
                </span>
                <span className="text-custom-black capitalize font-semibold">
                  Product Price - {Math.round(products.price)}
                </span>
                <span className="text-custom-black capitalize font-semibold">
                  Product stocks - {products.stock}
                </span>
                <span className="text-custom-black capitalize font-semibold">
                  Quantity - {products.quantity}
                </span>
              </div>
            </li>
            {order.cancel_message?.cancel_reason && (
              <li className="flex flex-col gap-4">
                <h3 className="text-base font-medium text-custom-black">
                  Cancel Message
                </h3>
                <div className="flex flex-col gap-2 border border-custom-gray-border p-2">
                  <span className="text-custom-black capitalize font-semibold lg:text-lg text-base">
                    Cancel Reason - {order.cancel_message.cancel_reason}
                  </span>
                  <span className="text-custom-black capitalize font-semibold lg:text-lg text-base">
                    Remarks - {order.cancel_message.cancel_message}
                  </span>
                  {(order.status === "cancel_initiated" ||
                    order.status ===
                      "cancel_initiated_and_refund_generated") && (
                    <div className="flex items-start gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          let newStatus = order.status;
                          switch (order.status) {
                            case "cancel_initiated":
                              newStatus = "canceled";
                              break;

                            case "cancel_initiated_and_refund_generated":
                              newStatus = "canceled_and_refunded";
                              break;

                            default:
                              break;
                          }
                          handelCancelation(newStatus);
                        }}
                        className="lg:text-xl text-lg font-medium text-white bg-green-500 rounded-md capitalize px-3 py-1"
                      >
                        confirm cancelation
                      </button>
                      <button
                        type="button"
                        onClick={() => handelCancelation(order.status)}
                        className="lg:text-xl text-lg font-medium text-white bg-red-600 rounded-md capitalize px-3 py-1"
                      >
                        decline cancelation
                      </button>
                    </div>
                  )}
                </div>
              </li>
            )}
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

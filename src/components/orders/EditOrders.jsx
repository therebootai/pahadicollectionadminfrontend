import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
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
    console.log("called add");
    if (products.quantity === products.stock) {
      return;
    }
    setProducts((prevProducts) => ({
      ...prevProducts,
      quantity: prevProducts.quantity + 1,
    }));
  };

  const removeProduct = () => {
    console.log("called remove");
    if (products.quantity === 1) {
      return;
    }
    setProducts((prevProducts) => ({
      ...prevProducts,
      quantity: prevProducts.quantity - 1,
    }));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.trimStart();
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
      products: {
        ...order.products,
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
                <div className="text-custom-black capitalize font-semibold flex items-center gap-2">
                  Quantity -{" "}
                  <button
                    type="button"
                    className="text-custom-blue font-medium"
                    onClick={addProduct}
                  >
                    +
                  </button>{" "}
                  <span className="p-1 border rounded text-custom-blue bg-white aspect-square">
                    {products.quantity}{" "}
                  </span>
                  <button
                    type="button"
                    className="text-custom-gray font-medium"
                    onClick={removeProduct}
                  >
                    -
                  </button>
                </div>
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

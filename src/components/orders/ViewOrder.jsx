import React from "react";

const ViewOrder = ({ order }) => {
  return (
    <section className="flex flex-col gap-4 bg-white p-4 rounded-md shadow-custom-lite">
      <h1 className="text-2xl font-bold text-custom-black">Order Details</h1>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">Order Id :</h3>
        <p className="text-lg font-semibold text-custom-blue">
          {order.orderId}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Order initialize :
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {new Date(order.createdAt).toLocaleDateString("en-In")}
        </p>
      </div>
      <div className="flex flex-col gap-4 border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Delivery Address :
        </h3>
        <div className="flex flex-col gap-2">
          {order.delivery_location &&
            Object.entries(order.delivery_location).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Customer Details :
        </h3>
        <div className="grid grid-cols-2 gap-2 items-center">
          <h3 className="text-lg font-semibold text-custom-black">Name :</h3>
          <p className="text-lg font-semibold text-custom-blue">
            {order.customerId?.name}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 items-center">
          <h3 className="text-lg font-semibold text-custom-black">
            mobile Number :
          </h3>
          <p className="text-lg font-semibold text-custom-blue">
            {order.customerId?.mobile}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 items-center">
          <h3 className="text-lg font-semibold text-custom-black">
            email id :
          </h3>
          <p className="text-lg font-semibold text-custom-blue">
            {order.customerId?.email}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 border p-1 border-custom-gray">
        <h1 className="text-lg font-semibold text-custom-black">
          Ordered Products:
        </h1>
        <div
          key={order.products.productId.productId}
          className="flex flex-col p-2 m-2 border border-custom-gray"
        >
          <div className="grid grid-cols-2 gap-2 items-center">
            <h3 className="text-lg font-semibold text-custom-black">
              Product Name :
            </h3>
            <p className="text-lg font-semibold text-custom-blue">
              {order.products.productId?.title}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <h3 className="text-lg font-semibold text-custom-black">
              Quantity :
            </h3>
            <p className="text-lg font-semibold text-custom-blue">
              {order.products.quantity}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 border p-1 border-custom-gray">
        <h1 className="text-lg font-semibold text-custom-black">
          Payment Details:
        </h1>
        <div className="grid grid-cols-2 gap-2 items-center">
          <h3 className="text-lg font-semibold text-custom-black">
            Payment Status :
          </h3>
          <p className="text-lg font-semibold text-custom-blue">
            {order.paymentId.paymentStatus}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 items-center">
          <h3 className="text-lg font-semibold text-custom-black">
            Payment Mode :
          </h3>
          <p className="text-lg font-semibold text-custom-blue">
            {order.paymentId.paymentMode}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 items-center">
          <h3 className="text-lg font-semibold text-custom-black">
            Payment initialize :
          </h3>
          <p className="text-lg font-semibold text-custom-blue">
            {new Date(order.paymentId.createdAt).toLocaleDateString("en-In")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ViewOrder;

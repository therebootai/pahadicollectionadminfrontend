import React from "react";

const ViewOrder = ({ order }) => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-custom-black">Order Details</h1>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">Order Id :</h3>
        <p className="text-lg font-semibold text-custom-blue">
          {order.orderId}
        </p>
      </div>
      <div className="flex flex-col gap-4 border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Customer Details :
        </h3>
        <div className="grid grid-cols-2 gap-2 items-center">
          <h3 className="text-lg font-semibold text-custom-black">Name :</h3>
          <p className="text-lg font-semibold text-custom-blue">
            {order.customerId.name}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 items-center">
          <h3 className="text-lg font-semibold text-custom-black">
            mobile Number :
          </h3>
          <p className="text-lg font-semibold text-custom-blue">
            {order.customerId.mobile}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 items-center">
          <h3 className="text-lg font-semibold text-custom-black">
            email id :
          </h3>
          <p className="text-lg font-semibold text-custom-blue">
            {order.customerId.email}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 border p-1 border-custom-gray">
        <h1 className="text-lg font-semibold text-custom-black">
          Ordered Products:
        </h1>
        {order.products.map((prod) => (
          <div
            className="grid grid-cols-2 gap-2 items-center p-2 m-2 border border-custom-gray"
            key={prod.productId.productId}
          >
            <h3 className="text-lg font-semibold text-custom-black">
              Product Name :
            </h3>
            <p className="text-lg font-semibold text-custom-blue">
              {prod.productId?.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ViewOrder;

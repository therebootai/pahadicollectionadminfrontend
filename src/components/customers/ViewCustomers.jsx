import React from "react";

const ViewCustomers = ({ customer }) => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-custom-black">Customer Details</h1>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Customer Name :
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {customer.name}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Customer Email :
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {customer.email}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Customer Phone No. :
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {customer.mobile}
        </p>
      </div>
      <div className="flex flex-col gap-4 border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Customer All Addresses :
        </h3>
        <div className="flex flex-col gap-2">
          {customer.address.map((item) =>
            Object.entries(item).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))
          )}
        </div>
      </div>
      {customer.profileImage && (
        <div className="flex flex-col gap-4 border p-1 border-custom-gray">
          <h3 className="text-lg font-semibold text-custom-black">
            Customer Profile Picture :
          </h3>
          <img src={customer.profileImage.secure_url} alt="profile-picture" />
        </div>
      )}
      {customer.cart.length > 0 && (
        <div className="flex flex-col gap-4 border p-1 border-custom-gray">
          {customer.cart.map((product) => (
            <div
              key={product.productId}
              className="m-1 p-1 border border-custom-gray flex flex-col gap-2"
            >
              <div className="grid grid-cols-2 gap-2 items-center">
                <h3 className="text-lg font-semibold text-custom-black">
                  Product Title :
                </h3>
                <p className="text-lg font-semibold text-custom-blue">
                  {product.title}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <h3 className="text-lg font-semibold text-custom-black">
                  Product Type :
                </h3>
                <p className="text-lg font-semibold text-custom-blue">
                  {product.productType}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {customer.wishlist.length > 0 && (
        <div className="flex flex-col gap-4 border p-1 border-custom-gray">
          {customer.cart.map((product) => (
            <div
              key={product.productId}
              className="m-1 p-1 border border-custom-gray flex flex-col gap-2"
            >
              <div className="grid grid-cols-2 gap-2 items-center">
                <h3 className="text-lg font-semibold text-custom-black">
                  Product Title :
                </h3>
                <p className="text-lg font-semibold text-custom-blue">
                  {product.title}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <h3 className="text-lg font-semibold text-custom-black">
                  Product Type :
                </h3>
                <p className="text-lg font-semibold text-custom-blue">
                  {product.productType}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Customer Status :
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {customer.is_disabled ? "Disable" : "Enable"}
        </p>
      </div>
      {customer.orders.length > 0 && (
        <div className="flex flex-col gap-4 border p-1 border-custom-gray">
          <h3 className="text-lg font-semibold text-custom-black">
            Customer All Orders :
          </h3>
          {customer.orders.map((order) => (
            <div
              className="m-1 p-1 border border-custom-gray flex flex-col gap-2"
              key={order.orderId}
            >
              <div className="grid grid-cols-2 gap-2 items-center">
                <h3 className="text-lg font-semibold text-custom-black">
                  Order id :
                </h3>
                <p className="text-lg font-semibold text-custom-blue">
                  {order.orderId}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <h3 className="text-lg font-semibold text-custom-black">
                  Order amount :
                </h3>
                <p className="text-lg font-semibold text-custom-blue">
                  {order.totalAmount}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <h3 className="text-lg font-semibold text-custom-black">
                  Order status :
                </h3>
                <p className="text-lg font-semibold text-custom-blue">
                  {order.status}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <h3 className="text-lg font-semibold text-custom-black">
                  Order initialize :
                </h3>
                <p className="text-lg font-semibold text-custom-blue">
                  {new Date(order.createdAt).toLocaleDateString("en-In")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ViewCustomers;

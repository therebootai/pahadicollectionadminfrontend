import React from "react";

const ViewCoupon = ({ coupon }) => {
  return (
    <section className="flex flex-col gap-4 bg-white p-4 rounded-md shadow-custom-lite">
      <h1 className="text-2xl font-bold text-custom-black">Coupon Details</h1>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Coupon Name :
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {coupon.couponName}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Coupon Created :
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {new Date(coupon.createdAt).toLocaleDateString("en-In")}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Coupon Last Updated :
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {new Date(coupon.updatedAt).toLocaleDateString("en-In")}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Discount Value:
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {coupon.discount}%
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Minimum amount for Apply this coupon:
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {coupon.minimumAmount}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Maximum amount can get from this coupon:
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {coupon.upToAmount}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Offer Applicable:
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          From {new Date(coupon.startDate).toLocaleDateString("en-In")} to&nbsp;
          {new Date(coupon.endDate).toLocaleDateString("en-In")}
        </p>
      </div>
      <div className="flex flex-col gap-2 border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Products Where coupon is applicable:
        </h3>
        {coupon.products.length > 0 ? (
          coupon.products.map((product, index) => (
            <p className="text-lg font-semibold text-custom-blue" key={index}>
              {`${index + 1}.`} {product.title}
            </p>
          ))
        ) : (
          <p className="text-lg font-semibold text-custom-blue">All Products</p>
        )}
      </div>
      <div className="flex flex-col gap-2 border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Customer who use this coupon:
        </h3>
        {coupon.usedBy.length > 0 ? (
          coupon.usedBy.map((customer, index) => (
            <p className="text-lg font-semibold text-custom-blue" key={index}>
              {`${index + 1}.`} {customer.name}
            </p>
          ))
        ) : (
          <p className="text-lg font-semibold text-custom-blue">None</p>
        )}
      </div>
    </section>
  );
};

export default ViewCoupon;
